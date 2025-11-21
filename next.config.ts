const nextConfig = {
  output: 'export', basePath: '/nextjs-github-pages', images: {
    unoptimized: true,
  }, compiler: {
    styledComponents: true,
  }, experimental: {
    scrollRestoration: true,
  }, eslint: {
    dirs: ['src'],
  },
};
export default nextConfig;
