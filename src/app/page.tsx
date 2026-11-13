'use client';

import React, { useState, useEffect, useRef } from 'react';
import { LESSONS } from '@/data/curriculum';
import ClassroomHeader from '@/components/ClassroomHeader';
import StageTimeline from '@/components/StageTimeline';
import StageContent from '@/components/StageContent';
import PocketPromptModal from '@/components/PocketPromptModal';
import RoadmapModal from '@/components/RoadmapModal';
import LandingExperience from '@/components/landing/LandingExperience';
import { BookOpen } from 'lucide-react';

export default function Home() {
  const [currentLessonId, setCurrentLessonId] = useState<number>(1);
  const [currentStageIndex, setCurrentStageIndex] = useState<number>(0);
  const [isPromptModalOpen, setIsPromptModalOpen] = useState<boolean>(false);
  const [isRoadmapModalOpen, setIsRoadmapModalOpen] = useState<boolean>(false);

  const classroomSectionRef = useRef<HTMLDivElement>(null);

  const currentLesson = LESSONS.find((l) => l.id === currentLessonId) || LESSONS[0];
  const stages = currentLesson.stages;
  const currentStage = stages[currentStageIndex] || stages[0];

  const handleSelectLesson = (id: number) => {
    setCurrentLessonId(id);
    setCurrentStageIndex(0);
    if (classroomSectionRef.current) {
      classroomSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToClassroom = () => {
    if (classroomSectionRef.current) {
      classroomSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }
      if (e.key === 'ArrowRight') {
        if (currentStageIndex < stages.length - 1) {
          setCurrentStageIndex((prev) => prev + 1);
        } else if (currentLessonId < LESSONS.length) {
          handleSelectLesson(currentLessonId + 1);
        }
      } else if (e.key === 'ArrowLeft') {
        if (currentStageIndex > 0) {
          setCurrentStageIndex((prev) => prev - 1);
        } else if (currentLessonId > 1) {
          handleSelectLesson(currentLessonId - 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStageIndex, currentLessonId, stages.length]);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-canvas)] text-[var(--text-primary)] transition-colors">
      {/* Top Navigation & Classroom Controls */}
      <ClassroomHeader
        currentLesson={currentLesson}
        onSelectLesson={handleSelectLesson}
        onOpenPromptModal={() => setIsPromptModalOpen(true)}
        onOpenRoadmapModal={() => setIsRoadmapModalOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-6">
        {/* 1. TOP LANDING PAGE 3D EXPERIENCE */}
        <LandingExperience onEnterClassroom={scrollToClassroom} />

        {/* Divider & Jump anchor to Classroom Content */}
        <div
          ref={classroomSectionRef}
          id="classroom-content"
          className="scroll-mt-20 pt-10 pb-6 border-t-2 border-dashed border-[var(--border-main)] flex flex-wrap items-center justify-between gap-4"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface-elevated)] border border-[var(--border-subtle)] text-[var(--accent-bioluminescent)] text-xs font-mono font-bold uppercase tracking-wider mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              KHÔNG GIAN LỚP HỌC TRỰC TUYẾN 12 TIẾT
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)]">
              Chuyên Đề Ứng Dụng AI Thực Chiến — THPT Trung Phú
            </h2>
          </div>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-4 py-2 rounded-xl bg-[var(--surface-card)] hover:bg-[var(--surface-hover)] border border-[var(--border-main)] text-xs font-mono font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] shadow-xs transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>↑ Trở lại Bản Đồ 3D</span>
          </button>
        </div>

        {/* 2. CLASSROOM PROJECTION VIEW (12 LESSONS) */}
        {/* Lesson Hero Banner */}
        <div className="bg-[var(--surface-card)] rounded-2xl p-6 sm:p-10 border border-[var(--border-main)] shadow-xs mb-6 relative overflow-hidden transition-colors">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-md text-[11px] font-mono font-bold uppercase tracking-[0.18em] bg-[var(--surface-elevated)] text-[var(--accent-bioluminescent)] border border-[var(--border-subtle)]">
                AI THỰC CHIẾN THPT // 12 TIẾT
              </span>
              <span className="px-3 py-1 rounded-md text-[11px] font-mono font-bold uppercase tracking-[0.14em] bg-[var(--accent-bioluminescent)] text-white shadow-xs">
                TIẾT {currentLesson.id} / 12 (45 PHÚT)
              </span>
            </div>
            <div className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">
              [CHẾ ĐỘ TV // PHÍM ← → CHUYỂN CHẶNG]
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-primary)] leading-tight mt-2">
            {currentLesson.title}
          </h1>
          <p className="text-[var(--text-secondary)] text-base sm:text-xl font-normal mt-3 leading-relaxed max-w-4xl">
            {currentLesson.subtitle}
          </p>

          <div className="mt-5 pt-4 border-dashed-hairline flex flex-wrap items-center justify-between gap-4 text-sm sm:text-base">
            <div className="text-[var(--text-secondary)]">
              <span className="text-[var(--text-primary)] font-mono uppercase text-xs tracking-wider block font-bold mb-0.5">
                Mục tiêu cốt lõi:
              </span>
              <span>{currentLesson.coreObjective}</span>
            </div>
          </div>
        </div>

        {/* 45-Minute Timeline Stages */}
        <StageTimeline
          stages={stages}
          currentStageIndex={currentStageIndex}
          onSelectStage={(idx) => setCurrentStageIndex(idx)}
        />

        {/* Interactive Classroom Stage Content */}
        <StageContent
          lesson={currentLesson}
          currentStage={currentStage}
          stageIndex={currentStageIndex}
          totalStages={stages.length}
          onPrevStage={() => setCurrentStageIndex((prev) => Math.max(0, prev - 1))}
          onNextStage={() => setCurrentStageIndex((prev) => Math.min(stages.length - 1, prev + 1))}
        />

        {/* Bottom Lesson Navigation Bar */}
        <div className="mt-12 pt-6 border-dashed-hairline flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={() => handleSelectLesson(Math.max(1, currentLesson.id - 1))}
            disabled={currentLesson.id <= 1}
            className="px-5 py-2.5 rounded-lg bg-[var(--surface-card)] hover:bg-[var(--surface-hover)] border border-[var(--border-main)] text-[var(--text-primary)] font-mono text-xs sm:text-sm uppercase tracking-[0.14em] font-bold disabled:opacity-30 transition-all cursor-pointer shadow-xs"
          >
            ← Tiết Trước: Tiết {Math.max(1, currentLesson.id - 1)}
          </button>

          <button
            onClick={() => setIsRoadmapModalOpen(true)}
            className="px-4 py-2 rounded-lg bg-[var(--surface-elevated)] hover:bg-[var(--surface-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-main)] font-mono text-xs uppercase tracking-[0.12em] font-bold transition-all cursor-pointer"
          >
            [Ma Trận 12 Tiết]
          </button>

          <button
            onClick={() => handleSelectLesson(Math.min(LESSONS.length, currentLesson.id + 1))}
            disabled={currentLesson.id >= LESSONS.length}
            className="px-5 py-2.5 rounded-lg bg-[var(--btn-solid-bg)] hover:bg-[var(--btn-solid-hover)] text-[var(--btn-solid-text)] font-mono text-xs sm:text-sm uppercase tracking-[0.14em] font-bold disabled:opacity-30 transition-all cursor-pointer shadow-xs"
          >
            Tiết Kế Tiếp: Tiết {Math.min(LESSONS.length, currentLesson.id + 1)} →
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 bg-[var(--surface-card)] border-t border-[var(--border-main)] py-8 px-4 text-center text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <p className="font-bold text-[var(--text-primary)]">TRƯỜNG THPT TRUNG PHÚ — CỦ CHI, TP. HỒ CHÍ MINH</p>
            <p className="mt-1 text-[var(--text-secondary)] normal-case">
              Giáo viên giảng dạy: Thầy Nguyễn Trung Nguyên — Chuyên đề Trí tuệ Nhân tạo THPT
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

      {/* Modals */}
      <PocketPromptModal
        isOpen={isPromptModalOpen}
        onClose={() => setIsPromptModalOpen(false)}
      />

      <RoadmapModal
        isOpen={isRoadmapModalOpen}
        onClose={() => setIsRoadmapModalOpen(false)}
        currentLessonId={currentLesson.id}
        onSelectLesson={handleSelectLesson}
      />
    </div>
  );
}
