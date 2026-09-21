import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowUpRight, CheckCircle2, Shield, Calendar, User, Tag, ExternalLink, BookOpen } from 'lucide-react';
import { ProjectItem } from '../types';
import { useSiteTransition } from './SiteTransitionOverlay';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onOpenContact: () => void;
  lang?: 'ko' | 'en';
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onOpenContact, lang = 'ko' }) => {
  const isEn = lang === 'en';
  const { openExternal } = useSiteTransition();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [project]);

  if (!project) return null;

  const title = isEn && project.titleEn ? project.titleEn : project.title;
  const subtitle = isEn && project.subtitleEn ? project.subtitleEn : project.subtitle;
  const period = isEn && project.periodEn ? project.periodEn : project.period;
  const role = isEn && project.roleEn ? project.roleEn : project.role;
  const description = isEn && project.descriptionEn ? project.descriptionEn : project.description;
  const highlights = isEn && project.highlightsEn ? project.highlightsEn : project.highlights;
  const tags = isEn && project.tagsEn ? project.tagsEn : project.tags;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Backdrop with Motion Fade */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
        />

        {/* Modal Card with Motion Spring Scale */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-2xl md:rounded-3xl shadow-2xl z-10 flex flex-col overflow-hidden"
        >
          {/* Header Artwork Banner */}
          <div className="relative h-48 sm:h-64 w-full bg-neutral-900 shrink-0 overflow-hidden">
            {project.image ? (
              <img
                src={project.image}
                alt={title}
                className="w-full h-full object-cover object-center brightness-90"
              />
            ) : (
              <div className={`w-full h-full bg-gradient-to-br ${project.gradient || 'from-neutral-800 to-black'}`} />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

            {/* Close button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md transition-colors cursor-pointer z-10"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </motion.button>

            {/* Title & Badge on Artwork */}
            <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-white">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-300">
                  {subtitle}
                </span>
                <h3 className="text-xl sm:text-3xl font-light text-white tracking-tight mt-1">
                  {title}
                </h3>
              </div>

              {project.externalLink ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => openExternal(project.externalLink!, title)}
                  className="shrink-0 px-4 py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-neutral-950 text-xs font-semibold transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>
                    {project.id === 'ctf-study-blog'
                      ? (isEn ? 'Visit Blog' : '블로그 방문하기')
                      : (isEn ? 'Visit Live Service' : '라이브 서비스 방문')}
                  </span>
                </motion.button>
              ) : project.id === 'ctf-study-blog' ? (
                <div className="shrink-0 px-3.5 py-1.5 rounded-full bg-white/15 border border-white/20 text-neutral-200 text-xs font-mono flex items-center gap-1.5 backdrop-blur-md">
                  <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{isEn ? 'URL to be linked' : '블로그 개설 후 링크 연동 예정'}</span>
                </div>
              ) : null}
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
            {/* Study Blog Integration Notice if applicable */}
            {project.id === 'ctf-study-blog' && (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs flex items-start gap-3">
                <BookOpen className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-semibold text-emerald-950 font-mono block">
                    {isEn ? 'Study Blog Integration Notice' : '워게임 & CTF 스터디 블로그 연동 안내'}
                  </span>
                  <p className="text-neutral-700 leading-relaxed font-light">
                    {isEn
                      ? 'This box is dedicated to your security write-up blog. When your blog is ready, add your blog URL to portfolioData.ts (externalLink field) to instantly activate the live link button with the smooth site transition.'
                      : '본 영역은 향후 개설될 드림핵, HTB, CTF 워게임 풀이 Write-up 스터디 블로그를 위한 공간입니다. 블로그 개설 후 portfolioData.ts 파일 내 ctf-study-blog의 externalLink에 블로그 URL을 입력하시면 즉시 라이브 링크 및 사이트 전환 애니메이션이 연동됩니다.'}
                  </p>
                </div>
              </div>
            )}

            {/* Metadata Row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-neutral-50 border border-black/5 text-xs">
              <div>
                <span className="text-neutral-400 block font-mono">{isEn ? 'Timeline' : '진행 기간'}</span>
                <span className="font-semibold text-neutral-800">{period}</span>
              </div>
              <div>
                <span className="text-neutral-400 block font-mono">{isEn ? 'Role' : '수행 역할'}</span>
                <span className="font-semibold text-neutral-800">{role}</span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="text-neutral-400 block font-mono">{isEn ? 'Category' : '구분'}</span>
                <span className="font-semibold text-neutral-800 uppercase font-mono">
                  {project.category}
                </span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                {isEn ? 'Overview & Objectives' : '개요 및 연구 배경'}
              </h4>
              <p className="text-sm sm:text-base text-neutral-700 leading-relaxed font-light">
                {description}
              </p>
            </div>

            {/* Key Highlights */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-3">
                {isEn ? 'Key Contributions & Technical Achievements' : '핵심 기여 및 기술적 성과'}
              </h4>
              <ul className="space-y-2.5">
                {highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Key Stats / Metrics if present */}
            {project.stats && project.stats.length > 0 && (
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-3">
                  {isEn ? 'Key Metrics' : '정량적 성과'}
                </h4>
                <div className="grid grid-cols-3 gap-3">
                  {project.stats.map((stat, idx) => {
                    const statLabel = isEn && stat.labelEn ? stat.labelEn : stat.label;
                    const statValue = isEn && stat.valueEn ? stat.valueEn : stat.value;
                    return (
                      <div key={idx} className="p-3 rounded-xl bg-neutral-100/70 border border-black/5 text-center">
                        <div className="text-xs text-neutral-500">{statLabel}</div>
                        <div className="text-sm font-semibold text-neutral-900 mt-0.5">{statValue}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tags */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                {isEn ? 'Keywords & Tools' : '키워드 및 사용 도구'}
              </h4>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-800 text-xs font-mono font-medium border border-black/5"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="p-4 sm:p-6 bg-neutral-50 border-t border-black/10 flex items-center justify-between gap-4">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-full text-xs font-semibold text-neutral-600 hover:text-black hover:bg-neutral-200/60 transition-colors cursor-pointer"
            >
              {isEn ? 'Close' : '닫기 (Close)'}
            </button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                onClose();
                onOpenContact();
              }}
              className="px-5 py-2.5 rounded-full text-xs font-semibold bg-neutral-950 text-white hover:bg-neutral-800 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <span>{isEn ? 'Inquire about this project' : '이 연구/프로젝트로 문의하기'}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
