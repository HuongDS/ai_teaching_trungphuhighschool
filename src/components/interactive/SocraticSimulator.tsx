'use client';

import React, { useState } from 'react';

export default function SocraticSimulator() {
  const [currentStep, setCurrentStep] = useState(0);

  const dialogSteps = [
    {
      sender: 'user',
      text: 'Gia sư ơi giải giúp em bài này: "Một người thợ săn đi 1km về phía Nam, sau đó đi 1km về phía Đông, rồi đi 1km về phía Bắc và thấy mình quay trở về đúng điểm xuất phát ban đầu. Người thợ săn nhìn thấy một con gấu. Con gấu đó có màu gì? Vì sao?"'
    },
    {
      sender: 'ai',
      badge: 'CHẾ ĐỘ SOCRATIC: KHÓA ĐÁP ÁN',
      text: 'Chào bạn! Thầy sẽ không cho bạn đáp án ngay đâu nhé. Hãy suy luận cùng thầy từng bước một: Trên một mặt phẳng thông thường, nếu bạn đi Nam -> Đông -> Bắc thì hình vẽ sẽ là hình chữ U dở dang, bạn KHÔNG THỂ về điểm xuất phát. Nhưng Trái Đất của chúng ta có hình gì đặc biệt? Và có điểm nào trên Trái Đất mà mọi hướng nhìn ra đều là hướng Nam không?'
    },
    {
      sender: 'user',
      text: 'Dạ Trái Đất hình cầu ạ! Điểm mà đứng ở đó mọi hướng đều là hướng Nam chắc chắn là điểm Cực Bắc (Bắc Cực) ạ!'
    },
    {
      sender: 'ai',
      badge: 'ĐÁNH GIÁ & GỢI MỞ TIẾP',
      text: 'Chính xác 100%! Trí tuệ của bạn rất sắc bén! Nếu người thợ săn xuất phát từ đúng điểm Cực Bắc, ông ta đi 1km Nam (xuống dưới), sau đó đi 1km Đông (đi vòng quanh một vĩ tuyến), rồi đi 1km Bắc thì ông ta lại đi ngược về đỉnh Cực Bắc. Vậy ở vùng đất Bắc Cực quanh năm băng tuyết bao phủ, loài gấu nào sinh sống ở đó và lông của chúng có màu gì để ngụy trang?'
    },
    {
      sender: 'user',
      text: 'Aaa em biết rồi! Đó là Gấu Bắc Cực (Polar Bear) và lông của nó có màu TRẮNG ạ!'
    },
    {
      sender: 'ai',
      badge: 'HOÀN THÀNH BỨT PHÁ TƯ DUY',
      text: 'Xuất sắc! Bạn thấy không, bạn hoàn toàn tự mình tìm ra đáp án mà không cần ai làm hộ cả! Cảm giác tự mình chinh phục câu đố tuyệt vời hơn việc chỉ chép đáp án rất nhiều đúng không nào?'
    }
  ];

  return (
    <div className="bg-[var(--surface-card)] rounded-2xl p-6 sm:p-8 border border-[var(--border-main)] shadow-xs mt-6 transition-colors">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <span className="inline-flex items-center px-3 py-1 rounded-md font-mono text-xs font-bold bg-[var(--accent-bioluminescent)]/15 text-[var(--accent-bioluminescent)] uppercase tracking-[0.16em]">
            MÔ PHỎNG LỚP HỌC
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)] mt-2">
            Mô Phỏng Gia Sư Socratic: Cấm Cho Đáp Án Ngay
          </h3>
          <p className="text-[var(--text-secondary)] text-base sm:text-lg mt-1">
            Bấm nút &ldquo;Bước Tiếp Theo&rdquo; để chiếu từng lượt đối thoại gợi mở dẫn dắt học sinh tự tìm ra đáp án.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentStep((prev) => Math.min(prev + 1, dialogSteps.length - 1))}
            disabled={currentStep >= dialogSteps.length - 1}
            className="px-4 py-2 rounded-md font-mono text-xs uppercase tracking-[0.12em] font-bold bg-[var(--btn-solid-bg)] hover:bg-[var(--btn-solid-hover)] disabled:opacity-40 text-[var(--btn-solid-text)] transition-all shadow-sm cursor-pointer"
          >
            Bước Tiếp Theo →
          </button>
          <button
            onClick={() => setCurrentStep(0)}
            className="px-3 py-2 rounded-md font-mono text-xs uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] border border-[var(--border-main)] cursor-pointer"
            title="Xem lại từ đầu"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Chat Simulation Area */}
      <div className="space-y-4 max-h-[500px] overflow-y-auto p-4 sm:p-6 bg-[var(--surface-elevated)] rounded-xl border border-[var(--border-main)]">
        {dialogSteps.slice(0, currentStep + 1).map((msg, index) => {
          const isAi = msg.sender === 'ai';
          return (
            <div
              key={index}
              className={`flex items-start gap-3 ${isAi ? 'justify-start' : 'justify-end'}`}
            >
              {isAi && (
                <div className="px-2 py-1 rounded bg-[var(--accent-bioluminescent)] text-white font-mono text-[11px] font-bold uppercase shrink-0">
                  AI
                </div>
              )}
              <div
                className={`max-w-[85%] p-4 rounded-xl text-base sm:text-lg leading-relaxed ${
                  isAi
                    ? 'bg-[var(--surface-card)] border border-[var(--border-subtle)] text-[var(--text-primary)] shadow-xs'
                    : 'bg-aurora-gradient text-[var(--btn-aurora-text)] shadow-xs font-medium'
                }`}
              >
                {msg.badge && (
                  <div className="text-[11px] font-mono font-bold uppercase tracking-[0.14em] text-[var(--accent-bioluminescent)] mb-1">
                    [{msg.badge}]
                  </div>
                )}
                <div>{msg.text}</div>
              </div>
              {!isAi && (
                <div className="px-2 py-1 rounded bg-[var(--surface-card)] border border-[var(--border-main)] text-[var(--text-primary)] font-mono text-[11px] font-bold uppercase shrink-0">
                  HS
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-[var(--surface-elevated)] rounded-xl border border-[var(--border-main)] text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent-bioluminescent)] block mb-0.5">
          [Thông điệp gửi học sinh]
        </span>
        Dùng AI làm bài tập hộ hệt như thuê xe ôm chạy việt dã hộ. Chỉ khi não bạn tự suy nghĩ vượt qua từng gợi mở của thầy cô hay AI, bạn mới trở thành người chiến thắng thực sự.
      </div>
    </div>
  );
}
