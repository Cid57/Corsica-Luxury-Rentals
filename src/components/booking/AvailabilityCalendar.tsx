'use client';

import { Calendar } from '@/components/ui/calendar';
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

  const handleSelect = (newDate: DateRange | undefined) => {
    if (newDate?.from) {
      if (date?.to && (!newDate.to || isBefore(newDate.from, date.to))) {
        setDate({ from: newDate.from, to: undefined });
        onDateSelect({ from: newDate.from, to: undefined });
        return;
      }
    }
    setDate(newDate);
    onDateSelect(newDate);
  };

  return (
    <div className={cn('space-y-4', className)}>
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h3 className="text-2xl font-serif mb-2">Dates du séjour</h3>
            <p className="text-gray-600">Sélectionnez vos dates d'arrivée et de départ</p>
          </div>
          
          {date?.from && (
            <div className="mt-4 md:mt-0 bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <div className="w-24 text-gray-600">Arrivée:</div>
                  <div className="font-medium text-gray-900">
                    {format(date.from, 'EEEE d MMMM yyyy', { locale: fr })}
                  </div>
                </div>
                {date.to && (
                  <div className="flex items-center space-x-3">
                    <div className="w-24 text-gray-600">Départ:</div>
                    <div className="font-medium text-gray-900">
                      {format(date.to, 'EEEE d MMMM yyyy', { locale: fr })}
                    </div>
                  </div>
                )}
                {date.from && date.to && (
                  <div className="flex items-center space-x-3 pt-2 border-t border-gray-200 mt-2">
                    <div className="w-24 text-gray-600">Durée:</div>
                    <div className="font-medium text-luxury-gold">
                      {Math.ceil((date.to.getTime() - date.from.getTime()) / (1000 * 60 * 60 * 24))} nuits
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        
        <div className="flex justify-center">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={today}
            selected={date}
            onSelect={handleSelect}
            numberOfMonths={2}
            disabled={(day) => 
              isBefore(day, today) || 
              disabledDates.some(disabledDate => 
                day.getFullYear() === disabledDate.getFullYear() &&
                day.getMonth() === disabledDate.getMonth() &&
                day.getDate() === disabledDate.getDate()
              )
            }
            locale={fr}
            fromDate={today}
            toDate={addDays(today, 365)}
            className="border-0"
            classNames={{
              day_selected: "bg-luxury-gold text-white hover:bg-luxury-gold hover:text-white",
              day_today: "bg-gray-100 text-gray-900",
              day_range_middle: "bg-luxury-gold/20 text-gray-900",
              day_range_end: "bg-luxury-gold text-white hover:bg-luxury-gold hover:text-white",
              day_range_start: "bg-luxury-gold text-white hover:bg-luxury-gold hover:text-white",
            }}
          />
        </div>
      </div>
    </div>
  );
}
