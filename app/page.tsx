import { Button } from "@/components/ui/button";
import { HeroHighlight } from "@/components/ui/hero-highlight";
import Action from "@/containers/home-page/action/action";
import HeroText from "@/containers/home-page/hero/hero";

export default function Home() {
  return (
    <main className="min-h-screen flex justify-center w-full">
      <HeroHighlight>
        <div className="hidden md:block">
          <HeroText />
          <div className="flex justify-center w-full mb-20">
            <Button className="text-2xl w-72 bg-[#F9F9F9] drop-shadow-md rounded-xl judson-regular-italic text-black hover:bg-[#e9e9e9] ">
              Explorer
            </Button>
          </div>
          <Action />
        </div>
        <div className="md:hidden text-center">
          <p className="font-medium text-[#B4E380] inline-block bg-black px-[0.375rem] rounded-full ">
            Soon
          </p>
          <p className="font-semibold">Mobile currently unavailable</p>
          <p className="text-gray-700">Please open this page on desktop</p>
        </div>
      </HeroHighlight>
    </main>
  );
}
