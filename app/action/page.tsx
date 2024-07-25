"use client";
import { GridBackground } from "@/components/ui/grid-background";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";

export default function ActionPage() {
  const placeholders = [
    "Enter an Action URL to unfurl it into a Blink",
    "Provide an Action URL to expand it into a Blink",
  ];
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };
  return (
    <>
      <GridBackground>
        <div className="w-full h-full  hidden md:block">
          <div className="flex justify-center w-full h-full items-center">
            <div className="w-[55%] h-[9%]">
              <PlaceholdersAndVanishInput
                placeholders={placeholders}
                onChange={handleChange}
                onSubmit={onSubmit}
              />
            </div>
          </div>
        </div>
        <div className="md:hidden text-center">
          <p className="font-medium text-[#B4E380] inline-block bg-black px-[0.375rem] rounded-full ">
            Soon
          </p>
          <p className="font-semibold">Mobile currently unavailable</p>
          <p className="text-gray-700">Please open this page on desktop</p>
        </div>
      </GridBackground>
    </>
  );
}
