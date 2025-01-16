'use client';

import { villas } from '@/data/villas';
import VillaCard from '@/components/villa/VillaCard';
import { getImagePath } from '@/utils/imagePath';

export default function VillasPage() {
  const bgImage = getImagePath('images/porto-vecchio-1.jpg');
  
  return (
    <main className="min-h-screen bg-gray-50/50">
      {/* Hero Section */}
      <section className="relative h-[40vh]" style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
        <div className="absolute inset-0 flex items-center justify-center text-center pt-20">
          <div className="space-y-4 px-4">
            <h1 className="text-4xl md:text-5xl font-serif text-white">
              Nos Villas d'Exception
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
              Découvrez notre collection exclusive de villas de luxe en Corse
            </p>
          </div>
        </div>
      </section>

      {/* Liste des villas */}
      <section className="py-16">
        <div className="mx-auto max-w-[2000px] px-8 lg:px-16">          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {villas.map((villa) => (
              <VillaCard key={villa.id} villa={villa} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
