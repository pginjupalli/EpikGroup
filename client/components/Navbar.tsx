'use client';
import React from 'react'
import profile_png from "../public/profile_photo.jpg"
import NavbarLink from './NavbarLink'
import NavbarProfileLink from './NavbarProfileLink'
import { CiSquarePlus } from "react-icons/ci";
import { MdBrush } from "react-icons/md";
import { MdOutlineDoorSliding } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";
import { CiCircleInfo } from "react-icons/ci";
import { IoMdSettings } from "react-icons/io";
import { IoLogoAngular } from "react-icons/io";
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className='w-[15em] h-screen bg-[#B56311] p-4 flex flex-col justify-between'>
        <div>
            <Link href = "/"><IoLogoAngular size = {50} color='#FFBC37' className='ml-1 mb-2'/></Link>
            <NavbarProfileLink profileImage={profile_png} username="Username" link="/profile"></NavbarProfileLink>
            <NavbarLink icon={CiSquarePlus} link="/newitem" text = "New Item"/>
            <NavbarLink icon={MdBrush} link="/newoutfit" text = "New Outfit"/>
            <NavbarLink icon={MdOutlineDoorSliding} link="/viewcloset" text = "View Closet"/>
            <NavbarLink icon={FaRegCalendarAlt} link="/calendar" text = "Calendar"/>
            <NavbarLink icon={CiCircleInfo} link="/aboutus" text = "About Us"/>
        </div>
        <div>
            <NavbarLink icon={IoMdSettings} link="/"/>
        </div>
    </nav>
  )
}
