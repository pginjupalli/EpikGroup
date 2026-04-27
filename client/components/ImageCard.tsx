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
        rounded-lg shadow-lg
      "
    >
      {/* Image — only render when src is present */}
      {src && !imageError && (
          <img
            src={src}
            alt={name}
            className="
              object-cover
              transition duration-300
            group-hover:brightness-75
            w-full h-50 rounded-lg
          "
          onError={() => setImageError(true)}
        />
      )}

      {/* Placeholder so the card keeps its size when there's no image */}
      {(!src || imageError) && <div className="w-50 h-50 rounded-lg" />}

      {/* Overlay text (hover or fallback) */}
      <div
        className={`
          absolute inset-0
          flex items-center justify-center
          font-bold text-center text-3xl
          transition-opacity duration-300
          ${(!src || imageError)
            ? "opacity-100 text-gray-700"
            : "opacity-0 group-hover:opacity-100 text-white"}
        `}
      >
        {name}
      </div>
    </div>
    </a>
  );
}