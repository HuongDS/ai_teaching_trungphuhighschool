'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  FileText,
  Upload,
  CheckCircle2,
  Sparkles,
  FolderOpen,
  AtSign,
  Send,
  AlertTriangle,
  Bot,
  Trash2,
} from 'lucide-react';

interface ContextDoc {
  id: string;
  filename: string;
  subject: string;
  size: string;
  preview: string;
  sampleQuestion: string;
  answerWithoutContext: string;
  answerWithContext: string;
  citation: string;
}

const SAMPLE_DOCS: ContextDoc[] = [
  {
    id: 'bio-12',
    filename: 'De_Cuong_Sinh_Hoc_12_THPT_Trung_Phu.pdf',
    subject: 'Môn Sinh Học',
    size: '1.4 MB',
    preview:
      'Tài liệu nội bộ Tổ Sinh học THPT Trung Phú (Thầy Nguyễn Trung Nguyên): Quy luật phân li độc lập của Men-đen, công thức tính nhanh số loại giao tử (2^n) và bài tập di truyền quần thể trọng tâm ôn thi Học kỳ I.',
    sampleQuestion:
      'Hãy tóm tắt các dạng bài tập trọng tâm sẽ có trong đề kiểm tra Học kỳ I môn Sinh và công thức giải nhanh theo đúng đề cương của thầy Nguyên.',
    answerWithoutContext:
      'Môn Sinh học lớp 12 thường có rất nhiều chủ đề rộng như cơ chế di truyền cấp độ phân tử, đột biến gen, đột biến nhiễm sắc thể, quy luật di truyền, tiến hóa và sinh thái học. Bạn nên đọc kỹ toàn bộ sách giáo khoa từ bài 1 đến bài 30 để ôn tập chung...',
    answerWithContext:
      'Dựa trên file @De_Cuong_Sinh_Hoc_12_THPT_Trung_Phu.pdf vừa được nạp vào Context:\n1. Trọng tâm kiểm tra HK1 tại THPT Trung Phú gồm 2 chuyên đề chính: Quy luật phân li độc lập Men-đen & Di truyền quần thể.\n2. Công thức giải nhanh cần nhớ: Số loại giao tử = 2^n (với n là số cặp gen dị hợp).\n3. Lưu ý đặc biệt ở Trang 4: Tránh nhầm lẫn giữa quần thể tự thụ phấn và quần thể ngẫu phối.',
    citation: 'Trích xuất chính xác từ Trang 2 & Trang 4 — De_Cuong_Sinh_Hoc_12_THPT_Trung_Phu.pdf',
  },
  {
    id: 'hist-cuchi',
    filename: 'Lich_Su_Dia_Phuong_Cu_Chi.md',
    subject: 'Lịch Sử Địa Phương',
    size: '420 KB',
    preview:
      'Chuyên đề Lịch sử địa phương Huyện Củ Chi — Đất thép thành đồng: Hệ thống địa đạo dài hơn 250km chia làm 3 tầng sâu, truyền thống hiếu học của học sinh xã Tân Thạnh Tây & Phú Hòa Đông.',
    sampleQuestion:
      'Hệ thống địa đạo trong tài liệu chuyên đề của lớp có mấy tầng và độ dài bao nhiêu? Nêu nội dung phần liên hệ học sinh trường THPT Trung Phú.',
    answerWithoutContext:
      'Địa đạo Củ Chi là một di tích lịch sử nổi tiếng ở TP.HCM. Tùy theo từng nguồn bài viết trên mạng, độ dài được ước tính khoảng từ 200km trở lên. Tôi không có thông tin cụ thể về phần liên hệ riêng của trường THPT Trung Phú.',
    answerWithContext:
      'Theo đúng tài liệu @Lich_Su_Dia_Phuong_Cu_Chi.md trong Workspace:\n- Hệ thống địa đạo có tổng chiều dài hơn 250km, được thiết kế thành 3 tầng sâu rõ rệt.\n- Phần liên hệ học sinh THPT Trung Phú (Mục 3): Phát huy truyền thống hiếu học trên quê hương Tân Thạnh Tây – Phú Hòa Đông, ứng dụng công nghệ số để quảng bá di sản lịch sử địa phương.',
    citation: 'Trích xuất chính xác từ Mục 1 & Mục 3 — Lich_Su_Dia_Phuong_Cu_Chi.md',
  },
  {
    id: 'project-rubric',
    filename: 'Quy_Dinh_Cham_Diem_Bai_Tap_Nhom.docx',
    subject: 'Quy Chế Lớp Học',
    size: '680 KB',
    preview:
      'Quy định chấm điểm của lớp: Nội dung chính xác (40đ), Có kiểm chứng Fact-check (30đ), Sáng tạo độc bản của học sinh (20đ), Thuyết trình đúng giờ 3 phút (10đ). Nộp trễ trừ 10đ.',
    sampleQuestion:
      'Nhóm em muốn đạt điểm tuyệt đối 100/100 thì cần chú ý những tiêu chí nào nhất trong quy định của lớp?',
    answerWithoutContext:
      'Thông thường một bài tập nhóm ở trường phổ thông sẽ được chấm dựa trên sự đồng đều của các thành viên, hình thức trình bày đẹp mắt và nội dung đầy đủ. Các bạn nên làm slide nhiều hiệu ứng và thuyết trình khoảng 10-15 phút.',
    answerWithContext:
      'Chiếu theo file @Quy_Dinh_Cham_Diem_Bai_Tap_Nhom.docx đã nạp làm Context:\n- Tuyệt đối KHÔNG thuyết trình 10-15 phút! Quy định lớp giới hạn đúng 03 phút (10đ).\n- Hai tiêu chí quyết định điểm cao nhất là: Nội dung chính xác (40đ) và Có bằng chứng kiểm chứng Fact-check đối chiếu SGK (30đ).\n- Cảnh báo: Nộp trễ hạn sẽ bị trừ ngay 10 điểm.',
    citation: 'Trích xuất chính xác từ Bảng Tiêu Chí — Quy_Dinh_Cham_Diem_Bai_Tap_Nhom.docx',
  },
];

export default function FinalProjectGuide() {
  const [selectedDocId, setSelectedDocId] = useState<string>(SAMPLE_DOCS[0].id);
  const [uploadedIds, setUploadedIds] = useState<string[]>([]);
  const [hasQueried, setHasQueried] = useState<boolean>(false);

  const currentDoc = SAMPLE_DOCS.find((d) => d.id === selectedDocId) || SAMPLE_DOCS[0];
  const isCurrentUploaded = uploadedIds.includes(currentDoc.id);

  const handleToggleUpload = (id: string) => {
    setHasQueried(false);
    if (uploadedIds.includes(id)) {
      setUploadedIds((prev) => prev.filter((item) => item !== id));
    } else {
      setUploadedIds((prev) => [...prev, id]);
    }
  };

  const handleRunAgent = () => {
    setHasQueried(true);
    if (isCurrentUploaded) {
      try {
        confetti({
          particleCount: 45,
          spread: 60,
          origin: { y: 0.75 },
        });
      } catch {}
    }
  };

  return (
    <div className="bg-[var(--surface-card)] rounded-2xl p-5 sm:p-7 border-2 border-[var(--border-main)] shadow-md space-y-5">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[var(--border-main)]">
        <div>
          <span className="px-3 py-1 rounded-lg font-mono text-xs font-extrabold bg-[var(--accent-bioluminescent)] text-white uppercase tracking-wider">
            MÔ PHỎNG AGENT IDE // QUẢN LÝ CONTEXT TÀI LIỆU
          </span>
          <h3 className="text-lg sm:text-2xl font-black text-[var(--text-primary)] mt-2">
            Thực Hành: Nạp Tài Liệu Vào Workspace Để Làm Context Cho AI
          </h3>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="px-3 py-1.5 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border-main)] font-bold text-[var(--text-primary)]">
            Context đã nạp: <strong className="text-[var(--accent-bioluminescent)]">{uploadedIds.length}</strong> / {SAMPLE_DOCS.length} file
          </span>
        </div>
      </div>

      {/* Main Workspace Grid: Left = Explorer & Upload, Right = Agent Chat with @Context */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column (5 cols): Agent IDE File Explorer */}
        <div className="lg:col-span-5 rounded-2xl bg-[var(--surface-elevated)]/70 border border-[var(--border-main)] p-4 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-mono font-bold uppercase text-[var(--text-muted)] pb-2 border-b border-[var(--border-subtle)]">
              <span className="flex items-center gap-1.5">
                <FolderOpen className="w-4 h-4 text-[var(--accent-bioluminescent)]" />
                WORKSPACE EXPLORER (TÀI LIỆU CỦA BẠN)
              </span>
              <span>BƯỚC 1: TẢI LÊN</span>
            </div>

            {SAMPLE_DOCS.map((doc) => {
              const isSelected = doc.id === selectedDocId;
              const isUploaded = uploadedIds.includes(doc.id);

              return (
                <div
                  key={doc.id}
                  onClick={() => {
                    setSelectedDocId(doc.id);
                    setHasQueried(false);
                  }}
                  className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[var(--accent-bioluminescent)] bg-[var(--surface-card)] shadow-sm'
                      : 'border-[var(--border-subtle)] hover:border-[var(--border-main)] bg-[var(--surface-card)]/60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2.5 min-w-0">
                      <FileText className="w-4 h-4 text-[var(--accent-bioluminescent)] shrink-0 mt-0.5" />
                      <div className="min-w-0">
                        <div className="font-mono text-xs font-bold text-[var(--text-primary)] truncate">
                          {doc.filename}
                        </div>
                        <div className="text-[11px] text-[var(--text-muted)] mt-0.5">
                          {doc.subject} • {doc.size}
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleUpload(doc.id);
                      }}
                      className={`px-2.5 py-1 rounded-lg font-mono text-[11px] font-bold flex items-center gap-1 shrink-0 transition-all cursor-pointer ${
                        isUploaded
                          ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/40'
                          : 'bg-[var(--accent-bioluminescent)] text-white hover:opacity-90'
                      }`}
                    >
                      {isUploaded ? (
                        <>
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Đã nạp Context</span>
                        </>
                      ) : (
                        <>
                          <Upload className="w-3 h-3" />
                          <span>+ Nạp Context</span>
                        </>
                      )}
                    </button>
                  </div>

                  {isSelected && (
                    <p className="mt-2.5 pt-2 border-t border-dashed border-[var(--border-subtle)] text-xs text-[var(--text-secondary)] leading-relaxed">
                      <strong>Tóm tắt file:</strong> {doc.preview}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <div className="p-3 rounded-xl bg-[var(--surface-card)] border border-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
            💡 <strong>Hướng dẫn:</strong> Nhấn nút <strong>&ldquo;+ Nạp Context&rdquo;</strong> ở file bên trên để đưa tài liệu vào bộ nhớ ngữ cảnh của Agent IDE, sau đó nhấn <strong>&ldquo;Gửi câu lệnh cho Agent&rdquo;</strong> ở khung bên phải!
          </div>
        </div>

        {/* Right Column (7 cols): Agent IDE Chat & Context Comparison */}
        <div className="lg:col-span-7 rounded-2xl bg-[var(--surface-elevated)]/50 border border-[var(--border-main)] p-4 sm:p-5 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            {/* Active Context Pills Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[var(--border-subtle)]">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[var(--text-muted)]">
                <AtSign className="w-4 h-4 text-[var(--accent-bioluminescent)]" />
                <span>ACTIVE CONTEXT (TÀI LIỆU ĐÍNH KÈM):</span>
              </div>

              {isCurrentUploaded ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/40 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-bold">
                  <span>@{currentDoc.filename}</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/15 border border-amber-500/40 text-amber-600 dark:text-amber-400 font-mono text-xs font-bold">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Chưa đính kèm file @{currentDoc.filename}</span>
                </span>
              )}
            </div>

            {/* Prompt Input Box */}
            <div className="p-4 rounded-xl bg-[var(--surface-card)] border border-[var(--border-main)] space-y-2">
              <div className="text-[11px] font-mono font-bold text-[var(--accent-bioluminescent)] uppercase">
                CÂU LỆNH GỬI CHO AGENT IDE:
              </div>
              <p className="text-sm sm:text-base font-medium text-[var(--text-primary)] leading-relaxed">
                {isCurrentUploaded && (
                  <span className="inline-block mr-1.5 px-2 py-0.5 rounded bg-[var(--accent-bioluminescent)]/15 text-[var(--accent-bioluminescent)] font-mono text-xs font-bold">
                    @{currentDoc.filename}
                  </span>
                )}
                &ldquo;{currentDoc.sampleQuestion}&rdquo;
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-2">
                {!isCurrentUploaded && (
                  <button
                    type="button"
                    onClick={() => handleToggleUpload(currentDoc.id)}
                    className="text-xs font-mono font-bold text-[var(--accent-bioluminescent)] hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>+ Bấm nạp @{currentDoc.filename} trước khi hỏi</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleRunAgent}
                  className="ml-auto flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-mono text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Gửi câu lệnh cho Agent</span>
                </button>
              </div>
            </div>

            {/* AI Response Output */}
            {hasQueried && (
              <div
                className={`p-4 sm:p-5 rounded-2xl border-2 transition-all space-y-2.5 ${
                  isCurrentUploaded
                    ? 'border-emerald-500 bg-emerald-500/10'
                    : 'border-amber-500/70 bg-amber-500/10'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 font-mono text-xs font-extrabold uppercase">
                    <Bot className="w-4 h-4" />
                    {isCurrentUploaded ? (
                      <span className="text-emerald-600 dark:text-emerald-400">
                        PHẢN HỒI CỦA AGENT (ĐÃ CÓ TÀI LIỆU CONTEXT — CHUẨN XÁC 100%)
                      </span>
                    ) : (
                      <span className="text-amber-600 dark:text-amber-400">
                        PHẢN HỒI KHI CHƯA NẠP CONTEXT (CHUNG CHUNG, DỄ LẠC ĐỀ)
                      </span>
                    )}
                  </span>
                </div>

                <p className="text-sm sm:text-base text-[var(--text-primary)] whitespace-pre-line leading-relaxed font-medium">
                  {isCurrentUploaded
                    ? currentDoc.answerWithContext
                    : currentDoc.answerWithoutContext}
                </p>

                {isCurrentUploaded ? (
                  <div className="pt-2 border-t border-emerald-500/30 text-xs font-mono font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Nguồn trích dẫn: {currentDoc.citation}</span>
                  </div>
                ) : (
                  <div className="pt-2 border-t border-amber-500/30 flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-mono text-amber-700 dark:text-amber-300">
                      ⚠️ Do chưa tải tài liệu lên, AI không biết nội dung đề cương riêng của lớp!
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        handleToggleUpload(currentDoc.id);
                        setHasQueried(true);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold cursor-pointer"
                    >
                      Nạp Context & Thử lại ngay →
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
