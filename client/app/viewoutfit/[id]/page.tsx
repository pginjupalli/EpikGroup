'use client'

import ItemName from "@/components/EditableTitle";
import ImageViewAndUpload from "@/components/ImageViewAndUpload";
import TagList from "@/components/EditiableTagList";
import Description from "@/components/EditableDescription";
import Toggle from "@/components/Toggle";
import HeartButton from "@/components/FavoriteButton";
import CarouselGroup from "@/components/CarouselGroup";
import Divider from "@/components/Divider";
import StarRating from "@/components/StarRating";
import ItemPickerModal, { Item } from "@/components/ItemPickerModal";
import { useParams } from 'next/navigation'
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from 'next/navigation'

const supabase = createClient()
const OCCASION_OPTIONS = ['Casual', 'Formal', 'Party', 'Sport', 'Business', 'Date Night']

export default function ViewOutfitPage() {
  const params = useParams()
  const router = useRouter()
  const outfitId = params.id

  const [itemName, setItemName] = useState("")
  const [imageURL, setImageURL] = useState("")
  const [tagList, setTagList] = useState([])
  const [description, setDescription] = useState("")
  const [isAvailable, setIsAvailable] = useState(true)
  const [isLiked, setIsLiked] = useState(false)
  const [popularity, setPopularity] = useState(0)
  const [occasion, setOccasion] = useState("")
  const [itemIds, setItemIds] = useState<string[]>([])
  const [availableItems, setAvailableItems] = useState<Item[]>([])
  const [showItemPicker, setShowItemPicker] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const [outfitRes, itemsRes] = await Promise.all([
        fetch(`http://localhost:8000/api/outfit/${outfitId}`),
        fetch('http://localhost:8000/api/items'),
      ])
      if (!outfitRes.ok) { console.error(await outfitRes.text()); return }
      if (!itemsRes.ok) { console.error(await itemsRes.text()); return }

      const { outfit, items } = await outfitRes.json()
      const allItems: Item[] = await itemsRes.json()

      setItemName(outfit.name ?? "")
      setImageURL(outfit.image ?? "")
      setTagList(outfit.tags ?? [])
      setDescription(outfit.description ?? "")
      setIsAvailable(outfit.isAvailable)
      setIsLiked(outfit.isLiked)
      setPopularity(outfit.popularity ?? 0)
      setOccasion(outfit.occasion ?? "")
      setItemIds(items.map((i: any) => String(i.id)))
      setAvailableItems(allItems)
      setLoading(false)
    }

    if (outfitId) load()
  }, [outfitId])

  const toggleItem = (id: string) => {
    setItemIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const selectedItems = availableItems.filter((i) => itemIds.includes(i.id))
  const carouselImages = selectedItems.map((i) => ({ src: i.imageUrl, name: i.name }))

  const handleSaveChanges = async () => {
    const res = await fetch('http://localhost:8000/api/outfit/updateoutfit', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: Number(outfitId),
        name: itemName,
        description,
        item_ids: itemIds.map(Number),
        popularity: popularity || null,
        ...(occasion ? { occasion } : {}),
      }),
    })
    if (!res.ok) {
      console.error(await res.text())
      alert('Failed to save changes')
      return
    }
    alert('Saved!')
  }

  const onIsAvailableChange = async () => {
    const newValue = !isAvailable
    setIsAvailable(newValue)
    const { error } = await supabase.from('Outfits').update({ isAvailable: newValue }).eq('id', outfitId)
    if (error) { setIsAvailable(!newValue); console.error(error) }
  }

  const onLikeToggle = async () => {
    const newValue = !isLiked
    setIsLiked(newValue)
    const { error } = await supabase.from('Outfits').update({ isLiked: newValue }).eq('id', outfitId)
    if (error) { setIsLiked(!newValue); console.error(error) }
  }

  const handleDelete = async () => {
    if (!window.confirm("Delete this outfit?")) return
    const { error } = await supabase.from('Outfits').delete().eq('id', outfitId)
    if (error) { console.error(error); return }
    router.push('/viewcloset')
  }

  if (loading) return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-[#B56311] font-bold text-lg">Loading outfit...</p>
    </div>
  )

  return (
    <div className="flex items-center justify-center p-7 h-screen">
      <div className="bg-[#EFEAE4] shadow-xl rounded-xl h-full w-full flex flex-col gap-y-5 p-5 overflow-y-scroll scrollbar-thin scrollbar-thumb-[#B56311]/80 scrollbar-track-[#E0D0B9]/80">

        <div className="w-full flex flex-col md:flex-row gap-8 p-3">
          {/* LEFT: outfit image */}
          <div className="flex-shrink-0 flex justify-center md:justify-start">
            <ImageViewAndUpload imageLink={imageURL} />
          </div>

          {/* RIGHT: outfit info */}
          <div className="flex-1 flex flex-col gap-y-4 min-w-0">
            <ItemName itemName={itemName} onItemNameChange={setItemName} />
            <TagList tags={tagList} listName="Outfit Tag(s)" />
            <Description description={description} descriptionName="Outfit Description" />

            <div className="flex items-center gap-2">
              <p className="font-bold inline text-[#B56311]">Popularity:</p>
              <StarRating value={popularity} onChange={setPopularity} />
            </div>

            <div className="flex items-center gap-2">
              <p className="font-bold inline text-[#B56311]">Occasion:</p>
              <select
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
                className="border-b border-[#C4B5A0] bg-transparent px-1 py-1 text-[#36475B] focus:outline-none focus:border-[#36475B] flex-1"
              >
                <option value="">Select occasion...</option>
                {OCCASION_OPTIONS.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col items-start gap-2">
              <p className="font-bold inline text-[#B56311]">Items in this outfit:</p>
              <button
                onClick={() => setShowItemPicker(true)}
                className="w-full flex items-center justify-between px-3 py-2 border border-[#C4B5A0] rounded-xl bg-white text-sm hover:border-[#36475B] transition-colors"
              >
                <span className={itemIds.length > 0 ? 'text-[#36475B] font-medium' : 'text-gray-400'}>
                  {itemIds.length > 0
                    ? `${itemIds.length} item${itemIds.length !== 1 ? 's' : ''} selected`
                    : 'Select items...'}
                </span>
                <span className="text-gray-400 text-xs">▼</span>
              </button>
              {selectedItems.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {selectedItems.map((item) => (
                    <span
                      key={item.id}
                      className="px-2 py-0.5 bg-[#36475B]/10 text-[#36475B] rounded-full text-xs font-medium"
                    >
                      {item.name}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <p className="font-bold inline text-[#B56311]">Is Available: </p>
              <Toggle checked={isAvailable} onCheckedChange={onIsAvailableChange} />
            </div>

            <div className="flex items-center gap-4 flex-row flex-wrap mt-4">
              <button
                onClick={handleSaveChanges}
                className="bg-[#36475B] text-white rounded-lg px-4 py-1 hover:bg-[#2a3848] transition-colors duration-200 font-semibold"
              >
                Save Changes
              </button>
              <button
                onClick={handleDelete}
                className="bg-[#B56311] text-[#E0D0B9] rounded-lg px-3 py-1 hover:bg-[#9A520F] transition-colors duration-200"
              >
                Delete Outfit
              </button>
              <HeartButton liked={isLiked} onClick={onLikeToggle} />
            </div>
          </div>
        </div>

        <Divider />
        <CarouselGroup images={carouselImages} groupName="Included Items" />
        <Divider />
        <CarouselGroup images={carouselImages} groupName="Similar Outfits" />
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