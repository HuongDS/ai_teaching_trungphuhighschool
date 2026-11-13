'use client';

import React, { useState, useEffect } from 'react';
import { LESSONS, Lesson } from '@/data/curriculum';
import { useTheme } from '@/context/ThemeContext';
import {
  Compass,
  LayoutGrid,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Sparkles,
  Sun,
  Moon,
  Maximize2,
  Minimize2,
  BookOpen,
  ArrowRight,
} from 'lucide-react';

export type AppViewMode = 'landing' | 'curriculum' | 'presentation';

interface ClassroomHeaderProps {
  viewMode: AppViewMode;
  onChangeViewMode: (mode: AppViewMode) => void;
  currentLesson: Lesson;
  onSelectLesson: (id: number) => void;
  onOpenPromptModal: () => void;
}

export default function ClassroomHeader({
  viewMode,
  onChangeViewMode,
  currentLesson,
  onSelectLesson,
  onOpenPromptModal,
}: ClassroomHeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[var(--header-bg)] backdrop-blur-xl border-b border-[var(--border-main)] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-3">
        {/* Left: Brand & 3D Home Navigation */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => {
              onChangeViewMode('landing');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`group flex items-center gap-2.5 pl-2.5 pr-3.5 py-1.5 rounded-xl border transition-all shadow-2xs cursor-pointer ${
              viewMode === 'landing'
                ? 'bg-[var(--surface-card)] border-[var(--accent-bioluminescent)]'
                : 'bg-[var(--surface-card)] hover:bg-[var(--surface-hover)] border-[var(--border-main)] hover:border-[var(--accent-bioluminescent)]'
            }`}
            title="Về Trang chủ Bản đồ 3D THPT Trung Phú"
          >
            <div className="relative flex items-center justify-center w-7 h-7 rounded-lg bg-[var(--surface-elevated)] text-[var(--accent-bioluminescent)] group-hover:scale-105 transition-transform">
              <Compass className="w-4 h-4" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-[var(--surface-card)]" />
            </div>
            <div className="text-left">
              <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] leading-none">
                Không gian 3D
              </div>
              <div className="text-xs sm:text-sm font-bold text-[var(--text-primary)] tracking-tight leading-tight mt-0.5">
                THPT Trung Phú
              </div>
            </div>
          </button>
        </div>

        {/* Center: Dynamic Mode Navigation */}
        <div className="flex items-center justify-center">
          {viewMode === 'landing' && (
            <button
              onClick={() => {
                onChangeViewMode('curriculum');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-500 hover:from-teal-500 hover:to-emerald-500 text-white text-xs sm:text-sm font-bold shadow-md shadow-teal-900/25 transition-all hover:scale-105 cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>Đi vào bài học</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          )}

          {viewMode === 'curriculum' && (
            <div className="flex items-center gap-2 bg-[var(--surface-card)] px-3 py-1.5 rounded-xl border border-[var(--border-main)] shadow-2xs">
              <LayoutGrid className="w-4 h-4 text-[var(--accent-bioluminescent)]" />
              <span className="text-xs sm:text-sm font-bold text-[var(--text-primary)]">
                Danh mục 12 Tiết Học AI
              </span>
            </div>
          )}

          {viewMode === 'presentation' && (
            <div className="flex items-center bg-[var(--surface-card)] p-1 rounded-xl border border-[var(--border-main)] shadow-2xs max-w-full overflow-hidden">
              {/* Back to 12-Lesson List Button */}
              <button
                onClick={() => {
                  onChangeViewMode('curriculum');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-aurora-gradient text-xs font-semibold tracking-wide transition-all hover:opacity-95 cursor-pointer shrink-0 shadow-2xs"
                title="Quay về màn hình danh sách 12 tiết học"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Danh sách 12 tiết</span>
                <span className="md:hidden">12 Tiết</span>
              </button>

              <div className="w-[1px] h-5 bg-[var(--border-main)] mx-1.5 shrink-0" />

              {/* Prev Lesson Button */}
              <button
                onClick={() => onSelectLesson(Math.max(1, currentLesson.id - 1))}
                disabled={currentLesson.id <= 1}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-elevated)] disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer shrink-0"
                title="Tiết học trước"
                aria-label="Tiết học trước"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Lesson Dropdown Select */}
              <div className="relative flex items-center min-w-[150px] sm:min-w-[240px] md:min-w-[290px]">
                <select
                  value={currentLesson.id}
                  onChange={(e) => onSelectLesson(Number(e.target.value))}
                  aria-label="Chọn tiết học"
                  className="w-full appearance-none bg-transparent text-xs sm:text-sm font-bold text-[var(--text-primary)] py-1.5 pl-2.5 pr-7 rounded-lg hover:bg-[var(--surface-elevated)] transition-colors border-none outline-none cursor-pointer truncate"
                >
                  {LESSONS.map((l) => (
                    <option
                      key={l.id}
                      value={l.id}
                      className="bg-[var(--surface-card)] text-[var(--text-primary)] font-sans text-sm py-1"
                    >
                      {l.shortTitle}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-[var(--text-muted)] pointer-events-none absolute right-2" />
              </div>

              {/* Next Lesson Button */}
              <button
                onClick={() => onSelectLesson(Math.min(LESSONS.length, currentLesson.id + 1))}
                disabled={currentLesson.id >= LESSONS.length}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-elevated)] disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer shrink-0"
                title="Tiết học tiếp theo"
                aria-label="Tiết học tiếp theo"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Right: Prompt Handbook & Icon Utilities */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Pocket Prompts Modal Button */}
          <button
            onClick={onOpenPromptModal}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[var(--surface-card)] hover:bg-[var(--surface-hover)] text-[var(--text-primary)] border border-[var(--border-main)] hover:border-[var(--accent-bioluminescent)] text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-2xs"
            title="Mở Sổ tay Prompt mẫu"
          >
            <Sparkles className="w-4 h-4 text-[var(--accent-bioluminescent)]" />
            <span className="hidden sm:inline">Sổ tay Prompt</span>
          </button>

          <div className="w-[1px] h-5 bg-[var(--border-main)] mx-0.5 hidden sm:block" />

          {/* Theme Switcher Icon Button */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-[var(--surface-card)] hover:bg-[var(--surface-hover)] text-[var(--text-secondary)] hover:text-[var(--accent-bioluminescent)] border border-[var(--border-main)] transition-all cursor-pointer shadow-2xs"
            title={theme === 'light' ? 'Chuyển sang giao diện Tối (Dark Mode)' : 'Chuyển sang giao diện Sáng (Light Mode)'}
            aria-label="Đổi giao diện Sáng/Tối"
          >
            {theme === 'light' ? (
              <Moon className="w-4 h-4 transition-transform hover:-rotate-12" />
            ) : (
              <Sun className="w-4 h-4 text-amber-300 transition-transform hover:rotate-45" />
            )}
          </button>

          {/* Fullscreen TV Mode Icon Button */}
          <button
            onClick={toggleFullscreen}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-[var(--surface-card)] hover:bg-[var(--surface-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-main)] transition-all cursor-pointer shadow-2xs"
            title={isFullscreen ? 'Thoát toàn màn hình (Esc)' : 'Toàn màn hình TV (F11)'}
            aria-label="Chế độ toàn màn hình"
          >
            {isFullscreen ? (
              <Minimize2 className="w-4 h-4" />
            ) : (
              <Maximize2 className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
