'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Search,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Trophy,
} from 'lucide-react';

interface StatementItem {
  id: number;
  subject: string;
  aiStatement: string;
  isHallucination: boolean;
  explanation: string;
}

const DETECTIVE_CASES: StatementItem[] = [
  {
    id: 1,
    subject: 'Lịch sử Việt Nam',
    aiStatement:
      '"Ngày 19 tháng 8 năm 1946, cuộc Tổng khởi nghĩa Cách mạng Tháng Tám giành chính quyền thắng lợi tại Hà Nội."',
    isHallucination: true,
    explanation:
      'ẢO GIÁC (SAI NĂM)! Tổng khởi nghĩa Cách mạng Tháng Tám tại Hà Nội diễn ra vào ngày 19/8/1945, không phải năm 1946.',
  },
  {
    id: 2,
    subject: 'Sinh học 12',
    aiStatement:
      '"Trong phân tử ADN mạch kép, Ađênin (A) luôn liên kết bổ sung với Timin (T) bằng 2 liên kết hiđrô, và G với X bằng 3 liên kết hiđrô."',
    isHallucination: false,
    explanation:
      'SỰ THẬT CHUẨN XÁC! Đây là nguyên tắc bổ sung chuẩn trong cấu trúc không gian của phân tử ADN (A-T: 2 liên kết H; G-X: 3 liên kết H).',
  },
  {
    id: 3,
    subject: 'Ngữ văn 11',
    aiStatement:
      '"Trong bài thơ Vội vàng, nhà thơ Huy Cận đã viết hai câu thơ bất hủ: Tôi muốn tắt nắng đi / Cho màu đừng nhạt mất."',
    isHallucination: true,
    explanation:
      'ẢO GIÁC (GÁN SAI TÁC GIẢ)! Bài thơ "Vội vàng" và hai câu thơ trên là của ông hoàng thơ tình Xuân Diệu, không phải Huy Cận!',
  },
  {
    id: 4,
    subject: 'Địa lý địa phương',
    aiStatement:
      '"Trường THPT Trung Phú tọa lạc trên tuyến đường Tỉnh Lộ 8 thuộc địa bàn huyện Củ Chi, Thành phố Hồ Chí Minh."',
    isHallucination: false,
    explanation:
      'SỰ THẬT CHUẨN XÁC! Trường THPT Trung Phú nằm tại số 1318 Tỉnh Lộ 8, xã Tân Thạnh Đông / Phú Hòa Đông, Củ Chi, TP.HCM.',
  },
  {
    id: 5,
    subject: 'Hóa học & Đời sống',
    aiStatement:
      '"Theo thống kê chính thức, vào năm 1945 có tới 98.5% dân số Hà Nội đã tốt nghiệp đại học và thông thạo lập trình máy tính."',
    isHallucination: true,
    explanation:
      'ẢO GIÁC BỊA ĐẶT SỐ LIỆU! Năm 1945, hơn 90% dân số nước ta còn mù chữ và máy tính cá nhân thậm chí còn chưa ra đời!',
  },
];

export default function HallucinationDetective() {
  const [decisions, setDecisions] = useState<Record<number, boolean>>({});

  const answeredCount = Object.keys(decisions).length;
  const correctCount = DETECTIVE_CASES.reduce((acc, item) => {
    const userPickedHallucination = decisions[item.id];
    if (userPickedHallucination === undefined) return acc;
    return acc + (userPickedHallucination === item.isHallucination ? 1 : 0);
  }, 0);

  const handleJudge = (id: number, pickedHallucination: boolean, actualHallucination: boolean) => {
    setDecisions((prev) => ({ ...prev, [id]: pickedHallucination }));
    if (pickedHallucination === actualHallucination) {
      try {
        confetti({
          particleCount: 40,
          spread: 55,
          origin: { y: 0.75 },
        });
      } catch {}
    }
  };

  const resetGame = () => {
    setDecisions({});
  };

  return (
    <div className="bg-[var(--surface-card)] rounded-2xl p-5 sm:p-7 border-2 border-[var(--border-main)] shadow-md space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[var(--border-main)]">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg font-mono text-xs font-extrabold bg-rose-500 text-white uppercase tracking-wider">
            <Search className="w-3.5 h-3.5" />
            GAME THÁM TỬ AI // VẠCH TRẦN ẢO GIÁC (HALLUCINATION)
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] mt-2">
            5 Phát Ngôn Siêu Tự Tin Của AI — Đâu Là Sự Thật, Đâu Là Bịa Đặt?
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3.5 py-1.5 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border-main)] font-mono text-xs font-bold flex items-center gap-1.5">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>
              Phá án đúng: <strong className="text-[var(--accent-bioluminescent)]">{correctCount}</strong> / {DETECTIVE_CASES.length} ({answeredCount} đã xét)
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

      {/* Cases List */}
      <div className="space-y-3.5">
        {DETECTIVE_CASES.map((item) => {
          const userChoice = decisions[item.id];
          const hasAnswered = userChoice !== undefined;
          const isUserCorrect = hasAnswered && userChoice === item.isHallucination;

          return (
            <div
              key={item.id}
              className={`p-4 sm:p-5 rounded-2xl border-2 transition-all space-y-3 ${
                !hasAnswered
                  ? 'bg-[var(--surface-elevated)] border-[var(--border-main)]'
                  : isUserCorrect
                  ? 'bg-emerald-500/10 border-emerald-500/40'
                  : 'bg-rose-500/10 border-rose-500/40'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-[var(--surface-card)] border border-[var(--border-subtle)] font-mono text-xs font-bold text-[var(--accent-bioluminescent)]">
                  Vụ án #{item.id} • {item.subject}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleJudge(item.id, false, item.isHallucination)}
                    className={`px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
                      hasAnswered && userChoice === false
                        ? 'bg-emerald-500 text-white border-emerald-500 shadow-xs'
                        : 'bg-[var(--surface-card)] text-[var(--text-primary)] border-[var(--border-subtle)] hover:border-emerald-500'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Sự Thật Chuẩn</span>
                  </button>

                  <button
                    onClick={() => handleJudge(item.id, true, item.isHallucination)}
                    className={`px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
                      hasAnswered && userChoice === true
                        ? 'bg-rose-500 text-white border-rose-500 shadow-xs'
                        : 'bg-[var(--surface-card)] text-[var(--text-primary)] border-[var(--border-subtle)] hover:border-rose-500'
                    }`}
                  >
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>Bẫy Ảo Giác AI!</span>
                  </button>
                </div>
              </div>

              <p className="text-base sm:text-lg font-bold text-[var(--text-primary)] leading-snug">
                {item.aiStatement}
              </p>

              {hasAnswered && (
                <div className="p-3.5 rounded-xl bg-[var(--surface-card)] border border-[var(--border-subtle)] flex items-start gap-2.5 text-xs sm:text-sm">
                  {isUserCorrect ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <strong className={isUserCorrect ? 'text-emerald-500' : 'text-rose-500'}>
                      {isUserCorrect ? 'Chính xác! ' : 'Bị AI đánh lừa rồi! '}
                    </strong>
                    <span className="text-[var(--text-primary)] font-medium">{item.explanation}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
