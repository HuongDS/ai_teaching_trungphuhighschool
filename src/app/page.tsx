'use client';

import React, { useState } from 'react';
import { LESSONS } from '@/data/curriculum';
import ClassroomHeader, { AppViewMode } from '@/components/ClassroomHeader';
import PocketPromptModal from '@/components/PocketPromptModal';
import LandingExperience from '@/components/landing/LandingExperience';
import LessonCurriculumScreen from '@/components/LessonCurriculumScreen';
import LessonSlideShow from '@/components/LessonSlideShow';

export default function Home() {
  const [viewMode, setViewMode] = useState<AppViewMode>('landing');
  const [currentLessonId, setCurrentLessonId] = useState<number>(1);
  const [isPromptModalOpen, setIsPromptModalOpen] = useState<boolean>(false);

  const currentLesson = LESSONS.find((l) => l.id === currentLessonId) || LESSONS[0];

  const handleSwitchView = (mode: AppViewMode) => {
    setViewMode(mode);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectLesson = (id: number) => {
    setCurrentLessonId(id);
    setViewMode('presentation');
    if (typeof document !== 'undefined' && !document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-canvas)] text-[var(--text-primary)] transition-colors">
      {/* Top Navigation & Taskbar */}
      <ClassroomHeader
        viewMode={viewMode}
        onChangeViewMode={handleSwitchView}
        currentLesson={currentLesson}
        onSelectLesson={handleSelectLesson}
        onOpenPromptModal={() => setIsPromptModalOpen(true)}
      />

      {/* Main Content Container based on active Screen */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-6">
        {/* SCREEN 1: 3D LANDING PAGE ONLY (No lessons mixed in) */}
        {viewMode === 'landing' && (
          <LandingExperience onEnterClassroom={() => handleSwitchView('curriculum')} />
        )}

        {/* SCREEN 2: 12-LESSON CURRICULUM HUB */}
        {viewMode === 'curriculum' && (
          <LessonCurriculumScreen
            onStartPresentation={(lessonId) => handleSelectLesson(lessonId)}
            onBackToLanding={() => handleSwitchView('landing')}
          />
        )}

        {/* SCREEN 3: IN-WEB SLIDE DECK / CAROUSEL PRESENTATION */}
        {viewMode === 'presentation' && (
          <LessonSlideShow
            lesson={currentLesson}
            onBackToCurriculum={() => handleSwitchView('curriculum')}
            onSelectLesson={(lessonId) => handleSelectLesson(lessonId)}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 bg-[var(--surface-card)] border-t border-[var(--border-main)] py-8 px-4 text-center text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <p className="font-bold text-[var(--text-primary)]">TRƯỜNG THPT TRUNG PHÚ — CỦ CHI, TP. HỒ CHÍ MINH</p>
            <p className="mt-1 text-[var(--text-secondary)] normal-case">
              Thầy Nguyễn Trung Nguyên (Giáo viên Sinh học) — Hướng dẫn học sinh ứng dụng AI vào học tập
            </p>
          </div>
          <div className="text-right">
            <p className="font-semibold text-[var(--accent-bioluminescent)]">
              WEBSITE ĐƯỢC THIẾT KẾ VÀ PHÁT TRIỂN 100% BẰNG AI
            </p>
            <p className="mt-1 text-[var(--text-muted)]">AUROS & ORYZO DESIGN SYSTEM // TV 55&quot;+ READY</p>
          </div>
        </div>
      </footer>

      {/* Prompt Handbook Modal */}
      <PocketPromptModal
        isOpen={isPromptModalOpen}
        onClose={() => setIsPromptModalOpen(false)}
      />
    </div>
  );
}
