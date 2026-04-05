import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1>banana</h1>
      <a href="/profile" className="border-5 border-dashed border-yellow-700 drop-shadow-xl drop-shadow-cyan-500/70 text-[#e0d7ae]">
        everything has an end, except bananas, which have two
      </a>
    </div>
  );
}