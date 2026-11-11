'use client';

import React, { useState } from 'react';

export default function SlideComparison() {
  const [activeTab, setActiveTab] = useState<'compare' | 'image-elements'>('compare');

  const imageElements = [
    { number: '01', name: 'Chủ thể (Subject)', desc: 'Ai hoặc cái gì là nhân vật chính trong khung hình? (Ví dụ: Nhóm 3 học sinh THPT).' },
    { number: '02', name: 'Bối cảnh (Setting)', desc: 'Không gian diễn ra ở đâu? (Ví dụ: Phòng thí nghiệm hiện đại, ánh nắng ấm áp).' },
    { number: '03', name: 'Hành động (Action)', desc: 'Họ đang làm gì cụ thể? (Ví dụ: Đang cùng chỉ tay vào máy tính bảng thảo luận sôi nổi).' },
    { number: '04', name: 'Phong cách (Style)', desc: 'Hình thức thị giác là gì? (Ví dụ: 3D Pixar render, ảnh chụp chân thực, tranh vẽ tối giản).' },
    { number: '05', name: 'Màu sắc (Color)', desc: 'Tông màu chủ đạo là gì? (Ví dụ: Tươi sáng, tông xanh dương và vàng cam năng động).' },
    { number: '06', name: 'Bố cục (Composition)', desc: 'Góc máy và khoảng cách thế nào? (Ví dụ: Góc máy rộng, chiều sâu trường ảnh rõ nét).' }
  ];

  return (
    <div className="bg-[var(--surface-card)] rounded-2xl p-6 sm:p-8 border border-[var(--border-main)] shadow-xs mt-6 transition-colors">
      <div className="flex border-b border-[var(--border-main)] gap-4 mb-6">
        <button
          onClick={() => setActiveTab('compare')}
          className={`pb-3 font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.14em] border-b-2 transition-all cursor-pointer ${
            activeTab === 'compare'
              ? 'border-[var(--accent-bioluminescent)] text-[var(--accent-bioluminescent)]'
              : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]'
          }`}
        >
          [ĐỐI CHIẾU 2 PHONG CÁCH SLIDE]
        </button>
        <button
          onClick={() => setActiveTab('image-elements')}
          className={`pb-3 font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.14em] border-b-2 transition-all cursor-pointer ${
            activeTab === 'image-elements'
              ? 'border-[var(--accent-bioluminescent)] text-[var(--accent-bioluminescent)]'
              : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]'
          }`}
        >
          [6 MẢNH GHÉP PROMPT TẠO ẢNH]
        </button>
      </div>

      {activeTab === 'compare' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bad Slide */}
          <div className="p-6 rounded-xl bg-rose-500/10 border-2 border-rose-500/30">
            <div className="flex items-center gap-2 text-rose-500 font-mono font-bold text-xs uppercase tracking-wider mb-3">
              <span className="px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-400 font-mono font-bold">[CẢNH BÁO]</span> Slide Thảm Họa: &ldquo;Rừng Chữ&rdquo;
            </div>
            <div className="bg-[var(--surface-card)] p-5 rounded-lg border border-[var(--border-subtle)] text-[var(--text-secondary)] text-sm leading-relaxed shadow-xs">
              <h5 className="font-bold text-base mb-2 text-center text-[var(--text-primary)] underline">
                TÁC HẠI CỦA VIỆC THỨC KHUYA ĐỐI VỚI HỌC SINH THPT
              </h5>
              <p className="mb-2">
                Thức khuya là một thói quen rất xấu hiện nay của các bạn học sinh. Khi thức khuya cơ thể sẽ không được nghỉ ngơi đầy đủ dẫn đến tình trạng suy giảm trí nhớ nghiêm trọng và không thể tập trung tiếp thu bài vở vào sáng hôm sau. Bên cạnh đó thức khuya còn làm da dẻ xấu đi, nổi mụn, mắt bị thâm quầng như gấu trúc...
              </p>
              <p>
                Ngoài ra theo nghiên cứu của các nhà khoa học, thức khuya trong thời gian dài còn làm rối loạn đồng hồ sinh học, suy giảm hệ miễn dịch khiến học sinh dễ mắc các bệnh cảm cúm vặt và làm tăng nguy cơ mắc các bệnh tim mạch sau này khi trưởng thành...
              </p>
            </div>
            <div className="mt-3 text-xs font-mono text-rose-400 font-medium">
              [Khuyết điểm]: Khán giả bận đọc chữ nên bỏ rơi người nói; người nói chỉ biết quay lưng đọc slide!
            </div>
          </div>

          {/* Good Slide */}
          <div className="p-6 rounded-xl bg-[var(--surface-elevated)] border-2 border-[var(--accent-bioluminescent)]/50">
            <div className="flex items-center gap-2 text-[var(--accent-bioluminescent)] font-mono font-bold text-xs uppercase tracking-wider mb-3">
              <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono font-bold">[KHUYÊN DÙNG]</span> Slide Đỉnh Cao: &ldquo;Ít Chữ - Nhiều Ý&rdquo;
            </div>
            <div className="bg-[var(--surface-card)] p-6 rounded-lg border border-[var(--border-subtle)] text-[var(--text-primary)] shadow-xs min-h-[250px] flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-mono font-extrabold uppercase text-[var(--accent-bioluminescent)] tracking-[0.18em]">
                  SLIDE 02 // BÁO ĐỘNG
                </span>
                <h5 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] mt-1 mb-4">
                  Cái Giá Của Việc &ldquo;Cày Đêm&rdquo;
                </h5>
                <ul className="space-y-3 text-base sm:text-lg font-bold text-[var(--text-primary)]">
                  <li className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0"></span>
                    Não giảm <strong>40% khả năng ghi nhớ</strong>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0"></span>
                    Hệ miễn dịch suy kiệt sau 7 ngày
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[var(--accent-bioluminescent)] shrink-0"></span>
                    Mất năng lượng học buổi sáng
                  </li>
                </ul>
              </div>

              <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs font-mono text-[var(--text-muted)]">
                <span>[Minh họa: Đồng hồ sinh học bị vỡ]</span>
                <span className="italic">Speaker note: Dừng lại hỏi lớp 3 giây</span>
              </div>
            </div>
            <div className="mt-3 text-xs font-mono text-[var(--accent-bioluminescent)] font-medium">
              [Ưu điểm]: Khán giả liếc 3 giây là hiểu thông điệp, dồn 100% ánh mắt lắng nghe người thuyết trình!
            </div>
          </div>
        </div>
      )}

      {activeTab === 'image-elements' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {imageElements.map((el) => (
            <div key={el.number} className="p-4 bg-[var(--surface-elevated)] rounded-xl border border-[var(--border-main)]">
              <div className="w-8 h-8 rounded-md bg-[var(--accent-bioluminescent)]/20 border border-[var(--accent-bioluminescent)]/40 text-[var(--accent-bioluminescent)] font-mono font-bold text-xs flex items-center justify-center mb-2">
                {el.number}
              </div>
              <h5 className="font-bold text-[var(--text-primary)] text-base mb-1">{el.name}</h5>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{el.desc}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
