
/**
 * About Section Component
 * 
 * Provides professional narrative and highlights core engineering principles.
 */

import React from 'react';
import { motion as motionBase } from 'framer-motion';
import { Layers, Zap, ShieldCheck, Monitor } from 'lucide-react';

const motion = motionBase as any;

const About: React.FC = () => {
  const highlights = [
    {
      icon: <Layers className="text-[#078930]" size={24} />,
      title: "UI Architecture",
      desc: "Crafting modular, scalable component systems using atomic design principles."
    },
    {
      icon: <Zap className="text-[#FCDC04]" size={24} />,
      title: "Optimization",
      desc: "Prioritizing Core Web Vitals, tree-shaking, and intelligent caching strategies."
    },
    {
      icon: <ShieldCheck className="text-[#DA121A]" size={24} />,
      title: "Accessibility",
      desc: "Engineering for everyone with semantic HTML and comprehensive ARIA standards."
    },
    {
      icon: <Monitor className="text-blue-500" size={24} />,
      title: "Cross-Platform",
      desc: "Ensuring pixel-perfection across all screen sizes and modern browser engines."
    }
  ];

  return (
    <section id="about" className="py-32 border-t border-zinc-100 dark:border-zinc-900 overflow-hidden scroll-mt-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="flex items-center space-x-6 mb-8">
            <span className="h-[2px] w-12 bg-[#078930]"></span>
            <span className="text-[#078930] font-bold uppercase tracking-[0.3em] text-[10px]">Context</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-10 leading-tight text-zinc-900 dark:text-white">
            Engineering digital experiences with <span className="text-zinc-400 dark:text-zinc-500 italic">discipline</span> and <span className="text-zinc-900 dark:text-white">clarity</span>.
          </h2>
          <div className="space-y-8 text-zinc-500 dark:text-zinc-400 text-base md:text-lg font-light leading-relaxed">
            <p>
              I am Yonas Wagnew, a Senior Front-End Engineer based at the intersection of technical excellence and cultural storytelling. With a deep mastery of the TypeScript ecosystem, I focus on building interfaces that are as robust as they are beautiful.
            </p>
            <p>
              My philosophy is simple: code should be a reflection of intent. I strive for clean abstraction, deterministic state management, and an unwavering commitment to the end-user experience.
            </p>
          </div>
          
          <div className="mt-16 flex items-center space-x-6 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-600">
            <span>Rooted in Ethiopia</span>
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-200 dark:bg-zinc-800"></span>
            <span>Based Globally</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {highlights.map((item, idx) => (
            <motion.div
              key={item.title}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              viewport={{ once: true, margin: "-50px" }}
              className="p-8 glass-card rounded-3xl border-black/5 dark:border-white/5 hover:border-black/10 transition-all group"
            >
              <div className="w-14 h-14 rounded-2xl bg-zinc-100 dark:bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold mb-4 text-zinc-900 dark:text-white">{item.title}</h3>
              <p className="text-zinc-500 dark:text-zinc-500 text-xs leading-relaxed font-medium">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
