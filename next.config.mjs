/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "yalu-dev-s3.s3.ap-southeast-1.amazonaws.com",
      },
    ],
    domains: ['imo-api.yaludev.com']
  },
};

export default nextConfig;
