'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import {
  Sparkles,
  Bot,
  Code2,
  Layers,
  MonitorPlay,
  Cpu,
  ArrowRight,
  Workflow,
  CheckCircle2,
  Zap,
  Terminal
} from 'lucide-react';

interface AiPlatformShowcaseProps {
  onEnterClassroom: () => void;
}

export default function AiPlatformShowcase({ onEnterClassroom }: AiPlatformShowcaseProps) {
  const threeMountRef = useRef<HTMLDivElement>(null);

  // THREE.JS: 3D Holographic AI Core & Neural Constellation
  useEffect(() => {
    if (!threeMountRef.current) return;
    const container = threeMountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 22;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // AI Core Sphere (Icosahedron Wireframe)
    const coreGeo = new THREE.IcosahedronGeometry(4.5, 2);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x00ffea,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    scene.add(coreMesh);

    // Inner Glowing Core
    const innerGeo = new THREE.SphereGeometry(2.5, 32, 32);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x00827c,
      emissive: 0x005550,
      roughness: 0.2,
      metalness: 0.8,
    });
    const innerCore = new THREE.Mesh(innerGeo, innerMat);
    scene.add(innerCore);

    // Orbiting Data Rings
    const ring1Geo = new THREE.TorusGeometry(6.5, 0.08, 16, 100);
    const ring1Mat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.5 });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    scene.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(8, 0.06, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0x00e5db, transparent: true, opacity: 0.4 });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    scene.add(ring2);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x00ffea, 2.5, 50);
    pointLight.position.set(5, 5, 10);
    scene.add(pointLight);

    // Animation Loop
    let animationId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const time = clock.getElapsedTime();
      coreMesh.rotation.x = time * 0.15;
      coreMesh.rotation.y = time * 0.25;

      innerCore.rotation.y = -time * 0.3;

      ring1.rotation.z = time * 0.4;
      ring2.rotation.x = time * 0.3;
      ring2.rotation.y = time * 0.2;

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!threeMountRef.current) return;
      const w = threeMountRef.current.clientWidth;
      const h = threeMountRef.current.clientHeight;
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

  return (
    <div className="relative w-full rounded-3xl overflow-hidden border border-[var(--border-main)] bg-[var(--surface-card)] p-6 sm:p-10 lg:p-12 shadow-2xl transition-all">
      {/* Background Subtle Gradient & Grid Pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--surface-elevated)]/30 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header Tag */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1.5 rounded-lg text-xs font-mono font-black uppercase tracking-[0.2em] bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-md flex items-center gap-1.5">
              <Bot className="w-4 h-4" />
              100% SẢN PHẨM KIẾN TẠO TỪ AI
            </span>
            <span className="text-xs font-mono text-[var(--accent-bioluminescent)] font-bold hidden sm:inline">
              // DEEPMIND ANTIGRAVITY ENGINE
            </span>
          </div>
          <div className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>AI NATIVE EDUCATIONAL ARCHITECTURE</span>
          </div>
        </div>

        {/* Hero Headline */}
        <div className="max-w-4xl">
          <h2 className="text-3xl sm:text-5xl font-black text-[var(--text-primary)] tracking-tight leading-tight">
            Nền tảng Giảng dạy được Xây dựng Hoàn toàn bằng Trí tuệ Nhân tạo
          </h2>
          <p className="text-[var(--text-secondary)] text-base sm:text-xl mt-4 leading-relaxed font-normal">
            Website này không chỉ là một công cụ trình chiếu, mà chính là một sản phẩm thực nghiệm giáo dục đặc biệt: Từ toàn bộ cấu trúc mã nguồn, 13+ module tương tác giả lập, cho đến hệ thống phân tích sư phạm 12 tiết đều được nghiên cứu, thiết kế và lập trình 100% bằng AI dưới sự định hướng chuyên môn của Thầy Nguyễn Trung Nguyên.
          </p>
        </div>

        {/* 3D Core Visual & Feature Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-10 items-center">
          {/* Feature Pillars (Left) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="p-5 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border-main)] flex items-start gap-4 hover:border-[var(--accent-bioluminescent)] transition-all">
              <div className="p-3 rounded-xl bg-teal-500/10 text-[var(--accent-bioluminescent)] shrink-0">
                <Code2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
                  <span>Toàn bộ Mã nguồn Sinh ra bởi AI</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold">
                    Zero Human-Written Code
                  </span>
                </h4>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1.5 leading-relaxed">
                  Được triển khai trên nền tảng Next.js 16, React 19, Tailwind CSS v4 và Three.js WebGL thông qua các lệnh đặc tả ngôn ngữ tự nhiên và quy trình suy luận sâu (Deep Reasoning AI Agent).
                </p>
              </div>
            </div>
          </div>

          {/* 3D Interactive AI Core Canvas (Right) */}
          <div className="lg:col-span-5 h-[360px] sm:h-[420px] relative rounded-3xl overflow-hidden border border-teal-500/30 bg-gradient-to-b from-[#011d1c] to-[#012624] flex items-center justify-center shadow-xl">
            <div ref={threeMountRef} className="absolute inset-0 z-0" />
            <div className="absolute top-4 left-4 z-10 font-mono text-[11px] text-teal-300 font-bold bg-teal-950/80 px-3 py-1 rounded-lg border border-teal-500/30 backdrop-blur-md">
              AI ENGINE CORE // 3D NEURAL VISUALIZER
            </div>
            <div className="absolute bottom-4 inset-x-4 z-10 text-center font-mono text-xs text-teal-200/80 bg-black/60 py-2 rounded-xl border border-teal-500/20 backdrop-blur-md">
              Minh chứng thực tế: Biến ý tưởng của Thầy & Trò thành hiện thực với AI
            </div>
          </div>
        </div>

        {/* Bottom Call to Action (CTA) */}
        <div className="mt-8 pt-8 border-t border-[var(--border-main)] flex flex-col sm:flex-row items-center justify-between gap-6 bg-gradient-to-r from-teal-950/40 via-transparent to-cyan-950/40 p-6 rounded-3xl border">
          <div>
            <div className="text-xs font-mono font-bold text-[var(--accent-bioluminescent)] uppercase tracking-wider">
              SẴN SÀNG TRẢI NGHIỆM LỚP HỌC?
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] mt-1">
              Khám phá Giáo án 12 Tiết & 13+ Công Cụ Tương Tác
            </h3>
          </div>

          <button
            onClick={onEnterClassroom}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-500 hover:from-teal-500 hover:to-emerald-500 text-white font-mono text-base font-black shadow-xl shadow-teal-900/40 transition-all hover:scale-105 flex items-center justify-center gap-3 cursor-pointer group"
          >
            <span>ĐI VÀO BÀI HỌC</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
