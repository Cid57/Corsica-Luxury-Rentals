import Hero from '@/components/home/Hero';
import { villas } from '@/data/villas';
import Image from 'next/image';
import Link from 'next/link';
import { FaBed, FaUsers, FaBath } from 'react-icons/fa';
import VillaCard from '@/components/villa/VillaCard';
import Testimonials from '@/components/home/Testimonials';

export default function Home() {
  const featuredVillas = villas.filter(villa => villa.featured);

  return (
    <main className="min-h-screen">
      <Hero />
      
      <Testimonials />

      <section className="py-16 bg-gray-50/50">
        <div className="mx-auto max-w-[2000px] px-8 lg:px-16">
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-3xl md:text-4xl xl:text-5xl font-serif text-center mb-4">
              Nos plus belles villas
            </h2>
            <p className="text-gray-600 text-center mb-8 max-w-2xl text-lg">
              Découvrez notre sélection de villas d'exception en Corse. Des propriétés uniques alliant luxe, confort et authenticité.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {featuredVillas.map((villa) => (
              <VillaCard key={villa.id} villa={villa} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/villas" 
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-white rounded-full text-lg font-medium transition-colors duration-300"
            >
              Voir toutes nos villas
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
