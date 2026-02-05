
/**
 * Footer & Legal Modal Component
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

const FooterModal: React.FC<ModalProps> = ({ isOpen, onClose, title, icon, content }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
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
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-8 sm:p-16">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }} 
          onClick={onClose} 
          className="absolute inset-0 bg-black/80 backdrop-blur-md" 
          aria-hidden="true"
        />
        
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
          <div className="p-12 pb-6">
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-5">
                <div className="w-14 h-14 rounded-2xl bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center text-[#FCDC04]">
                  {React.cloneElement(icon as React.ReactElement<{ size?: number }>, { size: 28 })}
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-zinc-900 dark:text-white">
                    {title}
                  </h3>
                  <div className="h-1 w-10 bg-[#078930] mt-1 rounded-full"></div>
                </div>
              </div>
              <button onClick={onClose} className="p-3 text-zinc-400 hover:text-black dark:hover:text-white transition-all">
                <X size={28} />
              </button>
            </div>
          </div>

          <div className="px-12 py-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
            <div className="space-y-6 text-zinc-500 dark:text-zinc-400 leading-relaxed font-light text-sm whitespace-pre-line">
              {content}
            </div>
          </div>

          <div className="p-12 pt-8 border-t border-zinc-100 dark:border-zinc-900 flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="flex items-center space-x-4 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
              <span>© 2026 Yonas Wagnew</span>
            </div>
            <button onClick={onClose} className="px-8 py-3 rounded-xl bg-black dark:bg-white text-white dark:text-black text-[10px] font-bold uppercase tracking-[0.2em]">
              Close
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
      <footer className="py-20 border-t border-zinc-100 dark:border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="flex items-center space-x-10">
          <span className="font-mono font-bold text-zinc-300 dark:text-zinc-700 text-xl select-none">
            &lt;/&gt;
          </span>
          <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest">&copy; {currentYear} Yonas Wagnew.</p>
        </div>

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

        <div className="text-zinc-400 text-[10px] font-bold uppercase tracking-[0.3em] opacity-40 italic">
          LET'S DIGITIZE EVERYTHING!
        </div>
      </footer>

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
