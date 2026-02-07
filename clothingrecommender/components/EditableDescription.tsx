'use client';
import React from 'react'
import { useState } from 'react';
import { FiEdit } from "react-icons/fi";

interface Description {
    description: string;
    descriptionName: string;
}

export default function Description({description, descriptionName}: Description) {
  const [isEditing, setIsEditing] = useState(false);
  const [desc, setDesc] = useState(description);

  return (
    <div className='text-[#B56311]'>
      <p className='font-bold inline'>{descriptionName}: </p>
      {isEditing ?
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && setIsEditing(false)}
          onBlur={() => setIsEditing(false)}
          autoFocus
          className='bg-[#EFEAE4] text-[#B56311] font-normal outline-0 border-b-2 border-[#B56311] field-sizing-content overflow-wrap'
          rows={10}
          cols={50}
        />
        :
        <p className='inline-flex items-center gap-1 group'>
          {desc}
          <FiEdit 
            className='text-[#B56311] inline opacity-0 group-hover:opacity-100 transition cursor-pointer w-20'
            onClick={() => setIsEditing(true)}
            size={17}
          />
        </p>

      }
    </div>
  )
}
