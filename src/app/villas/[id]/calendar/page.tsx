import { Villa } from '@/types/villa';
import { villas } from '@/data/villas';

export async function generateStaticParams() {
  return villas.map((villa) => ({
    id: villa.id,
  }));
}

export default function CalendarPage({ params }: { params: { id: string } }) {
  const villa = villas.find(v => v.id === params.id);

  if (!villa) {
    return <div>Villa non trouvée</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h1 className="text-2xl font-serif text-center mb-4">Sélection des dates</h1>
            <p className="text-center text-gray-600 mb-6">
              Cette fonctionnalité sera bientôt disponible
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
