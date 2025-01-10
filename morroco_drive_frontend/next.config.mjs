/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "s3-ap-southeast-1.amazonaws.com" },
      { hostname: "olawebcdn.com" },
      { hostname: "cdn.pixabay.com" },
      { hostname: 'cdn2.hubspot.net' },
      { hostname: 'www.liderempresarial.com' },
      { hostname: 'png.pngtree.com' },
      { hostname: 'www.annonces-automobile.com' },
      { hostname: 'www.exaland.app' },
      { hostname: 'www.uber-assets.com' },
      {hostname: "devtechnosys.com"}
    ],
  },
  // proxy for api requests
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:8080/api/:path*",
        //destination:"https://ride-fast-app-backend-latest.onrender.com/api/:path*",
      }
    ];
  },
};

export default nextConfig;
