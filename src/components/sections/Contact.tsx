"use client";

import { motion } from "framer-motion";
import { Mail, BookOpen } from "lucide-react";

const Github = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

const VelogIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M1.777 2.001L12 21.999l10.223-19.998h-4.636L12 11.821 6.413 2.001H1.777Z"/>
  </svg>
);

export function Contact() {
  return (
    <section id="contact" className="snap-center shrink-0 w-full min-h-[100dvh] flex flex-col justify-center py-16 bg-card border-t border-border">
      <div className="max-w-4xl w-full mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6">Let's build the future</h2>
          <p className="text-lg text-foreground/70 mb-12 max-w-2xl mx-auto">
            디테일에 끝까지 집착하여 문제를 해결하는 개발자가 필요하다면 연락주세요. <br />
            단순한 자동화를 넘어 로봇이 세계를 이해할 수 있는 다음 세대를 준비하고 있습니다.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            <a
              href="mailto:kimi26yg@gmail.com"
              className="flex items-center gap-3 px-8 py-4 rounded-full bg-primary text-white font-bold hover:bg-primary-hover hover:scale-105 transition-all w-full sm:w-auto justify-center shadow-lg shadow-primary/20"
            >
              <Mail className="w-5 h-5" />
              kimi26yg@gmail.com
            </a>
          </div>

          <div className="flex gap-6 justify-center">
            <a
              href="https://github.com/kimi26yg"
              target="_blank"
              rel="noreferrer"
              className="p-4 rounded-full bg-background border border-border hover:border-foreground transition-all hover:scale-110 text-foreground group"
              aria-label="GitHub"
            >
              <Github className="w-6 h-6 group-hover:text-primary transition-colors" />
            </a>
            <a
              href="https://velog.io/@kimi26yg/posts"
              target="_blank"
              rel="noreferrer"
              className="p-4 rounded-full bg-background border border-border hover:border-foreground transition-all hover:scale-110 text-foreground group"
              aria-label="Velog"
            >
              <VelogIcon className="w-6 h-6 group-hover:text-primary transition-colors" />
            </a>
          </div>
        </motion.div>
      </div>
      
      <div className="mt-24 text-center pb-8 border-t border-border pt-8 text-sm text-foreground/40">
        © {new Date().getFullYear()} Kim Yong Gwan. All rights reserved.
      </div>
    </section>
  );
}
