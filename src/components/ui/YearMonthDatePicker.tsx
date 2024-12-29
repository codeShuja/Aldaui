import React, { useState } from 'react';

interface YearMonthDatePickerProps {
  onChange: (date: Date) => void;
}

const YearMonthDatePicker: React.FC<YearMonthDatePickerProps> = ({ onChange }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
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
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(newDate);
    onChange(newDate);
    setIsOpen(false);
  };

  const handleMonthClick = (month: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), month, 1));
    setView('date');
  };

  const handleYearClick = (year: number) => {
    setCurrentDate(new Date(year, currentDate.getMonth(), 1));
    setView('month');
  };

  const changeYear = (increment: number) => {
    setCurrentDate(new Date(currentDate.getFullYear() + increment, currentDate.getMonth(), 1));
  };

  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, '0'); 
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const calendar = generateCalendar();
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  const currentYear = currentDate.getFullYear();
  const years = Array.from({ length: 12 }, (_, i) => currentYear - 5 + i);

  return (
    <div className="relative ">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 "
      >
        {selectedDate ? formatDate(selectedDate) : 'dd/mm/yyyy'}
      </button>
      {isOpen && (
        <div className="w-full p-2 border rounded-md bg-white focus:outline-none focus:ring-2 absolute z-10">
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
                <button onClick={() => changeYear(-12)} className="text-gray-600 hover:text-gray-800 focus:outline-none">
                  &lt;
                </button>
                <span>{`${years[0]} - ${years[years.length - 1]}`}</span>
                <button onClick={() => changeYear(12)} className="text-gray-600 hover:text-gray-800 focus:outline-none">
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
                    ${selectedDate && day === selectedDate.getDate() && currentDate.getMonth() === selectedDate.getMonth() && currentDate.getFullYear() === selectedDate.getFullYear()
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-700'
                    }`}
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

export default YearMonthDatePicker;
