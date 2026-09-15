'use client';

import React from 'react';
import { FilterType } from '@/types/task';

interface FilterButtonsProps {
  activeFilter: FilterType;
  onSelectFilter: (filter: FilterType) => void;
  counts: {
    all: number;
    pending: number;
    completed: number;
    high: number;
  };
}

export const FilterButtons: React.FC<FilterButtonsProps> = ({
  activeFilter,
  onSelectFilter,
  counts,
}) => {
  const filters: { id: FilterType; label: string; count: number }[] = [
    { id: 'all', label: 'All', count: counts.all },
    { id: 'pending', label: 'Pending', count: counts.pending },
    { id: 'completed', label: 'Completed', count: counts.completed },
    { id: 'high', label: 'High Priority', count: counts.high },
  ];

  return (
    <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100/80 rounded-xl border border-slate-200/60 w-fit">
      {filters.map((filter) => {
        const isActive = activeFilter === filter.id;
        return (
          <button
            key={filter.id}
            type="button"
            onClick={() => onSelectFilter(filter.id)}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-150 ${
              isActive
                ? 'bg-white text-slate-900 font-semibold shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <span>{filter.label}</span>
            <span
              className={`text-xs px-1.5 py-0.2 rounded-full font-semibold ${
                isActive
                  ? 'bg-slate-100 text-slate-700'
                  : 'bg-slate-200/60 text-slate-500'
              }`}
            >
              {filter.count}
            </span>
          </button>
        );
      })}
    </div>
  );
};
