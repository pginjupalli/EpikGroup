'use client';
import React, { useState, useRef, useEffect } from 'react';
import { FaRegTrashAlt, FaSearch } from "react-icons/fa";

interface Tag {
    phrase: string;
    deleteTag: (tagToDelete: string) => void;
}

export default function Tag({ phrase, deleteTag }: Tag) {
    const [isHovering, setIsHovering] = useState(false);
    const measureRef = useRef<HTMLSpanElement>(null);
    const [width, setWidth] = useState<number | null>(null);

    useEffect(() => {
        if (measureRef.current) {
            const w = measureRef.current.offsetWidth;
            setWidth(w);
        }
    }, []);

    return (
        <>
            {/* Hidden measurement element */}
            <span 
                ref={measureRef} 
                className="absolute opacity-0 pointer-events-none whitespace-nowrap font-bold text-base px-2.5 mx-0.5"
            >
                {phrase}
            </span>

            {/* Visible tag */}
            <p
                className="bg-[#B56311] text-[#E0D0B9] text-sm font-bold rounded-2xl px-2.5 mx-0.5 text-center align-middle inline whitespace-nowrap transition-all min-w-15"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                style={{ width: width ? `${width}px` : "auto" }}
            >
                {isHovering ? (
                    <span className="flex justify-center items-center gap-2 py-[2px]">
                        <FaRegTrashAlt 
                            size={17}
                            onClick={() => deleteTag(phrase)}
                        />
                        <FaSearch size={17}/>
                    </span>
                ) : (
                    phrase
                )}
            </p>
        </>
    );
}
