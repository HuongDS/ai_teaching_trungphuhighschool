'use client';

import React, { useState, useEffect } from 'react';
import { LESSONS, Lesson } from '@/data/curriculum';
import { useTheme } from '@/context/ThemeContext';

interface ClassroomHeaderProps {
  currentLesson: Lesson;
  onSelectLesson: (id: number) => void;
  showTeacherNotes: boolean;
  onToggleTeacherNotes: () => void;
  onOpenPromptModal: () => void;
  onOpenRoadmapModal: () => void;
}

export default function ClassroomHeader({
  currentLesson,
  onSelectLesson,
  showTeacherNotes,
  onToggleTeacherNotes,
  onOpenPromptModal,
  onOpenRoadmapModal
}: ClassroomHeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const [secondsLeft, setSecondsLeft] = useState(45 * 60);
  const [timerRunning, setTimerRunning] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      setTimerRunning(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerRunning, secondsLeft]);

  useEffect(() => {
    setSecondsLeft(45 * 60);
    setTimerRunning(false);
  }, [currentLesson.id]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const isLowTime = secondsLeft <= 5 * 60 && secondsLeft > 0;

  return (
    <header className="sticky top-0 z-40 bg-[var(--header-bg)] backdrop-blur-md border-b border-[var(--border-main)] px-4 sm:px-8 py-3 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Branding & Lesson Switcher */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-3 py-1.5 rounded-md bg-[var(--surface-card)] hover:bg-[var(--surface-hover)] border border-[var(--border-main)] font-mono text-xs font-bold uppercase tracking-[0.12em] text-[var(--accent-bioluminescent)] transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
            title="Xem Bản đồ 3D THPT Trung Phú & Giới thiệu"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
            <span>THPT Trung Phú 3D</span>
          </button>

          <button
            onClick={onOpenRoadmapModal}
            className="px-3.5 py-1.5 rounded-md bg-aurora-gradient font-mono text-xs font-bold uppercase tracking-[0.16em] transition-all shadow-xs hover:opacity-90 cursor-pointer"
            title="Mở toàn bộ lộ trình 12 tiết học"
          >
            Lộ Trình 12 Tiết
          </button>

          <div className="flex items-center gap-1 bg-[var(--surface-elevated)] p-1 rounded-md border border-[var(--border-main)]">
            <button
              onClick={() => onSelectLesson(Math.max(1, currentLesson.id - 1))}
              disabled={currentLesson.id <= 1}
              className="px-2 py-0.5 font-mono text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-card)] rounded disabled:opacity-30 transition-all cursor-pointer"
              title="Tiết trước"
            >
              ←
            </button>

            {/* Quick dropdown select */}
            <select
              value={currentLesson.id}
              onChange={(e) => onSelectLesson(Number(e.target.value))}
              className="bg-transparent font-mono text-xs sm:text-sm font-bold text-[var(--text-primary)] py-1 px-2 border-none outline-none cursor-pointer max-w-[170px] sm:max-w-[270px] truncate"
            >
              {LESSONS.map((l) => (
                <option key={l.id} value={l.id} className="bg-[var(--surface-card)] text-[var(--text-primary)] font-mono text-xs">
                  Tiết {l.id}: {l.shortTitle}
                </option>
              ))}
            </select>

            <button
              onClick={() => onSelectLesson(Math.min(LESSONS.length, currentLesson.id + 1))}
              disabled={currentLesson.id >= LESSONS.length}
              className="px-2 py-0.5 font-mono text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-card)] rounded disabled:opacity-30 transition-all cursor-pointer"
              title="Tiết sau"
            >
              →
            </button>
          </div>
        </div>

        {/* Right: Master 45-Min Timer & Teacher Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Master 45-Min Timer */}
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md border font-mono transition-all ${
              isLowTime
                ? 'bg-rose-500/15 border-rose-500 text-rose-500 animate-pulse'
                : 'bg-[var(--surface-card)] border-[var(--border-main)] text-[var(--text-primary)] shadow-xs'
            }`}
          >
            <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
              Timer:
            </span>
            <span className="font-extrabold text-sm sm:text-base tracking-wider">
              {formatTime(secondsLeft)}
            </span>
            <button
              onClick={() => setTimerRunning(!timerRunning)}
              className="px-1.5 py-0.5 rounded text-xs font-mono font-bold uppercase bg-[var(--surface-elevated)] hover:bg-[var(--surface-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
              title={timerRunning ? 'Tạm dừng 45p' : 'Bắt đầu 45p'}
            >
              {timerRunning ? 'Dừng' : 'Chạy'}
            </button>
            <button
              onClick={() => {
                setTimerRunning(false);
                setSecondsLeft(45 * 60);
              }}
              className="px-1 py-0.5 text-[11px] font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
              title="Đặt lại 45 phút"
            >
              Reset
            </button>
          </div>

          {/* Teacher Secret Notes Toggle */}
          <button
            onClick={onToggleTeacherNotes}
            className={`px-3 py-1.5 rounded-md text-xs font-mono font-bold uppercase tracking-[0.12em] border transition-all cursor-pointer ${
              showTeacherNotes
                ? 'bg-[var(--accent-bioluminescent)]/20 text-[var(--text-primary)] border-[var(--accent-bioluminescent)] ring-1 ring-[var(--accent-bioluminescent)]'
                : 'bg-[var(--surface-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border-[var(--border-main)]'
            }`}
            title="Bật/Tắt Ghi chú Sư phạm Giảng viên"
          >
            {showTeacherNotes ? 'Đóng Ghi Chú' : 'Ghi Chú GV'}
          </button>

          {/* Pocket Prompts Modal Button */}
          <button
            onClick={onOpenPromptModal}
            className="px-3 py-1.5 rounded-md bg-[var(--surface-elevated)] hover:bg-[var(--surface-hover)] text-[var(--text-primary)] border border-[var(--border-main)] text-xs font-mono font-bold uppercase tracking-[0.12em] transition-all cursor-pointer shadow-xs"
            title="Sổ tay Prompt bỏ túi"
          >
            Sổ Tay Prompt
          </button>

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            className="px-2.5 py-1.5 rounded-md bg-[var(--surface-elevated)] text-[var(--text-primary)] border border-[var(--border-main)] hover:bg-[var(--surface-hover)] font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
            title={theme === 'light' ? 'Chuyển sang chế độ Dark' : 'Chuyển sang chế độ Light'}
          >
            {theme === 'light' ? 'Dark' : 'Light'}
          </button>

          {/* Fullscreen TV Mode */}
          <button
            onClick={toggleFullscreen}
            className="px-2.5 py-1.5 rounded-md bg-[var(--surface-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-main)] hover:bg-[var(--surface-hover)] font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
            title="Chiếu Toàn Màn Hình TV (F11)"
          >
            {isFullscreen ? 'Thu nhỏ' : 'Toàn màn hình'}
          </button>
        </div>
      </div>
    </header>
  );
}
