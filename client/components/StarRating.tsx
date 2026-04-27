"use client"
import { useState } from "react"

type Props = {
  value: number
  onChange: (n: number) => void
}

export default function StarRating({ value, onChange }: Props) {
  const [hovered, setHovered] = useState(0)
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          className="text-2xl leading-none cursor-pointer"
        >
          <span
            className={
              (hovered || value) >= star ? "text-[#B56311]" : "text-[#E0D0B9]"
            }
          >
            ★
          </span>
        </button>
      ))}
    </div>
  )
}
