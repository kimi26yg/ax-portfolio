# ax-portfolio

김용관(Kim Yong Gwan) 포트폴리오 사이트 — **AX(AI Transformation) 컨셉**.

> "디테일이 시스템을 만든다고 믿는 엔지니어."

AI 도입의 비용·신뢰성·재현성을 직접 측정해 *시스템으로 굳히는* AX 엔지니어.
PoC가 아닌 *운영 단계*까지 묶어 만든다.

## Live

- (배포 후 도메인 추가)

## Projects

- **superwindsurfer** — 4종 LLM × 3종 캐시로 풀 분석 1유저 71원, 11일에 5개 LangGraph 파이프라인을 묶은 AI 매니저 SaaS (4인 팀 / 팀장·PM·인프라)
- **marritto-bot** — Wake Word + 로컬 LLM Tool Calling으로 로봇·가전·반려묘를 자연어로 제어하는 AI 홈 로봇 (1인 풀스택)
- **Garim** — 단말 안에서 248ms에 잡는 90/10 하이브리드 — 영상통화 딥페이크 온디바이스 탐지 앱 (4인 팀 / App·Web Client 총괄)
- **free-b** — 매칭·계약·체크인 세 마찰을 한 흐름으로 묶은 강사 운영 자동화 OS (4인 팀 / PM·Backend 아키텍처)
- **Robotics Daily** — arXiv 논문을 매일 밤 자동 분석하는 로봇 트렌드 리포터 (사이드)

## AX 작업 원칙

- LLM은 *판단·해석에만* 호출 — 분류·집계는 코드로
- 모듈은 직접 호출 금지, *DB 캐시로만* 연결 — 팀 병렬화의 전제
- 비용은 *다층 캐시 + Early Exit* 으로 통제 — 1유저 71원, 32%↓
- 외부 입력은 격리, *검증 환경은 물리 분리* — snapshot SHA 잠금

## Stack

Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · framer-motion · lucide-react · next-themes

## Local

```bash
npm install
npm run dev          # http://localhost:3000
npm run build
```

## Deploy

Vercel 자동 배포 — `main` 브랜치에 push하면 production deploy.

---

© 2026 Kim Yong Gwan · [GitHub](https://github.com/kimi26yg) · [Velog](https://velog.io/@kimi26yg)
