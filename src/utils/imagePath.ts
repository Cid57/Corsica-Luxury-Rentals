export function getImagePath(path: string): string {
  // Supprimer le slash initial si présent
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // Utiliser la même logique que dans le Hero qui fonctionne
  return `${process.env.NODE_ENV === 'production' ? '/Corsica-Luxury-Rentals' : ''}/${cleanPath}`;
}
