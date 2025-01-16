'use client';

import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';

export default function ReservationNavigation() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4 h-20 flex items-center">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
        >
          <FaArrowLeft className="w-5 h-5 text-gray-700" />
          <span className="text-gray-700">Retour</span>
        </button>
      </div>
    </div>
  );
}
