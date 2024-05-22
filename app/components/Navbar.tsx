import Link from "next/link";

function Navbar() {
  return (
    <div className="p-2 flex items-center justify-end bg-blue-200 border border-blue-200 rounded-lg shadow-lg">
      <Link href="/">
        <button className="p-2 border rounded-full bg-blue-700">
          Get Started
        </button>
      </Link>
    </div>
  );
}

export default Navbar;
