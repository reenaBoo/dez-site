export const getAssetPath = (path: string): string => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  if (process.env.NODE_ENV === 'production') {
    return `/dez-site${normalizedPath}`;
  }

  return normalizedPath;
};
