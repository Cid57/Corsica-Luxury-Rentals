'use client';

import * as React from "react";
import { format, differenceInDays } from "date-fns";
import { fr } from "date-fns/locale";
import Calendar from "./calendar";
import { DateRange } from "react-day-picker";

interface HomeCalendarProps {
  selected?: DateRange | undefined;
  onSelect?: (range: DateRange | undefined) => void;
}

export default function HomeCalendar({
  selected,
  onSelect,
}: HomeCalendarProps) {
  const numberOfNights = selected?.from && selected?.to
    ? differenceInDays(selected.to, selected.from)
    : 0;

  const formatDateRange = () => {
    if (selected?.from && selected?.to) {
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
        selected={selected?.from || null}
        onChange={(date: Date | null) => {
          if (date) {
            if (!selected?.from) {
              onSelect?.({ from: date, to: undefined });
            } else if (!selected.to || date < selected.from) {
              onSelect?.({ from: date, to: undefined });
            } else {
              onSelect?.({ from: selected.from, to: date });
            }
          }
        }}
        startDate={selected?.from || null}
        endDate={selected?.to || null}
        selectsRange
        inline
        minDate={new Date()}
      />
    </div>
  );
}
