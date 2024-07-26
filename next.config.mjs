/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.viblo.asia",
        port: "",
        pathname: "/**",
      },
    ],
  },
};
export default nextConfig;
