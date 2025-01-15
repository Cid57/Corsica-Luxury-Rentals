import StayConfigurator from '@/components/services/StayConfigurator';

export default function ServicesPage() {
  return (
    <main className="min-h-screen pt-32 pb-16 bg-gray-50/50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-serif font-bold mb-6">
              Configurez votre séjour idéal
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Personnalisez chaque aspect de votre séjour en Corse pour une expérience unique et mémorable.
              Suivez les étapes ci-dessous pour créer le voyage de vos rêves.
            </p>
          </div>
          
          <StayConfigurator />
        </div>
      </div>
    </main>
  );
}
