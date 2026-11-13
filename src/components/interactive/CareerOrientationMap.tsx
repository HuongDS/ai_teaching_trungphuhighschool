'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Briefcase,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Trophy,
  Bot,
  HeartHandshake,
} from 'lucide-react';

interface JobTask {
  id: number;
  jobName: string;
  taskDesc: string;
  winner: 'AI' | 'HUMAN';
  reason: string;
}

const CAREER_TASKS: JobTask[] = [
  {
    id: 1,
    jobName: 'Bác sĩ Tâm lý & Giáo viên Chủ nhiệm',
    taskDesc: 'Lắng nghe, vỗ về và thấu cảm với học sinh đang gặp khủng hoảng tâm lý hoặc áp lực gia đình.',
    winner: 'HUMAN',
    reason:
      'Con người bất khả xâm phạm! AI không có trái tim và trải nghiệm sống thật; sự chữa lành tâm hồn cần ánh mắt, lòng trắc ẩn và sự kết nối giữa người với người.',
  },
  {
    id: 2,
    jobName: 'Nhân viên Nhập liệu & Kiểm dò Hóa đơn',
    taskDesc: 'Sao chép 10.000 dòng số liệu từ hóa đơn giấy sang bảng tính Excel theo mẫu cố định.',
    winner: 'AI',
    reason:
      'AI tự động hóa 99%! Công nghệ OCR và AI xử lý 10.000 hóa đơn chỉ trong vài phút với độ chính xác cao, không bao giờ mỏi mắt.',
  },
  {
    id: 3,
    jobName: 'Bác sĩ Chẩn đoán & Phẫu thuật viên',
    taskDesc: 'Đưa ra quyết định đạo đức y khoa cuối cùng và động viên bệnh nhân trước ca mổ phức tạp.',
    winner: 'HUMAN',
    reason:
      'Con người cầm lái! AI có thể quét ảnh X-quang tìm khối u cực nhanh để hỗ trợ, nhưng bác sĩ con người mới là người chịu trách nhiệm đạo đức, sinh mệnh và truyền niềm tin cho bệnh nhân.',
  },
  {
    id: 4,
    jobName: 'Tổng đài viên Trả lời Câu hỏi Lặp lại (FAQ)',
    taskDesc: 'Trả lời 5.000 tin nhắn mỗi ngày hỏi về giờ mở cửa, giá vé và địa chỉ cửa hàng.',
    winner: 'AI',
    reason:
      'AI vượt trội! Các tác vụ trả lời theo kịch bản lặp đi lặp lại 24/7 được AI Chatbot xử lý tức thì không cần chờ đợi.',
  },
  {
    id: 5,
    jobName: 'Nhà Khoa học Sinh học & Nông nghiệp Công nghệ cao',
    taskDesc: 'Đặt giả thuyết nghiên cứu mới để lai tạo giống cây trồng thích ứng biến đổi khí hậu tại Củ Chi (kết hợp dùng AI phân tích gen).',
    winner: 'HUMAN',
    reason:
      'Con người làm chủ AI! Nhà khoa học dùng AI để chạy mô phỏng dữ liệu gen nhanh gấp 100 lần, nhưng người đặt câu hỏi nghiên cứu thực địa và sáng tạo giải pháp vẫn là con người!',
  },
  {
    id: 6,
    jobName: 'Dịch thuật Văn bản Kỹ thuật Thô',
    taskDesc: 'Dịch nhanh 200 trang hướng dẫn sử dụng máy móc cơ bản sang 15 thứ tiếng trong 30 giây.',
    winner: 'AI',
    reason:
      'AI siêu tốc! Dịch thuật thông tin kỹ thuật thuần túy là sở trường của các mô hình ngôn ngữ lớn (LLM).',
  },
];

export default function CareerOrientationMap() {
  const [picks, setPicks] = useState<Record<number, 'AI' | 'HUMAN'>>({});

  const answeredCount = Object.keys(picks).length;
  const correctCount = CAREER_TASKS.reduce((acc, t) => {
    return acc + (picks[t.id] === t.winner ? 1 : 0);
  }, 0);

  const handleChoose = (id: number, choice: 'AI' | 'HUMAN', actual: 'AI' | 'HUMAN') => {
    setPicks((prev) => ({ ...prev, [id]: choice }));
    if (choice === actual) {
      try {
        confetti({
          particleCount: 35,
          spread: 55,
          origin: { y: 0.75 },
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
            <Briefcase className="w-3.5 h-3.5" />
            GAME BẢN ĐỒ NGHỀ NGHIỆP 2030 // AI THAY THẾ HAY CON NGƯỜI DẪN ĐẦU?
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] mt-2">
            Phân Định 6 Công Việc Tương Lai: Đâu Là Lãnh Địa Của Trái Tim & Trí Tuệ Người?
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3.5 py-1.5 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border-main)] font-mono text-xs font-bold flex items-center gap-1.5">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>
              Dự đoán đúng: <strong className="text-[var(--accent-bioluminescent)]">{correctCount}</strong> / {CAREER_TASKS.length} ({answeredCount} đã chọn)
            </span>
          </div>
          <button
            onClick={() => setPicks({})}
            className="p-2 rounded-xl bg-[var(--surface-elevated)] hover:bg-[var(--surface-hover)] text-[var(--text-secondary)] border border-[var(--border-main)] cursor-pointer"
            title="Chơi lại"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 6 Career Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {CAREER_TASKS.map((item) => {
          const userPick = picks[item.id];
          const hasPicked = userPick !== undefined;
          const isRight = userPick === item.winner;

          return (
            <div
              key={item.id}
              className={`p-4 rounded-2xl border-2 transition-all flex flex-col justify-between space-y-3 ${
                !hasPicked
                  ? 'bg-[var(--surface-elevated)] border-[var(--border-main)]'
                  : isRight
                  ? 'bg-emerald-500/10 border-emerald-500/40'
                  : 'bg-rose-500/10 border-rose-500/40'
              }`}
            >
              <div className="space-y-1.5">
                <div className="font-mono text-xs font-extrabold uppercase text-[var(--accent-bioluminescent)]">
                  #{item.id}. {item.jobName}
                </div>
                <p className="text-sm sm:text-base font-bold text-[var(--text-primary)] leading-snug">
                  {item.taskDesc}
                </p>
              </div>

              <div className="space-y-2.5">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleChoose(item.id, 'AI', item.winner)}
                    className={`py-2 px-3 rounded-xl font-mono text-xs font-bold border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      hasPicked && userPick === 'AI'
                        ? 'bg-cyan-600 text-white border-cyan-500'
                        : 'bg-[var(--surface-card)] text-[var(--text-primary)] border-[var(--border-subtle)] hover:border-cyan-500'
                    }`}
                  >
                    <Bot className="w-3.5 h-3.5" />
                    <span>AI Tự Động Hóa</span>
                  </button>

                  <button
                    onClick={() => handleChoose(item.id, 'HUMAN', item.winner)}
                    className={`py-2 px-3 rounded-xl font-mono text-xs font-bold border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      hasPicked && userPick === 'HUMAN'
                        ? 'bg-emerald-600 text-white border-emerald-500'
                        : 'bg-[var(--surface-card)] text-[var(--text-primary)] border-[var(--border-subtle)] hover:border-emerald-500'
                    }`}
                  >
                    <HeartHandshake className="w-3.5 h-3.5" />
                    <span>Con Người Làm Chủ</span>
                  </button>
                </div>

                {hasPicked && (
                  <div className="p-2.5 rounded-xl bg-[var(--surface-card)] border border-[var(--border-subtle)] text-xs flex items-start gap-2">
                    {isRight ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    )}
                    <span className="text-[var(--text-secondary)] leading-relaxed">{item.reason}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
