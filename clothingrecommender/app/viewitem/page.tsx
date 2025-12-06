import React from 'react'
import ItemName from '@/components/ItemName'

export default function ViewItemPage() {
    // Test data which would have to be queried from the DB
    const itemData = {
        itemName: "Leopard Print Sweater",
    }
  
  
    return (
        <div className='flex items-center justify-center p-7 h-screen'>
            <div className='bg-[#EFEAE4] border-2 border-[#B56311] h-full w-full'>
                <ItemName itemName={itemData.itemName}/>
            </div>
        </div>
    )
}
