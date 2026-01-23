
/**
 * Type Definitions
 * 
 * Provides structural integrity and type safety across the portfolio.
 * Ensures strict TypeScript compliance (no 'any').
 */

import React from 'react';

// Navigation structure for header/footer links
export interface NavItem {
  label: string;
  href: string;
}

// Single skill unit with proficiency level for animated counters
export interface Skill {
  name: string;
  level: number; // Proficiency level (0-100)
  icon?: React.ReactNode;
}

// Logical grouping of skills for the Expertise section
export interface SkillCategory {
  title: string;
  skills: Skill[];
  accentColor: string; // Specific Ethiopian-inspired accent color
}

// Portfolio project schema
export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl: string;
  liveUrl: string;
  problem: string;
  solution: string;
}

// Social media and connectivity profiles
export interface SocialLink {
  platform: string;
  url: string;
  icon: React.ReactNode;
  label: string;
}
