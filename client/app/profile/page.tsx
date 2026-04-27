"use client"
import React, { useState, useRef, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

interface Entry {
  id: number
  imageUrl: string
}

interface Folder {
  name: string
  entries: Entry[]
}

interface ProfileData {
  username: string
  handle: string
  bio: string
  profilePic: string
  backgroundImage: string
}

function EntryGrid({ list, onAdd }: { list: Entry[]; onAdd: () => void }) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
      {list.map((entry) => (
        <div
          key={entry.id}
          className="aspect-square rounded-xl overflow-hidden bg-gray-200 shadow-sm"
        >
          {entry.imageUrl && (
            <img
              src={entry.imageUrl}
              alt="entry"
              className="w-full h-full object-cover"
            />
          )}
        </div>
      ))}
      <button
        onClick={onAdd}
        className="aspect-square rounded-xl border-2 border-dashed border-[#B0A090]
                   flex items-center justify-center text-[#B0A090] text-3xl
                   hover:border-[#36475B] hover:text-[#36475B] hover:bg-[#E8E0D5]
                   transition-all duration-200"
        aria-label="Add"
      >
        +
      </button>
    </div>
  )
}

export default function ProfilePage({ searchParams }: any) {
  const [activeTab, setActiveTab] = useState('outfits')
  const [folders, setFolders] = useState<Folder[]>([])
  const [outfits, setOutfits] = useState<Entry[]>([])
  const [items, setItems] = useState<Entry[]>([])
  const [collections, setCollections] = useState<Entry[]>([])
  const params = React.use(searchParams);
  const id = (params as any).id;

  // Profile data state
  const [profile, setProfile] = useState<ProfileData>({
    username: 'Username',
    handle: '@username',
    bio: 'Bio goes here',
    profilePic: '',
    backgroundImage: '',
  })

  // Controls whether the edit modal is open
  const [showEditModal, setShowEditModal] = useState(false)

  // Draft state — holds edits while the modal is open, only applied on Save
  const [draft, setDraft] = useState<ProfileData>(profile)

  // The actual File picked for profile pic (separate from the base64 preview in draft)
  const [profilePicFile, setProfilePicFile] = useState<File | null>(null)

  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return
      const username = user.user_metadata?.username ?? user.email ?? 'Username'
      const profileImageName = user.user_metadata?.profile_image_name as string | undefined
      let profilePic = ''
      if (profileImageName) {
        const { data } = supabase.storage.from('profile_images').getPublicUrl(profileImageName)
        profilePic = data.publicUrl
      }
      setProfile((prev) => ({
        ...prev,
        username,
        handle: `@${username}`,
        profilePic,
      }))
    })
  }, [])

  const openEditModal = () => {
    setDraft(profile)
    setProfilePicFile(null)
    setShowEditModal(true)
  }

  const saveProfile = async () => {
    let nextProfile = draft

    if (profilePicFile) {
      try {
        const ext = profilePicFile.name.split('.').pop() ?? 'jpg'
        const filename = `${Date.now()}.${ext}`
        const { error: uploadError } = await supabase.storage
          .from('profile_images')
          .upload(filename, profilePicFile)
        if (uploadError) throw uploadError

        const { error: metaError } = await supabase.auth.updateUser({
          data: { profile_image_name: filename },
        })
        if (metaError) throw metaError

        const { data } = supabase.storage.from('profile_images').getPublicUrl(filename)
        nextProfile = { ...draft, profilePic: data.publicUrl }
      } catch (err) {
        console.error(err)
        alert('Profile picture upload failed')
        return
      }
    }

    setProfile(nextProfile)
    setProfilePicFile(null)
    setShowEditModal(false)
  }

  // Refs for the two image file inputs inside the modal
  const profilePicInputRef = useRef<HTMLInputElement>(null)
  const backgroundInputRef = useRef<HTMLInputElement>(null)

  // Reads a file and calls the callback with the base64 URL
  const readFile = (file: File, callback: (url: string) => void) => {
    const reader = new FileReader()
    reader.onload = () => callback(reader.result as string)
    reader.readAsDataURL(file)
  }

  // Outfit file picker refs (shared single input pattern)
  const outfitFileInputRef = useRef<HTMLInputElement>(null)
  const onOutfitFileSelected = useRef<(imageUrl: string) => void>(() => {})

  const openFilePicker = (callback: (imageUrl: string) => void) => {
    onOutfitFileSelected.current = callback
    outfitFileInputRef.current?.click()
  }

  const handleOutfitFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    readFile(file, (url) => onOutfitFileSelected.current(url))
    e.target.value = ''
  }

  const handleAddOutfit     = () => openFilePicker((imageUrl) => setOutfits((prev)      => [...prev, { id: Date.now(), imageUrl }]))
  const handleAddItem       = () => openFilePicker((imageUrl) => setItems((prev)        => [...prev, { id: Date.now(), imageUrl }]))
  const handleAddCollection = () => openFilePicker((imageUrl) => setCollections((prev)  => [...prev, { id: Date.now(), imageUrl }]))

  const handleAddToFolder = (folderName: string) =>
    openFilePicker((imageUrl) =>
      setFolders((prev) =>
        prev.map((f) =>
          f.name === folderName
            ? { ...f, entries: [...f.entries, { id: Date.now(), imageUrl }] }
            : f
        )
      )
    )

  const handleCreateFolder = () => {
    const name = window.prompt('Folder name:')
    if (name && name.trim()) {
      setFolders((prev) => [...prev, { name: name.trim(), entries: [] }])
      setActiveTab(name.trim())
    }
  }

  return (
    <div className="min-h-screen min-w-full bg-[#D4C4B0] p-8">

      {/* Hidden file input for outfit/item/collection images */}
      <input
        type="file"
        accept="image/*"
        ref={outfitFileInputRef}
        onChange={handleOutfitFileChange}
        className="hidden"
      />

      {/* Hidden file inputs for profile pic and background (inside modal) */}
      <input
        type="file"
        accept="image/*"
        ref={profilePicInputRef}
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (!file) return
          setProfilePicFile(file)
          readFile(file, (url) => setDraft((prev) => ({ ...prev, profilePic: url })))
          e.target.value = ''
        }}
        className="hidden"
      />
      <input
        type="file"
        accept="image/*"
        ref={backgroundInputRef}
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (!file) return
          readFile(file, (url) => setDraft((prev) => ({ ...prev, backgroundImage: url })))
          e.target.value = ''
        }}
        className="hidden"
      />

      {/* Profile Card */}
      <div className="relative w-full">

        {/* Edit Button — top right of the card */}
        <button
          onClick={openEditModal}
          className="absolute top-3 right-3 z-10 px-4 py-1.5 bg-[#EFEAE3] hover:bg-white
                     text-[#36475B] font-semibold rounded-xl text-sm shadow transition-all duration-200"
        >
          Edit Profile
        </button>

        {/* Dark Blue Top Half - Background Image Area */}
        <div
          className="w-full h-38 bg-[#36475B] rounded-t-2xl bg-cover bg-center"
          style={profile.backgroundImage ? { backgroundImage: `url(${profile.backgroundImage})` } : {}}
        >
          {/*custom user bg image*/}
        </div>

        {/* Light Bottom Half - User Stats Area */}
        <div className="w-full h-52 bg-[#EFEAE3] rounded-b-2xl pt-4">

          {/* User stats go here */}
          <div className="ml-52 px-10">
            <h2 className="text-3xl font-bold">{profile.username}</h2>
            <p className="text-gray-600">{profile.handle}</p>

            {/* Bio */}
            <p className="text-gray-600">{profile.bio}</p>

            {/* Following and Followers */}
            <div className="flex gap-6 text-gray-600">
              <div>
                <span className="font-semibold">123</span> Following
              </div>
              <div>
                <span className="ml-4 font-semibold">456</span> Followers
              </div>
            </div>
          </div>
        </div>

        {/* Profile Picture here*/}
        <div
          className="absolute top-26 left-10 w-45 h-45 bg-black rounded-full border-4 border-white overflow-hidden"
        >
          {profile.profilePic && (
            <img src={profile.profilePic} alt="profile" className="w-full h-full object-cover" />
          )}
        </div>
      </div>

      {/* Outfit Gallery */}
      <div className="w-full mt-10 pt-2">

        {/* Gallery Tabs */}
        <div className="flex gap-1">

          {/* Outfits Tab */}
          <button
            onClick={() => setActiveTab('outfits')}
            className={`px-6 py-3 rounded-t-2xl font-semibold transition-all ${
              activeTab === 'outfits'
                ? 'bg-[#EFEAE3] text-[#36475B]'
                : 'bg-[#C4B5A0] text-gray-600 hover:bg-[#36475B] text-white'
            }`}>
            Outfits
          </button>

          {/* Items Tab */}
          <button
            onClick={() => setActiveTab('items')}
            className={`px-6 py-3 rounded-t-2xl font-semibold transition-all ${
              activeTab === 'items'
                ? 'bg-[#EFEAE3] text-[#36475B]'
                : 'bg-[#C4B5A0] text-gray-600 hover:bg-[#36475B] text-white'
            }`}>
            Items
          </button>

          {/* Collections Tab */}
          <button
            onClick={() => setActiveTab('collections')}
            className={`px-6 py-3 rounded-t-2xl font-semibold transition-all ${
              activeTab === 'collections'
                ? 'bg-[#EFEAE3] text-[#36475B]'
                : 'bg-[#C4B5A0] text-gray-600 hover:bg-[#36475B] text-white'
            }`}>
            Collections
          </button>

          {/* Add New Tab */}
          {folders.map((folder) => (
            <button
              key={folder.name}
              onClick={() => setActiveTab(folder.name)}
              className={`px-6 py-3 rounded-t-2xl font-semibold transition-all ${
                activeTab === folder.name
                  ? 'bg-[#EFEAE3] text-[#36475B]'
                  : 'bg-[#C4B5A0] text-gray-600 hover:bg-[#36475B] text-white'
              }`}>
              {folder.name}
            </button>
          ))}

          <button
            onClick={handleCreateFolder}
            className="px-6 py-3 rounded-t-2xl font-semibold transition-all bg-[#C4B5A0] text-gray-600 hover:bg-[#36475B] hover:text-white"
          >
            +
          </button>

        </div>

        {/* Tab Content */}
        <div className="w-full min-h-[400px] bg-[#EFEAE3] rounded-b-2xl rounded-tr-2xl p-6">

          {activeTab === 'outfits' && (
            <div>
              <h3 className="text-xl font-bold mb-4">My Outfits</h3>
              <EntryGrid list={outfits} onAdd={handleAddOutfit} />
            </div>
          )}

          {activeTab === 'items' && (
            <div>
              <h3 className="text-xl font-bold mb-4">My Items</h3>
              <EntryGrid list={items} onAdd={handleAddItem} />
            </div>
          )}

          {activeTab === 'collections' && (
            <div>
              <h3 className="text-xl font-bold mb-4">My Collections</h3>
              <EntryGrid list={collections} onAdd={handleAddCollection} />
            </div>
          )}

          {folders.map((folder) =>
            activeTab === folder.name && (
              <div key={folder.name}>
                <h3 className="text-xl font-bold mb-4">{folder.name}</h3>
                <EntryGrid
                  list={folder.entries}
                  onAdd={() => handleAddToFolder(folder.name)}
                />
              </div>
            )
          )}

        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={() => setShowEditModal(false)}
        >
          <div
            className="bg-[#EFEAE3] rounded-2xl p-6 w-96 shadow-xl flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-bold text-[#36475B]">Edit Profile</h2>

            {/* Username */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-[#36475B]">Username</label>
              <input
                type="text"
                value={draft.username}
                onChange={(e) => setDraft((prev) => ({ ...prev, username: e.target.value }))}
                className="border border-[#C4B5A0] rounded-xl px-4 py-2 bg-white text-[#36475B]
                           placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#36475B]"
              />
            </div>

            {/* Handle */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-[#36475B]">Handle</label>
              <input
                type="text"
                value={draft.handle}
                onChange={(e) => setDraft((prev) => ({ ...prev, handle: e.target.value }))}
                className="border border-[#C4B5A0] rounded-xl px-4 py-2 bg-white text-[#36475B]
                           placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#36475B]"
              />
            </div>

            {/* Bio */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-[#36475B]">Bio</label>
              <textarea
                value={draft.bio}
                onChange={(e) => setDraft((prev) => ({ ...prev, bio: e.target.value }))}
                rows={3}
                className="border border-[#C4B5A0] rounded-xl px-4 py-2 bg-white text-[#36475B]
                           placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#36475B] resize-none"
              />
            </div>

            {/* Profile Picture */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-[#36475B]">Profile Picture</label>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden border-2 border-[#C4B5A0]">
                  {draft.profilePic && (
                    <img src={draft.profilePic} alt="preview" className="w-full h-full object-cover" />
                  )}
                </div>
                <button
                  onClick={() => profilePicInputRef.current?.click()}
                  className="px-4 py-1.5 rounded-xl border border-[#C4B5A0] text-sm text-[#36475B]
                             hover:bg-[#E0D8CE] transition-colors"
                >
                  Choose Image
                </button>
              </div>
            </div>

            {/* Background Image */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-[#36475B]">Background Image</label>
              <div className="flex items-center gap-3">
                <div
                  className="w-20 h-10 rounded-lg bg-[#36475B] bg-cover bg-center border-2 border-[#C4B5A0]"
                  style={draft.backgroundImage ? { backgroundImage: `url(${draft.backgroundImage})` } : {}}
                />
                <button
                  onClick={() => backgroundInputRef.current?.click()}
                  className="px-4 py-1.5 rounded-xl border border-[#C4B5A0] text-sm text-[#36475B]
                             hover:bg-[#E0D8CE] transition-colors"
                >
                  Choose Image
                </button>
              </div>
            </div>

            {/* Save / Cancel */}
            <div className="flex gap-2 justify-end pt-2">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 rounded-xl text-gray-500 hover:bg-[#E0D8CE] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveProfile}
                className="px-4 py-2 rounded-xl bg-[#36475B] text-white font-semibold
                           hover:bg-[#2a3848] transition-colors"
              >
                Save
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}