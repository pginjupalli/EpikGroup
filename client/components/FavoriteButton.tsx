import React from 'react'
import { FaHeart } from 'react-icons/fa'

interface HeartButtonProps {
    liked: boolean;
    onClick: () => void;
}

export default function HeartButton({ liked, onClick }: HeartButtonProps) {
  return (
    <button
      aria-pressed={liked}
      onClick={onClick}
      className="text-[#E0D0B9] hover:text-[#B56311] focus:outline-none"
    >
      <FaHeart
        className={`transition-transform ${
          liked ? "text-[#B56311] scale-110" : ""
        }`}
        size={24}
      />
    </button>
  )
}
