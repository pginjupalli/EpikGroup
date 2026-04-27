'use client';
import { FiEdit } from "react-icons/fi";
import { useState, useRef, useEffect } from 'react';

interface ImageViewAndUpload {
    imageLink: string;
    objectFit?: "cover" | "contain";
    onFileChange?: (file: File) => void;
}

export default function ImageViewAndUpload({imageLink, objectFit = "cover", onFileChange}: ImageViewAndUpload) {
  const [imageSrc, setImageSrc] = useState(imageLink);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setImageSrc(imageLink);
  }, [imageLink]);

  const handleIconClick = () => {
    fileInputRef.current?.click(); // open file picker
  };

  function handleImageChange(e: any) {
    const file = e.target.files?.[0];
    if (!file) return;

    const newUrl = URL.createObjectURL(file); // Create a temporary local URL
    setImageSrc(newUrl);
    onFileChange?.(file);
  }
  
  return (
    <div
      className='relative group cursor-pointer w-full max-w-md aspect-square mx-auto shadow rounded-lg overflow-hidden'
      onClick={!imageSrc ? handleIconClick : undefined}
    >
      {imageSrc ? (
        <img className='w-full h-full' style={{ objectFit }} src={imageSrc}/>
      ) : (
        <div className='w-full h-full bg-[#E0D0B9] flex items-center justify-center text-[#B56311] font-semibold'>
          No image
        </div>
      )}

      {/* Hover overlay for empty state — dark tint + Add button */}
      {!imageSrc && (
        <div className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center'>
          <button
            type='button'
            onClick={(e) => { e.stopPropagation(); handleIconClick() }}
            className='bg-[#B56311] text-[#E0D0B9] font-semibold px-4 py-2 rounded-lg hover:bg-[#9A520F] transition-colors'
          >
            + Add Image
          </button>
        </div>
      )}

      {/* Edit pencil — only when an image is already set */}
      {imageSrc && (
        <FiEdit
          className='text-[#B56311] absolute bottom-1 right-1 opacity-0 group-hover:opacity-100 transition cursor-pointer'
          onClick={handleIconClick}/>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />
    </div>
  )
}

