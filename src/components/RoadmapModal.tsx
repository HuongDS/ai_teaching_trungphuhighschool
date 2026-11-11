'use client';

import React from 'react';
import { LESSONS } from '@/data/curriculum';

interface RoadmapModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLessonId: number;
  onSelectLesson: (id: number) => void;
}

export default function RoadmapModal({
  isOpen,
  onClose,
  currentLessonId,
  onSelectLesson
}: RoadmapModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[var(--surface-card)] rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-[var(--border-main)] transition-colors">
        <div className="flex items-center justify-between pb-4 border-b border-[var(--border-main)] mb-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-md bg-[var(--accent-bioluminescent)] text-white flex items-center justify-center font-mono font-black text-sm">
              12
            </div>
            <div>
              <div className="text-[11px] font-mono font-extrabold uppercase tracking-[0.18em] text-[var(--accent-bioluminescent)]">
                Lộ trình chuẩn hóa THPT
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                12 Tiết Giảng Dạy AI Thực Chiến
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="px-3 py-1 rounded font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] border border-[var(--border-subtle)] transition-all cursor-pointer"
          >
            [Đóng]
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {LESSONS.map((l) => {
            const isCurrent = l.id === currentLessonId;

            return (
              <button
                key={l.id}
                onClick={() => {
                  onSelectLesson(l.id);
                  onClose();
                }}
                className={`p-5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isCurrent
                    ? 'border-[var(--accent-bioluminescent)] bg-[var(--surface-elevated)] ring-1 ring-[var(--accent-bioluminescent)] shadow-xs'
                    : 'border-[var(--border-main)] bg-[var(--surface-elevated)]/60 hover:bg-[var(--surface-elevated)] hover:border-[var(--accent-bioluminescent)]/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span
                      className={`text-[11px] font-mono font-bold uppercase tracking-[0.14em] px-2 py-0.5 rounded ${
                        isCurrent
                          ? 'bg-[var(--accent-bioluminescent)] text-white'
                          : 'bg-[var(--border-subtle)] text-[var(--text-secondary)]'
                      }`}
                    >
                      Tiết {l.id}
                    </span>
                    {isCurrent && (
                      <span className="text-xs font-mono font-bold text-[var(--accent-bioluminescent)]">
                        [ĐANG DẠY]
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-[var(--text-primary)] text-base leading-snug mb-1">
                    {l.title.replace(`Tiết ${l.id}: `, '')}
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
                    {l.coreObjective}
                  </p>
                </div>

                <div className="mt-4 pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs font-mono font-bold uppercase tracking-[0.14em] text-[var(--accent-bioluminescent)]">
                  <span>Vào bài học</span>
                  <span>→</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
