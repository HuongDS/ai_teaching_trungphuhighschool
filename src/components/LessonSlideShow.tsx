'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Lesson, Stage, LESSONS } from '@/data/curriculum';
import InteractiveToolHost from './InteractiveToolHost';
import { useTheme } from '@/context/ThemeContext';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Clock,
  Cpu,
  CheckCircle2,
  Copy,
  Check,
  Presentation,
  Terminal,
  Sun,
  Moon,
  Maximize2,
  Minimize2,
  Sparkles,
  Layers,
} from 'lucide-react';

interface LessonSlideShowProps {
  lesson: Lesson;
  onBackToCurriculum: () => void;
  onSelectLesson: (lessonId: number) => void;
}

type ContentBlockItem = Stage['contentBlocks'][number];

type SlideData =
  | {
      type: 'title';
      id: string;
      shortLabel: string;
    }
  | {
      type: 'objective';
      id: string;
      shortLabel: string;
    }
  | {
      type: 'stage-block';
      id: string;
      shortLabel: string;
      stage: Stage;
      stageIndex: number;
      block: ContentBlockItem;
      blockIndex: number;
      totalBlocksInStage: number;
    }
  | {
      type: 'lab';
      id: string;
      shortLabel: string;
    }
  | {
      type: 'prompts';
      id: string;
      shortLabel: string;
    };

export default function LessonSlideShow({
  lesson,
  onBackToCurriculum,
  onSelectLesson,
}: LessonSlideShowProps) {
  const { theme, toggleTheme } = useTheme();
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [copiedPromptIndex, setCopiedPromptIndex] = useState<number | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Build granular, focused slides for 3D transitions
  // Slide 1: Title Only
  // Slide 2: Core Objective & 45-min Agenda Overview
  // Slide 3..N: Each contentBlock of each Stage gets its own clean slide
  // Slide N+1: Interactive Lab
  // Slide N+2: Sample Prompts
  const slides: SlideData[] = useMemo(() => {
    const list: SlideData[] = [
      {
        type: 'title',
        id: 'slide-title',
        shortLabel: 'Tựa đề',
      },
      {
        type: 'objective',
        id: 'slide-objective',
        shortLabel: 'Mục tiêu & Lộ trình',
      },
    ];

    lesson.stages.forEach((stage, sIdx) => {
      stage.contentBlocks.forEach((block, bIdx) => {
        list.push({
          type: 'stage-block',
          id: `stage-${stage.id}-block-${bIdx}`,
          shortLabel:
            stage.contentBlocks.length > 1
              ? `Chặng ${sIdx + 1}.${bIdx + 1}`
              : `Chặng ${sIdx + 1}`,
          stage,
          stageIndex: sIdx,
          block,
          blockIndex: bIdx,
          totalBlocksInStage: stage.contentBlocks.length,
        });
      });
    });

    list.push({
      type: 'lab',
      id: 'slide-lab',
      shortLabel: 'Thực hành Lab',
    });

    if (lesson.prompts && lesson.prompts.length > 0) {
      list.push({
        type: 'prompts',
        id: 'slide-prompts',
        shortLabel: 'Prompt mẫu',
      });
    }

    return list;
  }, [lesson]);

  // Reset slide index when lesson changes
  useEffect(() => {
    setCurrentSlideIndex(0);
  }, [lesson.id]);

  // Sync fullscreen status
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    handleFsChange();
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }, []);

  const handleExitPresentation = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
    onBackToCurriculum();
  }, [onBackToCurriculum]);

  const goNextSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => Math.min(slides.length - 1, prev + 1));
  }, [slides.length]);

  const goPrevSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => Math.max(0, prev - 1));
  }, []);

  // Keyboard navigation (ArrowRight / Space = Next, ArrowLeft = Prev)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON'].includes((e.target as HTMLElement)?.tagName)) {
        if (e.key === 'ArrowRight') goNextSlide();
        if (e.key === 'ArrowLeft') goPrevSlide();
        return;
      }
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        goNextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        goPrevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goNextSlide, goPrevSlide]);

  const copyPrompt = (idx: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPromptIndex(idx);
    setTimeout(() => setCopiedPromptIndex(null), 2000);
  };

  // Find index of first slide of a given stage for quick jumping from Agenda
  const jumpToStage = (stageIndex: number) => {
    const targetIdx = slides.findIndex(
      (s) => s.type === 'stage-block' && s.stageIndex === stageIndex && s.blockIndex === 0
    );
    if (targetIdx !== -1) {
      setCurrentSlideIndex(targetIdx);
    }
  };

  const progressPercent = ((currentSlideIndex + 1) / slides.length) * 100;

  return (
    <div className="fixed inset-0 z-50 w-screen h-screen bg-[var(--bg-canvas)] text-[var(--text-primary)] flex flex-col justify-between overflow-hidden select-none">
      {/* Ambient 3D Background Glow & Perspective Grid */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] rounded-full bg-[var(--accent-bioluminescent)]/10 blur-[120px]" />
        <div className="absolute -bottom-32 right-1/4 w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[120px]" />
      </div>

      {/* TOP FULLSCREEN HUD BAR */}
      <header className="relative z-20 px-4 sm:px-8 h-16 bg-[var(--header-bg)] backdrop-blur-xl border-b border-[var(--border-main)] flex items-center justify-between gap-4 shrink-0">
        {/* Left: Exit Presentation + Lesson Title */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={handleExitPresentation}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[var(--surface-card)] hover:bg-[var(--surface-hover)] text-[var(--text-primary)] border border-[var(--border-main)] hover:border-[var(--accent-bioluminescent)] text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0 shadow-2xs"
            title="Thoát chế độ trình chiếu về danh sách bài học"
          >
            <ArrowLeft className="w-4 h-4 text-[var(--accent-bioluminescent)]" />
            <span>Thoát trình chiếu</span>
          </button>

          <div className="hidden md:flex items-center gap-2.5 min-w-0">
            <span className="px-2.5 py-1 rounded-lg bg-[var(--accent-bioluminescent)] text-white font-mono text-xs font-bold shrink-0">
              TIẾT {lesson.id} / 12
            </span>
            <span className="text-sm font-bold text-[var(--text-primary)] truncate">
              {lesson.shortTitle}
            </span>
          </div>
        </div>

        {/* Center: Slide Stepper Pills */}
        <div className="hidden lg:flex items-center gap-1.5 bg-[var(--surface-card)] p-1 rounded-xl border border-[var(--border-main)] max-w-xl overflow-x-auto no-scrollbar">
          {slides.map((s, idx) => {
            const active = idx === currentSlideIndex;
            return (
              <button
                key={s.id}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`px-2.5 py-1 rounded-lg font-mono text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                  active
                    ? 'bg-[var(--accent-bioluminescent)] text-white shadow-2xs'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-elevated)]'
                }`}
              >
                {idx + 1}. {s.shortLabel}
              </button>
            );
          })}
        </div>

        {/* Right: Slide Counter & Display Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="px-3 py-1.5 rounded-xl bg-[var(--surface-card)] border border-[var(--border-main)] font-mono text-xs font-extrabold text-[var(--text-primary)]">
            Slide {currentSlideIndex + 1} / {slides.length}
          </span>

          <button
            onClick={toggleTheme}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-[var(--surface-card)] hover:bg-[var(--surface-hover)] text-[var(--text-secondary)] hover:text-[var(--accent-bioluminescent)] border border-[var(--border-main)] transition-all cursor-pointer"
            title={theme === 'light' ? 'Chuyển sang chế độ Tối' : 'Chuyển sang chế độ Sáng'}
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-300" />}
          </button>

          <button
            onClick={toggleFullscreen}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-[var(--surface-card)] hover:bg-[var(--surface-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-main)] transition-all cursor-pointer"
            title={isFullscreen ? 'Thu nhỏ màn hình' : 'Phóng toàn màn hình'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Top Progress Bar */}
      <div className="relative z-20 w-full h-1 bg-[var(--surface-elevated)] shrink-0">
        <div
          className="h-full bg-gradient-to-r from-teal-500 via-emerald-400 to-cyan-500 transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* CENTER: 3D PERSPECTIVE SLIDE STAGE */}
      <div
        className="relative z-10 flex-1 w-full flex items-center justify-center px-4 sm:px-12 py-6 overflow-hidden"
        style={{ perspective: '1600px' }}
      >
        <div
          className="relative w-full max-w-6xl h-full flex items-center justify-center"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {slides.map((slide, idx) => {
            const offset = idx - currentSlideIndex;
            const isActive = offset === 0;
            const isPrev = offset === -1;
            const isNext = offset === 1;
            const isVisible = Math.abs(offset) <= 1;

            if (!isVisible) return null;

            // Compute 3D transformation based on slide offset
            let transform3D = 'translate3d(0px, 0px, 0px) rotateY(0deg) rotateX(0deg) scale(1)';
            let opacity = 1;
            let zIndex = 20;

            if (isPrev) {
              transform3D = 'translate3d(-72%, 0px, -420px) rotateY(38deg) scale(0.84)';
              opacity = 0;
              zIndex = 10;
            } else if (isNext) {
              transform3D = 'translate3d(72%, 0px, -420px) rotateY(-38deg) scale(0.84)';
              opacity = 0;
              zIndex = 10;
            }

            return (
              <div
                key={slide.id}
                style={{
                  transform: transform3D,
                  opacity,
                  zIndex,
                  transition:
                    'transform 0.75s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.55s cubic-bezier(0.22, 1, 0.36, 1)',
                  backfaceVisibility: 'hidden',
                }}
                className={`absolute inset-0 w-full h-full rounded-3xl bg-[var(--surface-card)] border-2 border-[var(--border-main)] shadow-2xl p-6 sm:p-12 lg:p-16 flex flex-col justify-center overflow-y-auto select-text ${
                  isActive ? 'pointer-events-auto' : 'pointer-events-none'
                }`}
              >
                {/* 1. HERO TITLE SLIDE */}
                {slide.type === 'title' && (
                  <div className="max-w-4xl mx-auto text-center space-y-8 my-auto">
                    <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-[var(--accent-bioluminescent)]/15 text-[var(--accent-bioluminescent)] border border-[var(--accent-bioluminescent)]/30 font-mono text-xs sm:text-sm font-extrabold uppercase tracking-[0.2em]">
                      <Presentation className="w-4 h-4" />
                      <span>CHUYÊN ĐỀ AI THỰC CHIẾN THPT // TIẾT {lesson.id} / 12</span>
                    </div>

                    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-[var(--text-primary)] tracking-tight leading-[1.12]">
                      {lesson.title}
                    </h1>

                    <p className="text-xl sm:text-2xl lg:text-3xl text-[var(--text-secondary)] font-normal leading-relaxed max-w-3xl mx-auto">
                      {lesson.subtitle}
                    </p>

                    <div className="pt-6 flex items-center justify-center gap-4">
                      <button
                        onClick={goNextSlide}
                        className="group inline-flex items-center gap-3 px-7 py-4 rounded-2xl bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-500 hover:from-teal-500 hover:to-emerald-500 text-white font-mono text-sm sm:text-base font-bold shadow-xl shadow-teal-900/30 transition-all hover:scale-105 cursor-pointer"
                      >
                        <span>Bắt đầu bài học (Mục tiêu cốt lõi)</span>
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                )}

                {/* 2. CORE OBJECTIVE & 45-MINUTE ROADMAP SLIDE */}
                {slide.type === 'objective' && (
                  <div className="max-w-5xl mx-auto w-full space-y-8 my-auto">
                    <div className="space-y-2">
                      <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-lg bg-[var(--accent-bioluminescent)]/15 text-[var(--accent-bioluminescent)] font-mono text-xs font-extrabold uppercase tracking-widest">
                        <CheckCircle2 className="w-4 h-4" />
                        ĐỊNH HƯỚNG TRỌNG TÂM TIẾT {lesson.id}
                      </span>
                      <h2 className="text-3xl sm:text-5xl font-black text-[var(--text-primary)] tracking-tight">
                        Mục Tiêu Cốt Lõi & Lộ Trình 45 Phút
                      </h2>
                    </div>

                    {/* Core Objective Hero Card */}
                    <div className="p-6 sm:p-8 rounded-3xl bg-[var(--surface-elevated)] border-l-8 border-l-[var(--accent-bioluminescent)] border border-[var(--border-main)] shadow-sm">
                      <div className="text-xs font-mono font-bold uppercase tracking-widest text-[var(--accent-bioluminescent)] mb-2">
                        SAU TIẾT HỌC NÀY, HỌC SINH SẼ LÀM ĐƯỢC GÌ?
                      </div>
                      <p className="text-xl sm:text-3xl font-extrabold text-[var(--text-primary)] leading-snug">
                        {lesson.coreObjective}
                      </p>
                    </div>

                    {/* 4 Stages Overview Cards */}
                    <div>
                      <div className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-muted)] mb-3 flex items-center gap-2">
                        <Layers className="w-4 h-4 text-[var(--accent-bioluminescent)]" />
                        <span>CẤU TRÚC 4 CHẶNG TRONG TIẾT HỌC (NHẤN VÀO CHẶNG ĐỂ NHẢY TỚI):</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {lesson.stages.map((st, sIdx) => (
                          <button
                            key={st.id}
                            onClick={() => jumpToStage(sIdx)}
                            className="group text-left p-5 rounded-2xl bg-[var(--surface-elevated)]/70 hover:bg-[var(--surface-elevated)] border border-[var(--border-main)] hover:border-[var(--accent-bioluminescent)] transition-all cursor-pointer flex flex-col justify-between"
                          >
                            <div>
                              <div className="flex items-center justify-between text-xs font-mono font-bold text-[var(--accent-bioluminescent)] mb-2">
                                <span>CHẶNG 0{sIdx + 1}</span>
                                <span className="px-2 py-0.5 rounded bg-[var(--surface-card)] text-[var(--text-secondary)]">
                                  {st.durationMinutes}p
                                </span>
                              </div>
                              <h3 className="font-bold text-base sm:text-lg text-[var(--text-primary)] group-hover:text-[var(--accent-bioluminescent)] transition-colors leading-snug">
                                {st.title}
                              </h3>
                            </div>
                            <div className="mt-4 pt-2 border-t border-dashed border-[var(--border-subtle)] text-[11px] font-mono text-[var(--text-muted)]">
                              {st.timeRange} →
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. INDIVIDUAL STAGE CONTENT BLOCK SLIDE */}
                {slide.type === 'stage-block' && (
                  <div className="max-w-5xl mx-auto w-full space-y-6 my-auto">
                    {/* Stage Top Meta Header */}
                    <div className="border-b border-[var(--border-main)] pb-5">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 rounded-lg text-xs font-mono font-extrabold bg-[var(--accent-bioluminescent)] text-white uppercase tracking-wider">
                            CHẶNG {slide.stageIndex + 1} / {lesson.stages.length}
                          </span>
                          <span className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-[var(--surface-elevated)] text-[var(--text-secondary)] border border-[var(--border-subtle)] flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            {slide.stage.timeRange} ({slide.stage.durationMinutes} phút)
                          </span>
                        </div>

                        {slide.totalBlocksInStage > 1 && (
                          <span className="text-xs font-mono font-bold text-[var(--accent-bioluminescent)] bg-[var(--surface-elevated)] px-3 py-1 rounded-lg border border-[var(--border-subtle)]">
                            Phần {slide.blockIndex + 1} / {slide.totalBlocksInStage}
                          </span>
                        )}
                      </div>

                      <h2 className="text-2xl sm:text-4xl font-black text-[var(--text-primary)] tracking-tight">
                        {slide.stage.title}
                      </h2>
                      <p className="text-sm sm:text-base text-[var(--text-secondary)] mt-1">
                        {slide.stage.purpose}
                      </p>
                    </div>

                    {/* Focused Content Block */}
                    <div className="p-6 sm:p-10 rounded-3xl bg-[var(--surface-elevated)]/60 border border-[var(--border-main)] space-y-5 shadow-xs">
                      {slide.block.heading && (
                        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--text-primary)] flex items-center gap-3 leading-tight">
                          <span className="w-2.5 h-8 rounded-full bg-[var(--accent-bioluminescent)] shrink-0" />
                          <span>{slide.block.heading}</span>
                        </h3>
                      )}

                      {slide.block.description && (
                        <p className="text-lg sm:text-2xl text-[var(--text-secondary)] leading-relaxed font-normal">
                          {slide.block.description}
                        </p>
                      )}

                      {slide.block.bulletPoints && slide.block.bulletPoints.length > 0 && (
                        <ul className="space-y-4 pt-2">
                          {slide.block.bulletPoints.map((point, pIdx) => (
                            <li
                              key={pIdx}
                              className="flex items-start gap-4 text-lg sm:text-2xl text-[var(--text-primary)] leading-relaxed font-semibold"
                            >
                              <span className="w-3 h-3 rounded-full bg-[var(--accent-bioluminescent)] shrink-0 mt-3" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {slide.block.callout && (
                        <div
                          className={`mt-6 p-5 sm:p-6 rounded-2xl border text-base sm:text-xl leading-relaxed ${
                            slide.block.callout.type === 'tip'
                              ? 'bg-emerald-500/10 border-emerald-500/30 text-[var(--text-primary)]'
                              : slide.block.callout.type === 'warning'
                              ? 'bg-rose-500/10 border-rose-500/30 text-[var(--text-primary)]'
                              : 'bg-[var(--surface-card)] border-[var(--border-main)] text-[var(--text-primary)] italic'
                          }`}
                        >
                          <div className="font-mono text-xs font-extrabold uppercase tracking-widest text-[var(--accent-bioluminescent)] mb-1 flex items-center gap-1.5">
                            <Sparkles className="w-4 h-4" />
                            <span>Điểm nhấn ghi nhớ</span>
                          </div>
                          <div className="font-bold">{slide.block.callout.text}</div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* 4. INTERACTIVE LAB SLIDE */}
                {slide.type === 'lab' && (
                  <div className="max-w-5xl mx-auto w-full space-y-5 my-auto">
                    <div className="border-b border-[var(--border-main)] pb-4 flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent-bioluminescent)]">
                          <Cpu className="w-4 h-4" />
                          PHÒNG THÍ NGHIỆM TƯƠNG TÁC TRỰC TIẾP
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] mt-0.5">
                          Thực Hành Mô Phỏng — Tiết {lesson.id}
                        </h2>
                      </div>
                    </div>

                    <InteractiveToolHost lesson={lesson} />
                  </div>
                )}

                {/* 5. SAMPLE PROMPTS SLIDE */}
                {slide.type === 'prompts' && (
                  <div className="max-w-5xl mx-auto w-full space-y-6 my-auto">
                    <div className="border-b border-[var(--border-main)] pb-4">
                      <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent-bioluminescent)]">
                        <Terminal className="w-4 h-4" />
                        THƯ VIỆN CÂU LỆNH MẪU TRONG TIẾT HỌC
                      </span>
                      <h2 className="text-2xl sm:text-4xl font-black text-[var(--text-primary)] mt-1">
                        Mẫu Prompt Thực Chiến — Tiết {lesson.id}
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      {lesson.prompts.map((p, idx) => (
                        <div
                          key={idx}
                          className="p-5 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border-main)] space-y-3"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-base sm:text-xl text-[var(--text-primary)]">
                                {p.title}
                              </span>
                              <span className="text-xs font-mono font-bold uppercase px-2.5 py-0.5 rounded-md bg-[var(--accent-bioluminescent)]/15 text-[var(--accent-bioluminescent)]">
                                {p.category}
                              </span>
                            </div>

                            <button
                              onClick={() => copyPrompt(idx, p.prompt)}
                              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--btn-solid-bg)] hover:bg-[var(--btn-solid-hover)] text-[var(--btn-solid-text)] text-xs font-mono font-bold transition-all cursor-pointer"
                            >
                              {copiedPromptIndex === idx ? (
                                <>
                                  <Check className="w-4 h-4 text-emerald-400" />
                                  <span>Đã sao chép</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-4 h-4" />
                                  <span>Sao chép Prompt</span>
                                </>
                              )}
                            </button>
                          </div>

                          <div className="p-4 rounded-xl bg-[var(--surface-card)] border border-[var(--border-subtle)] font-mono text-sm sm:text-lg text-[var(--text-primary)] whitespace-pre-line leading-relaxed">
                            {p.prompt}
                          </div>

                          {p.explanation && (
                            <p className="text-xs sm:text-sm text-[var(--text-muted)] font-mono">
                              💡 {p.explanation}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* BOTTOM SLIDE NAVIGATION CONTROL BAR */}
      <footer className="relative z-20 px-4 sm:px-8 h-16 bg-[var(--header-bg)] backdrop-blur-xl border-t border-[var(--border-main)] flex items-center justify-between gap-4 shrink-0">
        {/* Progress Dots */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-[45%]">
          {slides.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrentSlideIndex(idx)}
              title={`${idx + 1}. ${s.shortLabel}`}
              className={`h-2.5 rounded-full transition-all cursor-pointer shrink-0 ${
                idx === currentSlideIndex
                  ? 'w-8 bg-[var(--accent-bioluminescent)]'
                  : 'w-2.5 bg-[var(--border-main)] hover:bg-[var(--text-muted)]'
              }`}
            />
          ))}
        </div>

        {/* Prev / Next 3D Slide Triggers */}
        <div className="flex items-center gap-3">
          <button
            onClick={goPrevSlide}
            disabled={currentSlideIndex === 0}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--surface-card)] hover:bg-[var(--surface-hover)] text-[var(--text-primary)] border border-[var(--border-main)] disabled:opacity-30 disabled:pointer-events-none text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-2xs"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Slide trước</span>
          </button>

          {currentSlideIndex < slides.length - 1 ? (
            <button
              onClick={goNextSlide}
              className="group flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-500 hover:from-teal-500 hover:to-emerald-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-teal-950/25 transition-all hover:scale-105 cursor-pointer"
            >
              <span>Tiếp theo (Next)</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          ) : (
            lesson.id < LESSONS.length && (
              <button
                onClick={() => onSelectLesson(lesson.id + 1)}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-aurora-gradient text-xs sm:text-sm font-bold shadow-lg transition-all hover:scale-105 cursor-pointer"
              >
                <span>Sang Tiết {lesson.id + 1}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )
          )}
        </div>
      </footer>
    </div>
  );
}
