
/**
 * Footer & Legal Modal Component
 * 
 * Provides site-wide footer information and handles legal modals 
 * (Privacy, Legal, Terms) using React Portals and Framer Motion.
 */

import React, { useState, useEffect, useCallback, useRef } from 'react'; // Import React and hooks
import { motion, AnimatePresence } from 'framer-motion'; // Import motion for animations
import { X, Shield, Scale, FileText } from 'lucide-react'; // Import icons from lucide-react
import { createPortal } from 'react-dom'; // Import createPortal for rendering modals outside the main DOM tree

// Type definition for the active legal section
type FooterSection = 'privacy' | 'legal' | 'terms' | null;

// Interface for the FooterModal component props
interface ModalProps {
  isOpen: boolean; // Controls modal visibility
  onClose: () => void; // Function to close the modal
  title: string; // Modal heading
  icon: React.ReactNode; // Modal icon
  content: string; // Modal body text
}

/**
 * FooterModal Component
 * A reusable modal for legal content, rendered via React Portal.
 */
const FooterModal: React.FC<ModalProps> = ({ isOpen, onClose, title, icon, content }) => {
  const modalRef = useRef<HTMLDivElement>(null); // Reference for focus management
  const [mounted, setMounted] = useState(false); // Track if component is mounted for Portal safety

  useEffect(() => {
    setMounted(true); // Set mounted to true on client-side
  }, []);

  // Memoized function to handle Escape key press for accessibility
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    // Effect to manage body scroll and keyboard events when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
      window.addEventListener('keydown', handleKeyDown); // Listen for Escape key
      setTimeout(() => {
        modalRef.current?.focus(); // Focus modal for screen readers
      }, 100);
    } else {
      document.body.style.overflow = ''; // Restore background scrolling
      window.removeEventListener('keydown', handleKeyDown);
    }
    // Cleanup function to restore state on unmount
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  // Don't render if not mounted (prevents SSR issues with Portal)
  if (!mounted) return null;

  // Target element for the Portal
  const modalRoot = document.getElementById('root');
  if (!modalRoot) return null;

  // Render modal content into the Portal
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-8 sm:p-16">
          {/* Backdrop with blur and fade animation */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={onClose} // Close modal on backdrop click
            className="absolute inset-0 bg-black/80 backdrop-blur-md" 
            aria-hidden="true"
          />
          
          {/* Modal content container with entrance animation */}
          <motion.div 
            ref={modalRef}
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.95, y: 20 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            exit={{ opacity: 0, scale: 0.95, y: 20 }} 
            role="dialog" 
            aria-modal="true"
            className="relative w-full max-w-2xl glass-card rounded-[2.5rem] bg-white dark:bg-zinc-950 shadow-2xl overflow-hidden border border-black/5 dark:border-white/10 outline-none"
          >
            {/* Modal Header */}
            <div className="p-12 pb-6">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-5">
                  {/* Icon container */}
                  <div className="w-14 h-14 rounded-2xl bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center text-[#FCDC04]">
                    {icon && React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement<{ size?: number }>, { size: 28 }) : null}
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-bold text-zinc-900 dark:text-white">
                      {title}
                    </h3>
                    {/* Decorative underline */}
                    <div className="h-1 w-10 bg-[#078930] mt-1 rounded-full"></div>
                  </div>
                </div>
                {/* Close button */}
                <button onClick={onClose} className="p-3 text-zinc-400 hover:text-black dark:hover:text-white transition-all">
                  <X size={28} />
                </button>
              </div>
            </div>

            {/* Modal Body (Scrollable) with responsive padding */}
            <div className="px-8 md:px-12 py-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
              <div className="space-y-6 text-zinc-500 dark:text-zinc-400 leading-relaxed font-light text-sm whitespace-pre-line">
                {content}
              </div>
            </div>

            {/* Modal Footer with responsive padding */}
            <div className="p-8 md:p-12 pt-8 border-t border-zinc-100 dark:border-zinc-900 flex flex-col sm:flex-row justify-between items-center gap-6">
              <div className="flex items-center space-x-4 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                <span>© 2026 Yonas Wagnew</span>
              </div>
              <button onClick={onClose} className="px-8 py-3 rounded-xl bg-black dark:bg-white text-white dark:text-black text-[10px] font-bold uppercase tracking-[0.2em]">
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    modalRoot
  );
};

/**
 * Footer Component
 * Main site footer containing copyright and legal links.
 */
const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear(); // Get current year for copyright
  const [activeSection, setActiveSection] = useState<FooterSection>(null); // State for active legal modal

  // Content for legal sections
  const sections = {
    privacy: { 
      title: 'Privacy Policy', 
      icon: <Shield />, 
      content: `This website respects your privacy.

No personal data is collected automatically.

Information submitted through the contact form (such as name, email, and message) is used only to respond to inquiries and is never shared with third parties.

This site may use basic analytics to understand traffic and improve user experience. No tracking is used for advertising purposes.` 
    },
    legal: { 
      title: 'Legal Notice', 
      icon: <Scale />, 
      content: `This website is a personal portfolio owned and maintained by Yonas Wagnew.

All content, including text, design, and code samples, is provided for demonstration purposes only.

Project logos, trademarks, and screenshots belong to their respective owners and are used solely to showcase development work.` 
    },
    terms: { 
      title: 'Terms of Use', 
      icon: <FileText />, 
      content: `By accessing this website, you agree to use the content for informational and professional evaluation purposes only.

You may not copy, redistribute, or use any content from this site without permission.

The website is provided ‘as is’ without warranties of any kind.` 
    }
  };

  return (
    <>
      {/* Main footer container */}
      <footer className="py-20 border-t border-zinc-100 dark:border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-10">
        {/* Logo and Copyright */}
        <div className="flex items-center space-x-10">
          <span className="font-mono font-bold text-zinc-300 dark:text-zinc-700 text-xl select-none">
            &lt;/&gt;
          </span>
          <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest">&copy; {currentYear} Yonas Wagnew.</p>
        </div>

        {/* Legal Links */}
        <div className="flex items-center space-x-10 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
          <button onClick={() => setActiveSection('privacy')} className="hover:text-black dark:hover:text-white transition-colors relative group">
            Privacy
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FCDC04] group-hover:w-full transition-all"></span>
          </button>
          <button onClick={() => setActiveSection('legal')} className="hover:text-black dark:hover:text-white transition-colors relative group">
            Legal
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FCDC04] group-hover:w-full transition-all"></span>
          </button>
          <button onClick={() => setActiveSection('terms')} className="hover:text-black dark:hover:text-white transition-colors relative group">
            Terms
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FCDC04] group-hover:w-full transition-all"></span>
          </button>
        </div>

        {/* Tagline - Responsive font size for mobile fit */}
        <div className="text-zinc-400 text-[8px] md:text-[10px] font-bold uppercase tracking-[0.3em] opacity-40 italic">
          Your idea, my code, a full-stack solution
        </div>
      </footer>

      {/* Render the legal modal if a section is active */}
      <FooterModal
        isOpen={activeSection !== null}
        onClose={() => setActiveSection(null)}
        title={activeSection ? sections[activeSection].title : ''}
        icon={activeSection ? sections[activeSection].icon : null}
        content={activeSection ? sections[activeSection].content : ''}
      />
    </>
  );
};

export default Footer; // Export the Footer component
