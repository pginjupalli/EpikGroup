'use client';
import React from 'react'
import ItemName from '@/components/viewitems/ItemName'
import ImageViewAndUpload from '@/components/viewitems/ImageViewAndUpload';
import TagList from '@/components/viewitems/TagList';
import { useState } from 'react';

export default function ViewItemPage() {
    // Test data which would have to be queried from the DB
    const [itemName, setItemName] = useState("Leopard Print Sweater")
    const [imageURL, setImageURL] = useState("/profile_photo.jpg");
    const [tagList, setTagList] = useState(["Casual", "Winter", "Cozy", "Animal Print"]);

    return (
        <div className='flex items-center justify-center p-7 h-screen'>
            <div className='bg-[#EFEAE4] border-2 border-[#B56311] h-full w-full flex items-center flex-col p-5'>
                <ItemName itemName={itemName} onItemNameChange={setItemName}/>
                <div className='w-full h-[50%] p-3 flex flex-wrap gap-8 items-center justify-center'>
                    <ImageViewAndUpload imageLink={imageURL}/>
                    <div className='min-w-0'>
                        <TagList tags={tagList}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
