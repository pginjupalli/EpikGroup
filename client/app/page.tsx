"use server";

export default async function Home() {
  const data = await fetch('http://localhost:8000/test').then(res => res.json());
  
  return <img src={data}/>;
}
