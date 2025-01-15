'use client';

import { useEffect, useState } from 'react';

interface GuestCounterProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export default function GuestCounter({ value, onChange, min = 1, max = 20 }: GuestCounterProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const increment = () => {
    if (!mounted) return;
    if (value < max) {
      onChange(value + 1);
    }
  };

  const decrement = () => {
    if (!mounted) return;
    if (value > min) {
      onChange(value - 1);
    }
  };

  if (!mounted) {
    return (
      <div className="h-12 bg-white rounded-xl animate-pulse" />
    );
  }

  return (
    <div className="flex items-center justify-between bg-white rounded-xl px-4 py-3">
      <button
        type="button"
        onClick={decrement}
        disabled={value <= min}
        className="w-8 h-8 flex items-center justify-center text-gray-800 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        -
      </button>
      <span className="text-gray-800">
        {value} voyageur{value > 1 ? 's' : ''}
      </span>
      <button
        type="button"
        onClick={increment}
        disabled={value >= max}
        className="w-8 h-8 flex items-center justify-center text-gray-800 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        +
      </button>
    </div>
  );
}
