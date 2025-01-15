'use client';

import * as React from "react";
import { format, differenceInDays } from "date-fns";
import { fr } from "date-fns/locale";
import Calendar from "./calendar";

interface HomeCalendarProps {
  selected?: {
    from: Date | null;
    to: Date | null;
  };
  onChange?: (dates: { from: Date | null; to: Date | null }) => void;
}

export default function HomeCalendar({
  selected = { from: null, to: null },
  onChange,
}: HomeCalendarProps) {
  const numberOfNights = selected.from && selected.to
    ? differenceInDays(selected.to, selected.from)
    : 0;

  const formatDateRange = () => {
    if (selected.from && selected.to) {
      const fromStr = format(selected.from, 'dd MMM.', { locale: fr });
      const toStr = format(selected.to, 'dd MMM. yyyy', { locale: fr });
      return (
        <div className="selected-range-text">
          {fromStr} - {toStr}
          <div>{numberOfNights} nuit{numberOfNights > 1 ? 's' : ''}</div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid gap-2">
      {formatDateRange()}
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
