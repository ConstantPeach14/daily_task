'use client';

import React from 'react';
import { 
  LayoutDashboard, 
  ListTodo, 
  CalendarDays, 
  CheckCircle, 
  AlertCircle,
  Sparkles,
  Plus
} from 'lucide-react';
import { FilterType } from '@/types/task';

interface SidebarProps {
  activeFilter: FilterType;
  onSelectFilter: (filter: FilterType) => void;
  counts: {
    all: number;
    today: number;
    pending: number;
    completed: number;
    high: number;
  };
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  onOpenAddTaskModal: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeFilter,
  onSelectFilter,
  counts,
  isOpenMobile,
  onCloseMobile,
  onOpenAddTaskModal,
}) => {
  const navItems = [
    {
      id: 'all' as FilterType,
      label: 'All Tasks',
      icon: ListTodo,
      count: counts.all,
      color: 'text-gray-600',
    },
    {
      id: 'today' as FilterType,
      label: 'Today',
      icon: CalendarDays,
      count: counts.today,
      color: 'text-pink-600',
    },
    {
      id: 'pending' as FilterType,
      label: 'In Progress',
      icon: LayoutDashboard,
      count: counts.pending,
      color: 'text-amber-600',
    },
    {
      id: 'completed' as FilterType,
      label: 'Completed',
      icon: CheckCircle,
      count: counts.completed,
      color: 'text-emerald-600',
    },
    {
      id: 'high' as FilterType,
      label: 'High Priority',
      icon: AlertCircle,
      count: counts.high,
      color: 'text-rose-600',
    },
  ];

  const handleSelect = (id: FilterType) => {
    onSelectFilter(id);
    onCloseMobile();
  };

  const content = (
    <aside className="w-full flex flex-col justify-between h-full">
      <div className="space-y-6">
        {/* Quick Add Button */}
        <div>
          <button
            type="button"
            onClick={() => {
              onCloseMobile();
              onOpenAddTaskModal();
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-pink-600 hover:bg-pink-700 active:bg-pink-800 text-white font-semibold shadow-md shadow-pink-500/25 transition-all duration-200 transform hover:-trangray-y-0.5 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
          >
            <Plus className="w-5 h-5 stroke-[2.5]" />
            <span>Add New Task</span>
          </button>
        </div>

        {/* Navigation Categories */}
        <div className="space-y-1">
          <p className="px-3 text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
            Views
          </p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeFilter === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-pink-50 text-pink-700 font-semibold shadow-xs'
                    : 'text-gray-600 hover:bg-gray-100/80 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-5 h-5 transition-colors ${
                      isActive ? 'text-pink-600' : 'text-gray-400 group-hover:text-gray-600'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                {/* Badge Count */}
                <span
                  className={`text-xs px-2.5 py-0.5 rounded-full font-semibold transition-colors ${
                    isActive
                      ? 'bg-pink-200/70 text-pink-800'
                      : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {item.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Pro tip / Quote card at bottom */}
      <div className="mt-8 p-4 rounded-2xl bg-gradient-to-br from-gray-50 to-pink-50/50 border border-gray-200/70">
        <div className="flex items-start gap-3">
          <div className="p-1.5 rounded-lg bg-pink-100 text-pink-700 shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-gray-800">Pro Tip</h4>
            <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
              Tackle high-priority tasks in the morning to maintain daily momentum!
            </p>
          </div>
        </div>
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <div className="hidden lg:block w-64 shrink-0 pr-6 py-6 border-r border-gray-200/80 min-h-[calc(100vh-5rem)]">
        {content}
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpenMobile && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-gray-900/40 backdrop-blur-xs transition-opacity animate-in fade-in"
            onClick={onCloseMobile}
          />

          {/* Drawer Slide-in Panel */}
          <div className="relative z-10 w-72 max-w-[85vw] bg-white h-full p-6 shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-left duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
              <span className="text-base font-bold text-gray-900">TaskFlow Navigation</span>
              <button
                type="button"
                onClick={onCloseMobile}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              >
                ✕
              </button>
            </div>
            {content}
          </div>
        </div>
      )}
    </>
  );
};
