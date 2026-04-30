# 김용관 포트폴리오 콘텐츠 정리

## 기본 정보

| 항목 | 내용 |
|---|---|
| 이름 | 김용관 / Kim Yong Gwan |
| 이메일 | kimi26yg@gmail.com |
| GitHub | https://github.com/kimi26yg |
| Velog | https://velog.io/@kimi26yg/posts |

---

## 포지셔닝

**타겟 롤:** AI Robot Systems Developer — Embodied AI 특화

**Hero 문장:**
> "방송 엔지니어에서 Embodied AI 개발자로 — 로봇이 세상을 이해하게 만들고 싶습니다"

**한 줄 설명:**
> AI와 로봇을 연결하는 시스템 개발자. LLM 제어부터 엣지 추론, ROS2 시스템 통합까지.

**타겟 기업:** Naver Labs, Rainbow Robotics, Robotis

---

## 커리어 스토리

- 방송 기술 엔지니어 3년 경력
- Intel KDT AI 부트캠프 수료 (~ 2026.05)
- AI/로봇 시스템 개발자로 전향 중
- 궁극 목표: VLA / World Model 기반 로봇 학습 연구

**역량 레이어:**

```
현재 증명 가능
├ ROS2 기반 로봇 시스템 통합
├ 엣지 AI 모델 최적화 (온디바이스 추론, 양자화)
└ LLM → 로봇 제어 연동

진행 중 (2달 내 완성 목표)
├ SLAM + 자율주행
└ Isaac Sim 시뮬레이션

궁극 목표 (스토리)
├ VLA / World Model 기반 로봇 학습
└ SkillVLA 연구 방향
```

---

## 스킬 스택

### Robotics
`ROS2 Humble` `Nav2` `SLAM` `RTAB-Map` `YDLiDAR` `Jetson Orin Nano` `ArUco` `Isaac Sim`

### AI / ML
`PyTorch` `Keras` `CoreML` `YOLO` `BERTopic` `LLM (Qwen)` `Ollama` `ondevice inference` `Int8 양자화`

### Backend
`FastAPI` `PostgreSQL` `ROS2 Bridge` `Wyoming Protocol` `Docker`

### Frontend / App
`React` `Next.js` `Flutter` `React Native` `PWA` `WebRTC`

---

## 프로젝트

### 1. marritto-bot 🤖
**한 줄:** ROS2 + LLM + React PWA로 혼자 만든 AI 홈 로봇 시스템

**포지셔닝:** 풀스택 로봇 시스템 설계력 증명

**현재 상태:** 앱/시스템 통합 완료, SLAM 최적화 진행 중

**주요 기능:**
- React PWA 대시보드 (실시간 텔레메트리, 카메라 스트리밍)
- ROS2 + Jetson Orin Nano 풀스택 연동
- LLM (Qwen3) 챗 연동 → 로봇/스마트홈 제어
- WebRTC 멀티 카메라 스트리밍 (로봇캠 ↔ Tapo C200)
- Home Assistant 연동 (스마트홈 통합)
- 자율 충전 도킹 설계 (ArUco 마커 기반, 제작 중)

**기술 스택:** `ROS2 Humble` `Jetson Orin Nano 8GB` `Nav2` `RTAB-Map` `React PWA` `FastAPI` `Ollama (Qwen3)` `WebRTC` `Home Assistant` `Wyoming Protocol` `Tailscale`

**로드맵:**
- SLAM 최적화 완료 → 자율주행
- 자율 충전 도킹 완성
- YOLO 기반 고양이(마롱이/또롱이) 감지 → 자율 대응

**스크린샷:** 4장 보유 (Control / Dash-Vitals / Dash-SmartHome / AI Chat)

**링크:** 개인 프로젝트 (비공개) — 스크린샷 및 데모 영상으로 대체

---

### 2. Garim 🛡️
**한 줄:** 딥페이크를 250ms 만에 탐지하는 온디바이스 AI 앱

**포지셔닝:** 모델 설계 + 모바일 최적화 + 엣지 AI 구현력 증명

**핵심 수치:**

| 지표 | Keras 원본 | CoreML 최종 |
|---|---|---|
| 정확도 | 90.36% | 88.97% |
| Real 탐지 | 508 / 575 | 519 / 575 ✓ |
| Fake 탐지 | 532 / 576 | 505 / 576 |
| F1-Score (Fake) | 0.91 | 0.89 |
| 추론 속도 | 650ms | **250ms** (62% 개선) |
| 모델 용량 | 기준 | **75% 절감** (Int8 양자화) |

**Key Insight:**
- CoreML 변환 후 전체 정확도 1.4%p 감소를 감수하고 속도 62% 개선 선택
- Real 오탐 감소 (508→519) — 실사용 환경에서 더 중요한 지표
- 온디바이스 완결: 데이터 외부 전송 0%, 오프라인 동작 가능

**기술 스택:** `Flutter` `Keras` `CoreML` `CNN` `FFT` `Apple Neural Engine` `Int8 양자화`

**링크:**
- 사이트: https://garim.vercel.app/
- GitHub: https://github.com/kimi26yg/Garim

**추가 이벤트:** 국립중앙과학관 2026 AI HACK CAMP 출품 (마감 4/24, 행사 5/16~17) — 결과 나오면 추가 예정

---

### 3. free-b 🐝
**한 줄:** 확인 전화를 없애는 프리랜서 강사 운영 자동화 플랫폼

**포지셔닝:** 팀 프로젝트 백엔드 개발 + 사용자 리서치 기반 설계

**내 역할:** 백엔드 개발 (FastAPI + PostgreSQL)

**핵심 수치:**
- 배정 소요 시간 **70% 단축**
- 체크인 완료율 **95%+**
- 확인 전화 **0건** (자동화)

**주요 기능:**
- AI 기반 강사 매칭 추천 (점수 + 사유 함께 표시)
- 전자서명 + 계약 상태 실시간 추적
- GPS 기반 출강 체크인 자동 기록
- 리스크 사전 알림

**기술 스택:** `FastAPI` `PostgreSQL` `React Native` `Next.js`

**상태:** 프로토타입 (실서비스 아님 — 명기 필수)

**링크:**
- 랜딩: https://landing-omega-eight-75.vercel.app/
- 발표자료: https://presentation-theta-seven.vercel.app/

---

### 4. robotics-trend-analyzer 📊
**한 줄:** arXiv 논문을 매일 밤 자동 분석하는 로봇 트렌드 리포터

**포지셔닝:** Side Project — "로봇/AI 트렌드를 스스로 추적하는 개발자" 브랜딩

**기술 스택:** `BERTopic` `Minimax API` `Vercel` `Railway` `arXiv API`

**링크:** https://frontend-three-livid-volwo2dppc.vercel.app/

**표시 방식:** 메인 프로젝트 아님 — Side Projects 섹션 또는 작은 카드로

---

## 사이트 구성 (섹션 순서)

1. **Hero** — 이름 + 포지셔닝 문장 + CTA (프로젝트 보기 / 이력서)
2. **About** — 커리어 전환 스토리 + 기술 스택
3. **Projects** — 메인 4개 카드 (marritto-bot / Garim / free-b / robotics-trend-analyzer)
4. **Skills** — 카테고리별 (Robotics / AI·ML / Backend / Frontend)
5. **Contact** — 이메일 + GitHub + Velog

---

## 브랜딩 방향

- **테마:** 다크 배경 + 테크 포인트 컬러 (청록 or 인디고 계열)
- **레퍼런스 느낌:** marritto-bot 대시보드 UI 톤 참고
- **스택:** Next.js + Tailwind CSS
- **배포:** Vercel

---

## 추후 업데이트 예정 (2달 후 제출 전)

- [ ] marritto-bot SLAM + 자율주행 완성 → 데모 영상/GIF 추가
- [ ] marritto-bot 자율 충전 도킹 완성
- [ ] Garim AI HACK CAMP 결과 추가
- [ ] 이력서 PDF 연결
- [ ] 커스텀 도메인 연결
