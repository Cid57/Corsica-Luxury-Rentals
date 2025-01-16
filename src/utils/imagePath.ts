export function getImagePath(path: string): string {
  // En développement, utiliser le chemin direct, en production ajouter le préfixe
  const basePath = process.env.NODE_ENV === 'production' ? '/corsica-luxury-rentals' : '';
  
  // Supprimer le préfixe du chemin s'il existe déjà
  const cleanPath = path.replace('/corsica-luxury-rentals', '');
  
  // Construire le chemin final
  return `${basePath}${cleanPath}`;
}
