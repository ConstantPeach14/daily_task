'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle2, Menu, X, Bell } from 'lucide-react';

interface HeaderProps {
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar, isSidebarOpen }) => {
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    // Dynamic formatted date
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    setFormattedDate(now.toLocaleDateString('en-US', options));
  }, []);

  return (
    <header className="sticky top-0 z-30 w-full bg-white/95 backdrop-blur border-b border-gray-200/80 transition-all duration-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Left: Mobile Menu + Logo & Brand */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Mobile Sidebar Toggle */}
            <button
              type="button"
              onClick={onToggleSidebar}
              className="lg:hidden p-2 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500"
              aria-label="Toggle Navigation Menu"
            >
              {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Logo Icon */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-pink-600 to-blue-500 flex items-center justify-center shadow-md shadow-pink-500/20 text-white transition-transform hover:scale-105">
                <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
              </div>

              {/* Title & Tagline */}
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
                    Task<span className="text-pink-600">Flow</span>
                  </span>
                  <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-pink-50 text-pink-700 border border-pink-100">
                    v1.0
                  </span>
                </div>
                <p className="text-xs text-gray-500 hidden sm:block font-medium">
                  Organize your day. Get things done.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Date, Notifications, Profile Avatar */}
          <div className="flex items-center gap-3 sm:gap-6">
            {/* Current Date Display */}
            <div className="text-right hidden md:block">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 block">
                Today
              </span>
              <span className="text-sm font-medium text-gray-700">
                {formattedDate || 'Loading date...'}
              </span>
            </div>

            {/* Subtle Divider */}
            <div className="hidden md:block h-7 w-px bg-gray-200" />

            {/* Action icons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="p-2 rounded-xl text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors relative"
                aria-label="Notifications"
                title="No new alerts"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-pink-600 ring-2 ring-white"></span>
              </button>

              {/* User Avatar */}
              <div className="flex items-center gap-3 pl-1">
                <div className="relative">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold text-sm shadow-sm ring-2 ring-gray-100">
                    JD
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                </div>
                <div className="hidden lg:block text-left leading-tight">
                  <span className="text-sm font-semibold text-gray-800 block">John Doe</span>
                  <span className="text-xs text-gray-500">Pro Workspace</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
