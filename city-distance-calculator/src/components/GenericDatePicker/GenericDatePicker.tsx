import React, { useState, useEffect, useRef } from "react";
import "./GenericDatePicker.scss";
import arrowLeft from "../../assets/images/arrow-circle-left.png";
import arrowRight from "../../assets/images/arrow-circle-right.png";

interface GenericDatePickerProps {
  onSelectDate: (selectedDate: Date) => void;
  className: string;
}

const GenericDatePicker: React.FC<GenericDatePickerProps> = ({
  onSelectDate,
  className,
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(selectedDate.getMonth());
  const [selectedYear, setSelectedYear] = useState(selectedDate.getFullYear());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = parseInt(event.target.value);
    setSelectedMonth(newMonth);
    setSelectedDate(new Date(selectedYear, newMonth, 1));
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = parseInt(event.target.value);
    setSelectedYear(newYear);
    setSelectedDate(new Date(newYear, selectedMonth, 1));
  };

  const handleDateClick = (day: number) => {
    const newDate = new Date(selectedYear, selectedMonth, day);
    setSelectedDate(newDate);
    onSelectDate(newDate);
    setIsCalendarOpen(false);
  };

  const handlePrevMonth = () => {
    const newDate = new Date(selectedYear, selectedMonth - 1, 1);
    setSelectedDate(newDate);
    setSelectedMonth(newDate.getMonth());
    setSelectedYear(newDate.getFullYear());
  };

  const handleNextMonth = () => {
    const newDate = new Date(selectedYear, selectedMonth + 1, 1);
    setSelectedDate(newDate);
    setSelectedMonth(newDate.getMonth());
    setSelectedYear(newDate.getFullYear());
  };

  const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1).getDay();

  const monthOptions = Array.from({ length: 12 }, (_, index) => (
    <option key={index} value={index}>
      {new Date(selectedYear, index, 1).toLocaleString("default", {
        month: "short",
      })}
    </option>
  ));

  const yearOptions = Array.from({ length: 10 }, (_, index) => (
    <option key={index} value={selectedYear - 5 + index}>
      {selectedYear - 5 + index}
    </option>
  ));

  const selectedDateFormatted = selectedDate.toLocaleDateString("en-US");

  const calendarRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !(calendarRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setIsCalendarOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className="datepicker" ref={calendarRef}>
      <label>Date</label>
      <div>
        <input
          type="text"
          className={className}
          value={selectedDateFormatted}
          readOnly
          onClick={() => setIsCalendarOpen(true)}
        />
        {isCalendarOpen && (
          <div className="calendar-container">
            <button onClick={handlePrevMonth} className="arrow-btn">
              <img src={arrowLeft} alt="Previous Month" />
            </button>
            <div className="select-container">
              <select value={selectedMonth} onChange={handleMonthChange}>
                {monthOptions}
              </select>
            </div>
            <div className="select-container">
              <select value={selectedYear} onChange={handleYearChange}>
                {yearOptions}
              </select>
            </div>
            <button onClick={handleNextMonth} className="arrow-btn">
              <img src={arrowRight} alt="Next Month" />
            </button>
            <table>
              <thead>
                <tr>
                  <th>Su</th>
                  <th>Mo</th>
                  <th>Tu</th>
                  <th>We</th>
                  <th>Th</th>
                  <th>Fr</th>
                  <th>Sa</th>
                </tr>
              </thead>

              <tbody>
                {Array.from(
                  { length: Math.ceil((daysInMonth + firstDayOfMonth) / 7) },
                  (_, weekIndex) => (
                    <tr key={weekIndex}>
                      {Array.from({ length: 7 }, (_, dayIndex) => {
                        const day =
                          weekIndex * 7 + dayIndex + 1 - firstDayOfMonth;
                        const currentDate = new Date(
                          selectedYear,
                          selectedMonth,
                          day
                        );
                        const isCurrentMonth =
                          currentDate.getMonth() === selectedMonth;
                        const isDayInCurrentMonth =
                          isCurrentMonth && day > 0 && day <= daysInMonth;
                        const cellDate = isDayInCurrentMonth ? day : null;

                        return (
                          <td
                            key={dayIndex}
                            onClick={() =>
                              isDayInCurrentMonth &&
                              cellDate !== null &&
                              handleDateClick(cellDate)
                            }
                            className={isDayInCurrentMonth ? "active" : ""}
                          >
                            {cellDate}
                          </td>
                        );
                      })}
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenericDatePicker;
