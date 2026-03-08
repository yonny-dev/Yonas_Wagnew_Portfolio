
/**
 * About Section Component
 * 
 * Provides professional narrative and highlights core engineering principles.
 */

import React from 'react'; // Import React library for component creation
import { motion } from 'framer-motion'; // Import motion for animations
import { Brain } from 'lucide-react'; // Import Brain icon from lucide-react

const About: React.FC = () => {
  // Array containing the list of mindset skills to display
  const mindsetSkills = [
    "Problem-solving & debugging across the full stack",
    "Building & shipping real projects",
    "Understanding the whole flow: requests, responses, DNS, headers, cookies",
    "Adaptability — tech changes fast, so continuous learning is key",
    "Clean code, testing (unit/integration/E2E), basic architecture awareness"
  ];

  return (
    // Main section container with ID for navigation and styling for padding/borders
    <section id="about" className="py-32 border-t border-zinc-100 dark:border-zinc-900 overflow-hidden scroll-mt-32">
      {/* Grid layout: 1 column on mobile, 2 columns on large screens */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        {/* Left column: Professional narrative with entrance animation */}
        <motion.div
          initial={{ opacity: 0, x: -30 }} // Start invisible and slightly to the left
          whileInView={{ opacity: 1, x: 0 }} // Animate to full opacity and original position when in view
          transition={{ duration: 0.8, ease: "easeOut" }} // Smooth 0.8s animation
          viewport={{ once: true, margin: "-100px" }} // Trigger animation once when 100px into viewport
        >
          {/* Section header with decorative line and label */}
          <div className="flex items-center space-x-6 mb-8">
            <span className="h-[2px] w-12 bg-[#078930]"></span> {/* Decorative green line */}
            <span className="text-[#078930] font-bold uppercase tracking-[0.3em] text-[10px]">Context</span> {/* Section label */}
          </div>
          {/* Main heading for the about section */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-10 leading-tight text-zinc-900 dark:text-white">
            Engineering digital experiences with <span className="text-zinc-400 dark:text-zinc-500 italic">discipline</span> and <span className="text-zinc-900 dark:text-white">clarity</span>.
          </h2>
          {/* Narrative text content */}
          <div className="space-y-8 text-zinc-500 dark:text-zinc-400 text-base md:text-lg font-light leading-relaxed">
            <p>
              I am <span className="text-[#FCDC04] font-bold">Yonas Wagnew</span>, a Full Stack Software Developer focused on building scalable web applications from frontend interfaces to backend systems and cloud infrastructure. I work with modern technologies like TypeScript, React, Next.js, Node.js, and cloud platforms to design high-performance applications and developer-friendly architectures.
            </p>
            <p>
              My philosophy is simple: code should be a reflection of intent. I strive for clean abstraction, deterministic state management, and an unwavering commitment to building complete, end-to-end systems that solve real-world problems.
            </p>
          </div>
          
          {/* Location/Status indicators at the bottom of the left column */}
          <div className="mt-16 flex items-center space-x-6 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-600">
            <span>Rooted in Ethiopia</span>
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-200 dark:bg-zinc-800"></span> {/* Separator dot */}
            <span>Based Globally</span>
          </div>
        </motion.div>

        {/* Right column: Mindset Skills card */}
        <div className="flex flex-col gap-6">
          {/* Animated card container with glassmorphism effect and responsive padding */}
          <motion.div
            whileInView={{ opacity: 1, y: 0, scale: 1 }} // Animate to full size/opacity when in view
            initial={{ opacity: 0, y: 30, scale: 0.95 }} // Start invisible, lower, and slightly smaller
            transition={{ delay: 0.2, duration: 0.6 }} // 0.6s animation with 0.2s delay
            viewport={{ once: true, margin: "-50px" }} // Trigger animation once
            className="p-8 md:p-12 glass-card rounded-[2.5rem] md:rounded-[3rem] border-black/5 dark:border-white/5 hover:border-black/10 transition-all group bg-gradient-to-br from-zinc-50/50 to-transparent dark:from-white/5 dark:to-transparent"
          >
            <div className="flex flex-col gap-10">
              {/* Icon container with brand yellow background and shadow */}
              <div className="w-16 h-16 shrink-0 rounded-[1.5rem] bg-[#FCDC04] flex items-center justify-center text-black shadow-xl shadow-[#FCDC04]/20 group-hover:scale-110 transition-transform duration-500">
                <Brain size={32} /> {/* Brain icon representing mindset */}
              </div>
              <div>
                {/* Card heading */}
                <h3 className="text-2xl font-bold mb-8 text-zinc-900 dark:text-white tracking-tight">Mindset Skills</h3>
                {/* List of skills mapped from the mindsetSkills array */}
                <ul className="space-y-5">
                  {mindsetSkills.map((skill, i) => (
                    <li key={i} className="flex items-start space-x-4 text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed font-medium group/item">
                      {/* Custom bullet point with hover scale effect */}
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#078930] shrink-0 group-hover/item:scale-125 transition-transform"></span>
                      <span>{skill}</span> {/* Skill text */}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About; // Export the component for use in other parts of the app
