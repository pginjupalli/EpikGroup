"use client"
import { useState } from "react"

export interface Item {
  id: string
  name: string
  imageUrl: string
  type: string
}

type Props = {
  items: Item[]
  selectedIds: string[]
  onToggle: (id: string) => void
  onClose: () => void
}

export default function ItemPickerModal({ items, selectedIds, onToggle, onClose }: Props) {
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('All')

  const types = ['All', ...Array.from(new Set(items.map((i) => i.type)))]

  const filtered = items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase())
    const matchesType = typeFilter === 'All' || item.type === typeFilter
    return matchesSearch && matchesType
  })

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#EFEAE3] rounded-2xl shadow-2xl w-full max-w-lg flex flex-col"
        style={{ maxHeight: '80vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 pb-3 border-b border-[#C4B5A0]">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold text-[#36475B]">Select Items</h3>
            <span className="text-sm text-gray-500">{selectedIds.length} selected</span>
          </div>
          <input
            type="text"
            placeholder="Search items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-[#C4B5A0] rounded-xl px-4 py-2 bg-white text-[#36475B] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#36475B] text-sm mb-3"
          />
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
                    <div className="w-12 h-12 rounded-lg bg-gray-200 overflow-hidden flex-shrink-0 flex items-center justify-center text-gray-400 text-sm font-bold">
                      {item.imageUrl
                        ? <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                        : item.type[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-semibold truncate ${isSelected ? 'text-[#36475B]' : 'text-gray-700'}`}>
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-400">{item.type}</p>
                    </div>
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

        <div className="p-4 border-t border-[#C4B5A0]">
          <button
            onClick={onClose}
            className="w-full py-2 rounded-xl bg-[#36475B] text-white font-semibold hover:bg-[#2a3848] transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  )
}
