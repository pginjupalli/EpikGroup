'use server'
import ClosetToggle from "@/components/ClosetToggle";

export default async function ViewClosetPage() {
  const data = await fetch('http://localhost:8000/closet').then(res => res.json());

  return (
    <ClosetToggle items={data.item} outfits={data.outfit}/>
  )
}
