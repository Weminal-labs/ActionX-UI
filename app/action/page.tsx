"use client";
import { GridBackground } from "@/components/ui/grid-background";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";

export default function Action() {
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
        <div className="w-[55%] h-[9%]">
          <PlaceholdersAndVanishInput
            placeholders={placeholders}
            onChange={handleChange}
            onSubmit={onSubmit}
          />
        </div>
      </GridBackground>
    </>
  );
}
