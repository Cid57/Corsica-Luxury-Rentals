export function getImagePath(path: string): string {
  const basePath = process.env.NODE_ENV === 'production' ? '/Corsica-Luxury-Rentals' : '';
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${basePath}${cleanPath}`;
}
