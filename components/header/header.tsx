"use client";
import { useState } from "react";
import { ModeToggle } from "@/components/toggle-theme";
import { Button } from "@/components/ui/button";
import LogoActionx from "@/public/image/logo-actionx";
import RightArrow from "@/public/image/rightArrow";
import Link from "next/link";
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";
import { WalletSelector } from "@/components/ui/WalletSelector";
export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="flex items-center justify-between w-full fixed top-0 z-10 px-4 lg:px-16 py-4 bg-white lg:bg-transparent">
      <Link href={"/"}>
        <div className="flex items-center relative">
          <p className="text-2xl lg:text-3xl font-bold bg-logoGradientDark bg-clip-text text-transparent">
            Action
          </p>
          <div className="absolute ml-[90%] mt-[25%]">
            <LogoActionx height={100} width={100} />
          </div>
        </div>
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
        } absolute top-full left-0 right-0 bg-white md:bg-transparent md:static`}
      >
        <Link href={"/docs"}>
          <div className="flex items-center gap-2 px-4 py-2 md:p-0">
            <RightArrow />
            <p className="font-semibold">Docs X</p>
          </div>
        </Link>
        <WalletSelector />
        <ModeToggle />
      </nav>
    </header>
  );
}
