import nextMDX from '@next/mdx';
import rehypeSlug from 'rehype-slug';
import rehypePrettyCode from 'rehype-pretty-code';

/** @type {NextConfigPlugins} */
const plugins = [];

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
  pageExtensions: ['md', 'mdx', 'tsx', 'ts', 'jsx', 'js'],
}

/** @type {import('rehype-pretty-code').Options} */
const options = {
  keepBackground: false,
  theme: 'min-dark',
};

plugins.push(
  nextMDX({
    extension: /\.(md|mdx)$/,
    options: {
      remarkPlugins: [],
      rehypePlugins: [[rehypePrettyCode, options], rehypeSlug],
    },
  }),
);

export default () => plugins.reduce((_, plugin) => plugin(_), nextConfig);
