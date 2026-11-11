'use client';

import React, { useState } from 'react';

export default function PromptSurgeon() {
  const [copied, setCopied] = useState(false);
  const [activeElement, setActiveElement] = useState<string | null>(null);

  const elements = [
    {
      key: 'role',
      letter: 'R',
      name: 'Role (Vai trò)',
      color: 'bg-rose-500/10 text-rose-400 border-rose-500/40',
      badgeColor: 'bg-rose-500 text-white',
      explanation: 'Gán chuyên môn cao nhất cho AI để AI định vị tâm thế chuyên gia phù hợp.',
      sampleText: 'Bạn là một cố vấn học tập cấp THPT giàu kinh nghiệm và cực kỳ tâm lý.'
    },
    {
      key: 'context',
      letter: 'C',
      name: 'Context (Bối cảnh)',
      color: 'bg-amber-500/10 text-amber-400 border-amber-500/40',
      badgeColor: 'bg-amber-500 text-white',
      explanation: 'Cung cấp nền tảng: Tôi là ai? Điểm mạnh/yếu là gì? Hoàn cảnh ra sao?',
      sampleText: 'Tôi là học sinh lớp 11 đang bị hổng kiến thức môn Hóa học, đặc biệt là phần Cân bằng phản ứng Oxi hóa - Khử.'
    },
    {
      key: 'task',
      letter: 'T',
      name: 'Task (Nhiệm vụ)',
      color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/40',
      badgeColor: 'bg-cyan-500 text-white',
      explanation: 'Yêu cầu hành động cụ thể rõ ràng: Cần làm việc gì?',
      sampleText: 'Hãy xây dựng cho tôi một lộ trình tự học cải thiện điểm số trong vòng 14 ngày.'
    },
    {
      key: 'constraints',
      letter: 'C',
      name: 'Constraints (Giới hạn)',
      color: 'bg-purple-500/10 text-purple-400 border-purple-500/40',
      badgeColor: 'bg-purple-500 text-white',
      explanation: 'Rào cản bắt buộc: Thời gian, ngôn từ, điều cấm không được làm.',
      sampleText: 'Mỗi ngày tôi chỉ có 30 phút tự học buổi tối. Lộ trình phải đi từ ví dụ trực quan dễ hiểu nhất rồi mới nâng dần độ khó. Không viết lý thuyết suông, mỗi ngày phải có 1 bài tập áp dụng.'
    },
    {
      key: 'format',
      letter: 'F',
      name: 'Format (Định dạng)',
      color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/40',
      badgeColor: 'bg-emerald-500 text-white',
      explanation: 'Hình thức trình bày kết quả mong muốn để tiện sử dụng ngay.',
      sampleText: 'Trình bày dạng bảng gồm 4 cột: Ngày - Mục tiêu kiến thức - Dạng bài tập - Tiêu chí tự đánh giá hoàn thành.'
    }
  ];

  const fullPrompt = `[ROLE]: Bạn là một cố vấn học tập cấp THPT giàu kinh nghiệm và cực kỳ tâm lý.
[CONTEXT]: Tôi là học sinh lớp 11 đang bị hổng kiến thức môn Hóa học, đặc biệt là phần Cân bằng phản ứng Oxi hóa - Khử.
[TASK]: Hãy xây dựng cho tôi một lộ trình tự học cải thiện điểm số trong vòng 14 ngày.
[CONSTRAINTS]: Mỗi ngày tôi chỉ có 30 phút tự học buổi tối. Lộ trình phải đi từ ví dụ trực quan dễ hiểu nhất rồi mới nâng dần độ khó. Không viết lý thuyết suông, mỗi ngày phải có 1 bài tập áp dụng.
[FORMAT]: Trình bày dạng bảng gồm 4 cột: Ngày - Mục tiêu kiến thức - Dạng bài tập - Tiêu chí tự đánh giá hoàn thành.`;

  const copyPrompt = () => {
    navigator.clipboard.writeText(fullPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[var(--surface-card)] rounded-2xl p-6 sm:p-8 border border-[var(--border-main)] shadow-xs mt-6 transition-colors">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <span className="inline-flex items-center px-3 py-1 rounded-md font-mono text-xs font-bold bg-[var(--accent-bioluminescent)]/15 text-[var(--accent-bioluminescent)] uppercase tracking-[0.16em]">
            CÔNG CỤ PHÂN TÍCH CÂU LỆNH
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)] mt-2">
            Giải Phẫu Câu Lệnh Chuẩn R — T — C — C — F
          </h3>
          <p className="text-[var(--text-secondary)] text-base sm:text-lg mt-1">
            Bấm vào từng mảnh ghép bên dưới để phân tích cấu trúc 5 thành tố giúp câu lệnh đạt kết quả xuất sắc gấp 10 lần.
          </p>
        </div>
        <button
          onClick={copyPrompt}
          className="px-5 py-2.5 rounded-lg font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.14em] bg-aurora-gradient transition-all shadow-sm cursor-pointer hover:opacity-90"
        >
          {copied ? '[Đã sao chép]' : '[Sao Chép Prompt]'}
        </button>
      </div>

      {/* 5 Chips Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mb-6">
        {elements.map((el) => (
          <button
            key={el.key}
            onClick={() => setActiveElement(activeElement === el.key ? null : el.key)}
            className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
              activeElement === el.key
                ? 'border-[var(--accent-bioluminescent)] bg-[var(--surface-elevated)] ring-1 ring-[var(--accent-bioluminescent)] shadow-sm'
                : 'bg-[var(--surface-elevated)] hover:bg-[var(--surface-hover)] border-[var(--border-subtle)]'
            }`}
          >
            <span className={`w-8 h-8 rounded-md flex items-center justify-center font-mono font-black text-sm ${el.badgeColor}`}>
              {el.letter}
            </span>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">{el.name}</span>
          </button>
        ))}
      </div>

      {/* Live Breakdown Box */}
      <div className="space-y-3 p-5 sm:p-6 bg-[var(--surface-elevated)] rounded-xl border border-[var(--border-main)]">
        {elements.map((el) => {
          const isHighlighted = activeElement === null || activeElement === el.key;
          return (
            <div
              key={el.key}
              onClick={() => setActiveElement(el.key)}
              className={`p-4 rounded-lg border transition-all cursor-pointer ${
                isHighlighted
                  ? `${el.color} bg-[var(--surface-card)]`
                  : 'bg-[var(--surface-card)]/40 border-[var(--border-subtle)] opacity-40 hover:opacity-80'
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className={`px-2 py-0.5 rounded text-xs font-mono font-black uppercase ${el.badgeColor}`}>
                  {el.letter}
                </span>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">{el.name}</span>
              </div>
              <p className="text-base sm:text-lg font-medium text-[var(--text-primary)] leading-relaxed">{el.sampleText}</p>
              {activeElement === el.key && (
                <div className="mt-2 text-xs sm:text-sm font-semibold opacity-90 border-t border-current/20 pt-1.5">
                  Ghi chú: {el.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-[var(--surface-elevated)] rounded-xl border border-[var(--border-main)] text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent-bioluminescent)] block mb-0.5">
          [Kinh nghiệm đứng lớp]
        </span>
        Khi viết Prompt, chỉ cần tự hỏi bản thân &ldquo;Câu này đã có R, có C, có Constraints chưa?&rdquo; là câu lệnh tự khắc sẽ hay và chuẩn xác.
      </div>
    </div>
  );
}
