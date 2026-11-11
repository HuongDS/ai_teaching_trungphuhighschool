'use client';

import React, { useState } from 'react';

export default function WritingClinic() {
  const [activeTab, setActiveTab] = useState<'clinic' | 'roleplay'>('clinic');

  return (
    <div className="bg-[var(--surface-card)] rounded-2xl p-6 sm:p-8 border border-[var(--border-main)] shadow-xs mt-6 transition-colors">
      <div className="flex border-b border-[var(--border-main)] gap-4 mb-6">
        <button
          onClick={() => setActiveTab('clinic')}
          className={`pb-3 font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.14em] border-b-2 transition-all cursor-pointer ${
            activeTab === 'clinic'
              ? 'border-[var(--accent-bioluminescent)] text-[var(--accent-bioluminescent)]'
              : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]'
          }`}
        >
          Bác Sĩ Sửa Bài Viết (Writing Clinic)
        </button>
        <button
          onClick={() => setActiveTab('roleplay')}
          className={`pb-3 font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.14em] border-b-2 transition-all cursor-pointer ${
            activeTab === 'roleplay'
              ? 'border-[var(--accent-bioluminescent)] text-[var(--accent-bioluminescent)]'
              : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]'
          }`}
        >
          Luyện Đối Thoại Quán Cà Phê London
        </button>
      </div>

      {activeTab === 'clinic' && (
        <div className="space-y-6">
          {/* Sentence Diagnosis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="p-5 bg-rose-500/10 border border-rose-500/30 rounded-xl">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-rose-500 bg-rose-500/15 px-2.5 py-1 rounded-md">
                CÂU HỌC SINH THƯỜNG VIẾT SAI
              </span>
              <p className="mt-3 text-lg sm:text-xl font-bold text-[var(--text-primary)] font-mono leading-relaxed">
                &ldquo;I <span className="underline decoration-wavy decoration-rose-500 text-rose-500">very like play</span> football because it <span className="underline decoration-wavy decoration-rose-500 text-rose-500">make me health</span>.&rdquo;
              </p>
            </div>

            <div className="p-5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/15 px-2.5 py-1 rounded-md">
                PHIÊN BẢN CHUẨN NGƯỜI BẢN XỨ
              </span>
              <p className="mt-3 text-lg sm:text-xl font-bold text-[var(--text-primary)] font-mono leading-relaxed">
                &ldquo;I <span className="text-emerald-400 underline font-extrabold">really enjoy playing</span> football because it <span className="text-emerald-400 underline font-extrabold">keeps me healthy</span>.&rdquo;
              </p>
            </div>
          </div>

          {/* Breakdown Table */}
          <div className="p-5 sm:p-6 bg-[var(--surface-elevated)] border border-[var(--border-main)] rounded-xl">
            <div className="text-xs font-mono font-bold uppercase tracking-[0.16em] text-[var(--accent-bioluminescent)] mb-4">
              BẢNG CHẨN ĐOÁN LỖI CHI TIẾT
            </div>
            <div className="space-y-3 text-base">
              <div className="p-3.5 bg-[var(--surface-card)] rounded-lg border border-[var(--border-subtle)] text-[var(--text-primary)] leading-relaxed">
                <strong className="text-rose-500 font-mono">[LỖI 1: very like]</strong> Trong tiếng Anh không nói &ldquo;very like&rdquo;. Ta dùng phó từ <em>&ldquo;really like&rdquo;</em> hoặc <em>&ldquo;really enjoy&rdquo;</em> để chỉ sự yêu thích mãnh liệt.
              </div>
              <div className="p-3.5 bg-[var(--surface-card)] rounded-lg border border-[var(--border-subtle)] text-[var(--text-primary)] leading-relaxed">
                <strong className="text-rose-500 font-mono">[LỖI 2: like play]</strong> Sau động từ chỉ sở thích như <em>like, enjoy, love</em>, động từ theo sau phải ở dạng V-ing (<em>playing</em>).
              </div>
              <div className="p-3.5 bg-[var(--surface-card)] rounded-lg border border-[var(--border-subtle)] text-[var(--text-primary)] leading-relaxed">
                <strong className="text-rose-500 font-mono">[LỖI 3: make me health]</strong> <em>Health</em> là danh từ (sức khỏe). Ta cần tính từ <em>healthy</em> trong cấu trúc <em>&ldquo;keep someone healthy&rdquo;</em> (giúp ai đó khỏe mạnh).
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'roleplay' && (
        <div className="p-5 sm:p-6 bg-[var(--surface-elevated)] rounded-xl border border-[var(--border-main)] space-y-4">
          <div className="p-4 bg-[var(--surface-card)] rounded-lg border border-[var(--border-subtle)]">
            <div className="text-xs font-mono font-bold text-[var(--accent-bioluminescent)] uppercase tracking-wider mb-1">[Server // London Coffee Shop]:</div>
            <p className="text-[var(--text-primary)] text-lg">
              &ldquo;Good afternoon! Welcome to Costa Coffee. What can I get started for you today?&rdquo;
            </p>
          </div>
          <div className="p-4 bg-[var(--surface-card)] border border-[var(--accent-bioluminescent)]/40 rounded-lg">
            <div className="text-xs font-mono font-bold text-[var(--accent-aqua)] uppercase tracking-wider mb-1">[You // Học sinh]:</div>
            <p className="text-lg text-[var(--text-primary)] font-medium">
              &ldquo;Can I have one hot latte with less sugar, please? How much is it?&rdquo;
            </p>
          </div>
          <div className="p-4 bg-[var(--surface-card)] rounded-lg border border-[var(--border-subtle)]">
            <div className="text-xs font-mono font-bold text-[var(--accent-bioluminescent)] uppercase tracking-wider mb-1">[Server // London Coffee Shop]:</div>
            <p className="text-[var(--text-primary)] text-lg">
              &ldquo;Certainly! That will be £3.80. Would you like to have it here or take away?&rdquo;
            </p>
            <div className="mt-3 text-xs font-mono text-[var(--accent-bioluminescent)] bg-[var(--accent-bioluminescent)]/10 p-2.5 rounded-lg border border-[var(--accent-bioluminescent)]/20 leading-relaxed">
              [Phản hồi của AI]: Câu của bạn rất tự nhiên! Một cách nói khác cực kỳ lịch sự của người Anh là: &ldquo;Could I please have a hot latte?&rdquo;
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
