
/**
 * Footer & Legal Modal Component
 * 
 * Displays brand metadata, copyright, and legal information.
 * Uses React Portals for accessible and overflow-safe legal modals.
 * Features specific content for Privacy, Legal, and Terms as requested.
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion as motionBase, AnimatePresence } from 'framer-motion';
import { X, Shield, Scale, FileText } from 'lucide-react';
import ReactDOM from 'react-dom';

const motion = motionBase as any;

type FooterSection = 'privacy' | 'legal' | 'terms' | null;

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  icon: React.ReactNode;
  content: string;
}

/**
 * FooterModal Utility
 * Renders via React Portal to the root to bypass parent stacking contexts.
 * Implements keyboard ESC support and basic focus management.
 */
const FooterModal: React.FC<ModalProps> = ({ isOpen, onClose, title, icon, content }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      // Accessibility: Focus the modal when it opens
      setTimeout(() => {
        modalRef.current?.focus();
      }, 100);
    } else {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  const modalRoot = document.getElementById('root');
  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-10">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }} 
          onClick={onClose} 
          className="absolute inset-0 bg-black/80 backdrop-blur-md" 
          aria-hidden="true"
        />
        
        {/* Modal Container */}
        <motion.div 
          ref={modalRef}
          tabIndex={-1}
          initial={{ opacity: 0, scale: 0.95, y: 30 }} 
          animate={{ opacity: 1, scale: 1, y: 0 }} 
          exit={{ opacity: 0, scale: 0.95, y: 30 }} 
          role="dialog" 
          aria-modal="true"
          aria-labelledby="modal-title"
          className="relative w-full max-w-2xl glass-card rounded-[2rem] bg-white/95 dark:bg-zinc-950/95 shadow-2xl overflow-hidden border border-black/10 dark:border-white/10 outline-none"
        >
          {/* Header */}
          <div className="p-8 sm:p-12 pb-4">
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-[#FCDC04]">
                  {icon}
                </div>
                <div>
                  <h3 id="modal-title" className="text-2xl font-display font-bold text-zinc-900 dark:text-white">
                    {title}
                  </h3>
                  <div className="h-1 w-12 bg-[#078930] mt-1 rounded-full"></div>
                </div>
              </div>
              <button 
                onClick={onClose} 
                className="p-2 rounded-xl text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="px-8 sm:px-12 py-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
            <div className="space-y-6 text-zinc-600 dark:text-zinc-400 leading-relaxed font-light whitespace-pre-line text-lg">
              {content}
            </div>
          </div>

          {/* Footer */}
          <div className="p-8 sm:p-12 pt-6 border-t border-zinc-100 dark:border-zinc-900 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-2 text-zinc-400 dark:text-zinc-500 text-sm font-medium italic">
              <img 
                src="https://i.postimg.cc/s2DHMfs3/logo.jpg" 
                alt="Logo" 
                className="w-5 h-5 rounded-md grayscale opacity-50"
              />
              <span>© Yonas Wagnew — 2026</span>
            </div>
            <button 
              onClick={onClose} 
              className="px-6 py-2 rounded-full bg-black dark:bg-white text-white dark:text-black text-xs font-bold uppercase tracking-widest hover:opacity-80 transition-opacity"
            >
              Dismiss
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    modalRoot
  );
};

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [activeSection, setActiveSection] = useState<FooterSection>(null);

  // Content for legal sections as requested
  const sections = {
    privacy: { 
      title: 'Privacy Policy', 
      icon: <Shield size={24} />, 
      content: `This website respects your privacy.
      
No personal data is collected automatically.

Information submitted through the contact form (such as name, email, and message) is used only to respond to inquiries and is never shared with third parties.

This site may use basic analytics to understand traffic and improve user experience. No tracking is used for advertising purposes.` 
    },
    legal: { 
      title: 'Legal Notice', 
      icon: <Scale size={24} />, 
      content: `This website is a personal portfolio owned and maintained by Yonas Wagnew.

All content, including text, design, and code samples, is provided for demonstration purposes only.

Project logos, trademarks, and screenshots belong to their respective owners and are used solely to showcase development work.` 
    },
    terms: { 
      title: 'Terms of Use', 
      icon: <FileText size={24} />, 
      content: `By accessing this website, you agree to use the content for informational and professional evaluation purposes only.

You may not copy, redistribute, or use any content from this site without permission.

The website is provided ‘as is’ without warranties of any kind.` 
    }
  };

  return (
    <>
      <footer className="py-12 border-t border-zinc-100 dark:border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Brand Meta */}
        <div className="flex items-center space-x-6">
          <div className="flex space-x-1">
            <div className="w-3 h-3 rounded-full bg-[#078930]"></div>
            <div className="w-3 h-3 rounded-full bg-[#FCDC04]"></div>
            <div className="w-3 h-3 rounded-full bg-[#DA121A]"></div>
          </div>
          <p className="text-zinc-500 text-sm font-medium">&copy; {currentYear} Yonas Wagnew.</p>
        </div>

        {/* Legal Trigger Menu */}
        <div className="flex items-center space-x-8 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-zinc-400">
          <button 
            onClick={() => setActiveSection('privacy')} 
            className="hover:text-black dark:hover:text-white transition-colors relative group"
          >
            Privacy
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#078930] group-hover:w-full transition-all" />
          </button>
          <button 
            onClick={() => setActiveSection('legal')} 
            className="hover:text-black dark:hover:text-white transition-colors relative group"
          >
            Legal
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#FCDC04] group-hover:w-full transition-all" />
          </button>
          <button 
            onClick={() => setActiveSection('terms')} 
            className="hover:text-black dark:hover:text-white transition-colors relative group"
          >
            Terms
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#DA121A] group-hover:w-full transition-all" />
          </button>
        </div>

        <div className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest italic opacity-50">
          LET'S BUILD THE FUTURE
        </div>
      </footer>

      {/* Portal Container for Modal content */}
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

export default Footer;
