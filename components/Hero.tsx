
/**
 * Hero Section Component
 * 
 * First point of interaction. Establishes professional authority and brand identity.
 * Features advanced Framer Motion layouts and a high-fidelity image composition.
 */

import React from 'react';
import { motion as motionBase } from 'framer-motion';
import { ArrowUpRight, Github, Twitter, MessageSquare } from 'lucide-react';

const motion = motionBase as any;

const Hero: React.FC = () => {
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-32 min-h-[90vh] flex flex-col justify-center overflow-hidden">
      {/* Dynamic Brand Gradient Orbs */}
      <div className="absolute top-1/4 -left-20 w-64 h-64 md:w-96 md:h-96 bg-[#078930]/5 blur-[80px] md:blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-20 w-64 h-64 md:w-96 md:h-96 bg-[#DA121A]/5 blur-[80px] md:blur-[120px] rounded-full pointer-events-none"></div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        
        {/* Value Proposition & Typography Content */}
        <div className="md:col-span-7 lg:col-span-8 order-1">
          {/* Availability Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 text-[10px] md:text-xs font-medium mb-6 md:mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="tracking-wider uppercase">Open for High-Impact Projects</span>
          </motion.div>

          {/* Core Headline with Brand Accent */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-display font-bold leading-[1.1] tracking-tight mb-6 md:mb-8 text-left text-zinc-900 dark:text-white"
          >
            Yonas Wagnew <br />
            <span className="text-zinc-400 dark:text-zinc-600">Front-End Developer</span> & <br />
            <span className="relative inline-block text-zinc-900 dark:text-white">
              UI Engineer
              <svg className="absolute -bottom-2 md:-bottom-3 left-0 w-full opacity-80" height="12" viewBox="0 0 400 12" fill="none" preserveAspectRatio="none">
                <path d="M1 10.5C50 1.5 350 1.5 399 10.5" stroke="#FCDC04" strokeWidth="4" strokeLinecap="round"/>
              </svg>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg lg:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mb-10 md:mb-12 leading-relaxed font-light text-left"
          >
            Engineering scalable, performant, and accessible digital experiences. Specialized in TypeScript ecosystems and high-fidelity interface development.
          </motion.p>

          {/* Primary & Secondary CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4 md:gap-5 justify-start"
          >
            <a href="#projects" className="px-6 py-4 md:px-8 md:py-4 lg:px-10 lg:py-5 rounded-2xl bg-black dark:bg-white text-white dark:text-black font-bold flex items-center space-x-3 hover:bg-zinc-800 dark:hover:bg-[#FCDC04] transition-all transform hover:translate-y-[-4px] shadow-xl text-sm md:text-base">
              <span>Explore Portfolio</span>
              <ArrowUpRight size={20} strokeWidth={2.5} />
            </a>
            <a href="#contact" className="px-6 py-4 md:px-8 md:py-4 lg:px-10 lg:py-5 rounded-2xl glass-card border-black/5 dark:border-white/10 text-zinc-900 dark:text-white font-bold hover:bg-black/5 dark:hover:bg-white/5 transition-all transform hover:translate-y-[-4px] flex items-center text-sm md:text-base">
              Get In Touch
            </a>
          </motion.div>
        </div>

        {/* Profile Visualization & Social Proof Branding */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="md:col-span-5 lg:col-span-4 flex justify-center lg:justify-end order-2"
        >
          <div className="relative group w-full max-w-[280px] sm:max-w-[320px] md:max-w-none">
            {/* Visual Frame Composition */}
            <div className="relative z-10 w-full aspect-[4/5] md:aspect-auto md:h-[450px] lg:h-[550px] rounded-[32px] md:rounded-[48px] overflow-hidden border border-black/5 dark:border-white/10 glass-card p-1.5 md:p-2 shadow-2xl transition-all duration-500">
              <div className="w-full h-full overflow-hidden rounded-[26px] md:rounded-[40px] bg-zinc-100 dark:bg-zinc-900">
                <img 
                  src="https://i.postimg.cc/WbbBT0XN/Myprofile.jpg" 
                  alt="Yonas Wagnew" 
                  className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-1000 scale-[1.3] group-hover:scale-[1.2]"
                  style={{ objectPosition: 'center 35%' }}
                />
              </div>
              
              {/* Profile Identity Badge */}
              <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex items-center space-x-2 md:space-x-3 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-3xl py-2 px-4 md:py-3 md:px-5 rounded-full border border-black/5 dark:border-white/10 shadow-2xl whitespace-nowrap">
                 <div className="flex space-x-1 md:space-x-1.5 flex-shrink-0">
                    <div className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-[#078930]"></div>
                    <div className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-[#FCDC04] animate-pulse"></div>
                    <div className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-[#DA121A]"></div>
                 </div>
                 <span className="font-display font-bold text-[10px] md:text-xs lg:text-sm tracking-[0.2em] uppercase text-zinc-900 dark:text-white">
                   Yonas Wagnew
                 </span>
              </div>
            </div>

            {/* Float-animated Performance Indicator */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -right-4 md:-right-8 top-1/4 z-20 p-3 lg:p-4 rounded-xl lg:rounded-2xl glass-card border-black/5 dark:border-white/20 shadow-2xl hidden sm:block"
            >
              <div className="flex items-center space-x-2 md:space-x-3">
                <div className="p-1.5 lg:p-2 bg-[#FCDC04]/20 rounded-lg">
                   <div className="w-2 lg:w-3 h-2 lg:h-3 bg-[#FCDC04] rounded-full animate-pulse"></div>
                </div>
                <div className="pr-2 lg:pr-4">
                  <p className="text-[7px] lg:text-[10px] uppercase font-bold text-zinc-400 dark:text-zinc-500 tracking-widest">Efficiency</p>
                  <p className="text-[10px] lg:text-xs font-bold text-zinc-900 dark:text-white">99% Score</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
