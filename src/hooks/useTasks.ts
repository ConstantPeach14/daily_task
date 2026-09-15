'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { Task, TaskFormData, TaskStats, FilterType } from '@/types/task';
import { getInitialTasks, formatDateKey } from '@/lib/sampleTasks';
import confetti from 'canvas-confetti';

const STORAGE_KEY = 'taskflow_tasks_v1';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Hydrate from localStorage on client mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setTasks(parsed);
        } else {
          const initial = getInitialTasks();
          setTasks(initial);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
        }
      } else {
        const initial = getInitialTasks();
        setTasks(initial);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      }
    } catch (e) {
      console.error('Failed to load tasks from localStorage', e);
      setTasks(getInitialTasks());
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage whenever tasks change (after initial load)
  const persistTasks = useCallback((updatedTasks: Task[]) => {
    setTasks(updatedTasks);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks));
    } catch (e) {
      console.error('Failed to persist tasks to localStorage', e);
    }
  }, []);

  // Add Task
  const addTask = useCallback(
    (formData: TaskFormData) => {
      const newTask: Task = {
        id: 'task-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
        title: formData.title.trim(),
        description: formData.description?.trim() || '',
        priority: formData.priority,
        dueDate: formData.dueDate || formatDateKey(new Date()),
        completed: false,
        createdAt: formatDateKey(new Date()),
      };

      const updated = [newTask, ...tasks];
      persistTasks(updated);
      return newTask;
    },
    [tasks, persistTasks]
  );

  // Edit Task
  const editTask = useCallback(
    (id: string, formData: TaskFormData) => {
      const updated = tasks.map((t) =>
        t.id === id
          ? {
              ...t,
              title: formData.title.trim(),
              description: formData.description?.trim() || '',
              priority: formData.priority,
              dueDate: formData.dueDate,
            }
          : t
      );
      persistTasks(updated);
    },
    [tasks, persistTasks]
  );

  // Delete Task
  const deleteTask = useCallback(
    (id: string) => {
      const updated = tasks.filter((t) => t.id !== id);
      persistTasks(updated);
    },
    [tasks, persistTasks]
  );

  // Toggle Completion
  const toggleTask = useCallback(
    (id: string) => {
      let justCompleted = false;
      const updated = tasks.map((t) => {
        if (t.id === id) {
          const nextCompleted = !t.completed;
          if (nextCompleted) justCompleted = true;
          return { ...t, completed: nextCompleted };
        }
        return t;
      });

      persistTasks(updated);

      // Celebrate task completion with confetti
      if (justCompleted) {
        try {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.8 },
            colors: ['#3b82f6', '#10b981', '#6366f1', '#f59e0b'],
          });
        } catch {
          // ignore if canvas-confetti is not loaded
        }
      }
    },
    [tasks, persistTasks]
  );

  // Computed Statistics
  const stats: TaskStats = useMemo(() => {
    return {
      total: tasks.length,
      completed: tasks.filter((t) => t.completed).length,
      pending: tasks.filter((t) => !t.completed).length,
      highPriority: tasks.filter((t) => t.priority === 'High').length,
    };
  }, [tasks]);

  // Sidebar Counts
  const counts = useMemo(() => {
    const todayStr = formatDateKey(new Date());
    return {
      all: tasks.length,
      today: tasks.filter((t) => t.dueDate === todayStr).length,
      pending: tasks.filter((t) => !t.completed).length,
      completed: tasks.filter((t) => t.completed).length,
      high: tasks.filter((t) => t.priority === 'High').length,
    };
  }, [tasks]);

  // Filtered and Searched Tasks
  const filteredTasks = useMemo(() => {
    const todayStr = formatDateKey(new Date());
    const query = searchQuery.trim().toLowerCase();

    return tasks.filter((task) => {
      // Search filter
      if (query) {
        const matchesTitle = task.title.toLowerCase().includes(query);
        const matchesDesc = (task.description || '').toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc) return false;
      }

      // Category filter
      switch (activeFilter) {
        case 'today':
          return task.dueDate === todayStr;
        case 'pending':
          return !task.completed;
        case 'completed':
          return task.completed;
        case 'high':
          return task.priority === 'High';
        case 'all':
        default:
          return true;
      }
    });
  }, [tasks, activeFilter, searchQuery]);

  return {
    tasks,
    isLoaded,
    filteredTasks,
    activeFilter,
    setActiveFilter,
    searchQuery,
    setSearchQuery,
    stats,
    counts,
    addTask,
    editTask,
    deleteTask,
    toggleTask,
  };
}
