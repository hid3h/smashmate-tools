/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "smashmate.net",
      },
    ],
  },
};

module.exports = nextConfig;
