'use client';

import React from 'react';
import { Task, FilterType } from '@/types/task';
import { TaskCard } from './TaskCard';
import { SearchBar } from './SearchBar';
import { FilterButtons } from './FilterButtons';
import { EmptyState } from './EmptyState';

interface TaskListProps {
  tasks: Task[];
  allTasksCount: number;
  activeFilter: FilterType;
  onSelectFilter: (filter: FilterType) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  counts: {
    all: number;
    pending: number;
    completed: number;
    high: number;
  };
  onToggleTask: (id: string) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (task: Task) => void;
  onOpenAddTask: () => void;
}

const filterTitles: Record<FilterType, string> = {
  all: 'All Tasks',
  today: "Today's Tasks",
  pending: 'In Progress Tasks',
  completed: 'Completed Tasks',
  high: 'High Priority Tasks',
};

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  allTasksCount,
  activeFilter,
  onSelectFilter,
  searchQuery,
  onSearchChange,
  counts,
  onToggleTask,
  onEditTask,
  onDeleteTask,
  onOpenAddTask,
}) => {
  const isSearchOrFiltered =
    allTasksCount > 0 &&
    tasks.length === 0 &&
    (searchQuery.trim() !== '' || activeFilter !== 'all');

  const title = filterTitles[activeFilter] || "Today's Tasks";

  return (
    <section className="space-y-5">
      {/* Controls Bar: Search & Quick Filters */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="w-full md:max-w-xs lg:max-w-sm">
          <SearchBar value={searchQuery} onChange={onSearchChange} />
        </div>

        <FilterButtons
          activeFilter={activeFilter}
          onSelectFilter={onSelectFilter}
          counts={counts}
        />
      </div>

      {/* Section Header */}
      <div className="flex items-center justify-between pt-1 pb-1">
        <div className="flex items-center gap-2.5">
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            {title}
          </h2>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200/60">
            {tasks.length}
          </span>
        </div>
      </div>

      {/* Task Cards Grid / Empty State */}
      {tasks.length === 0 ? (
        <EmptyState
          isSearchOrFiltered={isSearchOrFiltered}
          onAddTask={onOpenAddTask}
          onClearFilters={() => {
            onSearchChange('');
            onSelectFilter('all');
          }}
        />
      ) : (
        <div className="grid grid-cols-1 gap-3.5">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggle={onToggleTask}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
            />
          ))}
        </div>
      )}
    </section>
  );
};
