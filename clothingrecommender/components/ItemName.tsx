'use client';
import React from 'react'
import { FiEdit } from "react-icons/fi";
import { useState } from 'react';

interface ItemName {
    itemName: string;
    onItemNameChange: (itemName: string) => void;
}

export default function ItemName({itemName, onItemNameChange}: ItemName) {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(itemName);

    function saveTitle() {
        setIsEditing(false);
        onItemNameChange(title);
    }

    return (
        <>
        {isEditing ? 
        <div className='flex items-center justify-center m-2 gap-2.5'>
            <input
                className='text-[#B56311] font-bold text-xl outline-0'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && saveTitle()}
                onBlur={() => saveTitle()}
                autoFocus
            />
        </div>
        : 
        <div className='flex items-center justify-center w-fit m-2 gap-2.5 group'>
            <h1 className='text-[#B56311] font-bold text-xl'>{title}</h1>
            <FiEdit 
                className='text-[#B56311] opacity-0 group-hover:opacity-100 transition cursor-pointer'
                onClick={() => setIsEditing(true)}/>
        </div>}
        </>
        
    )
}
