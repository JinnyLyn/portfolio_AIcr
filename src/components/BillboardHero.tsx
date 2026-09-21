import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Copy, Check, Shield, Terminal, Bug, Cpu, Award, Globe } from 'lucide-react';
import { profileData } from '../data/portfolioData';
import { useSiteTransition } from './SiteTransitionOverlay';

interface BillboardHeroProps {
  onOpenContact: () => void;
  onExploreProjects: () => void;
  lang: 'ko' | 'en';
  onToggleLang: () => void;
}

export const BillboardHero: React.FC<BillboardHeroProps> = ({ 
  onOpenContact, 
  onExploreProjects,
  lang,
  onToggleLang 
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const { openExternal } = useSiteTransition();

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const isEn = lang === 'en';

  return (
    <section id="hero" className="pt-8 pb-16 md:pt-16 md:pb-24 max-w-7xl mx-auto px-6 lg:px-12">
      {/* Top Meta Line with Language Switcher */}
      <div className="flex items-center justify-between border-b border-black/[0.08] pb-4 mb-10 text-xs font-mono text-neutral-400">
        <div className="flex items-center gap-2 tracking-widest uppercase">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-neutral-600 font-medium">Available for Security & Research Roles</span>
        </div>
        <button
          onClick={onToggleLang}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-black/10 hover:border-black/30 text-neutral-700 hover:text-black transition-all bg-white/80 cursor-pointer shadow-2xs"
          title="한국어 / English Switch"
        >
          <Globe className="w-3.5 h-3.5 text-neutral-500" />
          <span className="font-semibold text-[11px]">{isEn ? '한국어 보기' : 'English Version'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Metadata, Fact Sheet & Executive Brief */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-8 order-2 lg:order-1 pt-1">
          {/* Executive Summary Points */}
          <div className="space-y-4 text-neutral-700 text-sm md:text-[14.5px] leading-[1.75] break-keep">
            {isEn ? (
              <>
                <p>
                  Security researcher specialized in <strong className="text-neutral-950 font-medium">Reverse Engineering & Pwnable</strong> vulnerabilities. Continuously refining practical exploit chain capabilities on Hack The Box, TryHackMe, and national CTF tournaments.
                </p>
                <p>
                  First author of <strong className="text-neutral-950 font-medium">"A Study on the Robustness Comparison of Deep Learning-based Malware Detection Systems using API Sequence Analysis"</strong>, approved as undergraduate thesis and presented at <strong className="text-neutral-950 font-medium">KICS 2026</strong>, with two follow-up studies in progress.
                </p>
                <p>
                  Demonstrated technical leadership as <strong className="text-neutral-950 font-medium">Team CTO</strong> (Hackathon Award recipient) and operational command managing 30-member data teams at ByteDance.
                </p>
              </>
            ) : (
              <>
                <p>
                  <strong className="text-neutral-950 font-medium">리버스 엔지니어링·포너블</strong> 중심의 취약점 분석 역량을 갖추고 있으며, Hack The Box·TryHackMe 및 온/오프라인 CTF를 통해 실전 익스플로잇 체인을 연구해왔습니다.
                </p>
                <p>
                  제1저자로서 「API 시퀀스 분석을 통한 딥러닝 기반 악성코드 탐지 기법의 강건성 비교에 관한 연구」 <strong className="text-neutral-950 font-medium">학부논문 승인 완료 및 KICS 2026 발표</strong>를 달성하였으며, 현재 <strong className="text-neutral-950 font-medium">2가지 후속 연구</strong>를 진행 중입니다.
                </p>
                <p>
                  <strong className="text-neutral-950 font-medium">팀 마루비스 개발 총괄(창업 해커톤 우수상)</strong> 및 30인 규모 ByteDance 팀 SV로서 기술 설계와 실행 역량을 입증했습니다.
                </p>
              </>
            )}
          </div>

          {/* Quick Profile Fact Sheet (Clean Editorial Table) */}
          <div className="border-t border-b border-black/10 py-3.5 space-y-2.5 text-xs text-neutral-700">
            <div className="flex items-center justify-between py-1 border-b border-black/[0.04]">
              <span className="font-semibold text-neutral-900 w-20">{isEn ? 'Email' : '이메일'}</span>
              <button
                onClick={() => copyToClipboard(profileData.email, 'email')}
                className="font-mono text-neutral-800 hover:text-black flex items-center gap-1 group transition-colors cursor-pointer"
                title="Click to copy"
              >
                <span>{profileData.email}</span>
                {copiedEmail ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-neutral-400 group-hover:text-black" />
                )}
              </button>
            </div>

            <div className="flex items-center justify-between py-1 border-b border-black/[0.04]">
              <span className="font-semibold text-neutral-900 w-20">{isEn ? 'Phone' : '연락처'}</span>
              <button
                onClick={() => copyToClipboard(profileData.phone, 'phone')}
                className="font-mono text-neutral-800 hover:text-black flex items-center gap-1 group transition-colors cursor-pointer"
                title="Click to copy"
              >
                <span>{profileData.phone}</span>
                {copiedPhone ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-neutral-400 group-hover:text-black" />
                )}
              </button>
            </div>

            <div className="flex items-center justify-between py-1 border-b border-black/[0.04]">
              <span className="font-semibold text-neutral-900 w-20">GitHub</span>
              <button
                onClick={() => openExternal(profileData.github, 'GitHub · JinnyLyn')}
                className="font-mono text-neutral-800 hover:text-black flex items-center gap-1 group transition-colors font-medium cursor-pointer"
              >
                <span>github.com/JinnyLyn</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-black" />
              </button>
            </div>

            <div className="flex items-start justify-between py-1">
              <span className="font-semibold text-neutral-900 w-20 shrink-0">{isEn ? 'Affiliation' : '소속'}</span>
              <span className="text-right text-neutral-800 font-medium">
                {isEn ? profileData.affiliationEn : profileData.affiliation}
              </span>
            </div>
          </div>

          {/* Metadata Footer */}
          <div className="flex items-center justify-between text-xs text-neutral-500 pt-0.5">
            <span className="tracking-wide">{isEn ? 'Last updated' : '최종 업데이트'}</span>
            <span className="font-mono font-medium text-neutral-800">2026. 09</span>
          </div>

          {/* Action Buttons with Motion */}
          <div className="flex items-center gap-3 pt-1">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={onOpenContact}
              className="px-5 py-2.5 rounded-full text-xs font-semibold bg-neutral-950 text-white hover:bg-neutral-800 transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <span>{isEn ? 'Get in touch' : '연락처 및 제안'}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={onExploreProjects}
              className="px-5 py-2.5 rounded-full text-xs font-semibold border border-black/15 bg-white text-neutral-800 hover:border-black/40 hover:bg-neutral-50 transition-all cursor-pointer"
            >
              {isEn ? 'Selected Works' : '연구 및 프로젝트'}
            </motion.button>
          </div>
        </div>

        {/* Right Column: Editorial Billboard Heading */}
        <div className="lg:col-span-8 order-1 lg:order-2 flex flex-col justify-center space-y-7">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-xs font-mono tracking-widest uppercase text-neutral-500">
              <span className="inline-block w-8 h-[1px] bg-neutral-400"></span>
              <span>Portfolio 2026 · Jinseo Noh</span>
            </div>

            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-light tracking-tight text-neutral-950 leading-[1.06]">
              {isEn ? (
                <>
                  Security Researcher <br />
                  <span className="font-serif italic font-normal text-neutral-900">Jinseo Noh</span>
                </>
              ) : (
                <>
                  보안 연구원 <span className="font-serif italic font-normal text-neutral-900">노진서</span>
                </>
              )}
            </h1>

            <p className="text-xl sm:text-2xl lg:text-3xl font-light text-neutral-600 tracking-tight leading-snug">
              {isEn ? (
                <>
                  Vulnerability Analysis <span className="text-neutral-300">/</span> Red Teaming <span className="text-neutral-300">/</span> Malware Forensics
                </>
              ) : (
                <>
                  취약점 분석 <span className="text-neutral-300">/</span> 레드팀 <span className="text-neutral-300">/</span> 악성코드 분석
                </>
              )}
            </p>
          </div>

          {/* Subtitle / Editorial Statement */}
          <div className="pt-4 border-t border-black/10">
            <p className="text-lg sm:text-xl lg:text-2xl text-neutral-800 font-light leading-relaxed max-w-3xl">
              Specializing in <span className="font-normal text-neutral-950 underline decoration-neutral-300 underline-offset-4 font-serif italic text-[1.1em]">Reverse Engineering & Pwnable</span>, adversarial malware robustness research, and system-level security architecture.
            </p>
          </div>

          {/* Competency Badges */}
          <div className="flex flex-wrap gap-2 pt-1">
            {[
              { icon: Shield, label: isEn ? 'Approved Thesis (1st Author) · KICS 2026' : '승인 학부논문 (제1저자) · KICS 2026' },
              { icon: Bug, label: isEn ? 'Reverse Engineering & Pwnable' : '리버스 엔지니어링 / 포너블' },
              { icon: Terminal, label: 'IDA Pro · Binary Ninja · GDB' },
              { icon: Award, label: isEn ? 'Hackathon CTO: DocenTalk (Realtime AI)' : '해커톤 수상: 도슨톡 (OpenAI Realtime)' },
              { icon: Cpu, label: 'Hack The Box · TryHackMe · CTF' },
            ].map((pill, idx) => {
              const Icon = pill.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-black/8 text-xs font-medium text-neutral-800 shadow-2xs hover:border-black/25 transition-colors"
                >
                  <Icon className="w-3.5 h-3.5 text-neutral-500" />
                  <span>{pill.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
