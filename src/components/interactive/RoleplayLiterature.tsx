'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  BookOpen,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Trophy,
  MessageCircle,
} from 'lucide-react';

interface InterviewRound {
  id: number;
  character: string;
  work: string;
  context: string;
  options: {
    id: string;
    questionText: string;
    isDeep: boolean;
    characterReply: string;
    literaryInsight: string;
  }[];
}

const INTERVIEW_ROUNDS: InterviewRound[] = [
  {
    id: 1,
    character: 'Lão Hạc',
    work: 'Truyện ngắn Lão Hạc (Nam Cao)',
    context:
      'Buổi chiều sau khi Lão Hạc vừa phải dằn lòng bán đi Cậu Vàng — kỷ vật duy nhất của người con trai đi đồn điền cao su.',
    options: [
      {
        id: 'lh-1',
        questionText: 'A. "Bác Hạc ơi, bác bán con chó Vàng được bao nhiêu tiền thế?"',
        isDeep: false,
        characterReply: '"Được có năm đồng bạc thôi cậu ạ..." (Lão Hạc cúi mặt im lặng không nói thêm gì).',
        literaryInsight:
          'Câu hỏi bề nổi chỉ chạm vào con số vật chất, chưa khơi gợi được bi kịch nội tâm và lòng tự trọng của người nông dân.',
      },
      {
        id: 'lh-2',
        questionText:
          'B. "Bác Hạc ơi, khoảnh khắc cậu Vàng nhìn bác như trách móc lúc bị bắt đi, điều gì làm trái tim bác đau đớn nhất?"',
        isDeep: true,
        characterReply:
          '"Khốn nạn... ông giáo ơi! Nó có biết gì đâu! Thấy tôi gọi thì nó chạy lại vẫy đuôi mừng. Tôi già bằng này tuổi đầu rồi còn đi đánh lừa một con chó! Nhưng nếu tôi không bấm bụng bán nó đi, ăn lẹm vào mảnh vườn của thằng con trai thì khi nó về biết lấy gì sinh sống..."',
        literaryInsight:
          'Câu hỏi chạm đúng bi kịch nhân đạo sâu sắc nhất của Nam Cao: Lòng tự trọng trong sạch và tình phụ tử thiêng liêng ẩn sau vẻ ngoài khắc khổ!',
      },
      {
        id: 'lh-3',
        questionText: 'C. "Sao bác không nuôi con mèo cho đỡ tốn cơm hơn nuôi chó?"',
        isDeep: false,
        characterReply: '"Cậu Vàng là của thằng con tôi để lại trước lúc đi xa cậu ạ..."',
        literaryInsight:
          'Câu hỏi chưa đặt mình vào hoàn cảnh kỷ vật tinh thần gắn kết hai cha con Lão Hạc.',
      },
    ],
  },
  {
    id: 2,
    character: 'Chiến sĩ kéo pháo Điện Biên',
    work: 'Chiến dịch Điện Biên Phủ 1954 (Lịch sử Việt Nam)',
    context:
      'Đêm mưa rừng tầm tã trên dốc Pha Đin & dốc Chuối, bộ đội ta dùng sức người kéo những khẩu pháo nặng hơn 2 tấn vượt núi cao.',
    options: [
      {
        id: 'db-1',
        questionText:
          'A. "Chào chú bộ đội! Giữa đêm mưa rừng vực sâu hiểm trở và phương châm đổi từ Đánh nhanh thắng nhanh sang Đánh chắc tiến chắc, ý nghĩ nào giúp các chú giữ chặt dây tời không buông?"',
        isDeep: true,
        characterReply:
          '"Mưa rừng xối xả làm đường trơn như đổ mỡ, vai anh em rớm máu vì dây tời. Khi có lệnh kéo pháo ra để chuẩn bị lại theo phương châm Đánh chắc tiến chắc của Đại tướng, dù vất vả gấp đôi nhưng ai cũng hiểu: Giữ chắc từng tấc dây hôm nay là giữ sinh mệnh đồng đội và ngày toàn thắng của cả dân tộc!"',
        literaryInsight:
          'Khắc họa trọn vẹn ý chí thép và bước ngoặt chiến lược quân sự vĩ đại nhất của chiến dịch Điện Biên Phủ!',
      },
      {
        id: 'db-2',
        questionText: 'B. "Chú ơi, khẩu pháo dài bao nhiêu mét và sơn màu gì ạ?"',
        isDeep: false,
        characterReply: '"Pháo lựu 105 ly sơn màu xanh lá ngụy trang cháu ạ."',
        literaryInsight:
          'Câu hỏi chỉ thu về thông số kỹ thuật khô khan, chưa khai thác được giá trị lịch sử và tinh thần chiến đấu.',
      },
      {
        id: 'db-3',
        questionText: 'C. "Trời mưa thế sao các chú không nghỉ đợi hết mùa mưa rồi kéo tiếp?"',
        isDeep: false,
        characterReply: '"Chiến trường không chờ đợi ai cháu ơi, từng giờ từng phút đều là thời cơ chiến dịch!"',
        literaryInsight:
          'Chưa nắm được tính cấp bách của thời cơ chiến lược trong lịch sử kháng chiến.',
      },
    ],
  },
  {
    id: 3,
    character: 'Vũ Nương',
    work: 'Chuyện người con gái Nam Xương (Nguyễn Dữ)',
    context:
      'Khi Trương Sinh đi lính trở về, nghe lời con trẻ ngây thơ về "người cha đêm nào cũng đến" (chiếc bóng trên vách) mà nghi oan cho vợ.',
    options: [
      {
        id: 'vn-1',
        questionText: 'A. "Chị Vũ Nương ơi, nhà chị thắp đèn bằng dầu lạc hay dầu vừng thế?"',
        isDeep: false,
        characterReply: '"Chỉ là ngọn đèn dầu quê mùa thôi em ạ..."',
        literaryInsight: 'Chi tiết phụ không giúp giải mã bi kịch gia đình và thân phận người phụ nữ.',
      },
      {
        id: 'vn-2',
        questionText:
          'B. "Chỉ vì muốn vỗ về con trẻ đỡ nhớ cha mà trỏ bóng mình trên vách, đến khi chịu nỗi oan tày trời không lời giải bày, nỗi đau lớn nhất trong lòng nàng là gì?"',
        isDeep: true,
        characterReply:
          '"Kẻ bạc mệnh này duyên phận hẩm hiu, chồng con rẫy bỏ... Thiếp chỉ thương con thơ vắng cha nên mới mượn chiếc bóng trên tường để con vơi nỗi nhớ. Ngờ đâu lòng thành lại hóa mối nghi oan, gia đình tan vỡ, phẩm tiết trong sạch suốt bao năm đằng đẵng chờ chồng không được một lần lắng nghe!"',
        literaryInsight:
          'Đi thẳng vào nguyên nhân bi kịch: Sự độc đoán gia trưởng, thiếu lắng nghe và khát vọng bảo vệ danh dự của người phụ nữ phong kiến!',
      },
      {
        id: 'vn-3',
        questionText: 'C. "Bé Đản năm đó mấy tuổi rồi hả chị?"',
        isDeep: false,
        characterReply: '"Cháu mới vừa bi bô tập nói thôi..."',
        literaryInsight: 'Câu hỏi thông tin đơn thuần, chưa chạm tới chiều sâu tâm lý nhân vật.',
      },
    ],
  },
];

export default function RoleplayLiterature() {
  const [roundIdx, setRoundIdx] = useState<number>(0);
  const [pickedOptions, setPickedOptions] = useState<Record<number, string>>({});

  const currentRound = INTERVIEW_ROUNDS[roundIdx];
  const chosenId = pickedOptions[currentRound.id];
  const chosenOption = currentRound.options.find((o) => o.id === chosenId);

  const score = INTERVIEW_ROUNDS.reduce((acc, r) => {
    const pick = r.options.find((o) => o.id === pickedOptions[r.id]);
    return acc + (pick?.isDeep ? 1 : 0);
  }, 0);

  const handleSelect = (optId: string, isDeep: boolean) => {
    setPickedOptions((prev) => ({ ...prev, [currentRound.id]: optId }));
    if (isDeep) {
      try {
        confetti({
          particleCount: 45,
          spread: 60,
          origin: { y: 0.72 },
        });
      } catch {}
    }
  };

  const resetGame = () => {
    setPickedOptions({});
    setRoundIdx(0);
  };

  return (
    <div className="bg-[var(--surface-card)] rounded-2xl p-5 sm:p-7 border-2 border-[var(--border-main)] shadow-md space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[var(--border-main)]">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg font-mono text-xs font-extrabold bg-[var(--accent-bioluminescent)] text-white uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            GAME NHẬP VAI VĂN HỌC & LỊCH SỬ // PHỎNG VẤN XUYÊN KHÔNG
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] mt-2">
            Chọn Câu Hỏi Sâu Sắc Nhất Để Khai Mở Nội Tâm Nhân Vật
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3.5 py-1.5 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border-main)] font-mono text-xs font-bold flex items-center gap-1.5">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>
              Điểm thấu cảm: <strong className="text-[var(--accent-bioluminescent)]">{score}</strong> / 3 nhân vật
            </span>
          </div>
          <button
            onClick={resetGame}
            className="p-2 rounded-xl bg-[var(--surface-elevated)] hover:bg-[var(--surface-hover)] text-[var(--text-secondary)] border border-[var(--border-main)] cursor-pointer"
            title="Chơi lại"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Character Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {INTERVIEW_ROUNDS.map((r, idx) => {
          const picked = r.options.find((o) => o.id === pickedOptions[r.id]);
          return (
            <button
              key={r.id}
              onClick={() => setRoundIdx(idx)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                idx === roundIdx
                  ? 'border-[var(--accent-bioluminescent)] bg-[var(--accent-bioluminescent)]/15 text-[var(--text-primary)]'
                  : 'border-[var(--border-subtle)] bg-[var(--surface-elevated)] text-[var(--text-secondary)]'
              }`}
            >
              <div className="min-w-0">
                <div className="font-mono text-[11px] font-bold uppercase text-[var(--accent-bioluminescent)]">
                  Nhân vật #{r.id}
                </div>
                <div className="font-bold text-sm truncate">{r.character}</div>
              </div>
              {picked &&
                (picked.isDeep ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                ))}
            </button>
          );
        })}
      </div>

      {/* Active Character Interview Stage */}
      <div className="p-5 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border-main)] space-y-4">
        <div className="p-4 rounded-xl bg-[var(--surface-card)] border border-[var(--border-subtle)]">
          <div className="font-mono text-xs font-extrabold uppercase text-[var(--accent-bioluminescent)]">
            {currentRound.character} — {currentRound.work}
          </div>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] mt-1">
            <strong>Bối cảnh:</strong> {currentRound.context}
          </p>
        </div>

        <div className="space-y-2.5">
          <div className="font-mono text-xs font-bold uppercase text-[var(--text-muted)]">
            HÃY CHỌN CÂU HỎI PHỎNG VẤN GIÚP KHƠI GỢI CHIỀU SÂU TÁC PHẨM:
          </div>
          {currentRound.options.map((opt) => {
            const isSelected = chosenId === opt.id;
            let style =
              'bg-[var(--surface-card)] border-[var(--border-subtle)] hover:border-[var(--accent-bioluminescent)] text-[var(--text-primary)]';
            if (isSelected) {
              style = opt.isDeep
                ? 'bg-emerald-500/15 border-emerald-500 text-[var(--text-primary)] ring-2 ring-emerald-500/40'
                : 'bg-rose-500/15 border-rose-500 text-[var(--text-primary)] ring-2 ring-rose-500/40';
            }

            return (
              <button
                key={opt.id}
                onClick={() => handleSelect(opt.id, opt.isDeep)}
                className={`w-full p-4 rounded-xl border-2 text-left text-sm sm:text-base font-semibold transition-all cursor-pointer flex items-center justify-between gap-3 ${style}`}
              >
                <span>{opt.questionText}</span>
                {isSelected &&
                  (opt.isDeep ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                  ))}
              </button>
            );
          })}
        </div>

        {chosenOption && (
          <div
            className={`p-4 sm:p-5 rounded-xl border-2 space-y-3 ${
              chosenOption.isDeep
                ? 'bg-emerald-500/10 border-emerald-500/40'
                : 'bg-rose-500/10 border-rose-500/40'
            }`}
          >
            <div className="p-3.5 rounded-lg bg-[var(--surface-card)] border border-[var(--border-subtle)]">
              <div className="font-mono text-xs font-bold uppercase text-[var(--accent-bioluminescent)] flex items-center gap-1.5 mb-1">
                <MessageCircle className="w-3.5 h-3.5" />
                <span>[{currentRound.character} (AI Nhập vai) trả lời]:</span>
              </div>
              <p className="text-sm sm:text-base italic text-[var(--text-primary)] leading-relaxed">
                {chosenOption.characterReply}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs sm:text-sm font-bold text-[var(--text-primary)]">
                💡 <strong>Giá trị cảm thụ văn học / lịch sử:</strong> {chosenOption.literaryInsight}
              </p>

              {chosenOption.isDeep && roundIdx < INTERVIEW_ROUNDS.length - 1 && (
                <button
                  onClick={() => setRoundIdx((prev) => prev + 1)}
                  className="px-4 py-2 rounded-xl bg-[var(--accent-bioluminescent)] text-white font-mono text-xs font-bold cursor-pointer hover:opacity-90 shrink-0"
                >
                  Phỏng vấn nhân vật tiếp theo →
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
