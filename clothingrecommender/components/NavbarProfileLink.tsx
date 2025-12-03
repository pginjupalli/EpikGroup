import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Nunito } from "next/font/google";

const nunito = Nunito({
  subsets: ["latin"],
});

interface NavbarProfileLink {
    profileImage: any;
    link: string;
    username: string;
}

export default function NavbarProfileLink({profileImage, link, username}: NavbarProfileLink) {
  return (
    <Link href={link} className='flex items-center gap-5 rounded-2xl p-2 hover:bg-amber-950 transition duration-100'>
        <Image src={profileImage} alt='Test' width={40} height={40} className='rounded-full border-2 border-[#FFBC37]'></Image>
        <p className={`text-[#FFBC37] font-serif text-[1.25em] ` + nunito.className}>{username}</p>
    </Link>
  )
}
