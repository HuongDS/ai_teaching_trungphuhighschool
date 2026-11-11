'use client';

import React, { useState } from 'react';

export default function AuthorGame() {
  const [selected, setSelected] = useState<'A' | 'B' | null>(null);
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="bg-[var(--surface-card)] rounded-2xl p-6 sm:p-8 border border-[var(--border-main)] shadow-xs mt-6 transition-colors">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <span className="inline-flex items-center px-3 py-1 rounded-md font-mono text-xs font-bold bg-[var(--accent-bioluminescent)]/15 text-[var(--accent-bioluminescent)] uppercase tracking-[0.16em]">
            HOẠT ĐỘNG TƯƠNG TÁC TẠI LỚP
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)] mt-2">
            Game: &ldquo;Ai Là Tác Giả?&rdquo;
          </h3>
          <p className="text-[var(--text-secondary)] text-base sm:text-lg mt-1">
            Chủ đề: <strong className="text-[var(--text-primary)]">&ldquo;Cơn mưa rào mùa hạ trên sân trường&rdquo;</strong>. Cả lớp hãy biểu quyết xem đoạn nào do Học sinh viết và đoạn nào do ChatGPT tạo ra.
          </p>
        </div>
        <button
          onClick={() => setRevealed(!revealed)}
          className="px-5 py-2.5 rounded-lg font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.14em] transition-all shadow-sm bg-aurora-gradient cursor-pointer hover:opacity-90"
        >
          {revealed ? '[Ẩn đáp án]' : '[Bấm Lật Mở Đáp Án]'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card A */}
        <div
          onClick={() => setSelected('A')}
          className={`p-6 rounded-xl border-2 transition-all cursor-pointer ${
            selected === 'A'
              ? 'border-[var(--accent-bioluminescent)] bg-[var(--surface-elevated)] ring-1 ring-[var(--accent-bioluminescent)] shadow-sm'
              : 'border-[var(--border-main)] hover:border-[var(--accent-bioluminescent)]/60 bg-[var(--surface-elevated)]/50'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono font-bold text-xs px-3 py-1 rounded-md bg-[var(--border-subtle)] text-[var(--text-primary)] uppercase tracking-wider">
              Đoạn Văn A
            </span>
            {revealed && (
              <span className="px-3 py-1 rounded-md text-xs font-mono font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                [Tác giả: HỌC SINH]
              </span>
            )}
          </div>
          <p className="text-[var(--text-primary)] text-lg leading-relaxed italic bg-[var(--surface-card)] p-4 rounded-lg border border-[var(--border-subtle)] min-h-[140px]">
            &ldquo;Tiếng trống tan trường vừa điểm thì mây đen kéo ùn ùn tới. Hạt mưa đầu mùa to bằng hạt ngô rơi lộp độp lên mái tôn. Mấy đứa bạn con trai trong lớp hò hét cởi áo khoác che đầu chạy ù ra nhà để xe, nước bắn ướt sũng cả gấu quần mà cười toe toét.&rdquo;
          </p>
          {revealed && (
            <div className="mt-4 p-3.5 bg-emerald-500/10 border border-emerald-500/25 rounded-lg text-emerald-300 text-sm leading-relaxed">
              <strong>Đặc điểm nhận diện:</strong> Chứa trải nghiệm cảm xúc độc bản, chi tiết đời sống chân thật (&ldquo;to bằng hạt ngô&rdquo;, &ldquo;ướt gấu quần cười toe toét&rdquo;) mà AI không thể tự trải qua.
            </div>
          )}
        </div>

        {/* Card B */}
        <div
          onClick={() => setSelected('B')}
          className={`p-6 rounded-xl border-2 transition-all cursor-pointer ${
            selected === 'B'
              ? 'border-[var(--accent-bioluminescent)] bg-[var(--surface-elevated)] ring-1 ring-[var(--accent-bioluminescent)] shadow-sm'
              : 'border-[var(--border-main)] hover:border-[var(--accent-bioluminescent)]/60 bg-[var(--surface-elevated)]/50'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono font-bold text-xs px-3 py-1 rounded-md bg-[var(--border-subtle)] text-[var(--text-primary)] uppercase tracking-wider">
              Đoạn Văn B
            </span>
            {revealed && (
              <span className="px-3 py-1 rounded-md text-xs font-mono font-bold uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/40">
                [Tác giả: CHATGPT]
              </span>
            )}
          </div>
          <p className="text-[var(--text-primary)] text-lg leading-relaxed italic bg-[var(--surface-card)] p-4 rounded-lg border border-[var(--border-subtle)] min-h-[140px]">
            &ldquo;Cơn mưa rào mùa hạ trút xuống sân trường như dòng nước mát lành gột rửa mọi oi ả của ngày hè. Những tán cây bàng xòe rộng đón nhận từng giọt ngọc bích long lanh. Khung cảnh hiện lên vừa nên thơ, vừa gợi lên bao xúc cảm bâng khuâng của tuổi học trò cắp sách tới trường.&rdquo;
          </p>
          {revealed && (
            <div className="mt-4 p-3.5 bg-purple-500/10 border border-purple-500/25 rounded-lg text-purple-300 text-sm leading-relaxed">
              <strong>Đặc điểm nhận diện:</strong> Từ ngữ rất mượt mà, cấu trúc ngữ pháp chuẩn xác nhưng sáo rỗng (&ldquo;giọt ngọc bích&rdquo;, &ldquo;dòng nước mát lành&rdquo;), thiếu ký ức thực tế.
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 p-4 bg-[var(--surface-elevated)] rounded-xl border border-[var(--border-main)] text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent-bioluminescent)] block mb-0.5">
          [Thông điệp sư phạm]
        </span>
        Văn của AI rất đẹp chữ nhưng thiếu linh hồn của trải nghiệm thật. Học sinh THPT hơn AI chính ở <strong>ký ức, cảm xúc thật và sự thấu cảm</strong>.
      </div>
    </div>
  );
}
