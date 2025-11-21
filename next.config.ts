// next.config.ts
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/dez-site',
  assetPrefix: '/dez-site',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
