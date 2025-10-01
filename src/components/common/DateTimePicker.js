import React, { useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment-timezone";
import { CalendarIcon } from "lucide-react";


const DateTimePicker = ({
  selectedDate,
  onChange,
  disabled,
  error,
  ...props
}) => {
  const datePickerRef = useRef(null);

  const handleChange = (date) => {
    if (date) {
      const formatted = moment(date).format("YYYY-MM-DD HH:mm");
      onChange(formatted);
    } else {
      onChange(null);
    }
  };

  const handleIconClick = () => {
    if (datePickerRef.current) {
      datePickerRef.current.setFocus();
    }
  };

  const inputClass = `w-full flex px-3 py-2 h-10 items-center rounded-md bg-background border text-xs ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 ${
    error
      ? "border-1 border-red-500 text-red-600 placeholder:text-red-400 focus-visible:ring-red-600"
      : "border-input placeholder:text-muted-foreground focus-visible:ring-ring"
  }`;

  return (
    <div className="relative flex w-full">
      <DatePicker
        ref={datePickerRef}
        // locale={enGB}
        selected={
          selectedDate && moment(selectedDate, "YYYY-MM-DD HH:mm").isValid()
            ? moment(selectedDate, "YYYY-MM-DD HH:mm").toDate() : ""
            
        }
        onChange={handleChange}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={1}
        dateFormat="yyyy-MM-dd HH:mm"
        placeholderText="YYYY-MM-DD HH:mm"
        disabled={disabled}
        className={inputClass}
        {...props}
      />
      <span
        className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
        onClick={handleIconClick}
      >
        <CalendarIcon
          className={`h-4 w-4 ${
            error ? "text-red-500" : "text-muted-foreground"
          }`}
        />
      </span>
    </div>
  );
};

export default DateTimePicker;
