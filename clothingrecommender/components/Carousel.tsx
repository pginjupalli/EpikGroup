'use client';
import React from 'react'

interface CarouselProps {
    images: {url: string, altText: string}[];
}

export default function Carousel({images}: CarouselProps) {
    return (
        <div>Carousel</div>
    )
}
