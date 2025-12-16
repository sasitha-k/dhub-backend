import React from "react";
import { CircleX, Search } from "lucide-react";
import TextInput from "./TextInput";

export default function SearchInput({ value, onChange, placeholder = "Search..." }) {

  return (
    <div className="relative w-full ">
      <TextInput
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        data-id="search"
      />
      <div className={`absolute text-slate-400 right-2 top-3 `}>
        {value ? (
          <button
              onClick={() => onChange({ target: { value: "" } })} 
              className=""
            >
              <CircleX className="w-4 h-4 hover:text-primary"/>
          </button>
        ) : (
             <Search className="w-4 h-4 rotate-90 " />
        )}
       
      </div>
   </div>
  );
}
