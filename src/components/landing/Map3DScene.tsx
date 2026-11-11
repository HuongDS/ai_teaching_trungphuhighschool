'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Compass, ExternalLink, RotateCw, ZoomIn, ZoomOut, MapPin, Navigation, ShieldCheck } from 'lucide-react';

interface Map3DSceneProps {
  onExploreMore?: () => void;
}

export default function Map3DScene({ onExploreMore }: Map3DSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cameraMode, setCameraMode] = useState<'iso' | 'top' | 'front'>('iso');
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [hoveredBuilding, setHoveredBuilding] = useState<string | null>(null);

  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    schoolGroup: THREE.Group;
    radarRing: THREE.Mesh;
    pulseRing: THREE.Mesh;
    beaconLight: THREE.PointLight;
    pinMesh: THREE.Group;
    animationFrameId: number;
    targetRotation: number;
    currentRotation: number;
  } | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. SCENE SETUP
    const scene = new THREE.Scene();
    scene.background = null; // Transparent to blend with CSS gradient background
    scene.fog = new THREE.FogExp2(0x012624, 0.012);

    // 2. CAMERA SETUP
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(24, 20, 26);
    camera.lookAt(0, 2, 0);

    // 3. RENDERER SETUP
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // 4. LIGHTING
    const ambientLight = new THREE.AmbientLight(0xd8eeeb, 0.85);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xcbfffc, 1.8);
    dirLight.position.set(20, 30, 15);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add(dirLight);

    const cyanPoint = new THREE.PointLight(0x00e5db, 2.5, 50);
    cyanPoint.position.set(0, 10, 0);
    scene.add(cyanPoint);

    // 5. MASTER SCHOOL GROUP
    const schoolGroup = new THREE.Group();
    scene.add(schoolGroup);

    // Base Grid / Cyber Terrain Platform
    const gridSize = 40;
    const gridDivisions = 40;
    const gridHelper = new THREE.GridHelper(gridSize, gridDivisions, 0x00827c, 0x014642);
    gridHelper.position.y = -0.05;
    schoolGroup.add(gridHelper);

    // Ground Platform
    const groundGeo = new THREE.CylinderGeometry(21, 22, 0.6, 64);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x01201e,
      roughness: 0.8,
      metalness: 0.2,
      polygonOffset: true,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 1,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.position.y = -0.35;
    ground.receiveShadow = true;
    schoolGroup.add(ground);

    // Glowing Platform Rim
    const rimGeo = new THREE.TorusGeometry(21.3, 0.15, 16, 100);
    const rimMat = new THREE.MeshBasicMaterial({ color: 0x00c4b8 });
    const rim = new THREE.Mesh(rimGeo, rimMat);
    rim.rotation.x = Math.PI / 2;
    rim.position.y = -0.05;
    schoolGroup.add(rim);

    // ROAD: Tỉnh Lộ 8 (Front road)
    const roadGeo = new THREE.PlaneGeometry(36, 4.5);
    const roadMat = new THREE.MeshStandardMaterial({ color: 0x0a1c1b, roughness: 0.7 });
    const road = new THREE.Mesh(roadGeo, roadMat);
    road.rotation.x = -Math.PI / 2;
    road.position.set(0, 0.01, 13);
    schoolGroup.add(road);

    // Road markings
    for (let x = -14; x <= 14; x += 3.5) {
      const lineGeo = new THREE.PlaneGeometry(1.8, 0.2);
      const lineMat = new THREE.MeshBasicMaterial({ color: 0x6ee7b7 });
      const line = new THREE.Mesh(lineGeo, lineMat);
      line.rotation.x = -Math.PI / 2;
      line.position.set(x, 0.02, 13);
      schoolGroup.add(line);
    }

    // CAMPUS BUILDINGS (THPT Trung Phú Architecture Blocks)
    const buildingMat = new THREE.MeshStandardMaterial({
      color: 0x114643,
      roughness: 0.35,
      metalness: 0.3,
    });

    const roofMat = new THREE.MeshStandardMaterial({
      color: 0x00827c,
      roughness: 0.2,
      metalness: 0.5,
    });

    const windowMat = new THREE.MeshBasicMaterial({ color: 0xcbfffc });

    const createBuilding = (x: number, z: number, w: number, h: number, d: number, name: string) => {
      const bGroup = new THREE.Group();
      bGroup.name = name;

      // Main Block
      const blockGeo = new THREE.BoxGeometry(w, h, d);
      const block = new THREE.Mesh(blockGeo, buildingMat);
      block.position.y = h / 2;
      block.castShadow = true;
      block.receiveShadow = true;
      bGroup.add(block);

      // Roof Accent
      const roofGeo = new THREE.BoxGeometry(w + 0.3, 0.35, d + 0.3);
      const roof = new THREE.Mesh(roofGeo, roofMat);
      roof.position.y = h + 0.175;
      roof.castShadow = true;
      bGroup.add(roof);

      // Illuminated Windows Stripes
      const floors = Math.floor(h / 1.2);
      for (let f = 1; f <= floors; f++) {
        const winGeo = new THREE.BoxGeometry(w - 0.4, 0.3, d + 0.04);
        const win = new THREE.Mesh(winGeo, windowMat);
        win.position.y = f * 1.2 - 0.4;
        bGroup.add(win);
      }

      bGroup.position.set(x, 0, z);
      schoolGroup.add(bGroup);
      return bGroup;
    };

    // Dãy A (Phòng học chính phía Đông)
    createBuilding(-8, 3, 3.2, 5.5, 11, 'Dãy A - Khu Giảng Đường');
    // Dãy B (Phòng học chính phía Tây)
    createBuilding(8, 3, 3.2, 5.5, 11, 'Dãy B - Khu Phòng Bộ Môn & AI Lab');
    // Dãy C (Khu hiệu bộ trung tâm phía Bắc)
    createBuilding(0, -5, 14, 4.2, 3.5, 'Dãy C - Ban Giám Hiệu & Hội Trường');
    // Nhà thi đấu đa năng / Khu chức năng
    createBuilding(8, -4, 4.5, 3.8, 6, 'Khu Thể Thao & Đa Năng');

    // SÂN TRƯỜNG TRUNG TÂM (Central Yard)
    const yardGeo = new THREE.PlaneGeometry(12, 10);
    const yardMat = new THREE.MeshStandardMaterial({ color: 0x052e2b, roughness: 0.9 });
    const yard = new THREE.Mesh(yardGeo, yardMat);
    yard.rotation.x = -Math.PI / 2;
    yard.position.set(0, 0.02, 3.5);
    schoolGroup.add(yard);

    // CỘT CỜ TRƯỜNG THPT TRUNG PHÚ (Center Flagpole)
    const poleBaseGeo = new THREE.CylinderGeometry(0.8, 1, 0.35, 16);
    const poleBaseMat = new THREE.MeshStandardMaterial({ color: 0x00827c });
    const poleBase = new THREE.Mesh(poleBaseGeo, poleBaseMat);
    poleBase.position.set(0, 0.175, 4);
    schoolGroup.add(poleBase);

    const poleGeo = new THREE.CylinderGeometry(0.06, 0.06, 5.5, 12);
    const poleMat = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.9 });
    const pole = new THREE.Mesh(poleGeo, poleMat);
    pole.position.set(0, 2.9, 4);
    schoolGroup.add(pole);

    // Cờ đỏ sao vàng cách điệu
    const flagGeo = new THREE.PlaneGeometry(1.2, 0.8);
    const flagMat = new THREE.MeshBasicMaterial({ color: 0xd9480f, side: THREE.DoubleSide });
    const flag = new THREE.Mesh(flagGeo, flagMat);
    flag.position.set(0.6, 5.1, 4);
    schoolGroup.add(flag);

    // CỔNG TRƯỜNG THPT TRUNG PHÚ (School Gate on Tỉnh Lộ 8)
    const gateColGeo = new THREE.BoxGeometry(0.8, 3.2, 0.8);
    const gateColMat = new THREE.MeshStandardMaterial({ color: 0x00a39b });
    const gateColLeft = new THREE.Mesh(gateColGeo, gateColMat);
    gateColLeft.position.set(-3.2, 1.6, 10.5);
    schoolGroup.add(gateColLeft);

    const gateColRight = new THREE.Mesh(gateColGeo, gateColMat);
    gateColRight.position.set(3.2, 1.6, 10.5);
    schoolGroup.add(gateColRight);

    const gateBeamGeo = new THREE.BoxGeometry(7.6, 0.7, 1);
    const gateBeamMat = new THREE.MeshStandardMaterial({ color: 0x00827c, roughness: 0.3 });
    const gateBeam = new THREE.Mesh(gateBeamGeo, gateBeamMat);
    gateBeam.position.set(0, 3.4, 10.5);
    schoolGroup.add(gateBeam);

    // CÂY XANH KHUÔN VIÊN (Trees around campus)
    const treeGeo = new THREE.ConeGeometry(0.9, 1.8, 7);
    const treeMat = new THREE.MeshStandardMaterial({ color: 0x009d96, roughness: 0.6 });
    const trunkGeo = new THREE.CylinderGeometry(0.18, 0.22, 0.6, 6);
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x4a2e18 });

    const treePositions = [
      [-6, 9.5], [-4, 9.5], [4, 9.5], [6, 9.5],
      [-5.5, 0], [-5.5, 6], [5.5, 0], [5.5, 6],
      [-11, -2], [-11, 4], [11, 4], [11, -2],
      [-3, -8], [3, -8], [0, -8]
    ];

    treePositions.forEach(([x, z]) => {
      const tree = new THREE.Group();
      const trunk = new THREE.Mesh(trunkGeo, trunkMat);
      trunk.position.y = 0.3;
      const foliage = new THREE.Mesh(treeGeo, treeMat);
      foliage.position.y = 1.3;
      tree.add(trunk);
      tree.add(foliage);
      tree.position.set(x, 0, z);
      schoolGroup.add(tree);
    });

    // 6. HOLOGRAPHIC 3D LOCATION PIN (Chỉ vị trí THPT Trung Phú)
    const pinGroup = new THREE.Group();
    pinGroup.position.set(0, 7.5, 3.5);

    // Glowing Pin Head
    const pinHeadGeo = new THREE.SphereGeometry(0.9, 32, 32);
    const pinHeadMat = new THREE.MeshStandardMaterial({
      color: 0x00ffea,
      emissive: 0x00827c,
      emissiveIntensity: 0.9,
      roughness: 0.1,
      metalness: 0.3,
    });
    const pinHead = new THREE.Mesh(pinHeadGeo, pinHeadMat);
    pinHead.position.y = 1.8;
    pinGroup.add(pinHead);

    // Pointer cone
    const pinConeGeo = new THREE.ConeGeometry(0.85, 1.8, 32);
    const pinConeMat = new THREE.MeshStandardMaterial({
      color: 0x00ffea,
      emissive: 0x00827c,
      emissiveIntensity: 0.7,
      roughness: 0.2,
    });
    const pinCone = new THREE.Mesh(pinConeGeo, pinConeMat);
    pinCone.rotation.x = Math.PI;
    pinCone.position.y = 0.8;
    pinGroup.add(pinCone);

    // Inner glowing core
    const coreGeo = new THREE.SphereGeometry(0.45, 16, 16);
    const coreMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const core = new THREE.Mesh(coreGeo, coreMat);
    core.position.y = 1.8;
    pinGroup.add(core);

    schoolGroup.add(pinGroup);

    // Pin Beacon Light
    const beaconLight = new THREE.PointLight(0x00ffea, 3, 20);
    beaconLight.position.set(0, 9, 3.5);
    schoolGroup.add(beaconLight);

    // RADAR SCANNER RINGS
    const ringGeo = new THREE.RingGeometry(0.1, 7.5, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00ffd5,
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide,
    });
    const radarRing = new THREE.Mesh(ringGeo, ringMat);
    radarRing.rotation.x = -Math.PI / 2;
    radarRing.position.set(0, 0.05, 3.5);
    schoolGroup.add(radarRing);

    // Secondary Pulsing Ring
    const pulseRingGeo = new THREE.RingGeometry(0.1, 14, 64);
    const pulseRingMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.2,
      side: THREE.DoubleSide,
    });
    const pulseRing = new THREE.Mesh(pulseRingGeo, pulseRingMat);
    pulseRing.rotation.x = -Math.PI / 2;
    pulseRing.position.set(0, 0.04, 3.5);
    schoolGroup.add(pulseRing);

    // Vertical Coordinate Laser Line from ground to sky
    const laserGeo = new THREE.CylinderGeometry(0.04, 0.04, 25, 8);
    const laserMat = new THREE.MeshBasicMaterial({ color: 0x00ffea, transparent: true, opacity: 0.8 });
    const laser = new THREE.Mesh(laserGeo, laserMat);
    laser.position.set(0, 12.5, 3.5);
    schoolGroup.add(laser);

    // Raycaster for mouse interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(schoolGroup.children, true);
      
      let found: string | null = null;
      for (const hit of intersects) {
        let curr: THREE.Object3D | null = hit.object;
        while (curr && curr !== schoolGroup) {
          if (curr.name && curr.name.length > 2) {
            found = curr.name;
            break;
          }
          curr = curr.parent;
        }
        if (found) break;
      }
      setHoveredBuilding(found);
    };

    container.addEventListener('mousemove', handleMouseMove);

    // 7. DRAG-TO-ROTATE INTERACTION
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleMouseDrag = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      schoolGroup.rotation.y += deltaX * 0.008;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('mousemove', handleMouseDrag);

    // 8. ANIMATION LOOP
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Pin floating & rotating
      pinGroup.position.y = 7.5 + Math.sin(elapsedTime * 2.5) * 0.45;
      pinGroup.rotation.y = elapsedTime * 1.5;

      // Radar pulses
      const pulseScale = (elapsedTime % 2.5) / 2.5;
      radarRing.scale.set(pulseScale * 2, pulseScale * 2, 1);
      (radarRing.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 0.45 * (1 - pulseScale));

      const pulseScale2 = ((elapsedTime + 1.2) % 3) / 3;
      pulseRing.scale.set(pulseScale2 * 1.8, pulseScale2 * 1.8, 1);
      (pulseRing.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 0.3 * (1 - pulseScale2));

      // Slow scenic rotation when auto-rotate is active
      if (isRotating && !isDragging) {
        schoolGroup.rotation.y += 0.0035;
      }

      renderer.render(scene, camera);
      sceneRef.current!.animationFrameId = requestAnimationFrame(animate);
    };

    sceneRef.current = {
      scene,
      camera,
      renderer,
      schoolGroup,
      radarRing,
      pulseRing,
      beaconLight,
      pinMesh: pinGroup,
      animationFrameId: requestAnimationFrame(animate),
      targetRotation: 0,
      currentRotation: 0,
    };

    // Resize handler
    const handleResize = () => {
      if (!containerRef.current || !sceneRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      sceneRef.current.camera.aspect = w / h;
      sceneRef.current.camera.updateProjectionMatrix();
      sceneRef.current.renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('mousemove', handleMouseDrag);
      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationFrameId);
        renderer.dispose();
      }
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, [isRotating]);

  // Handle Camera Presets
  const setCameraPreset = (mode: 'iso' | 'top' | 'front') => {
    if (!sceneRef.current) return;
    const { camera } = sceneRef.current;
    setCameraMode(mode);

    if (mode === 'iso') {
      camera.position.set(24, 20, 26);
      camera.lookAt(0, 2, 0);
    } else if (mode === 'top') {
      camera.position.set(0, 38, 5);
      camera.lookAt(0, 0, 3);
    } else if (mode === 'front') {
      camera.position.set(0, 6, 28);
      camera.lookAt(0, 3, 5);
    }
  };

  const handleZoom = (direction: 'in' | 'out') => {
    if (!sceneRef.current) return;
    const { camera } = sceneRef.current;
    const factor = direction === 'in' ? 0.85 : 1.18;
    camera.position.multiplyScalar(factor);
    setZoomLevel((prev) => (direction === 'in' ? prev * 1.15 : prev / 1.15));
  };

  return (
    <div className="relative w-full h-[620px] sm:h-[720px] lg:h-[780px] rounded-3xl overflow-hidden border border-[var(--border-main)] shadow-2xl bg-gradient-to-b from-[#011d1c] via-[#012624] to-[#001716] flex flex-col justify-between">
      {/* 3D Canvas Mount Point */}
      <div
        ref={containerRef}
        className="absolute inset-0 cursor-grab active:cursor-grabbing z-0"
      />

      {/* Top HUD Bar: Geo Coordinates & Status */}
      <div className="relative z-10 p-4 sm:p-6 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        <div className="pointer-events-auto bg-[var(--surface-card)]/90 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-[var(--border-main)] shadow-lg flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
          <div>
            <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--accent-bioluminescent)] font-bold">
              ĐỊA KHÔNG GIAN 3D // GPS SATELLITE LOCK
            </div>
            <div className="text-sm sm:text-base font-extrabold text-[var(--text-primary)] font-mono flex items-center gap-1.5">
              <span>10.981944° N, 106.579167° E</span>
              <span className="text-xs px-2 py-0.5 rounded-md bg-[var(--surface-elevated)] text-[var(--accent-bioluminescent)] font-bold">
                CỦ CHI
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls & External Google Maps Link */}
        <div className="pointer-events-auto flex items-center gap-2">
          <a
            href="https://maps.app.goo.gl/AEM5xpmbDivz47bT7"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-mono text-xs sm:text-sm font-bold shadow-lg shadow-teal-900/40 transition-all hover:scale-105"
          >
            <Navigation className="w-4 h-4" />
            <span>Mở Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </a>

          <button
            onClick={() => setIsRotating(!isRotating)}
            title={isRotating ? 'Dừng tự xoay' : 'Bật tự xoay sa bàn'}
            className={`p-2.5 rounded-xl border backdrop-blur-md transition-all ${
              isRotating
                ? 'bg-teal-900/60 border-teal-500 text-teal-300'
                : 'bg-[var(--surface-card)]/80 border-[var(--border-main)] text-[var(--text-secondary)]'
            }`}
          >
            <RotateCw className={`w-4 h-4 ${isRotating ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Center Interactive Marker Tooltip */}
      <div className="relative z-10 self-center text-center pointer-events-none mt-2">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-950/80 border border-teal-400/50 backdrop-blur-md text-teal-200 text-xs font-mono shadow-xl">
          <MapPin className="w-3.5 h-3.5 text-teal-400 animate-bounce" />
          <span>Kéo chuột để xoay 360° sa bàn trường THPT Trung Phú</span>
        </div>
        {hoveredBuilding && (
          <div className="mt-2 px-4 py-2 bg-black/85 text-emerald-300 border border-emerald-500/50 rounded-xl text-xs font-mono backdrop-blur-md">
            Đang trỏ: <span className="font-bold text-white">{hoveredBuilding}</span>
          </div>
        )}
      </div>

      {/* Bottom Main Info Card & Viewport Switchers */}
      <div className="relative z-10 p-4 sm:p-6 flex flex-col md:flex-row items-end justify-between gap-4 pointer-events-none">
        {/* Info Billboard */}
        <div className="pointer-events-auto max-w-lg w-full bg-[var(--surface-card)]/95 backdrop-blur-xl p-5 sm:p-6 rounded-2xl border border-[var(--border-main)] shadow-2xl transition-all">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[var(--accent-bioluminescent)] uppercase tracking-wider mb-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Địa điểm Giảng dạy & Đổi mới Sáng tạo</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] tracking-tight">
            TRƯỜNG THPT TRUNG PHÚ
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1.5 leading-relaxed">
            1318 Tỉnh Lộ 8, Xã Tân Thạnh Tây / Xã Phú Hòa Đông, Huyện Củ Chi, TP. Hồ Chí Minh.
          </p>

          <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[var(--text-muted)]">
            <span className="flex items-center gap-1 text-teal-600 dark:text-teal-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-teal-500" /> AI Classroom Ready
            </span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">
              Phòng Máy & Màn Hình Tương Tác 4.0
            </span>
          </div>
        </div>

        {/* Camera Views & Zoom Controls */}
        <div className="pointer-events-auto flex items-center gap-2 bg-[var(--surface-card)]/90 backdrop-blur-md p-2 rounded-2xl border border-[var(--border-main)] shadow-xl">
          <button
            onClick={() => setCameraPreset('iso')}
            className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all ${
              cameraMode === 'iso'
                ? 'bg-[var(--accent-bioluminescent)] text-white shadow-md'
                : 'text-[var(--text-secondary)] hover:bg-[var(--surface-hover)]'
            }`}
          >
            Góc Nghiêng 3D
          </button>
          <button
            onClick={() => setCameraPreset('top')}
            className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all ${
              cameraMode === 'top'
                ? 'bg-[var(--accent-bioluminescent)] text-white shadow-md'
                : 'text-[var(--text-secondary)] hover:bg-[var(--surface-hover)]'
            }`}
          >
            Vệ Tinh (Top)
          </button>
          <button
            onClick={() => setCameraPreset('front')}
            className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all ${
              cameraMode === 'front'
                ? 'bg-[var(--accent-bioluminescent)] text-white shadow-md'
                : 'text-[var(--text-secondary)] hover:bg-[var(--surface-hover)]'
            }`}
          >
            Cổng Trường
          </button>

          <div className="w-[1px] h-6 bg-[var(--border-main)] mx-1" />

          <button
            onClick={() => handleZoom('in')}
            title="Phóng to"
            className="p-2 rounded-xl text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] transition-all"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleZoom('out')}
            title="Thu nhỏ"
            className="p-2 rounded-xl text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] transition-all"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
