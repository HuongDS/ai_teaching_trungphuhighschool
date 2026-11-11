'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

export default function RubricProclamation() {
  const [secondsLeft, setSecondsLeft] = useState(3 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [scores, setScores] = useState({
    prompting: 25,
    quality: 30,
    criticalThinking: 20,
    presentation: 15,
    ethics: 10
  });

  const totalScore =
    scores.prompting +
    scores.quality +
    scores.criticalThinking +
    scores.presentation +
    scores.ethics;

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      setIsRunning(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, secondsLeft]);

  const triggerCelebration = () => {
    confetti({
      particleCount: 140,
      spread: 90,
      origin: { y: 0.6 }
    });
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-[var(--surface-card)] rounded-2xl p-6 sm:p-8 border border-[var(--border-main)] shadow-xs mt-6 transition-colors">
      {/* 3-Minute Presentation Section */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <span className="inline-flex items-center px-3 py-1 rounded-md font-mono text-xs font-bold bg-[var(--accent-bioluminescent)]/15 text-[var(--accent-bioluminescent)] uppercase tracking-[0.14em]">
            [BÁO CÁO DỰ ÁN CUỐI KHÓA]
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)] mt-2">
            Đồng Hồ Thuyết Trình 03 Phút / Nhóm
          </h3>
          <p className="text-[var(--text-secondary)] text-base sm:text-lg mt-1">
            Đúng 3 phút chuông reo kết thúc báo cáo + 1 phút phản biện nhanh từ thầy cô và các nhóm bạn!
          </p>
        </div>

        {/* 3 min timer */}
        <div className="flex items-center gap-3 sm:gap-4 bg-[var(--surface-elevated)] border border-[var(--border-main)] px-5 py-2.5 rounded-xl text-[var(--text-primary)] shadow-xs">
          <div className="text-3xl sm:text-4xl font-mono font-extrabold text-[var(--accent-bioluminescent)]">
            {formatTime(secondsLeft)}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className="px-3 py-1.5 rounded-lg bg-[var(--btn-solid-bg)] hover:bg-[var(--btn-solid-hover)] text-[var(--btn-solid-text)] font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
            >
              {isRunning ? '[TẠM DỪNG]' : '[CHẠY]'}
            </button>
            <button
              onClick={() => {
                setIsRunning(false);
                setSecondsLeft(3 * 60);
              }}
              className="px-3 py-1.5 rounded-lg bg-[var(--surface-card)] hover:bg-[var(--surface-hover)] border border-[var(--border-main)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
            >
              [ĐẶT LẠI]
            </button>
          </div>
        </div>
      </div>

      {/* Rubric Score Calculator */}
      <div className="p-5 sm:p-6 bg-[var(--surface-elevated)] rounded-xl border border-[var(--border-main)] mb-8">
        <div className="flex items-center justify-between gap-4 mb-4">
          <h4 className="text-base sm:text-lg font-mono font-bold uppercase tracking-[0.14em] text-[var(--text-primary)]">
            [BẢNG CHẤM ĐIỂM RUBRIC // THANG 100 ĐIỂM]
          </h4>
          <div className="text-base sm:text-lg font-mono font-extrabold text-[var(--accent-bioluminescent)] bg-[var(--surface-card)] px-4 py-1.5 rounded-lg border border-[var(--border-subtle)]">
            TỔNG ĐIỂM: {totalScore} / 100
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <div className="p-3 bg-[var(--surface-card)] rounded-lg border border-[var(--border-subtle)]">
            <div className="text-[11px] font-mono text-[var(--text-muted)] font-bold uppercase tracking-wider mb-1">1. Prompt R-T-C-C-F (25đ)</div>
            <input
              type="number"
              min={0}
              max={25}
              value={scores.prompting}
              onChange={(e) => setScores({ ...scores, prompting: Number(e.target.value) })}
              className="w-full text-xl font-mono font-bold text-[var(--text-primary)] bg-[var(--surface-elevated)] p-2 rounded border border-[var(--border-main)]"
            />
          </div>
          <div className="p-3 bg-[var(--surface-card)] rounded-lg border border-[var(--border-subtle)]">
            <div className="text-[11px] font-mono text-[var(--text-muted)] font-bold uppercase tracking-wider mb-1">2. Thực tiễn (30đ)</div>
            <input
              type="number"
              min={0}
              max={30}
              value={scores.quality}
              onChange={(e) => setScores({ ...scores, quality: Number(e.target.value) })}
              className="w-full text-xl font-mono font-bold text-[var(--text-primary)] bg-[var(--surface-elevated)] p-2 rounded border border-[var(--border-main)]"
            />
          </div>
          <div className="p-3 bg-[var(--surface-card)] rounded-lg border border-[var(--border-subtle)]">
            <div className="text-[11px] font-mono text-[var(--text-muted)] font-bold uppercase tracking-wider mb-1">3. Kiểm chứng (20đ)</div>
            <input
              type="number"
              min={0}
              max={20}
              value={scores.criticalThinking}
              onChange={(e) => setScores({ ...scores, criticalThinking: Number(e.target.value) })}
              className="w-full text-xl font-mono font-bold text-[var(--text-primary)] bg-[var(--surface-elevated)] p-2 rounded border border-[var(--border-main)]"
            />
          </div>
          <div className="p-3 bg-[var(--surface-card)] rounded-lg border border-[var(--border-subtle)]">
            <div className="text-[11px] font-mono text-[var(--text-muted)] font-bold uppercase tracking-wider mb-1">4. Thuyết trình (15đ)</div>
            <input
              type="number"
              min={0}
              max={15}
              value={scores.presentation}
              onChange={(e) => setScores({ ...scores, presentation: Number(e.target.value) })}
              className="w-full text-xl font-mono font-bold text-[var(--text-primary)] bg-[var(--surface-elevated)] p-2 rounded border border-[var(--border-main)]"
            />
          </div>
          <div className="p-3 bg-[var(--surface-card)] rounded-lg border border-[var(--border-subtle)]">
            <div className="text-[11px] font-mono text-[var(--text-muted)] font-bold uppercase tracking-wider mb-1">5. Trách nhiệm (10đ)</div>
            <input
              type="number"
              min={0}
              max={10}
              value={scores.ethics}
              onChange={(e) => setScores({ ...scores, ethics: Number(e.target.value) })}
              className="w-full text-xl font-mono font-bold text-[var(--text-primary)] bg-[var(--surface-elevated)] p-2 rounded border border-[var(--border-main)]"
            />
          </div>
        </div>
      </div>

      {/* Grand Proclamation Card */}
      <div className="p-8 sm:p-10 bg-[var(--surface-elevated)] border-2 border-[var(--accent-bioluminescent)]/60 rounded-2xl relative overflow-hidden shadow-lg">
        <div className="relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[var(--accent-bioluminescent)] block mb-1">
                [LỄ TỐT NGHIỆP // 3 NGUYÊN TẮC]
              </span>
              <h4 className="text-xl sm:text-3xl font-extrabold uppercase tracking-wide text-[var(--text-primary)]">
                Bản Tuyên Ngôn: &ldquo;Học Thông Minh Cùng AI&rdquo;
              </h4>
            </div>
            <button
              onClick={triggerCelebration}
              className="px-5 py-2.5 rounded-lg font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.14em] bg-aurora-gradient flex items-center gap-2 shadow-sm transition-all cursor-pointer hover:opacity-95 text-slate-950 font-black"
            >
              [KÍCH HOẠT PHÁO HOA]
            </button>
          </div>

          <div className="space-y-4 text-base sm:text-xl font-medium leading-relaxed">
            <div className="p-4 sm:p-5 bg-[var(--surface-card)] rounded-xl border border-[var(--border-subtle)]">
              <span className="text-[var(--accent-bioluminescent)] font-mono font-black uppercase text-sm sm:text-base block mb-1">
                1. TÔI LÀ NGƯỜI CẦM LÁI
              </span>
              AI chỉ là trợ lý đắc lực, bộ não và tư duy của tôi mới là người quyết định cuối cùng!
            </div>
            <div className="p-4 sm:p-5 bg-[var(--surface-card)] rounded-xl border border-[var(--border-subtle)]">
              <span className="text-emerald-400 font-mono font-black uppercase text-sm sm:text-base block mb-1">
                2. TÔI KHÔNG HỌC VẸT
              </span>
              Tôi không dùng AI để chép bài đối phó. Tôi dùng AI để hiểu sâu hơn, học nhanh hơn và sáng tạo độc bản!
            </div>
            <div className="p-4 sm:p-5 bg-[var(--surface-card)] rounded-xl border border-[var(--border-subtle)]">
              <span className="text-cyan-400 font-mono font-black uppercase text-sm sm:text-base block mb-1">
                3. TÔI CÓ TRÁCH NHIỆM
              </span>
              Tôi luôn kiểm chứng sự thật, bảo vệ thông tin cá nhân và sử dụng công nghệ vì những điều tử tế!
            </div>
          </div>

          <div className="mt-6 text-center text-xs sm:text-sm font-mono text-[var(--text-muted)] uppercase tracking-wider">
            [TOÀN THỂ HỌC SINH ĐỒNG THANH ĐỌC VANG 3 ĐIỀU TUYÊN NGÔN BẾ MẠC]
          </div>
        </div>
      </div>
    </div>
  );
}
