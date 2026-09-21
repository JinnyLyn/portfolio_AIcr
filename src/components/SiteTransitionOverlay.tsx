import React, { createContext, useContext, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Shield, ArrowUpRight } from 'lucide-react';

interface SiteTransitionContextType {
  openExternal: (url: string, title?: string) => void;
}

const SiteTransitionContext = createContext<SiteTransitionContextType>({
  openExternal: (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  },
});

export const useSiteTransition = () => useContext(SiteTransitionContext);

interface SiteTransitionProviderProps {
  children: React.ReactNode;
  lang?: 'ko' | 'en';
}

export const SiteTransitionProvider: React.FC<SiteTransitionProviderProps> = ({
  children,
  lang = 'ko',
}) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [targetUrl, setTargetUrl] = useState('');
  const [targetTitle, setTargetTitle] = useState('');
  const isEn = lang === 'en';

  const openExternal = (url: string, title?: string) => {
    if (!url) return;

    // Direct mailto or tel links don't need full curtain overlay
    if (url.startsWith('mailto:') || url.startsWith('tel:')) {
      window.location.href = url;
      return;
    }

    setTargetUrl(url);
    setTargetTitle(title || url.replace(/^https?:\/\//, ''));
    setIsTransitioning(true);

    // After curtain completes entry animation, open target
    setTimeout(() => {
      window.open(url, '_blank', 'noopener,noreferrer');
    }, 400);

    // Dismiss curtain smoothly
    setTimeout(() => {
      setIsTransitioning(false);
    }, 850);
  };

  return (
    <SiteTransitionContext.Provider value={{ openExternal }}>
      {children}

      {/* Webflow Signature Full-Page Curtain Overlay Transition */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            key="page-overlay"
            initial={{ y: '-100%' }}
            animate={{ y: '0%' }}
            exit={{ y: '100%' }}
            transition={{
              duration: 0.42,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="fixed inset-0 z-[100] bg-neutral-950 text-white flex flex-col justify-between p-8 sm:p-12 md:p-16 pointer-events-auto shadow-2xl"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="tracking-widest uppercase">
                  {isEn ? 'Navigating to External Site' : '외부 사이트 이동 중'}
                </span>
              </div>
              <span className="hidden sm:inline tracking-wider">JINSEO NOH / PORTFOLIO</span>
            </div>

            {/* Center Content */}
            <div className="max-w-2xl mx-auto text-center space-y-4 my-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="w-14 h-14 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center mx-auto text-emerald-400"
              >
                <ArrowUpRight className="w-7 h-7 animate-pulse" />
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.3 }}
                className="text-2xl sm:text-4xl font-light tracking-tight text-white"
              >
                {targetTitle}
              </motion.h3>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="text-xs sm:text-sm font-mono text-neutral-400 max-w-md mx-auto truncate"
              >
                {targetUrl}
              </motion.p>

              {/* Progress Line */}
              <div className="w-48 h-0.5 bg-neutral-800 rounded-full mx-auto overflow-hidden mt-6">
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ repeat: Infinity, duration: 0.8, ease: 'easeInOut' }}
                  className="w-full h-full bg-emerald-400"
                />
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="flex items-center justify-between text-xs text-neutral-500 font-mono">
              <span>{isEn ? 'Safe External Redirect' : '안전한 새 탭 연결'}</span>
              <span>Busan, Republic of Korea</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </SiteTransitionContext.Provider>
  );
};
