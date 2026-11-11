'use client';

import React, { useState } from 'react';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const SAMPLE_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Theo kỹ thuật Feynman, khi giải thích một hiện tượng vật lý khó cho người khác, bước đầu tiên quan trọng nhất là gì?',
    options: [
      'A. Sử dụng nhiều công thức vi tích phân để chứng minh tính chuẩn xác',
      'B. Sử dụng một ví dụ so sánh hoặc ẩn dụ đời thường mà một học sinh lớp 5 cũng hiểu được',
      'C. Đọc lại nguyên văn định nghĩa trong sách giáo khoa',
      'D. Trích dẫn tên các nhà khoa học đạt giải Nobel'
    ],
    correctIndex: 1,
    explanation: 'Kỹ thuật Feynman yêu cầu bạn phải loại bỏ toàn bộ thuật ngữ chuyên môn phức tạp và dùng ngôn từ bình dân, ẩn dụ đời sống.'
  },
  {
    id: 2,
    question: 'Phương pháp ôn thi chủ động "Active Recall" có nghĩa là gì?',
    options: [
      'A. Đọc đi đọc lại một trang sách giáo khoa 10 lần trước khi ngủ',
      'B. Đánh dấu bút dạ quang vàng phủ kín toàn bộ trang vở',
      'C. Tự ép não bộ trả lời các câu hỏi trắc nghiệm hoặc bài tập không xem trước đáp án',
      'D. Thuê người khác đọc lại bài giảng cho mình nghe thụ động'
    ],
    correctIndex: 2,
    explanation: 'Active Recall là hành động kích hoạt vùng nhớ của não bộ để tự nhớ lại và giải quyết vấn đề, giúp ghi nhớ lâu bền gấp 5 lần đọc thụ động.'
  },
  {
    id: 3,
    question: 'Khi yêu cầu AI tạo đề thi ôn tập cho bản thân, câu lệnh bắt buộc quan trọng nhất cần có là gì?',
    options: [
      'A. "Hãy giải luôn bài toán này cho tôi"',
      'B. "Hãy giấu đáp án và lời giải chi tiết ở phần dưới cùng để tôi tự làm trước"',
      'C. "Hãy viết bài thật dài 1000 từ"',
      'D. "Đừng đặt câu hỏi nào cả"'
    ],
    correctIndex: 1,
    explanation: 'Nếu AI hiện đáp án ngay, não bộ bạn sẽ ngay lập tức rơi vào trạng thái ỷ lại và mất đi cơ hội tự kiểm tra năng lực.'
  }
];

export default function QuizActiveRecall() {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [revealedQuestions, setRevealedQuestions] = useState<Record<number, boolean>>({});

  const handleSelect = (qId: number, optionIdx: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
    setRevealedQuestions((prev) => ({ ...prev, [qId]: true }));
  };

  const toggleReveal = (qId: number) => {
    setRevealedQuestions((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  return (
    <div className="bg-[var(--surface-card)] rounded-2xl p-6 sm:p-8 border border-[var(--border-main)] shadow-xs mt-6 transition-colors">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <span className="inline-flex items-center px-3 py-1 rounded-md font-mono text-xs font-bold bg-[var(--accent-bioluminescent)]/15 text-[var(--accent-bioluminescent)] uppercase tracking-[0.16em]">
            MÁY SINH ĐỀ TRẮC NGHIỆM ACTIVE RECALL
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)] mt-2">
            Giải Đề Trắc Nghiệm Trực Tiếp
          </h3>
          <p className="text-[var(--text-secondary)] text-base sm:text-lg mt-1">
            Bấm vào đáp án để cả lớp cùng xem phân tích và giải thích chi tiết từ AI.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {SAMPLE_QUESTIONS.map((q) => {
          const userChoice = selectedAnswers[q.id];
          const isRevealed = revealedQuestions[q.id];

          return (
            <div key={q.id} className="p-6 rounded-xl border border-[var(--border-main)] bg-[var(--surface-elevated)]">
              <div className="flex items-start justify-between gap-4 mb-4">
                <h4 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] leading-snug">
                  Câu {q.id}: {q.question}
                </h4>
                <button
                  onClick={() => toggleReveal(q.id)}
                  className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent-bioluminescent)] hover:text-[var(--text-primary)] px-3 py-1.5 rounded-md border border-[var(--border-subtle)] bg-[var(--surface-card)] cursor-pointer"
                >
                  {isRevealed ? '[Ẩn đáp án]' : '[Mở đáp án]'}
                </button>
              </div>

              <div className="grid grid-cols-1 gap-2.5 mb-4">
                {q.options.map((opt, idx) => {
                  const isSelected = userChoice === idx;
                  const isCorrect = idx === q.correctIndex;

                  let btnStyle = 'border-[var(--border-subtle)] bg-[var(--surface-card)] text-[var(--text-secondary)] hover:border-[var(--border-main)]';
                  if (isRevealed) {
                    if (isCorrect) {
                      btnStyle = 'border-emerald-500 bg-emerald-500/15 text-[var(--text-primary)] font-bold ring-1 ring-emerald-500';
                    } else if (isSelected) {
                      btnStyle = 'border-rose-400 bg-rose-500/15 text-[var(--text-primary)]';
                    }
                  } else if (isSelected) {
                    btnStyle = 'border-[var(--accent-bioluminescent)] bg-[var(--surface-elevated)] text-[var(--text-primary)] font-bold ring-1 ring-[var(--accent-bioluminescent)]';
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelect(q.id, idx)}
                      className={`p-3.5 rounded-lg border text-left text-base sm:text-lg transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {isRevealed && isCorrect && <span className="font-mono text-xs font-bold uppercase text-emerald-400">[ĐÚNG]</span>}
                    </button>
                  );
                })}
              </div>

              {isRevealed && (
                <div className="p-4 bg-[var(--surface-card)] border border-[var(--accent-bioluminescent)]/40 rounded-lg text-[var(--text-secondary)] text-base leading-relaxed">
                  <strong className="text-[var(--accent-bioluminescent)] font-mono uppercase text-xs tracking-wider block mb-1">
                    [Lời giải chi tiết]:
                  </strong>
                  {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
