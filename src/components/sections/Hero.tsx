"use client";

import { motion, useMotionValue, useSpring, useTransform, Variants } from "framer-motion";
import { useEffect } from "react";
import { ChevronDown } from "lucide-react";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

const VelogIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M1.777 2.001L12 21.999l10.223-19.998h-4.636L12 11.821 6.413 2.001H1.777Z"/>
  </svg>
);

export function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for mouse parallax
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  // Move blobs opposite to mouse direction
  const blob1X = useTransform(springX, [-1000, 1000], [50, -50]);
  const blob1Y = useTransform(springY, [-1000, 1000], [50, -50]);
  const blob2X = useTransform(springX, [-1000, 1000], [-50, 50]);
  const blob2Y = useTransform(springY, [-1000, 1000], [-50, 50]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set(e.clientX - innerWidth / 2);
      mouseY.set(e.clientY - innerHeight / 2);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Framer Motion variants for staggered text reveal
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 100, damping: 20 }
    },
  };

  return (
    <section className="snap-center shrink-0 w-full relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 perspective-1000">
      {/* Parallax Background decoration */}
      <div className="absolute inset-0 z-0 opacity-30 dark:opacity-40 overflow-hidden">
        <motion.div 
          style={{ x: blob1X, y: blob1Y }}
          className="absolute top-1/4 left-1/4 w-[30rem] h-[30rem] bg-primary rounded-full mix-blend-multiply filter blur-3xl" 
        />
        <motion.div 
          style={{ x: blob2X, y: blob2Y }}
          className="absolute top-1/3 right-1/4 w-[30rem] h-[30rem] bg-violet-500 dark:bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-80"
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center w-full flex-1 flex items-center justify-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6 w-full"
        >
          <motion.div variants={itemVariants} className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-primary to-violet-500 dark:to-indigo-500 p-1 mb-8 shadow-2xl hover:scale-105 transition-transform duration-500 cursor-pointer hover:rotate-3">
            <div className="w-full h-full bg-card rounded-full flex items-center justify-center font-bold text-sm overflow-hidden text-center text-foreground hover:bg-card/80 transition-colors">
              <span>(AI 프로필 이미지 예정)</span>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-bold tracking-widest uppercase mb-2">
            AX Engineer · AI Transformation
          </motion.div>

          <div className="overflow-hidden p-2">
            <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-extrabold tracking-tight">
              디테일이 시스템을 <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-violet-500 dark:to-indigo-500 leading-normal inline-block pb-2">
                만든다고 믿는 엔지니어
              </span>
            </motion.h1>
          </div>

          <motion.p variants={itemVariants} className="text-xl md:text-2xl text-foreground font-semibold mt-6 leading-relaxed">
            기업의 AI 도입을 <span className="text-primary">운영 시스템</span>으로 만듭니다.
          </motion.p>

          <motion.p variants={itemVariants} className="text-base md:text-lg text-foreground/65 max-w-2xl mx-auto mt-5 leading-relaxed tracking-wide break-keep">
            PoC가 아닌 운영까지. <span className="font-semibold text-foreground">진단 · 설계 · 구현</span>을 한 사람이 책임지는 풀스택 엔지니어.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12 pt-4">
            <a
              href="#projects"
              className="px-10 py-4 rounded-full bg-primary text-white font-bold shadow-[0_0_40px_-5px_rgba(99,102,241,0.4)] dark:shadow-[0_0_40px_-5px_rgba(139,92,246,0.4)] hover:bg-primary-hover transition-all duration-300 hover:scale-105 active:scale-95 text-lg"
            >
              프로젝트 보기
            </a>
            <a
              href="/resume.pdf"
              download="김용관_이력서.pdf"
              className="px-10 py-4 rounded-full bg-card text-foreground border border-border shadow-md hover:bg-foreground hover:text-background transition-all duration-300 hover:scale-105 active:scale-95 font-bold text-lg"
            >
              이력서 다운로드
            </a>
            
            <div className="flex items-center gap-4 sm:ml-4 mt-4 sm:mt-0">
              <a
                href="https://github.com/kimi26yg"
                target="_blank"
                rel="noreferrer"
                className="p-3.5 rounded-full bg-background border border-border hover:border-foreground transition-all hover:scale-110 text-foreground group shadow-sm hover:shadow-md"
                aria-label="GitHub"
              >
                <GithubIcon className="w-6 h-6 group-hover:text-primary transition-colors" />
              </a>
              <a
                href="https://velog.io/@kimi26yg/posts"
                target="_blank"
                rel="noreferrer"
                className="p-3.5 rounded-full bg-background border border-border hover:border-foreground transition-all hover:scale-110 text-foreground group shadow-sm hover:shadow-md"
                aria-label="Velog"
              >
                <VelogIcon className="w-6 h-6 group-hover:text-primary transition-colors" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-foreground/50"
      >
        <span className="text-sm font-semibold tracking-widest uppercase">Scroll</span>
        <motion.div
           animate={{ y: [0, 10, 0] }}
           transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.div>
    </section>
  );
}
