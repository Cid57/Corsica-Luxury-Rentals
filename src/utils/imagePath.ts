export function getImagePath(path: string): string {
  // En production (GitHub Pages), ajouter le préfixe
  if (process.env.NODE_ENV === 'production') {
    return `/Corsica-Luxury-Rentals${path}`;
  }
  // En développement, utiliser le chemin normal
  return path;
}
