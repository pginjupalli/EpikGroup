import React from 'react'

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-[#D4C4B0] p-8">
      {/*Profile Page */}

      {/* Profile Card */}
      <div className="relative w-full">

      {/* Dark Blue Top Half - Background Image Area */}
      <div className="w-full h-48 bg-[#36475B] rounded-t-2xl"> 
        {/*custom user bg image*/}
      </div>

      {/* Light Bottom Half - User Stats Area */}
      <div className="w-full h-54 bg-[#EFEAE3] rounded-b-2xl pt-4">
        {/* User stats go here */}
        <div className="ml-52 px-8">
          <h2 className="text-3xl font-bold">Username</h2>
          <p className="text-gray-600">@username</p>

          {/* Following and Followers */}
          <div className="flex gap-6 text-gray-600"> <div>
              <span className="font-semibold">123</span> Following
        </div>
      <div>
              <span className="ml-4 font-semibold">456</span> Followers
      </div>
      </div>
          
          {/* Bio */}
          <p className="text-gray-600">Bio goes here</p>
        </div>
      </div>

      {/* Profile Picture */}
      <div className="absolute top-32 left-10 w-40 h-40 bg-black rounded-full border-4 border-white">
        
        </div>

        {/* Profile Background */}

      </div>

      
      {/* Outfit Gallery WIP */}
      <div className="w-full h-54 bg-[#EFEAE3] rounded-b-2xl pt-4"></div>

      {/* Inspect element and section it off into boxes */}
      
    </div>    
  )
}

