export type WorkItem = {
  id: number;
  title: string;
  description: string;
  blog: string[];
  details: string[];
  date: string;
  author: string;
  image: string;
  github: string;
};

export const WORK_DATA: WorkItem[] = [
  {
    id: 1,
    title: "Modern Landing Page Design",
    description: "High conversion SaaS landing page UI system...",
    blog: ["Conversion UX", "Typography", "Flow"],
    details: ["UI System", "UX Flow", "Conversion Design"],
    date: "21 Jan 2026",
    author: "Sai",
    image: "https://images.pexels.com/photos/35362087/pexels-photo-35362087.jpeg",
    github: "#",
  },
  {
    id: 2,
    title: "E-commerce UI Concept",
    description: "Modern e-commerce interface...",
    blog: ["Fast browsing", "Navigation", "Checkout flow"],
    details: ["E-commerce UI", "UX Design"],
    date: "10 Feb 2026",
    author: "Sai",
    image: "https://images.pexels.com/photos/2371936/pexels-photo-2371936.jpeg",
    github: "#",
  },
  {
    id: 3,
    title: "Mobile Banking App UI",
    description: "Secure banking interface...",
    blog: ["Security UX", "Speed", "Trust"],
    details: ["Banking UI", "Security UX"],
    date: "02 Mar 2026",
    author: "Sai",
    image: "https://images.pexels.com/photos/259027/pexels-photo-259027.jpeg",
    github: "#",
  },
  {
    id: 4,
    title: "AI Analytics Dashboard",
    description: "AI dashboard for real-time analytics...",
    blog: ["KPI", "Data Viz", "Insights"],
    details: ["AI Dashboard", "Analytics"],
    date: "15 Mar 2026",
    author: "Sai",
    image: "https://images.pexels.com/photos/669610/pexels-photo-669610.jpeg",
    github: "#",
  },
  {
    id: 5,
    title: "AI Dashboard Pro",
    description: "Advanced analytics system...",
    blog: ["Realtime data", "Visualization", "Speed"],
    details: ["AI", "Dashboard"],
    date: "18 Mar 2026",
    author: "Sai",
    image: "https://images.pexels.com/photos/669610/pexels-photo-669610.jpeg",
    github: "#",
  },
];
