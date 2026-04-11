"use client"
import React, { useState, useRef } from 'react'

interface Item {
  id: string
  name: string
  imageUrl: string
  type: string
}

interface OutfitDetails {
  name: string           
  collection: string
  itemIds: string[]      
  popularity: number
  isAvailable: boolean
  description: string
  occasion: string
}

interface Outfit {
  id: number
  imageUrl: string
  details: OutfitDetails
}

// Replace with Supabase fetch later:
//   const { data } = await supabase.from('items').select('*')
//   setAvailableItems(data)
const PLACEHOLDER_ITEMS: Item[] = [
  { id: '1',  name: 'White T-Shirt',    imageUrl: '', type: 'Top'       },
  { id: '2',  name: 'Blue Jeans',       imageUrl: '', type: 'Bottom'    },
  { id: '3',  name: 'White Sneakers',   imageUrl: '', type: 'Shoes'     },
  { id: '4',  name: 'Black Hoodie',     imageUrl: '', type: 'Top'       },
  { id: '5',  name: 'Cargo Pants',      imageUrl: '', type: 'Bottom'    },
  { id: '6',  name: 'Leather Jacket',   imageUrl: '', type: 'Top'       },
  { id: '7',  name: 'Running Shoes',    imageUrl: '', type: 'Shoes'     },
  { id: '8',  name: 'Denim Jacket',     imageUrl: '', type: 'Top'       },
  { id: '9',  name: 'Chinos',           imageUrl: '', type: 'Bottom'    },
  { id: '10', name: 'Wool Coat',        imageUrl: '', type: 'Outerwear' },
  { id: '11', name: 'Turtleneck',       imageUrl: '', type: 'Top'       },
  { id: '12', name: 'Sweatpants',       imageUrl: '', type: 'Bottom'    },
]

const OCCASION_OPTIONS = ['Casual', 'Formal', 'Party', 'Sport', 'Business', 'Date Night']

function StarRating({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => onChange(star)}
          className={`text-2xl transition-colors ${star <= value ? 'text-[#36475B]' : 'text-gray-300'}`}
        >
          ★
        </button>
      ))}
    </div>
  )
}

// Shows all available items with search + type filter.
function ItemPickerModal({
  items,
  selectedIds,
  onToggle,
  onClose,
}: {
  items: Item[]
  selectedIds: string[]
  onToggle: (id: string) => void
  onClose: () => void
}) {
  // Search input state — filters items by name
  const [search, setSearch] = useState('')

  // Active type filter — 'All' shows everything
  const [typeFilter, setTypeFilter] = useState('All')

  // Get unique item types for the filter buttons
  const types = ['All', ...Array.from(new Set(items.map((i) => i.type)))]

  // Apply search + type filter together
  const filtered = items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase())
    const matchesType   = typeFilter === 'All' || item.type === typeFilter
    return matchesSearch && matchesType
  })

  return (
    // Backdrop: clicking it closes the modal
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4"
      onClick={onClose}
    >
      {/* Modal card: stopPropagation so clicking inside doesn't close it */}
      <div
        className="bg-[#EFEAE3] rounded-2xl shadow-2xl w-full max-w-lg flex flex-col"
        style={{ maxHeight: '80vh' }}
        onClick={(e) => e.stopPropagation()}
      >

        {/* Header */}
        <div className="p-5 pb-3 border-b border-[#C4B5A0]">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold text-[#36475B]">Select Items</h3>
            <span className="text-sm text-gray-500">
              {selectedIds.length} selected
            </span>
          </div>

          {/* Search input */}
          <input
            type="text"
            placeholder="Search items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-[#C4B5A0] rounded-xl px-4 py-2 bg-white
                       text-[#36475B] placeholder-gray-400 focus:outline-none
                       focus:ring-2 focus:ring-[#36475B] text-sm mb-3"
          />

          {/* Type filter pills */}
          <div className="flex gap-2 flex-wrap">
            {types.map((type) => (
              <button
                key={type}
                onClick={() => setTypeFilter(type)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                  typeFilter === type
                    ? 'bg-[#36475B] text-white'
                    : 'bg-white border border-[#C4B5A0] text-gray-600 hover:border-[#36475B]'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable item list; this is the main scrollable area */}
        <div className="overflow-y-auto flex-1 p-4">
          {filtered.length === 0 ? (
            <p className="text-center text-gray-400 text-sm py-8">No items match your search</p>
          ) : (
            <div className="flex flex-col gap-2">
              {filtered.map((item) => {
                const isSelected = selectedIds.includes(item.id)
                return (
                  <button
                    key={item.id}
                    onClick={() => onToggle(item.id)}
                    className={`flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all ${
                      isSelected
                        ? 'border-[#36475B] bg-[#36475B]/10'
                        : 'border-[#C4B5A0] bg-white hover:border-[#36475B]'
                    }`}
                  >
                    {/* Item thumbnail */}
                    <div className="w-12 h-12 rounded-lg bg-gray-200 overflow-hidden flex-shrink-0 flex items-center justify-center text-gray-400 text-sm font-bold">
                      {item.imageUrl
                        ? <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                        : item.type[0]
                      }
                    </div>

                    {/* Item name + type */}
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-semibold truncate ${isSelected ? 'text-[#36475B]' : 'text-gray-700'}`}>
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-400">{item.type}</p>
                    </div>

                    {/* Checkbox indicator on the right */}
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      isSelected ? 'border-[#36475B] bg-[#36475B]' : 'border-gray-300'
                    }`}>
                      {isSelected && <span className="text-white text-xs">✓</span>}
                    </div>
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* Footer: Done button closes the modal and returns to the form */}
        <div className="p-4 border-t border-[#C4B5A0]">
          <button
            onClick={onClose}
            className="w-full py-2 rounded-xl bg-[#36475B] text-white font-semibold
                       hover:bg-[#2a3848] transition-colors"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  )
}

// used to select the elements of a outfit
function OutfitForm({
  availableItems,
  initialOutfit,
  onSave,
  onDelete,
  onCancel,
}: {
  availableItems: Item[]
  initialOutfit?: Outfit
  onSave: (imageUrl: string, details: OutfitDetails) => void
  onDelete?: () => void   // only provided in edit mode
  onCancel: () => void
}) {
  const [imageUrl, setImageUrl] = useState(initialOutfit?.imageUrl ?? '')
  const [details, setDetails] = useState<OutfitDetails>(
    initialOutfit?.details ?? {
      name: '',
      collection: '',
      itemIds: [],
      popularity: 0,
      isAvailable: true,
      description: '',
      occasion: '',
    }
  )

  // Tracks which required fields are missing — shown as red hints under the field
  const [errors, setErrors] = useState({ name: false, itemIds: false })

  // Controls whether the ItemPickerModal is open on top of this form
  const [showItemPicker, setShowItemPicker] = useState(false)

  const imageInputRef = useRef<HTMLInputElement>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setImageUrl(reader.result as string)
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  const toggleItem = (id: string) => {
    setDetails((prev) => ({
      ...prev,
      itemIds: prev.itemIds.includes(id)
        ? prev.itemIds.filter((i) => i !== id)
        : [...prev.itemIds, id],
    }))
  }

  const updateField = <K extends keyof OutfitDetails>(key: K, value: OutfitDetails[K]) =>
    setDetails((prev) => ({ ...prev, [key]: value }))

  // Validates required fields before calling onSave.
  // If name or itemIds are missing, sets errors so red hints appear under each field.
  const handleSave = () => {
    const nameEmpty  = !details.name.trim()
    const noItems    = details.itemIds.length === 0
    if (nameEmpty || noItems) {
      setErrors({ name: nameEmpty, itemIds: noItems })
      return  // stop here — don't call onSave
    }
    onSave(imageUrl, details)
  }

  const isEditing = initialOutfit !== undefined

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-[#EFEAE3] rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="p-6 pb-0">
          <h2 className="text-2xl font-bold text-[#36475B]">
            {isEditing ? 'Edit Outfit' : 'New Outfit'}
          </h2>
        </div>

        {/* Body */}
        <div className="flex flex-col md:flex-row gap-6 p-6">

          {/* ── LEFT: image ── */}
          <div className="flex-shrink-0">
            <input
              type="file"
              accept="image/*"
              ref={imageInputRef}
              onChange={handleImageChange}
              className="hidden"
            />
            <button
              onClick={() => imageInputRef.current?.click()}
              className="w-56 h-64 rounded-2xl border-2 border-dashed border-[#B0A090]
                         bg-white flex items-center justify-center overflow-hidden
                         hover:border-[#36475B] transition-colors"
            >
              {imageUrl ? (
                <img src={imageUrl} alt="outfit" className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center gap-2 text-[#B0A090]">
                  <span className="text-4xl">+</span>
                  <span className="text-sm">Add Photo</span>
                </div>
              )}
            </button>
            {imageUrl && (
              <button
                onClick={() => imageInputRef.current?.click()}
                className="mt-2 text-xs text-gray-400 hover:text-[#36475B] w-full text-center"
              >
                Change photo
              </button>
            )}
          </div>

          {/* RIGHT: fields */}
          <div className="flex-1 flex flex-col gap-4">

            {/* Required Outfit Name */}
            <div>
              <label className="text-sm font-semibold text-[#36475B]">
                Outfit Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Sunday Casual"
                value={details.name}
                onChange={(e) => {
                  updateField('name', e.target.value)
                  // Clear the name error as soon as the user starts typing
                  if (errors.name) setErrors((prev) => ({ ...prev, name: false }))
                }}
                className={`w-full mt-1 border-b bg-transparent px-1 py-1
                            text-[#36475B] placeholder-gray-400 focus:outline-none
                            focus:border-[#36475B] transition-colors ${
                              errors.name ? 'border-red-400' : 'border-[#C4B5A0]'
                            }`}
              />
              {/* Error: only visible when name is missing and Save was attempted */}
              {errors.name && (
                <p className="text-xs text-red-400 mt-1">Outfit name is required</p>
              )}
            </div>

            {/* Collection */}
            <div>
              <label className="text-sm font-semibold text-[#36475B]">Collection</label>
              <input
                type="text"
                placeholder="e.g. Summer 2025"
                value={details.collection}
                onChange={(e) => updateField('collection', e.target.value)}
                className="w-full mt-1 border-b border-[#C4B5A0] bg-transparent px-1 py-1
                           text-[#36475B] placeholder-gray-400 focus:outline-none focus:border-[#36475B]"
              />
            </div>

            {/* Required Items: button opens the ItemPickerModal */}
            <div>
              <label className="text-sm font-semibold text-[#36475B]">
                Items <span className="text-red-400">*</span>
              </label>
              <button
                onClick={() => {
                  setShowItemPicker(true)
                  // Clear the items error as soon as the picker is opened
                  if (errors.itemIds) setErrors((prev) => ({ ...prev, itemIds: false }))
                }}
                className={`w-full mt-1 flex items-center justify-between px-3 py-2
                           border rounded-xl bg-white text-sm
                           hover:border-[#36475B] transition-colors ${
                             errors.itemIds ? 'border-red-400' : 'border-[#C4B5A0]'
                           }`}
              >
                <span className={details.itemIds.length > 0 ? 'text-[#36475B] font-medium' : 'text-gray-400'}>
                  {details.itemIds.length > 0
                    ? `${details.itemIds.length} item${details.itemIds.length !== 1 ? 's' : ''} selected`
                    : 'Select items...'}
                </span>
                {/* Arrow icon */}
                <span className="text-gray-400 text-xs">▼</span>
              </button>
              {/* Error: only visible when no items selected and Save was attempted */}
              {errors.itemIds && (
                <p className="text-xs text-red-400 mt-1">At least one item is required</p>
              )}

              {/* Shows the names of selected items below the button as chips */}
              {details.itemIds.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {details.itemIds.map((id) => {
                    const item = availableItems.find((i) => i.id === id)
                    return item ? (
                      <span
                        key={id}
                        className="px-2 py-0.5 bg-[#36475B]/10 text-[#36475B] rounded-full text-xs font-medium"
                      >
                        {item.name}
                      </span>
                    ) : null
                  })}
                </div>
              )}
            </div>

            {/* Popularity */}
            <div>
              <label className="text-sm font-semibold text-[#36475B]">Popularity</label>
              <div className="mt-1">
                <StarRating value={details.popularity} onChange={(n) => updateField('popularity', n)} />
              </div>
            </div>

            {/* Is Available toggle */}
            <div className="flex items-center gap-3">
              <label className="text-sm font-semibold text-[#36475B]">Is Available</label>
              <button
                onClick={() => updateField('isAvailable', !details.isAvailable)}
                className={`relative w-11 h-6 rounded-full transition-colors ${
                  details.isAvailable ? 'bg-[#36475B]' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                    details.isAvailable ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
              <span className="text-sm text-gray-500">
                {details.isAvailable ? 'Available' : 'Unavailable'}
              </span>
            </div>

            {/* Description */}
            <div>
              <label className="text-sm font-semibold text-[#36475B]">Description</label>
              <textarea
                placeholder="Describe this outfit..."
                value={details.description}
                onChange={(e) => updateField('description', e.target.value)}
                rows={2}
                className="w-full mt-1 border border-[#C4B5A0] rounded-xl px-3 py-2 bg-white
                           text-[#36475B] placeholder-gray-400 focus:outline-none
                           focus:ring-2 focus:ring-[#36475B] resize-none text-sm"
              />
            </div>

            {/* Occasion */}
            <div>
              <label className="text-sm font-semibold text-[#36475B]">Occasion</label>
              <select
                value={details.occasion}
                onChange={(e) => updateField('occasion', e.target.value)}
                className="w-full mt-1 border-b border-[#C4B5A0] bg-transparent px-1 py-1
                           text-[#36475B] focus:outline-none focus:border-[#36475B]"
              >
                <option value="">Select occasion...</option>
                {OCCASION_OPTIONS.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </div>

          </div>
        </div>

        {/*
          Footer: three buttons
          Cancel | Delete (edit only) | Save
        */}
        <div className="flex items-center justify-between px-6 pb-6">

          {/* Left side: Cancel */}
          <button
            onClick={onCancel}
            className="px-6 py-2 rounded-xl border border-[#C4B5A0] text-gray-500
                       hover:bg-[#E0D8CE] transition-colors"
          >
            Cancel
          </button>

          {/* Right side: Delete (edit only) + Save */}
          <div className="flex gap-3">
            {isEditing && onDelete && (
              <button
                onClick={onDelete}
                className="px-6 py-2 rounded-xl bg-red-500 text-white font-semibold
                           hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            )}
            <button
              onClick={handleSave}
              className="px-6 py-2 rounded-xl bg-[#36475B] text-white font-semibold
                         hover:bg-[#2a3848] transition-colors"
            >
              Save
            </button>
          </div>

        </div>
      </div>

      {/* ItemPickerModal sits on top of the OutfitForm when open */}
      {showItemPicker && (
        <ItemPickerModal
          items={availableItems}
          selectedIds={details.itemIds}
          onToggle={toggleItem}
          onClose={() => setShowItemPicker(false)}
        />
      )}
    </div>
  )
}

// what pops up when hovering over the outfit
function OutfitCard({
  outfit,
  onEdit,
}: {
  outfit: Outfit
  onEdit: () => void
}) {
  return (
    // `group` lets child elements respond to hover on this container
    <div className="aspect-square rounded-xl overflow-hidden bg-gray-200 shadow-sm relative group">

      {/* Outfit image */}
      {outfit.imageUrl ? (
        <img src={outfit.imageUrl} alt="outfit" className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full bg-[#E0D8CE] flex items-center justify-center text-gray-400 text-sm">
          No image
        </div>
      )}

      {/* Dark overlay — appears on hover, shows outfit details */}
      <div className="absolute inset-0 bg-[#36475B]/80 opacity-0 group-hover:opacity-100
                      transition-opacity duration-200 flex flex-col justify-end p-3 text-white">
        {outfit.details.name && (
          <p className="text-sm font-bold truncate mb-0.5">{outfit.details.name}</p>
        )}
        {outfit.details.occasion && (
          <span className="text-xs font-semibold bg-white/20 rounded-full px-2 py-0.5 w-fit mb-1">
            {outfit.details.occasion}
          </span>
        )}
        {outfit.details.description && (
          <p className="text-xs line-clamp-2">{outfit.details.description}</p>
        )}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs">
            {'★'.repeat(outfit.details.popularity)}
            {'☆'.repeat(5 - outfit.details.popularity)}
          </span>
          <span className={`w-2 h-2 rounded-full ${outfit.details.isAvailable ? 'bg-green-400' : 'bg-red-400'}`} />
        </div>
      </div>

      {/*
        "..." button 
      */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          onEdit()
        }}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100
                   transition-opacity duration-200 w-8 h-8 rounded-full
                   bg-white/90 hover:bg-white text-[#36475B] font-bold
                   flex items-center justify-center shadow text-sm"
        aria-label="Edit outfit"
      >
        •••
      </button>

    </div>
  )
}

export default function NewOutfitPage() {
  const [outfits, setOutfits] = useState<Outfit[]>([])

  // null = closed | 'new' = add mode | number = edit mode (outfit id)
  const [formMode, setFormMode] = useState<null | 'new' | number>(null)

  const [availableItems] = useState<Item[]>(PLACEHOLDER_ITEMS)

  const handleSaveNew = (imageUrl: string, details: OutfitDetails) => {
    setOutfits((prev) => [...prev, { id: Date.now(), imageUrl, details }])
    setFormMode(null)
  }

  const handleSaveEdit = (id: number, imageUrl: string, details: OutfitDetails) => {
    setOutfits((prev) =>
      prev.map((o) => (o.id === id ? { ...o, imageUrl, details } : o))
    )
    setFormMode(null)
  }

  const handleDelete = (id: number) => {
    setOutfits((prev) => prev.filter((o) => o.id !== id))
    setFormMode(null)
  }

  const outfitBeingEdited = typeof formMode === 'number'
    ? outfits.find((o) => o.id === formMode)
    : undefined

  return (
    <div className="min-h-screen bg-[#D4C4B0] p-8">

      {/* Page header */}
      <h1 className="text-2xl font-bold text-[#36475B] mb-6">My Outfits</h1>

      {/* Outfit panel: matches the profile page tab content style */}
      <div className="w-full min-h-[calc(100vh-10rem)] bg-[#EFEAE3] rounded-2xl p-6">

      {/* Outfit grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">

        {outfits.map((outfit) => (
          <OutfitCard
            key={outfit.id}
            outfit={outfit}
            onEdit={() => setFormMode(outfit.id)}
          />
        ))}

        {/* + box:  opens add mode */}
        <button
          onClick={() => setFormMode('new')}
          className="aspect-square rounded-xl border-2 border-dashed border-[#B0A090]
                     flex items-center justify-center text-[#B0A090] text-3xl
                     hover:border-[#36475B] hover:text-[#36475B] hover:bg-[#E8E0D5]
                     transition-all duration-200"
          aria-label="Add outfit"
        >
          +
        </button>

      </div>

      </div> {/* end outfit panel */}
      {formMode === 'new' && (
        <OutfitForm
          availableItems={availableItems}
          onSave={handleSaveNew}
          onCancel={() => setFormMode(null)}
        />
      )}

      {/* Edit mode: pre-filled form, delete button shown */}
      {typeof formMode === 'number' && outfitBeingEdited && (
        <OutfitForm
          availableItems={availableItems}
          initialOutfit={outfitBeingEdited}
          onSave={(imageUrl, details) => handleSaveEdit(formMode, imageUrl, details)}
          onDelete={() => handleDelete(formMode)}
          onCancel={() => setFormMode(null)}
        />
      )}

    </div>
  )
}