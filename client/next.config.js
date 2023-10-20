/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      // Rewrites all API request to the express server
      {
        source: "/api/:path*",
        destination: "http://localhost:5000/api/:path*",
      },
    ]
  },
}

module.exports = nextConfig
