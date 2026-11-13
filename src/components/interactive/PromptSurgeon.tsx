'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Wrench,
  Sparkles,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Trophy,
  Copy,
  Check,
} from 'lucide-react';

interface RTCCFItem {
  id: string;
  snippet: string;
  correctCode: 'R' | 'T' | 'C_CONTEXT' | 'C_CONSTRAINTS' | 'F';
  correctLabel: string;
  explanation: string;
}

const RTCCF_CATEGORIES = [
  { code: 'R', label: 'R — Role (Vai trò)', badge: 'bg-rose-500 text-white' },
  { code: 'C_CONTEXT', label: 'C — Context (Bối cảnh)', badge: 'bg-amber-500 text-white' },
  { code: 'T', label: 'T — Task (Nhiệm vụ)', badge: 'bg-cyan-500 text-white' },
  { code: 'C_CONSTRAINTS', label: 'C — Constraints (Giới hạn)', badge: 'bg-purple-500 text-white' },
  { code: 'F', label: 'F — Format (Định dạng)', badge: 'bg-emerald-500 text-white' },
] as const;

const SURGEON_CHALLENGES: RTCCFItem[] = [
  {
    id: 'item-1',
    snippet: '"Bạn là một giáo viên Sinh học THPT giàu kinh nghiệm luyện thi học sinh giỏi và rất tâm lý."',
    correctCode: 'R',
    correctLabel: 'R — Role (Vai trò)',
    explanation: 'Định vị chuyên môn và phong thái trả lời của AI ngay từ câu đầu tiên.',
  },
  {
    id: 'item-2',
    snippet: '"Tôi là học sinh lớp 12 trường THPT Trung Phú, đang bị nhầm lẫn giữa quy luật phân li và phân li độc lập của Men-đen."',
    correctCode: 'C_CONTEXT',
    correctLabel: 'C — Context (Bối cảnh)',
    explanation: 'Cung cấp thông tin người học đang là ai và đang vướng ở điểm kiến thức nào.',
  },
  {
    id: 'item-3',
    snippet: '"Hãy thiết kế cho tôi kế hoạch ôn tập khắc phục điểm yếu này và 3 bài tập tự luyện từ dễ đến khó."',
    correctCode: 'T',
    correctLabel: 'T — Task (Nhiệm vụ)',
    explanation: 'Chỉ rõ hành động cụ thể mà AI cần thực hiện cho người dùng.',
  },
  {
    id: 'item-4',
    snippet: '"Giải thích ngắn gọn dưới 150 từ, không dùng thuật ngữ vượt chương trình SGK lớp 12, giấu đáp án bài tập ở cuối."',
    correctCode: 'C_CONSTRAINTS',
    correctLabel: 'C — Constraints (Giới hạn)',
    explanation: 'Đặt rào cản độ dài, phạm vi kiến thức và quy tắc không tiết lộ đáp án sớm.',
  },
  {
    id: 'item-5',
    snippet: '"Trình bày thành Bảng so sánh 3 cột trực quan kèm sơ đồ cây lai bằng ký hiệu văn bản."',
    correctCode: 'F',
    correctLabel: 'F — Format (Định dạng)',
    explanation: 'Quy định hình thức trình bày đầu ra giúp học sinh nhìn vào hiểu ngay.',
  },
];

export default function PromptSurgeon() {
  const [activeTab, setActiveTab] = useState<'game' | 'anatomy'>('game');
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  const currentItem = SURGEON_CHALLENGES[currentIdx];
  const userPick = answers[currentItem.id];
  const isCorrect = userPick === currentItem.correctCode;

  const score = SURGEON_CHALLENGES.reduce(
    (acc, item) => acc + (answers[item.id] === item.correctCode ? 1 : 0),
    0
  );

  const handleChoose = (code: string) => {
    setAnswers((prev) => ({ ...prev, [currentItem.id]: code }));
    if (code === currentItem.correctCode) {
      try {
        confetti({
          particleCount: 40,
          spread: 55,
          origin: { y: 0.72 },
        });
      } catch {}
    }
  };

  const resetGame = () => {
    setAnswers({});
    setCurrentIdx(0);
  };

  const fullPrompt = SURGEON_CHALLENGES.map((i) => i.snippet.replace(/"/g, '')).join('\n');

  const copyPrompt = () => {
    navigator.clipboard.writeText(fullPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[var(--surface-card)] rounded-2xl p-5 sm:p-7 border-2 border-[var(--border-main)] shadow-md space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[var(--border-main)]">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('game')}
            className={`px-4 py-2 rounded-xl font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'game'
                ? 'bg-[var(--accent-bioluminescent)] text-white shadow-sm'
                : 'bg-[var(--surface-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)]'
            }`}
          >
            <Wrench className="w-4 h-4" />
            <span>Game: Bác Sĩ Phẫu Thuật R-T-C-C-F</span>
          </button>
          <button
            onClick={() => setActiveTab('anatomy')}
            className={`px-4 py-2 rounded-xl font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'anatomy'
                ? 'bg-[var(--accent-bioluminescent)] text-white shadow-sm'
                : 'bg-[var(--surface-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)]'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Xem Bản Ghép Hoàn Chỉnh</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3.5 py-1.5 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border-main)] font-mono text-xs font-bold flex items-center gap-1.5">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>
              Đã ghép đúng: <strong className="text-[var(--accent-bioluminescent)]">{score}</strong> / 5 mảnh
            </span>
          </div>
          <button
            onClick={resetGame}
            className="p-2 rounded-xl bg-[var(--surface-elevated)] hover:bg-[var(--surface-hover)] text-[var(--text-secondary)] border border-[var(--border-main)] cursor-pointer"
            title="Chơi lại"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {activeTab === 'game' ? (
        <div className="space-y-5">
          {/* Progress Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {SURGEON_CHALLENGES.map((item, idx) => {
              const picked = answers[item.id];
              const right = picked === item.correctCode;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentIdx(idx)}
                  className={`flex-1 min-w-fit px-3 py-2 rounded-xl border font-mono text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                    idx === currentIdx
                      ? 'border-[var(--accent-bioluminescent)] bg-[var(--accent-bioluminescent)]/15 text-[var(--text-primary)]'
                      : 'border-[var(--border-subtle)] bg-[var(--surface-elevated)] text-[var(--text-secondary)]'
                  }`}
                >
                  <span>Mảnh #{idx + 1}</span>
                  {picked && (
                    right ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-500" />
                    )
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Snippet Card */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border-main)] space-y-5">
            <div>
              <span className="font-mono text-xs font-extrabold uppercase tracking-wider text-[var(--accent-bioluminescent)]">
                MẢNH GHÉP CÂU LỆNH SỐ {currentIdx + 1} / 5 — ĐÂY LÀ THÀNH TỐ NÀO TRONG R-T-C-C-F?
              </span>
              <div className="mt-2 p-5 rounded-xl bg-[var(--surface-card)] border-2 border-[var(--accent-bioluminescent)]/40 text-lg sm:text-2xl font-bold text-[var(--text-primary)] leading-snug">
                {currentItem.snippet}
              </div>
            </div>

            {/* 5 Category Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
              {RTCCF_CATEGORIES.map((cat) => {
                const isSelected = userPick === cat.code;
                let btnStyle =
                  'bg-[var(--surface-card)] border-[var(--border-subtle)] hover:border-[var(--accent-bioluminescent)] text-[var(--text-primary)]';
                if (isSelected) {
                  btnStyle =
                    cat.code === currentItem.correctCode
                      ? 'bg-emerald-500/20 border-emerald-500 text-[var(--text-primary)] ring-2 ring-emerald-500/40'
                      : 'bg-rose-500/20 border-rose-500 text-[var(--text-primary)] ring-2 ring-rose-500/40';
                }

                return (
                  <button
                    key={cat.code}
                    onClick={() => handleChoose(cat.code)}
                    className={`p-3.5 rounded-xl border-2 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${btnStyle}`}
                  >
                    <span className={`px-2.5 py-0.5 rounded-md font-mono text-xs font-black ${cat.badge}`}>
                      {cat.code.startsWith('C_') ? 'C' : cat.code}
                    </span>
                    <span className="font-bold text-xs sm:text-sm">{cat.label.split('— ')[1]}</span>
                  </button>
                );
              })}
            </div>

            {/* Explanation Box */}
            {userPick && (
              <div
                className={`p-4 rounded-xl border-2 flex flex-wrap items-center justify-between gap-3 ${
                  isCorrect
                    ? 'bg-emerald-500/10 border-emerald-500/40'
                    : 'bg-rose-500/10 border-rose-500/40'
                }`}
              >
                <div className="space-y-1">
                  <div
                    className={`font-mono text-xs font-extrabold uppercase flex items-center gap-1.5 ${
                      isCorrect ? 'text-emerald-500' : 'text-rose-500'
                    }`}
                  >
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>CHÍNH XÁC! ĐÂY LÀ {currentItem.correctLabel.toUpperCase()}</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4" />
                        <span>CHƯA ĐÚNG — HÃY CHỌN LẠI NHÉ!</span>
                      </>
                    )}
                  </div>
                  <p className="text-sm sm:text-base font-medium text-[var(--text-primary)]">
                    {currentItem.explanation}
                  </p>
                </div>

                {isCorrect && currentIdx < SURGEON_CHALLENGES.length - 1 && (
                  <button
                    onClick={() => setCurrentIdx((prev) => prev + 1)}
                    className="px-4 py-2 rounded-xl bg-[var(--accent-bioluminescent)] text-white font-mono text-xs font-bold cursor-pointer hover:opacity-90 shrink-0"
                  >
                    Mảnh ghép tiếp theo →
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold uppercase text-[var(--accent-bioluminescent)]">
              SIÊU CÂU LỆNH SAU KHI RÁP ĐỦ 5 MẢNH R-T-C-C-F:
            </span>
            <button
              onClick={copyPrompt}
              className="px-3.5 py-1.5 rounded-xl bg-[var(--btn-solid-bg)] text-[var(--btn-solid-text)] font-mono text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Đã sao chép' : 'Sao chép siêu Prompt'}</span>
            </button>
          </div>

          <div className="space-y-2.5">
            {SURGEON_CHALLENGES.map((item) => {
              const cat = RTCCF_CATEGORIES.find((c) => c.code === item.correctCode)!;
              return (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border-main)] flex items-start gap-3"
                >
                  <span className={`px-2.5 py-1 rounded-md font-mono text-xs font-black shrink-0 ${cat.badge}`}>
                    {item.correctLabel.split(' — ')[0]}
                  </span>
                  <div>
                    <div className="font-mono text-xs font-bold text-[var(--text-muted)] uppercase">
                      {item.correctLabel}
                    </div>
                    <p className="text-sm sm:text-base font-semibold text-[var(--text-primary)] mt-0.5">
                      {item.snippet}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
