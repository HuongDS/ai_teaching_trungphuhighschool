'use client';

import React, { useState } from 'react';

export default function SuperpowersDemo() {
  const [activeTab, setActiveTab] = useState<'superpowers' | 'three-rounds'>('superpowers');
  const [activePower, setActivePower] = useState<number>(1);
  const [activeRound, setActiveRound] = useState<number>(1);
  const [copied, setCopied] = useState(false);

  const POWERS = [
    {
      id: 1,
      title: '1. Giải Thích Trực Quan',
      tag: 'Ẩn dụ hóa',
      prompt: 'Hãy giải thích định luật vạn vật hấp dẫn của Newton bằng ví dụ về quả bóng đá bị sút lên trời, dành cho học sinh lớp 10 dễ hiểu nhất.',
      sampleOutput: 'Hãy tưởng tượng: Khi bạn sút một quả bóng lên trời, lực sút của bạn đẩy nó bay lên. Nhưng Trái Đất như một chiếc nam châm khổng lồ tàng hình liên tục "kéo" quả bóng trở lại mặt đất. Đó chính là lực hấp dẫn!'
    },
    {
      id: 2,
      title: '2. Tóm Tắt Siêu Tốc',
      tag: 'Cô đọng',
      prompt: 'Tóm tắt ý nghĩa của Chiến thắng Điện Biên Phủ năm 1954 thành đúng 3 gạch đầu dòng, mỗi gạch không quá 25 từ.',
      sampleOutput: '• Đập tan kế hoạch Nava, kết thúc 9 năm kháng chiến chống thực dân Pháp oanh liệt.\n• Buộc Pháp phải ký Hiệp định Giơ-ne-vơ lập lại hòa bình tại Đông Dương.\n• Cổ vũ mạnh mẽ phong trào giải phóng dân tộc của các nước thuộc địa trên thế giới.'
    },
    {
      id: 3,
      title: '3. Khơi Nguồn Sáng Tạo',
      tag: 'Brainstorm',
      prompt: 'Gợi ý 3 tên chủ đề thật cuốn hút, trẻ trung và hài hước cho buổi sinh hoạt câu lạc bộ sách trường THPT.',
      sampleOutput: '1. "Đọc sách không quạu: Bí kíp sống sót qua mùa kiểm tra"\n2. "Cuộc hẹn với chữ: Đọc để hết ngố"\n3. "Trạm dừng thanh xuân: 10 trang sách, vạn góc nhìn"'
    },
    {
      id: 4,
      title: '4. Đóng Vai Chuyên Gia',
      tag: 'Roleplay',
      prompt: 'Hãy đóng vai một bác sĩ nhãn khoa và khuyên một học sinh lớp 11 cách bảo vệ mắt khi phải ôn thi khuya.',
      sampleOutput: '"Chào cháu! Bác sĩ hiểu áp lực thi cử của cháu lúc này. Nhưng nhớ quy tắc 20-20-20 nhé: Cứ sau 20 phút nhìn màn hình/sách, hãy phóng tầm mắt xa 6 mét trong 20 giây để cơ mắt được thả lỏng!"'
    }
  ];

  const ROUNDS = [
    {
      round: 1,
      badge: 'HIỆP 1: HỎI THÔ (CHUNG CHUNG)',
      prompt: 'Hiện tượng El Nino là gì?',
      output: 'El Nino là hiện tượng nóng lên dị thường của lớp nước biển bề mặt ở khu vực xích đạo trung tâm và Đông Thái Bình Dương, kéo dài từ 8 đến 12 tháng hoặc lâu hơn, thường xuất hiện theo chu kỳ từ 3 đến 7 năm...',
      critique: 'Kết quả: Rất dài dòng, nhiều thuật ngữ hàn lâm khó hiểu đối với học sinh.'
    },
    {
      round: 2,
      badge: 'HIỆP 2: THU HẸP BỐI CẢNH & GIỚI HẠN',
      prompt: 'Dài quá và nhiều từ khó hiểu. Hãy giải thích lại ngắn gọn dưới 50 từ và lấy 1 ví dụ ảnh hưởng đến thời tiết Việt Nam.',
      output: 'El Nino là hiện tượng nước biển Thái Bình Dương ấm lên bất thường, làm đảo lộn thời tiết toàn cầu. Tại Việt Nam, El Nino thường gây ra nắng nóng gay gắt kéo dài và hạn hán nghiêm trọng ở miền Trung và Tây Nguyên.',
      critique: 'Kết quả: Cực kỳ súc tích, gắn chặt với thời tiết Việt Nam, dễ hiểu ngay lập tức!'
    },
    {
      round: 3,
      badge: 'HIỆP 3: THÁCH ĐỐ KIỂM TRA CHỦ ĐỘNG',
      prompt: 'Bây giờ bạn hãy đặt cho tôi 2 câu hỏi trắc nghiệm vui để xem tôi đã hiểu đúng về El Nino chưa. Đừng hiện đáp án vội!',
      output: 'Được chứ! Câu 1: Khi El Nino xảy ra, thời tiết tại Tây Nguyên Việt Nam thường có xu hướng: A) Mưa lũ dồn dập B) Nắng nóng, khô hạn C) Có tuyết rơi D) Không đổi. Hãy chọn đáp án của bạn!',
      critique: 'Kết quả: Biến AI từ một cỗ máy thụ động thành một người thầy khảo bài tương tác!'
    }
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[var(--surface-card)] rounded-2xl p-6 sm:p-8 border border-[var(--border-main)] shadow-xs mt-6 transition-colors">
      {/* Tab Switcher */}
      <div className="flex border-b border-[var(--border-main)] gap-4 mb-6">
        <button
          onClick={() => setActiveTab('superpowers')}
          className={`pb-3 font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.14em] border-b-2 transition-all cursor-pointer ${
            activeTab === 'superpowers'
              ? 'border-[var(--accent-bioluminescent)] text-[var(--accent-bioluminescent)]'
              : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]'
          }`}
        >
          4 Siêu Năng Lực Của GenAI
        </button>
        <button
          onClick={() => setActiveTab('three-rounds')}
          className={`pb-3 font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.14em] border-b-2 transition-all cursor-pointer ${
            activeTab === 'three-rounds'
              ? 'border-[var(--accent-bioluminescent)] text-[var(--accent-bioluminescent)]'
              : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]'
          }`}
        >
          Thử Thách: Cuộc Trò Chuyện 3 Hiệp
        </button>
      </div>

      {activeTab === 'superpowers' && (
        <div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {POWERS.map((power) => {
              const isSelected = activePower === power.id;
              return (
                <button
                  key={power.id}
                  onClick={() => setActivePower(power.id)}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[var(--accent-bioluminescent)] bg-[var(--surface-elevated)] ring-1 ring-[var(--accent-bioluminescent)] shadow-xs'
                      : 'border-[var(--border-main)] bg-[var(--surface-card)] hover:bg-[var(--surface-hover)]'
                  }`}
                >
                  <div className="font-mono text-xs font-bold uppercase text-[var(--accent-bioluminescent)] mb-1">
                    [0{power.id}]
                  </div>
                  <div className="font-bold text-[var(--text-primary)] text-sm sm:text-base">{power.title}</div>
                  <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider block mt-0.5">{power.tag}</span>
                </button>
              );
            })}
          </div>

          {/* Active Power Box */}
          {(() => {
            const current = POWERS.find((p) => p.id === activePower)!;
            return (
              <div className="bg-[var(--surface-elevated)] border border-[var(--border-main)] rounded-xl p-6">
                <div className="flex items-center justify-between gap-4 mb-3">
                  <span className="text-xs font-mono font-bold uppercase tracking-[0.14em] text-[var(--accent-bioluminescent)]">
                    CÂU LỆNH DEMO MẪU (PROMPT)
                  </span>
                  <button
                    onClick={() => copyToClipboard(current.prompt)}
                    className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-primary)] hover:text-[var(--accent-bioluminescent)] cursor-pointer bg-[var(--surface-card)] px-3 py-1.5 rounded border border-[var(--border-subtle)]"
                  >
                    {copied ? '[Đã sao chép]' : '[Sao chép Prompt]'}
                  </button>
                </div>
                <div className="p-4 bg-[var(--surface-card)] rounded-lg border border-[var(--border-subtle)] text-[var(--text-primary)] font-mono text-base mb-4 leading-relaxed">
                  &ldquo;{current.prompt}&rdquo;
                </div>

                <span className="text-xs font-mono font-bold uppercase tracking-[0.14em] text-[var(--accent-aqua)] block mb-1">
                  KẾT QUẢ AI TRẢ VỀ NGAY TỨC THÌ
                </span>
                <div className="mt-2 p-5 bg-[var(--surface-card)] rounded-lg border border-[var(--border-subtle)] text-[var(--text-secondary)] text-base leading-relaxed whitespace-pre-line">
                  {current.sampleOutput}
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {activeTab === 'three-rounds' && (
        <div>
          <div className="flex gap-2 sm:gap-3 mb-6">
            {ROUNDS.map((r) => (
              <button
                key={r.round}
                onClick={() => setActiveRound(r.round)}
                className={`flex-1 py-3 px-4 rounded-xl font-mono text-xs sm:text-sm font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                  activeRound === r.round
                    ? 'bg-[var(--accent-bioluminescent)] text-white border-[var(--accent-bioluminescent)] shadow-sm'
                    : 'bg-[var(--surface-card)] text-[var(--text-secondary)] border-[var(--border-main)] hover:bg-[var(--surface-hover)]'
                }`}
              >
                Hiệp {r.round}
              </button>
            ))}
          </div>

          {(() => {
            const currentRound = ROUNDS.find((r) => r.round === activeRound)!;
            return (
              <div className="bg-[var(--surface-elevated)] border border-[var(--border-main)] rounded-xl p-6">
                <span className="inline-block px-3 py-1 rounded text-xs font-mono font-extrabold uppercase tracking-[0.14em] bg-[var(--accent-bioluminescent)]/20 text-[var(--accent-bioluminescent)] mb-4">
                  {currentRound.badge}
                </span>

                <div className="mb-4">
                  <div className="text-[11px] uppercase font-mono font-bold text-[var(--text-muted)] mb-1">Người dùng hỏi:</div>
                  <div className="p-4 bg-[var(--surface-card)] rounded-lg border border-[var(--border-subtle)] text-[var(--text-primary)] text-lg font-semibold">
                    &ldquo;{currentRound.prompt}&rdquo;
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-[11px] uppercase font-mono font-bold text-[var(--accent-bioluminescent)] mb-1">AI phản hồi:</div>
                  <div className="p-4 bg-[var(--surface-card)] rounded-lg border border-[var(--border-subtle)] text-[var(--text-secondary)] text-base leading-relaxed">
                    {currentRound.output}
                  </div>
                </div>

                <div className="p-3 bg-[var(--surface-card)] rounded-lg border border-[var(--accent-bioluminescent)]/30 text-[var(--text-secondary)] text-sm">
                  Phân tích: {currentRound.critique}
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}
