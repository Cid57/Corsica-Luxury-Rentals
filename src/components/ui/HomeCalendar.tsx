'use client';

import * as React from "react";
import { format, differenceInDays } from "date-fns";
import { fr } from "date-fns/locale";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./home-calendar.css";

interface CustomDateRange {
  from?: Date;
  to?: Date;
}

interface HomeCalendarProps {
  selected?: CustomDateRange;
  onSelect?: (range: CustomDateRange | undefined) => void;
}

export default function HomeCalendar({
  selected,
  onSelect,
}: HomeCalendarProps) {
  const numberOfNights = selected?.from && selected?.to
    ? differenceInDays(selected.to, selected.from)
    : 0;

  return (
    <div className="home-calendar bg-white/5 rounded-2xl p-4">
      {selected?.from && (
        <div className="date-range-display bg-white/5 backdrop-blur rounded-lg p-4 mb-4 text-center">
          <div className="text-luxury-gold text-lg font-medium mb-2">
            {selected.to ? (
              <>
                Du {format(selected.from, 'dd MMMM', { locale: fr })} au{' '}
                {format(selected.to, 'dd MMMM yyyy', { locale: fr })}
              </>
            ) : (
              <>Sélectionnez votre date de départ</>
            )}
          </div>
          {selected.to && (
            <div className="text-white/80 text-base">
              {numberOfNights} nuit{numberOfNights > 1 ? 's' : ''}
            </div>
          )}
        </div>
      )}

      <DatePicker
        selected={selected?.from || null}
        onChange={(dates: [Date | null, Date | null]) => {
          const [start, end] = dates;
          onSelect?.({ 
            from: start || undefined, 
            to: end || undefined 
          });
        }}
        startDate={selected?.from || null}
        endDate={selected?.to || null}
        selectsRange
        inline
        locale={fr}
        dateFormat="dd/MM/yyyy"
        minDate={new Date()}
        monthsShown={2}
        calendarClassName="bg-transparent"
        dayClassName={(date) => "text-white hover:bg-white/10 rounded"}
        wrapperClassName="!block"
        className="w-full"
      />
    </div>
  );
}
