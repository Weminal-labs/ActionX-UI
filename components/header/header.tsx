import { ModeToggle } from "@/components/toggle-theme";
import { Button } from "@/components/ui/button";
import LogoActionx from "@/public/image/logo-actionx";
import RightArrow from "@/public/image/rightArrow";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between w-full fixed top-0 z-10 px-10 py-4">
      <Link href={"/"}>
        <div className="flex items-center relative">
          <p className="text-3xl font-bold bg-logoGradientDark bg-clip-text text-transparent">
            Action
          </p>
          <div className="absolute ml-[90%] mt-[25%]">
            <LogoActionx height={100} width={100} />
          </div>
        </div>
      </Link>

      <nav className="flex items-center gap-4">
        <Link href={"/docs"}>
          <div className="flex items-center gap-2">
            <RightArrow />
            <p className="font-semibold">Docs X</p>
          </div>
        </Link>
        <Button>
          <i className="fas fa-wallet mr-2"></i>
          <span>Connect wallet</span>
        </Button>
        <ModeToggle />
      </nav>
    </header>
  );
}
