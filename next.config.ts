// next.config.ts
const nextConfig = {
  output: 'export', images: {
    unoptimized: true,
  }, compiler: {
    styledComponents: true,
  }, experimental: {
    scrollRestoration: true,
  },
};

export default nextConfig;
