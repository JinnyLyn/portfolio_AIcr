import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { BillboardHero } from './components/BillboardHero';
import { ProjectGrid } from './components/ProjectGrid';
import { NarrativeSection } from './components/NarrativeSection';
import { FullWidthBanner } from './components/FullWidthBanner';
import { TimelineSection } from './components/TimelineSection';
import { TechStackSection } from './components/TechStackSection';
import { FooterSection } from './components/FooterSection';
import { ContactDrawer } from './components/ContactDrawer';
import { ProjectModal } from './components/ProjectModal';
import { ProjectItem } from './types';
import { SiteTransitionProvider } from './components/SiteTransitionOverlay';

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [activeSection, setActiveSection] = useState('hero');
  const [lang, setLang] = useState<'ko' | 'en'>('ko');

  const toggleLang = () => {
    setLang((prev) => (prev === 'ko' ? 'en' : 'ko'));
  };

  // Handle smooth scroll navigation
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  // Scrollspy to keep active nav pill updated
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'projects', 'about', 'timeline', 'skills'];
      const scrollPosition = window.scrollY + 120;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <SiteTransitionProvider lang={lang}>
      <div className="min-h-screen bg-[#fafaf9] text-[#171717] flex flex-col font-sans selection:bg-neutral-900 selection:text-white">
        {/* Sticky Max Pratt Navigation */}
        <Navbar
          onOpenContact={() => setIsContactOpen(true)}
          onNavigate={handleNavigate}
          activeSection={activeSection}
          lang={lang}
          onToggleLang={toggleLang}
        />

        {/* Main Content Area */}
        <main className="flex-1">
          {/* Billboard Hero Section */}
          <BillboardHero
            onOpenContact={() => setIsContactOpen(true)}
            onExploreProjects={() => handleNavigate('projects')}
            lang={lang}
            onToggleLang={toggleLang}
          />

          {/* Signature Bento Project & Research Grid */}
          <ProjectGrid 
            onSelectProject={(project) => setSelectedProject(project)} 
            lang={lang}
          />

          {/* Narrative & BUFS Statement Section */}
          <NarrativeSection 
            onOpenContact={() => setIsContactOpen(true)} 
            lang={lang}
          />

          {/* Full-width Workspace/Lab Visual Banner */}
          <FullWidthBanner lang={lang} />

          {/* Timeline & Recognitions (KICS, Hackathons, ByteDance) */}
          <TimelineSection lang={lang} />

          {/* Technical Stack & Activities (IDA, GDB, CTF, Linux, etc) */}
          <TechStackSection lang={lang} />
        </main>

        {/* Dark Theme Footer with "Get in touch" */}
        <FooterSection 
          onOpenContact={() => setIsContactOpen(true)} 
          lang={lang}
        />

        {/* Interactive Natural Language Contact Drawer */}
        <ContactDrawer
          isOpen={isContactOpen}
          onClose={() => setIsContactOpen(false)}
          lang={lang}
        />

        {/* Project Detail Modal */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onOpenContact={() => setIsContactOpen(true)}
          lang={lang}
        />
      </div>
    </SiteTransitionProvider>
  );
}
