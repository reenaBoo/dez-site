import type { NextConfig } from 'next';

const securityHeaders = [
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
];

// Статика из public/ не хэшируется в имени — кэшируем на неделю, с ревалидацией
const staticCache = [{ key: 'Cache-Control', value: 'public, max-age=604800, stale-while-revalidate=86400' }];

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  compiler: {
    styledComponents: true,
  },
  // sharp и драйверы БД — нативные/WASM-модули, их не нужно бандлить
  serverExternalPackages: ['sharp', '@electric-sql/pglite', '@node-rs/argon2', 'pg'],
  async headers() {
    return [
      { source: '/:path*', headers: securityHeaders },
      { source: '/images/:path*', headers: staticCache },
      { source: '/videos/:path*', headers: staticCache },
      { source: '/documents/:path*', headers: staticCache },
      // Загруженные медиа имеют уникальные имена — можно кэшировать навсегда
      { source: '/media/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] },
      { source: '/admin/:path*', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] },
    ];
  },
};

export default nextConfig;
