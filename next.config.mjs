/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.wikia.nocookie.net",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/database/:category(crops|animals|buildings|products)",
        destination: "/database/main/:category",
        permanent: false,
      },
      {
        source: "/database/:category(crops|animals|buildings|products)/:item",
        destination: "/database/main/:category/:item",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
