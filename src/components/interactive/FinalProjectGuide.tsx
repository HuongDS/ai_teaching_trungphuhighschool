'use client';

import React, { useState, useEffect } from 'react';

export default function FinalProjectGuide() {
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

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

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const projectThemes = [
    {
      id: 1,
      title: 'Chủ đề 1: Sổ tay Tự học Tiếng Anh cấp tốc',
      target: 'Môn Ngoại ngữ',
      desc: 'Bộ 30 từ vựng theo chủ đề THPT + 3 đoạn hội thoại tự nhiên + 5 bài tập thực hành do nhóm prompt AI tạo ra.'
    },
    {
      id: 2,
      title: 'Chủ đề 2: Cẩm nang Vượt vũ môn Lịch sử / Địa lý',
      target: 'Môn Xã hội',
      desc: 'Sơ đồ hóa 3 sự kiện lịch sử/địa lý trọng tâm + bộ 10 câu trắc nghiệm thách đố kiểm tra kiến thức.'
    },
    {
      id: 3,
      title: 'Chủ đề 3: Cẩm nang Phòng chống bắt nạt trên không gian mạng',
      target: 'Kỹ năng sống',
      desc: 'Bộ thông điệp tuyên truyền văn minh số + kịch bản video ngắn TikTok/Reels bảo vệ học sinh.'
    },
    {
      id: 4,
      title: 'Chủ đề 4: Kế hoạch 30 ngày "Trường học Xanh"',
      target: 'Đời sống học đường',
      desc: 'Kế hoạch hành động giảm rác thải nhựa tại căng-tin trường + nội dung poster tuyên truyền.'
    }
  ];

  return (
    <div className="bg-[var(--surface-card)] rounded-2xl p-6 sm:p-8 border border-[var(--border-main)] shadow-xs mt-6 transition-colors">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <span className="inline-flex items-center px-3 py-1 rounded-md font-mono text-xs font-bold bg-[var(--accent-bioluminescent)]/15 text-[var(--accent-bioluminescent)] uppercase tracking-[0.14em]">
            [XƯỞNG SÁNG TẠO NHÓM]
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)] mt-2">
            Đồng Hồ Thực Chiến Nhóm 25 Phút (Classroom Timer)
          </h3>
          <p className="text-[var(--text-secondary)] text-base sm:text-lg mt-1">
            Bật đếm ngược để cả lớp cùng tập trung cao độ tạo ra 80% sản phẩm dự án cuối khóa!
          </p>
        </div>

        {/* Big Timer Controls */}
        <div className="flex items-center gap-3 sm:gap-4 bg-[var(--surface-elevated)] border border-[var(--border-main)] px-5 py-2.5 rounded-xl text-[var(--text-primary)] shadow-xs">
          <div className="text-3xl sm:text-4xl font-mono font-extrabold text-[var(--accent-bioluminescent)]">
            {formatTime(secondsLeft)}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className="px-3 py-1.5 rounded-lg bg-[var(--btn-solid-bg)] hover:bg-[var(--btn-solid-hover)] text-[var(--btn-solid-text)] font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
            >
              {isRunning ? '[DỪNG]' : '[CHẠY]'}
            </button>
            <button
              onClick={() => {
                setIsRunning(false);
                setSecondsLeft(25 * 60);
              }}
              className="px-3 py-1.5 rounded-lg bg-[var(--surface-card)] hover:bg-[var(--surface-hover)] border border-[var(--border-main)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
            >
              [ĐẶT LẠI]
            </button>
          </div>
        </div>
      </div>

      {/* 4 Themes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {projectThemes.map((theme) => (
          <div key={theme.id} className="p-5 rounded-xl border border-[var(--border-main)] bg-[var(--surface-elevated)]/60 hover:bg-[var(--surface-elevated)] transition-all">
            <span className="text-[11px] font-mono font-extrabold px-2 py-0.5 rounded bg-[var(--accent-bioluminescent)]/15 text-[var(--accent-bioluminescent)] uppercase tracking-wider">
              {theme.target}
            </span>
            <h4 className="text-base sm:text-lg font-bold text-[var(--text-primary)] mt-2 mb-1">{theme.title}</h4>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{theme.desc}</p>
          </div>
        ))}
      </div>

      {/* 4 Roles in team */}
      <div className="p-5 bg-[var(--surface-elevated)] rounded-xl border border-[var(--border-main)]">
        <h4 className="text-sm sm:text-base font-mono font-bold uppercase tracking-[0.14em] text-[var(--accent-bioluminescent)] mb-3">
          [MA TRẬN PHÂN VAI TÁC CHIẾN // 4 THÀNH VIÊN]
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
          <div className="p-3.5 bg-[var(--surface-card)] rounded-lg border border-[var(--border-subtle)] text-[var(--text-secondary)]">
            <strong className="text-[var(--accent-bioluminescent)] font-mono block mb-1">1. Thư ký - Nhập liệu:</strong> Trực tiếp gõ máy/điện thoại tương tác câu lệnh với AI.
          </div>
          <div className="p-3.5 bg-[var(--surface-card)] rounded-lg border border-[var(--border-subtle)] text-[var(--text-secondary)]">
            <strong className="text-emerald-400 font-mono block mb-1">2. Fact-checker:</strong> Mở SGK đối chiếu từng số liệu xem AI có bịa đặt không.
          </div>
          <div className="p-3.5 bg-[var(--surface-card)] rounded-lg border border-[var(--border-subtle)] sm:col-span-2 text-[var(--text-secondary)]">
            <strong className="text-purple-400 font-mono block mb-1">3 & 4. Biên tập viên:</strong> Lọc ý tưởng hay, gọt giũa câu từ phù hợp với lứa tuổi học trò.
          </div>
        </div>
      </div>
    </div>
  );
}
