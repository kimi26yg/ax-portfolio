"use client";

import { useEffect } from "react";

/**
 * 방향키(↑/↓) · PageUp · PageDown · Space 로
 * snap 섹션을 한 칸씩 이동시킨다.
 * - main의 .snap-center 노드를 모아 viewport 중앙 기준 현재 인덱스 산출
 * - input/textarea 안에서는 무시 (검색·폼 입력 보호)
 */
export function KeyboardNav() {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const isNext = e.key === "ArrowDown" || e.key === "PageDown" || (e.key === " " && !e.shiftKey);
      const isPrev = e.key === "ArrowUp" || e.key === "PageUp" || (e.key === " " && e.shiftKey);
      if (!isNext && !isPrev) return;

      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) return;

      const main = document.querySelector("main");
      if (!main) return;

      const sections = Array.from(main.querySelectorAll<HTMLElement>(".snap-center, .snap-start"));
      if (sections.length === 0) return;

      e.preventDefault();

      const viewportMid = window.innerHeight / 2;
      let currentIdx = sections.findIndex((s) => {
        const r = s.getBoundingClientRect();
        return r.top <= viewportMid && r.bottom > viewportMid;
      });
      if (currentIdx === -1) {
        // viewport 중앙에 걸친 섹션이 없을 때, 가장 가까운 섹션을 현재로
        let minDist = Infinity;
        sections.forEach((s, i) => {
          const r = s.getBoundingClientRect();
          const mid = (r.top + r.bottom) / 2;
          const d = Math.abs(mid - viewportMid);
          if (d < minDist) {
            minDist = d;
            currentIdx = i;
          }
        });
      }

      const direction = isNext ? 1 : -1;
      const nextIdx = Math.max(0, Math.min(sections.length - 1, currentIdx + direction));
      if (nextIdx !== currentIdx) {
        sections[nextIdx].scrollIntoView({ behavior: "smooth", block: "center" });
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return null;
}
