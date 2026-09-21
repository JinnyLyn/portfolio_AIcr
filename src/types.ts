export interface ProjectItem {
  id: string;
  title: string;
  titleEn?: string;
  subtitle: string;
  subtitleEn?: string;
  period: string;
  periodEn?: string;
  role: string;
  roleEn?: string;
  description: string;
  descriptionEn?: string;
  highlights: string[];
  highlightsEn?: string[];
  tags: string[];
  tagsEn?: string[];
  category: 'research' | 'project' | 'security' | 'leadership';
  image?: string;
  gradient?: string;
  externalLink?: string;
  stats?: { label: string; value: string; labelEn?: string; valueEn?: string }[];
}

export interface TimelineItem {
  id: string;
  title: string;
  titleEn?: string;
  subtitle?: string;
  subtitleEn?: string;
  year: string;
  category: string;
  categoryEn?: string;
  details?: string;
  detailsEn?: string;
}

export interface SkillCategory {
  category: string;
  categoryEn: string;
  skills: string[];
  skillsEn?: string[];
  description: string;
  descriptionEn?: string;
  iconName: string;
}

export interface ProfileData {
  nameKo: string;
  nameEn: string;
  targetRole: string;
  targetRoleEn: string;
  email: string;
  phone: string;
  github: string;
  affiliation: string;
  affiliationEn: string;
  summary: string[];
  education: {
    school: string;
    major: string;
    status: string;
    location: string;
  };
  experience: {
    company: string;
    team: string;
    role: string;
    period: string;
    duration: string;
    highlights: string[];
  }[];
  research: {
    title: string;
    titleEn?: string;
    authors?: string;
    venue: string;
    venueDetail?: string;
    status: string;
    followUpStudies?: string[];
    highlights: string[];
  };
  activities: {
    title: string;
    titleEn?: string;
    description: string;
    descriptionEn?: string;
    tags: string[];
    tagsEn?: string[];
  }[];
}
