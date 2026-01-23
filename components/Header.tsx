
/**
 * Header & Navigation Component
 * 
 * Implements a sticky blurring navbar with programmatic smooth scroll logic.
 * Features the brand logo and handles mobile menu state and theme toggling.
 */

import React, { useState, useEffect } from 'react';
import { motion as motionBase, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { NAV_ITEMS, COLORS } from '../constants';

const motion = motionBase as any;

interface HeaderProps {
  theme?: 'dark' | 'light';
  toggleTheme?: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  // State for visual updates when scrolling past a threshold
  const [isScrolled, setIsScrolled] = useState(false);
  // Mobile menu visibility control
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Tracks scroll position to apply background blur and elevation effects
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /**
   * Programmatic Navigation Handler
   * Ensures accurate vertical alignment when clicking section links,
   * accounting for the fixed header height via CSS scroll-margin-top.
   */
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.replace('#', '');
      const element = document.getElementById(targetId);
      
      if (element) {
        setIsMenuOpen(false);
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
        window.history.pushState(null, '', href);
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 sm:px-10 lg:px-16 flex items-center justify-center pt-6">
      <nav 
        className={`w-full max-w-7xl mx-auto flex items-center justify-between px-6 py-4 rounded-full transition-all duration-500 ${
          isScrolled 
            ? 'glass-card border-black/5 dark:border-white/10 shadow-2xl translate-y-[-10px]' 
            : 'bg-transparent'
        }`}
      >
        {/* Brand/Logo Section with integrated JPG logo */}
        <a href="#" onClick={(e) => handleNavClick(e, '#')} className="group flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center border border-black/10 dark:border-white/10 group-hover:border-zinc-400 dark:group-hover:border-zinc-500 transition-all shadow-sm">
            <img 
              src="https://i.postimg.cc/s2DHMfs3/logo.jpg" 
              alt="Logo" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
            />
          </div>
          <span className="font-display font-bold text-lg tracking-tight text-zinc-900 dark:text-white">
            Yonas <span className="text-zinc-500 font-medium">Wagnew</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          {NAV_ITEMS.map((item) => (
            <a 
              key={item.label} 
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#FCDC04] group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}
          
          <div className="h-6 w-[1px] bg-zinc-200 dark:bg-zinc-800 mx-2"></div>

          {/* Theme Switcher Toggle */}
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-xl glass-card border-black/5 dark:border-white/10 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-all transform hover:scale-110 active:scale-95"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* High Priority CTA */}
          <a 
            href="#contact" 
            onClick={(e) => handleNavClick(e, '#contact')}
            className="px-5 py-2 rounded-full bg-black dark:bg-white text-white dark:text-black font-semibold text-sm hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all transform hover:scale-105 active:scale-95"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile Toggle Trigger */}
        <div className="flex items-center space-x-4 md:hidden">
          <button onClick={toggleTheme} className="p-2 text-zinc-600 dark:text-zinc-400">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button className="p-2 text-zinc-600 dark:text-zinc-400" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Full-Screen Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="fixed inset-0 z-40 md:hidden bg-white/95 dark:bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <button className="absolute top-8 right-8 p-2 text-zinc-500 dark:text-zinc-400" onClick={() => setIsMenuOpen(false)}>
              <X size={32} />
            </button>
            <div className="flex flex-col items-center space-y-8">
              {NAV_ITEMS.map((item) => (
                <a 
                  key={item.label} 
                  href={item.href}
                  className="text-3xl font-display font-bold text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
                  onClick={(e) => handleNavClick(e, item.href)}
                >
                  {item.label}
                </a>
              ))}
              {/* Cultural Brand Indicators */}
              <div className="flex space-x-4 pt-8">
                <div className="w-8 h-1 bg-[#078930]"></div>
                <div className="w-8 h-1 bg-[#FCDC04]"></div>
                <div className="w-8 h-1 bg-[#DA121A]"></div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
