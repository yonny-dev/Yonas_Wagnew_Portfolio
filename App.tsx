
/**
 * Root Application Component
 * 
 * Orchestrates global state, theme management, and loading orchestration.
 * Implements a custom splash screen and framer-motion page transitions.
 */

import React, { useState, useEffect } from 'react';
import { motion as motionBase, AnimatePresence } from 'framer-motion';

// Component Imports
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

const motion = motionBase as any;

const App: React.FC = () => {
  // tracks initial mount state for the splash loader
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Theme state: defaulting to dark for senior engineering aesthetic
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    // Synchronize theme state with the DOM document element for Tailwind classes
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Handler for user-initiated theme switching
  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Lifecycle to handle initial loading transition
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen selection:bg-[#FCDC04] selection:text-black transition-colors duration-500 bg-white dark:bg-[#0a0a0a] text-black dark:text-[#f5f5f5]">
      {/* Dynamic Tibeb Background Pattern */}
      <div className="fixed inset-0 z-[-1] tibeb-pattern pointer-events-none opacity-40"></div>
      
      <AnimatePresence>
        {!isLoaded ? (
          // Custom engineered splash loader with brand-colored orbital indicators
          <motion.div
            key="loader"
            className="fixed inset-0 z-[100] bg-white dark:bg-black flex flex-col items-center justify-center"
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative w-24 h-24"
            >
              <div className="absolute inset-0 border-t-2 border-[#078930] rounded-full animate-spin"></div>
              <div className="absolute inset-2 border-r-2 border-[#FCDC04] rounded-full animate-spin-slow"></div>
              <div className="absolute inset-4 border-b-2 border-[#DA121A] rounded-full animate-spin"></div>
            </motion.div>
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6 font-display font-medium tracking-widest text-zinc-400 dark:text-zinc-500 uppercase text-xs"
            >
              Initializing Workspace
            </motion.span>
          </motion.div>
        ) : (
          // Main content container with orchestrating layout
          <motion.main
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16"
          >
            <Header theme={theme} toggleTheme={toggleTheme} />
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Contact />
            <Footer />
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
