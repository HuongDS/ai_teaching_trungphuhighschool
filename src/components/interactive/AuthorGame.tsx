'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  User,
  Bot,
  CheckCircle2,
  XCircle,
  Trophy,
  RotateCcw,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';

interface AuthorRound {
  id: number;
  topic: string;
  context: string;
  textA: string;
  textB: string;
  humanSide: 'A' | 'B';
  clueHuman: string;
  clueAi: string;
}

const ROUNDS: AuthorRound[] = [
  {
    id: 1,
    topic: 'Cơn mưa rào mùa hạ trên sân trường',
    context: 'Hãy đoán xem đoạn văn nào do Học sinh THPT viết, đoạn nào do AI (ChatGPT) viết!',
    textA:
      '“Tiếng trống tan trường vừa điểm thì mây đen kéo ùn ùn tới. Hạt mưa đầu mùa to bằng hạt ngô rơi lộp độp lên mái tôn. Mấy đứa bạn con trai trong lớp hò hét cởi áo khoác che đầu chạy ù ra nhà để xe, nước bắn ướt sũng cả gấu quần mà cười toe toét.”',
    textB:
      '“Cơn mưa rào mùa hạ trút xuống sân trường như dòng nước mát lành gột rửa mọi oi ả của ngày hè. Những tán cây bàng xòe rộng đón nhận từng giọt ngọc bích long lanh. Khung cảnh hiện lên vừa nên thơ, vừa gợi lên bao xúc cảm bâng khuâng của tuổi học trò.”',
    humanSide: 'A',
    clueHuman:
      'Đoạn A có chi tiết đời thực rất sống động ("hạt mưa to bằng hạt ngô", "ướt sũng gấu quần mà cười toe toét") gắn với ký ức thật của học sinh.',
    clueAi:
      'Đoạn B dùng từ hoa mỹ khuôn mẫu ("gột rửa mọi oi ả", "giọt ngọc bích long lanh"), câu chữ bóng bẩy nhưng thiếu trải nghiệm cá nhân.',
  },
  {
    id: 2,
    topic: 'Kỷ niệm ôn thi học kỳ môn Sinh học',
    context: 'Đâu là tâm sự thật của một học sinh, đâu là đoạn văn do AI tổng hợp?',
    textA:
      '“Quá trình ôn tập môn Sinh học đòi hỏi sự kết hợp hài hòa giữa việc nắm vững lý thuyết di truyền và rèn luyện kỹ năng giải bài tập xác suất. Mỗi trang sách mở ra đều mang lại nguồn tri thức quý giá về thế giới tự nhiên kỳ diệu.”',
    textB:
      '“Tối qua thức tới 12 giờ đêm vẽ đi vẽ lại sơ đồ lai của Men-đen mà vẫn nhầm tỉ lệ kiểu hình F2. Sáng vào lớp may sao đứa bạn cùng bàn chỉ cho mẹo tách giao tử nhanh, lúc phát đề ra trúng ngay câu đó mừng muốn rớt nước mắt!”',
    humanSide: 'B',
    clueHuman:
      'Đoạn B kể lại tình huống rất thật ("thức tới 12h đêm", "nhầm tỉ lệ F2", "bạn cùng bàn chỉ mẹo", "mừng muốn rớt nước mắt").',
    clueAi:
      'Đoạn A viết theo giọng văn tổng kết sách giáo khoa, chuẩn mực nhưng hoàn toàn không có cảm xúc hay câu chuyện cá nhân.',
  },
  {
    id: 3,
    topic: 'Bữa cơm chiều của Mẹ sau giờ học thêm',
    context: 'Hãy tìm ra đoạn văn chứa đựng cảm xúc thật của con người!',
    textA:
      '“Đạp xe về tới cổng đã ngửi thấy mùi cá kho tiêu cháy cạnh thơm lừng từ gian bếp nhỏ. Mẹ vừa thấy mình liền giục đi rửa mặt rồi múc sẵn tô canh rau ngót còn bốc khói. Ăn vội chén cơm nóng mà bao nhiêu mệt mỏi sau ca học chiều tan biến hết.”',
    textB:
      '“Bữa cơm gia đình luôn là sợi dây gắn kết tình cảm thiêng liêng giữa các thành viên sau một ngày dài làm việc và học tập mệt mỏi. Những món ăn tuy giản dị nhưng chứa đựng biết bao tình yêu thương bao la và sự hy sinh thầm lặng của người mẹ.”',
    humanSide: 'A',
    clueHuman:
      'Đoạn A đánh thức giác quan cụ thể ("mùi cá kho tiêu cháy cạnh", "canh rau ngót bốc khói", "đạp xe về tới cổng").',
    clueAi:
      'Đoạn B sử dụng toàn các cụm từ sáo rỗng quen thuộc ("sợi dây gắn kết thiêng liêng", "tình yêu thương bao la").',
  },
  {
    id: 4,
    topic: 'Cảm xúc ngày đầu tiên bước vào trường THPT Trung Phú',
    context: 'Thử thách cuối cùng: Đoạn nào do học sinh trường mình viết?',
    textA:
      '“Bước qua cánh cổng trường trung học phổ thông mở ra một chân trời mới đầy hứa hẹn. Ngôi trường khang trang với hàng cây xanh mát sẽ là nơi chắp cánh cho những ước mơ bay cao, bay xa trên con đường chinh phục đỉnh cao tri thức.”',
    textB:
      '“Sáng đầu tiên mặc bộ đồng phục mới chạy dọc Tỉnh lộ 8 tới cổng trường Trung Phú mà tim đập thình thịch. Sân trường rộng mênh mông, mình cứ đứng ngơ ngác ở dãy A tìm phòng học, may có anh chị khối trên cười tươi chỉ đường tận tình.”',
    humanSide: 'B',
    clueHuman:
      'Đoạn B có địa danh và chi tiết thực tế tại trường ("chạy dọc Tỉnh lộ 8", "đứng ngơ ngác ở dãy A tìm phòng").',
    clueAi:
      'Đoạn A dùng văn mẫu chung chung ("chân trời mới đầy hứa hẹn", "chắp cánh ước mơ bay cao bay xa") áp vào trường nào cũng giống nhau.',
  },
];

export default function AuthorGame() {
  const [currentRoundIdx, setCurrentRoundIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, 'A' | 'B'>>({});
  const [score, setScore] = useState(0);

  const round = ROUNDS[currentRoundIdx];
  const userChoice = answers[round.id] || null;
  const isAnswered = userChoice !== null;
  const isCorrect = userChoice === round.humanSide;

  const handleSelectHuman = (side: 'A' | 'B') => {
    if (isAnswered) return;
    setAnswers((prev) => ({ ...prev, [round.id]: side }));

    if (side === round.humanSide) {
      setScore((prev) => prev + 10);
      try {
        confetti({
          particleCount: 55,
          spread: 60,
          origin: { y: 0.7 },
        });
      } catch {}
    }
  };

  const handleReset = () => {
    setAnswers({});
    setScore(0);
    setCurrentRoundIdx(0);
  };

  const totalAnswered = Object.keys(answers).length;

  return (
    <div className="bg-[var(--surface-card)] rounded-2xl p-5 sm:p-7 border-2 border-[var(--border-main)] shadow-md space-y-5">
      {/* Top Game Bar: Round Selector & Scoreboard */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[var(--border-main)]">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-3 py-1 rounded-lg font-mono text-xs font-extrabold bg-[var(--accent-bioluminescent)] text-white uppercase tracking-wider">
            GAME 1: AI LÀ TÁC GIẢ?
          </span>
          <div className="flex items-center gap-1 bg-[var(--surface-elevated)] p-1 rounded-xl border border-[var(--border-subtle)]">
            {ROUNDS.map((r, idx) => {
              const ans = answers[r.id];
              const active = idx === currentRoundIdx;
              return (
                <button
                  key={r.id}
                  onClick={() => setCurrentRoundIdx(idx)}
                  className={`px-2.5 py-1 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                    active
                      ? 'bg-[var(--accent-bioluminescent)] text-white shadow-2xs'
                      : ans
                      ? ans === r.humanSide
                        ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                        : 'bg-rose-500/15 text-rose-600 dark:text-rose-400'
                      : 'text-[var(--text-secondary)] hover:bg-[var(--surface-card)]'
                  }`}
                >
                  <span>Vòng {idx + 1}</span>
                  {ans && (
                    <span>{ans === r.humanSide ? '✓' : '✗'}</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-600 dark:text-amber-300 font-mono text-xs sm:text-sm font-extrabold">
            <Trophy className="w-4 h-4" />
            <span>Điểm: {score} / {ROUNDS.length * 10}</span>
          </div>

          <button
            onClick={handleReset}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[var(--surface-elevated)] hover:bg-[var(--surface-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-main)] text-xs font-mono font-bold transition-all cursor-pointer"
            title="Chơi lại từ đầu"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Chơi lại</span>
          </button>
        </div>
      </div>

      {/* Round Question Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-[var(--surface-elevated)]/60 p-4 rounded-2xl border border-[var(--border-subtle)]">
        <div>
          <div className="text-xs font-mono font-bold text-[var(--accent-bioluminescent)] uppercase">
            CHỦ ĐỀ VÒNG {currentRoundIdx + 1} / {ROUNDS.length}:
          </div>
          <h4 className="text-lg sm:text-2xl font-black text-[var(--text-primary)]">
            &ldquo;{round.topic}&rdquo;
          </h4>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--surface-card)] border border-[var(--border-main)] text-xs sm:text-sm font-semibold text-[var(--text-primary)] shrink-0">
          <HelpCircle className="w-4 h-4 text-[var(--accent-bioluminescent)]" />
          <span>Nhiệm vụ: Hãy bấm chọn đoạn văn do <strong>CON NGƯỜI (Học sinh)</strong> viết!</span>
        </div>
      </div>

      {/* Two Competing Passages (Click to Vote) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {(['A', 'B'] as const).map((side) => {
          const text = side === 'A' ? round.textA : round.textB;
          const isThisHuman = round.humanSide === side;
          const userPickedThis = userChoice === side;

          return (
            <div
              key={side}
              onClick={() => handleSelectHuman(side)}
              className={`group relative rounded-2xl p-5 border-2 transition-all flex flex-col justify-between ${
                !isAnswered
                  ? 'border-[var(--border-main)] hover:border-[var(--accent-bioluminescent)] bg-[var(--surface-elevated)]/40 hover:bg-[var(--surface-elevated)] cursor-pointer hover:shadow-lg'
                  : isThisHuman
                  ? 'border-emerald-500 bg-emerald-500/5 shadow-md'
                  : 'border-purple-500/60 bg-purple-500/5'
              }`}
            >
              <div>
                {/* Card Header */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="font-mono font-extrabold text-xs sm:text-sm px-3 py-1 rounded-lg bg-[var(--surface-card)] border border-[var(--border-main)] text-[var(--text-primary)]">
                    ĐOẠN VĂN {side}
                  </span>

                  {isAnswered && (
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-extrabold uppercase ${
                        isThisHuman
                          ? 'bg-emerald-500 text-white'
                          : 'bg-purple-600 text-white'
                      }`}
                    >
                      {isThisHuman ? (
                        <>
                          <User className="w-3.5 h-3.5" />
                          <span>Tác giả: HỌC SINH</span>
                        </>
                      ) : (
                        <>
                          <Bot className="w-3.5 h-3.5" />
                          <span>Tác giả: AI (ChatGPT)</span>
                        </>
                      )}
                    </span>
                  )}
                </div>

                {/* Passage Content */}
                <p className="text-[var(--text-primary)] text-base sm:text-lg leading-relaxed italic bg-[var(--surface-card)] p-4 rounded-xl border border-[var(--border-subtle)]">
                  {text}
                </p>
              </div>

              {/* Action Button or Reveal Explanation */}
              <div className="mt-4">
                {!isAnswered ? (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectHuman(side);
                    }}
                    className="w-full py-2.5 px-4 rounded-xl bg-[var(--surface-card)] group-hover:bg-[var(--accent-bioluminescent)] text-[var(--text-primary)] group-hover:text-white border border-[var(--border-main)] group-hover:border-[var(--accent-bioluminescent)] font-mono text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    <span>Chốt đáp án: Đoạn {side} là Học sinh viết!</span>
                  </button>
                ) : (
                  <div
                    className={`p-3.5 rounded-xl border text-xs sm:text-sm leading-relaxed ${
                      isThisHuman
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-[var(--text-primary)]'
                        : 'bg-purple-500/10 border-purple-500/30 text-[var(--text-primary)]'
                    }`}
                  >
                    <div className="font-bold mb-0.5 flex items-center gap-1.5">
                      {userPickedThis && (
                        isThisHuman ? (
                          <span className="text-emerald-600 dark:text-emerald-400 font-mono uppercase">
                            [Bạn chọn ĐÚNG +10đ]
                          </span>
                        ) : (
                          <span className="text-rose-600 dark:text-rose-400 font-mono uppercase">
                            [Bạn đã bị AI đánh lừa!]
                          </span>
                        )
                      )}
                      <span>Phân tích dấu hiệu:</span>
                    </div>
                    <p>{isThisHuman ? round.clueHuman : round.clueAi}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Result Banner & Next Round Button */}
      {isAnswered && (
        <div
          className={`p-4 rounded-2xl border flex flex-wrap items-center justify-between gap-4 transition-all ${
            isCorrect
              ? 'bg-emerald-500/10 border-emerald-500/40'
              : 'bg-rose-500/10 border-rose-500/40'
          }`}
        >
          <div className="flex items-center gap-3">
            {isCorrect ? (
              <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
            ) : (
              <XCircle className="w-6 h-6 text-rose-500 shrink-0" />
            )}
            <div>
              <div className="font-extrabold text-sm sm:text-base text-[var(--text-primary)]">
                {isCorrect
                  ? 'Tuyệt vời! Cả lớp đã nhận diện chính xác giọng văn của con người (+10 điểm)'
                  : 'Chưa chính xác! Đoạn văn bóng bẩy kia thực chất là sản phẩm của AI.'}
              </div>
              <div className="text-xs text-[var(--text-secondary)]">
                Đã hoàn thành {totalAnswered} / {ROUNDS.length} vòng thử thách.
              </div>
            </div>
          </div>

          {currentRoundIdx < ROUNDS.length - 1 ? (
            <button
              onClick={() => setCurrentRoundIdx((prev) => prev + 1)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-mono text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer"
            >
              <span>Sang Vòng {currentRoundIdx + 2}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <div className="font-mono text-xs sm:text-sm font-extrabold text-[var(--accent-bioluminescent)] px-3 py-1.5 rounded-xl bg-[var(--surface-card)] border border-[var(--border-main)]">
              🎉 Tổng kết: {score} / {ROUNDS.length * 10} điểm!
            </div>
          )}
        </div>
      )}
    </div>
  );
}
