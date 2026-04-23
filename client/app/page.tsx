"use server";

export default async function Home() {
  const data = await fetch('http://localhost:8000/closet').then(res => res.json());
  
  return <h1>Hi</h1>
}
