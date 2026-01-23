
/**
 * Projects / Portfolio Section
 * 
 * Showcases selected works with problem/solution narrative.
 * Implements alternating layout and hover-triggered interaction effects.
 */

import React from 'react';
import { motion as motionBase } from 'framer-motion';
import { Github, ExternalLink, ArrowRight } from 'lucide-react';
import { PROJECTS } from '../constants';

const motion = motionBase as any;

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-24 scroll-mt-32">
      {/* Branding & Header Content */}
      <div className="flex items-center space-x-4 mb-6">
        <span className="h-[1px] w-12 bg-[#DA121A]"></span>
        <span className="text-[#DA121A] font-display font-bold uppercase tracking-widest text-sm">Portfolio</span>
      </div>
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
        <h2 className="text-4xl md:text-5xl font-display font-bold text-zinc-900 dark:text-white">
          Selected <span className="text-zinc-400 dark:text-zinc-500">Works</span>
        </h2>
        <a 
          href="https://github.com/yonny-dev" 
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center space-x-2 text-zinc-500 hover:text-black dark:hover:text-white transition-colors group mt-4 md:mt-0"
        >
          <span>Explore Archive</span>
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </a>
      </div>

      <div className="space-y-32">
        {PROJECTS.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center ${idx % 2 === 0 ? '' : 'lg:flex-row-reverse'}`}
          >
            {/* Visual Container: Image with interactive overlay */}
            <div className={`lg:col-span-7 ${idx % 2 === 0 ? '' : 'lg:order-2'}`}>
              <div className="group relative rounded-3xl overflow-hidden glass-card aspect-[16/9] shadow-xl">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                  <div className="flex space-x-4">
                    <a href={project.githubUrl} className="p-3 bg-white text-black rounded-full hover:bg-[#FCDC04] transition-colors shadow-lg">
                      <Github size={20} />
                    </a>
                    <a href={project.liveUrl} className="p-3 bg-white text-black rounded-full hover:bg-[#FCDC04] transition-colors shadow-lg">
                      <ExternalLink size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Container: Technical narrative and tags */}
            <div className={`lg:col-span-5 ${idx % 2 === 0 ? '' : 'lg:order-1'}`}>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-500 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="text-3xl md:text-4xl font-display font-bold mb-6 text-zinc-900 dark:text-white">
                {project.title}
              </h3>
              
              <div className="space-y-6 mb-10">
                {/* Engineering Highlights */}
                <div className="relative pl-6 border-l-2 border-zinc-200 dark:border-zinc-800">
                  <span className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-[#DA121A]"></span>
                  <p className="text-sm font-bold uppercase tracking-tighter text-zinc-400 mb-1">Challenge</p>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm font-light leading-relaxed">{project.problem}</p>
                </div>
                <div className="relative pl-6 border-l-2 border-zinc-200 dark:border-zinc-800">
                  <span className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-[#078930]"></span>
                  <p className="text-sm font-bold uppercase tracking-tighter text-zinc-400 mb-1">Impact</p>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm font-light leading-relaxed">{project.solution}</p>
                </div>
              </div>

              <a href={project.liveUrl} className="text-zinc-900 dark:text-white font-bold inline-flex items-center space-x-2 group">
                <span className="border-b-2 border-transparent group-hover:border-[#FCDC04] transition-all">Visit Platform</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
