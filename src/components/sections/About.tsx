"use client";

import { motion, Variants } from "framer-motion";
import { CheckCircle2, ChevronRight, Zap, Target, Search } from "lucide-react";

const traits = [
  {
    icon: <Search className="w-6 h-6 text-primary" />,
    title: "디테일에 미친 설계",
    desc: "디테일이 결정의 품질을 만듭니다. 모듈 경계 · 비용 정책 · 검증 환경 분리까지 의사결정 단위로 꼼꼼히 따집니다.",
  },
  {
    icon: <Target className="w-6 h-6 text-primary" />,
    title: "끝까지 해결하는 끈기",
    desc: "Ollama가 얹은 헤더를 빼고 llama.cpp 바이너리만 — Jetson VRAM에 YOLO·LLM 공존시키고, 백테스트 환경까지 분리해 답을 만듭니다.",
  },
  {
    icon: <Zap className="w-6 h-6 text-primary" />,
    title: "측정 가능한 도입",
    desc: "PoC가 아닌 운영. 1유저 71원·248ms·87.5%↓ 같이 숫자로 증명되는 시스템을 만듭니다.",
  },
];

const timeline = [
  { era: "과거", role: "방송 기술 엔지니어", details: "새로운 기술 환경에 대한 빠른 적응력으로 2년 연속 우수사원, 라이브 스트리밍 인프라의 무중단 운영 및 트러블슈팅 경험" },
  { era: "현재", role: "AX 엔지니어 / AI Systems Builder", details: "Intel AI For Future Workforce 930시간 수료 + 컴공 학점은행제(2026.08 학위) + 4개 프로젝트(superwindsurfer · marritto · Garim · free-b)에서 모듈 거버넌스·비용 모델·엣지 추론·도메인 백엔드 풀체인 직접 구현" },
  { era: "미래", role: "AI Transformation Engineer", details: "기업 AI 도입의 진단 → 모듈 설계 → 비용·재현성 거버넌스 → 운영 풀체인까지 책임지는 AX 실무자" },
];

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const springItem: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", stiffness: 150, damping: 15 }
  },
};

const slideUpItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } },
};

export function About() {
  return (
    <section id="about" className="snap-center shrink-0 w-full min-h-screen flex flex-col justify-center py-10 md:py-12 bg-background relative overflow-hidden">
      <div className="max-w-6xl w-full mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-10"
        >
          <motion.h2 variants={slideUpItem} className="text-3xl md:text-4xl font-bold mb-4">About Me</motion.h2>
          <motion.p variants={slideUpItem} className="text-foreground/70 max-w-2xl mx-auto text-lg">
            기능 자동화를 넘어, AI 도입의 비용·신뢰성·재현성을 *시스템으로 굳히는* AX 엔지니어.
          </motion.p>
        </motion.div>

        {/* Traits */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-8 mb-12"
        >
          {traits.map((trait, idx) => (
            <motion.div
              key={idx}
              variants={springItem}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="p-6 rounded-2xl bg-card border border-border shadow-sm hover:shadow-xl transition-shadow"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                {trait.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{trait.title}</h3>
              <p className="text-foreground/70">{trait.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Career Roadmap */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="bg-card p-6 md:p-8 rounded-3xl border border-border shadow-xl relative overflow-hidden"
        >
          <motion.div 
            initial={{ rotate: -10, scale: 0.8, opacity: 0 }}
            whileInView={{ rotate: 0, scale: 1, opacity: 0.1 }}
            transition={{ duration: 1, type: "spring" }}
            className="absolute top-0 right-0 p-8 pointer-events-none"
          >
            <Zap className="w-[200px] h-[200px] text-primary" />
          </motion.div>
          
          <div className="relative z-10 w-full">
            <h3 className="text-2xl font-bold mb-8">Career Roadmap</h3>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="space-y-6"
            >
              {timeline.map((item, idx) => (
                <motion.div key={idx} variants={slideUpItem} className="flex flex-col md:flex-row gap-4 md:items-center group">
                  <div className="w-24 text-sm font-bold text-primary shrink-0 uppercase tracking-wider">
                    {item.era}
                  </div>
                  <div className="hidden md:flex flex-col items-center justify-center shrink-0 w-8">
                    <div className={`w-3 h-3 rounded-full ${idx === 2 ? 'bg-indigo-500 animate-pulse' : 'bg-primary'}`} />
                    {idx < timeline.length - 1 && <div className="w-0.5 h-12 bg-border mt-2 group-hover:bg-primary/50 transition-colors" />}
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-1 group-hover:text-primary transition-colors">{item.role}</h4>
                    <p className="text-foreground/60">{item.details}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
