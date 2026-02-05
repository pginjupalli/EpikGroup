import React from 'react'
import EmblaCarousel from './Carousel'

type Props = {
    groupName: string;
    images: { src: string; name: string; url?: string }[];
};

export default function CarouselGroup({groupName, images}: Props) {
  return (
    <div className='flex flex-col items-center justify-center gap-y-5'>
        <h1 className='text-[#B56311] font-bold text-xl'>{groupName}</h1>
        <EmblaCarousel images={images}/>
    </div>
  )
}
