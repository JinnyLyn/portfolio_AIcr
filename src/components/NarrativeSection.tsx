import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { workspaceDesk, profileData } from '../data/portfolioData';

interface NarrativeSectionProps {
  onOpenContact: () => void;
  lang?: 'ko' | 'en';
}

export const NarrativeSection: React.FC<NarrativeSectionProps> = ({ onOpenContact, lang = 'ko' }) => {
  const isEn = lang === 'en';

  return (
    <section id="about" className="py-20 md:py-28 max-w-7xl mx-auto px-6 lg:px-12 border-t border-black/10">
      {/* 1. Large Billboard Hero Statement (Max Pratt Header) */}
      <div className="max-w-5xl mb-20">
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light text-neutral-950 tracking-tight leading-[1.2]">
          {isEn ? (
            <>
              Hi, I’m Jinseo Noh. Security Researcher & Student at BUFS. Researching adversarial malware robustness, vulnerability discovery & binary exploitation.
            </>
          ) : (
            <>
              안녕하세요, 노진서입니다. 부산외국어대학교 스마트융합보안전공에서 취약점 분석, 리버스 엔지니어링, 악성코드 행위 포렌식 및 적대적 AI 보안을 연구하고 있습니다.
            </>
          )}
        </h1>
      </div>

      {/* 2. Main 2-Column Grid (Direct Match to Max Pratt About Page) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: CV Items (Clients / Hard skills / Soft skills / Languages) */}
        <div className="lg:col-span-4 space-y-10">
          {/* Key Research & Domains */}
          <div className="space-y-3">
            <p className="text-xs font-mono uppercase tracking-widest text-neutral-400">
              {isEn ? 'Key Research & Projects:' : '주요 연구 및 프로젝트:'}
            </p>
            <div className="space-y-1 text-sm text-neutral-800">
              <p className="font-light">Adversarial ML Transformer (KICS '26)</p>
              <p className="font-light">x86-64 Memory Exploits (Pwnable)</p>
              <p className="font-light">Virtual Sandbox Dynamic Forensics</p>
              <p className="font-light">DocenTalk AI Docent (Hackathon Winner)</p>
              <p className="font-light">BUFS Camchat CI/CD Architecture</p>
            </div>
          </div>

          {/* Hard Skills */}
          <div className="space-y-3">
            <p className="text-xs font-mono uppercase tracking-widest text-neutral-400">
              {isEn ? 'Hard skills:' : '전문 기술 (Hard skills):'}
            </p>
            <div className="space-y-1 text-sm text-neutral-800">
              <p className="font-light">Reverse Engineering (IDA Pro, Ghidra)</p>
              <p className="font-light">Binary Exploitation (GDB, Pwndbg)</p>
              <p className="font-light">Linux & Kernel Internals</p>
              <p className="font-light">Python & C/C++ Systems</p>
              <p className="font-light">Adversarial Perturbation & Robustness</p>
              <p className="font-light">Network Protocols & Traffic Analysis</p>
              <p className="font-light">Git & Automated CI/CD Pipelines</p>
            </div>
          </div>

          {/* Soft Skills */}
          <div className="space-y-3">
            <p className="text-xs font-mono uppercase tracking-widest text-neutral-400">
              {isEn ? 'Soft skills:' : '역량 및 협업 (Soft skills):'}
            </p>
            <div className="space-y-1 text-sm text-neutral-800">
              <p className="font-light">{isEn ? 'Team Supervision (30 Members, ByteDance SV)' : '인력 지침 및 팀 관리 (30인 규모 SV)'}</p>
              <p className="font-light">{isEn ? 'Academic Research Writing (1st Author)' : '학술 논문 집필 (제1저자 KICS)'}</p>
              <p className="font-light">{isEn ? 'Vulnerability Root Cause Analysis' : '취약점 근본 원인 분석'}</p>
              <p className="font-light">{isEn ? 'Incident Response & Collaboration' : '사고 대응 및 유기적 소통'}</p>
              <p className="font-light">{isEn ? 'Continuous Problem-solving (CTF)' : '지속적 문제 해결 (CTF)'}</p>
            </div>
          </div>

          {/* Languages */}
          <div className="space-y-3">
            <p className="text-xs font-mono uppercase tracking-widest text-neutral-400">
              {isEn ? 'Languages:' : '구사 언어:'}
            </p>
            <div className="space-y-1 text-sm text-neutral-800">
              <p className="font-light">{isEn ? 'Korean – Native' : '한국어 – 원어민 (Native)'}</p>
              <p className="font-light">{isEn ? 'English – Technical & Professional' : '영어 – 실무 및 논문 독해 (Professional)'}</p>
            </div>
          </div>
        </div>

        {/* Right Column: Narrative Story + Photo + Structured Row Items */}
        <div className="lg:col-span-8 space-y-12">
          {/* Subheading (Passion for Design / Security) */}
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-light text-neutral-950 tracking-tight leading-[1.2]">
              {isEn ? (
                <>
                  Passion for Security: From <span className="font-normal text-neutral-900 underline decoration-neutral-300 underline-offset-4">Systems</span> to <span className="font-normal text-neutral-900 underline decoration-neutral-300 underline-offset-4">Adversarial ML</span>, My Journey So Far.
                </>
              ) : (
                <>
                  보안에 대한 열정: <span className="font-normal text-neutral-900 underline decoration-neutral-300 underline-offset-4">시스템 내부 구조</span>에서 <span className="font-normal text-neutral-900 underline decoration-neutral-300 underline-offset-4">적대적 AI 보안</span>까지의 여정
                </>
              )}
            </h2>

            {/* Narrative Paragraphs */}
            <div className="space-y-5 text-neutral-700 text-sm sm:text-base leading-relaxed font-light">
              {isEn ? (
                <>
                  <p>
                    I study Smart Convergence Security at Busan University of Foreign Studies, where I have cultivated a rigorous technical foundation in computer systems architecture, operating system internals, network protocols, and reverse engineering.
                  </p>
                  <p>
                    As first author, I led an undergraduate research thesis approved for graduation and presented at the KICS 2026 Summer Conference. Our study rigorously analyzed the adversarial robustness of Transformer models under noisy API injection sequences, demonstrating how Self-Attention mechanisms preserve contextual intent against evasion techniques. Currently, two follow-up studies are actively in progress.
                  </p>
                  <p>
                    Beyond academic research, I actively sharpen practical binary exploitation skills across Hack The Box, TryHackMe, and DreamHack CTF platforms—disassembling x86/x64 binaries, analyzing call stacks with GDB and IDA Pro, and bypassing modern mitigations.
                  </p>
                  <p>
                    I also served as Lead Developer/CTO of Team Maruvis, developing DocenTalk (real-time voice AI docent) which won the Startup Idea Hackathon Excellence Award, and supervised a 30-member Korean data preprocessing team at ByteDance. I am always driven to dive deeper into root cause vulnerability discovery, malware behavior, and robust offensive security research.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    부산외국어대학교 스마트융합보안전공에서 컴퓨터 시스템 아키텍처, 운영체제 내부 구조, 네트워크 프로토콜 및 암호학의 탄탄한 기본기를 확립하며 보안 연구자의 길을 걷고 있습니다.
                  </p>
                  <p>
                    제1저자로서 연구를 주도한 학부 연구 논문은 스마트융합보안전공 승인 학부논문 및 KICS 2026 하계종합학술발표회 발표 논문으로 공식 선정되었습니다. 악의적인 API 시퀀스 주입 공격 환경에서 Transformer 모델의 Self-Attention 메커니즘이 유지하는 적대적 강건성을 실증하였으며, 현재 2가지 후속 연구를 활발히 전개하고 있습니다.
                  </p>
                  <p>
                    이론 연구에 머무르지 않고 Hack The Box, TryHackMe, DreamHack 및 다수의 CTF 대회 참가를 통해 실제 바이너리의 정적·동적 취약점을 식별하고 메모리 오염을 유도하는 익스플로잇 체인을 설계하는 실무적 분석 감각을 일상적으로 단련하고 있습니다.
                  </p>
                  <p>
                    또한 팀 마루비스 CTO로서 실시간 AI 음성 도슨트 「도슨톡(DocenTalk)」을 개발하여 창업 해커톤 우수상을 수상하였으며, ByteDance 한국인 전처리 팀 SV로서 30인 규모의 인력 배치와 품질 검수를 총괄했습니다. 언제든 새로운 보안 연구와 협업에 열려 있으니 편하게 연락해 주세요.
                  </p>
                </>
              )}
            </div>
          </div>

          {/* About Photo (Matches Rectangle 1949 in Webflow Template) */}
          <div className="w-full rounded-2xl overflow-hidden border border-black/10 shadow-xs group">
            <img
              src={workspaceDesk}
              alt="Jinseo Noh Security Research Environment & Daily Workspace"
              className="w-full h-auto aspect-16/9 object-cover object-center group-hover:scale-102 transition-transform duration-700 ease-out"
            />
            <div className="p-4 bg-neutral-50 border-t border-black/5 flex items-center justify-between text-xs font-mono text-neutral-500">
              <span>Security Research Environment & Virtual Sandbox Lab</span>
              <span>Busan, South Korea</span>
            </div>
          </div>

          {/* Action Button to Open Contact Drawer */}
          <div className="pt-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onOpenContact}
              className="px-8 py-3.5 rounded-full text-xs font-semibold bg-neutral-950 text-white hover:bg-neutral-800 transition-all cursor-pointer flex items-center gap-2 shadow-md"
            >
              <span>{isEn ? 'Get in Touch' : '문의 및 연락하기 (Get in Touch)'}</span>
              <ArrowUpRight className="w-4 h-4" />
            </motion.button>
          </div>

          {/* 3. Structured Row Sections (Education / Approach / Awards & Recognitions) */}
          <div className="pt-8 space-y-12 border-t border-black/10">
            {/* Education Rows */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              <div className="md:col-span-3">
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                  {isEn ? 'Education:' : '학력 및 전공:'}
                </span>
              </div>
              <div className="md:col-span-9 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pb-3 border-b border-black/5">
                  <p className="text-sm font-semibold text-neutral-900">
                    {isEn ? 'B.S. in Smart Convergence Security' : '부산외국어대학교 스마트융합보안전공'}
                  </p>
                  <p className="text-xs font-mono text-neutral-500">
                    {isEn ? 'Busan University of Foreign Studies (2021 – 2026)' : '학사 과정 (2021 – 2026)'}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pb-3 border-b border-black/5">
                  <p className="text-sm font-semibold text-neutral-900">
                    {isEn ? 'Cybersecurity & Adversarial ML Research' : '적대적 AI 보안 및 악성코드 탐지 학부연구'}
                  </p>
                  <p className="text-xs font-mono text-neutral-500">
                    {isEn ? 'Undergraduate Research Lab (2025 – 2026)' : '제1저자 논문 연구 (2025 – 2026)'}
                  </p>
                </div>
              </div>
            </div>

            {/* Approach Rows */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              <div className="md:col-span-3">
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                  {isEn ? 'Approach:' : '연구 및 분석 접근법:'}
                </span>
              </div>
              <div className="md:col-span-9 space-y-6">
                <div className="pb-4 border-b border-black/5 space-y-1.5">
                  <p className="text-sm font-semibold text-neutral-900">
                    {isEn ? 'Static & Dynamic Reverse Engineering' : '정적 및 동적 리버스 엔지니어링'}
                  </p>
                  <p className="text-xs text-neutral-600 leading-relaxed font-light">
                    {isEn
                      ? 'Decompiling binary structures with IDA Pro, Ghidra, and GDB to reconstruct call graphs, verify control flow integrity, and identify stack/heap vulnerabilities at assembly level.'
                      : 'IDA Pro, Ghidra, GDB 기반 어셈블리 디컴파일 및 함수 호출 그래프 재구성, 제어 흐름 무결성 검증 및 스택/힙 레벨 취약점 정밀 식별.'}
                  </p>
                </div>

                <div className="pb-4 border-b border-black/5 space-y-1.5">
                  <p className="text-sm font-semibold text-neutral-900">
                    {isEn ? 'Binary Exploitation & Memory Safety' : '바이너리 익스플로잇 및 메모리 안정성 분석'}
                  </p>
                  <p className="text-xs text-neutral-600 leading-relaxed font-light">
                    {isEn
                      ? 'Evaluating format string bugs, buffer overflows, and constructing ROP chain mitigations to validate real-world exploitability in isolated environments.'
                      : '버퍼 오버플로우 및 포맷 스트링 취약점을 이용한 익스플로잇 체인 구축, ROP 가젯 체이닝과 스택 카나리/ASLR 보호기법 우회 메커니즘 검증.'}
                  </p>
                </div>

                <div className="pb-4 border-b border-black/5 space-y-1.5">
                  <p className="text-sm font-semibold text-neutral-900">
                    {isEn ? 'Adversarial AI & Malware Behavioral Forensics' : '적대적 AI 보안 및 악성코드 행위 포렌식'}
                  </p>
                  <p className="text-xs text-neutral-600 leading-relaxed font-light">
                    {isEn
                      ? 'System call and API sequence tracing inside virtual sandboxes; evaluating Transformer Self-Attention resilience against adversarial insertion/evasion noise.'
                      : '가상 격리 샌드박스 기반 시스템 콜 및 API 시퀀스 추적, 적대적 노이즈 주입 시 Transformer Self-Attention을 통한 강건한 탐지 보존 연구.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Awards & Recognitions Rows */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              <div className="md:col-span-3">
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                  {isEn ? 'Awards & Recognitions' : '수상 및 대외 성과'}
                </span>
              </div>
              <div className="md:col-span-9 space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-black/5">
                  <span className="text-sm font-medium text-neutral-900">
                    {isEn ? 'KICS 2026 Summer Conference Presentation (1st Author)' : 'KICS 2026 하계종합학술발표회 논문 발표 (제1저자)'}
                  </span>
                  <span className="text-xs font-mono text-neutral-500">2026</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-black/5">
                  <span className="text-sm font-medium text-neutral-900">
                    {isEn ? 'Approved Undergraduate Research Thesis (1st Author)' : '부산외국어대학교 스마트융합보안전공 승인 학부논문 (제1저자)'}
                  </span>
                  <span className="text-xs font-mono text-neutral-500">2026</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-black/5">
                  <span className="text-sm font-medium text-neutral-900">
                    {isEn ? 'Startup Idea Hackathon Excellence Award (Team Maruvis Lead)' : '창업 아이디어 해커톤 경진대회 우수상 (팀 마루비스 총괄)'}
                  </span>
                  <span className="text-xs font-mono text-neutral-500">2025</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-black/5">
                  <span className="text-sm font-medium text-neutral-900">
                    {isEn ? 'ByteDance Korean Preprocessing Team Supervisor (30 Members)' : 'ByteDance 한국인 데이터 전처리 팀 SV 총괄 (30인 규모)'}
                  </span>
                  <span className="text-xs font-mono text-neutral-500">2025</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-black/5">
                  <span className="text-sm font-medium text-neutral-900">
                    {isEn ? 'Continuous Offensive Security Practice (HTB, DreamHack, CTF)' : 'DreamHack, Hack The Box & CTF 취약점 분석 지속 실습'}
                  </span>
                  <span className="text-xs font-mono text-neutral-500">2024 – 2026</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
