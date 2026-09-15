'use client';

import React from 'react';
import { StatsCard } from './StatsCard';
import { CheckCircle2, Clock, AlertTriangle, Layers } from 'lucide-react';
import { TaskStats } from '@/types/task';

interface StatsSectionProps {
  stats: TaskStats;
}

export const StatsSection: React.FC<StatsSectionProps> = ({ stats }) => {
  const completionRate =
    stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
      {/* Total Tasks */}
      <StatsCard
        label="Total Tasks"
        value={stats.total}
        icon={Layers}
        colorScheme="gray"
        subtitle="All recorded tasks"
      />

      {/* Completed */}
      <StatsCard
        label="Completed"
        value={stats.completed}
        icon={CheckCircle2}
        colorScheme="emerald"
        subtitle={`${completionRate}% overall progress`}
      />

      {/* Pending */}
      <StatsCard
        label="Pending"
        value={stats.pending}
        icon={Clock}
        colorScheme="amber"
        subtitle={stats.pending === 1 ? '1 task left' : `${stats.pending} tasks left`}
      />

      {/* High Priority */}
      <StatsCard
        label="High Priority"
        value={stats.highPriority}
        icon={AlertTriangle}
        colorScheme="rose"
        subtitle="Needs immediate focus"
      />
    </div>
  );
};
