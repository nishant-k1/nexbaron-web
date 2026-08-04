/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  swcMinify: true,
  async redirects() {
    return [
      {
        source: "/digital/services",
        destination: "/digital/pricing",
        permanent: true,
      },
      {
        source: "/digital/plans",
        destination: "/digital/pricing",
        permanent: true,
      },
      {
        source: "/digital/industries",
        destination: "/digital/who-we-help",
        permanent: true,
      },
    ];
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

module.exports = nextConfig;
