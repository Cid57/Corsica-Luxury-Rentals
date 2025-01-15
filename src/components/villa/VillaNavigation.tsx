'use client';

import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';

export default function VillaNavigation() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <button
      onClick={handleBack}
      className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
    >
      <FaArrowLeft />
      <span>Retour aux villas</span>
    </button>
  );
}
