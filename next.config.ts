// next.config.ts
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export', basePath: isProd ? '/dez-site' : '', assetPrefix: isProd ? '/dez-site' : '', images: {
    unoptimized: true,
  }, compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
