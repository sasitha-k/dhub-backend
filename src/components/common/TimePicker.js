"use client";

import * as React from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker as MuiTimePicker } from "@mui/x-date-pickers/TimePicker";
import { cn } from "@/lib/utils";

function hhmmToDayjs(value) {
  if (!value || typeof value !== "string") return null;
  const m = value.trim().match(/^(\d{1,2}):(\d{2})$/);
  if (!m) return null;
  const h = parseInt(m[1], 10);
  const min = parseInt(m[2], 10);
  if (Number.isNaN(h) || Number.isNaN(min) || h > 23 || min > 59) return null;
  return dayjs().hour(h).minute(min).second(0).millisecond(0);
}

export default function TimePicker({
  onChange,
  value,
  error,
  id = "time",
  className,
  disabled,
  required = true,
  slotProps: userSlotProps,
  ...props
}) {
  const dayjsValue = React.useMemo(
    () => hhmmToDayjs(value || ""),
    [value]
  );

  const handleChange = React.useCallback(
    (newValue) => {
      let str = "";
      if (newValue != null) {
        str = dayjs.isDayjs(newValue)
          ? newValue.format("HH:mm")
          : dayjs(newValue).format("HH:mm");
      }
      onChange?.({ target: { value: str } });
    },
    [onChange]
  );

  return (
    <div className={cn("w-full min-w-0 max-w-full", className)}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MuiTimePicker
          ampm={false}
          value={dayjsValue}
          onChange={handleChange}
          disabled={disabled}
          /**
           * Always use desktop picker: the responsive "mobile" variant opens a
           * full-screen dialog that fights Radix Dialog/Sheet focus traps and
           * feels "stuck". Desktop uses a Popper instead.
           */
          desktopModeMediaQuery="(min-width: 0px)"
          slotProps={{
            ...userSlotProps,
            popper: {
              ...userSlotProps?.popper,
              placement: userSlotProps?.popper?.placement ?? "bottom-start",
              disablePortal: true,
              sx: [
                { zIndex: 16000 },
                ...(Array.isArray(userSlotProps?.popper?.sx)
                  ? userSlotProps.popper.sx
                  : userSlotProps?.popper?.sx
                    ? [userSlotProps.popper.sx]
                    : []),
              ],
            },
            textField: {
              ...userSlotProps?.textField,
              id,
              required,
              error: !!error,
              fullWidth: true,
              size: "small",
              hiddenLabel: true,
              placeholder: "--:--",
              className: cn(
                "time-picker-field",
                userSlotProps?.textField?.className
              ),
              sx: [
                {
                  "& .MuiOutlinedInput-root": {
                    minHeight: 36,
                    borderRadius: "calc(var(--radius) - 2px)",
                    fontSize: "1rem",
                    "@media (min-width: 768px)": {
                      fontSize: "0.875rem",
                    },
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: error
                      ? "rgb(239 68 68)"
                      : "color-mix(in oklch, var(--primary) 40%, transparent)",
                  },
                  "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: error
                        ? "rgb(239 68 68)"
                        : "color-mix(in oklch, var(--primary) 50%, transparent)",
                    },
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      borderWidth: "1px",
                      borderColor: error
                        ? "rgb(239 68 68)"
                        : "var(--ring)",
                    },
                  "& .MuiInputBase-input": {
                    py: 1,
                    color: error ? "rgb(239 68 68)" : "var(--muted-foreground)",
                  },
                },
                ...(Array.isArray(userSlotProps?.textField?.sx)
                  ? userSlotProps.textField.sx
                  : userSlotProps?.textField?.sx
                    ? [userSlotProps.textField.sx]
                    : []),
              ],
            },
          }}
          {...props}
        />
      </LocalizationProvider>
    </div>
  );
}
