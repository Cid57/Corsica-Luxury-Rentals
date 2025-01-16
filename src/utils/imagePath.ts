export function getImagePath(path: string): string {
  const basePath = process.env.NODE_ENV === 'production' ? '/Corsica-Luxury-Rentals' : '';
  return `${basePath}${path}`;
}
