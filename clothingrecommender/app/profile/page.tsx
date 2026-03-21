"use client"
import React, {useState} from 'react'

interface Entry {
  id: number
  imageUrl: string
}

interface Folder {
  name: string
  entries: Entry[]
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

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('outfits')
  const [folders, setFolders] = useState<Folder[]>([])
  const [outfits, setOutfits] = useState<Entry[]>([])
  const [items, setItems] = useState<Entry[]>([])
  const [collections, setCollections] = useState<Entry[]>([])

  const handleAddOutfit     = () => setOutfits((prev)      => [...prev, { id: Date.now(), imageUrl: '' }])
  const handleAddItem       = () => setItems((prev)        => [...prev, { id: Date.now(), imageUrl: '' }])
  const handleAddCollection = () => setCollections((prev)  => [...prev, { id: Date.now(), imageUrl: '' }])

  const handleAddToFolder = (folderName: string) =>
    setFolders((prev) =>
      prev.map((f) =>
        f.name === folderName
          ? { ...f, entries: [...f.entries, { id: Date.now(), imageUrl: '' }] }
          : f
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

      {/* Profile Card */}
      <div className="relative w-full">

      {/* Dark Blue Top Half - Background Image Area */}
      <div className="w-full h-38 bg-[#36475B] rounded-t-2xl"> 
        {/*custom user bg image*/}
      </div>

      {/* Light Bottom Half - User Stats Area */}
      <div className="w-full h-52 bg-[#EFEAE3] rounded-b-2xl pt-4">
        
        {/* User stats go here */}
        <div className="ml-52 px-10">
          <h2 className="text-3xl font-bold">Username</h2>
          <p className="text-gray-600">@username</p>

          {/* Bio */}
          <p className="text-gray-600">Bio goes here</p>

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
    <div className="absolute top-26 left-10 w-45 h-45 bg-black rounded-full border-4 border-white"> 
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
 
    </div>
  )
}