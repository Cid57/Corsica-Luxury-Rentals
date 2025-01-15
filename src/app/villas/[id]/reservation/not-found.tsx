import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen pt-32 pb-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
          Villa non trouvée
        </h1>
        <p className="text-gray-600 mb-8">
          Désolé, la villa que vous recherchez n'existe pas ou n'est plus disponible.
        </p>
        <Link
          href="/villas"
          className="inline-block px-8 py-3 bg-luxury-gold text-white rounded-xl hover:bg-luxury-gold/90 transition-colors"
        >
          Voir toutes nos villas
        </Link>
      </div>
    </main>
  );
}
