'use client'
import React, { useState } from 'react'

export default function ViewClosetPage() {
  const [filter, setFilter] = useState('all')

  const items = [
    { id: 1, title: 'Item 1', description: 'item desc', image: '/test_img.jpeg', type: 'item' },
    { id: 2, title: 'Outfit 1', description: 'item desc', image: '/test_img.jpeg', type: 'outfit' },
    { id: 3, title: 'Item 2', description: 'item desc', image: '/test_img.jpeg', type: 'item' },
    { id: 4, title: 'Outfit 2', description: 'item desc', image: '/test_img.jpeg', type: 'outfit' },
    { id: 5, title: 'Outfit 3', description: 'item desc', image: '/test_img.jpeg', type: 'outfit' },
    { id: 6, title: 'Outfit 4', description: 'item desc', image: '/test_img.jpeg', type: 'outfit' },
    { id: 7, title: 'Outfit 5', description: 'item desc', image: '/test_img.jpeg', type: 'outfit' },
    { id: 8, title: 'Outfit 6', description: 'item desc', image: '/test_img.jpeg', type: 'outfit' },
    { id: 9, title: 'Item 3', description: 'item desc', image: '/test_img.jpeg', type: 'item' },
    { id: 10, title: 'Item 4', description: 'item desc', image: '/test_img.jpeg', type: 'item' },
    { id: 11, title: 'Item 5', description: 'item desc', image: '/test_img.jpeg', type: 'item' },
    { id: 12, title: 'Item 6', description: 'item desc', image: '/test_img.jpeg', type: 'item' },
    { id: 13, title: 'Item 7', description: 'item desc', image: '/test_img.jpeg', type: 'item' },
  ]

  const filteredItems = items.filter(item => {
    if (filter === 'all') return true
    return item.type === filter
  })

  return (
    <div className="h-screen w-full bg-[#EFEAE3] p-6 flex flex-col">
      <h1 className="text-4xl font-bold mb-6">My Closet</h1>
     <div className="flex gap-2 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
            filter === 'all' 
              ? 'bg-white text-900 shadow-lg' 
              : 'bg-white/50 text-600 hover:bg-white/70'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('outfit')}
          className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
            filter === 'outfit' 
              ? 'bg-white text-900 shadow-lg' 
              : 'bg-white/50 text-600 hover:bg-white/70'
          }`}
        >
          Outfits
        </button>
        <button
          onClick={() => setFilter('item')}
          className={`px-6 py-2 rounded-lg font-semibold ${
            filter === 'item' 
              ? 'bg-white text-900 shadow-lg' 
              : 'bg-white/50 text-600 hover:bg-white/70'
          }`}
        >
          Items
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] auto-rows-min gap-4">
          {filteredItems.map(item => (
            <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden break-words">
              <img src={item.image} alt={item.title} className="w-full aspect-square object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
