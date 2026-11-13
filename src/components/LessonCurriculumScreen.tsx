'use client';

import React, { useState } from 'react';
import { LESSONS, Lesson } from '@/data/curriculum';
import {
  Play,
  Clock,
  Layers,
  Sparkles,
  BookOpen,
  ArrowLeft,
  CheckCircle2,
  Cpu,
} from 'lucide-react';

interface LessonCurriculumScreenProps {
  onStartPresentation: (lessonId: number) => void;
  onBackToLanding: () => void;
}

type FilterGroup = 'all' | 'part1' | 'part2' | 'part3';

export default function LessonCurriculumScreen({
  onStartPresentation,
  onBackToLanding,
}: LessonCurriculumScreenProps) {
  const [activeFilter, setActiveFilter] = useState<FilterGroup>('all');

  const filteredLessons = LESSONS.filter((lesson) => {
    if (activeFilter === 'part1') return lesson.id >= 1 && lesson.id <= 5;
    if (activeFilter === 'part2') return lesson.id >= 6 && lesson.id <= 9;
    if (activeFilter === 'part3') return lesson.id >= 10 && lesson.id <= 12;
    return true;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="relative rounded-3xl p-6 sm:p-10 bg-[var(--surface-card)] border border-[var(--border-main)] shadow-sm overflow-hidden">
        <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full bg-bioluminescent-glow pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface-elevated)] border border-[var(--border-subtle)] text-[var(--accent-bioluminescent)] text-xs font-mono font-bold uppercase tracking-wider mb-3">
              <BookOpen className="w-3.5 h-3.5" />
              CHƯƠNG TRÌNH ĐÀO TẠO KỸ NĂNG AI // 12 TIẾT THỰC CHIẾN
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[var(--text-primary)] tracking-tight leading-tight">
              Danh Mục Bài Học & Trình Chiếu
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={onBackToLanding}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--surface-elevated)] hover:bg-[var(--surface-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-main)] text-xs sm:text-sm font-semibold transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Quay lại Trang chủ 3D</span>
            </button>
          </div>
        </div>

        {/* Module Filter Tabs (Single-Row Layout) */}
        <div className="relative z-10 mt-6 pt-5 border-t border-[var(--border-subtle)] grid grid-cols-1 sm:grid-cols-4 gap-2">
          {[
            { id: 'all', label: 'Tất cả (12 Tiết)' },
            { id: 'part1', label: 'Phần 1: Nền tảng AI (Tiết 1–5)' },
            { id: 'part2', label: 'Phần 2: Ứng dụng Liên môn (Tiết 6–9)' },
            { id: 'part3', label: 'Phần 3: Hướng nghiệp & Đồ án (10–12)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as FilterGroup)}
              className={`px-3 py-2.5 rounded-xl text-xs sm:text-[13px] font-semibold whitespace-nowrap truncate text-center transition-all cursor-pointer ${
                activeFilter === tab.id
                  ? 'bg-[var(--accent-bioluminescent)] text-white shadow-sm'
                  : 'bg-[var(--surface-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] border border-[var(--border-subtle)]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLessons.map((lesson: Lesson) => (
          <div
            key={lesson.id}
            className="group bg-[var(--surface-card)] rounded-2xl border border-[var(--border-main)] hover:border-[var(--accent-bioluminescent)] p-6 flex flex-col justify-between shadow-2xs hover:shadow-xl transition-all duration-200"
          >
            <div>
              {/* Top Meta Row */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="px-3 py-1 rounded-lg text-xs font-mono font-bold uppercase tracking-wider bg-[var(--accent-bioluminescent)]/15 text-[var(--accent-bioluminescent)] border border-[var(--accent-bioluminescent)]/30">
                  TIẾT {String(lesson.id).padStart(2, '0')} / 12
                </span>
                <div className="flex items-center gap-3 text-xs font-mono text-[var(--text-muted)]">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    45p
                  </span>
                  <span className="flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5" />
                    {lesson.stages.length} chặng
                  </span>
                </div>
              </div>

              {/* Title & Subtitle */}
              <h2 className="text-xl font-extrabold text-[var(--text-primary)] group-hover:text-[var(--accent-bioluminescent)] transition-colors leading-snug">
                {lesson.title}
              </h2>
              <p className="text-sm text-[var(--text-secondary)] mt-2 line-clamp-2 leading-relaxed">
                {lesson.subtitle}
              </p>

              {/* Core Objective Box */}
              <div className="mt-4 p-3.5 rounded-xl bg-[var(--surface-elevated)]/70 border border-[var(--border-subtle)]">
                <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--accent-bioluminescent)] flex items-center gap-1 mb-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Mục tiêu trọng tâm
                </div>
                <p className="text-xs text-[var(--text-primary)] line-clamp-2 leading-relaxed font-medium">
                  {lesson.coreObjective}
                </p>
              </div>

              {/* Stages Preview List */}
              <div className="mt-4 space-y-1.5">
                {lesson.stages.slice(0, 3).map((st, idx) => (
                  <div
                    key={st.id}
                    className="flex items-center justify-between text-xs text-[var(--text-secondary)] py-1 border-b border-dashed border-[var(--border-subtle)] last:border-none"
                  >
                    <span className="truncate pr-2">
                      <strong className="font-mono text-[var(--text-muted)] mr-1.5">
                        0{idx + 1}.
                      </strong>
                      {st.title}
                    </span>
                    <span className="font-mono text-[10px] text-[var(--text-muted)] shrink-0">
                      {st.durationMinutes}p
                    </span>
                  </div>
                ))}
                {lesson.stages.length > 3 && (
                  <div className="text-[11px] font-mono text-[var(--text-muted)] pt-0.5">
                    + {lesson.stages.length - 3} nội dung & phòng Lab thực hành...
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Action Button: Start Slide Presentation */}
            <div className="mt-6 pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 text-xs font-mono text-[var(--text-muted)]">
                <Cpu className="w-3.5 h-3.5 text-[var(--accent-bioluminescent)]" />
                <span>Lab + {lesson.prompts.length} Prompt</span>
              </div>

              <button
                onClick={() => onStartPresentation(lesson.id)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white text-xs sm:text-sm font-bold shadow-md shadow-teal-900/20 transition-all group-hover:scale-[1.02] cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Trình chiếu</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
