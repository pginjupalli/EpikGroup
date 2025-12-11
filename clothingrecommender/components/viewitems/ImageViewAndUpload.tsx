'use client';
import React from 'react'
import { FiEdit } from "react-icons/fi";
import { useState, useRef } from 'react';

interface ImageViewAndUpload {
    imageLink: string;
}

export default function ImageViewAndUpload({imageLink}: ImageViewAndUpload) {
  const [imageSrc, setImageSrc] = useState(imageLink);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleIconClick = () => {
    fileInputRef.current?.click(); // open file picker
  };

  function handleImageChange(e: any) {
    const file = e.target.files?.[0];
    if (!file) return;

    const newUrl = URL.createObjectURL(file); // Create a temporary local URL
    setImageSrc(newUrl);
  }
  
  return (
    <div className='m-w-md h-[90%] border-2 border-[#B56311] relative group'>
      <img className=' w-full h-full object-cover' src={imageSrc}/>
      <FiEdit
        className='text-[#B56311] absolute bottom-0 right-0 opacity-0 group-hover:opacity-100 transition cursor-pointer'
        onClick={handleIconClick}/>
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

