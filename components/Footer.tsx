
/**
 * Footer & Legal Modal Component
 * 
 * Displays brand metadata, copyright, and legal information.
 * Uses React Portals for accessible and overflow-safe legal modals.
 */

import React, { useState, useEffect, useCallback } from 'react';
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
 * Implements keyboard ESC support and body scroll locking.
 */
const FooterModal: React.FC<ModalProps> = ({ isOpen, onClose, title, icon, content }) => {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
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
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 sm:p-10">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} role="dialog" className="relative w-full max-w-2xl glass-card rounded-[2.5rem] bg-white/90 dark:bg-zinc-950/90 shadow-2xl overflow-hidden">
          <div className="p-8 sm:p-12">
            <div className="flex justify-between items-start mb-10">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-[#FCDC04]">{icon}</div>
                <h3 className="text-2xl font-display font-bold text-zinc-900 dark:text-white">{title}</h3>
              </div>
              <button onClick={onClose} className="p-2 rounded-xl text-zinc-400 hover:text-zinc-900 dark:hover:text-white"><X size={24} /></button>
            </div>
            <div className="space-y-6 text-zinc-600 dark:text-zinc-400 leading-relaxed font-light mb-12 whitespace-pre-line">{content}</div>
            <button onClick={onClose} className="text-xs font-bold uppercase tracking-widest text-zinc-900 dark:text-white hover:text-[#FCDC04]">Dismiss</button>
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

  // Content for legal sections
  const sections = {
    privacy: { title: 'Privacy Policy', icon: <Shield size={24} />, content: `No personal data is collected automatically.` },
    legal: { title: 'Legal Notice', icon: <Scale size={24} />, content: `This website is owned and maintained by Yonas Wagnew.` },
    terms: { title: 'Terms of Use', icon: <FileText size={24} />, content: `Use content for informational purposes only.` }
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
        <div className="flex items-center space-x-8 text-xs font-bold uppercase tracking-widest text-zinc-400">
          <button onClick={() => setActiveSection('privacy')} className="hover:text-black dark:hover:text-white">Privacy</button>
          <button onClick={() => setActiveSection('legal')} className="hover:text-black dark:hover:text-white">Legal</button>
          <button onClick={() => setActiveSection('terms')} className="hover:text-black dark:hover:text-white">Terms</button>
        </div>

        <div className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest italic">LET'S BUILD!</div>
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
