'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Brain,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Trophy,
  Compass,
  Sparkles,
} from 'lucide-react';

interface SocraticStep {
  step: number;
  aiQuestion: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    aiReply: string;
  }[];
}

const SOCRATIC_PUZZLE_STEPS: SocraticStep[] = [
  {
    step: 1,
    aiQuestion:
      'Gia sư AI (Chế độ Socratic): "Thầy sẽ không đưa đáp án màu lông con gấu ngay đâu! Trước hết, trên mặt phẳng thông thường, nếu đi 1km Nam → 1km Đông → 1km Bắc thì ta tạo thành hình chữ U và không thể về điểm xuất phát. Nhưng vì sao trên Trái Đất người thợ săn lại quay về đúng điểm ban đầu?"',
    options: [
      {
        id: 's1-a',
        text: 'A. Vì người thợ săn đi lạc đường và nhìn nhầm la bàn.',
        isCorrect: false,
        aiReply:
          'Chưa đúng rồi! Đề bài khẳng định la bàn hoàn toàn chính xác. Hãy nhớ tới hình dạng thực sự của Trái Đất nhé!',
      },
      {
        id: 's1-b',
        text: 'B. Vì Trái Đất hình cầu, và người đó xuất phát từ một điểm cực đặc biệt nơi các đường kinh tuyến chụm lại!',
        isCorrect: true,
        aiReply:
          'Tư duy sắc bén lắm! Trên hình cầu, các đường kinh tuyến Bắc - Nam chụm lại tại một điểm duy nhất ở hai cực.',
      },
      {
        id: 's1-c',
        text: 'C. Vì con gấu đã dịch chuyển điểm xuất phát của người thợ săn.',
        isCorrect: false,
        aiReply:
          'Haha, con gấu không làm thế đâu! Đây là một bài toán hình học địa lý trên bề mặt Trái Đất.',
      },
    ],
  },
  {
    step: 2,
    aiQuestion:
      'Gia sư AI (Bước gợi mở 2/3): "Giỏi lắm! Bây giờ hãy suy luận tiếp: Ngay bước đầu tiên, người thợ săn đi 1km về hướng NAM, sau đó đi sang Đông rồi đi ngược 1km về hướng BẮC là chạm đúng điểm xuất phát. Vậy điểm xuất phát ban đầu đó nằm ở đâu trên Trái Đất?"',
    options: [
      {
        id: 's2-a',
        text: 'A. Điểm Cực Bắc (Bắc Cực) — nơi mọi hướng đi ra từ đó đều là hướng Nam!',
        isCorrect: true,
        aiReply:
          'Chính xác 100%! Khi đứng ở đỉnh Cực Bắc, đi xuống 1km Nam, đi vòng ngang 1km Đông theo vĩ tuyến, rồi đi lên 1km Bắc sẽ hội tụ về đúng đỉnh Cực Bắc!',
      },
      {
        id: 's2-b',
        text: 'B. Đường Xích Đạo.',
        isCorrect: false,
        aiReply:
          'Ở Xích Đạo các đường kinh tuyến gần như song song nhau nên đi Nam → Đông → Bắc sẽ không quay về điểm cũ được. Thử lại nhé!',
      },
      {
        id: 's2-c',
        text: 'C. Điểm Cực Nam (Nam Cực).',
        isCorrect: false,
        aiReply:
          'Nếu đứng ở Cực Nam thì mọi hướng nhìn ra đều là hướng Bắc, không thể đi bước đầu tiên về hướng Nam được (và Nam Cực chỉ có chim cánh cụt chứ không có gấu!).',
      },
    ],
  },
  {
    step: 3,
    aiQuestion:
      'Gia sư AI (Bước chốt hạ 3/3): "Bây giờ thì em đã tự nắm trong tay chìa khóa cuối cùng rồi đấy! Ở vùng Cực Bắc băng tuyết trắng xóa quanh năm, loài gấu sinh sống tự nhiên ở đó có bộ lông màu gì?"',
    options: [
      {
        id: 's3-a',
        text: 'A. Màu Nâu (Gấu xám Bắc Mỹ).',
        isCorrect: false,
        aiReply: 'Gần đúng vùng địa lý nhưng ngay tại chỏm băng Cực Bắc thì loài gấu đặc trưng có màu khác cơ!',
      },
      {
        id: 's3-b',
        text: 'B. Màu Đen Trắng (Gấu trúc).',
        isCorrect: false,
        aiReply: 'Gấu trúc ăn tre trúc ở vùng núi ôn đới chứ không sống giữa băng tuyết Cực Bắc đâu nhé!',
      },
      {
        id: 's3-c',
        text: 'C. Màu TRẮNG (Gấu Bắc Cực — Polar Bear) để ngụy trang trên băng tuyết!',
        isCorrect: true,
        aiReply:
          'XUẤT SẮC! Chính em đã tự mình giải mã trọn vẹn bài toán hóc búa nhờ phương pháp Socratic mà không cần chép đáp án!',
      },
    ],
  },
];

export default function SocraticSimulator() {
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});

  const currentStep = SOCRATIC_PUZZLE_STEPS[currentStepIdx];
  const chosenId = selectedAnswers[currentStep.step];
  const chosenOption = currentStep.options.find((o) => o.id === chosenId);

  const solvedCount = SOCRATIC_PUZZLE_STEPS.reduce((acc, st) => {
    const pick = st.options.find((o) => o.id === selectedAnswers[st.step]);
    return acc + (pick?.isCorrect ? 1 : 0);
  }, 0);

  const handlePick = (optId: string, isCorrect: boolean) => {
    setSelectedAnswers((prev) => ({ ...prev, [currentStep.step]: optId }));
    if (isCorrect) {
      try {
        confetti({
          particleCount: 50,
          spread: 65,
          origin: { y: 0.72 },
        });
      } catch {}
    }
  };

  const resetGame = () => {
    setSelectedAnswers({});
    setCurrentStepIdx(0);
  };

  return (
    <div className="bg-[var(--surface-card)] rounded-2xl p-5 sm:p-7 border-2 border-[var(--border-main)] shadow-md space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[var(--border-main)]">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg font-mono text-xs font-extrabold bg-[var(--accent-bioluminescent)] text-white uppercase tracking-wider">
            <Brain className="w-3.5 h-3.5" />
            GAME TƯ DUY SOCRATIC // GIẢI ĐỐ CÙNG GIA SƯ AI
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] mt-2">
            Thử Thách: Con Gấu Có Màu Gì? (3 Bước Tự Suy Luận)
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3.5 py-1.5 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border-main)] font-mono text-xs font-bold flex items-center gap-1.5">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>
              Mở khóa tư duy: <strong className="text-[var(--accent-bioluminescent)]">{solvedCount}</strong> / 3 bước
            </span>
          </div>
          <button
            onClick={resetGame}
            className="p-2 rounded-xl bg-[var(--surface-elevated)] hover:bg-[var(--surface-hover)] text-[var(--text-secondary)] border border-[var(--border-main)] cursor-pointer"
            title="Chơi lại từ đầu"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Riddle Box */}
      <div className="p-4 rounded-xl bg-[var(--surface-elevated)] border border-[var(--accent-bioluminescent)]/40 flex items-start gap-3">
        <Compass className="w-5 h-5 text-[var(--accent-bioluminescent)] shrink-0 mt-0.5" />
        <p className="text-xs sm:text-sm text-[var(--text-primary)] font-semibold leading-relaxed">
          <strong className="text-[var(--accent-bioluminescent)] font-mono uppercase">Đề bài: </strong>
          Một người thợ săn đi 1km về phía Nam, sau đó đi 1km về phía Đông, rồi đi 1km về phía Bắc và thấy mình quay trở về đúng điểm xuất phát ban đầu. Ông nhìn thấy một con gấu. Hỏi con gấu màu gì?
        </p>
      </div>

      {/* Step Navigation */}
      <div className="grid grid-cols-3 gap-2.5">
        {SOCRATIC_PUZZLE_STEPS.map((st, idx) => {
          const picked = st.options.find((o) => o.id === selectedAnswers[st.step]);
          return (
            <button
              key={st.step}
              onClick={() => setCurrentStepIdx(idx)}
              className={`p-3 rounded-xl border font-mono text-xs font-bold flex items-center justify-between cursor-pointer transition-all ${
                idx === currentStepIdx
                  ? 'border-[var(--accent-bioluminescent)] bg-[var(--accent-bioluminescent)]/15 text-[var(--text-primary)]'
                  : 'border-[var(--border-subtle)] bg-[var(--surface-elevated)] text-[var(--text-secondary)]'
              }`}
            >
              <span>Gợi mở #{st.step}</span>
              {picked &&
                (picked.isCorrect ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-500" />
                ))}
            </button>
          );
        })}
      </div>

      {/* Interactive Socratic Question & Options */}
      <div className="p-5 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border-main)] space-y-4">
        <div className="p-4 rounded-xl bg-[var(--surface-card)] border border-[var(--border-subtle)] text-sm sm:text-lg font-bold text-[var(--text-primary)] leading-relaxed">
          🤖 {currentStep.aiQuestion}
        </div>

        <div className="grid grid-cols-1 gap-2.5">
          {currentStep.options.map((opt) => {
            const isSelected = chosenId === opt.id;
            let style =
              'bg-[var(--surface-card)] border-[var(--border-subtle)] hover:border-[var(--accent-bioluminescent)] text-[var(--text-primary)]';
            if (isSelected) {
              style = opt.isCorrect
                ? 'bg-emerald-500/15 border-emerald-500 text-[var(--text-primary)] ring-2 ring-emerald-500/40'
                : 'bg-rose-500/15 border-rose-500 text-[var(--text-primary)] ring-2 ring-rose-500/40';
            }

            return (
              <button
                key={opt.id}
                onClick={() => handlePick(opt.id, opt.isCorrect)}
                className={`p-4 rounded-xl border-2 text-left text-sm sm:text-base font-semibold transition-all cursor-pointer flex items-center justify-between gap-3 ${style}`}
              >
                <span>{opt.text}</span>
                {isSelected &&
                  (opt.isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                  ))}
              </button>
            );
          })}
        </div>

        {chosenOption && (
          <div
            className={`p-4 rounded-xl border-2 flex flex-wrap items-center justify-between gap-3 ${
              chosenOption.isCorrect
                ? 'bg-emerald-500/10 border-emerald-500/40'
                : 'bg-rose-500/10 border-rose-500/40'
            }`}
          >
            <div className="space-y-1">
              <span
                className={`font-mono text-xs font-extrabold uppercase flex items-center gap-1.5 ${
                  chosenOption.isCorrect ? 'text-emerald-500' : 'text-rose-500'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>{chosenOption.isCorrect ? 'SUY LUẬN CHÍNH XÁC!' : 'GỢI Ý THÊM TỪ GIA SƯ AI:'}</span>
              </span>
              <p className="text-sm sm:text-base font-bold text-[var(--text-primary)]">
                {chosenOption.aiReply}
              </p>
            </div>

            {chosenOption.isCorrect && currentStepIdx < SOCRATIC_PUZZLE_STEPS.length - 1 && (
              <button
                onClick={() => setCurrentStepIdx((prev) => prev + 1)}
                className="px-4 py-2 rounded-xl bg-[var(--accent-bioluminescent)] text-white font-mono text-xs font-bold cursor-pointer hover:opacity-90 shrink-0"
              >
                Sang Bước Gợi Mở {currentStepIdx + 2} →
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
