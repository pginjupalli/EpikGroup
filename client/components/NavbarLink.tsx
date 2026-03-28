'use client';
import React from 'react'
import Link from 'next/link'
import { IconType } from 'react-icons';
import { Nunito } from "next/font/google";

const nunito = Nunito({
  subsets: ["latin"],
});

interface NavbarLink {
    icon: IconType;
    text?: string;
    link: string;
}

export default function NavbarLink({icon: Icon, text, link}: NavbarLink) {
  return (
    <Link href={link} className='flex items-center gap-5 rounded-2xl p-2 hover:bg-amber-950 transition duration-100'>
        <Icon size={30} className='text-[#FFBC37]'/>
        <p className={`text-[#FFBC37] font-serif text-[1.25em] ` + nunito.className}>{text}</p>
    </Link>
  )
}
