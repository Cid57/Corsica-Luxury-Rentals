'use client';

import { useState } from 'react';
import { FaDog } from 'react-icons/fa';

interface PetSelectorProps {
  value: boolean;
  onChange: (value: boolean) => void;
}

export default function PetSelector({ value, onChange }: PetSelectorProps) {
  const handleToggle = () => {
    onChange(!value);
  };

  return (
    <button
      onClick={handleToggle}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
        value 
          ? 'bg-luxury-gold/10 text-luxury-gold border border-luxury-gold' 
          : 'bg-white/5 text-white/70 border border-white/10 hover:bg-white/10'
      }`}
    >
      <FaDog className={`text-lg ${value ? 'text-luxury-gold' : 'text-white/70'}`} />
      <span className="text-sm font-medium">
        {value ? 'Avec animaux' : 'Animaux'}
      </span>
    </button>
  );
}
