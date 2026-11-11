'use client';

import React, { useState } from 'react';

interface FakeFact {
  id: number;
  highlightText: string;
  truth: string;
  found: boolean;
}

export default function HallucinationDetective() {
  const [facts, setFacts] = useState<FakeFact[]>([
    {
      id: 1,
      highlightText: 'ngày 19 tháng 8 năm 1946',
      truth: 'SAI NĂM LỊCH SỬ! Cuộc Tổng khởi nghĩa Cách mạng Tháng Tám giành chính quyền tại Hà Nội diễn ra vào năm 1945, không phải năm 1946.',
      found: false
    },
    {
      id: 2,
      highlightText: 'nhà thơ Huy Cận đã thốt lên: "Tôi muốn tắt nắng đi / Cho màu đừng nhạt mất"',
      truth: 'SAI TÁC GIẢ! Hai câu thơ nổi tiếng này nằm trong bài thơ "Vội vàng" của nhà thơ Xuân Diệu, không phải của Huy Cận.',
      found: false
    },
    {
      id: 3,
      highlightText: 'ước tính có tới 98.5% dân số Hà Nội thời điểm đó đã tốt nghiệp đại học',
      truth: 'SỐ LIỆU BỊA ĐẶT VÔ LÝ! Thời điểm năm 1945, hơn 90% dân số Việt Nam còn mù chữ do chính sách ngu dân của thực dân, hoàn toàn không có chuyện 98.5% có bằng đại học.',
      found: false
    }
  ]);

  const toggleFact = (id: number) => {
    setFacts((prev) =>
      prev.map((f) => (f.id === id ? { ...f, found: !f.found } : f))
    );
  };

  const foundCount = facts.filter((f) => f.found).length;

  return (
    <div className="bg-[var(--surface-card)] rounded-2xl p-6 sm:p-8 border border-[var(--border-main)] shadow-xs mt-6 transition-colors">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <span className="inline-flex items-center px-3 py-1 rounded-md font-mono text-xs font-bold bg-rose-500/15 text-rose-500 uppercase tracking-[0.16em]">
            VỤ ÁN THÁM TỬ AI
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)] mt-2">
            Vạch Trần 3 Chi Tiết Ảo Giác (Hallucination)
          </h3>
          <p className="text-[var(--text-secondary)] text-base sm:text-lg mt-1">
            Đoạn văn lịch sử dưới đây do ChatGPT viết với vẻ mặt cực kỳ tự tin, nhưng đã bị cài sẵn <strong>3 lỗi bịa đặt ngớ ngẩn</strong>. Hãy bấm vào các chi tiết nghi vấn để vạch mặt AI.
          </p>
        </div>
        <div className="px-4 py-2 rounded-md bg-[var(--surface-elevated)] border border-[var(--border-main)] font-mono text-xs uppercase tracking-wider text-[var(--text-primary)] font-bold">
          ĐÃ VẠCH TRẦN: <span className="text-base text-rose-500 font-extrabold">{foundCount}/3</span> LỖI
        </div>
      </div>

      {/* Paragraph Box */}
      <div className="p-6 bg-[var(--surface-elevated)] rounded-xl border border-[var(--border-main)] text-[var(--text-primary)] text-lg leading-loose mb-6">
        &ldquo;Không khí hào hùng của Cách mạng Tháng Tám năm xưa tại Hà Nội thật thiêng liêng. Vào{' '}
        <button
          onClick={() => toggleFact(1)}
          className={`px-2 py-0.5 rounded font-mono font-bold border transition-all cursor-pointer inline-block ${
            facts[0].found
              ? 'bg-rose-500/20 border-rose-500 text-rose-400 line-through'
              : 'bg-[var(--surface-card)] border-dashed border-rose-400/80 hover:bg-rose-500/10 text-rose-500'
          }`}
        >
          [ngày 19 tháng 8 năm 1946]
        </button>
        , hàng vạn quần chúng nhân dân mang theo cờ đỏ sao vàng đổ về Quảng trường Nhà hát Lớn. Trước quang cảnh hào sảng đó,{' '}
        <button
          onClick={() => toggleFact(2)}
          className={`px-2 py-0.5 rounded font-mono font-bold border transition-all cursor-pointer inline-block ${
            facts[1].found
              ? 'bg-rose-500/20 border-rose-500 text-rose-400 line-through'
              : 'bg-[var(--surface-card)] border-dashed border-rose-400/80 hover:bg-rose-500/10 text-rose-500'
          }`}
        >
          [nhà thơ Huy Cận đã thốt lên: &ldquo;Tôi muốn tắt nắng đi / Cho màu đừng nhạt mất&rdquo;]
        </button>
        . Theo các tư liệu ghi nhận,{' '}
        <button
          onClick={() => toggleFact(3)}
          className={`px-2 py-0.5 rounded font-mono font-bold border transition-all cursor-pointer inline-block ${
            facts[2].found
              ? 'bg-rose-500/20 border-rose-500 text-rose-400 line-through'
              : 'bg-[var(--surface-card)] border-dashed border-rose-400/80 hover:bg-rose-500/10 text-rose-500'
          }`}
        >
          [ước tính có tới 98.5% dân số Hà Nội thời điểm đó đã tốt nghiệp đại học]
        </button>{' '}
        để đóng góp trí tuệ cho chính quyền cách mạng non trẻ.&rdquo;
      </div>

      {/* Revealed Truths */}
      <div className="space-y-3">
        {facts.map((f) => (
          <div
            key={f.id}
            className={`p-4 rounded-xl border transition-all ${
              f.found
                ? 'bg-rose-500/10 border-rose-500/40 text-[var(--text-primary)]'
                : 'bg-[var(--surface-elevated)] border-[var(--border-subtle)] text-[var(--text-muted)]'
            }`}
          >
            <div className="font-mono text-xs uppercase tracking-wider font-bold mb-1">
              [LỖI {f.id}] &ldquo;{f.highlightText}&rdquo;
            </div>
            {f.found ? (
              <p className="text-base font-semibold leading-relaxed">{f.truth}</p>
            ) : (
              <p className="text-xs font-mono italic">Chưa phát hiện (bấm vào phần trong ngoặc phía trên để mở)</p>
            )}
          </div>
        ))}
      </div>

      {/* 5 KHONG Rule Box */}
      <div className="mt-8 p-6 sm:p-7 bg-[var(--surface-elevated)] border border-[var(--border-main)] rounded-xl text-[var(--text-primary)]">
        <div className="text-sm font-mono font-bold uppercase tracking-[0.16em] text-rose-500 mb-4">
          BẢO BỐI SỐNG CÒN // BỘ QUY TẮC 5 KHÔNG
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-base">
          <div className="p-3.5 bg-[var(--surface-card)] rounded-lg border border-[var(--border-subtle)]">
            <strong className="text-rose-500 font-mono">1. KHÔNG</strong> nhập thông tin cá nhân (mật khẩu, địa chỉ, ảnh riêng tư).
          </div>
          <div className="p-3.5 bg-[var(--surface-card)] rounded-lg border border-[var(--border-subtle)]">
            <strong className="text-rose-500 font-mono">2. KHÔNG</strong> tin 100% số liệu nếu chưa kiểm chứng bằng SGK hoặc Google.
          </div>
          <div className="p-3.5 bg-[var(--surface-card)] rounded-lg border border-[var(--border-subtle)]">
            <strong className="text-rose-500 font-mono">3. KHÔNG</strong> copy nguyên văn bài luận của AI rồi nhận là của mình.
          </div>
          <div className="p-3.5 bg-[var(--surface-card)] rounded-lg border border-[var(--border-subtle)]">
            <strong className="text-rose-500 font-mono">4. KHÔNG</strong> dùng AI chế ảnh, bôi nhọ bạn bè, thầy cô hay người khác.
          </div>
          <div className="p-3.5 bg-[var(--surface-card)] rounded-lg border border-[var(--border-subtle)] sm:col-span-2">
            <strong className="text-rose-500 font-mono">5. KHÔNG</strong> để AI quyết định thay ước mơ, cảm xúc và tư duy của chính mình.
          </div>
        </div>
      </div>
    </div>
  );
}
