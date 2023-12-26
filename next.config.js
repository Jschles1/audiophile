/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // remotePatterns: ["imagedelivery.net"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "imagedelivery.net",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
