'use client';

import React, { useState } from 'react';

interface DeviceItem {
  id: number;
  name: string;
  isAi: boolean;
  explanation: string;
}

const DEVICES: DeviceItem[] = [
  { id: 1, name: '1. Máy tính Casio bấm phép tính (25 x 40)', isAi: false, explanation: 'Lập trình cố định (Fixed rules), không có khả năng học từ dữ liệu.' },
  { id: 2, name: '2. Camera quét & nhận diện biển số xe vi phạm', isAi: true, explanation: 'Ứng dụng Computer Vision (thị giác máy tính) để nhận diện ký tự chữ số trong ảnh.' },
  { id: 3, name: '3. Đèn đường tự bật đúng lúc 18h hàng ngày', isAi: false, explanation: 'Bộ hẹn giờ cơ học / rơ-le điện tử thông thường, không có trí thông minh nhân tạo.' },
  { id: 4, name: '4. Thuật toán YouTube gợi ý video đúng sở thích', isAi: true, explanation: 'Hệ thống đề xuất (Recommendation AI) phân tích hành vi người xem để dự đoán.' },
  { id: 5, name: '5. ChatGPT tóm tắt bài báo 2000 chữ', isAi: true, explanation: 'Mô hình ngôn ngữ lớn (LLM - Generative AI) đọc hiểu và tái cấu trúc nội dung.' },
  { id: 6, name: '6. Lò vi sóng hẹn giờ 3 phút', isAi: false, explanation: 'Bộ đếm thời gian vi mạch điện tử thuần túy.' },
  { id: 7, name: '7. Mở khóa điện thoại bằng FaceID khuôn mặt', isAi: true, explanation: 'Mạng nơ-ron nhận diện sinh trắc học 3D bất chấp đổi kiểu tóc hay đeo kính.' },
  { id: 8, name: '8. Nồi cơm điện tự nhảy nút khi cạn nước', isAi: false, explanation: 'Cảm biến nhiệt nam châm cơ học co giãn khi nhiệt độ tăng quá 100°C.' },
  { id: 9, name: '9. Google Dịch giọng nói trực tiếp sang Tiếng Anh', isAi: true, explanation: 'Nhận dạng giọng nói (Speech-to-Text) + Dịch máy nơ-ron (NMT).' },
  { id: 10, name: '10. Thang máy dừng đúng tầng được bấm nút', isAi: false, explanation: 'Mạch điều khiển logic tự động hóa cơ bản.' },
];

export default function AiClassifier() {
  const [userGuesses, setUserGuesses] = useState<Record<number, boolean>>({});
  const [showAllAnswers, setShowAllAnswers] = useState(false);

  const toggleGuess = (id: number, val: boolean) => {
    setUserGuesses((prev) => ({ ...prev, [id]: val }));
  };

  const resetAll = () => {
    setUserGuesses({});
    setShowAllAnswers(false);
  };

  return (
    <div className="bg-[var(--surface-card)] rounded-2xl p-6 sm:p-8 border border-[var(--border-main)] shadow-xs mt-6 transition-colors">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <span className="inline-flex items-center px-3 py-1 rounded-md font-mono text-xs font-bold bg-[var(--accent-bioluminescent)]/15 text-[var(--accent-bioluminescent)] uppercase tracking-[0.16em]">
            THỬ THÁCH PHÂN LOẠI
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)] mt-2">
            10 Thiết Bị Quanh Ta: AI Hay Tự Động Hóa?
          </h3>
          <p className="text-[var(--text-secondary)] text-base sm:text-lg mt-1">
            Thiết bị nào là <strong>Trí Tuệ Nhân Tạo (AI)</strong> và thiết bị nào chỉ là <strong>Tự Động Hóa Thông Thường</strong>?
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAllAnswers(!showAllAnswers)}
            className="px-4 py-2 rounded-md font-mono text-xs uppercase tracking-[0.12em] font-bold bg-[var(--btn-solid-bg)] hover:bg-[var(--btn-solid-hover)] text-[var(--btn-solid-text)] transition-all shadow-sm cursor-pointer"
          >
            {showAllAnswers ? '[Ẩn đáp án]' : '[Hiện Tất Cả Đáp Án]'}
          </button>
          <button
            onClick={resetAll}
            className="px-3 py-2 rounded-md font-mono text-xs uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] border border-[var(--border-main)] transition-all cursor-pointer"
            title="Làm lại từ đầu"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
        {DEVICES.map((item) => {
          const userChoice = userGuesses[item.id];
          const isAnswerVisible = showAllAnswers || userChoice !== undefined;

          return (
            <div
              key={item.id}
              className={`p-4 rounded-xl border transition-all ${
                isAnswerVisible
                  ? item.isAi
                    ? 'border-[var(--accent-bioluminescent)]/60 bg-[var(--surface-elevated)]'
                    : 'border-[var(--border-main)] bg-[var(--surface-elevated)]/40'
                  : 'border-[var(--border-subtle)] hover:border-[var(--border-main)] bg-[var(--surface-card)]'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-base sm:text-lg font-bold text-[var(--text-primary)]">
                  {item.name}
                </span>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => toggleGuess(item.id, true)}
                    className={`px-2.5 py-1 rounded text-xs font-mono font-bold uppercase transition-all cursor-pointer ${
                      userChoice === true
                        ? 'bg-[var(--accent-bioluminescent)] text-white shadow-xs'
                        : 'bg-[var(--surface-elevated)] hover:bg-[var(--surface-hover)] text-[var(--text-secondary)] border border-[var(--border-subtle)]'
                    }`}
                  >
                    Có AI
                  </button>
                  <button
                    onClick={() => toggleGuess(item.id, false)}
                    className={`px-2.5 py-1 rounded text-xs font-mono font-bold uppercase transition-all cursor-pointer ${
                      userChoice === false
                        ? 'bg-[var(--text-muted)] text-white shadow-xs'
                        : 'bg-[var(--surface-elevated)] hover:bg-[var(--surface-hover)] text-[var(--text-secondary)] border border-[var(--border-subtle)]'
                    }`}
                  >
                    Không AI
                  </button>
                </div>
              </div>

              {isAnswerVisible && (
                <div className="mt-2.5 pt-2 border-t border-[var(--border-subtle)] flex items-start gap-2 text-sm">
                  {item.isAi ? (
                    <span className="inline-block px-2 py-0.5 rounded text-[11px] font-mono font-bold uppercase tracking-wider bg-[var(--accent-bioluminescent)]/20 text-[var(--accent-bioluminescent)] shrink-0">
                      [CÓ AI]
                    </span>
                  ) : (
                    <span className="inline-block px-2 py-0.5 rounded text-[11px] font-mono font-bold uppercase tracking-wider bg-[var(--border-subtle)] text-[var(--text-secondary)] shrink-0">
                      [TỰ ĐỘNG HÓA]
                    </span>
                  )}
                  <span className="text-[var(--text-secondary)] leading-snug">{item.explanation}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
