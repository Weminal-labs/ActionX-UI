"use client";

import NextTopLoader from "nextjs-toploader";

export default function TopLoader() {
  return (
    <NextTopLoader
      color={"#f00"}
      initialPosition={0.08}
      crawlSpeed={1000}
      height={3}
      crawl={true}
      showSpinner={false}
      shadow="0 0 10px #f00,0 0 5px #f00"
      easing="ease"
      speed={500}
    />
  );
}
