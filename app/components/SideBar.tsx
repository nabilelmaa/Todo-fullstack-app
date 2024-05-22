import Link from "next/link";
import { IoCreateOutline } from "react-icons/io5";
import { CiViewList } from "react-icons/ci";
import { HiEyeDropper } from "react-icons/hi2";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-blue-300 text-white p-4 rounded-lg">
      <ul className="font-semibold">
        <li className="mb-4 flex items-center">
          <CiViewList className="mr-2 text-xl" />
          <Link href="/dashboard/my-todos">
            <button>My todos</button>
          </Link>
        </li>
        <li className="mb-4 flex items-center">
          <IoCreateOutline className="mr-2 text-xl" />
          <Link href="/dashboard/create-todo">
            <button>Create todo</button>
          </Link>
        </li>
        <li className="mb-4 flex items-center">
          <HiEyeDropper className="mr-2 text-xl" />
          <Link href="/dashboard/appearance">
            <button>Appearance</button>
          </Link>
        </li>
      </ul>
    </aside>
  );
}
