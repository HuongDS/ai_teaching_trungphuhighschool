'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Atom,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Trophy,
  Lightbulb,
} from 'lucide-react';

interface QuizQuestion {
  id: number;
  subjectBadge: string;
  feynmanAnalogy: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const SAMPLE_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    subjectBadge: 'Sinh học — Tế bào',
    feynmanAnalogy:
      'Ẩn dụ Feynman: Hãy tưởng tượng tế bào là một thành phố thu nhỏ, trong đó có những "nhà máy nhiệt điện" chuyên đốt cháy phân tử đường Glucose để sản xuất ra các "đồng tiền năng lượng ATP" nuôi sống toàn thành phố.',
    question:
      'Dựa trên ẩn dụ Feynman của AI ở trên, bào quan nào đóng vai trò là "nhà máy điện" của tế bào?',
    options: [
      'A. Bộ máy Gôngi (Trạm đóng gói bưu kiện)',
      'B. Ti thể — Mitochondria (Nhà máy phát điện sản sinh ATP)',
      'C. Không bào (Kho chứa nước và chất thải)',
      'D. Mạng lưới nội chất (Hệ thống đường giao thông)',
    ],
    correctIndex: 1,
    explanation:
      'Chính xác! Ti thể thực hiện hô hấp tế bào, phân giải chất hữu cơ tạo ra ATP — đồng tiền năng lượng của mọi hoạt động sống.',
  },
  {
    id: 2,
    subjectBadge: 'Vật lý — Dao động',
    feynmanAnalogy:
      'Ẩn dụ Feynman: Khi bạn đẩy một chiếc xích đu, nếu bạn đẩy đúng nhịp lúc xích đu vừa lùi hết cỡ, chỉ cần lực đẩy nhẹ cũng làm xích đu văng ngày càng cao vút.',
    question:
      'Hình ảnh đẩy xích đu đúng nhịp giúp học sinh hiểu ngay bản chất của hiện tượng vật lý nào?',
    options: [
      'A. Hiện tượng khúc xạ ánh sáng',
      'B. Hiện tượng cộng hưởng cơ học (Khi tần số ngoại lực bằng tần số riêng)',
      'C. Định luật bảo toàn điện tích',
      'D. Chuyển động thẳng đều',
    ],
    correctIndex: 1,
    explanation:
      'Chuẩn xác! Khi tần số lực cưỡng bức bằng tần số dao động riêng (đẩy đúng nhịp xích đu), biên độ dao động đạt cực đại — đó là Cộng hưởng!',
  },
  {
    id: 3,
    subjectBadge: 'Phương pháp Ôn thi AI',
    feynmanAnalogy:
      'Nguyên lý Khoa học Thần kinh: Đọc đi đọc lại trang sách 10 lần chỉ tạo cảm giác "quen mắt" giả tạo. Muốn nhớ bài sâu gấp 5 lần, não bộ phải tự lục lại thông tin qua câu hỏi trắc nghiệm.',
    question:
      'Khi dùng AI tạo đề trắc nghiệm tự ôn thi theo phương pháp Active Recall, quy tắc bắt buộc nào phải ghi trong Prompt?',
    options: [
      'A. "Hãy tô đậm đáp án đúng ngay bên cạnh câu hỏi"',
      'B. "Hãy giấu toàn bộ đáp án ở phần cuối cùng hoặc chờ tôi trả lời từng câu rồi mới chấm"',
      'C. "Chỉ tạo câu hỏi dễ không cần suy nghĩ"',
      'D. "Hãy làm hộ luôn bài tập về nhà cho tôi"',
    ],
    correctIndex: 1,
    explanation:
      'Tuyệt vời! Giấu đáp án buộc não bộ phải chủ động truy xuất kiến thức (Active Recall), giúp khắc sâu vào trí nhớ dài hạn trước kỳ thi.',
  },
];

export default function QuizActiveRecall() {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});

  const currentQ = SAMPLE_QUESTIONS[currentIdx];
  const userChoice = selectedAnswers[currentQ.id];
  const hasAnswered = userChoice !== undefined;
  const isCorrect = userChoice === currentQ.correctIndex;

  const score = SAMPLE_QUESTIONS.reduce((acc, q) => {
    return acc + (selectedAnswers[q.id] === q.correctIndex ? 1 : 0);
  }, 0);

  const handleSelect = (optionIdx: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [currentQ.id]: optionIdx }));
    if (optionIdx === currentQ.correctIndex) {
      try {
        confetti({
          particleCount: 45,
          spread: 60,
          origin: { y: 0.72 },
        });
      } catch {}
    }
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
    setCurrentIdx(0);
  };

  return (
    <div className="bg-[var(--surface-card)] rounded-2xl p-5 sm:p-7 border-2 border-[var(--border-main)] shadow-md space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[var(--border-main)]">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg font-mono text-xs font-extrabold bg-[var(--accent-bioluminescent)] text-white uppercase tracking-wider">
            <Atom className="w-3.5 h-3.5" />
            GAME ĐẤU TRƯỜNG KHOA HỌC // FEYNMAN & ACTIVE RECALL
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] mt-2">
            Giải Mã Ẩn Dụ Feynman & Đấu Trí Trắc Nghiệm Tự Nhiên
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3.5 py-1.5 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border-main)] font-mono text-xs font-bold flex items-center gap-1.5">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>
              Điểm số: <strong className="text-[var(--accent-bioluminescent)]">{score}</strong> / {SAMPLE_QUESTIONS.length}
            </span>
          </div>
          <button
            onClick={resetQuiz}
            className="p-2 rounded-xl bg-[var(--surface-elevated)] hover:bg-[var(--surface-hover)] text-[var(--text-secondary)] border border-[var(--border-main)] cursor-pointer"
            title="Làm lại đề"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Question Tabs */}
      <div className="grid grid-cols-3 gap-2.5">
        {SAMPLE_QUESTIONS.map((q, idx) => {
          const ans = selectedAnswers[q.id];
          return (
            <button
              key={q.id}
              onClick={() => setCurrentIdx(idx)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                idx === currentIdx
                  ? 'border-[var(--accent-bioluminescent)] bg-[var(--accent-bioluminescent)]/15 text-[var(--text-primary)]'
                  : 'border-[var(--border-subtle)] bg-[var(--surface-elevated)] text-[var(--text-secondary)]'
              }`}
            >
              <div className="min-w-0">
                <div className="font-mono text-[11px] font-bold uppercase text-[var(--accent-bioluminescent)]">
                  Câu 0{q.id}
                </div>
                <div className="font-bold text-xs sm:text-sm truncate">{q.subjectBadge}</div>
              </div>
              {ans !== undefined &&
                (ans === q.correctIndex ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                ))}
            </button>
          );
        })}
      </div>

      {/* Active Question Stage */}
      <div className="p-5 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border-main)] space-y-4">
        <div className="p-4 rounded-xl bg-[var(--surface-card)] border border-[var(--accent-bioluminescent)]/40 flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm text-[var(--text-primary)] leading-relaxed font-medium">
            {currentQ.feynmanAnalogy}
          </p>
        </div>

        <h4 className="text-base sm:text-xl font-extrabold text-[var(--text-primary)]">
          Câu {currentQ.id}: {currentQ.question}
        </h4>

        <div className="grid grid-cols-1 gap-2.5">
          {currentQ.options.map((opt, idx) => {
            const isSelected = userChoice === idx;
            const rightOpt = idx === currentQ.correctIndex;

            let btnStyle =
              'border-[var(--border-subtle)] bg-[var(--surface-card)] text-[var(--text-primary)] hover:border-[var(--accent-bioluminescent)]';
            if (hasAnswered) {
              if (rightOpt) {
                btnStyle = 'border-emerald-500 bg-emerald-500/15 text-[var(--text-primary)] font-bold ring-1 ring-emerald-500';
              } else if (isSelected) {
                btnStyle = 'border-rose-500 bg-rose-500/15 text-[var(--text-primary)]';
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                className={`p-4 rounded-xl border-2 text-left text-sm sm:text-base font-semibold transition-all cursor-pointer flex items-center justify-between gap-3 ${btnStyle}`}
              >
                <span>{opt}</span>
                {hasAnswered && rightOpt && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                )}
                {hasAnswered && isSelected && !rightOpt && (
                  <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {hasAnswered && (
          <div
            className={`p-4 rounded-xl border-2 flex flex-wrap items-center justify-between gap-3 ${
              isCorrect ? 'bg-emerald-500/10 border-emerald-500/40' : 'bg-rose-500/10 border-rose-500/40'
            }`}
          >
            <p className="text-sm sm:text-base font-bold text-[var(--text-primary)]">
              💡 {currentQ.explanation}
            </p>
            {currentIdx < SAMPLE_QUESTIONS.length - 1 && (
              <button
                onClick={() => setCurrentIdx((prev) => prev + 1)}
                className="px-4 py-2 rounded-xl bg-[var(--accent-bioluminescent)] text-white font-mono text-xs font-bold cursor-pointer hover:opacity-90 shrink-0"
              >
                Sang Câu {currentIdx + 2} →
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
