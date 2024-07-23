import LogoTwitter from "@/public/image/logo-twitter";
import Link from "next/link";

export default function Action() {
  return (
    <div className="flex items-center justify-around w-full text-[2.5rem] judson-regular-italic">
      <Link href={"/"}>
        <div className="inline-block border-[3px] text-gray-950  border-gray-950 bg-white px-4 rounded-full">
          Hello Builders
        </div>
      </Link>
      <Link href={"/"}>
        <p className="">Action</p>
      </Link>
      <Link href={"/"}>
        <div className="inline-block border-[3px] border-gray-950 bg-white px-4 rounded-[1.875rem]">
          <i className="fa-brands fa-x-twitter text-gray-950 "></i>
        </div>
      </Link>
      <Link href={"/"}>
        <i className="fas fa-arrow-right"></i>
      </Link>
    </div>
  );
}
