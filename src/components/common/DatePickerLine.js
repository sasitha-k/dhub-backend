import React, { useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { Calendar as CalendarIcon } from "lucide-react";

const DatePickerLine = ({ value, onChange, error,  disabled, ...props }) => {
  const datePickerRef = useRef(null);

  const handleDateChange = (date) => {
    if (date) {
      const formattedDate = moment(date).format("YYYY-MM-DD");
      onChange(formattedDate);
    } else {
      onChange(null);
    }
  };

  const handleIconClick = () => {
    if (datePickerRef.current) {
      datePickerRef.current.setFocus();
    }
  };

  return (
    <div className="w-full h-10 relative flex items-center">
      <span
        className="absolute z-20 right-3 bottom-3 pl-3 flex items-center"
        onClick={handleIconClick}
      >
        <CalendarIcon className={` ${error && "text-red-500"} h-4 w-4 text-muted-foreground `} />
      </span>
        <DatePicker
        ref={datePickerRef}
        selected={
          value
            ? moment(value, "YYYY-MM-DD").isValid()
              ? moment(value, "YYYY-MM-DD").toDate()
              : null
            : null
        }
        onChange={handleDateChange}
        placeholderText="YYYY-MM-DD"  
        dateFormat="yyyy-MM-dd"
        disabled={disabled}
        className={`flex h-10 w-full border border-primary/40 text-muted-foreground items-center rounded-md bg-background px-3 py-2.5 text-xs ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 border ${
          error ? "border-red-500 text-red-500 placeholder:text-red-500" : "border-input"
        }`}
      />
    </div>
  );
};

export default DatePickerLine;
