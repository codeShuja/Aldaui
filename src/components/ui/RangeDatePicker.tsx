import React, { useState } from 'react';

interface RangeDatePickerProps {
  onChange: (startDate: Date | null, endDate: Date | null) => void;
}

const RangeDatePicker: React.FC<RangeDatePickerProps> = ({ onChange }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<'date' | 'month' | 'year'>('date');

  const daysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const firstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const generateCalendar = () => {
    const days = daysInMonth(currentDate);
    const firstDay = firstDayOfMonth(currentDate);
    const calendar: (number | null)[] = Array(42).fill(null);

    for (let i = 0; i < days; i++) {
      calendar[i + firstDay] = i + 1;
    }

    return calendar;
  };

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    if (!startDate || (startDate && endDate)) {
      setStartDate(clickedDate);
      setEndDate(null);
    } else if (clickedDate > startDate) {
      setEndDate(clickedDate);
    } else {
      setEndDate(startDate);
      setStartDate(clickedDate);
    }
    onChange(startDate, endDate);
  };

  const handleMonthClick = (month: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), month, 1));
    setView('date');
  };

  const handleYearClick = (year: number) => {
    setCurrentDate(new Date(year, currentDate.getMonth(), 1));
    setView('month');
  };

 

  const formatDate = (date: Date | null) => {
    return date ? date.toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' }) : '';
  };

  const isInRange = (day: number) => {
    if (!startDate || !endDate) return false;
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return date >= startDate && date <= endDate;
  };

  const calendar = generateCalendar();
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  const currentYear = currentDate.getFullYear();
  const years = Array.from({ length: 12 }, (_, i) => currentYear - 5 + i);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-center items-center w-64 px-4 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {startDate && endDate
          ? `${formatDate(startDate)} - ${formatDate(endDate)}`
          : 'dd/mm/yyyy - dd/mm/yyyy'}
      </button>
      {isOpen && (
        <div className="absolute mt-1 w-64 bg-white border border-gray-300 rounded-md shadow-lg z-10">
          <div className="flex justify-between items-center bg-gray-100 px-4 py-2">
            {view === 'date' && (
              <>
                <button onClick={() => setView('month')} className="text-gray-600 hover:text-gray-800 focus:outline-none">
                  {currentDate.toLocaleString('es-ES', { month: 'long' })}
                </button>
                <button onClick={() => setView('year')} className="text-gray-600 hover:text-gray-800 focus:outline-none">
                  {currentDate.getFullYear()}
                </button>
              </>
            )}
            {view === 'month' && (
              <button onClick={() => setView('year')} className="text-gray-600 hover:text-gray-800 focus:outline-none">
                {currentDate.getFullYear()}
              </button>
            )}
            {view === 'year' && (
              <>
                <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear() - 12, currentDate.getMonth()))} className="text-gray-600 hover:text-gray-800 focus:outline-none">
                  &lt;
                </button>
                <span>{`${years[0]} - ${years[years.length - 1]}`}</span>
                <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear() + 12, currentDate.getMonth()))} className="text-gray-600 hover:text-gray-800 focus:outline-none">
                  &gt;
                </button>
              </>
            )}
          </div>

          {view === 'date' && (
            <div className="grid grid-cols-7 gap-1 p-2">
              {['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'].map((day) => (
                <div key={day} className="text-center text-gray-600 text-xs font-medium">
                  {day}
                </div>
              ))}
              {calendar.map((day, index) => (
                <button
                  key={index}
                  onClick={() => day && handleDateClick(day)}
                  className={`w-8 h-8 flex items-center justify-center text-sm focus:outline-none
                    ${day === null ? 'invisible' : 'hover:bg-blue-100'}
                    ${startDate && day === startDate.getDate() && currentDate.getMonth() === startDate.getMonth() && currentDate.getFullYear() === startDate.getFullYear()
                      ? 'bg-blue-500 text-white'
                      : ''}
                    ${endDate && day === endDate.getDate() && currentDate.getMonth() === endDate.getMonth() && currentDate.getFullYear() === endDate.getFullYear()
                      ? 'bg-blue-500 text-white'
                      : ''}
                    ${isInRange(day || 0) ? 'bg-blue-100' : ''}
                  `}
                >
                  {day}
                </button>
              ))}
            </div>
          )}

          {view === 'month' && (
            <div className="grid grid-cols-3 gap-2 p-2">
              {months.map((month, index) => (
                <button
                  key={month}
                  onClick={() => handleMonthClick(index)}
                  className="w-full py-2 text-sm focus:outline-none hover:bg-blue-100 rounded"
                >
                  {month}
                </button>
              ))}
            </div>
          )}

          {view === 'year' && (
            <div className="grid grid-cols-3 gap-2 p-2">
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => handleYearClick(year)}
                  className="w-full py-2 text-sm focus:outline-none hover:bg-blue-100 rounded"
                >
                  {year}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RangeDatePicker;
