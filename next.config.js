/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        hostname: "smashmate.net",
      },
    ],
  },
};

module.exports = nextConfig;
