import React, { useState, useRef, useEffect } from "react";

interface DropdownProps {
  items: { label: string; value: string }[];
  onSelect: (value: string) => void;
  selectedValue: string | null;
  required?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  items,
  onSelect,
  selectedValue,
  required,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const dropdownListRef = useRef<HTMLDivElement | null>(null);
  const [error, setError] = useState<string>("");

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  const handleSelectItem = (value: string) => {
    onSelect(value);
    setError("");
    setIsOpen(false);
  };

  const handleBlur = () => {
    if (required && !selectedValue) {
      setError("This field is required");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      if (!isOpen) {
        // If the dropdown is closed, open it when "Enter" is pressed
        setIsOpen(true);
      } else {
        // If the dropdown is open, select the highlighted item
        if (highlightedIndex >= 0) {
          onSelect(items[highlightedIndex].value);
          setIsOpen(false);
          setError("");
        }
      }
    }

    if (isOpen) {
      // Handle ArrowDown and ArrowUp when the dropdown is open
      switch (event.key) {
        case "ArrowDown":
          setHighlightedIndex((prevIndex) =>
            prevIndex < items.length - 1 ? prevIndex + 1 : 0
          );
          break;
        case "ArrowUp":
          setHighlightedIndex((prevIndex) =>
            prevIndex > 0 ? prevIndex - 1 : items.length - 1
          );
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (dropdownListRef.current && highlightedIndex >= 0) {
      const highlightedElement = dropdownListRef.current.children[highlightedIndex] as HTMLElement;
      if (highlightedElement) {
        const dropdownList = dropdownListRef.current;
        const { top, bottom } = highlightedElement.getBoundingClientRect();
        const { top: dropdownTop, bottom: dropdownBottom } = dropdownList.getBoundingClientRect();

        if (top < dropdownTop) {
          dropdownList.scrollTop = highlightedElement.offsetTop;
        } else if (bottom > dropdownBottom) {
          dropdownList.scrollTop = highlightedElement.offsetTop - dropdownList.offsetHeight + highlightedElement.offsetHeight;
        }
      }
    }
  }, [highlightedIndex, isOpen]);

  return (
    <div
      className="relative inline-block w-full"
      ref={dropdownRef}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div
        className="w-full px-4 py-2 text-sm font-medium bg-white border border-gray-300 rounded-lg shadow-sm cursor-pointer flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
        onBlur={handleBlur}
      >
        <span>
          {selectedValue
            ? items.find((item) => item.value === selectedValue)?.label
            : "Select an option"}
        </span>
        <svg
          className={`w-5 h-5 ml-2 transform transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4 4a.75.75 0 01-1.06 0l-4-4a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      {isOpen && (
        <div
          ref={dropdownListRef}
          className="absolute mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 overflow-y-auto"
        >
          {items.map((item, index) => (
            <div
              key={`${item.value}-${index}`}
              onClick={() => handleSelectItem(item.value)}
              className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${highlightedIndex === index ? "bg-blue-200" : ""}`}
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
      {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
    </div>
  );
};

export default Dropdown;
