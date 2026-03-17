
/**
 * Application Constants & Centralized Content
 * 
 * Contains brand colors, navigation items, skill sets, and project data.
 * This file serves as the single source of truth for the portfolio's content.
 */

import React from 'react';
import { Github, Phone, Linkedin, Send, Mail, Globe, Code2, Layers, Cpu, Zap } from 'lucide-react';
import { NavItem, SkillCategory, Project, SocialLink } from './types';

// Brand Identity: Ethiopian-inspired primary color palette
export const COLORS = {
  ethGreen: '#078930',
  ethYellow: '#FCDC04',
  ethRed: '#DA121A',
  bgDark: '#0a0a0a',
  bgCard: 'rgba(255, 255, 255, 0.03)',
};

// Global Navigation Items
export const NAV_ITEMS: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

// Skills Data: Organized by domain expertise with proficiency levels
export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Frontend Development',
    accentColor: COLORS.ethGreen,
    skills: [
      { name: 'React / Next.js', level: 96 },
      { name: 'TypeScript', level: 98 },
      { name: 'TailwindCSS', level: 99 },
      { name: 'JavaScript (ES6+)', level: 97 },
    ],
  },
  {
    title: 'Backend Development',
    accentColor: COLORS.ethYellow,
    skills: [
      { name: 'Node.js / Express', level: 94 },
      { name: 'Python (FastAPI)', level: 88 },
      { name: 'REST & GraphQL', level: 92 },
      { name: 'NestJS', level: 85 },
    ],
  },
  {
    title: 'Databases & DevOps',
    accentColor: COLORS.ethRed,
    skills: [
      { name: 'PostgreSQL / MongoDB', level: 90 },
      { name: 'Docker / CI/CD', level: 88 },
      { name: 'AWS / Vercel', level: 92 },
      { name: 'Redis', level: 85 },
    ],
  },
  {
    title: 'AI & Performance',
    accentColor: '#4f46e5',
    skills: [
      { name: 'AI API Integration', level: 94 },
      { name: 'Web Performance', level: 95 },
      { name: 'OAuth / Security', level: 92 },
      { name: 'Prompt Engineering', level: 90 },
    ],
  },
];

// Project Portfolio Content
export const PROJECTS: Project[] = [
  {
    id: 'zemen-expense',
    title: 'ZEMEN EXPENSE',
    description: 'A localized personal finance management tool for the Ethiopian market, featuring real-time synchronization and bilingual support.',
    image: 'https://i.postimg.cc/0NRnQLMZ/imageze.png',
    tags: ['React', 'TypeScript', 'Supabase', 'TailwindCSS', 'Recharts'],
    githubUrl: 'https://github.com/yonny-dev/zemen_expense',
    liveUrl: 'https://zemenexpense.vercel.app',
    problem: 'Managing personal finances in Ethiopia requires handling local payment platforms like Telebirr and CBE, often needing bilingual support (Amharic/English) which global apps lack.',
    solution: 'Built a full-stack tracking app using Supabase for real-time data and auth, featuring a bilingual interface, Recharts for visualization, and specific integration points for local banking services.',
  },
  {
    id: 'maldyor-menu',
    title: 'MALDYOR HOTEL DIGITAL MENU',
    description: 'A professional-grade digital menu system for Maldyor Hotel, featuring dynamic category filtering and high-end animations.',
    image: 'https://i.postimg.cc/4yjZY5f8/maldyor_digital_menu.png',
    tags: ['Next.js', 'Node.js', 'PostgreSQL', 'TailwindCSS'],
    githubUrl: 'https://github.com/yonny-dev/Maldyor-Hotel-Menu-Updated',
    liveUrl: 'https://www.maldyor.wezktech.site',
    problem: 'Hotels and restaurants need a way to present their menu digitally that is as premium as their service, with the ability to update items instantly without reprinting.',
    solution: 'Engineered a full-stack solution with a Next.js frontend and a Node.js/PostgreSQL backend for real-time menu management and high-performance delivery.',
  },
  {
    id: 'kades-bakery',
    title: 'KADES BAKERY & CAKE',
    description: 'An artisanal digital storefront for a premium bakery, featuring visual-first product displays and seamless ordering flows.',
    image: 'https://i.postimg.cc/QMSm1R3R/image.png',
    tags: ['Next.js', 'FastAPI', 'MongoDB', 'TailwindCSS'],
    githubUrl: 'https://github.com/yonny-dev/kadesbakerycake',
    liveUrl: 'https://www.kadesbakerycake.wezktech.site',
    problem: 'Translating the sensory appeal of artisan baked goods into a digital format while maintaining a seamless, accessible user experience for diverse customer bases.',
    solution: 'Designed an immersive, image-centric interface powered by a Python backend for inventory management and order processing.',
  }
];

// Social Connectivity Links
export const SOCIAL_LINKS: SocialLink[] = [
  { platform: 'Phone', url: 'tel:+251938007979', icon: <Phone size={20} />, label: '+251 938 007 979' },
  { platform: 'GitHub', url: 'https://github.com/yonny-dev', icon: <Github size={20} />, label: '@yonny-dev' },
  { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/yonas-wagnew', icon: <Linkedin size={20} />, label: 'LinkedIn' },
  { platform: 'Telegram', url: 'https://t.me/yonnyw7', icon: <Send size={20} />, label: '@yonnyw7' },
  { platform: 'Email', url: 'mailto:yonaswagnew20@gmail.com', icon: <Mail size={20} />, label: 'Yonaswagnew20@gmail.com' },
];
