'use client';

import React, { useState } from 'react';

export default function CareerOrientationMap() {
  const [activeCompetence, setActiveCompetence] = useState<number>(1);

  const COMPETENCES = [
    {
      id: 1,
      code: 'TRỤ CỘT 01',
      title: 'Tư Duy Phản Biện (Critical Thinking)',
      tagColor: 'text-[var(--accent-bioluminescent)] border-[var(--accent-bioluminescent)]/40 bg-[var(--accent-bioluminescent)]/10',
      desc: 'Biết hoài nghi khoa học trước mọi thông tin và số liệu trên mạng. AI có thể đưa ra 100 câu trả lời, nhưng chỉ con người mới biết câu nào là chân lý, câu nào là ngụy biện và thiên kiến.'
    },
    {
      id: 2,
      code: 'TRỤ CỘT 02',
      title: 'Sự Thấu Cảm & Trí Tuệ Cảm Xúc (Empathy)',
      tagColor: 'text-rose-400 border-rose-500/40 bg-rose-500/10',
      desc: 'Biết lắng nghe, đồng cảm với nỗi đau của người khác, kết nối trái tim và xây dựng niềm tin. Bác sĩ chữa bệnh bằng thuốc men (AI hỗ trợ), nhưng chữa lành bằng sự vỗ về nhân từ (chỉ con người).'
    },
    {
      id: 3,
      code: 'TRỤ CỘT 03',
      title: 'Sáng Tạo Độc Bản (Original Creativity)',
      tagColor: 'text-amber-400 border-amber-500/40 bg-amber-500/10',
      desc: 'AI chỉ tái tạo lại những gì nhân loại đã từng tải lên Internet trong quá khứ. Con người tạo ra những ý tưởng chưa từng có dựa trên trải nghiệm sống, vết thương, tình yêu và khát vọng của riêng mình.'
    },
    {
      id: 4,
      code: 'TRỤ CỘT 04',
      title: 'Năng Lực Làm Chủ Công Nghệ (AI Literacy)',
      tagColor: 'text-indigo-400 border-indigo-500/40 bg-indigo-500/10',
      desc: 'Biết cách điều khiển, kiểm tra và khai thác sức mạnh của AI để giải phóng sức lao động, nâng cao năng suất gấp 5-10 lần so với những người không biết dùng công nghệ.'
    }
  ];

  return (
    <div className="bg-[var(--surface-card)] rounded-2xl p-6 sm:p-8 border border-[var(--border-main)] shadow-xs mt-6 transition-colors">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <span className="inline-flex items-center px-3 py-1 rounded-md font-mono text-xs font-bold bg-[var(--accent-bioluminescent)]/15 text-[var(--accent-bioluminescent)] uppercase tracking-[0.14em]">
            [BẢN ĐỒ HƯỚNG NGHIỆP 4.0]
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)] mt-2">
            Bộ 4 Năng Lực Vàng: Con Người Vượt Trội Máy Móc
          </h3>
          <p className="text-[var(--text-secondary)] text-base sm:text-lg mt-1">
            AI không thay thế con người, nhưng <strong>người biết dùng AI sẽ thay thế người không biết dùng</strong>. Hãy khám phá 4 trụ cột bất khả xâm phạm!
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-6">
        {COMPETENCES.map((c) => {
          const isSelected = activeCompetence === c.id;
          return (
            <button
              key={c.id}
              onClick={() => setActiveCompetence(c.id)}
              className={`p-5 rounded-xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? 'border-[var(--accent-bioluminescent)] bg-[var(--surface-elevated)] ring-1 ring-[var(--accent-bioluminescent)] shadow-xs'
                  : 'border-[var(--border-main)] bg-[var(--surface-card)] hover:bg-[var(--surface-hover)]'
              }`}
            >
              <div className={`inline-block font-mono text-xs font-bold px-2 py-0.5 rounded border mb-3 ${c.tagColor}`}>
                {c.code}
              </div>
              <h4 className="font-bold text-[var(--text-primary)] text-sm sm:text-base mb-2">{c.title}</h4>
              <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--accent-bioluminescent)] font-semibold flex items-center gap-1">
                [Xem chi tiết] &rarr;
              </span>
            </button>
          );
        })}
      </div>

      {(() => {
        const current = COMPETENCES.find((c) => c.id === activeCompetence)!;
        return (
          <div className="p-6 rounded-xl border border-[var(--accent-bioluminescent)]/40 bg-[var(--surface-elevated)]">
            <div className="font-mono text-xs font-bold text-[var(--accent-bioluminescent)] uppercase tracking-[0.18em] mb-1">
              [{current.code} // CHI TIẾT NĂNG LỰC]
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] mb-2">
              {current.title}
            </h4>
            <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">{current.desc}</p>
          </div>
        );
      })()}
    </div>
  );
}
