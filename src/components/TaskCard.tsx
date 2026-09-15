'use client';

import React from 'react';
import { Task, Priority } from '@/types/task';
import { formatDateKey } from '@/lib/sampleTasks';
import { 
  Calendar, 
  Check, 
  Pencil, 
  Trash2, 
  AlertCircle 
} from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

const priorityStyles: Record<
  Priority,
  { badge: string; dot: string; label: string }
> = {
  High: {
    badge: 'bg-rose-50 text-rose-700 border-rose-200/80',
    dot: 'bg-rose-500',
    label: 'High',
  },
  Medium: {
    badge: 'bg-amber-50 text-amber-700 border-amber-200/80',
    dot: 'bg-amber-500',
    label: 'Medium',
  },
  Low: {
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    dot: 'bg-emerald-500',
    label: 'Low',
  },
};

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onToggle,
  onEdit,
  onDelete,
}) => {
  const todayKey = formatDateKey(new Date());
  const isToday = task.dueDate === todayKey;
  const isOverdue = !task.completed && task.dueDate < todayKey;

  const formatDueDate = (dateStr: string) => {
    if (!dateStr) return 'No due date';
    if (dateStr === todayKey) return 'Today';

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (dateStr === formatDateKey(tomorrow)) return 'Tomorrow';

    try {
      const [y, m, d] = dateStr.split('-').map(Number);
      const dateObj = new Date(y, m - 1, d);
      return dateObj.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  const priorityStyle = priorityStyles[task.priority] || priorityStyles.Medium;

  return (
    <div
      className={`group relative flex flex-col justify-between p-4 sm:p-5 rounded-2xl bg-white border transition-all duration-200 shadow-2xs hover:shadow-md ${
        task.completed
          ? 'border-gray-200/60 bg-gray-50/50 opacity-80'
          : 'border-gray-200/90 hover:border-pink-300'
      }`}
    >
      <div className="flex items-start gap-3.5">
        {/* Checkbox */}
        <button
          type="button"
          role="checkbox"
          aria-checked={task.completed}
          onClick={() => onToggle(task.id)}
          className={`mt-1 shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-500/40 ${
            task.completed
              ? 'bg-pink-600 border-pink-600 text-white shadow-xs scale-95'
              : 'border-gray-300 hover:border-pink-500 bg-white'
          }`}
          title={task.completed ? 'Mark as incomplete' : 'Mark as completed'}
        >
          {task.completed && <Check className="w-4 h-4 stroke-[3]" />}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0 pr-1">
          {/* Title with line-through on completed */}
          <h3
            className={`text-base font-semibold leading-snug break-words transition-all duration-200 ${
              task.completed
                ? 'line-through text-gray-400 decoration-gray-400 decoration-2'
                : 'text-gray-800 group-hover:text-pink-950'
            }`}
          >
            {task.title}
          </h3>

          {/* Description */}
          {task.description && (
            <p
              className={`text-sm mt-1.5 leading-relaxed break-words line-clamp-2 transition-all duration-200 ${
                task.completed ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              {task.description}
            </p>
          )}

          {/* Badges: Priority + Due Date */}
          <div className="flex flex-wrap items-center gap-2 mt-3.5 pt-1">
            {/* Priority Badge */}
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${priorityStyle.badge}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${priorityStyle.dot}`} />
              <span>{priorityStyle.label} Priority</span>
            </span>

            {/* Due Date Badge */}
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                isOverdue
                  ? 'bg-rose-50 text-rose-700 border-rose-200 font-semibold'
                  : isToday
                  ? 'bg-pink-50 text-pink-700 border-pink-200/80 font-medium'
                  : 'bg-gray-50 text-gray-600 border-gray-200/70'
              }`}
            >
              {isOverdue ? (
                <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
              ) : (
                <Calendar className="w-3.5 h-3.5 text-gray-400" />
              )}
              <span>
                {isOverdue ? 'Overdue: ' : 'Due: '}
                {formatDueDate(task.dueDate)}
              </span>
            </span>
          </div>
        </div>

        {/* Action Buttons: Edit & Delete */}
        <div className="flex items-center gap-1 shrink-0 opacity-80 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-150">
          <button
            type="button"
            onClick={() => onEdit(task)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-pink-600 hover:bg-pink-50 transition-colors"
            title="Edit task"
            aria-label="Edit task"
          >
            <Pencil className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => onDelete(task)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
            title="Delete task"
            aria-label="Delete task"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
