'use client';

import React from 'react';
import { Stage } from '@/data/curriculum';

interface StageTimelineProps {
  stages: Stage[];
  currentStageIndex: number;
  onSelectStage: (idx: number) => void;
}

export default function StageTimeline({
  stages,
  currentStageIndex,
  onSelectStage
}: StageTimelineProps) {
  return (
    <div className="bg-[var(--surface-card)] rounded-2xl p-3 sm:p-4 border border-[var(--border-main)] shadow-xs mb-6 transition-colors">
      <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
        {stages.map((stage, idx) => {
          const isCurrent = idx === currentStageIndex;
          const isPassed = idx < currentStageIndex;

          return (
            <button
              key={stage.id}
              onClick={() => onSelectStage(idx)}
              className={`flex-1 min-w-[170px] sm:min-w-[210px] p-3 rounded-xl text-left border transition-all cursor-pointer relative overflow-hidden ${
                isCurrent
                  ? 'border-[var(--accent-bioluminescent)] bg-[var(--surface-elevated)] ring-1 ring-[var(--accent-bioluminescent)] shadow-sm'
                  : isPassed
                  ? 'border-[var(--border-main)] bg-[var(--surface-elevated)]/60 text-[var(--text-secondary)] hover:border-[var(--accent-bioluminescent)]/60'
                  : 'border-[var(--border-subtle)] bg-[var(--surface-card)] text-[var(--text-secondary)] hover:border-[var(--border-main)]'
              }`}
            >
              {isCurrent && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--accent-bioluminescent)]" />
              )}
              <div className="flex items-center justify-between gap-1 mb-1.5">
                <span
                  className={`text-[11px] font-mono font-extrabold uppercase tracking-[0.14em] px-2 py-0.5 rounded ${
                    isCurrent
                      ? 'bg-[var(--accent-bioluminescent)]/20 text-[var(--accent-bioluminescent)]'
                      : 'bg-[var(--border-subtle)] text-[var(--text-secondary)]'
                  }`}
                >
                  {stage.timeRange}
                </span>
                <span className="text-[11px] font-mono text-[var(--text-muted)] font-semibold">
                  {stage.durationMinutes}m
                </span>
              </div>
              <div
                className={`font-bold text-sm sm:text-base truncate ${
                  isCurrent ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'
                }`}
              >
                {stage.title}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
