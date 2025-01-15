'use client';

import * as React from "react";
import { format, differenceInDays } from "date-fns";
import { fr } from "date-fns/locale";
import Calendar from "./calendar";

export interface DateRangePickerProps {
  selected?: {
    from: Date | null;
    to: Date | null;
  };
  onChange?: (dates: { from: Date | null; to: Date | null }) => void;
}

export default function DateRangePicker({
  selected = { from: null, to: null },
  onChange,
}: DateRangePickerProps) {
  const formatDateRange = () => {
    if (!selected.from) return 'Sélectionnez vos dates';
    if (!selected.to) return format(selected.from, 'dd MMM yyyy', { locale: fr });
    
    const nights = differenceInDays(selected.to, selected.from);
    return (
      <div className="mb-4">
        <div className="text-2xl font-semibold mb-1">
          {format(selected.from, 'dd MMM', { locale: fr })} - {format(selected.to, 'dd MMM yyyy', { locale: fr })}
        </div>
        <div className="text-gray-600">
          {nights} {nights > 1 ? 'nuits' : 'nuit'}
        </div>
      </div>
    );
  };

  return (
    <div className="grid gap-2">
      {selected.from && selected.to && formatDateRange()}
      <Calendar
        selected={selected.from}
        onChange={(dates) => {
          if (Array.isArray(dates)) {
            const [start, end] = dates;
            onChange?.({ from: start, to: end });
          } else {
            onChange?.({ from: dates, to: null });
          }
        }}
        startDate={selected.from}
        endDate={selected.to}
        selectsRange
        inline
        minDate={new Date()}
      />
    </div>
  );
}
