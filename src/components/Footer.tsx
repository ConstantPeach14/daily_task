'use client';

import React from 'react';
import { Heart, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 py-8 border-t border-gray-200/80 bg-white/50 text-gray-500 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-medium">
          <span>&copy; 2026 TaskFlow. Stay productive.</span>
        </div>

        <div className="flex items-center gap-4 text-gray-400">
          <span className="flex items-center gap-1.5 hover:text-gray-600 transition-colors">
            <Sparkles className="w-3.5 h-3.5 text-pink-500" />
            <span>Designed for focus & speed</span>
          </span>
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <span className="flex items-center gap-1">
            Built with React & Next.js
          </span>
        </div>
      </div>
    </footer>
  );
};
