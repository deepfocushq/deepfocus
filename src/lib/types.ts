export interface Project {
  id: string;
  category: string;
  title: string;
  description: string;
  thumbnail: string;
}

export interface FrameImage {
  id: string;
  url: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  checklist: string[];
}

export interface ProcessStep {
  id: string;
  title: string;
  description: string;
}

export interface HighlightItem {
  id: string;
  label: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  title: string;
}

export interface SocialLink {
  id: string;
  label: string;
  url: string;
}

export interface SiteContent {
  brand: {
    name: string;
    tagline: string;
  };
  nav: {
    hireMeLabel: string;
  };
  hero: {
    titleLine1: string;
    titleLine2: string;
    highlightWord: string;
  };
  selectedWork: {
    eyebrow: string;
    heading: string;
    subheading: string;
  };
  projects: Project[];
  frameWall: {
    eyebrow: string;
    heading: string;
  };
  frameImages: FrameImage[];
  about: {
    eyebrow: string;
    text: string;
  };
  tools: string[];
  services: {
    eyebrow: string;
    heading: string;
    subheading: string;
  };
  serviceItems: ServiceItem[];
  process: {
    eyebrow: string;
    heading: string;
    subheading: string;
  };
  processSteps: ProcessStep[];
  whyMe: {
    eyebrow: string;
    heading: string;
  };
  highlights: HighlightItem[];
  testimonials: {
    eyebrow: string;
    heading: string;
  };
  testimonialItems: Testimonial[];
  contact: {
    eyebrow: string;
    heading: string;
    email: string;
  };
  socialLinks: SocialLink[];
  footer: {
    tagline: string;
    copyrightName: string;
  };
}
