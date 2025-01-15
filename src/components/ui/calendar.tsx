"use client"

import React from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { fr } from 'date-fns/locale'
import "./calendar.css"

interface CalendarProps {
  selected: Date | null
  onChange: (date: Date | null) => void
  startDate?: Date | null
  endDate?: Date | null
  selectsRange?: boolean
  inline?: boolean
  minDate?: Date
}

function Calendar({
  selected,
  onChange,
  startDate,
  endDate,
  selectsRange = false,
  inline = false,
  minDate = new Date(),
}: CalendarProps) {
  return (
    <div className="calendar-wrapper">
      <DatePicker
        selected={selected}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange={selectsRange}
        inline={inline}
        minDate={minDate}
        locale={fr}
        dateFormat="dd/MM/yyyy"
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-luxury-gold"
        calendarClassName="custom-calendar"
        showPopperArrow={false}
        monthsShown={2}
      />
    </div>
  )
}

export default Calendar
