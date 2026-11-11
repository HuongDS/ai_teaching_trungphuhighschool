'use client';

import React, { useRef } from 'react';
import Map3DScene from './Map3DScene';
import TeacherProfile3D from './TeacherProfile3D';
import AiPlatformShowcase from './AiPlatformShowcase';
import { ChevronDown, Sparkles, MapPin, User, Bot, GraduationCap } from 'lucide-react';

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
      {/* Floating Section Progress Indicator (Sticky Right on Desktop) */}
      <div className="hidden xl:flex fixed right-6 top-1/2 -translate-y-1/2 z-50 flex-col gap-3 bg-[var(--surface-card)]/80 backdrop-blur-md p-3 rounded-2xl border border-[var(--border-main)] shadow-xl">
        <button
          onClick={() => scrollToSection(section1Ref)}
          title="Bản đồ 3D THPT Trung Phú"
          className="group flex items-center gap-2 p-2 rounded-xl hover:bg-[var(--surface-hover)] transition-all text-left"
        >
          <div className="w-3 h-3 rounded-full bg-[var(--accent-bioluminescent)] group-hover:scale-125 transition-transform" />
          <span className="text-[11px] font-mono font-bold text-[var(--text-secondary)] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            01. Vị Trí THPT Trung Phú
          </span>
        </button>

        <button
          onClick={() => scrollToSection(section2Ref)}
          title="Thầy Nguyễn Trung Nguyên"
          className="group flex items-center gap-2 p-2 rounded-xl hover:bg-[var(--surface-hover)] transition-all text-left"
        >
          <div className="w-3 h-3 rounded-full bg-cyan-500 group-hover:scale-125 transition-transform" />
          <span className="text-[11px] font-mono font-bold text-[var(--text-secondary)] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            02. Thầy Nguyễn Trung Nguyên
          </span>
        </button>

        <button
          onClick={() => scrollToSection(section3Ref)}
          title="Sản phẩm 100% từ AI"
          className="group flex items-center gap-2 p-2 rounded-xl hover:bg-[var(--surface-hover)] transition-all text-left"
        >
          <div className="w-3 h-3 rounded-full bg-emerald-500 group-hover:scale-125 transition-transform" />
          <span className="text-[11px] font-mono font-bold text-[var(--text-secondary)] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            03. Nền Tảng 100% AI
          </span>
        </button>
      </div>

      {/* SECTION 1: 3D MAP OF THPT TRUNG PHÚ */}
      <section ref={section1Ref} className="scroll-mt-6">
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
      <section ref={section2Ref} className="scroll-mt-6">
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
      <section ref={section3Ref} className="scroll-mt-6">
        <AiPlatformShowcase onEnterClassroom={onEnterClassroom} />
      </section>
    </div>
  );
}
