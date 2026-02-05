"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ImageCard from "./ImageNameOnHover";

type Props = {
  images: { src: string; name: string; url?: string }[];
};

export default function EmblaCarousel({ images }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    skipSnaps: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  return (
    <div className="w-full flex flex-col items-center">
      {/* Carousel */}
      <div className="flex items-center gap-4">
        {/* Left arrow */}
        <button
          onClick={() => emblaApi?.scrollPrev()}
          className="text-4xl text-[#B56311] cursor-pointer"
        >
          <IoIosArrowBack />
        </button>

        {/* Viewport */}
        <div className="overflow-hidden w-[720px]" ref={emblaRef}>
          <div className="flex">
            {images.map((image, i) => (
              <div
                key={i}
                className="flex-[0_0_33.333%] px-2"
              >
                
                <ImageCard src={image.src} name={image.name} url={image.url || "#"}/>
              </div>
            ))}
          </div>
        </div>

        {/* Right arrow */}
        <button
          onClick={() => emblaApi?.scrollNext()}
          className="text-4xl text-[#B56311] cursor-pointer"
        >
          <IoIosArrowForward />
        </button>
      </div>

      {/* Dots */}
      <div className="flex gap-2 mt-4">
        {scrollSnaps.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            className={`h-2 w-2 rounded-full ${
              i === selectedIndex ? "bg-[#B56311]" : "bg-[#E0D0B9]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}