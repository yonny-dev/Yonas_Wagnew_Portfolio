
/**
 * Root Application Component
 * 
 * Orchestrates global state, theme management, and loading orchestration.
 * Implements a custom splash screen and framer-motion page transitions.
 */

import React, { useState, useEffect } from 'react'; // Import React and hooks for state and lifecycle management
import { motion, AnimatePresence } from 'framer-motion'; // Import animation components from framer-motion

// Component Imports - Bringing in all sections of the portfolio
import Header from './components/Header'; // Navigation and theme toggle
import Hero from './components/Hero'; // Introduction section
import About from './components/About'; // Professional narrative and mindset skills
import Skills from './components/Skills'; // Technical expertise section
import Projects from './components/Projects'; // Portfolio work showcase
import Contact from './components/Contact'; // Contact form and social links
import Footer from './components/Footer'; // Legal info and copyright

const App: React.FC = () => {
  // State to track if the initial loading splash screen should be hidden
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Theme state: defaulting to dark for a professional, high-end engineering aesthetic
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Effect to synchronize the theme state with the HTML document element
  useEffect(() => {
    // If theme is dark, add 'dark' class to <html> for Tailwind's dark mode support
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      // Otherwise remove it
      document.documentElement.classList.remove('dark');
    }
    // Persist theme preference in local storage
    localStorage.setItem('theme', theme);
  }, [theme]); // Re-run whenever the theme state changes

  // Function to toggle between light and dark themes
  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Lifecycle effect to handle the initial loading transition duration
  useEffect(() => {
    // Set isLoaded to true after 2.2 seconds to hide the splash screen
    const timer = setTimeout(() => setIsLoaded(true), 2200);
    // Cleanup timer on component unmount
    return () => clearTimeout(timer);
  }, []); // Run only once on initial mount

  return (
    // Main wrapper with dynamic background colors based on theme and custom selection colors
    <div className="relative min-h-screen selection:bg-[#FCDC04] selection:text-black transition-colors duration-500 bg-white dark:bg-[#0a0a0a] text-black dark:text-[#f5f5f5]">
      {/* Fixed background pattern (Tibeb) that stays behind all content */}
      <div className="fixed inset-0 z-[-1] tibeb-pattern pointer-events-none opacity-40"></div>
      
      {/* AnimatePresence allows components to animate out when they are removed from the DOM */}
      <AnimatePresence mode="wait">
        {!isLoaded && (
          // Splash loader overlay - visible only until isLoaded is true
          <motion.div
            key="loader"
            className="fixed inset-0 z-[100] bg-white dark:bg-black flex flex-col items-center justify-center overflow-hidden"
            initial={{ opacity: 1 }} // Start fully opaque
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }} // Fade out smoothly
          >
            <div className="flex flex-col items-center justify-center max-w-xs w-full px-6">
              
              {/* Brand Logo - Centered focus with entrance animation */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }} // Start smaller, invisible, and lower
                animate={{ scale: 1, opacity: 1, y: 0 }} // Animate to full size, visible, and original position
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} // Custom cubic-bezier for smooth motion
                className="relative w-24 h-24 mb-10 rounded-[2.5rem] overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-2xl bg-white dark:bg-black"
              >
                {/* Logo image with layoutId for potential shared element transitions */}
                <motion.img 
                  layoutId="logo-image"
                  src="https://i.postimg.cc/s2DHMfs3/logo.jpg" 
                  alt="Logo" 
                  className="w-full h-full object-cover" 
                />
              </motion.div>

              {/* Professional Identity text and loading bar */}
              <div className="flex flex-col items-center space-y-3">
                {/* Name with letter-spacing animation */}
                <motion.span 
                  initial={{ opacity: 0, letterSpacing: "0.6em" }}
                  animate={{ opacity: 1, letterSpacing: "0.3em" }}
                  transition={{ duration: 1.2, delay: 0.4 }}
                  className="font-display font-bold text-zinc-900 dark:text-white uppercase text-xs"
                >
                  YONAS WAGNEW
                </motion.span>
                
                {/* Visual loading bar container */}
                <div className="relative h-[2px] w-48 bg-zinc-100 dark:bg-zinc-900 overflow-hidden rounded-full">
                  {/* Animated progress indicator */}
                  <motion.div 
                    initial={{ x: "-100%" }} // Start off-screen to the left
                    animate={{ x: "0%" }} // Slide into view
                    transition={{ duration: 1.5, delay: 0.2, ease: "easeInOut" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FCDC04] to-transparent"
                  />
                </div>

                {/* Tagline with delayed fade-in */}
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
      
      {/* Main content - visible only after loading is complete */}
      {isLoaded && (
        <motion.main
          key="content"
          initial={{ opacity: 0 }} // Start invisible
          animate={{ opacity: 1 }} // Fade in
          transition={{ duration: 1 }} // 1 second duration
          className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16" // Responsive container sizing with improved mobile padding
        >
          {/* Render all portfolio sections in sequence */}
          <Header theme={theme} toggleTheme={toggleTheme} /> {/* Sticky navigation */}
          <Hero /> {/* Hero/Intro section */}
          <About /> {/* About/Context section */}
          <Skills /> {/* Skills/Expertise section */}
          <Projects /> {/* Projects/Showcase section */}
          <Contact /> {/* Contact/Social section */}
          <Footer /> {/* Footer/Legal section */}
        </motion.main>
      )}
    </div>
  );
};

export default App; // Export the root component
