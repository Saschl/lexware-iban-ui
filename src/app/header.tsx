"use-client";

import { BuildingLibraryIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-start gap-4 p-4 bg-gray-800 text-white">
      <Link href="/">
        <BuildingLibraryIcon className="size-6" />
      </Link>
      <nav>
        <ul className="flex gap-4">
          <li>
            <Link href="/about" className="hover:underline">
              About
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
