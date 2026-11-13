'use client';

import React, { useRef } from 'react';
import Map3DScene from './Map3DScene';
import TeacherProfile3D from './TeacherProfile3D';
import AiPlatformShowcase from './AiPlatformShowcase';
import { ChevronDown, MapPin, GraduationCap, Bot, BookOpen } from 'lucide-react';

interface LandingExperienceProps {
  onEnterClassroom: () => void;
}

export default function LandingExperience({ onEnterClassroom }: LandingExperienceProps) {
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full relative space-y-16 sm:space-y-24 mb-16">
      {/* Compact Floating Quick-Nav Dock (Slim vertical pill, tooltips pop out to the left) */}
      <nav
        aria-label="Điều hướng nhanh các phần"
        className="hidden xl:flex fixed right-4 top-1/2 -translate-y-1/2 z-30 flex-col items-center gap-1.5 bg-[var(--surface-card)]/90 backdrop-blur-md p-1.5 rounded-2xl border border-[var(--border-main)] shadow-lg"
      >
        <button
          onClick={() => scrollToSection(section1Ref)}
          className="group relative w-9 h-9 flex items-center justify-center rounded-xl hover:bg-[var(--surface-elevated)] text-[var(--accent-bioluminescent)] transition-all cursor-pointer"
          aria-label="01. Vị Trí THPT Trung Phú"
        >
          <MapPin className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span className="pointer-events-none absolute right-full mr-2.5 px-3 py-1.5 rounded-xl bg-[var(--surface-card)] text-[var(--text-primary)] border border-[var(--border-main)] shadow-md text-xs font-semibold whitespace-nowrap opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
            01. Vị trí THPT Trung Phú
          </span>
        </button>

        <button
          onClick={() => scrollToSection(section2Ref)}
          className="group relative w-9 h-9 flex items-center justify-center rounded-xl hover:bg-[var(--surface-elevated)] text-cyan-600 dark:text-cyan-400 transition-all cursor-pointer"
          aria-label="02. Thầy Nguyễn Trung Nguyên"
        >
          <GraduationCap className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span className="pointer-events-none absolute right-full mr-2.5 px-3 py-1.5 rounded-xl bg-[var(--surface-card)] text-[var(--text-primary)] border border-[var(--border-main)] shadow-md text-xs font-semibold whitespace-nowrap opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
            02. Thầy Nguyễn Trung Nguyên
          </span>
        </button>

        <button
          onClick={() => scrollToSection(section3Ref)}
          className="group relative w-9 h-9 flex items-center justify-center rounded-xl hover:bg-[var(--surface-elevated)] text-emerald-600 dark:text-emerald-400 transition-all cursor-pointer"
          aria-label="03. Nền Tảng 100% AI"
        >
          <Bot className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span className="pointer-events-none absolute right-full mr-2.5 px-3 py-1.5 rounded-xl bg-[var(--surface-card)] text-[var(--text-primary)] border border-[var(--border-main)] shadow-md text-xs font-semibold whitespace-nowrap opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
            03. Nền tảng 100% AI
          </span>
        </button>

        <div className="w-5 h-[1px] bg-[var(--border-main)] my-0.5" />

        <button
          onClick={onEnterClassroom}
          className="group relative w-9 h-9 flex items-center justify-center rounded-xl hover:bg-[var(--surface-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all cursor-pointer"
          aria-label="04. Vào Lớp Học 12 Tiết"
        >
          <BookOpen className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span className="pointer-events-none absolute right-full mr-2.5 px-3 py-1.5 rounded-xl bg-[var(--surface-card)] text-[var(--text-primary)] border border-[var(--border-main)] shadow-md text-xs font-semibold whitespace-nowrap opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
            04. Lớp học 12 Tiết
          </span>
        </button>
      </nav>

      {/* SECTION 1: 3D MAP OF THPT TRUNG PHÚ */}
      <section ref={section1Ref} className="scroll-mt-20">
        <div className="text-center max-w-3xl mx-auto mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface-elevated)] border border-[var(--border-subtle)] text-[var(--accent-bioluminescent)] text-xs font-mono font-bold uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5" />
            VỊ TRÍ ĐỊA LÝ & KHUÔN VIÊN TRƯỜNG HỌC SỐ
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[var(--text-primary)] tracking-tight">
            TRƯỜNG THPT TRUNG PHÚ
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] mt-2">
            Khám phá sa bàn không gian 3D tương tác tại Củ Chi, TP. Hồ Chí Minh — Điểm tựa của đổi mới giáo dục và sáng tạo AI.
          </p>
        </div>

        <Map3DScene onExploreMore={() => scrollToSection(section2Ref)} />

        {/* Scroll Prompt Button to Section 2 */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => scrollToSection(section2Ref)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--surface-card)] hover:bg-[var(--surface-hover)] border border-[var(--border-main)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-xs font-mono font-bold shadow-md transition-all hover:scale-105 cursor-pointer"
          >
            <span>Cuộn xuống: Giới thiệu Thầy Nguyễn Trung Nguyên</span>
            <ChevronDown className="w-4 h-4 animate-bounce text-[var(--accent-bioluminescent)]" />
          </button>
        </div>
      </section>

      {/* SECTION 2: TEACHER PROFILE 3D (THẦY NGUYỄN TRUNG NGUYÊN) */}
      <section ref={section2Ref} className="scroll-mt-20">
        <TeacherProfile3D />

        {/* Scroll Prompt Button to Section 3 */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => scrollToSection(section3Ref)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--surface-card)] hover:bg-[var(--surface-hover)] border border-[var(--border-main)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-xs font-mono font-bold shadow-md transition-all hover:scale-105 cursor-pointer"
          >
            <span>Cuộn xuống: Khám phá Website 100% tạo bởi AI</span>
            <ChevronDown className="w-4 h-4 animate-bounce text-emerald-500" />
          </button>
        </div>
      </section>

      {/* SECTION 3: 100% AI CRAFTED PLATFORM */}
      <section ref={section3Ref} className="scroll-mt-20">
        <AiPlatformShowcase onEnterClassroom={onEnterClassroom} />
      </section>
    </div>
  );
}
