import React from 'react'

export default function addclothing() {
  return (
    <div className="flex flex-col justify-start min-h-screen bg-[#F7D7BC]">
      <div 
        className="rounded-3xl overflow-hidden" 
        style={{
          backgroundImage: 'url(/Rectangle3.svg)',
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
          width: 'calc(100vw - 4.5in)',
          height: 'calc(100vh - 1in)',
          marginLeft: '4in',
          marginRight: '0.5in',
          marginTop: '0.5in',
          marginBottom: '0.5in',
          overflow: 'hidden'
        }}
      >
        <div className="h-full overflow-y-auto overflow-x-hidden p-8">
          {/* Grid of boxes - 5 across */}
          <div className="grid grid-cols-5 gap-4">
            <img src="/Union.svg" alt="Box 1" className="w-full rounded-lg" />
            <img src="/Union.svg" alt="Box 2" className="w-full rounded-lg" />
            <img src="/Union.svg" alt="Box 3" className="w-full rounded-lg" />
            <img src="/Union.svg" alt="Box 4" className="w-full rounded-lg" />
            <img src="/Union.svg" alt="Box 5" className="w-full rounded-lg" />
            <img src="/Union.svg" alt="Box 6" className="w-full rounded-lg" />
            <img src="/Union.svg" alt="Box 7" className="w-full rounded-lg" />
            <img src="/Union.svg" alt="Box 8" className="w-full rounded-lg" />
            <img src="/Union.svg" alt="Box 9" className="w-full rounded-lg" />
            <img src="/Union.svg" alt="Box 10" className="w-full rounded-lg" />
          </div>
          
          {/* Add button at the bottom */}
          <div className="flex justify-center mt-8 pb-4">
            <img 
              src="/AddButton.svg" 
              alt="Add clothing button" 
              className="w-40 h-40"
            />
          </div>
        </div>
      </div>
    </div>
  );
}