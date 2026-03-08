
/**
 * Contact & Connectivity Section
 * 
 * Handles user inquiries via a Formspree-powered contact form and 
 * displays social media connectivity links.
 */

import React, { useState } from 'react'; // Import React and useState for form state management
import { motion } from 'framer-motion'; // Import motion for animations
import { Send, CheckCircle2, AlertCircle } from 'lucide-react'; // Import status icons
import { SOCIAL_LINKS } from '../constants'; // Import social link data

const Contact: React.FC = () => {
  // State to track the status of the form submission
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  // Formspree endpoint for handling form submissions
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/xgoakbwg";

  /**
   * Handles the form submission event.
   * Sends form data to Formspree and updates the UI state accordingly.
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default browser form submission
    setFormState('submitting'); // Update state to show loading indicator
    const formData = new FormData(e.currentTarget); // Extract form data
    const data = Object.fromEntries(formData.entries()); // Convert to plain object

    try {
      // Send POST request to Formspree
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      // Handle successful response
      if (response.ok) {
        setFormState('success');
        (e.target as HTMLFormElement).reset(); // Clear form fields
      } else {
        // Handle server-side error
        setFormState('error');
      }
    } catch (error) {
      // Handle network or client-side error
      setFormState('error');
    }
  };

  return (
    // Main section container with ID for navigation
    <section id="contact" className="py-32 overflow-hidden scroll-mt-32">
      {/* Grid layout: 1 column on mobile, 12-column grid on large screens */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
        {/* Left Column: Contact info and social links */}
        <motion.div 
          className="lg:col-span-5"
          initial={{ opacity: 0, x: -30 }} // Start invisible and to the left
          whileInView={{ opacity: 1, x: 0 }} // Fade in and slide to position
          transition={{ duration: 0.8 }} // 0.8s duration
          viewport={{ once: true }}
        >
          {/* Decorative line and section label */}
          <div className="flex items-center space-x-6 mb-8">
            <span className="h-[2px] w-12 bg-zinc-200 dark:bg-zinc-800"></span>
            <span className="text-zinc-400 font-bold uppercase tracking-[0.3em] text-[10px]">Network</span>
          </div>
          {/* Section heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-10 leading-tight text-zinc-900 dark:text-white">Let's build <br /> <span className="text-[#FCDC04]">complete</span> systems.</h2>
          {/* Short descriptive text */}
          <p className="text-zinc-500 dark:text-zinc-400 text-base font-light leading-relaxed mb-12 max-w-sm">
            Interested in collaboration or just want to chat about full-stack architecture and scalable engineering? My inbox is always open.
          </p>

          {/* Social media links grid */}
          <div className="flex flex-wrap gap-3 sm:gap-4">
            {SOCIAL_LINKS.map((link) => (
              // Individual social link with hover animation
              <motion.a 
                key={link.platform} 
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ y: -5 }} // Float up on hover
                className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl glass-card border-black/5 dark:border-white/10 flex items-center justify-center group hover:bg-[#FCDC04] hover:text-black transition-all shadow-xl"
                title={link.platform}
              >
                {/* Responsive icon sizing */}
                <div className="sm:hidden">
                  {React.cloneElement(link.icon as React.ReactElement<{ size?: number }>, { size: 18 })}
                </div>
                <div className="hidden sm:block">
                  {React.cloneElement(link.icon as React.ReactElement<{ size?: number }>, { size: 24 })}
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Right Column: Contact Form */}
        <motion.div className="lg:col-span-7">
          {/* Form container with glassmorphism effect and responsive padding */}
          <div className="p-8 md:p-14 glass-card rounded-[32px] md:rounded-[48px] border-black/5 dark:border-white/10 relative overflow-hidden">
            <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
              {/* Name and Email fields in a grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Name Input */}
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 ml-6">Full Name</label>
                  <input type="text" name="name" required placeholder="Name" className="w-full text-sm bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 rounded-3xl px-8 py-5 outline-none focus:border-[#FCDC04] text-zinc-900 dark:text-white shadow-sm" />
                </div>
                {/* Email Input */}
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 ml-6">Email Address</label>
                  <input type="email" name="email" required placeholder="Email" className="w-full text-sm bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 rounded-3xl px-8 py-5 outline-none focus:border-[#FCDC04] text-zinc-900 dark:text-white shadow-sm" />
                </div>
              </div>
              {/* Message Textarea */}
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 ml-6">Message</label>
                <textarea name="message" rows={5} required placeholder="Message" className="w-full text-sm bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 rounded-[32px] px-8 py-6 outline-none focus:border-[#FCDC04] resize-none text-zinc-900 dark:text-white shadow-sm"></textarea>
              </div>

              {/* Submit Button with dynamic state-based styling and content */}
              <button 
                type="submit" 
                disabled={formState === 'submitting'}
                className={`w-full py-6 rounded-3xl font-bold text-[10px] uppercase tracking-[0.3em] flex items-center justify-center space-x-3 transition-all transform hover:scale-[1.02] active:scale-95 shadow-2xl ${
                  formState === 'idle' || formState === 'error' ? 'bg-black dark:bg-white text-white dark:text-black hover:bg-zinc-800' : 'bg-green-600 text-white'
                }`}
              >
                {/* Show different content based on submission status */}
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

export default Contact; // Export the Contact component
