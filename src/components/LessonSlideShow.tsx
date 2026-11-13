'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Lesson, Stage, LESSONS } from '@/data/curriculum';
import InteractiveToolHost from './InteractiveToolHost';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Clock,
  Sparkles,
  Cpu,
  CheckCircle2,
  Copy,
  Check,
  Presentation,
  Layers,
  Terminal,
} from 'lucide-react';

interface LessonSlideShowProps {
  lesson: Lesson;
  onBackToCurriculum: () => void;
  onSelectLesson: (lessonId: number) => void;
}

type SlideData =
  | {
      type: 'cover';
      id: string;
      tabLabel: string;
    }
  | {
      type: 'stage';
      id: string;
      tabLabel: string;
      stage: Stage;
      stageIndex: number;
    }
  | {
      type: 'lab';
      id: string;
      tabLabel: string;
    }
  | {
      type: 'prompts';
      id: string;
      tabLabel: string;
    };

export default function LessonSlideShow({
  lesson,
  onBackToCurriculum,
  onSelectLesson,
}: LessonSlideShowProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [copiedPromptIndex, setCopiedPromptIndex] = useState<number | null>(null);

  // Build the slide deck for the current lesson
  const slides: SlideData[] = useMemo(() => {
    const list: SlideData[] = [
      {
        type: 'cover',
        id: 'cover',
        tabLabel: '01. Mở đầu & Mục tiêu',
      },
    ];

    lesson.stages.forEach((stage, idx) => {
      list.push({
        type: 'stage',
        id: `stage-${stage.id}`,
        tabLabel: `${String(idx + 2).padStart(2, '0')}. Chặng ${idx + 1} (${stage.durationMinutes}p)`,
        stage,
        stageIndex: idx,
      });
    });

    list.push({
      type: 'lab',
      id: 'interactive-lab',
      tabLabel: `${String(list.length + 1).padStart(2, '0')}. Phòng Lab Tương Tác`,
    });

    if (lesson.prompts && lesson.prompts.length > 0) {
      list.push({
        type: 'prompts',
        id: 'sample-prompts',
        tabLabel: `${String(list.length + 1).padStart(2, '0')}. Mẫu Prompt Thực Chiến`,
      });
    }

    return list;
  }, [lesson]);

  // Reset slide index when lesson changes
  useEffect(() => {
    setCurrentSlideIndex(0);
  }, [lesson.id]);

  // Keyboard navigation (Left / Right arrows for slides, Esc to return to list)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }
      if (e.key === 'ArrowRight') {
        setCurrentSlideIndex((prev) => Math.min(slides.length - 1, prev + 1));
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlideIndex((prev) => Math.max(0, prev - 1));
      } else if (e.key === 'Escape') {
        onBackToCurriculum();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [slides.length, onBackToCurriculum]);

  const currentSlide = slides[currentSlideIndex] || slides[0];
  const progressPercent = ((currentSlideIndex + 1) / slides.length) * 100;

  const copyPrompt = (idx: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPromptIndex(idx);
    setTimeout(() => setCopiedPromptIndex(null), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Top Bar: Back to Lesson List + Slide Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[var(--surface-card)] p-3 sm:p-4 rounded-2xl border border-[var(--border-main)] shadow-2xs">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToCurriculum}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[var(--surface-elevated)] hover:bg-[var(--surface-hover)] text-[var(--text-primary)] border border-[var(--border-main)] text-xs sm:text-sm font-semibold transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Danh sách bài học</span>
          </button>

          <div className="hidden sm:flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-lg bg-[var(--accent-bioluminescent)] text-white font-mono text-xs font-bold">
              TIẾT {lesson.id}/12
            </span>
            <span className="text-sm font-bold text-[var(--text-primary)] truncate max-w-[260px] md:max-w-[400px]">
              {lesson.title}
            </span>
          </div>
        </div>

        {/* Slide Counter & Prev/Next Slide Controls */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-[var(--text-muted)] px-2">
            SLIDE {currentSlideIndex + 1} / {slides.length}
          </span>

          <button
            onClick={() => setCurrentSlideIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentSlideIndex === 0}
            className="flex items-center gap-1 px-3 py-2 rounded-xl bg-[var(--surface-elevated)] hover:bg-[var(--surface-hover)] text-[var(--text-primary)] border border-[var(--border-main)] disabled:opacity-30 disabled:pointer-events-none text-xs font-semibold transition-all cursor-pointer"
            title="Slide trước (Phím ←)"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Trước</span>
          </button>

          <button
            onClick={() => setCurrentSlideIndex((prev) => Math.min(slides.length - 1, prev + 1))}
            disabled={currentSlideIndex === slides.length - 1}
            className="flex items-center gap-1 px-3.5 py-2 rounded-xl bg-[var(--btn-solid-bg)] hover:bg-[var(--btn-solid-hover)] text-[var(--btn-solid-text)] disabled:opacity-30 disabled:pointer-events-none text-xs font-semibold transition-all cursor-pointer shadow-2xs"
            title="Slide tiếp theo (Phím →)"
          >
            <span className="hidden sm:inline">Tiếp theo</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Carousel Slide Selector Strip */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {slides.map((s, idx) => {
          const isActive = idx === currentSlideIndex;
          return (
            <button
              key={s.id}
              onClick={() => setCurrentSlideIndex(idx)}
              className={`px-3.5 py-2 rounded-xl font-mono text-xs font-bold whitespace-nowrap transition-all cursor-pointer shrink-0 border ${
                isActive
                  ? 'bg-[var(--accent-bioluminescent)] text-white border-[var(--accent-bioluminescent)] shadow-sm scale-[1.02]'
                  : 'bg-[var(--surface-card)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] border-[var(--border-main)]'
              }`}
            >
              {s.tabLabel}
            </button>
          );
        })}
      </div>

      {/* MAIN SLIDE DECK VIEWPORT (CAROUSEL CANVAS) */}
      <div className="relative rounded-3xl bg-[var(--surface-card)] border-2 border-[var(--border-main)] shadow-2xl overflow-hidden min-h-[560px] sm:min-h-[620px] flex flex-col justify-between transition-all">
        {/* Top Progress Bar */}
        <div className="w-full h-1.5 bg-[var(--surface-elevated)]">
          <div
            className="h-full bg-gradient-to-r from-teal-500 via-emerald-400 to-cyan-500 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Slide Content Area */}
        <div className="flex-1 p-6 sm:p-10 lg:p-12 flex flex-col justify-center">
          {/* SLIDE TYPE 1: COVER SLIDE */}
          {currentSlide.type === 'cover' && (
            <div className="max-w-5xl mx-auto w-full space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--accent-bioluminescent)]/15 text-[var(--accent-bioluminescent)] border border-[var(--accent-bioluminescent)]/30 font-mono text-xs font-bold uppercase tracking-widest">
                  <Presentation className="w-4 h-4" />
                  BÀI GIẢNG TRÌNH CHIẾU // TIẾT {lesson.id} / 12 (45 PHÚT)
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[var(--text-primary)] tracking-tight leading-tight">
                  {lesson.title}
                </h1>

                <p className="text-lg sm:text-2xl text-[var(--text-secondary)] leading-relaxed max-w-4xl">
                  {lesson.subtitle}
                </p>
              </div>

              {/* Core Objective Highlight Box */}
              <div className="p-6 rounded-2xl bg-[var(--surface-elevated)] border-l-4 border-l-[var(--accent-bioluminescent)] border border-[var(--border-main)]">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent-bioluminescent)] flex items-center gap-1.5 mb-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  MỤC TIÊU CỐT LÕI CỦA TIẾT HỌC
                </div>
                <p className="text-base sm:text-xl font-bold text-[var(--text-primary)] leading-relaxed">
                  {lesson.coreObjective}
                </p>
              </div>

              {/* Interactive Agenda Grid (Click any stage to jump to that slide) */}
              <div>
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-muted)] mb-3">
                  CẤU TRÚC SLIDE TRONG TIẾT HỌC (NHẤN ĐỂ CHUYỂN NHANH):
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {lesson.stages.map((st, idx) => (
                    <button
                      key={st.id}
                      onClick={() => setCurrentSlideIndex(idx + 1)}
                      className="text-left p-4 rounded-2xl bg-[var(--surface-elevated)]/60 hover:bg-[var(--surface-elevated)] border border-[var(--border-main)] hover:border-[var(--accent-bioluminescent)] transition-all cursor-pointer group"
                    >
                      <div className="flex items-center justify-between text-xs font-mono text-[var(--accent-bioluminescent)] font-bold mb-1">
                        <span>CHẶNG 0{idx + 1}</span>
                        <span>{st.durationMinutes} PHÚT</span>
                      </div>
                      <div className="font-bold text-sm text-[var(--text-primary)] group-hover:text-[var(--accent-bioluminescent)] transition-colors line-clamp-2">
                        {st.title}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SLIDE TYPE 2: STAGE CONTENT SLIDE */}
          {currentSlide.type === 'stage' && (
            <div className="max-w-5xl mx-auto w-full space-y-6">
              {/* Stage Header */}
              <div className="border-b border-[var(--border-main)] pb-5">
                <div className="flex flex-wrap items-center gap-2.5 mb-2">
                  <span className="px-3 py-1 rounded-lg text-xs font-mono font-extrabold bg-[var(--accent-bioluminescent)] text-white uppercase tracking-wider">
                    CHẶNG {currentSlide.stageIndex + 1} / {lesson.stages.length}
                  </span>
                  <span className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-[var(--surface-elevated)] text-[var(--text-secondary)] border border-[var(--border-subtle)] flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {currentSlide.stage.timeRange} ({currentSlide.stage.durationMinutes} phút)
                  </span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-black text-[var(--text-primary)] tracking-tight mt-2">
                  {currentSlide.stage.title}
                </h2>
                <p className="text-sm sm:text-base text-[var(--text-secondary)] mt-1.5">
                  <strong className="text-[var(--accent-bioluminescent)] font-mono uppercase text-xs mr-2">
                     Trọng tâm:
                  </strong>
                  {currentSlide.stage.purpose}
                </p>
              </div>

              {/* Stage Content Cards Grid */}
              <div className="grid grid-cols-1 gap-5">
                {currentSlide.stage.contentBlocks.map((block, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-[var(--surface-elevated)]/60 border border-[var(--border-main)] space-y-3"
                  >
                    {block.heading && (
                      <h3 className="text-lg sm:text-2xl font-bold text-[var(--text-primary)] flex items-center gap-2.5">
                        <span className="w-2 h-6 rounded-full bg-[var(--accent-bioluminescent)] shrink-0" />
                        {block.heading}
                      </h3>
                    )}

                    {block.description && (
                      <p className="text-base sm:text-xl text-[var(--text-secondary)] leading-relaxed">
                        {block.description}
                      </p>
                    )}

                    {block.bulletPoints && block.bulletPoints.length > 0 && (
                      <ul className="space-y-2.5 pt-1">
                        {block.bulletPoints.map((point, pIdx) => (
                          <li
                            key={pIdx}
                            className="flex items-start gap-3 text-base sm:text-xl text-[var(--text-primary)] leading-relaxed font-medium"
                          >
                            <span className="w-2 h-2 rounded-full bg-[var(--accent-bioluminescent)] shrink-0 mt-2.5" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {block.callout && (
                      <div
                        className={`mt-3 p-4 rounded-xl border text-sm sm:text-lg leading-relaxed ${
                          block.callout.type === 'tip'
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-[var(--text-primary)]'
                            : block.callout.type === 'warning'
                            ? 'bg-rose-500/10 border-rose-500/30 text-[var(--text-primary)]'
                            : 'bg-[var(--surface-card)] border-[var(--border-main)] text-[var(--text-primary)] italic'
                        }`}
                      >
                        <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent-bioluminescent)] block mb-1">
                          Điểm nhấn bài học
                        </span>
                        <span className="font-medium">{block.callout.text}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SLIDE TYPE 3: INTERACTIVE LAB SLIDE */}
          {currentSlide.type === 'lab' && (
            <div className="max-w-5xl mx-auto w-full space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border-main)] pb-4">
                <div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent-bioluminescent)]">
                    <Cpu className="w-4 h-4" />
                    HOẠT ĐỘNG TƯƠNG TÁC TRỰC TIẾP TRÊN LỚP
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] mt-1">
                    Phòng Thực Hành Tương Tác — Tiết {lesson.id}
                  </h2>
                </div>
              </div>

              <InteractiveToolHost lesson={lesson} />
            </div>
          )}

          {/* SLIDE TYPE 4: SAMPLE PROMPTS SLIDE */}
          {currentSlide.type === 'prompts' && (
            <div className="max-w-5xl mx-auto w-full space-y-6">
              <div className="border-b border-[var(--border-main)] pb-4">
                <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent-bioluminescent)]">
                  <Terminal className="w-4 h-4" />
                  THƯ VIỆN CÂU LỆNH MẪU TRONG TIẾT HỌC
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] mt-1">
                  Mẫu Prompt Thực Chiến — Tiết {lesson.id}
                </h2>
                <p className="text-sm sm:text-base text-[var(--text-secondary)] mt-1">
                  Sao chép nhanh câu lệnh mẫu bên dưới để thực hành trực tiếp cùng học sinh trên ChatGPT hoặc Google Gemini.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {lesson.prompts.map((p, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border-main)] space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-base sm:text-lg text-[var(--text-primary)]">
                          {p.title}
                        </span>
                        <span className="text-[11px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-md bg-[var(--accent-bioluminescent)]/15 text-[var(--accent-bioluminescent)]">
                          {p.category}
                        </span>
                      </div>

                      <button
                        onClick={() => copyPrompt(idx, p.prompt)}
                        className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[var(--btn-solid-bg)] hover:bg-[var(--btn-solid-hover)] text-[var(--btn-solid-text)] text-xs font-mono font-bold transition-all cursor-pointer"
                      >
                        {copiedPromptIndex === idx ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Đã sao chép</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Sao chép Prompt</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="p-4 rounded-xl bg-[var(--surface-card)] border border-[var(--border-subtle)] font-mono text-sm sm:text-base text-[var(--text-primary)] whitespace-pre-line leading-relaxed">
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

        {/* Slide Deck Bottom Footer Navigation Bar */}
        <div className="px-6 py-4 bg-[var(--surface-elevated)]/60 border-t border-[var(--border-main)] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {slides.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setCurrentSlideIndex(idx)}
                title={s.tabLabel}
                aria-label={s.tabLabel}
                className={`h-2.5 rounded-full transition-all cursor-pointer ${
                  idx === currentSlideIndex
                    ? 'w-8 bg-[var(--accent-bioluminescent)]'
                    : 'w-2.5 bg-[var(--border-main)] hover:bg-[var(--text-muted)]'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentSlideIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentSlideIndex === 0}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--surface-card)] hover:bg-[var(--surface-hover)] text-[var(--text-primary)] border border-[var(--border-main)] disabled:opacity-30 disabled:pointer-events-none text-xs sm:text-sm font-bold transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Slide trước</span>
            </button>

            {currentSlideIndex < slides.length - 1 ? (
              <button
                onClick={() => setCurrentSlideIndex((prev) => Math.min(slides.length - 1, prev + 1))}
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer"
              >
                <span>Slide tiếp theo</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              lesson.id < LESSONS.length && (
                <button
                  onClick={() => onSelectLesson(lesson.id + 1)}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-aurora-gradient text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer"
                >
                  <span>Sang Tiết {lesson.id + 1}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
