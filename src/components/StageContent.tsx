'use client';

import React, { useState } from 'react';
import { Lesson, Stage } from '@/data/curriculum';
import InteractiveToolHost from './InteractiveToolHost';

interface StageContentProps {
  lesson: Lesson;
  currentStage: Stage;
  stageIndex: number;
  totalStages: number;
  onPrevStage: () => void;
  onNextStage: () => void;
}

export default function StageContent({
  lesson,
  currentStage,
  stageIndex,
  totalStages,
  onPrevStage,
  onNextStage
}: StageContentProps) {
  const [copiedPromptIndex, setCopiedPromptIndex] = useState<number | null>(null);

  const copyPrompt = (idx: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPromptIndex(idx);
    setTimeout(() => setCopiedPromptIndex(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Stage Header Banner */}
      <div className="bg-[var(--surface-card)] rounded-2xl p-6 sm:p-8 border border-[var(--border-main)] shadow-xs transition-colors">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-md text-xs font-mono font-extrabold bg-[var(--accent-bioluminescent)]/15 text-[var(--accent-bioluminescent)] uppercase tracking-[0.16em]">
              CHẶNG {stageIndex + 1}/{totalStages} // {currentStage.timeRange}
            </span>
            <span className="px-3 py-1 rounded-md text-xs font-mono font-bold bg-[var(--surface-elevated)] text-[var(--text-secondary)] border border-[var(--border-subtle)]">
              THỜI LƯỢNG {currentStage.durationMinutes} PHÚT
            </span>
          </div>

          {/* Quick Prev / Next Stage Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={onPrevStage}
              disabled={stageIndex === 0}
              className="px-3.5 py-1.5 rounded-md font-mono text-xs uppercase tracking-[0.1em] font-bold bg-[var(--surface-elevated)] hover:bg-[var(--surface-hover)] border border-[var(--border-main)] disabled:opacity-30 text-[var(--text-secondary)] transition-all cursor-pointer"
            >
              ← Chặng trước
            </button>
            <button
              onClick={onNextStage}
              disabled={stageIndex === totalStages - 1}
              className="px-4 py-1.5 rounded-md font-mono text-xs uppercase tracking-[0.1em] font-bold bg-[var(--btn-solid-bg)] hover:bg-[var(--btn-solid-hover)] text-[var(--btn-solid-text)] disabled:opacity-30 transition-all shadow-xs cursor-pointer"
            >
              Chặng kế tiếp →
            </button>
          </div>
        </div>

        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)] leading-tight">
          {currentStage.title}
        </h2>
        <div className="text-[var(--text-secondary)] text-base sm:text-lg mt-3 leading-relaxed">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent-bioluminescent)] block mb-0.5">
            Mục tiêu sư phạm
          </span>
          {currentStage.purpose}
        </div>
      </div>

      {/* Main Content Blocks of the Stage */}
      <div className="space-y-6">
        {currentStage.contentBlocks.map((block, idx) => (
          <div
            key={idx}
            className="bg-[var(--surface-card)] rounded-2xl p-6 sm:p-8 border border-[var(--border-main)] shadow-xs transition-colors"
          >
            {block.heading && (
              <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] mb-3 flex items-center gap-2.5">
                <span className="w-1.5 h-5 rounded-full bg-[var(--accent-bioluminescent)] inline-block"></span>
                {block.heading}
              </h3>
            )}

            {block.description && (
              <p className="text-[var(--text-secondary)] text-lg sm:text-xl leading-relaxed mb-4">
                {block.description}
              </p>
            )}

            {block.bulletPoints && block.bulletPoints.length > 0 && (
              <ul className="space-y-3 my-4">
                {block.bulletPoints.map((point, pIdx) => (
                  <li
                    key={pIdx}
                    className="flex items-start gap-3 text-lg sm:text-xl text-[var(--text-primary)] leading-relaxed font-medium"
                  >
                    <span className="w-2 h-2 rounded-full bg-[var(--accent-bioluminescent)] shrink-0 mt-3"></span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            )}

            {block.callout && (
              <div
                className={`mt-4 p-5 rounded-xl border text-base sm:text-lg leading-relaxed ${
                  block.callout.type === 'tip'
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-[var(--text-primary)]'
                    : block.callout.type === 'warning'
                    ? 'bg-rose-500/10 border-rose-500/30 text-[var(--text-primary)]'
                    : block.callout.type === 'quote'
                    ? 'bg-[var(--surface-elevated)] border-[var(--border-main)] text-[var(--text-primary)] italic'
                    : 'bg-blue-500/10 border-blue-500/30 text-[var(--text-primary)]'
                }`}
              >
                <div className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent-bioluminescent)] mb-1">
                  [Lưu ý sư phạm]
                </div>
                <div className="font-medium">{block.callout.text}</div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Interactive Tool Area */}
      {(stageIndex === 1 || stageIndex === 2 || stageIndex === 3) && (
        <InteractiveToolHost lesson={lesson} />
      )}

      {/* Ready-to-use Sample Prompts for this lesson */}
      {lesson.prompts && lesson.prompts.length > 0 && (
        <div className="bg-[var(--surface-card)] rounded-2xl p-6 sm:p-8 border border-[var(--border-main)] shadow-xs mt-8 transition-colors">
          <div className="text-xs font-mono font-extrabold uppercase tracking-[0.16em] text-[var(--accent-bioluminescent)] mb-1">
            Câu Lệnh Thực Chiến Dành Cho Tiết Này
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] mb-2">
            Mẫu Prompt Chuẩn Sư Phạm
          </h3>
          <p className="text-[var(--text-secondary)] text-sm sm:text-base mb-5">
            Thầy/Cô bấm sao chép và dán trực tiếp vào tab ChatGPT / Google Gemini trên trình duyệt để biểu diễn trực tiếp trước mắt học sinh.
          </p>

          <div className="space-y-4">
            {lesson.prompts.map((p, idx) => (
              <div key={idx} className="p-5 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border-main)]">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[var(--text-primary)] text-base sm:text-lg">
                      {p.title}
                    </span>
                    <span className="text-[11px] font-mono font-bold uppercase tracking-[0.1em] px-2 py-0.5 rounded bg-[var(--accent-bioluminescent)]/15 text-[var(--accent-bioluminescent)]">
                      {p.category}
                    </span>
                  </div>
                  <button
                    onClick={() => copyPrompt(idx, p.prompt)}
                    className="px-3.5 py-1.5 rounded-md font-mono text-xs uppercase tracking-[0.1em] font-bold bg-[var(--btn-solid-bg)] hover:bg-[var(--btn-solid-hover)] text-[var(--btn-solid-text)] transition-all shadow-xs cursor-pointer"
                  >
                    {copiedPromptIndex === idx ? 'Đã sao chép' : 'Sao chép Prompt'}
                  </button>
                </div>
                <div className="p-4 bg-[var(--surface-card)] rounded-lg border border-[var(--border-subtle)] text-[var(--text-primary)] font-mono text-sm sm:text-base whitespace-pre-line leading-relaxed">
                  {p.prompt}
                </div>
                {p.explanation && (
                  <p className="mt-2 text-xs sm:text-sm text-[var(--text-muted)] font-mono">
                    Ghi chú: {p.explanation}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
