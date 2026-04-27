'use client';
import { useState, useEffect } from 'react'
import default_profile from "../public/profile_photo.jpg"
import NavbarLink from './NavbarLink'
import NavbarProfileLink from './NavbarProfileLink'
import { CiSquarePlus } from "react-icons/ci";
import { MdBrush } from "react-icons/md";
import { MdOutlineDoorSliding } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";
import { CiCircleInfo } from "react-icons/ci";
import { IoMdSettings } from "react-icons/io";
import { IoLogoAngular } from "react-icons/io";
import { RxHamburgerMenu } from 'react-icons/rx';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(true);
  const [profileImage, setProfileImage] = useState<any>(default_profile);
  const [username, setUsername] = useState("Username");

  useEffect(() => {
    const supabase = createClient();

    const loadUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setUsername("Username");
        setProfileImage(default_profile);
        return;
      }
      setUsername(user.user_metadata?.username ?? user.email ?? "Username");
      const profileImageName = user.user_metadata?.profile_image_name as string | undefined;
      if (profileImageName) {
        const { data } = supabase.storage.from('profile_images').getPublicUrl(profileImageName);
        setProfileImage(data.publicUrl);
      } else {
        setProfileImage(default_profile);
      }
    };

    loadUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'USER_UPDATED' || event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        loadUser();
      }
      if (event === 'SIGNED_OUT') {
        setUsername("Username");
        setProfileImage(default_profile);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <nav className={`${isOpen ? 'w-[15em]' : 'w-[4em]'} h-screen bg-[#B56311] p-4 flex flex-col justify-between transition-all duration-300`}>

        <div>

            <button onClick={() => setIsOpen(!isOpen)} className='mb-2'>
              <RxHamburgerMenu size={30} color='#FFBC37'/>
            </button>


            { isOpen && (
              <>
                <Link href = "/"><IoLogoAngular size = {50} color='#FFBC37' className='ml-1 mb-2'/></Link>
                <NavbarProfileLink profileImage={profileImage} username={username} link="/profile"></NavbarProfileLink>
                <NavbarLink icon={CiSquarePlus} link="/newitem" text = "New Item"/>
                <NavbarLink icon={MdBrush} link="/newoutfit" text = "New Outfit"/>
                <NavbarLink icon={MdOutlineDoorSliding} link="/viewcloset" text = "View Closet"/>
                <NavbarLink icon={FaRegCalendarAlt} link="/calendar" text = "Calendar"/>
                <NavbarLink icon={CiCircleInfo} link="/aboutus" text = "About Us"/>
              </>
            )}
        </div>
        <div>
            {isOpen && <NavbarLink icon={IoMdSettings} link="/"/>}
        </div>
    </nav>
  )
}
