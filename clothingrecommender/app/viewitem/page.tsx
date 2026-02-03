'use client';
import React from 'react'
import ItemName from '@/components/viewitems/ItemName'
import ImageViewAndUpload from '@/components/viewitems/ImageViewAndUpload';
import TagList from '@/components/viewitems/TagList';
import Description from '@/components/viewitems/Description';
import Toggle from '@/components/Toggle';
import { useState } from 'react';
import HeartButton from '@/components/HeartButton';

export default function ViewItemPage() {
    // Test data which would have to be queried from the DB
    const [itemName, setItemName] = useState("Leopard Print Sweater")
    const [imageURL, setImageURL] = useState("/profile_photo.jpg");
    const [tagList, setTagList] = useState(["Casual", "Winter", "Cozy", "Animal Print"]);
    const [description, setDescription] = useState("A warm and cozy leopard print sweater perfect for casual winter outings.");
    
    const [isAvailable, setIsAvailable] = useState(true);
    const onIsAvailableChange = () => {
        setIsAvailable(!isAvailable);
        if (!isAvailable) {
            console.log("Item is now available");
        } else {
            console.log("Item is no longer available");
        }
    }

    const [isLiked, setIsLiked] = useState(false);
    const onLikeToggle = () => {
        setIsLiked(!isLiked);
        if (isLiked) {
            console.log("Item unliked");
        } else {
            console.log("Item liked");
        }
    }


    return (
        <div className='flex items-center justify-center p-7 h-screen'>
            <div className='bg-[#EFEAE4] border-2 border-[#B56311] h-full w-full flex items-center flex-col p-5'>
                <ItemName itemName={itemName} onItemNameChange={setItemName}/>
                <div className='w-full p-3 flex flex-wrap gap-8 items-center justify-center'>
                    <ImageViewAndUpload imageLink={imageURL}/>
                    <div className='w-3xl'>
                        <TagList tags={tagList}/>
                        <Description description={description}/>
                        <div className='flex items-center gap-2'>
                            <p className='font-bold inline text-[#B56311]'>Is Available: </p>
                            <Toggle checked={isAvailable} onCheckedChange={onIsAvailableChange}/>
                        </div>
                        <div className='flex items-center gap-2 flex-row flex-wrap mt-4'>
                            <button className='bg-[#B56311] text-[#E0D0B9] px-3 py-1 hover:bg-[#9A520F] transition-colors duration-200'>Create Outfit</button>
                            <button className='bg-[#B56311] text-[#E0D0B9] px-3 py-1 hover:bg-[#9A520F] transition-colors duration-200'>Delete Item</button>
                            <HeartButton liked={isLiked} onClick={onLikeToggle}/>
                        </div>
                    </div>
                </div>
                <h1 className='text-[#B56311] font-bold text-xl'>Existing Outfits</h1>
            </div>
        </div>
    )
}
