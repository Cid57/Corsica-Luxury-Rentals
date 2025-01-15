'use client';

import Calendar from '@/components/ui/calendar';
import { DateRange } from 'react-day-picker';
import { useState } from 'react';
import { addDays, isBefore, format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { cn } from '@/lib/utils';

interface AvailabilityCalendarProps {
  villaId: string;
  onDateSelect: (range: DateRange | undefined) => void;
  className?: string;
}

const getDisabledDates = (villaId: string) => {
  // TODO: Fetch disabled dates from API
  return [new Date(2025, 0, 10), new Date(2025, 0, 11), new Date(2025, 0, 12)];
};

export default function AvailabilityCalendar({
  villaId,
  onDateSelect,
  className,
}: AvailabilityCalendarProps) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  const disabledDates = getDisabledDates(villaId);
  const today = new Date();

  return (
    <div className={cn("w-full", className)}>
      <Calendar
        selected={date?.from}
        onChange={(newDate) => {
          if (newDate) {
            const range = {
              from: newDate,
              to: date?.to
            };
            setDate(range);
            onDateSelect(range);
          }
        }}
        minDate={today}
        startDate={date?.from}
        endDate={date?.to}
        selectsRange
        inline
      />
    </div>
  );
}
