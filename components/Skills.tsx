
/**
 * Technological Stack & Expertise Section
 * 
 * Showcases proficiency via animated counters and progress bars.
 * Uses useInView to trigger animations only when the section is visible.
 */

import React, { useEffect, useState, useRef } from 'react';
import { motion as motionBase, useInView, useSpring, useTransform } from 'framer-motion';
import { SKILL_CATEGORIES } from '../constants';

const motion = motionBase as any;

/**
 * AnimatedCounter Utility
 * Uses framer-motion's useSpring and useTransform to create a natural
 * counting effect from 0 to the target percentage.
 */
const AnimatedCounter: React.FC<{ value: number }> = ({ value }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const spring = useSpring(0, {
    mass: 1,
    stiffness: 100,
    damping: 30,
  });

  const display = useTransform(spring, (current) => Math.round(current));

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, value, spring]);

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{display}</motion.span>%
    </span>
  );
};

/**
 * SkillItem Component
 * Single skill display unit with a label, animated counter, and progress track.
 */
const SkillItem: React.FC<{ name: string; level: number; delay: number }> = ({ name, level, delay }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.li 
      ref={ref}
      initial={{ opacity: 0, x: -5 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      viewport={{ once: true }}
      className="group/item flex flex-col space-y-2"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700 group-hover/item:bg-[#FCDC04] transition-colors"></span>
          <span className="text-sm text-zinc-600 dark:text-zinc-400 transition-colors">
            {name}
          </span>
        </div>
        <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-600 group-hover/item:text-[#FCDC04] transition-colors">
          <AnimatedCounter value={level} />
        </span>
      </div>
      
      {/* Progress Bar with staggered animation trigger */}
      <div className="w-full h-[1px] bg-zinc-100 dark:bg-zinc-900 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.5, delay: delay + 0.2, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-zinc-300 to-zinc-500 dark:from-zinc-800 dark:to-zinc-600 group-hover/item:from-[#FCDC04] group-hover/item:to-[#FCDC04]"
        />
      </div>
    </motion.li>
  );
};

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 scroll-mt-32">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8"
      >
        <div className="max-w-xl">
          <div className="flex items-center space-x-4 mb-6">
            <span className="h-[1px] w-12 bg-[#FCDC04]"></span>
            <span className="text-[#FCDC04] font-display font-bold uppercase tracking-widest text-sm">Expertise</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-zinc-900 dark:text-white">Technological <br />Stack</h2>
        </div>
        <p className="text-zinc-500 max-w-sm text-left lg:text-right font-light">
          A selection of tools and languages I leverage to create production-grade web applications.
        </p>
      </motion.div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {SKILL_CATEGORIES.map((category, idx) => (
          <motion.div
            key={category.title}
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 30 }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className="relative p-8 glass-card rounded-2xl overflow-hidden group h-full"
          >
            {/* Visual Accents */}
            <div className="absolute top-0 right-0 w-24 h-24 blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity" style={{ backgroundColor: category.accentColor }}></div>
            <div className="w-2 h-12 rounded-full absolute left-0 top-1/2 -translate-y-1/2" style={{ backgroundColor: category.accentColor }}></div>

            <h3 className="font-display font-bold text-lg mb-8 text-zinc-600 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
              {category.title}
            </h3>
            <ul className="space-y-6">
              {category.skills.map((skill, skillIdx) => (
                <SkillItem key={skill.name} name={skill.name} level={skill.level} delay={(idx * 0.1) + (skillIdx * 0.05)} />
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
