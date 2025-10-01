import React from "react";

export default function TimePicker({onChange,value}) {
  return (
    <div>
      <div className="absolute top-2">
        {/* <input aria-label="Time" type="time" /> */}
      </div>
      <input
        type="time"
        id="start-time"
        className="bg-gray-50 border h-10 leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        min="00:00"
        max="23:59"
        value={value || ""}
        required
        onChange={onChange}
      />
    </div>
  );
}
