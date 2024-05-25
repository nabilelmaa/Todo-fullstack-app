import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen">
      <div className="flex flex-col max-w-full">
        <h1 className="mt-6 text-xl font-bold text-center">
          Welcome to the Todo App
        </h1>
        <Image
          src="/home.png"
          alt="panda"
          width={200}
          height={250}
          className="mt-24 h-1/4"
        />
        <Link href="/sign-in">
          <button className="border w-full bg-blue-300 rounded-full p-2 mt-4 flex items-center justify-center">
            <p className="mr-2">Get Started</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="20"
              height="20"
              color="#000000"
              fill="none"
            >
              <path
                d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z"
                stroke="currentColor"
                stroke-width="1.5"
              />
              <path
                d="M10 7C10 7 14 10.6824 14 12C14 13.3176 10 17 10 17"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </Link>
      </div>
    </main>
  );
}
