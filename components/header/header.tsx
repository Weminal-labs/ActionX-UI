"use client";
import { useState } from "react";
import LogoActionx from "@/public/image/logo-actionx";
import RightArrow from "@/public/image/rightArrow";
import Link from "next/link";
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";
import { WalletSelector } from "@/components/ui/WalletSelector";
import { ModeToggle } from "@/components/ui/toggle-theme";
export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="flex items-center justify-between w-full fixed top-0 z-10 px-4 lg:px-16 py-4 bg-transparent">
      <Link href={"/"}>
        <span className="flex items-center relative">
          <p className="text-2xl lg:text-3xl font-bold bg-logoGradientDark bg-clip-text text-transparent">
            Action
          </p>
          <span className="absolute ml-[90%] mt-[25%]">
            <LogoActionx height={100} width={100} />
          </span>
        </span>
      </Link>

      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-2xl focus:outline-none"
        >
          <i className={`fas ${isOpen ? "fa-times" : "fa-bars"}`}></i>
        </button>
      </div>

      <nav
        className={`flex-col items-center gap-4 lg:gap-8 md:flex md:flex-row ${
          isOpen ? "flex" : "hidden"
        } absolute top-full left-0 right-0 bg-transparent md:static`}
      >
        <div className="flex items-center gap-2 px-4 py-2 md:p-0">
          <Link
            href={"/docs"}
            className="flex items-center gap-2 font-semibold"
          >
            <RightArrow />
            Docs X
          </Link>
        </div>
        <WalletSelector />
        <ModeToggle />
      </nav>
    </header>
  );
}
