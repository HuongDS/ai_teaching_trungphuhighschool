'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  GraduationCap,
  Sparkles,
  Award,
  BookOpen,
  Cpu,
  BrainCircuit,
  Quote,
  Lightbulb,
  CheckCircle2,
  Share2
} from 'lucide-react';

export default function TeacherProfile3D() {
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // THREE.JS BACKGROUND: Floating Hologram Particles & Neural Nodes
  useEffect(() => {
    if (!canvasContainerRef.current) return;
    const container = canvasContainerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Particle Swarm
    const particleCount = 180;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color(0x00827c);
    const color2 = new THREE.Color(0xcbfffc);
    const color3 = new THREE.Color(0x0284c7);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 50;
      positions[i + 1] = (Math.random() - 0.5) * 35;
      positions[i + 2] = (Math.random() - 0.5) * 30;

      const mixedColor = i % 2 === 0 ? color1 : i % 3 === 0 ? color2 : color3;
      colors[i] = mixedColor.r;
      colors[i + 1] = mixedColor.g;
      colors[i + 2] = mixedColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.45,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Dynamic Connections (Lines)
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x00827c,
      transparent: true,
      opacity: 0.15,
    });

    let animationId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const time = clock.getElapsedTime();
      particles.rotation.y = time * 0.05;
      particles.rotation.x = Math.sin(time * 0.03) * 0.1;

      const pos = geometry.attributes.position.array as Float32Array;
      for (let i = 1; i < particleCount * 3; i += 3) {
        pos[i] += Math.sin(time + pos[i - 1]) * 0.015;
      }
      geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!canvasContainerRef.current) return;
      const w = canvasContainerRef.current.clientWidth;
      const h = canvasContainerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      renderer.dispose();
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, []);

  // 3D Parallax Tilt Handler on Hover
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const tiltX = (y - centerY) / 18;
    const tiltY = (centerX - x) / 18;
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div className="relative w-full rounded-3xl overflow-hidden border border-[var(--border-main)] bg-[var(--surface-card)] p-6 sm:p-10 lg:p-12 shadow-xl transition-all">
      {/* 3D Neural Particles Canvas (Background) */}
      <div
        ref={canvasContainerRef}
        className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-60 z-0"
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header Tag */}
        <div className="flex items-center gap-2 mb-4">
          <span className="px-3 py-1 rounded-md text-xs font-mono font-bold uppercase tracking-[0.2em] bg-[var(--surface-elevated)] text-[var(--accent-bioluminescent)] border border-[var(--border-subtle)] flex items-center gap-1.5">
            <GraduationCap className="w-3.5 h-3.5" />
            GIÁO VIÊN HƯỚNG DẪN & ĐỒNG KIẾN TẠO
          </span>
          <span className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider hidden sm:inline">
            // THPT TRUNG PHÚ - CỦ CHI
          </span>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: 3D Parallax Hologram Teacher Card */}
          <div
            className="lg:col-span-5 flex justify-center perspective-[1000px]"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
          >
            <div
              ref={cardRef}
              style={{
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(${isHovered ? 1.02 : 1}, ${isHovered ? 1.02 : 1}, 1)`,
                transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
                transformStyle: 'preserve-3d',
              }}
              className="relative w-full max-w-md rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#003734] via-[#012624] to-[#011d1c] text-white border-2 border-teal-500/40 shadow-2xl shadow-teal-950/60 overflow-hidden cursor-pointer group"
            >
              {/* Card Holographic Sheen */}
              <div className="absolute -inset-full bg-gradient-to-tr from-transparent via-teal-400/10 to-transparent group-hover:translate-x-full duration-1000 transition-transform pointer-events-none" />

              {/* ID Badge Header */}
              <div className="flex items-center justify-between border-b border-teal-500/30 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="font-mono text-[11px] uppercase tracking-widest text-teal-300 font-bold">
                    FACULTY ID // TP-2026-AI
                  </span>
                </div>
                <BrainCircuit className="w-5 h-5 text-teal-300" />
              </div>

              {/* Teacher Visual Emblem / Holographic Portrait */}
              <div className="flex flex-col items-center text-center my-4">
                <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full p-1 bg-gradient-to-tr from-teal-400 via-emerald-300 to-cyan-500 shadow-xl shadow-teal-500/30 flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-[#012624] flex flex-col items-center justify-center border-2 border-teal-400/40 overflow-hidden relative">
                    {/* Stylized Futuristic Teacher Avatar Icon */}
                    <div className="absolute inset-0 bg-radial from-teal-500/20 to-transparent animate-pulse" />
                    <GraduationCap className="w-14 h-14 text-teal-300 mb-1 z-10" />
                    <span className="font-mono text-[9px] font-bold text-teal-200 tracking-wider z-10">
                      THPT TRUNG PHÚ
                    </span>
                  </div>

                  {/* Orbiting Ring Indicator */}
                  <div className="absolute -inset-2 rounded-full border border-teal-400/30 animate-spin border-dashed duration-1000" />
                </div>

                <h3 className="text-2xl sm:text-3xl font-black mt-5 tracking-tight text-white flex items-center gap-2">
                  Thầy NGUYỄN TRUNG NGUYÊN
                </h3>
                <p className="text-teal-300 text-sm font-medium mt-1">
                  Giáo viên Sinh học
                </p>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-900/60 border border-teal-400/40 text-teal-200 text-xs font-mono mt-3">
                  <Award className="w-3.5 h-3.5 text-amber-300" />
                  Trường THPT Trung Phú, Củ Chi
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Educational Philosophy & Pillars */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight leading-tight">
                Lan tỏa kỹ năng ứng dụng AI hiệu quả & thực chất cho học sinh THPT
              </h2>
              <p className="text-[var(--text-secondary)] text-base sm:text-lg mt-3 leading-relaxed">
                Là một Giáo viên Sinh học tâm huyết với đổi mới phương pháp dạy và học tại Trường THPT Trung Phú, Thầy Nguyễn Trung Nguyên mong muốn hướng dẫn các em học sinh cách ứng dụng AI đúng đắn vào học tập — biến AI từ công cụ xa lạ thành người trợ lý đắc lực giúp tự học, tra cứu và phát triển tư duy độc lập.
              </p>
            </div>

            {/* Philosophy Quote Block */}
            <div className="relative p-6 rounded-2xl bg-[var(--surface-elevated)] border-l-4 border-l-[var(--accent-bioluminescent)] border border-[var(--border-main)]">
              <Quote className="w-8 h-8 text-[var(--accent-bioluminescent)]/40 absolute top-4 right-4" />
              <p className="text-sm sm:text-base font-medium italic text-[var(--text-primary)] leading-relaxed">
                &ldquo;AI không thể và không nên thay thế tư duy của người học. Sứ mệnh của chúng tôi tại THPT Trung Phú là trang bị cho các em bộ lọc tư duy phản biện, kỹ năng đặt câu hỏi đắt giá và đạo đức công nghệ vững vàng khi bước vào thế giới số.&rdquo;
              </p>
              <div className="mt-3 text-xs font-mono font-bold text-[var(--accent-bioluminescent)] uppercase tracking-wider">
                — Thầy Nguyễn Trung Nguyên // Giáo viên Sinh học — THPT Trung Phú
              </div>
            </div>

            {/* Teaching Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[var(--surface-card)] border border-[var(--border-main)] flex items-start gap-3 shadow-xs">
                <div className="p-2 rounded-lg bg-[var(--surface-elevated)] text-[var(--accent-bioluminescent)]">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[var(--text-primary)]">Kỹ nghệ Prompt Học đường</h4>
                  <p className="text-xs text-[var(--text-secondary)] mt-1">
                    Hướng dẫn học sinh cấu trúc câu lệnh chuẩn xác, tránh tạo ra nội dung sáo rỗng.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[var(--surface-card)] border border-[var(--border-main)] flex items-start gap-3 shadow-xs">
                <div className="p-2 rounded-lg bg-[var(--surface-elevated)] text-[var(--accent-bioluminescent)]">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[var(--text-primary)]">Phản biện Ảo giác AI</h4>
                  <p className="text-xs text-[var(--text-secondary)] mt-1">
                    Trang bị phương pháp kiểm chứng đa nguồn, bóc tách thông tin bịa đặt từ mô hình AI.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[var(--surface-card)] border border-[var(--border-main)] flex items-start gap-3 shadow-xs">
                <div className="p-2 rounded-lg bg-[var(--surface-elevated)] text-[var(--accent-bioluminescent)]">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[var(--text-primary)]">Liên môn Thực tế</h4>
                  <p className="text-xs text-[var(--text-secondary)] mt-1">
                    Ứng dụng trực tiếp vào Ngữ Văn, Lịch Sử, Khoa Học Tự Nhiên và Hướng Nghiệp.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[var(--surface-card)] border border-[var(--border-main)] flex items-start gap-3 shadow-xs">
                <div className="p-2 rounded-lg bg-[var(--surface-elevated)] text-[var(--accent-bioluminescent)]">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[var(--text-primary)]">Sản phẩm Đầu ra Cụ thể</h4>
                  <p className="text-xs text-[var(--text-secondary)] mt-1">
                    100% học sinh hoàn thành dự án cá nhân hoặc nhóm giải quyết vấn đề đời sống.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
