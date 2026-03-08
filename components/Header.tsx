
/**
 * Header & Navigation Component
 * 
 * Implements a sticky blurring navbar with programmatic smooth scroll logic.
 * Features the brand logo and handles mobile menu state and theme toggling.
 */

import React, { useState, useEffect } from 'react'; // Import React and hooks
import { motion, AnimatePresence } from 'framer-motion'; // Import motion for animations
import { Menu, X, Sun, Moon } from 'lucide-react'; // Import icons from lucide-react
import { NAV_ITEMS } from '../constants'; // Import navigation items from constants

// Interface for Header component props
interface HeaderProps {
  theme?: 'dark' | 'light'; // Current theme state
  toggleTheme?: () => void; // Function to toggle theme
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false); // State to track if user has scrolled
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to track mobile menu visibility

  useEffect(() => {
    // Effect to update isScrolled state on window scroll
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20); // Set to true if scrolled more than 20px
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll); // Cleanup listener
  }, []);

  /**
   * Handles navigation link clicks.
   * Implements smooth scrolling for anchor links and updates browser history.
   */
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault(); // Prevent default anchor behavior
      const targetId = href.replace('#', ''); // Extract target ID
      const element = document.getElementById(targetId); // Find target element
      
      if (element) {
        setIsMenuOpen(false); // Close mobile menu if open
        // Smooth scroll to the target element
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
        // Update URL hash without jumping
        window.history.pushState(null, '', href);
      }
    }
  };

  return (
    // Main header container, fixed at the top with responsive padding
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-8 lg:px-16 flex items-center justify-center pt-4 md:pt-6">
      {/* Navigation bar with dynamic styling and responsive padding */}
      <nav 
        className={`w-full max-w-7xl mx-auto flex items-center justify-between px-5 md:px-8 py-4 md:py-5 rounded-full transition-all duration-500 ${
          isScrolled 
            ? 'glass-card border-black/5 dark:border-white/10 shadow-2xl translate-y-[-10px]' 
            : 'bg-transparent'
        }`}
      >
        {/* Logo and Brand Name */}
        <a href="#" onClick={(e) => handleNavClick(e, '#')} className="group flex items-center space-x-3">
          {/* Animated logo container */}
          <motion.div 
            layoutId="logo-frame"
            className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center border border-black/10 dark:border-white/10 group-hover:border-zinc-400 dark:group-hover:border-zinc-500 transition-all shadow-sm bg-white dark:bg-black"
          >
            {/* Logo image with hover zoom */}
            <motion.img 
              layoutId="logo-image"
              src="https://i.postimg.cc/s2DHMfs3/logo.jpg" 
              alt="Logo" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
            />
          </motion.div>
          {/* Brand name with entrance animation */}
          <motion.span 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="font-display font-bold text-base tracking-tight text-zinc-900 dark:text-white"
          >
            Yonas <span className="text-zinc-500 font-medium">Wagnew</span>
          </motion.span>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          {NAV_ITEMS.map((item, idx) => (
            // Individual nav link with staggered entrance animation
            <motion.a 
              key={item.label} 
              href={item.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + (idx * 0.1) }}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors relative group"
            >
              {item.label}
              {/* Hover underline effect */}
              <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-[#FCDC04] group-hover:w-full transition-all duration-300"></span>
            </motion.a>
          ))}
          
          {/* Vertical divider */}
          <motion.div 
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{ delay: 1 }}
            className="h-6 w-[1px] bg-zinc-200 dark:bg-zinc-800 mx-2"
          ></motion.div>

          {/* Theme toggle button */}
          <motion.button 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.1 }}
            onClick={toggleTheme}
            className="p-2.5 rounded-2xl text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-all transform hover:scale-110 active:scale-95"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>

          {/* "Hire Me" CTA button */}
          <motion.a 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2 }}
            href="#contact" 
            onClick={(e) => handleNavClick(e, '#contact')}
            className="px-6 py-3 rounded-full bg-black dark:bg-white text-white dark:text-black font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all transform hover:scale-105 active:scale-95 shadow-xl"
          >
            Hire Me
          </motion.a>
        </div>

        {/* Mobile controls: Theme toggle and Menu toggle */}
        <div className="flex items-center space-x-4 md:hidden">
          <button onClick={toggleTheme} className="p-2 text-zinc-600 dark:text-zinc-400">
            {theme === 'dark' ? <Sun size={22} /> : <Moon size={22} />}
          </button>
          <button className="p-2 text-zinc-600 dark:text-zinc-400" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Full-screen Mobile Menu overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-40 md:hidden bg-white dark:bg-black flex flex-col items-center justify-center p-10"
          >
            {/* Close button for mobile menu */}
            <button className="absolute top-8 right-8 p-4 text-zinc-500 dark:text-zinc-400" onClick={() => setIsMenuOpen(false)}>
              <X size={32} />
            </button>
            {/* Mobile navigation links */}
            <div className="flex flex-col items-center space-y-10 text-center">
              {NAV_ITEMS.map((item) => (
                <a 
                  key={item.label} 
                  href={item.href}
                  className="text-2xl font-display font-bold text-zinc-900 dark:text-white hover:text-[#FCDC04] transition-colors"
                  onClick={(e) => handleNavClick(e, item.href)}
                >
                  {item.label}
                </a>
              ))}
              {/* Decorative Ethiopian flag colors */}
              <div className="flex space-x-6 pt-10">
                <div className="w-10 h-1.5 bg-[#078930] rounded-full"></div>
                <div className="w-10 h-1.5 bg-[#FCDC04] rounded-full"></div>
                <div className="w-10 h-1.5 bg-[#DA121A] rounded-full"></div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header; // Export the Header component
