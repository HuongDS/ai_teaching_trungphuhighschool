'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Presentation,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Trophy,
  Image as ImageIcon,
} from 'lucide-react';

interface SlideRound {
  id: number;
  topic: string;
  question: string;
  optionA: {
    title: string;
    bullets: string[];
    visualNote: string;
    isOptimal: boolean;
  };
  optionB: {
    title: string;
    bullets: string[];
    visualNote: string;
    isOptimal: boolean;
  };
  explanation: string;
}

const SLIDE_ROUNDS: SlideRound[] = [
  {
    id: 1,
    topic: 'Vòng 1: Thiết kế Slide Thuyết trình (Ít chữ - Nhiều ý)',
    question: 'Nhóm em thuyết trình chủ đề "Tác hại của thức khuya với học sinh THPT". Bản thiết kế Slide nào dưới đây đạt chuẩn quốc tế?',
    optionA: {
      title: 'TÁC HẠI CỦA VIỆC THỨC KHUYA ĐỐI VỚI HỌC SINH',
      bullets: [
        'Thức khuya là một thói quen rất xấu hiện nay của các bạn học sinh cấp 3 vì làm cơ thể mệt mỏi suy giảm trí nhớ nghiêm trọng vào sáng hôm sau.',
        'Ngoài ra theo nghiên cứu thức khuya dài ngày còn làm rối loạn đồng hồ sinh học và giảm hệ miễn dịch dễ cảm cúm.',
      ],
      visualNote: 'Không có hình minh họa, toàn bộ mặt slide chật kín 150 chữ.',
      isOptimal: false,
    },
    optionB: {
      title: 'Cái Giá Của Việc "Cày Đêm"',
      bullets: [
        '🧠 Giảm 40% khả năng ghi nhớ bài học',
        '🛡️ Hệ miễn dịch suy kiệt sau 7 ngày',
        '⚡ Mất tập trung giờ học sáng hôm sau',
      ],
      visualNote: 'Hình 3D chiếc đồng hồ sinh học rạn nứt + 3 từ khóa nổi bật.',
      isOptimal: true,
    },
    explanation:
      'Slide B chiến thắng tuyệt đối! Đúng nguyên tắc "3 gạch đầu dòng - mỗi dòng dưới 10 từ - có số liệu điểm nhấn" giúp khán giả nhìn 3 giây là hiểu và tập trung nghe người thuyết trình.',
  },
  {
    id: 2,
    topic: 'Vòng 2: Câu lệnh (Prompt) tạo ảnh minh họa cho Slide',
    question: 'Em cần AI vẽ 1 bức ảnh minh họa cho Slide mở đầu về "Học sinh THPT Trung Phú làm chủ AI". Câu lệnh (Prompt) nào ra ảnh đẹp và đúng ý nhất?',
    optionA: {
      title: 'Prompt đủ 6 yếu tố thị giác',
      bullets: [
        'Chủ thể & Hành động: Nhóm học sinh THPT Việt Nam mặc áo dài/đồng phục đang hào hứng thảo luận bên màn hình hologram AI.',
        'Bối cảnh & Phong cách: Lớp học hiện đại ngập nắng sớm, phong cách 3D Pixar tươi sáng, góc chụp rộng.',
      ],
      visualNote: 'Đủ 6 mảnh ghép: Chủ thể + Bối cảnh + Hành động + Phong cách + Màu sắc + Bố cục.',
      isOptimal: true,
    },
    optionB: {
      title: 'Prompt cụt lủn mơ hồ',
      bullets: [
        '"Vẽ cho tôi một bức ảnh đẹp về trí tuệ nhân tạo và trường học."',
        'Không mô tả chủ thể là ai, không có phong cách hay màu sắc.',
      ],
      visualNote: 'AI sẽ vẽ ra hình robot viễn tưởng xa lạ, không ăn nhập gì với học sinh Việt Nam.',
      isOptimal: false,
    },
    explanation:
      'Prompt A chiến thắng! Khi tạo ảnh với AI, mô tả đủ 6 yếu tố (Chủ thể, Bối cảnh, Hành động, Phong cách, Màu sắc, Bố cục) giúp bức ảnh khớp 100% ý tưởng thuyết trình.',
  },
];

export default function SlideComparison() {
  const [roundIdx, setRoundIdx] = useState<number>(0);
  const [picks, setPicks] = useState<Record<number, 'A' | 'B'>>({});

  const currentRound = SLIDE_ROUNDS[roundIdx];
  const userPick = picks[currentRound.id];
  const hasPicked = userPick !== undefined;
  const isUserCorrect =
    hasPicked &&
    ((userPick === 'A' && currentRound.optionA.isOptimal) ||
      (userPick === 'B' && currentRound.optionB.isOptimal));

  const score = SLIDE_ROUNDS.reduce((acc, r) => {
    const p = picks[r.id];
    if (!p) return acc;
    const right = (p === 'A' && r.optionA.isOptimal) || (p === 'B' && r.optionB.isOptimal);
    return acc + (right ? 1 : 0);
  }, 0);

  const handleChoose = (choice: 'A' | 'B') => {
    setPicks((prev) => ({ ...prev, [currentRound.id]: choice }));
    const right =
      (choice === 'A' && currentRound.optionA.isOptimal) ||
      (choice === 'B' && currentRound.optionB.isOptimal);
    if (right) {
      try {
        confetti({
          particleCount: 45,
          spread: 60,
          origin: { y: 0.72 },
        });
      } catch {}
    }
  };

  return (
    <div className="bg-[var(--surface-card)] rounded-2xl p-5 sm:p-7 border-2 border-[var(--border-main)] shadow-md space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[var(--border-main)]">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg font-mono text-xs font-extrabold bg-[var(--accent-bioluminescent)] text-white uppercase tracking-wider">
            <Presentation className="w-3.5 h-3.5" />
            GAME GIÁM KHẢO THUYẾT TRÌNH // SLIDE MAKEOVER & PROMPT ẢNH
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] mt-2">
            Chọn Phiên Bản Thiết Kế Đỉnh Cao Cho Bài Báo Cáo Trước Lớp
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3.5 py-1.5 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border-main)] font-mono text-xs font-bold flex items-center gap-1.5">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>
              Điểm thẩm mỹ: <strong className="text-[var(--accent-bioluminescent)]">{score}</strong> / {SLIDE_ROUNDS.length}
            </span>
          </div>
          <button
            onClick={() => {
              setPicks({});
              setRoundIdx(0);
            }}
            className="p-2 rounded-xl bg-[var(--surface-elevated)] hover:bg-[var(--surface-hover)] text-[var(--text-secondary)] border border-[var(--border-main)] cursor-pointer"
            title="Chơi lại"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Round Switcher */}
      <div className="grid grid-cols-2 gap-3">
        {SLIDE_ROUNDS.map((r, idx) => (
          <button
            key={r.id}
            onClick={() => setRoundIdx(idx)}
            className={`p-3 rounded-xl border text-left font-mono text-xs font-bold cursor-pointer transition-all flex items-center justify-between ${
              idx === roundIdx
                ? 'border-[var(--accent-bioluminescent)] bg-[var(--accent-bioluminescent)]/15 text-[var(--text-primary)]'
                : 'border-[var(--border-subtle)] bg-[var(--surface-elevated)] text-[var(--text-secondary)]'
            }`}
          >
            <span className="truncate">{r.topic}</span>
            {picks[r.id] && <ImageIcon className="w-4 h-4 text-[var(--accent-bioluminescent)] shrink-0" />}
          </button>
        ))}
      </div>

      <p className="text-sm sm:text-lg font-extrabold text-[var(--text-primary)]">
        🎯 {currentRound.question}
      </p>

      {/* Two Cards Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(['A', 'B'] as const).map((key) => {
          const opt = key === 'A' ? currentRound.optionA : currentRound.optionB;
          const isSelected = userPick === key;

          let cardStyle =
            'bg-[var(--surface-elevated)] border-[var(--border-main)] hover:border-[var(--accent-bioluminescent)]';
          if (hasPicked) {
            if (opt.isOptimal) {
              cardStyle = 'bg-emerald-500/10 border-emerald-500 ring-2 ring-emerald-500/30';
            } else if (isSelected) {
              cardStyle = 'bg-rose-500/10 border-rose-500 ring-2 ring-rose-500/30';
            }
          }

          return (
            <button
              key={key}
              onClick={() => handleChoose(key)}
              className={`p-5 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between space-y-4 ${cardStyle}`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-lg bg-[var(--surface-card)] border border-[var(--border-subtle)] font-mono text-xs font-black text-[var(--accent-bioluminescent)]">
                    PHƯƠNG ÁN {key}
                  </span>
                  {hasPicked && opt.isOptimal && (
                    <span className="inline-flex items-center gap-1 text-xs font-mono font-bold text-emerald-500">
                      <CheckCircle2 className="w-4 h-4" /> CHUẨN QUỐC TẾ
                    </span>
                  )}
                  {hasPicked && isSelected && !opt.isOptimal && (
                    <span className="inline-flex items-center gap-1 text-xs font-mono font-bold text-rose-500">
                      <XCircle className="w-4 h-4" /> CẦN TRÁNH
                    </span>
                  )}
                </div>

                <div className="p-4 rounded-xl bg-[var(--surface-card)] border border-[var(--border-subtle)] space-y-2.5">
                  <h4 className="font-extrabold text-base sm:text-lg text-[var(--text-primary)]">
                    {opt.title}
                  </h4>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-[var(--text-secondary)]">
                    {opt.bullets.map((b, i) => (
                      <li key={i} className="leading-relaxed">
                        • {b}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-2 border-t border-dashed border-[var(--border-subtle)] text-[11px] font-mono text-[var(--text-muted)]">
                    🎨 Thị giác: {opt.visualNote}
                  </div>
                </div>
              </div>

              <div className="text-center py-2 rounded-xl bg-[var(--surface-card)] border border-[var(--border-subtle)] font-mono text-xs font-bold text-[var(--text-primary)]">
                {isSelected ? 'Đã chọn phương án này' : `Bấm chọn Phương án ${key}`}
              </div>
            </button>
          );
        })}
      </div>

      {hasPicked && (
        <div
          className={`p-4 rounded-xl border-2 flex flex-wrap items-center justify-between gap-3 ${
            isUserCorrect ? 'bg-emerald-500/10 border-emerald-500/40' : 'bg-rose-500/10 border-rose-500/40'
          }`}
        >
          <p className="text-sm sm:text-base font-bold text-[var(--text-primary)]">
            💡 {currentRound.explanation}
          </p>
          {roundIdx < SLIDE_ROUNDS.length - 1 && (
            <button
              onClick={() => setRoundIdx((prev) => prev + 1)}
              className="px-4 py-2 rounded-xl bg-[var(--accent-bioluminescent)] text-white font-mono text-xs font-bold cursor-pointer hover:opacity-90 shrink-0"
            >
              Sang Vòng 2 →
            </button>
          )}
        </div>
      )}
    </div>
  );
}
