# 노진서 (Jinseo Noh) — 보안 연구원 포트폴리오 웹사이트

보안 연구원 (취약점 분석 / 레드팀 / 악성코드 분석) 노진서의 인터랙티브 포트폴리오 웹사이트입니다.  
Max Pratt의 모던 에디토리얼 디자인 템플릿 레이아웃과 반응형 인터랙션을 반영하여 제작되었습니다.

---

## 🛠️ 기술 스택 & 프레임워크

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS v4, 모던 타이포그래피 (Plus Jakarta Sans, Noto Sans KR)
- **Icons**: Lucide React
- **Build Tool**: Vite 8
- **Deploy Target**: Vercel, GitHub Pages

---

## 🚀 GitHub 저장 및 Vercel 배포 방법

### 1. GitHub 저장소에 푸시하기

```bash
# 1. Git 초기화 (필요시)
git init
git add .
git commit -m "feat: 노진서 보안 연구원 포트폴리오 웹사이트 완성"

# 2. GitHub 원격 저장소 연결 (본인의 GitHub Repository URL 입력)
git branch -M main
git remote add origin https://github.com/JinnyLyn/portfolio.git

# 3. 푸시
git push -u origin main
```

### 2. Vercel 원클릭 배포

1. [Vercel](https://vercel.com)에 로그인합니다.
2. **Add New...** → **Project**를 클릭합니다.
3. 방금 푸시한 `portfolio` (또는 지정한 저장소 이름)를 **Import**합니다.
4. Framework Preset은 자동으로 **Vite**로 인식됩니다:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. **Deploy** 버튼을 누르면 약 30초 내로 배포가 완료됩니다!
6. 포함된 `vercel.json` 설정 덕분에 별도의 추가 라우팅 설정 없이 완벽하게 작동합니다.

---

## 📁 주요 구성 요소

- **Billboard Hero**: Max Pratt 스타일의 2열 레이아웃, 직무 비전 및 연락처/GitHub 퀵액션
- **Bento Showcase Grid**: 논문 연구 및 프로젝트 5종 벤토 그리드 (호버 시 플로팅 배지, 상세 모달 연동)
- **Narrative Statement**: 부산외대 스마트융합보안전공 및 연구 스토리텔링, ByteDance 30인 SV 경력
- **Full-Width Workspace Banner**: 가상 격리 샌드박스 및 리눅스 데일리 환경 비주얼 배너
- **Milestones / Awards**: 해커톤 2회 수상(CTO), KICS 학부 논문, BUFS_Camchat, CTF 참가 이력 아코디언
- **Security Tech Stack**: 정적/동적 분석 (IDA, GDB), 네트워크/무선, OS, 개발/인프라 인터랙티브 카드
- **Natural Language Contact Drawer**: Max Pratt 스타일의 자연어 슬라이드오버 문의 폼 및 직통 이메일 클립보드 복사
