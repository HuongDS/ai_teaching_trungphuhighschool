'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Cpu,
  Cog,
  Trophy,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Eye,
} from 'lucide-react';

interface DeviceItem {
  id: number;
  name: string;
  isAi: boolean;
  explanation: string;
}

const DEVICES: DeviceItem[] = [
  {
    id: 1,
    name: '1. Máy tính Casio bấm phép tính (25 × 40)',
    isAi: false,
    explanation: 'Lập trình cố định (Fixed rules), cứ bấm đúng công thức là ra kết quả, không tự học từ dữ liệu.',
  },
  {
    id: 2,
    name: '2. Camera giao thông nhận diện biển số xe vi phạm',
    isAi: true,
    explanation: 'Ứng dụng Computer Vision (Thị giác máy tính) đọc hiểu ký tự biển số ở nhiều góc nghiêng, ánh sáng khác nhau.',
  },
  {
    id: 3,
    name: '3. Đèn đường tự bật đúng 18h00 hàng ngày',
    isAi: false,
    explanation: 'Bộ hẹn giờ rơ-le điện tử thông thường (cứ đến giờ là đóng mạch), không có trí tuệ nhân tạo.',
  },
  {
    id: 4,
    name: '4. Thuật toán TikTok / YouTube gợi ý video hợp gu',
    isAi: true,
    explanation: 'Hệ thống AI Recommendation học thói quen xem của từng người để dự đoán video tiếp theo bạn thích.',
  },
  {
    id: 5,
    name: '5. ChatGPT / Gemini tóm tắt bài báo 2000 chữ',
    isAi: true,
    explanation: 'Mô hình ngôn ngữ lớn (LLM - Generative AI) đọc hiểu ngữ cảnh và viết lại bản tóm tắt mới.',
  },
  {
    id: 6,
    name: '6. Lò vi sóng hẹn giờ quay nóng 3 phút',
    isAi: false,
    explanation: 'Bộ đếm ngược thời gian điện tử cơ bản, hết 3 phút thì ngắt điện.',
  },
  {
    id: 7,
    name: '7. Mở khóa điện thoại bằng khuôn mặt (FaceID)',
    isAi: true,
    explanation: 'Mạng nơ-ron AI quét 3D khuôn mặt, nhận ra chủ nhân ngay cả khi đeo kính, đội mũ hoặc thay đổi kiểu tóc.',
  },
  {
    id: 8,
    name: '8. Nồi cơm điện tự nhảy nút Warm khi cơm chín',
    isAi: false,
    explanation: 'Cảm biến rơ-le nhiệt cơ học: khi cạn nước nhiệt độ đáy nồi vượt 100°C làm nam châm mất từ tính và bật lẫy.',
  },
  {
    id: 9,
    name: '9. Google Dịch giọng nói trực tiếp sang Tiếng Anh',
    isAi: true,
    explanation: 'Kết hợp AI nhận dạng giọng nói (Speech-to-Text) và mạng nơ-ron dịch thuật ngữ cảnh.',
  },
  {
    id: 10,
    name: '10. Thang máy dừng đúng tầng khi bấm nút số 5',
    isAi: false,
    explanation: 'Mạch điều khiển tự động hóa theo lệnh bấm nút cố định.',
  },
];

export default function AiClassifier() {
  const [userGuesses, setUserGuesses] = useState<Record<number, boolean>>({});
  const [showAllAnswers, setShowAllAnswers] = useState(false);

  const handleGuess = (item: DeviceItem, guessedAi: boolean) => {
    const alreadyAnswered = userGuesses[item.id] !== undefined;
    const nextGuesses = { ...userGuesses, [item.id]: guessedAi };
    setUserGuesses(nextGuesses);

    if (!alreadyAnswered && guessedAi === item.isAi) {
      const correctCount = DEVICES.filter((d) => nextGuesses[d.id] === d.isAi).length;
      if (correctCount === DEVICES.length || correctCount % 5 === 0) {
        try {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.75 },
          });
        } catch {}
      }
    }
  };

  const resetAll = () => {
    setUserGuesses({});
    setShowAllAnswers(false);
  };

  const answeredCount = Object.keys(userGuesses).length;
  const correctCount = DEVICES.filter(
    (d) => userGuesses[d.id] !== undefined && userGuesses[d.id] === d.isAi
  ).length;

  return (
    <div className="bg-[var(--surface-card)] rounded-2xl p-5 sm:p-7 border-2 border-[var(--border-main)] shadow-md space-y-5">
      {/* Top Game Score & Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[var(--border-main)]">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="px-3 py-1 rounded-lg font-mono text-xs font-extrabold bg-[var(--accent-bioluminescent)] text-white uppercase tracking-wider">
            GAME 2: PHÂN LOẠI 10 THIẾT BỊ QUANH TA
          </span>
          <span className="text-xs sm:text-sm font-semibold text-[var(--text-secondary)]">
            Đã trả lời: <strong className="text-[var(--text-primary)]">{answeredCount}/10</strong>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-600 dark:text-amber-300 font-mono text-xs sm:text-sm font-extrabold">
            <Trophy className="w-4 h-4" />
            <span>Đúng: {correctCount} / 10</span>
          </div>

          <button
            onClick={() => setShowAllAnswers(!showAllAnswers)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[var(--btn-solid-bg)] hover:bg-[var(--btn-solid-hover)] text-[var(--btn-solid-text)] font-mono text-xs font-bold transition-all cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{showAllAnswers ? 'Ẩn đáp án' : 'Mở hết đáp án'}</span>
          </button>

          <button
            onClick={resetAll}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[var(--surface-elevated)] hover:bg-[var(--surface-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-main)] font-mono text-xs font-bold transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Chơi lại</span>
          </button>
        </div>
      </div>

      {/* 10 Devices Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
        {DEVICES.map((item) => {
          const userChoice = userGuesses[item.id];
          const hasGuessed = userChoice !== undefined;
          const isCorrect = hasGuessed && userChoice === item.isAi;
          const isAnswerVisible = showAllAnswers || hasGuessed;

          return (
            <div
              key={item.id}
              className={`p-4 rounded-2xl border-2 transition-all flex flex-col justify-between ${
                hasGuessed
                  ? isCorrect
                    ? 'border-emerald-500/70 bg-emerald-500/5'
                    : 'border-rose-500/70 bg-rose-500/5'
                  : showAllAnswers
                  ? 'border-[var(--accent-bioluminescent)]/50 bg-[var(--surface-elevated)]/60'
                  : 'border-[var(--border-main)] hover:border-[var(--accent-bioluminescent)]/60 bg-[var(--surface-elevated)]/30'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <span className="text-sm sm:text-base font-bold text-[var(--text-primary)] leading-snug">
                  {item.name}
                </span>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleGuess(item, true)}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer border ${
                      userChoice === true
                        ? item.isAi
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                          : 'bg-rose-600 text-white border-rose-600 shadow-xs'
                        : 'bg-[var(--surface-card)] hover:bg-[var(--accent-bioluminescent)] hover:text-white text-[var(--text-primary)] border-[var(--border-main)]'
                    }`}
                  >
                    <Cpu className="w-3.5 h-3.5" />
                    <span>Có AI</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleGuess(item, false)}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer border ${
                      userChoice === false
                        ? !item.isAi
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                          : 'bg-rose-600 text-white border-rose-600 shadow-xs'
                        : 'bg-[var(--surface-card)] hover:bg-slate-600 hover:text-white text-[var(--text-primary)] border-[var(--border-main)]'
                    }`}
                  >
                    <Cog className="w-3.5 h-3.5" />
                    <span>Tự động hóa</span>
                  </button>
                </div>
              </div>

              {isAnswerVisible && (
                <div className="mt-3 pt-2.5 border-t border-[var(--border-subtle)] flex items-start gap-2 text-xs sm:text-sm">
                  {hasGuessed && (
                    isCorrect ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-mono text-[11px] font-extrabold bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        ĐÚNG
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-mono text-[11px] font-extrabold bg-rose-500/20 text-rose-600 dark:text-rose-400 shrink-0">
                        <XCircle className="w-3.5 h-3.5" />
                        SAI
                      </span>
                    )
                  )}

                  <span
                    className={`inline-block px-2 py-0.5 rounded-md text-[11px] font-mono font-bold uppercase shrink-0 ${
                      item.isAi
                        ? 'bg-[var(--accent-bioluminescent)]/20 text-[var(--accent-bioluminescent)]'
                        : 'bg-[var(--border-subtle)] text-[var(--text-secondary)]'
                    }`}
                  >
                    {item.isAi ? 'CÓ AI' : 'TỰ ĐỘNG HÓA'}
                  </span>

                  <span className="text-[var(--text-secondary)] leading-snug">
                    {item.explanation}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
