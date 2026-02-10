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
    <div className='relative group'>
      <img className='max-w-md max-h-72 shadow rounded-lg w-full h-full object-cover' src={imageSrc}/>
      <FiEdit
        className='text-[#B56311] absolute bottom-1 right-1 opacity-0 group-hover:opacity-100 transition cursor-pointer'
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

