
/**
 * Technological Stack & Expertise Section
 * 
 * Showcases proficiency via animated counters and progress bars.
 */

import React, { useEffect, useRef } from 'react'; // Import React and hooks
import { motion, useInView, useSpring, useTransform, useMotionValue } from 'framer-motion'; // Import animation hooks
import { SKILL_CATEGORIES } from '../constants'; // Import skill data from constants

/**
 * AnimatedCounter Component
 * Animates a number from 0 to the target value when it enters the viewport.
 */
const AnimatedCounter: React.FC<{ value: number }> = ({ value }) => {
  const ref = useRef(null); // Reference for the element to track visibility
  const isInView = useInView(ref, { once: true, margin: "-50px" }); // Hook to detect if element is in view
  
  const count = useMotionValue(0); // Motion value to hold the current count
  // Spring animation for smooth numerical transitions
  const spring = useSpring(count, {
    mass: 1,
    stiffness: 100,
    damping: 30,
  });

  // Transform the spring value to a rounded integer for display
  const display = useTransform(spring, (current) => Math.round(current));

  useEffect(() => {
    // Start the animation when the element enters the viewport
    if (isInView) {
      count.set(value);
    }
  }, [isInView, value, count]);

  return (
    // Render the animated number with a percentage sign
    <span ref={ref} className="tabular-nums">
      <motion.span>{display}</motion.span>%
    </span>
  );
};

/**
 * SkillItem Component
 * Renders a single skill with its name, level, and an animated progress bar.
 */
const SkillItem: React.FC<{ name: string; level: number; delay: number }> = ({ name, level, delay }) => {
  const ref = useRef(null); // Reference for the progress bar animation trigger
  const isInView = useInView(ref, { once: true }); // Detect if the skill item is in view

  return (
    // Animated list item container
    <motion.li 
      ref={ref}
      initial={{ opacity: 0, x: -10 }} // Start invisible and slightly to the left
      whileInView={{ opacity: 1, x: 0 }} // Fade in and slide to position
      transition={{ delay }} // Staggered delay based on index
      viewport={{ once: true }}
      className="group/item flex flex-col space-y-3"
    >
      {/* Skill name and percentage display */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {/* Decorative dot that changes color on hover */}
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700 group-hover/item:bg-[#FCDC04] transition-colors"></span>
          <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-300 transition-colors">
            {name}
          </span>
        </div>
        {/* Animated percentage counter */}
        <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-600 group-hover/item:text-[#FCDC04] transition-colors">
          <AnimatedCounter value={level} />
        </span>
      </div>
      
      {/* Progress bar background */}
      <div className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-900 rounded-full overflow-hidden">
        {/* Animated progress bar fill */}
        <motion.div 
          initial={{ width: 0 }} // Start with 0 width
          animate={isInView ? { width: `${level}%` } : { width: 0 }} // Animate to target percentage width
          transition={{ duration: 1.5, delay: delay + 0.2, ease: "easeOut" }} // Smooth 1.5s animation
          className="h-full bg-gradient-to-r from-zinc-300 to-zinc-500 dark:from-zinc-800 dark:to-zinc-600 group-hover/item:from-[#FCDC04] group-hover/item:to-[#FCDC04]"
        />
      </div>
    </motion.li>
  );
};

/**
 * Skills Section Component
 * Main container for the technical stack showcase.
 */
const Skills: React.FC = () => {
  return (
    // Section container with ID for navigation
    <section id="skills" className="py-32 scroll-mt-32">
      {/* Section header with title and description */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-10"
      >
        <div className="max-w-2xl">
          {/* Decorative line and label */}
          <div className="flex items-center space-x-6 mb-8">
            <span className="h-[2px] w-12 bg-[#FCDC04]"></span>
            <span className="text-[#FCDC04] font-bold uppercase tracking-[0.3em] text-[10px]">Expertise</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-tight text-zinc-900 dark:text-white">Technological <br />Stack</h2>
        </div>
        {/* Short descriptive text */}
        <p className="text-zinc-500 dark:text-zinc-500 max-w-sm text-left lg:text-right text-xs font-bold uppercase tracking-widest leading-relaxed">
          leveraging the cutting-edge tools to engineer performant web architecture.
        </p>
      </motion.div>

      {/* Grid of skill categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {SKILL_CATEGORIES.map((category, idx) => (
          // Individual category card
          <motion.div
            key={category.title}
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 30 }}
            transition={{ delay: idx * 0.1, duration: 0.6 }}
            viewport={{ once: true }}
            className="relative p-10 glass-card rounded-3xl overflow-hidden group h-full"
          >
            {/* Hover glow effect based on category accent color */}
            <div className="absolute top-0 right-0 w-32 h-32 blur-[80px] opacity-0 group-hover:opacity-15 transition-opacity" style={{ backgroundColor: category.accentColor }}></div>
            {/* Vertical accent line */}
            <div className="w-1.5 h-12 rounded-full absolute left-0 top-1/2 -translate-y-1/2" style={{ backgroundColor: category.accentColor }}></div>

            {/* Category title */}
            <h3 className="font-display font-bold text-xs uppercase tracking-[0.25em] mb-10 text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
              {category.title}
            </h3>
            {/* List of skills within the category */}
            <ul className="space-y-8">
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

export default Skills; // Export the Skills component
