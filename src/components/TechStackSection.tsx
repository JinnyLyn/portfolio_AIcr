import React from 'react';
import { skillCategories, profileData } from '../data/portfolioData';
import { 
  FileCode2, 
  Cpu, 
  Wifi, 
  Network,
  Terminal, 
  GitBranch, 
  ShieldAlert, 
  CheckCircle2, 
  ExternalLink,
  Target,
  Layers
} from 'lucide-react';

interface TechStackSectionProps {
  lang?: 'ko' | 'en';
}

export const TechStackSection: React.FC<TechStackSectionProps> = ({ lang = 'ko' }) => {
  const isEn = lang === 'en';

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'FileCode2':
        return <FileCode2 className="w-5 h-5 transition-colors" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 transition-colors" />;
      case 'Network':
      case 'Wifi':
        return <Network className="w-5 h-5 transition-colors" />;
      case 'Terminal':
        return <Terminal className="w-5 h-5 transition-colors" />;
      case 'GitBranch':
        return <GitBranch className="w-5 h-5 transition-colors" />;
      default:
        return <Layers className="w-5 h-5 transition-colors" />;
    }
  };

  return (
    <section id="skills" className="py-16 md:py-24 max-w-7xl mx-auto px-6 lg:px-12 border-t border-black/10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-12">
        <div className="lg:col-span-4">
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
            Technical Stack & Domains
          </span>
          <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-neutral-950 mt-1">
            {isEn ? 'Security Tech Stack' : '보안 기술 스택'}
          </h2>
          <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
            {isEn
              ? 'From binary static & dynamic reverse engineering to system & network protocol analysis, daily driver Linux environments, and automated CI/CD infrastructure.'
              : '바이너리 정적/동적 역공학부터 시스템 및 네트워크 보안 프로토콜 분석, Linux 환경 및 자동화 인프라까지 실무 분석 및 연구에 투입 가능한 전문 툴체인입니다.'}
          </p>
        </div>

        {/* Technical Stack Cards Grid */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {skillCategories.map((item, idx) => {
            const catName = isEn && item.categoryEn ? item.categoryEn : item.category;
            const desc = isEn && item.descriptionEn ? item.descriptionEn : item.description;
            const skillsList = isEn && item.skillsEn ? item.skillsEn : item.skills;

            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white border border-black/8 shadow-xs hover:border-black/20 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 rounded-xl bg-neutral-100 text-neutral-700 group-hover:bg-neutral-200 group-hover:text-neutral-950 transition-colors">
                      {getIcon(item.iconName)}
                    </div>
                    <span className="text-[11px] font-mono uppercase text-neutral-400">
                      {item.categoryEn}
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-neutral-900 tracking-tight">
                    {catName}
                  </h3>
                  <p className="mt-1.5 text-xs text-neutral-600 leading-relaxed">
                    {desc}
                  </p>
                </div>

                {/* Skills Tags */}
                <div className="mt-4 pt-3 border-t border-black/5 flex flex-wrap gap-1.5">
                  {skillsList.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-800 text-xs font-medium font-mono"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Security Activities Banner (CTF & Practice Platforms) */}
      <div className="p-6 sm:p-8 rounded-2xl bg-neutral-900 text-white shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-mono mb-2">
              <Target className="w-3.5 h-3.5" />
              <span>Continuous Offensive Security & Practice</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-light tracking-tight text-white">
              {isEn ? 'Offensive Practice & Security Challenges' : '실전 취약점 실습 및 대회 활동'}
            </h3>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-neutral-400">
            <span>Status: Active & Ongoing</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
          {profileData.activities.map((act, idx) => {
            const title = isEn && act.titleEn ? act.titleEn : act.title;
            const description = isEn && act.descriptionEn ? act.descriptionEn : act.description;
            const tags = isEn && act.tagsEn ? act.tagsEn : act.tags;

            return (
              <div key={idx} className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <h4 className="text-base font-medium text-white">{title}</h4>
                </div>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  {description}
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {tags.map((t, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-0.5 rounded-full bg-white/10 text-white/90 text-xs font-mono border border-white/10"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
