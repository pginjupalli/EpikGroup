'use client'
import Link from 'next/link'
import { useState } from 'react';

interface ClosetToggleProps {
    items: any[];
    outfits: any[];
}

export default function ClosetToggle({items, outfits}: ClosetToggleProps) {
  const [showItems, setShowItems] = useState(true);
  
    return (
    <div className="h-screen w-full bg-[#EFEAE3] p-6 flex flex-col">
      <h1 className="text-4xl font-bold mb-6">My Closet</h1>
     <div className="flex gap-2 mb-6">
        <button onClick={() => setShowItems(true)} className='bg-white rounded-lg shadow-lg px-3 py-2'>
          Items
        </button>
        <button onClick={() => setShowItems(false)} className='bg-white rounded-lg shadow-lg px-3 py-2'>
          Outfits
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] auto-rows-min gap-4">
          {showItems ? items.map((item: any, _: any) => (
            <Link key={item.id} href={`/viewitem?id=${item.id}`} className="bg-white rounded-lg shadow-lg overflow-hidden wrap-break-words">
              <img src={item.image} alt={item.name} className="w-full aspect-square object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{item.name}</h3>
              </div>
            </Link>
          )) : outfits.map((outfit: any, _: any) => (
            <Link key={outfit.id} href={`/viewoutfit/${outfit.id}`} className="bg-white rounded-lg shadow-lg overflow-hidden wrap-break-words">
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{outfit.name}</h3>
              </div>
            </Link>))
            }
        
        </div>
      </div>
    </div>
  )
}
