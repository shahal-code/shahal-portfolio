import {
  Code,
  Palette,
  Sparkles,
  Mail,
  MapPin,
  Phone,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  ExternalLink,
  Layout,
  Database,
  Server,
  Zap,
  Cpu,
  Monitor,
  Globe,
  Lock,
  Repeat,
  Video,
  Terminal,
} from "lucide-react";

export const PERSONAL_DETAILS = {
  name: "Muhammed Shahal",
  role: "MERN Stack Developer & Tech Enthusiast",
  bio: "Currently immersed in an intensive, hands-on MERN Stack development program at BROTOTYPE, mastering full-stack technologies through practical projects.",
  about: {
    heading: "Building the Future",
    headingAccent: "with Clean Code",
    description: "I’m Shahal, a MERN stack developer focused on building modern, responsive web applications. I specialize in creating scalable, user-friendly solutions with clean code and thoughtful design, aiming to deliver impactful digital experiences.",
    summary: "Currently immersed in an intensive, hands-on MERN Stack development program at BROTOTYPE, mastering full-stack technologies through practical projects and collaborative learning."
  },
  experience: {
    miniProjects: "9+"
  }
};

export const CONTACT_INFO = {
  email: "gmrshahl@gmail.com",
  phone: "+917510107241",
  location: "Kerala, India",
  social: [
    { name: "GitHub", url: "https://github.com/shahal-gitei", icon: Github },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/muhammed-shahal-059bb7348?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", icon: Linkedin },
    { name: "Twitter", url: "https://x.com/HeyyShahl_", icon: Twitter },
    { name: "Instagram", url: "https://www.instagram.com/sh_ahl__?igsh=MXRyZm01dWMyYXo1ZQ==", icon: Instagram }
  ]
};

export const HIGHLIGHTS = [
  {
    icon: Code,
    title: "Development",
    description: "Mastering the MERN stack to build robust, scalable applications. Focused on clean architecture and performance."
  },
  {
    icon: Sparkles,
    title: "Growth",
    description: "Continuously learning and experimenting with emerging technologies to stay ahead in the MERN ecosystem."
  }
];

// SVG Logos for Skills
const BrandLogos = {
  HTML: () => <svg viewBox="0 0 24 24" className="w-full h-full fill-[#E34F26]"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L11.979 19l5.357-1.471.66-7.779H8.531z" /></svg>,
  CSS: () => <svg viewBox="0 0 24 24" className="w-full h-full fill-[#1572B6]"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L11.979 19l5.357-1.471.66-7.779H8.531z" style={{ transform: "scale(-1,1) translate(-24px,0)" }} /></svg>,
  JS: () => <svg viewBox="0 0 24 24" className="w-full h-full fill-[#F7DF1E]"><path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.105-.705 0-.525.21-.915 1.246-.915.99 0 1.245.585 1.35 1.545h2.325c-.135-1.965-1.29-3.405-3.645-3.405-2.505 0-3.6 1.5-3.6 3.06 0 1.335.825 2.49 2.1 3.06l1.32.555c1.23.51 1.44.81 1.44 1.35 0 .585-.435 1.095-1.395 1.095-.84 0-1.44-.3-1.635-1.545h-2.355c.165 2.49 1.515 3.39 3.93 3.39 2.505 0 3.735-1.02 3.735-3.045zM12.403 21.54c1.11-.465 1.11-.465 1.11-.465s.015-6.855.015-9.285H11.1v6.84c0 1.5-.045 1.845-.75 1.845-.375 0-.585-.165-.675-.405-.225-.495-.21-1.89-.21-1.89h-2.31s-.015 2.475.015 3.63c.045 1.29.555 1.635 1.635 1.635 1.38-.005 1.95-.315 2.603-2.4l-.015.54z" /></svg>,
  Node: () => <svg viewBox="0 0 24 24" className="w-full h-full fill-[#339933]"><path d="M11.964.062c-.225 0-.448.065-.644.186L1.137 6.13a1.127 1.127 0 00-.57 1.012l.067 11.838a1.13 1.13 0 00.512.915l10.183 6.012c.196.12.419.186.644.186l.001.011c.225 0 .448-.065.644-.186l10.183-6.012a1.13 1.13 0 00.512-.915l.067-11.838a1.127 1.127 0 00-.57-1.012L12.609.248a1.131 1.131 0 00-.645-.186zm-.056 3.426l8.156 4.706V16.82s-1.838.995-3.41 1.972l-4.746 2.733V8.194zm-.105.06l-4.746 2.733v5.474l4.746-2.733V3.548z" /></svg>,
  Express: () => <svg viewBox="0 0 24 24" className="w-full h-full fill-[#828282]"><path d="M24 16.704c0-.361-.432-.731-1.08-.731h-1.655v2.33s.36 0 1.034.024c.73-.024 1.344-.456 1.344-1.284.024-.265-.121-.337-.358-.337l.715-.002zm-3.072-3.132l-.001 2.05s.264-.029.696-.029c.648 0 1.152.289 1.152 1.056s-.456 1.031-1.08 1.031h-1.503v2.857h-.72V11.231h3.763c.671-.061 1.391.309 1.391 1.488s-.863 1.258-1.558 1.27c.911.025 1.87 0 1.87 1.417s-1.127 1.8-2.327 1.8h-1.428v1.36h-.72V17.3c.6-.048 1.248.168 1.248-1.008s-.648-.961-1.248-.961h-1.008v-1.751h3.58zM4.192 11.231h.713s2.179 3.161 3.256 4.672c.983-1.44 2.92-4.144 3.232-4.672h.71l-3.352 4.649 3.655 5.536H11.7l-3.528-5.32c-.933 1.344-4.223 6.012-4.223 6.012H3.21s2.835-4.04 4.29-6z" /></svg>,
  MongoDB: () => <svg viewBox="0 0 24 24" className="w-full h-full fill-[#47A248]"><path d="M17.193 9.555c-.171-3.69-2.316-6.6-4.205-8.835l-.178-.22-.178.22C10.74 2.955 8.596 5.865 8.425 9.555c-.066 1.41.22 2.82.782 4.1.562 1.28 1.405 2.15 2.5 2.65V24h.5v-7.695c1.095-.5 1.938-1.37 2.5-2.65a10.957 10.957 0 00.781-4.1zm-4.498 5.76c-.031 0-.07 0-.101-.015a1.866 1.866 0 01-.849-.66c-.516-.765-.632-1.635-.616-2.58.055-1.47.453-2.835.941-4.08.484-1.245.973-2.4 1.176-3.72.074.855.26 1.695.547 2.49.28.81.652 1.575 1.09 2.295.441.72.95 1.38 1.503 1.98.555.6.938 1.44 1.121 2.37.062.33-.121.66-.453.72-.32.06-.64-.12-.7-.45a4.01 4.01 0 00-.916-1.95 11.336 11.336 0 01-1.218-1.605 15.341 15.341 0 01-.986-2.055 12.569 12.569 0 00-.518-1.05 13.916 13.916 0 00-.472 2.58c-.184 1.215-.653 2.28-1.122 3.42a12.187 12.187 0 00-.812 3.525c.039.3-.06.63-.3.84a.501.501 0 01-.303.105z" /></svg>,
  Bootstrap: () => <svg viewBox="0 0 24 24" className="w-full h-full fill-[#7952B3]"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm3.845 15.618c-.53.514-1.151.922-1.841 1.205-.7.289-1.423.441-2.155.453H6.885c-.438.041-.668-.229-.68-.805 0-.048.019-12.336.019-12.336h5.021c1.904 0 3.449.394 4.522 1.171 1.074.778 1.782 2.009 1.782 3.665.003.738-.145 1.471-.438 2.151a4.912 4.912 0 01-1.245 1.808 4.938 4.938 0 01-.02 2.688zm-1.89-6.384c.316-.234.474-.587.474-1.057 0-.469-.158-.815-.474-1.037-.315-.221-.808-.332-1.58-.332H7.974v2.426l1.821.01c.772 0 1.265-.117 1.58-.351h.58zm0 3.864c.366-.3.549-.755.549-1.366 0-.61-.183-1.058-.549-1.344-.366-.285-.938-.428-1.834-.428h-2.844v2.883h2.844c.896 0 1.468-.151 1.834-.451l-.01.006z" /></svg>,
  VSCode: () => <svg viewBox="0 0 24 24" className="w-full h-full fill-[#007ACC]"><path d="M23.15 2.58l-2.85-2.15a1.59 1.59 0 00-1.06-.43 1.5 1.5 0 00-1 .39l-11 8.56L3.9 6.27l-2.22 1a1.28 1.28 0 00-.18 2.16L4.07 12l-2.57 2.57a1.28 1.28 0 00.18 2.16l2.22 1 3.34-2.68 11 8.56a1.5 1.5 0 001 .39 1.59 1.59 0 001.06-.43l2.85-2.15a1.59 1.59 0 00.58-1.19V3.77a1.59 1.59 0 00-.58-1.19zM18 19.31l-9-7L18 5.31v14z" /></svg>,
  Git: () => <svg viewBox="0 0 24 24" className="w-full h-full fill-[#F05032]"><path d="M23.546 10.93L13.067.452a1.492 1.492 0 00-2.108 0l-1.928 1.928 3.523 3.523a1.493 1.493 0 002.108 2.108l3.523 3.523a1.493 1.493 0 00-2.108 2.108L14.73 12.3l-1.928 1.928a1.493 1.493 0 002.108 2.108l8.636-8.636a1.492 1.492 0 000-2.108zM10.93.452a1.492 1.492 0 00-2.108 0L.452 8.82c-.58.581-.58 1.527 0 2.108l10.478 10.479c.582.58 1.528.58 2.108 0l1.928-1.928-3.523-3.523a1.493 1.493 0 00-2.108-2.108L5.73 15.3l-1.928-1.928a1.493 1.493 0 002.108-2.108L9.73 12.3 8.36 10.93a1.492 1.492 0 000-2.108L10.93.452z" /></svg>,
  C: () => <svg viewBox="0 0 24 24" className="w-full h-full fill-[#A8B9CC]"><path d="M20.67 4.29c-1.89-2-4.54-3.29-7.5-3.29C6.41 1 1 6.41 1 13.17h2.5c0-5.34 4.33-9.67 9.67-9.67 2.36 0 4.54 1 6.13 2.72l1.37-1.93zM13.17 23c2.96 0 5.61-1.29 7.5-3.29l-1.37-1.93c-1.59 1.72-3.77 2.72-6.13 2.72-5.34 0-9.67-4.33-9.67-9.67h-2.5C1 19.59 6.41 25 13.17 25z" /></svg>,
  Figma: () => <svg viewBox="0 0 24 24" className="w-full h-full fill-[#F24E1E]"><path d="M12 0h-4c-2.21 0-4 1.79-4 4s1.79 4 4 4h4c2.21 0 4-1.79 4-4s-1.79-4-4-4zM8 8c-2.21 0-4 1.79-4 4s1.79 4 4 4h4V8H8zM16 12c0 2.21-1.79 4-4 4h-4c0 2.21 1.79 4 4 4s4-1.79 4-4v-4zM20 4c0 2.21-1.79 4-4 4v-4c0-2.21 1.79-4 4-4s4 1.79 4 4zM16 8h4c2.21 0 4 1.79 4 4s-1.79 4-4 4h-4V8z" /></svg>,
  Tailwind: () => <svg viewBox="0 0 24 24" className="w-full h-full fill-[#06B6D4]"><path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.818 9.027 19 12.001 19c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" /></svg>,
  GitHub: () => <svg viewBox="0 0 24 24" className="w-full h-full fill-[#181717]"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>,
  React: () => <svg viewBox="-11.5 -10.232 23 20.463" className="w-full h-full fill-[#61DAFB]"><circle cx="0" cy="0" r="2.05" /><g fill="none" stroke="#61DAFB" strokeWidth="1"><ellipse rx="11" ry="4.2" /><ellipse rx="11" ry="4.2" transform="rotate(60)" /><ellipse rx="11" ry="4.2" transform="rotate(120)" /></g></svg>,
  NoSQL: () => <svg viewBox="0 0 24 24" className="w-full h-full fill-[#47A248]"><path d="M21 16.5c0 .38-.21.71-.53.88l-7.97 4.43c-.31.17-.69.17-1 0L3.53 17.38c-.32-.17-.53-.5-.53-.88V7.5c0-.38.21-.71.53-.88l7.97-4.43c.31-.17.69-.17 1 0l7.97 4.43c.32.17.53.5.53.88v9z" /></svg>,
  VideoEditing: () => <svg viewBox="0 0 24 24" className="w-full h-full fill-[#FF0000]"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>,
  Linux: () => <svg viewBox="0 0 24 24" className="w-full h-full fill-[#fbc02d]"><path d="M12.013 0a8.03 8.03 0 0 0-7.234 4.542c-.22.443-.1 1.01.277 1.341 1.013.882 1.487 1.83 1.487 2.951 0 1.135-.506 2.454-1.506 3.328a.747.747 0 0 0-.019.016l-3.23 2.766A1.002 1.002 0 0 0 2.5 17h19.013a.998.998 0 0 0 .717-1.696l-3.23-3.056a.742.742 0 0 0-.019-.016c-1-.874-1.506-2.193-1.506-3.328 0-1.121.474-2.069 1.487-2.951.378-.33.497-.898.277-1.341A8.03 8.03 0 0 0 12.013 0zM12 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" /></svg>,
  Lightroom: () => <svg viewBox="0 0 24 24" className="w-full h-full fill-[#31A8FF]"><rect width="24" height="24" rx="4" /><text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold" fontFamily="Arial">Lr</text></svg>
};

export const SKILLS = [
  { name: "HTML", icon: BrandLogos.HTML, category: "Frontend" },
  { name: "CSS", icon: BrandLogos.CSS, category: "Frontend" },
  { name: "JavaScript", icon: BrandLogos.JS, category: "Frontend" },
  { name: "Node.js", icon: BrandLogos.Node, category: "Backend" },
  { name: "Express", icon: BrandLogos.Express, category: "Backend" },
  { name: "MongoDB", icon: BrandLogos.MongoDB, category: "Database" },
  { name: "Bootstrap", icon: BrandLogos.Bootstrap, category: "Styling" },
  { name: "VS Code", icon: BrandLogos.VSCode, category: "Tools" },
  { name: "Git", icon: BrandLogos.Git, category: "Tools" },
  { name: "C", icon: BrandLogos.C, category: "Backend" },
  { name: "Figma", icon: BrandLogos.Figma, category: "Design" },
  { name: "Tailwind", icon: BrandLogos.Tailwind, category: "Styling" },
  { name: "GitHub", icon: BrandLogos.GitHub, category: "Tools" },
  { name: "NoSQL", icon: BrandLogos.NoSQL, category: "Database" },
  { name: "Video Editing", icon: BrandLogos.VideoEditing, category: "Design" },
  { name: "React", icon: BrandLogos.React, category: "Frontend" },
  { name: "Linux", icon: BrandLogos.Linux, category: "Tools" },
  { name: "Lightroom", icon: BrandLogos.Lightroom, category: "Design" },
];

export const TOOLS = ["VS Code", "Git", "NoSql", "Cursor", "Figma", "MongoDB", "GitHub"];

export const EDUCATION = [
  {
    title: "Higher Secondary Education (Humanities)",
    institution: "GVHSS Chettiyankinar, Malappuram",
    period: "2023 - 2025",
    description: "In Class 12, I pursued Humanities, though it wasn’t my area of interest. However, this journey taught me adaptability and broadened my perspective. While my true passion lies in technology and creativity, this experience strengthened my resilience and focus, helping me redirect my path toward becoming a MERN Stack Developer and Tech Enthusiast.",
  },
  {
    title: "High School Education",
    institution: "KHMHSS Valakkulam Pookiparamb",
    period: "2022 - 2023",
    description: "My Class 10 year was crucial for building a strong academic foundation and developing essential study habits. It sharpened my problem-solving skills and taught me the importance of discipline and time management. This period prepared me well for higher studies and continuous learning."
  }
];

export const EXPERIENCE_LIST = [
  {
    title: "Student at BROTOTYPE",
    company: "Brototype, Calicut",
    period: "Present",
    points: [
      "Acquired foundational proficiency in programming concepts through hands-on learning in C, Java, and JavaScript.",
      "Mastered essential front-end technologies including HTML, CSS, Bootstrap, and JavaScript.",
      "Developed robust problem-solving methodologies through numerous coding challenges.",
      "Improved communication skills in a technical environment through active collaboration."
    ]
  },
  {
    title: "Tech Enthusiast",
    company: "Freelance / Projects",
    period: "Present",
    description: "I specialize in crafting engaging and professional visuals with smooth transitions, clean cuts, effects, and sound design. Over time, I’ve worked on projects ranging from social media content to brand videos, gaining the skills to balance creativity with technical precision."
  }
];

export const SERVICES = [
  {
    title: "Frontend Development",
    description: "Crafting beautiful and responsive user interfaces using HTML, CSS, Bootstrap, and React focusing on modern web standards.",
    icon: Layout,
    color: "hsl(var(--primary))",
  },
  {
    title: "Backend Development",
    description: "Building server-side logic and managing databases with Node.js, Express, and MongoDB to create functional applications.",
    icon: Server,
    color: "#10b981", // Emerald
  },
  {
    title: "Video Editing",
    description: "Creating engaging visual content with smooth transitions and clean cuts for social media and personal branding.",
    icon: Video,
    color: "#f59e0b", // Amber
  },
  {
    title: "MERN Stack Learning",
    description: "Successfully building full-stack applications as part of an intensive training program, mastering end-to-end development.",
    icon: Code,
    color: "#3b82f6", // Blue
  },
];

export const PROJECTS = [
  {
    title: "Weather Checker",
    description: "A real-time weather application that delivers precise atmospheric data and forecasts with a focus on ease of use and visual clarity.",
    tags: ["JavaScript", "API Integration", "HTML", "CSS"],
    image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&auto=format&fit=crop&q=60",
    github: "https://github.com/shahal-gitei/wetherChecker",
    demo: "https://shahal-gitei.github.io/wetherChecker/"
  },
  {
    title: "Simple Calculator",
    description: "A sleek and responsive calculator application with a focus on smooth interactions and clean mathematical logic.",
    tags: ["JavaScript", "HTML", "CSS", "UI/UX"],
    image: "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=800&auto=format&fit=crop&q=60",
    github: "https://github.com/shahal-gitei/Simple-Calculator",
    demo: "https://shahal-gitei.github.io/Calculator-App/"
  },
  {
    title: "Minimalist Todo App",
    description: "A clean and intuitive task management application designed for productivity with a streamlined user interface and local storage persistence.",
    tags: ["JavaScript", "HTML", "CSS", "Responsive"],
    image: "https://images.unsplash.com/photo-1540350394557-8d14678e7f91?w=800&auto=format&fit=crop&q=60",
    github: "https://github.com/shahal-gitei/Todo-App",
    demo: "https://shahal-gitei.github.io/Todo-App/"
  },
  {
    title: "Premium Cars Showcase",
    description: "A high-end automotive showcase website featuring a selection of luxury vehicles with a clean, modern aesthetic.",
    tags: ["HTML", "CSS", "UI/UX", "Responsible Design"],
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=60",
    github: "https://github.com/shahal-gitei/premium-cars",
    demo: "https://shahal-gitei.github.io/premium-cars/"
  },
  {
    title: "Login Session Management",
    description: "A secure login system featuring robust session management, developed to explore Node.js backend architecture and user authentication flows.",
    tags: ["Node.js", "Express", "EJS", "Authentication"],
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&auto=format&fit=crop&q=60",
    github: "https://github.com/shahal-gitei/login-session",
    demo: "#"
  },
  {
    title: "User Management System",
    description: "A robust administrative dashboard for managing user records, featuring secure data handling and an intuitive management interface.",
    tags: ["Node.js", "Express", "MongoDB", "Admin Panel"],
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&auto=format&fit=crop&q=60",
    github: "https://github.com/shahal-gitei/UserManagment-Project",
    demo: "#"
  }
];
