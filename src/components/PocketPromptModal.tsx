'use client';

import React, { useState } from 'react';
import { TOP_5_PROMPTS } from '@/data/curriculum';

interface PocketPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PocketPromptModal({ isOpen, onClose }: PocketPromptModalProps) {
  const [copiedId, setCopiedId] = useState<number | null>(null);

  if (!isOpen) return null;

  const copyPrompt = (id: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[var(--surface-card)] rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-[var(--border-main)] transition-colors">
        <div className="flex items-center justify-between pb-4 border-b border-[var(--border-main)] mb-6">
          <div>
            <div className="text-[11px] font-mono font-extrabold uppercase tracking-[0.18em] text-[var(--accent-bioluminescent)] mb-1">
              Tra Cứu Bỏ Túi
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
              Sổ Tay Công Thức Prompt
            </h3>
          </div>
          <button
            onClick={onClose}
            className="px-3 py-1 rounded font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] border border-[var(--border-subtle)] transition-all cursor-pointer"
          >
            [Đóng]
          </button>
        </div>

        {/* RTCCF Formula Card */}
        <div className="p-5 bg-[var(--surface-elevated)] border border-[var(--border-main)] rounded-xl mb-6">
          <div className="text-xs font-mono font-extrabold uppercase tracking-[0.18em] text-[var(--accent-bioluminescent)] mb-2">
            Công thức chuẩn 5 thành tố
          </div>
          <h4 className="text-base sm:text-lg font-bold text-[var(--text-primary)] mb-3">
            R — T — C — C — F (Role, Task, Context, Constraints, Format)
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-xs">
            <div className="p-2.5 bg-[var(--surface-card)] rounded-lg border border-[var(--border-subtle)]">
              <strong className="text-[var(--accent-bioluminescent)] block mb-0.5 font-mono">R (Role)</strong>
              Bạn là ai? (Gia sư, chuyên gia, bác sĩ)
            </div>
            <div className="p-2.5 bg-[var(--surface-card)] rounded-lg border border-[var(--border-subtle)]">
              <strong className="text-[var(--accent-aqua)] block mb-0.5 font-mono">T (Task)</strong>
              Làm việc gì? (Lập bảng, tóm tắt, chữa bài)
            </div>
            <div className="p-2.5 bg-[var(--surface-card)] rounded-lg border border-[var(--border-subtle)]">
              <strong className="text-emerald-500 block mb-0.5 font-mono">C (Context)</strong>
              Tôi là ai? (HS lớp 11 đang ôn thi)
            </div>
            <div className="p-2.5 bg-[var(--surface-card)] rounded-lg border border-[var(--border-subtle)]">
              <strong className="text-amber-500 block mb-0.5 font-mono">C (Constraints)</strong>
              Giới hạn gì? (Dưới 50 từ, không lý thuyết)
            </div>
            <div className="p-2.5 bg-[var(--surface-card)] rounded-lg border border-[var(--border-subtle)]">
              <strong className="text-purple-400 block mb-0.5 font-mono">F (Format)</strong>
              Định dạng nào? (Bảng 4 cột, gạch đầu dòng)
            </div>
          </div>
        </div>

        {/* Top 5 Prompts */}
        <div className="text-xs font-mono font-extrabold uppercase tracking-[0.16em] text-[var(--accent-bioluminescent)] mb-3">
          Top 5 Prompt Thông Dụng Nhất Năm Học
        </div>

        <div className="space-y-4">
          {TOP_5_PROMPTS.map((item) => (
            <div key={item.id} className="p-4 rounded-xl border border-[var(--border-main)] bg-[var(--surface-elevated)]">
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[var(--text-primary)] text-base">{item.title}</span>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-[0.1em] px-2 py-0.5 rounded bg-[var(--accent-bioluminescent)]/15 text-[var(--accent-bioluminescent)]">
                    {item.tag}
                  </span>
                </div>
                <button
                  onClick={() => copyPrompt(item.id, item.prompt)}
                  className="px-3 py-1 rounded text-xs font-mono font-bold uppercase tracking-[0.1em] text-[var(--text-primary)] bg-[var(--surface-card)] hover:bg-[var(--surface-hover)] border border-[var(--border-main)] cursor-pointer transition-all shadow-xs"
                >
                  {copiedId === item.id ? 'Đã sao chép' : 'Sao chép'}
                </button>
              </div>
              <p className="text-[var(--text-secondary)] text-sm font-mono bg-[var(--surface-card)] p-3 rounded-lg border border-[var(--border-subtle)] leading-relaxed">
                &ldquo;{item.prompt}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
