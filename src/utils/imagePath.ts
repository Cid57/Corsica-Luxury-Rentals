export function getImagePath(path: string): string {
  // En développement, utiliser le chemin direct, en production ajouter le préfixe
  const basePath = process.env.NODE_ENV === 'production' ? '/Corsica-Luxury-Rentals' : '';
  
  // Supprimer le préfixe du chemin s'il existe déjà (en tenant compte des deux variantes possibles)
  const cleanPath = path
    .replace('/Corsica-Luxury-Rentals', '')
    .replace('/corsica-luxury-rentals', '');
  
  // Construire le chemin final
  return `${basePath}${cleanPath}`;
}
