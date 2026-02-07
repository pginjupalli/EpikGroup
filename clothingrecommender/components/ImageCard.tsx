"use client";
import { Link } from "@radix-ui/themes/dist/cjs/components/tab-nav.js";
import { useState } from "react";

type ImageCardProps = {
  src: string;
  name: string;
  url?: string;
};

export default function ImageCard({
  src,
  name,
  url
}: ImageCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <a href={url || '#'} className="w-fit h-fit">
    <div
      className="
        relative overflow-hidden
        group cursor-pointer
        bg-gray-200
        flex items-center justify-center
      "
    >
      {/* Image */}
      {!imageError && (
          <img
            src={src}
            alt={name}
            className="
              object-cover
              transition duration-300
            group-hover:brightness-75
            w-full h-50 border-2 border-[#B56311]
          "
          onError={() => setImageError(true)}
        />
      )}

      {/* Overlay text (hover or fallback) */}
      <div
        className={`
          absolute inset-0
          flex items-center justify-center
          text-[#B56311] font-bold text-center text-3xl 
          transition-opacity duration-300
          ${imageError ? "opacity-100 text-gray-700" : "opacity-0 group-hover:opacity-100"}
        `}
      >
        {name}
      </div>
    </div>
    </a>
  );
}