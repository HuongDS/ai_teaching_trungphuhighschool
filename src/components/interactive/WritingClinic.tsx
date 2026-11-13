'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Stethoscope,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Trophy,
  Sparkles,
} from 'lucide-react';

interface PatientCase {
  id: number;
  topic: string;
  studentSentence: string;
  errorHighlight: string;
  options: {
    id: string;
    fixedSentence: string;
    isCorrect: boolean;
    diagnosis: string;
    collocationUpgrade: string;
  }[];
}

const CLINIC_CASES: PatientCase[] = [
  {
    id: 1,
    topic: 'Sở thích & Sức khỏe',
    studentSentence: '"I very like play football because it make me health."',
    errorHighlight: 'very like play / make me health',
    options: [
      {
        id: 'c1-a',
        fixedSentence: '"I really enjoy playing football because it keeps me healthy."',
        isCorrect: true,
        diagnosis:
          'Chuẩn xác! (1) Không dùng "very like" → đổi thành "really enjoy" + V-ing (playing). (2) Sau "keeps me" cần tính từ "healthy" chứ không phải danh từ "health".',
        collocationUpgrade: 'Collocation ăn điểm: "keep someone in good shape" / "boost physical fitness".',
      },
      {
        id: 'c1-b',
        fixedSentence: '"I am very like to play football because it makes me health."',
        isCorrect: false,
        diagnosis:
          'Vẫn còn 2 lỗi nặng: "like" là động từ thường nên không đi kèm "am", và "health" vẫn là danh từ đứng sai vị trí.',
        collocationUpgrade: 'Hãy tìm phương án dùng cấu trúc "really enjoy + V-ing" và tính từ "healthy".',
      },
      {
        id: 'c1-c',
        fixedSentence: '"I much like play football for healthy."',
        isCorrect: false,
        diagnosis: 'Cấu trúc "much like play" và "for healthy" là dịch từng chữ từ tiếng Việt (Word-by-word).',
        collocationUpgrade: 'Hãy thử phương án A nhé!',
      },
    ],
  },
  {
    id: 2,
    topic: 'Học tập & Công nghệ AI',
    studentSentence: '"AI help students can learn English more easy than before."',
    errorHighlight: 'help ... can learn / more easy',
    options: [
      {
        id: 'c2-a',
        fixedSentence: '"AI helps students can learning English easier than before."',
        isCorrect: false,
        diagnosis: 'Sau động từ "help + tân ngữ" không bao giờ dùng "can + V-ing".',
        collocationUpgrade: 'Gợi ý: Cấu trúc đúng là "help someone (to) V" + trạng từ bổ nghĩa cho động từ.',
      },
      {
        id: 'c2-b',
        fixedSentence: '"AI helps students learn English much more easily than before."',
        isCorrect: true,
        diagnosis:
          'Chính xác! Chủ ngữ số ít "AI" → "helps"; cấu trúc "help someone + V nguyên mẫu (learn)"; bổ nghĩa cho động từ "learn" phải dùng trạng từ so sánh hơn "more easily".',
        collocationUpgrade: 'Collocation IELTS: "accelerate language acquisition" / "master English effortlessly".',
      },
      {
        id: 'c2-c',
        fixedSentence: '"AI help student learning English more easy."',
        isCorrect: false,
        diagnosis: 'Thiếu chia động từ ngôi thứ 3 số ít ("helps") và dùng tính từ "easy" thay vì trạng từ "easily".',
        collocationUpgrade: 'Hãy chọn phương án B nhé!',
      },
    ],
  },
  {
    id: 3,
    topic: 'Môi trường học đường',
    studentSentence: '"Despite the weather was heavy rain, we went to school on time."',
    errorHighlight: 'Despite + mệnh đề / weather was heavy rain',
    options: [
      {
        id: 'c3-a',
        fixedSentence: '"Despite the heavy rain, we still got to school on time."',
        isCorrect: true,
        diagnosis:
          'Xuất sắc! Sau "Despite / In spite of" phải là một Cụm danh từ ("the heavy rain") hoặc V-ing, tuyệt đối không đi trực tiếp với mệnh đề S + V.',
        collocationUpgrade: 'Idiom nâng cấp: "Come rain or shine, we always arrive on time."',
      },
      {
        id: 'c3-b',
        fixedSentence: '"Although the heavy rain, we went to school on time."',
        isCorrect: false,
        diagnosis: 'Ngược lại với Despite, sau "Although" bắt buộc phải là mệnh đề (S + V), ví dụ: "Although it rained heavily...".',
        collocationUpgrade: 'Hãy chọn phương án A để dùng đúng cụm danh từ sau Despite!',
      },
      {
        id: 'c3-c',
        fixedSentence: '"Despite of raining big, we go to school on time."',
        isCorrect: false,
        diagnosis: '"Despite" không bao giờ đi kèm giới từ "of", và mưa to trong tiếng Anh là "heavy rain" chứ không phải "raining big".',
        collocationUpgrade: 'Hãy chọn phương án A nhé!',
      },
    ],
  },
];

export default function WritingClinic() {
  const [caseIdx, setCaseIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});

  const currentCase = CLINIC_CASES[caseIdx];
  const chosenId = selectedAnswers[currentCase.id];
  const chosenOpt = currentCase.options.find((o) => o.id === chosenId);

  const score = CLINIC_CASES.reduce((acc, c) => {
    const pick = c.options.find((o) => o.id === selectedAnswers[c.id]);
    return acc + (pick?.isCorrect ? 1 : 0);
  }, 0);

  const handleSelect = (optId: string, isCorrect: boolean) => {
    setSelectedAnswers((prev) => ({ ...prev, [currentCase.id]: optId }));
    if (isCorrect) {
      try {
        confetti({
          particleCount: 45,
          spread: 60,
          origin: { y: 0.72 },
        });
      } catch {}
    }
  };

  const resetGame = () => {
    setSelectedAnswers({});
    setCaseIdx(0);
  };

  return (
    <div className="bg-[var(--surface-card)] rounded-2xl p-5 sm:p-7 border-2 border-[var(--border-main)] shadow-md space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[var(--border-main)]">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg font-mono text-xs font-extrabold bg-[var(--accent-bioluminescent)] text-white uppercase tracking-wider">
            <Stethoscope className="w-3.5 h-3.5" />
            GAME PHÒNG KHÁM NGỮ PHÁP // ENGLISH WRITING CLINIC
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] mt-2">
            Bắt Bệnh Câu Tiếng Anh & Nâng Cấp Chuẩn Bản Xứ
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3.5 py-1.5 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border-main)] font-mono text-xs font-bold flex items-center gap-1.5">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>
              Chữa khỏi: <strong className="text-[var(--accent-bioluminescent)]">{score}</strong> / {CLINIC_CASES.length} ca
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

      {/* Case Selector */}
      <div className="grid grid-cols-3 gap-2.5">
        {CLINIC_CASES.map((c, idx) => {
          const picked = c.options.find((o) => o.id === selectedAnswers[c.id]);
          return (
            <button
              key={c.id}
              onClick={() => setCaseIdx(idx)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                idx === caseIdx
                  ? 'border-[var(--accent-bioluminescent)] bg-[var(--accent-bioluminescent)]/15 text-[var(--text-primary)]'
                  : 'border-[var(--border-subtle)] bg-[var(--surface-elevated)] text-[var(--text-secondary)]'
              }`}
            >
              <div className="min-w-0">
                <div className="font-mono text-[11px] font-bold uppercase text-[var(--accent-bioluminescent)]">
                  Ca bệnh #{c.id}
                </div>
                <div className="font-bold text-xs sm:text-sm truncate">{c.topic}</div>
              </div>
              {picked &&
                (picked.isCorrect ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                ))}
            </button>
          );
        })}
      </div>

      {/* Active Patient Card */}
      <div className="p-5 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border-main)] space-y-4">
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
            <span className="font-mono text-xs font-extrabold uppercase text-rose-500">
              CÂU GỐC ĐANG BỊ LỖI NGỮ PHÁP & DÙNG TỪ (WORD-BY-WORD):
            </span>
            <span className="px-2.5 py-0.5 rounded bg-rose-500/20 text-rose-400 font-mono text-xs font-bold">
              Vị trí lỗi: {currentCase.errorHighlight}
            </span>
          </div>
          <p className="text-lg sm:text-2xl font-mono font-bold text-[var(--text-primary)]">
            {currentCase.studentSentence}
          </p>
        </div>

        <div className="space-y-2.5">
          <div className="font-mono text-xs font-bold uppercase text-[var(--text-muted)]">
            HÃY CHỌN PHIÊN BẢN PHẪU THUẬT ĐÚNG CHUẨN NGƯỜI BẢN XỨ:
          </div>
          {currentCase.options.map((opt, idx) => {
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
                onClick={() => handleSelect(opt.id, opt.isCorrect)}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all cursor-pointer flex items-center justify-between gap-3 ${style}`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border-main)] font-mono text-xs font-black flex items-center justify-center shrink-0">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="font-mono text-sm sm:text-lg font-bold">{opt.fixedSentence}</span>
                </div>
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

        {chosenOpt && (
          <div
            className={`p-4 sm:p-5 rounded-xl border-2 space-y-2.5 ${
              chosenOpt.isCorrect
                ? 'bg-emerald-500/10 border-emerald-500/40'
                : 'bg-rose-500/10 border-rose-500/40'
            }`}
          >
            <p className="text-sm sm:text-base font-bold text-[var(--text-primary)]">
              🩺 <strong>Chẩn đoán của Bác sĩ AI:</strong> {chosenOpt.diagnosis}
            </p>
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <span className="text-xs sm:text-sm font-mono font-bold text-[var(--accent-bioluminescent)] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>{chosenOpt.collocationUpgrade}</span>
              </span>

              {chosenOpt.isCorrect && caseIdx < CLINIC_CASES.length - 1 && (
                <button
                  onClick={() => setCaseIdx((prev) => prev + 1)}
                  className="px-4 py-2 rounded-xl bg-[var(--accent-bioluminescent)] text-white font-mono text-xs font-bold cursor-pointer hover:opacity-90"
                >
                  Khám ca tiếp theo →
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
