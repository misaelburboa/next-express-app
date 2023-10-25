/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      // Rewrites all API request to the express server
      {
        source: "/api/users/:path*",
        destination: "http://localhost:5000/api/users/:path*",
      },
      {
        source: "/api/authentication/:path*",
        destination: "http://localhost:5000/api/auth/:path*",
      },
    ]
  },
}

module.exports = nextConfig
