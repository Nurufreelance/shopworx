// src/features/production-log/components/EquipmentSelector.tsx

import React, { useState, useRef, useEffect } from 'react';

interface EquipmentSelectorProps {
  options: string[];
  selectedValue: string | null;
  onSelect: (value: string) => void;
}

export default function EquipmentSelector({
  options = [],
  selectedValue,
  onSelect,
}: EquipmentSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Safety check
  const safeOptions = Array.isArray(options) ? options : [];
  const displayValue = selectedValue || 'Select Equipment';

  if (safeOptions.length === 0) {
    return (
      <div className="w-[270px] px-3 py-2 bg-[#F5F5F5] text-[13px] text-[#6B7280]">
        No equipment available
      </div>
    );
  }

  return (
    <div className="relative w-[270px]" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 py-2 bg-[#F5F5F5] hover:bg-[#EBEBEB] text-[13px] text-[#1F2937] transition-colors"
      >
        <span className="truncate">{displayValue}</span>
        <svg 
          className={`w-4 h-4 text-[#6B7280] transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-0.5 bg-white border border-[#F0F0F0] shadow-sm z-50 max-h-[200px] overflow-y-auto">
          {safeOptions.map((option) => (
            <button
              key={option}
              onClick={() => {
                onSelect(option);
                setIsOpen(false);
              }}
              className={`w-full px-3 py-1.5 text-[13px] text-left hover:bg-[#F5F5F5] transition-colors ${
                selectedValue === option ? 'bg-[#F5F5F5] text-[#3048A8]' : 'text-[#1F2937]'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}