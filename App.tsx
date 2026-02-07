
/**
 * Root Application Component
 * 
 * Orchestrates global state, theme management, and loading orchestration.
 * Implements a custom splash screen and framer-motion page transitions.
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Component Imports
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

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
    const timer = setTimeout(() => setIsLoaded(true), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen selection:bg-[#FCDC04] selection:text-black transition-colors duration-500 bg-white dark:bg-[#0a0a0a] text-black dark:text-[#f5f5f5]">
      {/* Dynamic Tibeb Background Pattern */}
      <div className="fixed inset-0 z-[-1] tibeb-pattern pointer-events-none opacity-40"></div>
      
      <AnimatePresence mode="wait">
        {!isLoaded && (
          // Refined minimalist splash loader focusing on Brand Logo
          <motion.div
            key="loader"
            className="fixed inset-0 z-[100] bg-white dark:bg-black flex flex-col items-center justify-center overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          >
            <div className="flex flex-col items-center justify-center max-w-xs w-full px-6">
              
              {/* Brand Logo - Centered focus */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-24 h-24 mb-10 rounded-[2.5rem] overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-2xl bg-white dark:bg-black"
              >
                <motion.img 
                  layoutId="logo-image"
                  src="https://i.postimg.cc/s2DHMfs3/logo.jpg" 
                  alt="Logo" 
                  className="w-full h-full object-cover" 
                />
              </motion.div>

              {/* Professional Identity */}
              <div className="flex flex-col items-center space-y-3">
                <motion.span 
                  initial={{ opacity: 0, letterSpacing: "0.6em" }}
                  animate={{ opacity: 1, letterSpacing: "0.3em" }}
                  transition={{ duration: 1.2, delay: 0.4 }}
                  className="font-display font-bold text-zinc-900 dark:text-white uppercase text-xs"
                >
                  YONAS WAGNEW
                </motion.span>
                
                <div className="relative h-[2px] w-48 bg-zinc-100 dark:bg-zinc-900 overflow-hidden rounded-full">
                  <motion.div 
                    initial={{ x: "-100%" }}
                    animate={{ x: "0%" }}
                    transition={{ duration: 1.5, delay: 0.2, ease: "easeInOut" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FCDC04] to-transparent"
                  />
                </div>

                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.4 }}
                  transition={{ delay: 0.8 }}
                  className="text-[9px] font-bold uppercase tracking-[0.4em] text-zinc-500"
                >
                  Engineering Excellence
                </motion.span>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {isLoaded && (
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
    </div>
  );
};

export default App;
