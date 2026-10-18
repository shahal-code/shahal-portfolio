import {
  Code,
  Palette,
  Sparkles,
  Mail,
  MapPin,
  Phone,
  Github,
  Linkedin,
  MessageCircle,
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
  Terminal,
} from "lucide-react";

export const PERSONAL_DETAILS = {
  name: "Muhammed Shahal",
  role: "Software Engineer",
  bio: "Software Engineer focused on engineering scalable, high-performance web systems, distributed architectures, and modern digital applications.",
  about: {
    heading: "Building the Future",
    headingAccent: "with Clean Code",
    description: "I’m Shahal, a Software Engineer focused on building modern, high-performance web applications. I specialize in creating scalable, user-friendly solutions with clean architecture and thoughtful design, delivering impactful digital experiences.",
    summary: "Passionate Software Engineer experienced in building full-stack applications, real-time distributed systems, and modern web architectures through hands-on engineering."
  },
  experience: {
    miniProjects: "9+"
  }
};

export const CONTACT_INFO = {
  email: "shahalwork14@gmail.com",
  phone: "+919048867241",
  location: "Kerala, India",
  social: [
    { name: "GitHub", url: "https://github.com/shahal-code", icon: Github },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/muhammed-shahal-059bb7348?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", icon: Linkedin },
    { name: "WhatsApp", url: "https://wa.me/919048867241", icon: MessageCircle },
    { name: "Instagram", url: "https://www.instagram.com/sh_ahl__?igsh=MXRyZm01dWMyYXo1ZQ==", icon: Instagram }
  ]
};

export const HIGHLIGHTS = [
  {
    icon: Code,
    title: "Development",
    description: "Engineering scalable, high-performance web applications and distributed systems with clean architecture."
  },
  {
    icon: Sparkles,
    title: "Growth",
    description: "Continuously experimenting with modern technologies, cloud systems, and high-efficiency architectures."
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
  TypeScript: () => <svg viewBox="0 0 24 24" className="w-full h-full fill-[#3178C6]"><path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.105-.705 0-.525.21-.915 1.246-.915.99 0 1.245.585 1.35 1.545h2.325c-.135-1.965-1.29-3.405-3.645-3.405-2.505 0-3.6 1.5-3.6 3.06 0 1.335.825 2.49 2.1 3.06l1.32.555c1.23.51 1.44.81 1.44 1.35 0 .585-.435 1.095-1.395 1.095-.84 0-1.44-.3-1.635-1.545h-2.355c.165 2.49 1.515 3.39 3.93 3.39 2.505 0 3.735-1.02 3.735-3.045zM12.403 21.54c1.11-.465 1.11-.465 1.11-.465s.015-6.855.015-9.285H11.1v6.84c0 1.5-.045 1.845-.75 1.845-.375 0-.585-.165-.675-.405-.225-.495-.21-1.89-.21-1.89h-2.31s-.015 2.475.015 3.63c.045 1.29.555 1.635 1.635 1.635 1.38-.005 1.95-.315 2.603-2.4l-.015.54z" /></svg>,
  Flutter: () => <svg viewBox="0 0 24 24" className="w-full h-full fill-[#02569B]"><path d="M14.314 0L2.3 12l4.674 4.657L21.3 4.657 14.314 0zm.011 10.157l-4.663 4.639 7.001 6.98L24 14.819l-9.675-4.662z" /></svg>,
  AWS: () => <svg viewBox="0 0 24 24" className="w-full h-full fill-[#232F3E]"><path d="M12 0L2.5 5v14L12 24l9.5-5V5L12 0zm0 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" /></svg>,
  Firebase: () => <svg viewBox="0 0 24 24" className="w-full h-full fill-[#FFCA28]"><path d="M3.89 15.672L6.255 1.46c.086-.52.78-.638 1.033-.176l2.54 4.757 1.014-1.93c.212-.405.796-.405 1.008 0l8.26 15.705L3.89 15.672z" /><path fill="#FFA000" d="M3.89 15.672l5.94-9.631 2.975 5.57-8.915 4.061z" /><path fill="#F57F17" d="M20.11 19.816L12.805 11.61 3.89 15.672l4.934 7.032c.286.408.862.508 1.275.222l10.011-3.11z" /></svg>,
  Nextjs: () => <svg viewBox="0 0 24 24" className="w-full h-full fill-[#000000] dark:fill-[#ffffff]"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.862 18.95l-5.005-7.007h-.001l-.001 7.007h-1.002V8.002h1.002l5.005 7.007h.001l.001-7.007h1.002v10.948z" /></svg>,
  Nestjs: () => <svg viewBox="0 0 24 24" className="w-full h-full fill-[#E0234E]"><path d="M20.785 1.57a.972.972 0 0 0-.964.133l-5.748 4.218a.973.973 0 0 0-.363.633l-.707 4.093-2.148-1.577a.97.97 0 0 0-.965-.133l-5.748 4.218a.973.973 0 0 0-.363.633L2.57 22.025a.974.974 0 0 0 1.258 1.077l6.634-2.222a.973.973 0 0 0 .61-.595l1.455-4.423 2.148 1.577a.97.97 0 0 0 .965.133l5.748-4.218a.973.973 0 0 0 .363-.633l1.218-8.239a.974.974 0 0 0-1.185-1.09z" /></svg>,
  Redux: () => <svg viewBox="0 0 24 24" className="w-full h-full fill-[#764ABC]"><path d="M16.5 12c0 1.93-1.57 3.5-3.5 3.5S9.5 13.93 9.5 12s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5zm6.54 1.72c-.44 2.87-2.3 5.17-4.88 6.13-2.58.96-5.5.47-7.61-1.28l1.32-1.59c1.55 1.28 3.69 1.64 5.58.94 1.89-.7 3.25-2.38 3.57-4.48.33-2.1-.42-4.18-1.95-5.46-1.54-1.28-3.67-1.63-5.56-.93-1.89.7-3.25 2.38-3.57 4.48-.12.78-.07 1.56.14 2.3l-2.02.48c-.28-1-.34-2.05-.18-3.08.44-2.87 2.3-5.17 4.88-6.13 2.58-.96 5.5-.47 7.61 1.28 2.11 1.75 3.14 4.59 2.7 7.42zM7.5 12c0-1.93 1.57-3.5 3.5-3.5s3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5S7.5 13.93 7.5 12zm-6.54-1.72c.44-2.87 2.3-5.17 4.88-6.13 2.58-.96 5.5-.47 7.61 1.28L12.13 7.02C10.58 5.74 8.44 5.38 6.55 6.08c-1.89.7-3.25 2.38-3.57 4.48-.33 2.1.42 4.18 1.95 5.46 1.54 1.28 3.67 1.63 5.56.93 1.89-.7 3.25-2.38 3.57-4.48.12-.78.07-1.56-.14-2.3l2.02-.48c.28 1 .34 2.05.18 3.08-.44 2.87-2.3 5.17-4.88 6.13-2.58.96-5.5.47-7.61-1.28-2.11-1.75-3.14-4.59-2.7-7.42z" /></svg>,
  Zustand: () => <svg viewBox="0 0 24 24" className="w-full h-full fill-[#443E38] dark:fill-[#E67E22]"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" /></svg>,
  ReactQuery: () => <svg viewBox="0 0 24 24" className="w-full h-full fill-[#FF4154]"><circle cx="12" cy="12" r="10" stroke="#FF4154" strokeWidth="2" fill="none" /><circle cx="12" cy="12" r="4" fill="#FF4154" /><circle cx="17" cy="8" r="2" fill="#FFD000" /></svg>,
  FramerMotion: () => <svg viewBox="0 0 24 24" className="w-full h-full fill-[#0055FF]"><path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" /></svg>,
  Sass: () => <svg viewBox="0 0 24 24" className="w-full h-full fill-[#CC6699]"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-1.8 17.4c-2.4 0-4.2-1.8-4.2-4.2s1.8-4.2 4.2-4.2c1.5 0 2.8.8 3.5 2l-1.6 1c-.4-.7-1.1-1.2-1.9-1.2-1.3 0-2.3 1-2.3 2.4s1 2.4 2.3 2.4c.8 0 1.5-.5 1.9-1.2l1.6 1c-.7 1.2-2 2-3.5 2z" /></svg>,
  Socketio: () => <svg viewBox="0 0 24 24" className="w-full h-full fill-[#010101] dark:fill-white"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 3.6a8.4 8.4 0 1 1 0 16.8 8.4 8.4 0 0 1 0-16.8zm-1.8 3.6v9.6l6-4.8-6-4.8z" /></svg>,
  RestAPI: () => <svg viewBox="0 0 24 24" className="w-full h-full fill-[#00B4D8]"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" /></svg>,
  GraphQL: () => <svg viewBox="0 0 24 24" className="w-full h-full fill-[#E10098]"><path d="M12 0l10.392 6v12L12 24 1.608 18V6L12 0zm0 2.309L3.608 7.155v9.69L12 21.691l8.392-4.846v-9.69L12 2.309zM12 5a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm-6.062 3.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm12.124 0a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm-9.062 5.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm6 0a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" /></svg>,
  JWT: () => <svg viewBox="0 0 24 24" className="w-full h-full fill-[#D63AFF]"><path d="M12 1a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2h-1V6a5 5 0 0 0-5-5zm-3 5a3 3 0 0 1 6 0v3H9V6zm3 7a2 2 0 0 1 1 1.73V17a1 1 0 0 1-2 0v-2.27A2 2 0 0 1 12 13z" /></svg>,
  Prisma: () => <svg viewBox="0 0 24 24" className="w-full h-full fill-[#2D3748] dark:fill-[#5A67D8]"><path d="M22.046 17.525L13.155 1.082a1.324 1.324 0 00-2.31 0L1.954 17.525a1.324 1.324 0 001.155 1.947h17.782a1.324 1.324 0 001.155-1.947zm-9.046-13.08l6.837 12.628H8.163L13 4.445z" /></svg>,
  Mongoose: () => <svg viewBox="0 0 24 24" className="w-full h-full fill-[#880000]"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v-6h-2v6zm0-8h2V7h-2v2z" /></svg>,
  PostgreSQL: () => <svg viewBox="0 0 24 24" className="w-full h-full fill-[#4169E1]"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" /></svg>,
  MySQL: () => <svg viewBox="0 0 24 24" className="w-full h-full fill-[#00758F]"><path d="M12 0C5.373 0 0 1.79 0 4v16c0 2.21 5.373 4 12 4s12-1.79 12-4V4c0-2.21-5.373-4-12-4zm0 2c5.523 0 10 1.343 10 3s-4.477 3-10 3-10-1.343-10-3 4.477-3 10-3zm10 14c0 1.657-4.477 3-10 3s-10-1.343-10-3v-2.333c1.944 1.455 5.764 2.333 10 2.333s8.056-.878 10-2.333V16zm0-5c0 1.657-4.477 3-10 3s-10-1.343-10-3V8.667c1.944 1.455 5.764 2.333 10 2.333s8.056-.878 10-2.333V11z" /></svg>,
  Nginx: () => <svg viewBox="0 0 24 24" className="w-full h-full fill-[#009639]"><path d="M12 0L1.605 6v12L12 24l10.395-6V6L12 0zm-.714 6.771h1.428v4.929l4.572-4.929h2v10.457h-1.428v-4.928l-4.572 4.928h-2V6.771zM6.714 6.771h2.572l3.428 5.714V6.771h1.429v10.457h-2.572L8.143 11.514v5.714H6.714V6.771z" /></svg>,
  GitHubActions: () => <svg viewBox="0 0 24 24" className="w-full h-full fill-[#2088FF]"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" /></svg>,
  Vercel: () => <svg viewBox="0 0 24 24" className="w-full h-full fill-[#000000] dark:fill-[#ffffff]"><path d="M12 1L24 22H0L12 1z" /></svg>,
  Postman: () => <svg viewBox="0 0 24 24" className="w-full h-full fill-[#FF6C37]"><path d="M13.527.093c-.63.07-1.24.32-1.74.72l-9.8 7.84c-1.32 1.05-1.87 2.82-1.37 4.45.5 1.63 1.97 2.76 3.68 2.82l6.23.21-1.42 4.25c-.56 1.68-.08 3.53 1.21 4.73 1.29 1.2 3.19 1.54 4.84.87l10.4-4.22c1.47-.6 2.45-2.02 2.45-3.6V5.423c0-1.85-1.32-3.44-3.13-3.81L13.527.093zm.47 2.427l8.28 1.48c.84.15 1.45.88 1.45 1.74v12.74c0 .73-.45 1.39-1.13 1.66l-10.4 4.22c-.77.31-1.65.15-2.25-.41-.6-.56-.82-1.42-.56-2.2l1.9-5.71.74-2.21-2.33-.08-6.23-.21c-.8-.03-1.48-.55-1.72-1.31-.23-.76.03-1.59.65-2.08l9.8-7.84c.48-.38 1.09-.54 1.69-.47l.11.47z" /></svg>,
  NoSQL: () => <svg viewBox="0 0 24 24" className="w-full h-full fill-[#47A248]"><path d="M21 16.5c0 .38-.21.71-.53.88l-7.97 4.43c-.31.17-.69.17-1 0L3.53 17.38c-.32-.17-.53-.5-.53-.88V7.5c0-.38.21-.71.53-.88l7.97-4.43c.31-.17.69-.17 1 0l7.97 4.43c.32.17.53.5.53.88v9z" /></svg>,
  Cloudinary: () => <svg viewBox="0 0 24 24" className="w-full h-full fill-[#3448C5]"><path d="M12 0c6.627 0 12 5.373 12 12s-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0zm0 4.8a7.2 7.2 0 1 0 0 14.4 7.2 7.2 0 0 0 0-14.4z" /></svg>,
  Linux: () => <svg viewBox="0 0 24 24" className="w-full h-full fill-[#fbc02d]"><path d="M12.013 0a8.03 8.03 0 0 0-7.234 4.542c-.22.443-.1 1.01.277 1.341 1.013.882 1.487 1.83 1.487 2.951 0 1.135-.506 2.454-1.506 3.328a.747.747 0 0 0-.019.016l-3.23 2.766A1.002 1.002 0 0 0 2.5 17h19.013a.998.998 0 0 0 .717-1.696l-3.23-3.056a.742.742 0 0 0-.019-.016c-1-.874-1.506-2.193-1.506-3.328 0-1.121.474-2.069 1.487-2.951.378-.33.497-.898.277-1.341A8.03 8.03 0 0 0 12.013 0zM12 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" /></svg>,
  Lightroom: () => <svg viewBox="0 0 24 24" className="w-full h-full fill-[#31A8FF]"><rect width="24" height="24" rx="4" /><text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold" fontFamily="Arial">Lr</text></svg>,
  Redis: () => <svg viewBox="0 0 24 24" className="w-full h-full fill-[#DC382D]"><path d="M21.921 7.15c-1.89-1.282-4.526-1.528-6.195-1.528-1.503 0-2.613.31-2.909.403-.664-.476-1.745-1.077-3.415-1.077-1.127 0-2.22.257-3.04.597.433-.61.85-1.378 1.056-2.185.195-.764.128-1.428-.198-1.93-.326-.502-.858-.755-1.536-.755-.664 0-1.272.238-1.758.694-.783.743-1.096 2.016-.86 3.513.2 1.258.747 2.65 1.583 3.978-2.673.74-3.606 1.83-3.606 2.766 0 1.284 1.802 2.378 4.793 2.915 2.018 3.535 5.568 5.753 9.475 5.753 5.485 0 8.784-3.834 8.784-7.575 0-2.433-1.248-4.298-2.174-5.524zm-14.778 2.375c.995 0 2.228.32 3.197.834.69-.414 1.554-.775 2.505-.985-.75-.487-1.785-.888-2.964-.888-1.084 0-2.02.327-2.738.92-.001.037 0 .083 0 .119zm9.569 9.948c-3.14 0-6.042-1.706-7.854-4.506.744.114 1.543.176 2.37.176 1.254 0 2.45-.164 3.53-.464.717.387 1.584.598 2.553.598.665 0 1.283-.112 1.833-.314-1.284 2.825-3.18 4.51-2.432 4.51zm3.832-7.86c0 1.09-1.203 2.083-3.21 2.656-.255-.78-.716-1.516-1.39-2.066.864-.176 1.62-.43 2.193-.728.87-.457 1.22-.924 1.22-1.293 0-.62-1.034-1.428-2.885-1.922 1.488.58 2.433 1.34 2.433 2.023 0 .428-.435.918-1.246 1.385-.63.364-1.474.67-2.458.895-.884-1.12-2.176-1.854-3.705-2.072 1.475-.29 3.033-.424 4.55-.424 1.135 0 2.074.154 2.61.427 1.26.634 1.888 1.68 1.888 2.766v.053z" /></svg>,
  DevOps: () => <svg viewBox="0 0 24 24" className="w-full h-full fill-none stroke-[#2496ED]" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M7.5 7.5h9v9h-9z" /><path d="M7.5 12H3.75a2.25 2.25 0 0 1 0-4.5H6" /><path d="M16.5 12h3.75a2.25 2.25 0 0 1 0 4.5H18" /><path d="M12 7.5V4.25" /><path d="M12 16.5v3.25" /><path d="M9.75 10.25h4.5" /><path d="M9.75 13.75h4.5" /></svg>,
  AI: () => <svg viewBox="0 0 24 24" className="w-full h-full fill-[#10a37f]"><path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.38-1 1.72V7h1a7 7 0 0 1 7 7v1h.28a2 2 0 1 1 0 2H21v1a2 2 0 0 1-2 2h-1.28a2 2 0 1 1-3.44 0H9.72a2 2 0 1 1-3.44 0H5a2 2 0 0 1-2-2v-1h-.28a2 2 0 1 1 0-2H3v-1a7 7 0 0 1 7-7h1V5.72A2 2 0 0 1 10 4a2 2 0 0 1 2-2zm-4 9a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm8 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" /></svg>
};

export const SKILLS = [
  // Frontend Architecture
  { name: "React", icon: BrandLogos.React, category: "Frontend" },
  { name: "Next.js", icon: BrandLogos.Nextjs, category: "Frontend" },
  { name: "TypeScript", icon: BrandLogos.TypeScript, category: "Frontend" },
  { name: "JavaScript", icon: BrandLogos.JS, category: "Frontend" },
  { name: "Redux Toolkit", icon: BrandLogos.Redux, category: "Frontend" },
  { name: "Zustand", icon: BrandLogos.Zustand, category: "Frontend" },
  { name: "React Query", icon: BrandLogos.ReactQuery, category: "Frontend" },
  { name: "React Native", icon: BrandLogos.React, category: "Frontend" },
  { name: "Tailwind CSS", icon: BrandLogos.Tailwind, category: "Frontend" },
  { name: "Framer Motion", icon: BrandLogos.FramerMotion, category: "Frontend" },
  { name: "HTML5", icon: BrandLogos.HTML, category: "Frontend" },
  { name: "CSS3", icon: BrandLogos.CSS, category: "Frontend" },
  { name: "Bootstrap", icon: BrandLogos.Bootstrap, category: "Frontend" },
  { name: "Sass", icon: BrandLogos.Sass, category: "Frontend" },

  // Backend & Server Systems
  { name: "Node.js", icon: BrandLogos.Node, category: "Backend" },
  { name: "Express.js", icon: BrandLogos.Express, category: "Backend" },
  { name: "Nest.js", icon: BrandLogos.Nestjs, category: "Backend" },
  { name: "Socket.io", icon: BrandLogos.Socketio, category: "Backend" },
  { name: "REST APIs", icon: BrandLogos.RestAPI, category: "Backend" },
  { name: "GraphQL", icon: BrandLogos.GraphQL, category: "Backend" },
  { name: "JWT Auth", icon: BrandLogos.JWT, category: "Backend" },
  { name: "Prisma ORM", icon: BrandLogos.Prisma, category: "Backend" },
  { name: "Mongoose", icon: BrandLogos.Mongoose, category: "Backend" },
  { name: "AWS Cloud", icon: BrandLogos.AWS, category: "Backend" },
  { name: "Firebase", icon: BrandLogos.Firebase, category: "Backend" },
  { name: "RAG Architecture", icon: BrandLogos.AI, category: "Backend" },
  { name: "Groq LLM", icon: BrandLogos.AI, category: "Backend" },
  { name: "Agentic AI", icon: BrandLogos.AI, category: "Backend" },

  // Databases & Caching
  { name: "MongoDB", icon: BrandLogos.MongoDB, category: "Database" },
  { name: "PostgreSQL", icon: BrandLogos.PostgreSQL, category: "Database" },
  { name: "MySQL", icon: BrandLogos.MySQL, category: "Database" },
  { name: "Redis", icon: BrandLogos.Redis, category: "Database" },
  { name: "NoSQL", icon: BrandLogos.NoSQL, category: "Database" },

  // DevOps & Cloud Infrastructure
  { name: "Docker", icon: BrandLogos.DevOps, category: "DevOps" },
  { name: "Kubernetes", icon: BrandLogos.DevOps, category: "DevOps" },
  { name: "Nginx", icon: BrandLogos.Nginx, category: "DevOps" },
  { name: "GitHub Actions", icon: BrandLogos.GitHubActions, category: "DevOps" },
  { name: "CI/CD Pipeline", icon: BrandLogos.DevOps, category: "DevOps" },
  { name: "Linux Server", icon: BrandLogos.Linux, category: "DevOps" },
  { name: "Vercel", icon: BrandLogos.Vercel, category: "DevOps" },

  // Tools & Design
  { name: "Git", icon: BrandLogos.Git, category: "Tools" },
  { name: "GitHub", icon: BrandLogos.GitHub, category: "Tools" },
  { name: "Postman", icon: BrandLogos.Postman, category: "Tools" },
  { name: "VS Code", icon: BrandLogos.VSCode, category: "Tools" },
  { name: "Cloudinary", icon: BrandLogos.Cloudinary, category: "Tools" },
  { name: "Figma", icon: BrandLogos.Figma, category: "Design" },
  { name: "Lightroom", icon: BrandLogos.Lightroom, category: "Design" },
];

export const TOOLS = ["VS Code", "Git", "AWS", "Cloudinary", "Figma", "MongoDB", "GitHub"];

export const EDUCATION: Array<{
  title: string;
  institution: string;
  period: string;
  description: string;
}> = [];

export const EXPERIENCE_LIST = [
  {
    title: "Software Engineering Trainee",
    company: "Brototype, Calicut",
    period: "Present",
    points: [
      "Engineered full-stack applications with React, Next.js, TypeScript, Node.js, Express, and NestJS featuring clean modular architecture.",
      "Architected Retrieval-Augmented Generation (RAG) pipelines, Groq LLM integrations, and Agentic AI workflows for intelligent context-aware applications.",
      "Built high-concurrency real-time systems using WebSockets (Socket.io), WebRTC peer-to-peer data streaming, Redis caching, and REST/GraphQL APIs.",
      "Designed and optimized relational and NoSQL databases with MongoDB, PostgreSQL, and Prisma ORM for high throughput and data integrity.",
      "Implemented DevOps workflows including Docker containerization, CI/CD automation with GitHub Actions, and production deployments on AWS and Vercel."
    ]
  },
  {
    title: "Freelance Software Engineer",
    company: "Production Projects & Freelance",
    period: "Present",
    points: [
      "Engineered and launched EspareHub (esparehub.shop), a multi-vendor marketplace platform actively serving 100+ real-time users with Razorpay payments and AWS infra.",
      "Developed NovuTalks (real-time chat platform with low-latency WebSockets, WebRTC & Redis) and NovuAI (agentic RAG assistant with Groq LLM & real-time streaming).",
      "Built CodePocket (online multi-language compiler with NestJS, Fastify, PostgreSQL & Redis) and dynamic client web platforms like Mirasco.in with customized admin CMS."
    ]
  }
];

export const SERVICES = [
  {
    title: "Frontend Development",
    description: "Crafting beautiful and responsive user interfaces using React, Next.js, and TypeScript focusing on modern web standards.",
    icon: Layout,
    color: "hsl(var(--primary))",
    skills: ["React", "Next.js", "TypeScript", "HTML", "CSS", "Tailwind", "Bootstrap"]
  },
  {
    title: "Backend Development",
    description: "Building scalable server-side logic and managing databases with Node.js, Express, AWS, and MongoDB.",
    icon: Server,
    color: "#10b981", // Emerald
    skills: ["Node.js", "Express", "MongoDB", "AWS", "NoSQL"]
  },
  {
    title: "Mobile App Development",
    description: "Creating high-performance cross-platform mobile applications using React Native for iOS and Android.",
    icon: Zap,
    color: "#06b6d4", // Cyan
    skills: ["React Native", "TypeScript", "Firebase", "Mobile UI"]
  },
  {
    title: "MERN Stack Development",
    description: "Mastering full-stack development to build robust applications from scratch, focusing on security and performance.",
    icon: Code,
    color: "#3b82f6", // Blue
    skills: ["MongoDB", "Express", "React", "Node.js"]
  },
];

export const PROJECTS = [
  {
    title: "NovuTalks - Real-Time Chat Application",
    description: "A high-performance, real-time communication platform inspired by WhatsApp. Engineered for seamless interactions, featuring instant messaging, low-latency WebSockets, WebRTC, Redis, REST API, and GraphQL API integration built on the MERN stack.",
    tags: ["MERN Stack", "React", "Node.js", "Express", "MongoDB", "WebSockets", "WebRTC", "Redis", "REST API", "GraphQL API"],
    image: "/images/novutalks.svg",
    github: "https://github.com/shahal-code",
    demo: "https://www.novutalks.in/",
    status: "Live"
  },
  {
    title: "NovuAI — Agentic AI Chat Assistant",
    description: "An intelligent RAG-based AI chat assistant powered by Groq LLM. Engineered with Retrieval-Augmented Generation for context-aware responses and agentic AI capabilities, featuring Google & WhatsApp authentication, REST API backend, and real-time chat sync across devices built with MERN stack & Next.js.",
    tags: ["MERN Stack", "Groq LLM", "RAG", "Agentic AI", "React", "Node.js", "MongoDB", "Express", "REST API", "Vercel"],
    image: "/images/novuai.webp",
    github: "https://github.com/shahal-code",
    demo: "https://novuai.vercel.app",
    status: "Live"
  },
  {
    title: "CodePocket — Online Multi-Language Compiler",
    description: "A powerful, browser-based compiler platform supporting all major programming languages. Built with a high-performance tech stack featuring Next.js & React on the frontend, and NestJS + Fastify + Node.js powering the backend for ultra-fast code execution. Backed by PostgreSQL with Prisma ORM for data persistence and Redis for blazing-fast caching and session management.",
    tags: ["Next.js", "React", "NestJS", "Fastify", "Node.js", "PostgreSQL", "Prisma ORM", "Redis"],
    image: "/images/codepocket.png",
    github: "https://github.com/shahal-code",
    demo: "https://codepocket.shahl.in",
    status: "Live"
  },
  {
    title: "TechKart",
    description: "A highly scalable MERN stack e-commerce platform. Features include a dynamic product catalog, advanced multi-category filtering, real-time cart management, secure Razorpay payment integration, comprehensive order tracking, REST API, JWT-based authentication, and a robust admin dashboard for end-to-end inventory and order lifecycle management.",
    tags: ["MongoDB", "Express", "React", "Node.js", "Razorpay", "Redux Toolkit", "REST API", "JWT"],
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=400&auto=format&fit=crop&q=55",
    github: "https://github.com/shahal-code/FirstProject-TechKart",
    demo: "#",
    status: "Completed"
  }
];

export const FREELANCE_PROJECTS = [
  {
    title: "Mirasco.in",
    tagline: "Dynamic Event Management & Services Website",
    description: "A fully dynamic landing page for an event management company — the client can update all content (services, gallery, team, pricing) through a custom admin panel without touching code. Built with React, TypeScript, Node.js, Express, MongoDB, REST API, and Framer Motion for buttery-smooth animations.",
    tags: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "REST API", "Framer Motion"],
    image: "/images/mirasco.webp",
    github: "https://github.com/shahal-code",
    demo: "https://mirasco.in",
    status: "Live",
    year: "2025"
  },

  {
    title: "EspareHub",
    tagline: "Large-Scale Multi-Vendor E-Commerce Marketplace",
    description: "A large-scale production multi-vendor marketplace serving 100+ real-time users at esparehub.shop. Multiple sellers list and manage products under one roof with dedicated vendor dashboards, commission tracking, order lifecycle management, Razorpay payment integration, GraphQL API & REST API, and AWS-powered media & infra. Actively in development with new features shipping continuously.",
    tags: ["MongoDB", "Express", "React", "Node.js", "Razorpay", "GraphQL API", "REST API", "AWS", "Multi-Vendor"],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&auto=format&fit=crop&q=55",
    github: "https://github.com/shahal-code",
    demo: "https://esparehub.shop",
    status: "Currently Working",
    year: "2025"
  }
];
