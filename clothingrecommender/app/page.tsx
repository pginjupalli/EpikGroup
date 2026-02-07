import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1>
        Welcome to the Clothing Recommender App!
      </h1>
      <a href="/profile" className="border-8 border-green-900 border-dashed fill-cyan-500 drop-shadow-lg drop-shadow-indigo-500"> 
        Profile Page
      </a>
    </div>
  );
}
