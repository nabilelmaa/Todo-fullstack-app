import Image from "next/image";
export default function Home() {
  return (
    <main className="flex min-h-screen">
      <h1 className="text-3xl font-bold">Welcome to the Todo App</h1>
      <Image 
        src="/hey.png"
        alt="panda"
        width={350}
        height={300}
        className="mt-24 h-1/4"
      />
    </main>
  );
}
