'use client';

import React, { useState, useEffect } from 'react';
import { useTasks } from '@/hooks/useTasks';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { StatsSection } from '@/components/StatsSection';
import { TaskList } from '@/components/TaskList';
import { TaskModal } from '@/components/TaskModal';
import { DeleteConfirmModal } from '@/components/DeleteConfirmModal';
import { Footer } from '@/components/Footer';
import { Task, TaskFormData } from '@/types/task';
import { Plus, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';

export default function DashboardPage() {
  const {
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
  } = useTasks();

  // Navigation & UI State
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deletingTask, setDeletingTask] = useState<Task | null>(null);
  const [greeting, setGreeting] = useState('Good afternoon 👋');

  // Compute greeting dynamically based on local time
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting('Good morning 👋');
    } else if (hour < 18) {
      setGreeting('Good afternoon 👋');
    } else {
      setGreeting('Good evening 👋');
    }
  }, []);

  // Modal Handlers
  const handleOpenCreateModal = () => {
    setEditingTask(null);
    setIsTaskModalOpen(true);
  };

  const handleOpenEditModal = (task: Task) => {
    setEditingTask(task);
    setIsTaskModalOpen(true);
  };

  const handleSaveTask = (formData: TaskFormData) => {
    if (editingTask) {
      editTask(editingTask.id, formData);
    } else {
      addTask(formData);
    }
  };

  const handleDeletePrompt = (task: Task) => {
    setDeletingTask(task);
  };

  const handleConfirmDelete = () => {
    if (deletingTask) {
      deleteTask(deletingTask.id);
      setDeletingTask(null);
    }
  };

  // Completion percentage
  const completionPercentage =
    stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-3 border-pink-600 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-medium text-gray-500">Loading TaskFlow...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f9fafb] text-gray-800 antialiased selection:bg-pink-500 selection:text-white">
      {/* Top Navigation */}
      <Header
        onToggleSidebar={() => setIsMobileSidebarOpen((prev) => !prev)}
        isSidebarOpen={isMobileSidebarOpen}
      />

      {/* Main Layout Body */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <Sidebar
            activeFilter={activeFilter}
            onSelectFilter={setActiveFilter}
            counts={counts}
            isOpenMobile={isMobileSidebarOpen}
            onCloseMobile={() => setIsMobileSidebarOpen(false)}
            onOpenAddTaskModal={handleOpenCreateModal}
          />

          {/* Main Dashboard Content Area */}
          <main className="flex-1 min-w-0 space-y-8">
            {/* Welcome Section */}
            <section className="relative overflow-hidden rounded-3xl bg-white border border-gray-200/80 p-6 sm:p-8 shadow-xs">
              {/* Subtle background glow */}
              <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 rounded-full bg-gradient-to-br from-pink-100/60 via-pink-50/40 to-transparent blur-2xl pointer-events-none" />

              <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-pink-50 text-pink-700 border border-pink-100 mb-3">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Daily Workspace</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight">
                    {greeting}
                  </h1>
                  <p className="text-gray-500 text-sm sm:text-base font-medium mt-1">
                    Let's get your tasks done.
                  </p>

                  {/* Dynamic Progress indicator */}
                  <div className="mt-5 flex items-center gap-3 max-w-md">
                    <div className="flex-1 bg-gray-100 rounded-full h-2.5 overflow-hidden border border-gray-200/60">
                      <div
                        className="bg-gradient-to-r from-pink-500 to-blue-600 h-full rounded-full transition-all duration-500"
                        style={{ width: `${completionPercentage}%` }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-gray-600 shrink-0">
                      {completionPercentage}% complete
                    </span>
                  </div>
                </div>

                {/* Main '+ Add Task' button */}
                <div className="shrink-0">
                  <button
                    type="button"
                    onClick={handleOpenCreateModal}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-pink-600 hover:bg-pink-700 active:bg-pink-800 text-white font-semibold text-sm shadow-md shadow-pink-500/25 transition-all duration-150 transform hover:-trangray-y-0.5 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                  >
                    <Plus className="w-5 h-5 stroke-[2.5]" />
                    <span>+ Add Task</span>
                  </button>
                </div>
              </div>
            </section>

            {/* Statistics Section (4 cards) */}
            <section aria-labelledby="statistics-heading">
              <h2 id="statistics-heading" className="sr-only">
                Statistics Overview
              </h2>
              <StatsSection stats={stats} />
            </section>

            {/* Task List Section */}
            <TaskList
              tasks={filteredTasks}
              allTasksCount={tasks.length}
              activeFilter={activeFilter}
              onSelectFilter={setActiveFilter}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              counts={counts}
              onToggleTask={toggleTask}
              onEditTask={handleOpenEditModal}
              onDeleteTask={handleDeletePrompt}
              onOpenAddTask={handleOpenCreateModal}
            />
          </main>
        </div>
      </div>

      {/* Task Creation / Edit Modal */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onSubmit={handleSaveTask}
        editingTask={editingTask}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={!!deletingTask}
        task={deletingTask}
        onClose={() => setDeletingTask(null)}
        onConfirm={handleConfirmDelete}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
