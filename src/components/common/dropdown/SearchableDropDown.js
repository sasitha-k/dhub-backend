
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function SearchableDropdown({
  options,
  labelKey,
  valueKey,
  value,
  onChange,
  placeholder = "Select an option...",
  searchPlaceholder,
  disabled,
  openStatus,
  setSearchQuery,
  isMulti = false,
  error,
  ...props
}) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(openStatus || false);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(e.target)) {
        setIsOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (typeof setSearchQuery === "function") {
      setSearchQuery(query);
    }
  }, [query, setSearchQuery]);

  const isSelected = (option) => {
    if (isMulti && Array.isArray(value)) {
      return value.includes(option[valueKey]);
    }
    return option[valueKey] === value;
  };

  const handleSelect = (option) => {
    if (isMulti) {
      if (!Array.isArray(value)) return;
      const selected = value?.includes(option[valueKey])
        ? value.filter((val) => val !== option[valueKey])
        : [...value, option[valueKey]];
      onChange(selected);
    } else {
      onChange(option[valueKey]);
      setIsOpen(false);
    }
    setQuery("");
  };

  const getSelectedLabel = () => {
    if (isMulti && Array.isArray(value)) {
      const selectedOptions = options?.filter((opt) =>
        value?.includes(opt[valueKey])
      );
      return selectedOptions?.length > 0
        ? selectedOptions?.map((opt) => opt[labelKey])?.join(", ")
        : placeholder;
    }
    const selected = options?.find((opt) => opt[valueKey] === value);
    return selected ? selected[labelKey] : placeholder;
  };

  const filterOptions = (options) =>
    options?.filter((option) =>
      option[labelKey]?.toLowerCase()?.includes(query?.toLowerCase())
    );

  const clearAll = (e) => {
    e.stopPropagation();
    onChange(isMulti ? [] : null);
  };

  return (
    <div className="w-full relative" ref={dropdownRef}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
        disabled={disabled}
        {...props}
        className={cn(
          "w-full capitalize flex items-center justify-between px-3 text-sm py-2.5 border rounded-md bg-background text-left",
          disabled && "text-primary opacity-60 cursor-not-allowed",
          error && "border-red-500"
        )}
      >
        <span
          className={cn(
            "truncate flex-1",
            value ? "text-muted-foreground" : error ? "text-red-500" : "text-gray-400"
          )}
        >
          {getSelectedLabel()}
        </span>
        {!disabled && (
          <>
            {((isMulti && Array.isArray(value) && value?.length > 0) ||
              (!isMulti && value)) && (
              <X
                className={`mr-1 text-muted-foreground hover:text-destructive`}
                size={14}
                onClick={clearAll}
              />
            )}
            {isOpen ? <ChevronUp size={18} className={` ${error ? "text-red-500":""}`} /> : <ChevronDown size={18} className={` ${error && "text-red-500"}`}/>}
          </>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="relative lg:absolute left-0 z-[120] mt-1 w-full rounded-md border bg-background shadow-md max-h-60 overflow-y-auto">
          <div className="p-2">
            <input
              ref={inputRef}
              type="text"
              autoFocus
              placeholder={searchPlaceholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className={`w-full text-sm px-2 py-1 border rounded focus:outline-none `}
            />
          </div>

          {filterOptions(options)?.length > 0 ? (
            filterOptions(options)?.map((option, index) => (
              <div
                key={`${index}`}
                onClick={() => handleSelect(option)}
                className={`cursor-pointer px-4 py-1 hover:bg-accent font-normal text-sm capitalize flex justify-between ${
                  isSelected(option) ? "bg-accent text-accent-foreground" : ""
                }`}
              >
                <span>{option[labelKey]}</span>
                {isSelected(option) && <span>✓</span>}
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-muted-foreground text-sm font-normal">
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchableDropdown;
