"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBottom() {
  const pathname = usePathname();

  return (
    <div className="flex fixed bottom-6 items-center px-20 justify-around w-full text-gray-950 text-[2.5rem]  judson-regular-italic">
      <Link href="/">
        <div
          className={`inline-block  rounded-full ${
            pathname === "/"
              ? "border-[3px] border-gray-950 bg-white px-4 text-gray-950 rounded-full"
              : " dark:text-white"
          }`}
        >
          Hello Builders
        </div>
      </Link>
      <Link href="/action">
        <p
          className={
            pathname === "/action"
              ? "border-[3px] border-gray-950 bg-white px-4 text-gray-950 rounded-full"
              : "dark:text-white"
          }
        >
          Action
        </p>
      </Link>
      <Link href="https://x.com/home" target="_blank">
        <div className="inline-block border-[3px] border-gray-950 bg-white px-4 rounded-[1.875rem]">
          <i className="fa-brands fa-x-twitter text-gray-950 "></i>
        </div>
      </Link>
      <Link href="#">
        <i className="fas fa-arrow-right border-gray-950 dark:text-white"></i>
      </Link>
    </div>
  );
}
