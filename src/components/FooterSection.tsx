import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Github, Mail, Phone, Copy, Check, Shield } from 'lucide-react';
import { profileData } from '../data/portfolioData';
import { useSiteTransition } from './SiteTransitionOverlay';

interface FooterSectionProps {
  onOpenContact: () => void;
  lang?: 'ko' | 'en';
}

export const FooterSection: React.FC<FooterSectionProps> = ({ onOpenContact, lang = 'ko' }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const isEn = lang === 'en';
  const { openExternal } = useSiteTransition();

  const copyEmail = () => {
    navigator.clipboard.writeText(profileData.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <footer className="w-full bg-[#121316] text-white pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Top Info Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between pb-12 border-b border-white/10 gap-4 text-xs font-mono text-neutral-400">
          <div>Portfolio 2026 · Jinseo Noh</div>
          <div className="text-white font-sans text-sm font-medium tracking-tight">
            {isEn ? 'Jinseo Noh / Security Researcher' : '노진서 / Security Researcher'}
          </div>
          <div>35.2657° N, 129.0838° E · Busan, KR</div>
        </div>

        {/* Center Billboard Call to Action (Max Pratt Signature "Get in touch") */}
        <div className="py-20 md:py-28 flex flex-col items-center justify-center text-center space-y-6">
          <p className="text-xs sm:text-sm font-mono tracking-widest uppercase text-neutral-400">
            {isEn ? 'Have a security inquiry or recruitment opportunity?' : '보안 연구 및 협업 제안이 있으신가요?'}
          </p>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onOpenContact}
            className="group relative cursor-pointer focus:outline-none"
          >
            <span className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-white group-hover:text-emerald-300 transition-colors duration-300 font-sans">
              Get in touch
            </span>
            <div className="h-[2px] w-0 group-hover:w-full bg-emerald-400 transition-all duration-300 mx-auto mt-2" />
          </motion.button>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4 text-sm text-neutral-300">
            <button
              onClick={copyEmail}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-mono border border-white/15 transition-all cursor-pointer"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300">{isEn ? 'Email Copied' : '이메일 복사 완료'}</span>
                </>
              ) : (
                <>
                  <Mail className="w-3.5 h-3.5 text-neutral-400" />
                  <span>{profileData.email}</span>
                  <Copy className="w-3 h-3 text-neutral-500" />
                </>
              )}
            </button>

            <a
              href={`tel:${profileData.phone}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-mono border border-white/15 transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-neutral-400" />
              <span>{profileData.phone}</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Social Buttons */}
        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-neutral-400">
          <div className="text-center md:text-left leading-relaxed">
            <p>© {new Date().getFullYear()} {isEn ? 'Jinseo Noh' : '노진서 (Jinseo Noh)'}. All rights reserved.</p>
            <p className="text-[11px] text-neutral-500 mt-0.5">
              Built for GitHub repository & Vercel deployment.
            </p>
          </div>

          {/* Social Pill Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => openExternal(profileData.github, 'GitHub · JinnyLyn')}
              className="px-4 py-2 rounded-full border border-white/20 text-white hover:bg-white hover:text-black font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenContact}
              className="px-4 py-2 rounded-full border border-white/20 text-white hover:bg-white hover:text-black font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{isEn ? 'Message' : '문의 메시지'}</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => openExternal('https://dreamhack.io', 'DreamHack · CTF Platform')}
              className="px-4 py-2 rounded-full border border-white/20 text-white hover:bg-white hover:text-black font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>CTF Labs</span>
              <ArrowUpRight className="w-3 h-3 text-neutral-400" />
            </motion.button>
          </div>

          <div className="text-right hidden lg:block text-[11px] font-mono text-neutral-500">
            Vulnerability Research & Reverse Engineering
          </div>
        </div>
      </div>
    </footer>
  );
};
