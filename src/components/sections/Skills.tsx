"use client";

import { motion, Variants } from "framer-motion";

const skillCategories = [
  {
    name: "Backend / AI Pipeline",
    skills: ["Python", "FastAPI", "NestJS", "Prisma", "LangGraph", "Tool Calling"],
  },
  {
    name: "AI / ML / Edge",
    skills: ["PyTorch", "CoreML", "YOLO", "Quantization", "llama.cpp", "OpenVINO"],
  },
  {
    name: "Robotics / Native",
    skills: ["ROS2", "Nav2", "SLAM", "Jetson Orin Nano", "Apple Neural Engine", "Swift Native"],
  },
  {
    name: "Frontend / App",
    skills: ["React", "Next.js", "Flutter", "Expo RN", "WebRTC", "PWA"],
  },
  {
    name: "Certifications",
    skills: ["ADsP", "SQLD", "네트워크관리사 2급"],
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", stiffness: 120, damping: 15 }
  },
};

const tagContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.2 },
  },
};

const tagVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 200, damping: 10 }
  },
};

export function Skills() {
  return (
    <section id="skills" className="snap-center shrink-0 w-full min-h-[100dvh] flex flex-col justify-center py-16 bg-background border-t border-border/50">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Tech Stack & Certificates</h2>
          <p className="text-foreground/70 text-lg">
            AI 파이프라인부터 엣지 추론, 풀스택 제품화까지 — 한 사람이 끝까지 묶습니다.
          </p>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid md:grid-cols-2 gap-8"
        >
          {skillCategories.map((category, idx) => (
            <motion.div
              key={category.name}
              variants={cardVariants}
              className={`p-8 rounded-3xl bg-card border border-border hover:border-primary/50 transition-colors group shadow-sm hover:shadow-lg hover-shimmer ${idx === 4 ? "md:col-span-2" : ""}`}
            >
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="w-2 h-6 rounded bg-primary/20 group-hover:bg-primary transition-colors" />
                {category.name}
              </h3>
              <motion.div 
                variants={tagContainerVariants}
                className="flex flex-wrap gap-2 md:gap-2.5"
              >
                {category.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    variants={tagVariants}
                    className={`inline-block px-3.5 py-1.5 rounded-xl text-sm font-medium border transition-colors cursor-pointer hover-shimmer ${
                      idx === 4 
                        ? "bg-primary/10 text-primary border-primary/20 hover:bg-primary hover:text-white" 
                        : "bg-foreground/5 text-foreground/80 border-border/50 hover:border-primary hover:text-primary hover:bg-primary/10"
                    }`}
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
