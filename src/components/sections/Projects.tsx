"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ChevronRight, X } from "lucide-react";

const Github = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

const projects = [
  {
    id: "superwindsurfer",
    title: "superwindsurfer 🏄🏼‍♂️",
    subtitle: "인플루언서 매니저 업무를 자동화한 AI SaaS — 콘텐츠 해석 · 광고 분류 · 트렌드 발굴 · 브랜드 검증 4축",
    role: { team: "👥 4인 팀 프로젝트", position: "팀장 · PM · 모듈 3·5 · 인프라 · 어드민 단독" },
    themeClass: "hover:border-purple-500",
    glowClass: "group-hover:shadow-[0_0_40px_-10px_rgba(168,85,247,0.2)]",
    badgeColor: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
    features: [
      "5개 LangGraph 그래프를 DB 캐시로만 연결한 모듈 거버넌스 — 4명·11일 (개인 222 commits / 63%)",
      "4종 LLM 비용 라우팅 + 3종 캐시로 1유저 풀 분석 71원 (캐시 32%↓)",
      "백테스트 repo + snapshot SHA 잠금 + timewarp로 트렌드 회귀 검증",
      "FastAPI 60+ EP · Alembic 24 마이그 · OAuth Fernet 암호화 · 어드민 서브도메인 분리",
    ],
    tech: ["Python", "FastAPI", "LangGraph", "PostgreSQL", "4종 LLM", "React PWA", "Railway", "Vercel"],
    images: Array.from({ length: 15 }).map((_, i) => `/projects/superwindsurfer/superwindsurfer-${i + 1}.png`),
    links: [
      { type: "site", url: "https://app.superwindsurfer.com", label: "App" },
      { type: "site", url: "https://superwindsurfer.com", label: "Landing" },
      { type: "site", url: "https://nlp.superwindsurfer.com", label: "NLP 발표" },
    ],
  },
  {
    id: "marritto-bot",
    title: "marritto-bot 🤖",
    subtitle: "AI를 물리 세계로 끌어내린 1인 풀스택 시스템 — 자연어 제어 · 자율 주행 · 가전 통합 · 반려묘 알림",
    role: { team: "👤 1인 개발 (Solo)", position: "Full-stack & Robotics System" },
    themeClass: "hover:border-teal-500",
    glowClass: "group-hover:shadow-[0_0_40px_-10px_rgba(20,184,166,0.2)]",
    badgeColor: "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20",
    features: [
      "Wake Word + 로컬 LLM tool-calling으로 9개 도구 자동 라우팅 (로봇·HA·CatWatch)",
      "Mecanum 4륜 + Nav2/AMCL 자율주행 + 모바일 가상 조이스틱 수동 조작",
      "CatWatch — YOLOv8s + MobileNet v3 ID 분류 + iOS Web Push 알림",
      "Ollama → llama.cpp 직접 마이그레이션 + Jetson 7.6GB VRAM에 YOLO·LLM 공존",
    ],
    tech: ["ROS2", "Jetson Orin Nano", "llama.cpp", "OpenWakeWord", "YOLOv8s", "MobileNet v3", "FastAPI", "React PWA"],
    images: Array.from({ length: 6 }).map((_, i) => `/projects/marritto-bot/marritto-${i + 1}.png`),
    links: [],
  },
  {
    id: "garim",
    title: "Garim 🛡️",
    subtitle: "영상통화 딥페이크를 단말 안에서 잡는 온디바이스 AI 앱 — 하이브리드 추론 · Adaptive Interval · Variance Penalty · 자체 적대 시뮬레이터",
    role: { team: "👥 4인 팀 프로젝트", position: "App & Web Client 총괄 전담" },
    themeClass: "hover:border-indigo-500",
    glowClass: "group-hover:shadow-[0_0_40px_-10px_rgba(99,102,241,0.2)]",
    badgeColor: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
    features: [
      "Swift vImage Zero-Copy 및 MLMultiArray 메모리 최적화",
      "전처리 병목 해결 및 Int8 양자화로 추론 속도 62% 개선 (250ms)",
      "서버 통신 없이 오프라인 동작하는 온디바이스 실시간 탐지",
      "모델 용량 75% 절감 (12MB) 및 발열 제어 시스템 구축",
    ],
    tech: ["Flutter", "Keras", "CoreML", "CNN", "Apple Neural Engine", "Int8 양자화"],
    images: Array.from({ length: 4 }).map((_, i) => `/projects/garim/garim-${i + 1}.png`),
    links: [
      { type: "site", url: "https://garim.vercel.app/" },
      { type: "github", url: "https://github.com/kimi26yg/Garim" }
    ],
  },
  {
    id: "free-b",
    title: "free-b 🐝",
    subtitle: "운영자가 묻기 전에 상태가 먼저 보이는 강사 운영 OS — AI 추천 · OCR 계약 · GPS 체크인 자동화",
    role: { team: "👥 4인 팀 프로젝트", position: "팀장 (PM) · Backend 아키텍처 총괄" },
    themeClass: "hover:border-orange-500",
    glowClass: "group-hover:shadow-[0_0_40px_-10px_rgba(249,115,22,0.2)]",
    badgeColor: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
    features: [
      "AI 기반 강사 매칭 추천 (점수 + 사유 기재)",
      "전자서명 + 계약 상태 실시간 추적",
      "GPS 기반 출강 체크인 자동 기록",
      "배정 소요 시간 70% 단축 달성",
    ],
    tech: ["FastAPI", "PostgreSQL", "React Native", "Next.js"],
    images: ["/projects/free-b/1.jpg", "/projects/free-b/2.jpg", "/projects/free-b/3.png", "/projects/free-b/4.png", "/projects/free-b/5.png"],
    links: [
      { type: "site", url: "https://landing-omega-eight-75.vercel.app/" },
      { type: "github", url: "https://github.com/kimi26yg/freebee-landing" }
    ],
  },
  {
    id: "robotics-trend",
    title: "Robotics Daily 📊",
    subtitle: "arXiv 논문을 매일 밤 자동 분석하는 로봇 트렌드 리포터 (Side)",
    role: { team: "👤 1인 개발 (Solo)", position: "Full Pipeline Automation" },
    themeClass: "hover:border-blue-500",
    glowClass: "group-hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.2)]",
    badgeColor: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    features: [
      "로봇/AI 트렌드를 스스로 추적하기 위한 개인화 분석 자동화 시스템 구성",
      "GitHub Actions를 활용하여 매일 새벽 2시 arXiv 논문 자동 수집 및 파이프라인 실행",
      "핵심 요약 기능과 더불어 논문 PDF 원문 번역 기능 구현"
    ],
    tech: ["Vercel", "GitHub Actions", "API (arXiv, Minimax)"],
    images: Array.from({ length: 6 }).map((_, i) => `/projects/robotics-trend/${i + 1}.png`),
    links: [
      { type: "site", url: "https://frontend-three-livid-volwo2dppc.vercel.app/" },
    ],
  }
];

function ImageCarousel({ images, onImageClick }: { images: string[], onImageClick: (src: string) => void }) {
  if (!images || images.length === 0) return null;

  if (images.length === 1) {
    return (
      <div className="relative w-full h-[18.75rem] md:h-[25rem] bg-gradient-to-t from-black/5 to-transparent dark:from-white/5 flex items-center justify-center p-8 border-b border-border/50">
        <img 
          src={images[0]} 
          alt="Project screenshot" 
          className="h-full w-auto object-contain drop-shadow-2xl rounded-xl cursor-pointer hover:scale-105 transition-transform" 
          onClick={() => onImageClick(images[0])}
        />
      </div>
    );
  }

  // 자연스러운 무한 롤링을 위해 배열을 3배로 늘려줍니다.
  const duplicatedImages = [...images, ...images, ...images];

  return (
    <div className="relative w-full h-[18.75rem] md:h-[25rem] overflow-hidden bg-gradient-to-t from-black/5 to-transparent dark:from-white/5 border-b border-border/50 group/carousel flex items-center">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-33.3333%); }
        }
        .pause-on-hover:hover {
          animation-play-state: paused !important;
        }
      `}</style>
      
      {/* 
        width가 넉넉히 늘어날 수 있도록 w-max를 주고,
        속도(duration)는 이미지 개수(images.length)에 10초를 곱해서
        모든 갤러리의 스크롤 속도가 동일한 물리적 절대 속도를 가지도록 통일합니다. 
      */}
      <div 
        className="flex gap-6 md:gap-10 px-4 h-[80%] items-center w-max pause-on-hover"
        style={{ animation: `marquee ${images.length * 10}s linear infinite` }}
      >
        {duplicatedImages.map((src, i) => (
          <div
            key={i}
            onClick={() => onImageClick(src)}
            className="h-full shrink-0 aspect-auto rounded-xl overflow-hidden drop-shadow-2xl bg-card border border-border flex items-center justify-center cursor-pointer hover:border-primary transition-all duration-300"
          >
            <img
              src={src}
              alt={`Screenshot ${i}`}
              className="h-full max-w-[80vw] object-contain p-2 md:p-4 hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>

      {/* 좌우 그라데이션 (마스크 효과) */}
      <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-card to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-card to-transparent z-10 pointer-events-none" />
    </div>
  );
}

export function Projects() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <section id="projects" className="bg-background relative z-10 w-full flex flex-col">
        {/* Projects Title & Quick Nav Cards Area */}
        <div className="snap-center shrink-0 min-h-[100dvh] w-full flex flex-col justify-center py-16 md:py-20 relative">
          <div className="max-w-7xl mx-auto px-4 md:px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight">
                Selected <br className="hidden lg:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-violet-500 dark:to-indigo-500">Works</span>
              </h2>
              <p className="text-foreground/70 text-lg md:text-xl max-w-lg mx-auto lg:mx-0 leading-relaxed">
                문제를 끝까지 파고들어 완성한 핵심 시스템과 앱을 소개합니다. <br /> 우측 카드를 클릭해 각 프로젝트로 빠르게 이동해보세요.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-4">
              {projects.map((proj, idx) => (
                <motion.a
                  href={`#project-${proj.id}`}
                  key={proj.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`block group p-6 rounded-3xl bg-card border border-border transition-all duration-300 hover:shadow-2xl active:scale-95 hover-shimmer ${proj.themeClass}`}
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <ChevronRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
                  </div>
                  <h4 className="text-xl font-extrabold mb-2 text-foreground transition-colors">{proj.title}</h4>
                  <p className="text-sm font-medium text-foreground/60 line-clamp-3">{proj.subtitle}</p>
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full">
          {projects.map((project, idx) => (
            <div id={`project-${project.id}`} key={project.id} className="snap-center shrink-0 min-h-[100dvh] w-full flex flex-col justify-center py-8 md:py-16 px-4 md:px-6">
              <div className="max-w-7xl mx-auto w-full">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 50 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                  className={`group flex flex-col rounded-3xl bg-card border border-border transition-all duration-500 overflow-hidden shadow-sm hover:shadow-2xl hover-shimmer ${project.themeClass} ${project.glowClass}`}
                >
                  {/* 이미지 갤러리 섹션 */}
                  {project.images.length > 0 ? (
                    <ImageCarousel images={project.images} onImageClick={setSelectedImage} />
                  ) : (
                    <div className="w-full aspect-video bg-muted/20 border-b border-border/50 flex items-center justify-center">
                      <span className="text-muted-foreground/50 text-sm">이미지 준비 중</span>
                    </div>
                  )}

                  {/* 텍스트 컨텐츠 섹션 */}
                  <div className="w-full p-8 md:p-12 space-y-8">
                    <div>
                      <h3 className="text-3xl md:text-4xl font-extrabold mb-4 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="px-3 py-1.5 text-xs font-bold rounded-full bg-primary/10 text-primary border border-primary/20">
                          {project.role.team}
                        </span>
                        <span className="px-3 py-1.5 text-xs font-bold rounded-full bg-foreground/5 text-foreground/80 border border-border">
                          {project.role.position}
                        </span>
                      </div>
                      <p className="text-lg md:text-xl font-medium text-foreground/80 leading-relaxed">
                        {project.subtitle}
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      {/* 주요 기능 */}
                      <ul className="space-y-4">
                        {project.features.map((desc, i) => (
                          <li key={i} className="flex gap-3 text-foreground/70 text-base md:text-lg">
                            <ChevronRight className="w-6 h-6 shrink-0 text-primary opacity-50 mt-0.5" />
                            <span>{desc}</span>
                          </li>
                        ))}
                      </ul>

                      {/* 기술 스택 & 링크 */}
                      <div className="space-y-8">
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tag, i) => (
                            <span key={i} className={`px-4 py-2 text-sm font-semibold rounded-full border ${project.badgeColor}`}>
                              {tag}
                            </span>
                          ))}
                        </div>

                        {project.links.length > 0 && (
                          <div className="flex flex-wrap gap-4 pt-6 border-t border-border/50">
                            {project.links.map((link, i) => (
                              <a
                                key={i}
                                href={link.url}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-foreground text-background hover:scale-105 transition-all font-bold shadow-md"
                              >
                                {link.type === 'github' ? <Github className="w-5 h-5" /> : <ExternalLink className="w-5 h-5" />}
                                {link.type === 'github' ? 'GitHub 보기' : (('label' in link && link.label) ? link.label : '웹사이트 열기')}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 이미지 확대 모달 (Lightbox) */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 md:p-8 cursor-zoom-out"
          >
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={selectedImage}
              alt="Enlarged view"
              className="max-w-[95vw] max-h-[95vh] object-contain rounded-xl drop-shadow-2xl cursor-default"
              onClick={(e) => e.stopPropagation()} // 백그라운드 클릭 시에만 닫히도록 이벤트 전파 차단
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
