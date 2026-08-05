import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, LogIn } from 'lucide-react';

interface NavbarProps {
  onJoinClick: () => void;
  activeSection?: string;
}

export default function Navbar({ onJoinClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#4c0677]/90 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 group text-left cursor-pointer"
        >
          <div>
            <span className="font-display text-2xl font-black tracking-tight text-white">
              Credi<span className="text-purple-200">ULEP</span>
            </span>
            <span className="block text-[9px] text-purple-200 font-bold tracking-widest uppercase">Colombia Fintech</span>
          </div>
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-7 bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/20 shadow-sm">
          <button
            onClick={() => scrollToSection('inicio')}
            className="text-xs font-bold text-white hover:text-purple-200 transition-colors cursor-pointer"
          >
            Inicio
          </button>
          <button
            onClick={() => scrollToSection('beneficios')}
            className="text-xs font-bold text-white hover:text-purple-200 transition-colors cursor-pointer"
          >
            Beneficios
          </button>
          <button
            onClick={() => scrollToSection('solicitud')}
            className="text-xs font-bold text-white hover:text-purple-200 transition-colors cursor-pointer"
          >
            Pre-Aprobación Express
          </button>
        </div>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://groupulep.github.io/credito/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-full border border-white/30 hover:border-white text-white font-bold text-xs hover:bg-white/10 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <LogIn className="w-3.5 h-3.5 text-white" />
            Iniciar sesión
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-xl text-white hover:bg-white/10 transition-colors"
          aria-label="Abrir menú"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#4c0677]/95 backdrop-blur-2xl border-b border-white/10 shadow-2xl px-6 py-6 flex flex-col gap-4 animate-in fade-in duration-200 text-white">
          <button
            onClick={() => scrollToSection('inicio')}
            className="text-left font-bold text-white py-1 hover:text-purple-200"
          >
            Inicio
          </button>
          <button
            onClick={() => scrollToSection('beneficios')}
            className="text-left font-bold text-white py-1 hover:text-purple-200"
          >
            Beneficios
          </button>
          <button
            onClick={() => scrollToSection('solicitud')}
            className="text-left font-bold text-white py-1 hover:text-purple-200"
          >
            Pre-Aprobación Express
          </button>
          <hr className="border-white/10" />
          <a
            href="https://groupulep.github.io/credito/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-full py-3 rounded-full border border-white/30 text-white font-bold text-center hover:bg-white/10 flex items-center justify-center gap-2 text-xs"
          >
            <LogIn className="w-4 h-4 text-white" />
            Iniciar sesión
          </a>
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onJoinClick();
            }}
            className="w-full py-3 rounded-full bg-white text-[#820ad1] font-bold text-center shadow-lg shadow-black/20 flex items-center justify-center gap-2 text-xs"
          >
            Pre-Aprobación Express
            <ArrowRight className="w-4 h-4 text-[#820ad1]" />
          </button>
        </div>
      )}
    </nav>
  );
}

