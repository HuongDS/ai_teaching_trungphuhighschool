'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Copy,
  Check,
  MessageSquare,
  Trophy,
  Zap,
} from 'lucide-react';

interface RoundStep {
  round: number;
  title: string;
  aiPreviousOutput?: string;
  question: string;
  options: {
    id: string;
    text: string;
    isOptimal: boolean;
    feedback: string;
    aiResponse: string;
  }[];
}

const THREE_ROUNDS_GAME: RoundStep[] = [
  {
    round: 1,
    title: 'Hiệp 1: Khởi đầu thông minh (Tránh hỏi cụt lủn)',
    question:
      'Em đang học bài "Quang hợp ở thực vật" (Sinh học 11) và thấy phần Pha sáng - Pha tối quá rắc rối. Mở đầu phiên chat, em chọn câu lệnh nào tốt nhất?',
    options: [
      {
        id: 'r1-a',
        text: '"Quang hợp là gì?"',
        isOptimal: false,
        feedback:
          'Câu hỏi quá rộng và cụt lủn! AI sẽ chép lại định nghĩa sách giáo khoa dài hàng trang khiến em càng rối hơn.',
        aiResponse:
          'Quang hợp là quá trình thu nhận và chuyển hóa năng lượng ánh sáng mặt trời của thực vật, tảo và một số vi khuẩn để tạo ra hợp chất hữu cơ từ CO2 và nước...',
      },
      {
        id: 'r1-b',
        text: '"Hãy đóng vai giáo viên Sinh học vui tính, giải thích sự khác nhau giữa Pha sáng và Pha tối trong quang hợp bằng ví dụ nhà máy sản xuất kẹo cho học sinh lớp 11 dễ hiểu."',
        isOptimal: true,
        feedback:
          'Chính xác! Em đã kích hoạt "Siêu năng lực Giải thích trực quan + Đóng vai" ngay từ Hiệp 1!',
        aiResponse:
          'Hãy tưởng tượng chiếc lá là một Nhà máy sản xuất kẹo đường Glucose:\n• Pha sáng là "Tổ Pin Mặt Trời": Chỉ làm việc khi có nắng, hứng ánh sáng để sạc đầy 2 cục pin năng lượng là ATP và NADPH (đồng thời nhả khí O2).\n• Pha tối là "Tổ Nấu Kẹo": Không cần nắng trực tiếp, lấy 2 cục pin ATP & NADPH vừa sạc để nhào nặn khí CO2 thành những viên kẹo đường Glucose nuôi cây!',
      },
      {
        id: 'r1-c',
        text: '"Viết báo cáo khoa học 3000 từ về cơ chế quang hợp."',
        isOptimal: false,
        feedback:
          'Quá hàn lâm! Khi đang rối kiến thức cơ bản, yêu cầu báo cáo dài sẽ khiến em bị ngợp thông tin.',
        aiResponse:
          'CHƯƠNG 1: QUANG HỆ I VÀ QUANG HỆ II TRONG MÀNG THYLAKOID. Chuỗi truyền điện tử quang hợp diễn ra qua phức hệ cytochrome b6f...',
      },
    ],
  },
  {
    round: 2,
    title: 'Hiệp 2: Thu hẹp & Tinh chỉnh kết quả (Multi-turn)',
    aiPreviousOutput:
      'AI vừa giải thích Pha sáng và Pha tối bằng ẩn dụ "Nhà máy kẹo" rất dễ hiểu, nhưng em cần ghi nhanh vào vở ôn thi.',
    question:
      'Tiếp nối ngay trong phiên chat đó (Hiệp 2), em nên ra lệnh gì để có bảng tóm tắt cô đọng nhất ghi vào vở?',
    options: [
      {
        id: 'r2-a',
        text: '"Hay quá! Bây giờ hãy tóm tắt lại nội dung trên thành 1 bảng so sánh Pha sáng và Pha tối gồm 3 tiêu chí: Nơi diễn ra, Nguyên liệu đầu vào, Sản phẩm đầu ra (mỗi ô dưới 10 từ)."',
        isOptimal: true,
        feedback:
          'Tuyệt đỉnh! Giữ nguyên ngữ cảnh Hiệp 1 và ép định dạng bảng + giới hạn số từ giúp em có ngay sơ đồ ôn thi chuẩn xác.',
        aiResponse:
          'Bảng so sánh siêu tốc:\n1. Nơi diễn ra: Pha sáng (Màng Thylakoid) | Pha tối (Chất nền Stroma)\n2. Nguyên liệu: Pha sáng (Ánh sáng, H2O, ADP, NADP+) | Pha tối (CO2, ATP, NADPH)\n3. Sản phẩm: Pha sáng (ATP, NADPH, khí O2) | Pha tối (Chất hữu cơ C6H12O6)',
      },
      {
        id: 'r2-b',
        text: '"Tắt tab đi mở cuộc trò chuyện mới và hỏi lại từ đầu."',
        isOptimal: false,
        feedback:
          'Sai lầm phổ biến! Tắt tab mở lại sẽ làm AI mất toàn bộ ngữ cảnh đang trao đổi ở Hiệp 1.',
        aiResponse: 'Xin chào, tôi có thể giúp gì mới cho bạn hôm nay?',
      },
      {
        id: 'r2-c',
        text: '"Nói thêm mọi thứ bạn biết về thực vật đi."',
        isOptimal: false,
        feedback:
          'Lạc đề! Khi đang cần cô đọng kiến thức, câu hỏi lan man sẽ kéo cuộc hội thoại đi xa mục tiêu ôn tập.',
        aiResponse: 'Thực vật có hơn 300.000 loài khác nhau từ rêu, dương xỉ đến thực vật hạt kín...',
      },
    ],
  },
  {
    round: 3,
    title: 'Hiệp 3: Thách đố kiểm tra ngược (Active Check)',
    aiPreviousOutput:
      'Em đã hiểu ẩn dụ và có bảng so sánh cực gọn. Giờ là bước khóa chặt kiến thức vào trí nhớ dài hạn!',
    question:
      'Ở Hiệp 3 quyết định này, câu lệnh nào biến AI thành người khảo bài thông minh nhất?',
    options: [
      {
        id: 'r3-a',
        text: '"Cảm ơn nhé, mình đóng máy đi ngủ đây."',
        isOptimal: false,
        feedback:
          'Hơi tiếc! Nếu chỉ đọc xuôi mà không tự kiểm tra lại, em sẽ quên 60% kiến thức vào ngày mai.',
        aiResponse: 'Chúc bạn ngủ ngon! Hẹn gặp lại lần sau.',
      },
      {
        id: 'r3-b',
        text: '"Hãy chép cho tôi 10 câu hỏi kèm sẵn đáp án đúng tô đậm ngay bên dưới."',
        isOptimal: false,
        feedback:
          'Khi đáp án hiện sẵn ngay dưới câu hỏi, mắt em sẽ nhìn thấy đáp án trước khi não kịp suy nghĩ!',
        aiResponse: 'Câu 1: O2 sinh ra ở pha nào? -> Đáp án đúng: Pha sáng.',
      },
      {
        id: 'r3-c',
        text: '"Tuyệt vời! Bây giờ hãy đặt cho tôi 2 câu hỏi trắc nghiệm bẫy dễ nhầm lẫn về Pha sáng - Pha tối để kiểm tra tôi. ĐỪNG hiện đáp án vội, hãy chờ tôi trả lời!"',
        isOptimal: true,
        feedback:
          'Xuất sắc 10/10! Đây chính là bí quyết "Cuộc trò chuyện 3 hiệp" biến người học thụ động thành người làm chủ AI!',
        aiResponse:
          'Thử thách bắt đầu! Câu 1: Khí Oxy (O2) thoát ra trong quá trình quang hợp có nguồn gốc từ phân tử nào?\nA) Khí CO2   B) Phân tử nước (H2O) trong pha sáng   C) Glucose   D) Chất diệp lục.\nHãy cho tôi biết lựa chọn của bạn nhé!',
      },
    ],
  },
];

const POWERS = [
  {
    id: 1,
    title: '1. Giải Thích Trực Quan',
    tag: 'Ẩn dụ hóa',
    prompt:
      'Hãy giải thích định luật vạn vật hấp dẫn của Newton bằng ví dụ về quả bóng đá bị sút lên trời, dành cho học sinh lớp 10 dễ hiểu nhất.',
    sampleOutput:
      'Hãy tưởng tượng: Khi bạn sút một quả bóng lên trời, lực sút của bạn đẩy nó bay lên. Nhưng Trái Đất như một chiếc nam châm khổng lồ tàng hình liên tục "kéo" quả bóng trở lại mặt đất. Đó chính là lực hấp dẫn!',
  },
  {
    id: 2,
    title: '2. Tóm Tắt Siêu Tốc',
    tag: 'Cô đọng',
    prompt:
      'Tóm tắt ý nghĩa của Chiến thắng Điện Biên Phủ năm 1954 thành đúng 3 gạch đầu dòng, mỗi gạch không quá 25 từ.',
    sampleOutput:
      '• Đập tan kế hoạch Nava, kết thúc 9 năm kháng chiến chống thực dân Pháp oanh liệt.\n• Buộc Pháp phải ký Hiệp định Giơ-ne-vơ lập lại hòa bình tại Đông Dương.\n• Cổ vũ mạnh mẽ phong trào giải phóng dân tộc của các nước thuộc địa trên thế giới.',
  },
  {
    id: 3,
    title: '3. Khơi Nguồn Sáng Tạo',
    tag: 'Brainstorm',
    prompt:
      'Gợi ý 3 tên chủ đề thật cuốn hút, trẻ trung và hài hước cho buổi sinh hoạt câu lạc bộ sách trường THPT.',
    sampleOutput:
      '1. "Đọc sách không quạu: Bí kíp sống sót qua mùa kiểm tra"\n2. "Cuộc hẹn với chữ: Đọc để hết ngố"\n3. "Trạm dừng thanh xuân: 10 trang sách, vạn góc nhìn"',
  },
  {
    id: 4,
    title: '4. Đóng Vai Chuyên Gia',
    tag: 'Roleplay',
    prompt:
      'Hãy đóng vai một bác sĩ nhãn khoa và khuyên một học sinh lớp 11 cách bảo vệ mắt khi phải ôn thi khuya.',
    sampleOutput:
      '"Chào cháu! Bác sĩ hiểu áp lực thi cử của cháu lúc này. Nhưng nhớ quy tắc 20-20-20 nhé: Cứ sau 20 phút nhìn màn hình/sách, hãy phóng tầm mắt xa 6 mét trong 20 giây để cơ mắt được thả lỏng!"',
  },
];

export default function SuperpowersDemo() {
  const [activeTab, setActiveTab] = useState<'game' | 'superpowers'>('game');
  const [currentRoundIdx, setCurrentRoundIdx] = useState<number>(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<number, string>>({});
  const [activePower, setActivePower] = useState<number>(1);
  const [copied, setCopied] = useState(false);

  const currentRound = THREE_ROUNDS_GAME[currentRoundIdx];
  const chosenOptionId = selectedOptions[currentRound.round];
  const chosenOption = currentRound.options.find((o) => o.id === chosenOptionId);

  const score = THREE_ROUNDS_GAME.reduce((acc, r) => {
    const pick = r.options.find((o) => o.id === selectedOptions[r.round]);
    return acc + (pick?.isOptimal ? 1 : 0);
  }, 0);

  const handleSelectOption = (optionId: string, isOptimal: boolean) => {
    setSelectedOptions((prev) => ({ ...prev, [currentRound.round]: optionId }));
    if (isOptimal) {
      try {
        confetti({
          particleCount: 45,
          spread: 60,
          origin: { y: 0.7 },
        });
      } catch {}
    }
  };

  const resetGame = () => {
    setSelectedOptions({});
    setCurrentRoundIdx(0);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[var(--surface-card)] rounded-2xl p-5 sm:p-7 border-2 border-[var(--border-main)] shadow-md space-y-5">
      {/* Top Header & Tab Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[var(--border-main)]">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('game')}
            className={`px-4 py-2 rounded-xl font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'game'
                ? 'bg-[var(--accent-bioluminescent)] text-white shadow-sm'
                : 'bg-[var(--surface-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)]'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>Game: Võ Đài Đối Thoại 3 Hiệp</span>
          </button>
          <button
            onClick={() => setActiveTab('superpowers')}
            className={`px-4 py-2 rounded-xl font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'superpowers'
                ? 'bg-[var(--accent-bioluminescent)] text-white shadow-sm'
                : 'bg-[var(--surface-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)]'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>4 Siêu Năng Lực GenAI</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3.5 py-1.5 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border-main)] font-mono text-xs font-bold flex items-center gap-1.5">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>
              Điểm chuỗi 3 hiệp: <strong className="text-[var(--accent-bioluminescent)]">{score}</strong> / 3
            </span>
          </div>
          <button
            onClick={resetGame}
            className="p-2 rounded-xl bg-[var(--surface-elevated)] hover:bg-[var(--surface-hover)] text-[var(--text-secondary)] border border-[var(--border-main)] cursor-pointer"
            title="Chơi lại từ Hiệp 1"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {activeTab === 'game' && (
        <div className="space-y-5">
          {/* 3-Round Stepper */}
          <div className="grid grid-cols-3 gap-2.5">
            {THREE_ROUNDS_GAME.map((r, idx) => {
              const picked = r.options.find((o) => o.id === selectedOptions[r.round]);
              const isCurrent = idx === currentRoundIdx;
              return (
                <button
                  key={r.round}
                  onClick={() => setCurrentRoundIdx(idx)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                    isCurrent
                      ? 'border-[var(--accent-bioluminescent)] bg-[var(--accent-bioluminescent)]/15 text-[var(--text-primary)] ring-1 ring-[var(--accent-bioluminescent)]'
                      : 'border-[var(--border-subtle)] bg-[var(--surface-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <div>
                    <div className="font-mono text-[11px] font-extrabold uppercase text-[var(--accent-bioluminescent)]">
                      HIỆP 0{r.round} / 03
                    </div>
                    <div className="font-bold text-xs sm:text-sm truncate mt-0.5">{r.title.split(':')[1]}</div>
                  </div>
                  {picked && (
                    <span>
                      {picked.isOptimal ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                      )}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Round Scenario & Question */}
          <div className="p-5 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border-main)] space-y-4">
            {currentRound.aiPreviousOutput && (
              <div className="p-3.5 rounded-xl bg-[var(--surface-card)] border border-[var(--border-subtle)] text-xs sm:text-sm text-[var(--text-secondary)] flex items-start gap-2.5">
                <MessageSquare className="w-4 h-4 text-[var(--accent-bioluminescent)] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[var(--accent-bioluminescent)] font-mono uppercase">Ngữ cảnh từ hiệp trước: </strong>
                  {currentRound.aiPreviousOutput}
                </div>
              </div>
            )}

            <h4 className="text-base sm:text-xl font-extrabold text-[var(--text-primary)]">
              🎯 {currentRound.question}
            </h4>

            <div className="grid grid-cols-1 gap-3">
              {currentRound.options.map((opt, idx) => {
                const isSelected = chosenOptionId === opt.id;
                let style =
                  'bg-[var(--surface-card)] border-[var(--border-subtle)] hover:border-[var(--accent-bioluminescent)] text-[var(--text-primary)]';
                if (isSelected) {
                  style = opt.isOptimal
                    ? 'bg-emerald-500/15 border-emerald-500 text-[var(--text-primary)] ring-2 ring-emerald-500/40'
                    : 'bg-rose-500/15 border-rose-500 text-[var(--text-primary)] ring-2 ring-rose-500/40';
                }

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(opt.id, opt.isOptimal)}
                    className={`p-4 rounded-xl border-2 text-left transition-all cursor-pointer flex items-start gap-3 ${style}`}
                  >
                    <span className="w-7 h-7 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border-main)] font-mono text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-sm sm:text-base font-semibold leading-relaxed">{opt.text}</span>
                  </button>
                );
              })}
            </div>

            {/* Instant Feedback & Simulated AI Response */}
            {chosenOption && (
              <div
                className={`p-4 sm:p-5 rounded-xl border-2 space-y-3 transition-all ${
                  chosenOption.isOptimal
                    ? 'bg-emerald-500/10 border-emerald-500/40'
                    : 'bg-rose-500/10 border-rose-500/40'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`font-mono text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5 ${
                      chosenOption.isOptimal ? 'text-emerald-500' : 'text-rose-500'
                    }`}
                  >
                    {chosenOption.isOptimal ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>NƯỚC ĐI CHUẨN XÁC! (+1 ĐIỂM)</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4" />
                        <span>CHƯA TỐI ƯU — HÃY THỬ PHƯƠNG ÁN KHÁC!</span>
                      </>
                    )}
                  </span>

                  {chosenOption.isOptimal && currentRoundIdx < THREE_ROUNDS_GAME.length - 1 && (
                    <button
                      onClick={() => setCurrentRoundIdx((prev) => prev + 1)}
                      className="px-4 py-1.5 rounded-lg bg-[var(--accent-bioluminescent)] text-white font-mono text-xs font-bold cursor-pointer hover:opacity-90"
                    >
                      Sang Hiệp {currentRoundIdx + 2} →
                    </button>
                  )}
                </div>

                <p className="text-sm sm:text-base font-bold text-[var(--text-primary)]">
                  {chosenOption.feedback}
                </p>

                <div className="p-3.5 rounded-lg bg-[var(--surface-card)] border border-[var(--border-subtle)] text-xs sm:text-sm text-[var(--text-secondary)] whitespace-pre-line leading-relaxed">
                  <strong className="font-mono text-[11px] uppercase text-[var(--accent-bioluminescent)] block mb-1">
                    🤖 Phản hồi của AI với câu lệnh này:
                  </strong>
                  {chosenOption.aiResponse}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'superpowers' && (
        <div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
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
                  <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider block mt-0.5">
                    {power.tag}
                  </span>
                </button>
              );
            })}
          </div>

          {(() => {
            const current = POWERS.find((p) => p.id === activePower)!;
            return (
              <div className="bg-[var(--surface-elevated)] border border-[var(--border-main)] rounded-xl p-5">
                <div className="flex items-center justify-between gap-4 mb-3">
                  <span className="text-xs font-mono font-bold uppercase tracking-[0.14em] text-[var(--accent-bioluminescent)]">
                    CÂU LỆNH DEMO MẪU (PROMPT)
                  </span>
                  <button
                    onClick={() => copyToClipboard(current.prompt)}
                    className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-primary)] hover:text-[var(--accent-bioluminescent)] cursor-pointer bg-[var(--surface-card)] px-3 py-1.5 rounded border border-[var(--border-subtle)] flex items-center gap-1.5"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Đã sao chép' : 'Sao chép Prompt'}</span>
                  </button>
                </div>
                <div className="p-4 bg-[var(--surface-card)] rounded-lg border border-[var(--border-subtle)] text-[var(--text-primary)] font-mono text-sm sm:text-base mb-4 leading-relaxed">
                  &ldquo;{current.prompt}&rdquo;
                </div>

                <span className="text-xs font-mono font-bold uppercase tracking-[0.14em] text-[var(--accent-aqua)] block mb-1">
                  KẾT QUẢ AI TRẢ VỀ NGAY TỨC THÌ
                </span>
                <div className="mt-2 p-4 bg-[var(--surface-card)] rounded-lg border border-[var(--border-subtle)] text-[var(--text-secondary)] text-sm sm:text-base leading-relaxed whitespace-pre-line">
                  {current.sampleOutput}
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}
