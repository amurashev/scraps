/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'media.licdn.com',
      'covers.openlibrary.org',
      'm.media-amazon.com',
      'cdn.sanity.io',
    ],
  },
  reactStrictMode: false,
}

export default nextConfig
