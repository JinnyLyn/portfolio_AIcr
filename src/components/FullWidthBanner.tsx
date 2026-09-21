import React from 'react';
import { workspaceDesk } from '../data/portfolioData';
import { Terminal, Shield, Monitor } from 'lucide-react';

interface FullWidthBannerProps {
  lang?: 'ko' | 'en';
}

export const FullWidthBanner: React.FC<FullWidthBannerProps> = ({ lang = 'ko' }) => {
  const isEn = lang === 'en';

  return (
    <section className="w-full my-12 md:my-20 overflow-hidden relative border-y border-black/10 bg-neutral-950">
      <div className="relative h-[340px] sm:h-[480px] lg:h-[560px] w-full">
        <img
          src={workspaceDesk}
          alt="Security Research Lab & Daily Linux Environment"
          className="w-full h-full object-cover object-center brightness-90 hover:scale-102 transition-transform duration-1000 ease-out"
        />

        {/* Subtle Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />

        {/* Overlay Floating Minimal Tag */}
        <div className="absolute bottom-6 left-6 right-6 lg:bottom-12 lg:left-12 lg:right-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-white">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-emerald-400 mb-2">
              <Terminal className="w-3.5 h-3.5" />
              <span>Research Lab & Daily Linux Environment</span>
            </div>
            <h3 className="text-xl sm:text-3xl font-light tracking-tight text-white">
              {isEn
                ? 'Rigorous Analysis Methodology & Virtual Sandbox Lab'
                : '엄격한 분석 방법론과 가상 격리 랩 환경'}
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
              {isEn
                ? 'Static and dynamic debugging with IDA Pro, GDB, and Binary Ninja, alongside isolated virtual sandboxes for secure malware behavioral telemetry.'
                : 'IDA Pro, GDB, Binary Ninja 기반 바이너리 정적/동적 디버깅 및 안전한 악성코드 행위 관찰 샌드박스 구축'}
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2 text-xs font-mono text-neutral-300 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Busan, Republic of Korea</span>
          </div>
        </div>
      </div>
    </section>
  );
};
