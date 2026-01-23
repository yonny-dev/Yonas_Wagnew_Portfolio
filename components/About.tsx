
/**
 * About Section Component
 * 
 * Provides professional narrative and highlights core engineering principles.
 * Blends cultural roots with global technical standards.
 */

import React from 'react';
import { motion as motionBase } from 'framer-motion';
import { Layers, Zap, ShieldCheck, Monitor } from 'lucide-react';

const motion = motionBase as any;

const About: React.FC = () => {
  // Key professional pillars displayed in a responsive grid
  const highlights = [
    {
      icon: <Layers className="text-[#078930]" />,
      title: "UI Architecture",
      desc: "Crafting modular, scalable component systems using atomic design principles."
    },
    {
      icon: <Zap className="text-[#FCDC04]" />,
      title: "Optimization",
      desc: "Prioritizing Core Web Vitals, tree-shaking, and intelligent caching strategies."
    },
    {
      icon: <ShieldCheck className="text-[#DA121A]" />,
      title: "Accessibility",
      desc: "Engineering for everyone with semantic HTML and comprehensive ARIA standards."
    },
    {
      icon: <Monitor className="text-blue-500" />,
      title: "Cross-Platform",
      desc: "Ensuring pixel-perfection across all screen sizes and modern browser engines."
    }
  ];

  return (
    <section id="about" className="py-24 border-t border-zinc-100 dark:border-zinc-900 overflow-hidden scroll-mt-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Narrative Narrative Side */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="flex items-center space-x-4 mb-6">
            <span className="h-[1px] w-12 bg-[#078930]"></span>
            <span className="text-[#078930] font-display font-bold uppercase tracking-widest text-sm">About Me</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 text-zinc-900 dark:text-white">
            Engineering digital experiences with <span className="text-zinc-400 dark:text-zinc-500 italic">discipline</span> and <span className="text-zinc-900 dark:text-white">clarity</span>.
          </h2>
          <div className="space-y-6 text-zinc-600 dark:text-zinc-400 text-lg font-light leading-relaxed">
            <p>
              I am Yonas Wagnew, a Senior Front-End Engineer based at the intersection of technical excellence and cultural storytelling. With a deep mastery of the TypeScript ecosystem, I focus on building interfaces that are as robust as they are beautiful.
            </p>
            <p>
              My philosophy is simple: code should be a reflection of intent. I strive for clean abstraction, deterministic state management, and an unwavering commitment to the end-user experience.
            </p>
          </div>
          
          <div className="mt-12 flex items-center space-x-4 text-xs font-display uppercase tracking-widest text-zinc-400 dark:text-zinc-600">
            <span>Rooted in Ethiopia</span>
            <span className="w-1 h-1 rounded-full bg-zinc-200 dark:bg-zinc-800"></span>
            <span>Based Globally</span>
          </div>
        </motion.div>

        {/* Feature Grid Side */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {highlights.map((item, idx) => (
            <motion.div
              key={item.title}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              viewport={{ once: true, margin: "-50px" }}
              className="p-8 glass-card rounded-2xl border-black/5 dark:border-white/5 hover:border-black/10 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-zinc-100 dark:bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-zinc-900 dark:text-white">{item.title}</h3>
              <p className="text-zinc-500 dark:text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
