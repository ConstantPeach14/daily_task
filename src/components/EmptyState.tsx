'use client';

import React from 'react';
import { CheckCircle, Plus, SearchX } from 'lucide-react';

interface EmptyStateProps {
  isSearchOrFiltered?: boolean;
  onAddTask: () => void;
  onClearFilters?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  isSearchOrFiltered = false,
  onAddTask,
  onClearFilters,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-2xl border border-dashed border-gray-200 bg-white/60">
      {isSearchOrFiltered ? (
        <>
          <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400 mb-4">
            <SearchX className="w-7 h-7 stroke-[1.8]" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-gray-800">
            No matching tasks found
          </h3>
          <p className="text-sm text-gray-500 max-w-sm mt-1 mb-5">
            We couldn't find any tasks matching your current search or filter criteria.
          </p>
          {onClearFilters && (
            <button
              type="button"
              onClick={onClearFilters}
              className="px-4 py-2 rounded-xl text-sm font-semibold text-pink-600 bg-pink-50 hover:bg-pink-100 transition-colors"
            >
              Reset Filters
            </button>
          )}
        </>
      ) : (
        <>
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 shadow-xs">
            <CheckCircle className="w-8 h-8 stroke-[2.2]" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-800">
            No tasks yet 🎉
          </h3>
          <p className="text-sm text-gray-500 max-w-sm mt-1.5 mb-6">
            You're all caught up! Add a new task to get started and organize your day.
          </p>
          <button
            type="button"
            onClick={onAddTask}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-700 text-white text-sm font-semibold shadow-md shadow-pink-500/20 transition-all duration-200 transform hover:-trangray-y-0.5"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>+ Add Task</span>
          </button>
        </>
      )}
    </div>
  );
};
