import { ModeToggle } from "@/components/toggle-theme";
import LogoActionx from "@/public/image/logo-actionx";
import RightArrow from "@/public/image/rightArrow";

export default function Header() {
  return (
    <header className="flex items-center justify-between w-full fixed z-10 px-10 py-4">
      <div className="flex items-center relative">
        <p className="text-3xl font-bold bg-logoGradientDark bg-clip-text text-transparent">
          Action
        </p>
        <div className="absolute ml-[90%] mt-[25%]">
          <LogoActionx height={100} width={100} />
        </div>
      </div>

      <nav className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <RightArrow />
          <p className="font-semibold">Docs X</p>
        </div>

        <ModeToggle />
      </nav>
    </header>
  );
}
