import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, Github, Menu, X, ArrowUpRight, Copy, Check, Globe } from 'lucide-react';
import { profileData } from '../data/portfolioData';
import { useSiteTransition } from './SiteTransitionOverlay';

interface NavbarProps {
  onOpenContact: () => void;
  onNavigate: (sectionId: string) => void;
  activeSection: string;
  lang?: 'ko' | 'en';
  onToggleLang?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenContact, 
  onNavigate, 
  activeSection,
  lang = 'ko',
  onToggleLang
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { openExternal } = useSiteTransition();

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'projects', label: lang === 'en' ? 'Projects & Works' : 'Projects & Research' },
    { id: 'about', label: 'About' },
    { id: 'timeline', label: lang === 'en' ? 'Track Record' : 'Milestones' },
    { id: 'skills', label: 'Tech Stack' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#fafaf9]/85 backdrop-blur-md border-b border-black/[0.04] transition-all">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <div className="flex flex-col">
            <a 
              href="#hero" 
              onClick={(e) => { e.preventDefault(); onNavigate('hero'); }}
              className="group flex items-center space-x-1"
            >
              <span className="font-extrabold text-xl tracking-tight text-neutral-900 group-hover:text-neutral-600 transition-colors">
                노진서
              </span>
              <span className="font-light text-neutral-400 text-sm ml-1.5 hidden sm:inline">
                / {profileData.nameEn}
              </span>
            </a>
            <span className="text-[11px] text-neutral-500 font-medium tracking-wide">
              {lang === 'en' ? 'BUFS Smart Convergence Security' : '부산외대 스마트융합보안'}
            </span>
          </div>

          {/* Desktop Floating Pill Menu with Motion Layout */}
          <nav className="hidden md:flex items-center bg-white/90 border border-black/10 rounded-full px-2 py-1.5 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)] relative">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-semibold tracking-normal transition-colors cursor-pointer z-10 ${
                    isActive ? 'text-white' : 'text-neutral-600 hover:text-neutral-950'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 bg-neutral-900 rounded-full -z-10 shadow-xs"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* Contacts Button with Tap/Hover Scale */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={onOpenContact}
              className="ml-1 px-4 py-1.5 rounded-full text-xs font-semibold bg-neutral-100 text-neutral-900 hover:bg-neutral-200 transition-colors cursor-pointer"
            >
              {lang === 'en' ? 'Contact' : 'Contacts'}
            </motion.button>
          </nav>

          {/* Desktop Right Social Stack */}
          <div className="hidden lg:flex items-center space-x-3 text-xs">
            {onToggleLang && (
              <button
                onClick={onToggleLang}
                className="px-2.5 py-1 rounded-md text-neutral-800 hover:text-black hover:bg-black/5 font-semibold transition-colors flex items-center gap-1 cursor-pointer border border-black/10"
                title={lang === 'en' ? 'Switch to Korean' : 'Switch to English'}
              >
                <Globe className="w-3 h-3 text-neutral-500" />
                <span>{lang === 'en' ? '한국어 (KO)' : 'English (EN)'}</span>
              </button>
            )}
            <span className="text-neutral-400 font-medium text-[11px]">Social:</span>
            <button
              onClick={() => openExternal(profileData.github, 'GitHub · JinnyLyn')}
              className="px-2.5 py-1 rounded-md text-neutral-700 hover:text-black hover:bg-black/5 font-semibold transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>GitHub</span>
              <ArrowUpRight className="w-3 h-3 text-neutral-400" />
            </button>
            <button
              onClick={handleCopyEmail}
              className="px-2.5 py-1 rounded-md text-neutral-700 hover:text-black hover:bg-black/5 font-semibold transition-colors flex items-center gap-1 cursor-pointer"
              title={lang === 'en' ? 'Copy Email' : '이메일 복사'}
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-emerald-600" />
                  <span className="text-emerald-700">{lang === 'en' ? 'Copied' : '복사됨'}</span>
                </>
              ) : (
                <>
                  <span>Mail</span>
                  <Copy className="w-3 h-3 text-neutral-400" />
                </>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            {onToggleLang && (
              <button
                onClick={onToggleLang}
                className="px-2 py-1 text-xs font-mono font-semibold border border-black/10 rounded-md bg-white text-neutral-800"
              >
                {lang === 'en' ? 'KO' : 'EN'}
              </button>
            )}
            <motion.button
              whileTap={{ scale: 0.94 }}
              onClick={onOpenContact}
              className="px-3 py-1.5 text-xs font-semibold bg-neutral-900 text-white rounded-full cursor-pointer"
            >
              {lang === 'en' ? 'Contact' : 'Contacts'}
            </motion.button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-800 hover:bg-black/5 rounded-lg transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu with AnimatePresence */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-3 pt-3 border-t border-black/5 flex flex-col space-y-2 pb-2 overflow-hidden"
            >
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === item.id
                      ? 'bg-neutral-900 text-white'
                      : 'text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-2 flex items-center justify-between px-3 text-xs text-neutral-500 border-t border-black/5">
                <span>{profileData.email}</span>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openExternal(profileData.github, 'GitHub · JinnyLyn');
                  }}
                  className="font-semibold text-neutral-900 flex items-center gap-0.5 cursor-pointer"
                >
                  GitHub <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};
