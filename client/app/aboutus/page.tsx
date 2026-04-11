import Link from 'next/link';

const team = [
 { name: "Pooja", role: "Mentor", linkedin: "https://www.linkedin.com/in/pginjupalli/", img: "/pooja.jpeg" },
 { name: "Christy", role: "Mentee", linkedin: "https://www.linkedin.com/in/christy-x-6a638b32a/", img: "/christy.png" },
 { name: "Simra", role: "Mentee", linkedin: "https://www.linkedin.com/in/simra-j-7bbaab2a9/", img: "/simra.jpg" },
 { name: "Alvin", role: "Mentee", linkedin: "https://www.linkedin.com/in/alvin-shao/", img: "/alvin.jpeg" },
 { name: "Anya", role: "Mentee", linkedin: "https://www.linkedin.com/in/anya-vasetskaya/", img: "/anya.jpeg" },
 { name: "Coco", role: "Mentee", linkedin: "https://www.linkedin.com/in/coco-gao-18b74a343/", img: "/Coco_Gao.jpeg" },
];

export default function AboutUs() {
  return (
    // Added pb-32 (padding-bottom) to give extra breathing room at the bottom of the page
    <div className="min-h-screen w-full bg-[#FFFBEB] pt-10 pb-32 px-10 flex flex-col items-center">
      
      <h1 className="text-5xl text-[#92400E] font-serif mb-16 mt-10">Meet the Quacks</h1>
      
      {/* The Closet Rod (z-10 keeps it in front) */}
      <div className="w-full max-w-5xl h-3 bg-[#5D2E0A] rounded-full relative shadow-md z-10"></div>
      
      {/* The Grid (Removed 'absolute', added '-mt-3' so it slides up perfectly onto the rod) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-24 w-full max-w-5xl px-8 -mt-3 relative z-0">
        
        {team.map((person) => (
          <div key={person.name} className="flex flex-col items-center mt-4">
            
            {/* The Hanger Hook */}
            <div className="w-8 h-10 border-4 border-[#D97706] border-b-0 rounded-t-full -mb-1 relative z-0"></div>
            
            {/* The Clickable Card */}
            <Link 
              href={person.linkedin} 
              target="_blank" 
              className="bg-white border-2 border-[#D97706] rounded-2xl p-4 w-64 shadow-xl hover:-rotate-3 hover:scale-105 transition-all duration-300 flex flex-col items-center relative z-10"
            >
              <div className="w-full aspect-square rounded-xl overflow-hidden bg-orange-50 mb-4 border border-orange-100">
                <img 
                  src={person.img} 
                  alt={person.name} 
                  className="w-full h-full object-cover" 
                />
              </div>
              
              <h3 className="text-[#92400E] font-bold text-xl">🎀 {person.name}</h3>
              <p className="text-[#D97706] font-medium">{person.role}</p>
              <span className="text-[10px] text-orange-300 mt-1 opacity-0 hover:opacity-100 transition-opacity">Click for LinkedIn</span>
            </Link>

          </div>
        ))}

      </div>
    </div>
  );
}