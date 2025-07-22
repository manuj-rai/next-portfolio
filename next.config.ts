// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'yourdomain.com', // 🔁 Replace with actual hostname like 'res.cloudinary.com' or 'images.unsplash.com'
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;