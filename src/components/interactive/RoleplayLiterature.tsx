'use client';

import React, { useState } from 'react';

export default function RoleplayLiterature() {
  const [character, setCharacter] = useState<'lao-hac' | 'chien-si'>('lao-hac');

  const dialogLaoHac = [
    {
      speaker: 'Hàng xóm (Học sinh)',
      text: 'Bác Hạc ơi! Em nghe nói bác vừa bán cậu Vàng đi rồi, có thật không bác?'
    },
    {
      speaker: 'Lão Hạc (AI Nhập vai)',
      text: '(Ngậm ngùi, mắt ầng ậc nước) "Khốn nạn... ông giáo ơi! Nó có biết gì đâu! Nó thấy tôi gọi thì ngoáy đuôi mừng rỡ chạy lại. Tôi vừa cho nó ăn thì thằng Mục với thằng Xiên núp sau cánh cửa túm lấy hai chân sau dốc ngược lên... Nó kêu ư ử nhìn tôi như muốn trách: A, lão già tệ lắm! Tôi ăn ở với lão như thế mà lão nỡ xử với tôi như thế này ư?..."'
    },
    {
      speaker: 'Hàng xóm (Học sinh)',
      text: 'Bác nghèo quá mới phải làm vậy để giữ mảnh vườn cho anh con trai. Bác nghĩ anh ấy về có thấu hiểu cho nỗi khổ này của bác không?'
    },
    {
      speaker: 'Lão Hạc (AI Nhập vai)',
      text: '"Tôi chỉ mong thằng con tôi nó hiểu... Cả đời tôi nghèo hèn, không lo nổi cho nó manh chiếu cưới vợ để nó phải phẫn chí đi đồn điền cao su. Tôi già yếu rồi, không làm thuê được nữa, ăn vào tiền hoa lợi của vườn thì con tôi về lấy gì mà sống? Bán cậu Vàng đi, lòng tôi đau như cắt từng khúc ruột, nhưng có thế mới giữ trọn mảnh vườn cho con..."'
    }
  ];

  const dialogChienSi = [
    {
      speaker: 'Học sinh',
      text: 'Chào chú bộ đội! Đêm kéo pháo vượt dốc đèo gian khổ ở Điện Biên Phủ, điều gì đã tiếp thêm sức mạnh cho các chú không bỏ cuộc?'
    },
    {
      speaker: 'Chiến sĩ Điện Biên (AI Nhập vai)',
      text: '"Chào cháu! Đêm ở dốc Chuối, trời tối đen như mực, mưa rừng tuôn xối xả làm đường trơn như đổ mỡ. Mỗi khẩu pháo nặng hơn hai tấn, chỉ cần một nhát chèn trượt là pháo lăn xuống vực sâu. Nhưng trong đầu anh em chúng tôi chỉ có một ý nghĩ: Mỗi mét pháo tiến lên là đưa quân ta đến gần ngày toàn thắng, trả lại độc lập tự do cho đồng bào!"'
    }
  ];

  const currentDialog = character === 'lao-hac' ? dialogLaoHac : dialogChienSi;

  return (
    <div className="bg-[var(--surface-card)] rounded-2xl p-6 sm:p-8 border border-[var(--border-main)] shadow-xs mt-6 transition-colors">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <span className="inline-flex items-center px-3 py-1 rounded-md font-mono text-xs font-bold bg-[var(--accent-bioluminescent)]/15 text-[var(--accent-bioluminescent)] uppercase tracking-[0.16em]">
            NGỮ VĂN & KHOA HỌC XÃ HỘI
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)] mt-2">
            Mô Phỏng Nhập Vai: Đối Thoại Cùng Nhân Vật
          </h3>
          <p className="text-[var(--text-secondary)] text-base sm:text-lg mt-1">
            Chọn nhân vật để xem cách AI hóa thân sống động, giúp học sinh thấu hiểu tâm lý nhân vật sâu sắc gấp 10 lần đọc vẹt sách mẫu.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setCharacter('lao-hac')}
            className={`px-4 py-2 rounded-md font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
              character === 'lao-hac'
                ? 'bg-[var(--accent-bioluminescent)] text-white shadow-xs'
                : 'bg-[var(--surface-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-main)]'
            }`}
          >
            Lão Hạc (Nam Cao)
          </button>
          <button
            onClick={() => setCharacter('chien-si')}
            className={`px-4 py-2 rounded-md font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
              character === 'chien-si'
                ? 'bg-[var(--accent-bioluminescent)] text-white shadow-xs'
                : 'bg-[var(--surface-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-main)]'
            }`}
          >
            Chiến sĩ Điện Biên Phủ
          </button>
        </div>
      </div>

      {/* Dialog box */}
      <div className="space-y-4 p-5 sm:p-6 bg-[var(--surface-elevated)] rounded-xl border border-[var(--border-main)]">
        {currentDialog.map((item, idx) => (
          <div key={idx} className="p-4 bg-[var(--surface-card)] rounded-lg border border-[var(--border-subtle)]">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent-bioluminescent)] mb-1.5">
              [{item.speaker}]
            </div>
            <p className="text-[var(--text-primary)] text-base sm:text-lg leading-relaxed italic">
              {item.text}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-[var(--surface-elevated)] rounded-xl border border-[var(--border-main)] text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent-bioluminescent)] block mb-0.5">
          [Lời khuyên sư phạm cho Thầy/Cô]
        </span>
        Sau khi học sinh phỏng vấn nhân vật trên màn hình, hãy yêu cầu các em viết lại 1 đoạn văn cảm nhận bằng chính cảm xúc chân thành của các em, không copy văn AI.
      </div>
    </div>
  );
}
