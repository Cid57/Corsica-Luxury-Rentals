export function getImagePath(path: string): string {
  // Ajouter le préfixe pour GitHub Pages en production
  const basePath = process.env.NODE_ENV === 'production' ? '/corsica-luxury-rentals' : '';
  
  // S'assurer que le chemin commence par /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  return `${basePath}${normalizedPath}`;
}
