/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    //go to https://generate-secret.now.sh/32
    JWT_SECRET: "c1563883a2dd7172282488e1bf66a3d5",
    NEXTAUTH_SECRET: "5fd52e2ed57fbca7c7b3b954a33fe410",
    NEXTAUTH_URL: "https://next-next-auth.vercel.app",
  },
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com"],
  },
}

module.exports = nextConfig

