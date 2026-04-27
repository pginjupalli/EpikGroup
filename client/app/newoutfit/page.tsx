"use client"
import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import ItemName from "@/components/EditableTitle"
import ImageViewAndUpload from "@/components/ImageViewAndUpload"
import Toggle from "@/components/Toggle"
import StarRating from "@/components/StarRating"
import ItemPickerModal, { Item } from "@/components/ItemPickerModal"
import { createClient } from "@/lib/supabase/client"

const supabase = createClient()
const OCCASION_OPTIONS = ['Casual', 'Formal', 'Party', 'Sport', 'Business', 'Date Night']
const inputClass =
  "bg-transparent border-b border-[#B56311] text-[#B56311] outline-none text-sm placeholder-[#B56311]/40 w-40"

async function uploadOutfitImage(file: File): Promise<string> {
  const ext = file.name.split('.').pop() ?? 'jpg'
  const filename = `${Date.now()}.${ext}`
  const { error } = await supabase.storage.from('outfit_images').upload(filename, file)
  if (error) throw error
  return filename
}

function FieldRow({
  label,
  required,
  children,
}: {
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <p className="font-bold text-[#B56311] whitespace-nowrap">
        {label}
        {required && <span className="text-red-500"> *</span>}:
      </p>
      {children}
    </div>
  )
}

export default function NewOutfitPage() {
  const router = useRouter()

  const [itemName, setItemName] = useState("New Outfit")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [description, setDescription] = useState("")
  const [popularity, setPopularity] = useState(0)
  const [occasion, setOccasion] = useState("")
  const [isAvailable, setIsAvailable] = useState(true)
  const [itemIds, setItemIds] = useState<string[]>([])
  const [availableItems, setAvailableItems] = useState<Item[]>([])
  const [showItemPicker, setShowItemPicker] = useState(false)
  const [errors, setErrors] = useState({ name: false, items: false })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetch('http://localhost:8000/api/items')
      .then((r) => r.json())
      .then(setAvailableItems)
      .catch(console.error)
  }, [])

  const toggleItem = (id: string) => {
    setItemIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
    if (errors.items) setErrors((prev) => ({ ...prev, items: false }))
  }

  const selectedItems = availableItems.filter((i) => itemIds.includes(i.id))

  const handleSave = async () => {
    const nameMissing = !itemName.trim() || itemName === 'New Outfit'
    const itemsMissing = itemIds.length === 0
    if (nameMissing || itemsMissing) {
      setErrors({ name: nameMissing, items: itemsMissing })
      return
    }

    setSaving(true)

    let image_name: string | null = null
    if (imageFile) {
      try {
        image_name = await uploadOutfitImage(imageFile)
      } catch (err) {
        console.error(err)
        alert('Image upload failed')
        setSaving(false)
        return
      }
    }

    const res = await fetch('http://localhost:8000/api/outfit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: itemName,
        description,
        item_ids: itemIds,
        popularity,
        isAvailable,
        occasion,
        image_name,
      }),
    })
    if (!res.ok) {
      console.error(await res.text())
      alert('Failed to save outfit')
      setSaving(false)
      return
    }

    router.push('/viewcloset')
  }

  const handleCancel = () => {
    router.back()
  }

  return (
    <div className="flex items-center justify-center p-7 h-screen">
      <div className="bg-[#EFEAE4] shadow-xl rounded-xl h-full w-full flex items-center flex-col gap-y-5 p-5 overflow-y-scroll scrollbar-thin scrollbar-thumb-[#B56311]/80 scrollbar-track-[#E0D0B9]/80">
        <ItemName
          itemName={itemName}
          onItemNameChange={(n) => {
            setItemName(n)
            if (errors.name) setErrors((prev) => ({ ...prev, name: false }))
          }}
          alwaysShowEdit
        />
        {errors.name && (
          <p className="text-red-500 text-xs">Outfit name is required</p>
        )}

        <div className="w-full p-3 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <ImageViewAndUpload
            imageLink=""
            objectFit="cover"
            onFileChange={setImageFile}
          />

          <div className="flex flex-col gap-y-4">
            <FieldRow label="Items" required>
              <button
                type="button"
                onClick={() => setShowItemPicker(true)}
                className="flex items-center gap-2 bg-transparent border-b border-[#B56311] text-[#B56311] outline-none text-sm w-40 text-left"
              >
                <span className="flex-1">
                  {itemIds.length > 0 ? `${itemIds.length} selected` : 'Select items...'}
                </span>
                <span className="text-xs">▼</span>
              </button>
            </FieldRow>
            {selectedItems.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {selectedItems.map((i) => (
                  <span
                    key={i.id}
                    className="px-2 py-0.5 bg-[#B56311]/10 text-[#B56311] rounded-full text-xs"
                  >
                    {i.name}
                  </span>
                ))}
              </div>
            )}
            {errors.items && (
              <p className="text-red-500 text-xs">At least one item is required</p>
            )}

            <FieldRow label="Description">
              <input
                className={inputClass}
                placeholder="..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FieldRow>

            <FieldRow label="Occasion">
              <select
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
                className="bg-transparent border-b border-[#B56311] text-[#B56311] outline-none text-sm w-40"
              >
                <option value="">Select...</option>
                {OCCASION_OPTIONS.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </FieldRow>

            <FieldRow label="Popularity">
              <StarRating value={popularity} onChange={setPopularity} />
            </FieldRow>

            <FieldRow label="Is Available">
              <Toggle
                checked={isAvailable}
                onCheckedChange={() => setIsAvailable(!isAvailable)}
              />
            </FieldRow>
          </div>
        </div>

        <div className="flex items-center gap-4 justify-center flex-row">
          <button
            onClick={handleCancel}
            className="bg-[#E0D0B9] text-[#B56311] border border-[#B56311] rounded-lg px-3 py-1 hover:bg-[#D4C0A8] transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-[#B56311] text-[#E0D0B9] rounded-lg px-3 py-1 hover:bg-[#9A520F] transition-colors duration-200 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>

      {showItemPicker && (
        <ItemPickerModal
          items={availableItems}
          selectedIds={itemIds}
          onToggle={toggleItem}
          onClose={() => setShowItemPicker(false)}
        />
      )}
    </div>
  )
}
