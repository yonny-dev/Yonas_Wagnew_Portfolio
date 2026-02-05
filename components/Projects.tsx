
/**
 * Projects / Portfolio Section
 * 
 * Showcases selected works with problem/solution narrative.
 */

import React from 'react';
import { motion as motionBase } from 'framer-motion';
import { Github, ExternalLink, ArrowRight } from 'lucide-react';
import { PROJECTS } from '../constants';

const motion = motionBase as any;

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-32 scroll-mt-32">
      <div className="flex items-center space-x-6 mb-8">
        <span className="h-[2px] w-12 bg-[#DA121A]"></span>
        <span className="text-[#DA121A] font-bold uppercase tracking-[0.3em] text-[10px]">Archive</span>
      </div>
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-20">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-tight text-zinc-900 dark:text-white">
          Selected <span className="text-zinc-400 dark:text-zinc-500">Case Studies</span>
        </h2>
        <a 
          href="https://github.com/yonny-dev" 
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center space-x-3 text-zinc-400 hover:text-black dark:hover:text-white transition-colors group mt-6 md:mt-0"
        >
          <span className="text-xs font-bold uppercase tracking-widest">Explore All</span>
          <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
        </a>
      </div>

      <div className="space-y-32">
        {PROJECTS.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${idx % 2 === 0 ? '' : 'lg:flex-row-reverse'}`}
          >
            <div className={`lg:col-span-7 ${idx % 2 === 0 ? '' : 'lg:order-2'}`}>
              <div className="group relative rounded-[40px] overflow-hidden glass-card aspect-[16/9] shadow-2xl">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 grayscale-[20%] group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-10">
                  <div className="flex space-x-4">
                    <a href={project.githubUrl} className="p-4 bg-white text-black rounded-2xl hover:bg-[#FCDC04] transition-colors shadow-2xl">
                      <Github size={24} />
                    </a>
                    <a href={project.liveUrl} className="p-4 bg-white text-black rounded-2xl hover:bg-[#FCDC04] transition-colors shadow-2xl">
                      <ExternalLink size={24} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className={`lg:col-span-5 ${idx % 2 === 0 ? '' : 'lg:order-1'}`}>
              <div className="flex flex-wrap gap-3 mb-8">
                {project.tags.map(tag => (
                  <span key={tag} className="px-4 py-1.5 text-[9px] font-bold uppercase tracking-widest bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-400 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="text-2xl md:text-3xl font-display font-bold mb-10 leading-tight text-zinc-900 dark:text-white">
                {project.title}
              </h3>
              
              <div className="space-y-8 mb-12">
                <div className="relative pl-6 border-l-4 border-zinc-100 dark:border-zinc-900">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-2">Challenge</p>
                  <p className="text-zinc-500 dark:text-zinc-400 text-sm font-light leading-relaxed">{project.problem}</p>
                </div>
                <div className="relative pl-6 border-l-4 border-zinc-100 dark:border-zinc-900">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-2">Impact</p>
                  <p className="text-zinc-500 dark:text-zinc-400 text-sm font-light leading-relaxed">{project.solution}</p>
                </div>
              </div>

              <a href={project.liveUrl} className="text-zinc-900 dark:text-white font-bold text-[10px] uppercase tracking-[0.3em] inline-flex items-center space-x-3 group">
                <span className="border-b-2 border-transparent group-hover:border-[#FCDC04] transition-all">Visit Platform</span>
                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
