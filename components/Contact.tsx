
/**
 * Contact & Connectivity Section
 */

import React, { useState } from 'react';
import { motion as motionBase } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { SOCIAL_LINKS } from '../constants';

const motion = motionBase as any;

const Contact: React.FC = () => {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/xgoakbwg";

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
      setFormState('error');
    }
  };

  return (
    <section id="contact" className="py-32 overflow-hidden scroll-mt-32">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
        <motion.div 
          className="lg:col-span-5"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center space-x-6 mb-8">
            <span className="h-[2px] w-12 bg-zinc-200 dark:bg-zinc-800"></span>
            <span className="text-zinc-400 font-bold uppercase tracking-[0.3em] text-[10px]">Network</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-10 leading-tight text-zinc-900 dark:text-white">Let's build <br /> <span className="text-[#FCDC04]">tomorrow's</span> web.</h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-base font-light leading-relaxed mb-12 max-w-sm">
            Interested in collaboration or just want to chat about TypeScript architecture? My inbox is always open.
          </p>

          <div className="space-y-6">
            {SOCIAL_LINKS.map((link) => (
              <motion.a key={link.platform} href={link.url}
                className="flex items-center space-x-6 group p-5 rounded-3xl glass-card transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center group-hover:bg-[#FCDC04] group-hover:text-black transition-all">
                  {React.cloneElement(link.icon as React.ReactElement<{ size?: number }>, { size: 24 })}
                </div>
                <div>
                  <p className="text-[9px] uppercase font-bold tracking-[0.2em] text-zinc-400">{link.platform}</p>
                  <p className="text-sm font-semibold text-zinc-600 dark:text-zinc-300">{link.label}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        <motion.div className="lg:col-span-7">
          <div className="p-10 md:p-14 glass-card rounded-[48px] border-black/5 dark:border-white/10 relative overflow-hidden">
            <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 ml-6">Full Name</label>
                  <input type="text" name="name" required placeholder="Name" className="w-full text-sm bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 rounded-3xl px-8 py-5 outline-none focus:border-[#FCDC04] text-zinc-900 dark:text-white shadow-sm" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 ml-6">Email Address</label>
                  <input type="email" name="email" required placeholder="Email" className="w-full text-sm bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 rounded-3xl px-8 py-5 outline-none focus:border-[#FCDC04] text-zinc-900 dark:text-white shadow-sm" />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 ml-6">Message</label>
                <textarea name="message" rows={5} required placeholder="Message" className="w-full text-sm bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 rounded-[32px] px-8 py-6 outline-none focus:border-[#FCDC04] resize-none text-zinc-900 dark:text-white shadow-sm"></textarea>
              </div>

              <button 
                type="submit" 
                disabled={formState === 'submitting'}
                className={`w-full py-6 rounded-3xl font-bold text-[10px] uppercase tracking-[0.3em] flex items-center justify-center space-x-3 transition-all transform hover:scale-[1.02] active:scale-95 shadow-2xl ${
                  formState === 'idle' || formState === 'error' ? 'bg-black dark:bg-white text-white dark:text-black hover:bg-zinc-800' : 'bg-green-600 text-white'
                }`}
              >
                {formState === 'idle' && <><span>Dispatch Message</span><Send size={20} /></>}
                {formState === 'submitting' && <div className="w-6 h-6 border-2 border-zinc-500 border-t-white rounded-full animate-spin"></div>}
                {formState === 'success' && <><span>Message Sent</span><CheckCircle2 size={20} /></>}
                {formState === 'error' && <><span>Failed. Retry?</span><AlertCircle size={20} /></>}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
