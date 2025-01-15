'use client';

import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';

export default function ReservationNavigation() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <button
      onClick={handleBack}
      className="fixed top-8 left-8 z-50 p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:scale-110 transition-all duration-300"
    >
      <FaArrowLeft className="w-6 h-6 text-gray-700" />
    </button>
  );
}
