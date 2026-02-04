
/**
 * Application Constants & Centralized Content
 * 
 * Contains brand colors, navigation items, skill sets, and project data.
 * This file serves as the single source of truth for the portfolio's content.
 */

import React from 'react';
import { Github, Twitter, MessageSquare, Send, Mail, Globe, Code2, Layers, Cpu, Zap } from 'lucide-react';
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
    title: 'Core Architecture',
    accentColor: COLORS.ethGreen,
    skills: [
      { name: 'TypeScript', level: 98 },
      { name: 'React 18+', level: 96 },
      { name: 'Next.js (App Router)', level: 94 },
      { name: 'Redux / Zustand', level: 92 },
    ],
  },
  {
    title: 'UI Engineering',
    accentColor: COLORS.ethYellow,
    skills: [
      { name: 'Tailwind CSS', level: 99 },
      { name: 'Framer Motion', level: 90 },
      { name: 'Responsive Design', level: 98 },
      { name: 'Design Systems', level: 95 },
    ],
  },
  {
    title: 'Quality & Optimization',
    accentColor: COLORS.ethRed,
    skills: [
      { name: 'Accessibility (ARIA)', level: 92 },
      { name: 'SEO Strategy', level: 88 },
      { name: 'Performance (CWV)', level: 94 },
      { name: 'Unit Testing (Jest)', level: 85 },
    ],
  },
  {
    title: 'Tools & Workflow',
    accentColor: '#4f46e5',
    skills: [
      { name: 'Git / GitHub', level: 95 },
      { name: 'Vercel / CI/CD', level: 90 },
      { name: 'Linux Env', level: 85 },
      { name: 'Chrome DevTools', level: 98 },
    ],
  },
];

// Project Portfolio Content
export const PROJECTS: Project[] = [
  {
    id: 'maldyor-menu',
    title: 'MALDYOR HOTEL DIGITAL MENU',
    description: 'A professional-grade digital menu system for Maldyor Hotel, featuring dynamic category filtering and high-end animations.',
    image: 'https://i.postimg.cc/4yjZY5f8/maldyor_digital_menu.png',
    tags: ['React', 'TypeScript', 'Tailwind', 'Framer Motion'],
    githubUrl: 'https://github.com/yonny-dev/Maldyor-Hotel-Menu-Updated',
    liveUrl: 'https://maldyor-hotel-menu-updated.vercel.app/',
    problem: 'Hotels and restaurants need a way to present their menu digitally that is as premium as their service, with the ability to update items instantly without reprinting.',
    solution: 'Engineered a lightning-fast, mobile-optimized React application with a custom filtering engine and smooth layout transitions to enhance the guest experience.',
  },
  {
    id: 'kades-bakery',
    title: 'KADES BAKERY & CAKE',
    description: 'An artisanal digital storefront for a premium bakery, featuring visual-first product displays and seamless ordering flows.',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=2000&auto=format&fit=crop',
    tags: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'Responsive'],
    githubUrl: 'https://github.com/yonny-dev/kades-bakery',
    liveUrl: 'https://kades-bakery.vercel.app/',
    problem: 'Translating the sensory appeal of artisan baked goods into a digital format while maintaining a seamless, accessible user experience for diverse customer bases.',
    solution: 'Designed an immersive, image-centric interface that combines aesthetic elegance with performant, accessible navigation to drive engagement and conversion.',
  }
];

// Social Connectivity Links
export const SOCIAL_LINKS: SocialLink[] = [
  { platform: 'GitHub', url: 'https://github.com/yonny-dev', icon: <Github size={20} />, label: '@yonny-dev' },
  { platform: 'Twitter', url: 'https://twitter.com/yonnyw7', icon: <Twitter size={20} />, label: '@yonnyw7' },
  { platform: 'Discord', url: 'https://discord.com/users/yonny_w', icon: <MessageSquare size={20} />, label: '@yonny_w' },
  { platform: 'Telegram', url: 'https://t.me/yonnyw7', icon: <Send size={20} />, label: '@yonnyw7' },
  { platform: 'Email', url: 'mailto:yonaswagnew20@gmail.com', icon: <Mail size={20} />, label: 'Yonaswagnew20@gmail.com' },
];
