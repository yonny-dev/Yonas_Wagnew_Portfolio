
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
  // Increased duration to 2.5s to show off the infinity animation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen selection:bg-[#FCDC04] selection:text-black transition-colors duration-500 bg-white dark:bg-[#0a0a0a] text-black dark:text-[#f5f5f5]">
      {/* Dynamic Tibeb Background Pattern */}
      <div className="fixed inset-0 z-[-1] tibeb-pattern pointer-events-none opacity-40"></div>
      
      <AnimatePresence mode="wait">
        {!isLoaded && (
          // Custom engineered splash loader with Infinite Logo Animation
          <motion.div
            key="loader"
            className="fixed inset-0 z-[100] bg-white dark:bg-black flex flex-col items-center justify-center"
            exit={{ opacity: 0, transition: { duration: 0.8, delay: 0.2 } }}
          >
            <div className="relative flex flex-col items-center justify-center">
              
              {/* Positioning Wrapper for Logo and Overlay */}
              <div className="relative w-24 h-24 mb-12">
                
                {/* Logo wrapper with layoutId for transition to Header */}
                <motion.div
                  layoutId="logo-frame"
                  className="absolute inset-0 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-2xl z-20 bg-white dark:bg-black"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <motion.img 
                    layoutId="logo-image"
                    src="https://i.postimg.cc/s2DHMfs3/logo.jpg" 
                    alt="Logo" 
                    className="w-full h-full object-cover" 
                  />
                </motion.div>

                {/* Infinity Animation - Positioned explicitly ON TOP (z-30) */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-32 z-30 pointer-events-none flex items-center justify-center"
                >
                  <svg viewBox="0 0 240 120" className="w-full h-full drop-shadow-[0_0_12px_rgba(252,220,4,0.5)]">
                    <defs>
                      <linearGradient id="infinityGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#078930" />
                        <stop offset="50%" stopColor="#FCDC04" />
                        <stop offset="100%" stopColor="#DA121A" />
                      </linearGradient>
                    </defs>
                    
                    {/* 
                      Thick Infinity Path 
                      Constructed to have the left top segment move left-to-right to match the arrow direction
                      Center (120,60) -> Right Loop -> Left Loop -> Return
                    */}
                    <motion.path
                      d="M120,60 C160,60 200,20 200,60 C200,100 160,60 120,60 C80,60 40,100 40,60 C40,20 80,60 120,60"
                      fill="none"
                      stroke="url(#infinityGrad)"
                      strokeWidth="12"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0, opacity: 0.2 }}
                      animate={{ 
                        pathLength: [0, 1, 1],
                        pathOffset: [0, 0, 1],
                        opacity: 1
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "linear",
                        times: [0, 0.4, 1]
                      }}
                    />

                    {/* Arrow Head - Positioned on the top curve of the left loop */}
                    <motion.path
                      d="M75,30 L95,30 L85,42 Z" // Simple Triangle pointing right
                      fill="#FCDC04"
                      initial={{ scale: 0, opacity: 0, rotate: -10 }}
                      animate={{ scale: 1, opacity: 1, rotate: 10 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      style={{ originX: 0.5, originY: 0.5 }}
                    />
                  </svg>
                </motion.div>
              </div>

              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: 0.3 }}
                className="font-display font-bold tracking-[0.3em] text-zinc-900 dark:text-white uppercase text-xs"
              >
                YONAS WAGNEW
              </motion.span>
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
