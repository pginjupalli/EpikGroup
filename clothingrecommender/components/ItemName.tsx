'use client';
import React from 'react'
import { FiEdit } from "react-icons/fi";
import { useState } from 'react';

interface ItemName {
    itemName: string;
}

export default function ItemName({itemName}: ItemName) {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(itemName);

    return (
        <div className='flex items-center justify-center m-2 gap-2.5 group'>
            <h1 className='text-[#B56311] font-bold text-xl'>{title}</h1>
            <FiEdit 
                className='text-[#B56311] opacity-0 group-hover:opacity-100 transition cursor-pointer'
                onClick={() => console.log("hi")}/>
        </div>
    )
}
