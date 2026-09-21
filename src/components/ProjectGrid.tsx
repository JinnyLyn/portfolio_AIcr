import React, { useState } from 'react';
import { ArrowUpRight, Sparkles, Shield, Cpu, ExternalLink, Code, BookOpen } from 'lucide-react';
import { ProjectItem } from '../types';
import { showcaseProjects } from '../data/portfolioData';
import { useSiteTransition } from './SiteTransitionOverlay';

interface ProjectGridProps {
  onSelectProject: (project: ProjectItem) => void;
  lang?: 'ko' | 'en';
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({ onSelectProject, lang = 'ko' }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const isEn = lang === 'en';
  const { openExternal } = useSiteTransition();

  const filteredProjects = showcaseProjects.filter((item) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'research') return item.category === 'research';
    if (activeCategory === 'project') return item.category === 'project';
    if (activeCategory === 'security') return item.category === 'security';
    return true;
  });

  const heroProject = filteredProjects[0] || showcaseProjects[0];
  const gridProjects = filteredProjects.length > 1 ? filteredProjects.slice(1) : showcaseProjects.slice(1);

  return (
    <section id="projects" className="py-12 md:py-20 max-w-7xl mx-auto px-6 lg:px-12">
      {/* Section Header with Category Tabs */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-black/10 pb-6">
        <div>
          <span className="text-xs font-mono tracking-widest uppercase text-neutral-500">
            Selected Works & Research
          </span>
          <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-neutral-950 mt-1">
            {isEn ? 'Projects & Research Showcase' : '프로젝트 및 연구 포트폴리오'}
          </h2>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 bg-neutral-200/60 p-1 rounded-full text-xs font-medium">
          {[
            { id: 'all', label: isEn ? `All Works (${showcaseProjects.length})` : `전체 (${showcaseProjects.length})` },
            { id: 'research', label: isEn ? 'Research & Thesis' : '연구 / 논문' },
            { id: 'project', label: isEn ? 'Dev & RAG' : '개발 & RAG' },
            { id: 'security', label: isEn ? 'Security & Exploits' : '보안 / 리버싱' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                activeCategory === tab.id
                  ? 'bg-neutral-900 text-white shadow-xs font-semibold'
                  : 'text-neutral-600 hover:text-black hover:bg-white/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Hero Big Card (First Item - Full Width) */}
      {heroProject && (
        <div className="mb-6">
          <div
            onClick={() => onSelectProject(heroProject)}
            className="group relative h-[380px] sm:h-[460px] lg:h-[500px] w-full rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 bg-neutral-900 border border-black/5"
          >
            {/* Background Artwork */}
            {heroProject.image ? (
              <img
                src={heroProject.image}
                alt={isEn && heroProject.titleEn ? heroProject.titleEn : heroProject.title}
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out brightness-95"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 via-neutral-900 to-black" />
            )}

            {/* Gradient Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20 group-hover:from-black/90 transition-colors" />

            {/* Top Info Bar (Max Pratt style slide-down / fixed badge) */}
            <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-white/90 text-xs font-mono z-10">
              <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="font-sans font-medium tracking-tight">
                  {heroProject.category === 'research'
                    ? (isEn ? 'Academic Research' : '학술 연구 논문')
                    : (isEn ? 'Featured Case Study' : '주요 프로젝트')}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 font-mono">
                <span>{isEn && heroProject.periodEn ? heroProject.periodEn : heroProject.period}</span>
                <span className="text-white/40">·</span>
                <span className="text-white/80">{isEn && heroProject.roleEn ? heroProject.roleEn : heroProject.role}</span>
              </div>
            </div>

            {/* Bottom Content & Meta */}
            <div className="absolute bottom-6 left-6 right-6 lg:bottom-10 lg:left-10 lg:right-10 z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-2xl text-white">
                <p className="text-xs md:text-sm font-medium tracking-wide text-neutral-300 uppercase font-mono mb-2">
                  {isEn && heroProject.subtitleEn ? heroProject.subtitleEn : heroProject.subtitle}
                </p>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-light text-white tracking-tight leading-tight group-hover:text-emerald-300 transition-colors">
                  {isEn && heroProject.titleEn ? heroProject.titleEn : heroProject.title}
                </h3>
                <p className="mt-3 text-sm text-neutral-300 line-clamp-2 font-normal leading-relaxed">
                  {isEn && heroProject.descriptionEn ? heroProject.descriptionEn : heroProject.description}
                </p>

                {/* Tags */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {(isEn && heroProject.tagsEn ? heroProject.tagsEn : heroProject.tags).map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-sm text-[11px] font-medium text-white/90 border border-white/10"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* View Action Pill */}
              <div className="shrink-0 flex items-center gap-2.5">
                {heroProject.externalLink && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openExternal(
                        heroProject.externalLink!,
                        isEn && heroProject.titleEn ? heroProject.titleEn : heroProject.title
                      );
                    }}
                    className="px-4 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-neutral-950 text-xs font-semibold transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
                    title={isEn ? 'Live Demo' : '라이브 데모'}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>{isEn ? 'Live Demo' : '라이브 데모'}</span>
                  </button>
                )}
                <span className="px-5 py-2.5 rounded-full bg-white text-neutral-900 text-xs font-semibold group-hover:bg-neutral-100 transition-all flex items-center gap-1.5 shadow-md">
                  <span>{isEn ? 'Case Study Details' : '상세 보기 (Case Study)'}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bento Grid for Remaining Works */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {gridProjects.map((project) => {
          const isStudyBlog = project.id === 'ctf-study-blog';
          const isOddSpan = isStudyBlog && gridProjects.length % 2 === 1;

          return (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className={`group relative h-[360px] sm:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 bg-neutral-900 border border-black/5 ${
                isOddSpan ? 'md:col-span-2' : ''
              }`}
            >
              {/* Background Artwork */}
              {project.image ? (
                <img
                  src={project.image}
                  alt={isEn && project.titleEn ? project.titleEn : project.title}
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out brightness-95"
                />
              ) : (
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient || 'from-neutral-800 to-black'}`} />
              )}

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20 group-hover:from-black/90 transition-colors" />

              {/* Top Floating Info */}
              <div className="absolute top-5 left-5 right-5 flex items-center justify-between text-white/90 text-xs z-10">
                <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/15 font-sans font-medium text-[11px] flex items-center gap-1.5">
                  {isStudyBlog ? (
                    <>
                      <BookOpen className="w-3 h-3 text-emerald-400" />
                      <span>{isEn ? 'Study Blog · Write-ups' : '스터디 블로그 · Write-ups'}</span>
                    </>
                  ) : project.category === 'project' ? (
                    isEn ? 'Project & Architecture' : '개발 및 아키텍처'
                  ) : (
                    isEn ? 'Security & Exploits' : '보안 및 취약점 분석'
                  )}
                </span>
                <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/15 font-mono text-[11px]">
                  {isEn && project.periodEn ? project.periodEn : project.period}
                </span>
              </div>

              {/* Bottom Content */}
              <div className="absolute bottom-5 left-5 right-5 z-10 flex flex-col justify-end text-white">
                <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-300 mb-1">
                  {isEn && project.roleEn ? project.roleEn : project.role}
                </span>
                <h3 className="text-xl sm:text-2xl font-light text-white tracking-tight leading-snug group-hover:text-emerald-300 transition-colors">
                  {isEn && project.titleEn ? project.titleEn : project.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-neutral-300 line-clamp-2 leading-relaxed">
                  {isEn && project.subtitleEn ? project.subtitleEn : project.subtitle}
                </p>

                {/* Tags & Action Row */}
                <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5 max-w-[70%]">
                    {(isEn && project.tagsEn ? project.tagsEn : project.tags).slice(0, isOddSpan ? 5 : 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-full bg-white/10 backdrop-blur-xs text-[10px] text-white/80"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    {project.externalLink ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openExternal(
                            project.externalLink!,
                            isEn && project.titleEn ? project.titleEn : project.title
                          );
                        }}
                        className="w-8 h-8 rounded-full bg-emerald-500/80 hover:bg-emerald-400 backdrop-blur-md flex items-center justify-center text-black transition-all cursor-pointer"
                        title={isEn ? 'Open Link' : '바로가기'}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    ) : isStudyBlog ? (
                      <span className="hidden sm:inline-flex px-2.5 py-1 rounded-full bg-white/10 text-neutral-300 border border-white/15 text-[10px] font-mono items-center gap-1 backdrop-blur-md">
                        <BookOpen className="w-3 h-3 text-emerald-400" />
                        <span>{isEn ? 'Link to be added' : '개설 후 링크 연동'}</span>
                      </span>
                    ) : null}
                    <span className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all">
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
