const nextConfig = {
  output: 'export', basePath: process.env.NODE_ENV === 'production' ? '/dez-site' : '', images: {
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
