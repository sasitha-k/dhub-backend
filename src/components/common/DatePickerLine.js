import React, { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { Calendar as CalendarIcon } from "lucide-react";

/** Stops mobile virtual keyboard; calendar selection still works (unlike readOnly on DatePicker). */
const DATE_PICKER_TEXT_INPUT = (
  <input type="text" inputMode="none" autoComplete="off" />
);

const DatePickerLine = ({
  value,
  onChange,
  error,
  disabled,
  open,
  ...props
}) => {
  const datePickerRef = useRef(null);
  const [internalOpen, setInternalOpen] = useState(false);

  // Use controlled open prop if provided, otherwise use internal state
  const isOpen = open !== undefined ? open : internalOpen;

  const handleDateChange = (date) => {
    if (date) {
      const formattedDate = moment(date).format("YYYY-MM-DD");
      onChange(formattedDate);
      // Close calendar after selection if using internal state
      if (open === undefined) {
        setInternalOpen(false);
      }
    } else {
      onChange(null);
    }
  };

  const handleInputClick = () => {
    if (!disabled) {
      if (open === undefined) {
        setInternalOpen(true);
      }
    }
  };

  const handleIconClick = () => {
    if (datePickerRef.current && !disabled) {
      if (open === undefined) {
        setInternalOpen(true);
      }
      datePickerRef.current.setOpen(true);
    }
  };

  return (
    <div className="w-full relative flex min-h-9 items-center md:min-h-10">
      <span
        className="absolute z-20 right-3 top-1/2 -translate-y-1/2 pl-3 flex items-center cursor-pointer"
        onClick={handleIconClick}
      >
        <CalendarIcon
          className={` ${error && "text-red-500"} h-4 w-4 text-muted-foreground `}
        />
      </span>
      <DatePicker
        ref={datePickerRef}
        customInput={DATE_PICKER_TEXT_INPUT}
        selected={
          value
            ? moment(value, "YYYY-MM-DD").isValid()
              ? moment(value, "YYYY-MM-DD").toDate()
              : null
            : null
        }
        onChange={handleDateChange}
        onInputClick={handleInputClick}
        onClickOutside={() => {
          if (open === undefined) {
            setInternalOpen(false);
          }
        }}
        placeholderText="YYYY-MM-DD"
        dateFormat="yyyy-MM-dd"
        disabled={disabled}
        open={isOpen}
        className={`flex w-full border border-primary/40 text-muted-foreground items-center rounded-md bg-background px-3 py-1.5 text-base leading-tight md:py-2.5 md:text-xs md:leading-normal ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 ${
          error
            ? "border-red-500 text-red-500 placeholder:text-red-500"
            : "border-input"
        }`}
      />
    </div>
  );
};

export default DatePickerLine;
