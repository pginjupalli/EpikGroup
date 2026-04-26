'use client'

import React from 'react'
import ItemName from "@/components/EditableTitle";
import ImageViewAndUpload from "@/components/ImageViewAndUpload";
import TagList from "@/components/EditiableTagList";
import Description from "@/components/EditableDescription";
import Toggle from "@/components/Toggle";
import HeartButton from "@/components/FavoriteButton";
import CarouselGroup from "@/components/CarouselGroup";
import Divider from "@/components/Divider";
import { useParams } from 'next/navigation'
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from 'next/navigation'

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
  const [outfitImages, setOutfitImages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchOutfit() {
      const { data, error } = await supabase
        .from('outfits')
        .select('*')
        .eq('id', outfitId)
        .single()

      if (error) { console.error(error); return }

      setItemName(data.name)
      setImageURL(data.image_url)
      setTagList(data.tags)
      setDescription(data.description)
      setIsAvailable(data.is_available)
      setIsLiked(data.is_liked)
      setOutfitImages(data.items ?? [])  // outfit's included items
      setLoading(false)
    }

    if (outfitId) fetchOutfit()
  }, [outfitId])

  const onIsAvailableChange = async () => {
    const newValue = !isAvailable
    setIsAvailable(newValue)
    const { error } = await supabase.from('outfits').update({ is_available: newValue }).eq('id', outfitId)
    if (error) { setIsAvailable(!newValue); console.error(error) }
  }

  const onLikeToggle = async () => {
    const newValue = !isLiked
    setIsLiked(newValue)
    const { error } = await supabase.from('outfits').update({ is_liked: newValue }).eq('id', outfitId)
    if (error) { setIsLiked(!newValue); console.error(error) }
  }

  const handleDelete = async () => {
    if (!window.confirm("Delete this outfit?")) return
    const { error } = await supabase.from('outfits').delete().eq('id', outfitId)
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
      <div className="bg-[#EFEAE4] shadow-xl rounded-xl h-full w-full flex items-center flex-col gap-y-5 p-5 overflow-y-scroll scrollbar-thin scrollbar-thumb-[#B56311]/80 scrollbar-track-[#E0D0B9]/80">
        <ItemName itemName={itemName} onItemNameChange={setItemName} />
        <div className="w-full p-3 flex flex-wrap gap-8 items-center justify-center">
          <ImageViewAndUpload imageLink={imageURL} />
          <div className="w-3xl flex flex-col gap-y-10 items-center">
            <div className="flex flex-col items-center gap-y-1">
              <TagList tags={tagList} listName="Outfit Tag(s)" />
              <Description description={description} descriptionName="Outfit Description" />
              <div className="flex items-center gap-2">
                <p className="font-bold inline text-[#B56311]">Is Available: </p>
                <Toggle checked={isAvailable} onCheckedChange={onIsAvailableChange} />
              </div>
            </div>
            <div className="flex items-center gap-4 justify-center flex-row flex-wrap mt-4">
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
        <CarouselGroup images={outfitImages} groupName="Included Items" />
        <Divider />
        <CarouselGroup images={outfitImages} groupName="Similar Outfits" />
      </div>
    </div>
  )
}