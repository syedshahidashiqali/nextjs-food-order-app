module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com'],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://nextjs-food-order-app-1jo18d5ha-syedshahidashiqali.vercel.app/:path*',
      },
    ]
  },
}
