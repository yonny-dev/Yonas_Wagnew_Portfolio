
/**
 * Contact & Connectivity Section
 * 
 * Implements a production-grade form with status management and Formspree integration.
 * Showcases accessibility-compliant inputs and high-fidelity feedback loops.
 */

import React, { useState } from 'react';
import { motion as motionBase } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { SOCIAL_LINKS } from '../constants';

const motion = motionBase as any;

const Contact: React.FC = () => {
  // tracks the lifecycle of the form submission
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  
  // Endpoint configuration for lead capture
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/xgoakbwg";

  /**
   * Form Submission Orchestrator
   * Handles validation, async POST request, and user feedback states.
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('submitting');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setFormState('success');
        (e.target as HTMLFormElement).reset();
      } else {
        setFormState('error');
      }
    } catch (error) {
      console.error("Submission error:", error);
      setFormState('error');
    }
  };

  return (
    <section id="contact" className="py-24 overflow-hidden scroll-mt-32">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
        
        {/* Connectivity Information Sidebar */}
        <motion.div 
          className="lg:col-span-5"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center space-x-4 mb-6">
            <span className="h-[1px] w-12 bg-zinc-200 dark:bg-zinc-800"></span>
            <span className="text-zinc-400 font-display font-bold uppercase tracking-widest text-sm">Connectivity</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 text-zinc-900 dark:text-white">Let's build <br /> <span className="text-[#FCDC04]">tomorrow's</span> web.</h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-lg font-light leading-relaxed mb-12 max-w-sm">
            Interested in collaboration or just want to chat about TypeScript architecture? My inbox is always open.
          </p>

          <div className="space-y-6">
            {SOCIAL_LINKS.map((link, idx) => (
              <motion.a key={link.platform} href={link.url}
                className="flex items-center space-x-4 group p-4 rounded-2xl glass-card transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center group-hover:bg-[#FCDC04] group-hover:text-black transition-all">
                  {link.icon}
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-zinc-400">{link.platform}</p>
                  <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{link.label}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Interactive Form Container */}
        <motion.div className="lg:col-span-7">
          <div className="p-10 glass-card rounded-3xl border-black/5 dark:border-white/10 relative overflow-hidden">
            <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-zinc-400 ml-4">Full Name</label>
                  <input type="text" name="name" required placeholder="Enter your name" className="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl px-6 py-4 outline-none focus:border-[#FCDC04] text-zinc-900 dark:text-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-zinc-400 ml-4">Email Address</label>
                  <input type="email" name="email" required placeholder="hello@company.com" className="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl px-6 py-4 outline-none focus:border-[#FCDC04] text-zinc-900 dark:text-white" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-400 ml-4">Message</label>
                <textarea name="message" rows={5} required placeholder="Tell me about your project..." className="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl px-6 py-4 outline-none focus:border-[#FCDC04] resize-none text-zinc-900 dark:text-white"></textarea>
              </div>

              {/* Dynamic Status-aware Submit Button */}
              <button 
                type="submit" 
                disabled={formState === 'submitting'}
                className={`w-full py-5 rounded-2xl font-bold flex items-center justify-center space-x-3 transition-all ${
                  formState === 'idle' || formState === 'error' ? 'bg-black dark:bg-white text-white dark:text-black hover:bg-zinc-800' : 'bg-green-600 text-white'
                }`}
              >
                {formState === 'idle' && <><span>Dispatch Message</span><Send size={18} /></>}
                {formState === 'submitting' && <div className="w-5 h-5 border-2 border-zinc-500 border-t-white rounded-full animate-spin"></div>}
                {formState === 'success' && <><span>Message Sent</span><CheckCircle2 size={18} /></>}
                {formState === 'error' && <><span>Failed. Retry?</span><AlertCircle size={18} /></>}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
