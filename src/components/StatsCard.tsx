'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  label: string;
  value: number;
  icon: LucideIcon;
  colorScheme: 'gray' | 'emerald' | 'amber' | 'rose';
  subtitle?: string;
}

const colorStyles = {
  gray: {
    bgLight: 'bg-gray-50',
    iconBg: 'bg-gray-100',
    iconColor: 'text-gray-700',
    borderColor: 'border-gray-200/80',
    textColor: 'text-gray-900',
    subColor: 'text-gray-500',
  },
  emerald: {
    bgLight: 'bg-emerald-50/40',
    iconBg: 'bg-emerald-100/70',
    iconColor: 'text-emerald-700',
    borderColor: 'border-emerald-200/60',
    textColor: 'text-emerald-950',
    subColor: 'text-emerald-600',
  },
  amber: {
    bgLight: 'bg-amber-50/40',
    iconBg: 'bg-amber-100/70',
    iconColor: 'text-amber-700',
    borderColor: 'border-amber-200/60',
    textColor: 'text-amber-950',
    subColor: 'text-amber-600',
  },
  rose: {
    bgLight: 'bg-rose-50/40',
    iconBg: 'bg-rose-100/70',
    iconColor: 'text-rose-700',
    borderColor: 'border-rose-200/60',
    textColor: 'text-rose-950',
    subColor: 'text-rose-600',
  },
};

export const StatsCard: React.FC<StatsCardProps> = ({
  label,
  value,
  icon: Icon,
  colorScheme,
  subtitle,
}) => {
  const styles = colorStyles[colorScheme];

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border ${styles.borderColor} ${styles.bgLight} bg-white p-5 shadow-xs hover:shadow-md transition-all duration-200 group`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
            {label}
          </p>
          <div className="flex items-baseline gap-2">
            <span
              className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${styles.textColor} transition-all`}
            >
              {value}
            </span>
          </div>
          {subtitle && (
            <p className={`text-xs mt-1.5 font-medium ${styles.subColor}`}>
              {subtitle}
            </p>
          )}
        </div>

        <div
          className={`w-12 h-12 rounded-xl ${styles.iconBg} ${styles.iconColor} flex items-center justify-center transition-transform duration-200 group-hover:scale-110 shadow-xs`}
        >
          <Icon className="w-6 h-6 stroke-[2.2]" />
        </div>
      </div>
    </div>
  );
};
