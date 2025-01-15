export function getImagePath(path: string): string {
  // S'assurer que le chemin commence par un slash
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // En production (GitHub Pages), ajouter le préfixe
  if (process.env.NODE_ENV === 'production') {
    return `/Corsica-Luxury-Rentals${normalizedPath}`;
  }
  
  // En développement, utiliser le chemin normalisé
  return normalizedPath;
}
