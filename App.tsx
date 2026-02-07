
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
    const timer = setTimeout(() => setIsLoaded(true), 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen selection:bg-[#FCDC04] selection:text-black transition-colors duration-500 bg-white dark:bg-[#0a0a0a] text-black dark:text-[#f5f5f5]">
      {/* Dynamic Tibeb Background Pattern */}
      <div className="fixed inset-0 z-[-1] tibeb-pattern pointer-events-none opacity-40"></div>
      
      <AnimatePresence mode="wait">
        {!isLoaded && (
          // Custom engineered splash loader with Vertical Sequence Animation
          <motion.div
            key="loader"
            className="fixed inset-0 z-[100] bg-white dark:bg-black flex flex-col items-center justify-center overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          >
            <div className="flex flex-col items-center justify-center max-w-xs w-full px-6">
              
              {/* Top: Infinity Loop Animation (Primary Visual) - Updated to White */}
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-48 h-24 mb-6 flex items-center justify-center"
              >
                <svg viewBox="0 0 240 120" className="w-full h-full drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
                  <motion.path
                    d="M120,60 C160,60 200,20 200,60 C200,100 160,60 120,60 C80,60 40,100 40,60 C40,20 80,60 120,60"
                    fill="none"
                    stroke="white"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0.1 }}
                    animate={{ 
                      pathLength: [0, 1, 1],
                      pathOffset: [0, 0, 1],
                      opacity: 1
                    }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      ease: "linear",
                      times: [0, 0.4, 1]
                    }}
                  />

                  {/* Aesthetic Ethiopian Star Accent */}
                  <motion.path
                    d="M75,30 L95,30 L85,42 Z"
                    fill="#FCDC04"
                    initial={{ scale: 0, opacity: 0, rotate: -15 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    style={{ originX: "50%", originY: "50%" }}
                  />
                </svg>
              </motion.div>

              {/* Middle: Brand Logo */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0, y: 10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                className="relative w-20 h-20 mb-8 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-2xl bg-white dark:bg-black"
              >
                <motion.img 
                  layoutId="logo-image"
                  src="https://i.postimg.cc/s2DHMfs3/logo.jpg" 
                  alt="Logo" 
                  className="w-full h-full object-cover" 
                />
              </motion.div>

              {/* Bottom: Professional Identity */}
              <div className="flex flex-col items-center space-y-2">
                <motion.span 
                  initial={{ opacity: 0, letterSpacing: "0.5em" }}
                  animate={{ opacity: 1, letterSpacing: "0.3em" }}
                  transition={{ duration: 1, delay: 0.8 }}
                  className="font-display font-bold text-zinc-900 dark:text-white uppercase text-[10px]"
                >
                  YONAS WAGNEW
                </motion.span>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "40px" }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                  className="h-[1.5px] bg-[#FCDC04]"
                />
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
