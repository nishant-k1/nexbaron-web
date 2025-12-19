/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
      },
    ],
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
};

module.exports = nextConfig;
