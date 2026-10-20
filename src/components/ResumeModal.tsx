import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Printer, Download, ExternalLink, Mail, Phone, Github, Award, CheckCircle2, BookOpen } from 'lucide-react';
import { profileData, showcaseProjects, timelineItems, skillCategories } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang?: 'ko' | 'en';
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose, lang = 'ko' }) => {
  const isEn = lang === 'en';

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs cursor-pointer print:hidden"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 26, stiffness: 280 }}
          className="relative w-full max-w-4xl max-h-[92vh] bg-white rounded-2xl shadow-2xl z-10 flex flex-col overflow-hidden my-auto border border-black/10 print:max-h-none print:shadow-none print:border-none print:rounded-none"
        >
          {/* Header Controls (Hidden on print) */}
          <div className="p-4 sm:px-6 bg-neutral-900 text-white flex items-center justify-between shrink-0 print:hidden">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <h2 className="text-sm font-semibold tracking-tight">
                {isEn ? 'Curriculum Vitae (CV) Preview' : '공식 이력서(CV) 미리보기'}
              </h2>
              <span className="text-xs font-mono text-neutral-400 hidden sm:inline">
                · A4 Print & PDF Ready
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="px-3.5 py-1.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-neutral-950 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>{isEn ? 'Print / Save as PDF' : '인쇄 및 PDF 저장'}</span>
              </button>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Printable Resume Body */}
          <div id="printable-resume" className="p-6 sm:p-10 md:p-12 overflow-y-auto space-y-8 bg-white text-neutral-900 font-sans print:p-0 print:overflow-visible">
            {/* CV Header: Candidate Name, Target Role, Contact Facts */}
            <div className="border-b border-black/15 pb-6">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight text-neutral-950 font-serif">
                    {profileData.nameKo} <span className="font-sans font-light text-xl text-neutral-600">/ {profileData.nameEn}</span>
                  </h1>
                  <p className="text-sm sm:text-base font-medium text-emerald-800 mt-1">
                    {isEn ? profileData.targetRoleEn : profileData.targetRole}
                  </p>
                </div>

                <div className="text-xs font-mono text-neutral-600 space-y-1 sm:text-right">
                  <p className="flex items-center sm:justify-end gap-1.5">
                    <Mail className="w-3 h-3 text-neutral-400" />
                    <a href={`mailto:${profileData.email}`} className="hover:underline">{profileData.email}</a>
                  </p>
                  <p className="flex items-center sm:justify-end gap-1.5">
                    <Phone className="w-3 h-3 text-neutral-400" />
                    <span>{profileData.phone}</span>
                  </p>
                  <p className="flex items-center sm:justify-end gap-1.5">
                    <Github className="w-3 h-3 text-neutral-400" />
                    <a href={profileData.github} target="_blank" rel="noreferrer" className="hover:underline">github.com/JinnyLyn</a>
                  </p>
                </div>
              </div>

              {/* Education & Language Tag strip */}
              <div className="mt-4 pt-3 border-t border-black/5 flex flex-wrap items-center justify-between gap-2 text-xs text-neutral-700">
                <div>
                  <span className="font-semibold text-neutral-900">{profileData.education.school}</span>
                  <span className="text-neutral-500 ml-1.5">스마트융합보안전공 ({profileData.education.status})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-semibold border border-emerald-200">
                    TOEIC 980
                  </span>
                  <span className="text-neutral-400">·</span>
                  <span className="text-neutral-600">한국어 (원어민) / 영어 (실무·논문 능통)</span>
                </div>
              </div>
            </div>

            {/* Section 1: Executive Summary */}
            <div className="space-y-2">
              <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-semibold">
                {isEn ? 'Executive Summary' : '전문성 요약'}
              </h2>
              <ul className="space-y-1.5 text-xs sm:text-sm text-neutral-800 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold">•</span>
                  <span><strong>AI 모델 적대적 강건성 연구 주도:</strong> API 시퀀스 기반 악성코드 탐지 딥러닝에서 50% 적대적 노이즈 주입 환경 하 Transformer의 방어력(F1 0.94 vs BiLSTM 0.40)을 실증하여 스마트융합보안전공 승인 학부논문 및 KICS 2026 하계종합학술발표회 게재.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold">•</span>
                  <span><strong>시스템 보안 & 익스플로잇 기반:</strong> IDA Pro, GDB, Pwndbg, Pwntools를 활용한 정적/동적 바이너리 분석 및 취약점 식별 역량을 갖추고 있으며, Linux를 상시 데일리 드라이버로 활용.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold">•</span>
                  <span><strong>해커톤 및 기술 리더십:</strong> SoftBank Hackathon 2026 오프라인 예선(Team Diamond) 수료, 창업 해커톤 우수상(팀 마루비스 CTO, 국제신문 보도), ByteDance 30인 규모 전처리 팀 SV 총괄.</span>
                </li>
              </ul>
            </div>

            {/* Section 2: Research & Publications */}
            <div className="space-y-3">
              <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-semibold">
                {isEn ? 'Research & Academic Publications' : '학술 연구 및 논문'}
              </h2>
              <div className="p-4 rounded-xl bg-neutral-50 border border-black/5 space-y-2 text-xs sm:text-sm">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <h3 className="font-semibold text-neutral-950">
                    「API 시퀀스 분석을 통한 딥러닝 기반 악성코드 탐지 기법의 강건성 비교에 관한 연구」
                  </h3>
                  <span className="font-mono text-xs text-neutral-500 shrink-0">2026. 06</span>
                </div>
                <p className="text-xs text-neutral-600 font-mono">
                  <strong>저자:</strong> 노진서 (제1저자), 이정수* (교신저자, 부산외국어대학교)
                </p>
                <p className="text-xs text-neutral-700 leading-relaxed">
                  스마트융합보안전공 승인 학부논문 및 한국통신학회(KICS) 2026 하계종합학술발표회 발표. 43,876개 샌드박스 동적 API 시퀀스를 기반으로 적대적 노이즈(10~50%) 환경에서 BiLSTM의 정보 희석(Information Dilution) 현상을 규명하고 Transformer Self-Attention의 강건성을 정량 실증함. (현재 후속 연구 2건 진행 중)
                </p>
              </div>
            </div>

            {/* Section 3: Key Projects & Hackathons */}
            <div className="space-y-3">
              <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-semibold">
                {isEn ? 'Projects & Hackathons' : '주요 프로젝트 및 해커톤'}
              </h2>
              <div className="space-y-3">
                {/* SoftBank Hackathon */}
                <div className="p-3.5 rounded-xl border border-black/5 space-y-1.5 text-xs sm:text-sm">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-semibold text-neutral-900">
                      SoftBank Hackathon 2026 — Team Diamond
                    </h3>
                    <span className="font-mono text-xs text-neutral-500 shrink-0">2026. 10</span>
                  </div>
                  <p className="text-xs text-neutral-600">
                    주최: SoftBank Corp. / 주관: Progate & KOREC (Bwell Korea)
                  </p>
                  <p className="text-xs text-neutral-700 leading-relaxed">
                    개별 서류심사 합격 후 2026. 10. 10~11 무박 오프라인 예선(Preliminary Round) 참가 및 프로토타입 구현 완료. 공식 참여 확인증(Certificate of Completion) 수료. (개인별 본선 진출 심사 대기 중)
                  </p>
                </div>

                {/* DocenTalk */}
                <div className="p-3.5 rounded-xl border border-black/5 space-y-1.5 text-xs sm:text-sm">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-semibold text-neutral-900">
                      도슨톡 (DocenTalk) — 실시간 AI 음성 도슨트 (팀 마루비스 CTO)
                    </h3>
                    <span className="font-mono text-xs text-neutral-500 shrink-0">2026. 05</span>
                  </div>
                  <p className="text-xs text-neutral-600">
                    2026 창업 아이디어 해커톤 경진대회 우수상 (상금 50만원) · 국제신문 공식 보도
                  </p>
                  <p className="text-xs text-neutral-700 leading-relaxed">
                    OpenAI Realtime API 기반 양방향 실시간 음성 스트리밍 아키텍처 및 4단계 눈높이 맞춤형 큐레이션 엔진 구현. MVP 배포(object-diary.vercel.app).
                  </p>
                </div>

                {/* BUFS Camchat */}
                <div className="p-3.5 rounded-xl border border-black/5 space-y-1.5 text-xs sm:text-sm">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-semibold text-neutral-900">
                      BUFS_Camchat — 교내 학사 정보 안내 챗봇 (개발 및 배포 리드)
                    </h3>
                    <span className="font-mono text-xs text-neutral-500 shrink-0">2026 ~</span>
                  </div>
                  <p className="text-xs text-neutral-700 leading-relaxed">
                    부산외대 학사 안내 챗봇 프로덕션 배포(maruvis.kr). 팀 Git 브랜치 전략 및 자동화 CI/CD 배포 파이프라인 설계 및 구축.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 4: Work Experience */}
            <div className="space-y-3">
              <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-semibold">
                {isEn ? 'Work Experience' : '실무 경력'}
              </h2>
              <div className="p-3.5 rounded-xl border border-black/5 space-y-1 text-xs sm:text-sm">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-semibold text-neutral-900">
                    ByteDance — Data Preprocessing Team, Supervisor (SV)
                  </h3>
                  <span className="font-mono text-xs text-neutral-500">2022 (3개월)</span>
                </div>
                <p className="text-xs text-neutral-700 leading-relaxed">
                  한국인 팀원 30명 규모 전처리 팀의 인력 배치, 작업 스케줄 조율 및 AI 학습 데이터 품질 기준 수립·산출물 최종 검수 수행.
                </p>
              </div>
            </div>

            {/* Section 5: Technical Skills & Tools */}
            <div className="space-y-3">
              <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-semibold">
                {isEn ? 'Technical Skills & Tools' : '기술 스택 및 도구'}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-neutral-50 border border-black/5 space-y-1">
                  <span className="font-semibold text-neutral-900 font-mono block">AI & Machine Learning</span>
                  <p className="text-neutral-700">Python, PyTorch, TensorFlow v2, Scikit-learn, Transformer, BiLSTM, 적대적 노이즈 평가</p>
                </div>
                <div className="p-3 rounded-lg bg-neutral-50 border border-black/5 space-y-1">
                  <span className="font-semibold text-neutral-900 font-mono block">Systems & Security</span>
                  <p className="text-neutral-700">Pwntools, IDA Pro, Ghidra, GDB, Pwndbg, C/C++, Linux Kernel, Network Traffic Forensics</p>
                </div>
                <div className="p-3 rounded-lg bg-neutral-50 border border-black/5 space-y-1">
                  <span className="font-semibold text-neutral-900 font-mono block">Infrastructure & Dev</span>
                  <p className="text-neutral-700">Linux (Daily Driver), Git, GitHub Actions (CI/CD), OpenAI Realtime API, Docker</p>
                </div>
                <div className="p-3 rounded-lg bg-neutral-50 border border-black/5 space-y-1">
                  <span className="font-semibold text-neutral-900 font-mono block">Languages & Certification</span>
                  <p className="text-neutral-700">한국어 (Native), 영어 (Fluent & Technical, <strong>TOEIC 980점</strong>)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer (Hidden on print) */}
          <div className="p-4 sm:px-6 bg-neutral-50 border-t border-black/10 flex items-center justify-between shrink-0 print:hidden text-xs">
            <span className="text-neutral-500">
              {isEn ? 'Use the print button to export as clean PDF.' : '인쇄 버튼을 눌러 PDF로 저장하거나 바로 인쇄할 수 있습니다.'}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-full text-neutral-600 hover:text-black hover:bg-neutral-200/60 transition-colors cursor-pointer"
              >
                {isEn ? 'Close' : '닫기'}
              </button>
              <button
                onClick={handlePrint}
                className="px-5 py-2 rounded-full bg-neutral-950 text-white hover:bg-neutral-800 transition-colors font-medium flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>{isEn ? 'Print / PDF' : '인쇄 / PDF 저장'}</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
