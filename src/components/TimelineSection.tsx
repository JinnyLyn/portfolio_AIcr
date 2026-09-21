import React, { useState } from 'react';
import { timelineItems } from '../data/portfolioData';
import { ChevronDown, Trophy, FileText, Briefcase, Flag, Terminal } from 'lucide-react';

interface TimelineSectionProps {
  lang?: 'ko' | 'en';
}

export const TimelineSection: React.FC<TimelineSectionProps> = ({ lang = 'ko' }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const isEn = lang === 'en';

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getCategoryIcon = (category: string) => {
    if (category.includes('Awards')) return <Trophy className="w-3.5 h-3.5 text-amber-600" />;
    if (category.includes('Research')) return <FileText className="w-3.5 h-3.5 text-blue-600" />;
    if (category.includes('Work')) return <Briefcase className="w-3.5 h-3.5 text-purple-600" />;
    if (category.includes('Competition') || category.includes('CTF')) return <Flag className="w-3.5 h-3.5 text-rose-600" />;
    return <Terminal className="w-3.5 h-3.5 text-emerald-600" />;
  };

  return (
    <section id="timeline" className="py-16 md:py-24 max-w-7xl mx-auto px-6 lg:px-12 border-t border-black/10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
        {/* Left Column: Heading */}
        <div className="lg:col-span-4">
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
            Milestones & Track Record
          </span>
          <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-neutral-950 mt-1">
            {isEn ? 'Milestones & Track Record' : '주요 성과 및 연구 이력'}
          </h2>
          <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
            {isEn
              ? 'Academic research thesis, hackathon excellence award (CTO), large-scale team supervision at ByteDance, and offensive CTF practice. Click any entry to view full details.'
              : '학술 논문 승인 및 학회 발표, 해커톤 우수상 수상(CTO), 대규모 팀 운영 및 CTF/실습 플랫폼을 통한 역량 입증 기록입니다. 각 항목을 클릭하여 상세 내용을 확인할 수 있습니다.'}
          </p>
        </div>

        {/* Right Column: Row Items List (Max Pratt Table Style) */}
        <div className="lg:col-span-8 divide-y divide-black/10">
          {timelineItems.map((item) => {
            const isExpanded = expandedId === item.id;
            const title = isEn && item.titleEn ? item.titleEn : item.title;
            const subtitle = isEn && item.subtitleEn ? item.subtitleEn : item.subtitle;
            const details = isEn && item.detailsEn ? item.detailsEn : item.details;
            const category = isEn && item.categoryEn ? item.categoryEn : item.category;

            return (
              <div
                key={item.id}
                onClick={() => toggleExpand(item.id)}
                className="group py-5 transition-colors hover:bg-neutral-100/50 -mx-3 px-3 rounded-lg cursor-pointer"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="p-1.5 rounded-md bg-neutral-100 group-hover:bg-white transition-colors">
                      {getCategoryIcon(item.category)}
                    </span>
                    <div>
                      <h4 className="text-base sm:text-lg font-normal text-neutral-900 group-hover:text-black tracking-tight flex items-center gap-2">
                        <span>{title}</span>
                      </h4>
                      {subtitle && (
                        <p className="text-xs text-neutral-500 font-mono mt-0.5">
                          {subtitle}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs sm:text-sm font-mono font-medium text-neutral-700">
                      {item.year}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-neutral-400 transition-transform duration-200 ${
                        isExpanded ? 'rotate-180 text-black' : ''
                      }`}
                    />
                  </div>
                </div>

                {/* Collapsible Details */}
                {isExpanded && (
                  <div className="mt-3.5 pt-3 pl-9 border-t border-black/5 text-xs sm:text-sm text-neutral-600 leading-relaxed animate-fadeIn">
                    <p className="font-normal text-neutral-800">{details}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-neutral-200/70 text-neutral-700">
                        {isEn ? `Domain: ${category}` : `분야: ${category}`}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
