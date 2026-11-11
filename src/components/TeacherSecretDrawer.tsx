'use client';

import React from 'react';
import { Lesson, Stage } from '@/data/curriculum';

interface TeacherSecretDrawerProps {
  lesson: Lesson;
  currentStage: Stage;
  isOpen: boolean;
  onClose: () => void;
}

export default function TeacherSecretDrawer({
  lesson,
  currentStage,
  isOpen,
  onClose
}: TeacherSecretDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="bg-[var(--surface-elevated)] border-2 border-[var(--border-main)] rounded-2xl p-6 sm:p-8 shadow-xs mb-6 relative transition-colors">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 px-2.5 py-1 rounded font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] border border-[var(--border-subtle)] transition-all cursor-pointer"
        title="Đóng ghi chú"
      >
        [Đóng]
      </button>

      <div className="text-[var(--accent-bioluminescent)] font-mono text-xs uppercase tracking-[0.18em] font-extrabold mb-2">
        SỔ TAY SƯ PHẠM // DÀNH RIÊNG CHO THẦY CÔ ĐỌC NHANH 2 PHÚT
      </div>

      <h4 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] mb-4">
        {lesson.shortTitle} — Kịch Bản Điều Phối Lớp Học
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-[var(--surface-card)] rounded-xl border border-[var(--border-main)]">
          <div className="text-xs font-mono font-bold uppercase tracking-[0.14em] text-[var(--accent-bioluminescent)] mb-1">
            Khái niệm cốt lõi
          </div>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] font-medium leading-relaxed">
            {lesson.teacherRead2Min.coreConcept}
          </p>
        </div>

        <div className="p-4 bg-[var(--surface-card)] rounded-xl border border-[var(--border-main)]">
          <div className="text-xs font-mono font-bold uppercase tracking-[0.14em] text-[var(--accent-aqua)] mb-1">
            Mẹo sư phạm đắt giá
          </div>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] font-medium leading-relaxed">
            {lesson.teacherRead2Min.pedagogicalKey}
          </p>
        </div>

        <div className="p-4 bg-[var(--surface-card)] rounded-xl border border-[var(--border-main)]">
          <div className="text-xs font-mono font-bold uppercase tracking-[0.14em] text-[var(--accent-ember)] mb-1">
            Lỗi học sinh hay mắc
          </div>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] font-medium leading-relaxed">
            {lesson.teacherRead2Min.commonMistake}
          </p>
        </div>
      </div>

      {/* Script for Current Stage */}
      <div className="p-4 bg-[var(--surface-card)] rounded-xl border border-[var(--accent-bioluminescent)]/40 shadow-xs">
        <div className="text-xs font-mono font-extrabold uppercase tracking-[0.16em] text-[var(--accent-bioluminescent)] mb-2">
          Lời thoại gợi mở mẫu cho chặng này ({currentStage.timeRange}):
        </div>
        <p className="text-base sm:text-lg text-[var(--text-primary)] font-semibold italic bg-[var(--surface-elevated)] p-3.5 rounded-lg border border-[var(--border-subtle)] leading-relaxed">
          &ldquo;{currentStage.teacherScript}&rdquo;
        </p>
      </div>
    </div>
  );
}
