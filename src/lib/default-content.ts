import type { SiteContent } from "./types";

export const defaultContent: SiteContent = {
  brand: {
    name: "Your Name",
    tagline: "Designer & Developer",
    logoUrl: "",
    faviconUrl: "",
  },
  nav: {
    hireMeLabel: "Hire me",
  },
  hero: {
    titleLine1: "Work that's built",
    titleLine2: "to get noticed",
    highlightWord: "noticed",
    imageLeft: "",
    imageRight: "",
    backgroundImage: "",
  },
  selectedWork: {
    eyebrow: "Selected work",
    heading: "Recent projects worth a second look.",
    subheading: "Open a tile to see the details, or jump into the full case study.",
  },
  projectGroups: [
    {
      id: "g1",
      name: "Fashion & Beauty",
      projects: [
        {
          id: "p1",
          title: "Your first project",
          description: "A short description of the problem, your approach, and the outcome.",
          thumbnail: "",
          videoUrl: "",
        },
        {
          id: "p2",
          title: "Your second project",
          description: "Swap this out with a real project title and a one-line summary.",
          thumbnail: "",
          videoUrl: "",
        },
      ],
    },
    {
      id: "g2",
      name: "Tech / SaaS / Apps",
      projects: [
        {
          id: "p3",
          title: "Your third project",
          description: "Keep descriptions short — the detail lives in the full case page.",
          thumbnail: "",
          videoUrl: "",
        },
      ],
    },
    {
      id: "g3",
      name: "Documentary / Storytelling",
      projects: [
        {
          id: "p4",
          title: "Your fourth project",
          description: "A short description of the problem, your approach, and the outcome.",
          thumbnail: "",
          videoUrl: "",
        },
      ],
    },
    {
      id: "g4",
      name: "E-commerce / Retail / Commercial",
      projects: [
        {
          id: "p5",
          title: "Your fifth project",
          description: "A short description of the problem, your approach, and the outcome.",
          thumbnail: "",
          videoUrl: "",
        },
      ],
    },
  ],
  frameWall: {
    eyebrow: "Gallery",
    heading: "A closer look at the work.",
  },
  frameImages: [
    { id: "f1", url: "" },
    { id: "f2", url: "" },
    { id: "f3", url: "" },
    { id: "f4", url: "" },
  ],
  about: {
    eyebrow: "About",
    text: "Write a couple of sentences about who you are, what you specialize in, and the kind of work you like to take on.",
  },
  tools: ["Figma", "Framer", "After Effects", "Webflow"],
  services: {
    eyebrow: "Services",
    heading: "How I can help.",
    subheading: "A short list of the services you offer, with a few specifics under each.",
  },
  serviceItems: [
    {
      id: "s1",
      title: "Service one",
      description: "A short description of this service.",
      checklist: ["Detail one", "Detail two", "Detail three"],
    },
    {
      id: "s2",
      title: "Service two",
      description: "A short description of this service.",
      checklist: ["Detail one", "Detail two", "Detail three"],
    },
  ],
  process: {
    eyebrow: "Process",
    heading: "A clear path from idea to delivery.",
    subheading: "Outline the steps you take with every client or project.",
  },
  processSteps: [
    { id: "st1", title: "Discovery", description: "Understand the goal before anything is built." },
    { id: "st2", title: "Direction", description: "Define the approach, references, and scope." },
    { id: "st3", title: "Build", description: "Do the work — design, development, iteration." },
    { id: "st4", title: "Review", description: "Collect feedback and refine." },
    { id: "st5", title: "Delivery", description: "Ship the final, launch-ready result." },
  ],
  whyMe: {
    eyebrow: "Why work with me",
    heading: "What it looks like to work together.",
  },
  highlights: [
    { id: "h1", label: "Clear communication" },
    { id: "h2", label: "Fast turnaround" },
    { id: "h3", label: "Careful craft" },
  ],
  testimonials: {
    eyebrow: "Testimonials",
    heading: "Trusted by people you'd recognize.",
  },
  testimonialItems: [
    {
      id: "t1",
      quote: "Add a short quote from a client or collaborator here.",
      name: "Client name",
      title: "Role, Company",
    },
  ],
  contact: {
    eyebrow: "Contact",
    heading: "Let's build something worth talking about.",
    email: "you@example.com",
  },
  socialLinks: [
    { id: "sl1", label: "X / Twitter", url: "https://x.com" },
    { id: "sl2", label: "Instagram", url: "https://instagram.com" },
  ],
  footer: {
    tagline: "Designer & developer building things worth noticing.",
    copyrightName: "Your Name",
  },
};
