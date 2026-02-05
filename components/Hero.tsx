
/**
 * Hero Section Component
 * 
 * First point of interaction. Establishes professional authority and brand identity.
 * Features high-impact typography and visual compositions.
 */

import React from 'react';
import { motion as motionBase } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const motion = motionBase as any;

const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Dynamic Brand Gradient Orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#078930]/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#DA121A]/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        
        {/* Value Proposition & Typography Content */}
        <div className="md:col-span-8 lg:col-span-9 order-1">
          {/* Availability Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-3 px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 text-[10px] font-bold tracking-widest uppercase mb-10"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </span>
            <span>Open for Projects</span>
          </motion.div>

          {/* Core Headline with Brand Accent */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-display font-bold leading-[1.05] tracking-tighter mb-10 text-left text-zinc-900 dark:text-white"
          >
            Yonas Wagnew <br />
            <span className="text-zinc-400 dark:text-zinc-600 font-medium">Front-End Developer</span> & <br />
            <span className="relative inline-block text-zinc-900 dark:text-white">
              UI Engineer
              <svg className="absolute -bottom-2 left-0 w-full opacity-60" height="12" viewBox="0 0 400 12" fill="none" preserveAspectRatio="none">
                <path d="M1 10.5C50 2.5 350 2.5 399 10.5" stroke="#FCDC04" strokeWidth="5" strokeLinecap="round"/>
              </svg>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl mb-12 leading-relaxed font-light text-left"
          >
            Engineering scalable, performant, and accessible digital experiences. Specialized in TypeScript ecosystems and high-fidelity interface development.
          </motion.p>

          {/* Primary & Secondary CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-6 justify-start"
          >
            <a href="#projects" className="px-10 py-5 rounded-2xl bg-black dark:bg-white text-white dark:text-black font-bold flex items-center space-x-3 hover:bg-zinc-800 dark:hover:bg-[#FCDC04] transition-all transform hover:translate-y-[-4px] shadow-2xl text-xs uppercase tracking-widest">
              <span>Explore Portfolio</span>
              <ArrowUpRight size={20} />
            </a>
            <a href="#contact" className="px-10 py-5 rounded-2xl glass-card border-black/5 dark:border-white/10 text-zinc-900 dark:text-white font-bold hover:bg-black/5 dark:hover:bg-white/5 transition-all transform hover:translate-y-[-4px] flex items-center text-xs uppercase tracking-widest">
              connect
            </a>
          </motion.div>
        </div>

        {/* Profile Visualization & Social Proof Branding */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="md:col-span-4 lg:col-span-3 flex justify-center lg:justify-end order-2"
        >
          <div className="relative group w-full max-w-[320px] md:max-w-none">
            <div className="relative z-10 w-full aspect-[4/5] md:h-[550px] lg:h-[650px] rounded-[48px] overflow-hidden border border-black/5 dark:border-white/10 glass-card p-2 shadow-2xl transition-all duration-500">
              <div className="w-full h-full overflow-hidden rounded-[40px] bg-zinc-100 dark:bg-zinc-900">
                <img 
                  src="https://i.postimg.cc/WbbBT0XN/Myprofile.jpg" 
                  alt="Yonas Wagnew" 
                  className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-1000 scale-[1.3] group-hover:scale-[1.2]"
                  style={{ objectPosition: 'center 35%' }}
                />
              </div>
              
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center space-x-3 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-3xl py-2 px-5 rounded-full border border-black/5 dark:border-white/10 shadow-2xl whitespace-nowrap">
                 <span className="font-mono font-bold text-[#FCDC04] text-sm">
                   &lt;/&gt;
                 </span>
                 <span className="font-display font-bold text-[10px] tracking-[0.3em] uppercase text-zinc-900 dark:text-white">
                   Yonas Wagnew
                 </span>
              </div>
            </div>

            {/* Efficiency Badge - Reverted to small, high position */}
            <motion.div 
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -right-6 top-[15%] z-20 p-3 rounded-2xl glass-card border-black/5 dark:border-white/20 shadow-2xl hidden sm:block"
            >
              <div className="flex items-center space-x-2">
                <div className="p-1.5 bg-[#FCDC04]/20 rounded-lg">
                   <div className="w-1.5 h-1.5 bg-[#FCDC04] rounded-full"></div>
                </div>
                <div className="pr-2">
                  <p className="text-[7px] uppercase font-bold text-zinc-400 dark:text-zinc-500 tracking-[0.2em]">Efficiency</p>
                  <p className="text-sm font-bold text-zinc-900 dark:text-white">99%</p>
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
