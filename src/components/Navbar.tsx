import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, LogIn, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  onJoinClick: () => void;
  activeSection?: string;
  theme?: 'white' | 'purple';
  onToggleTheme?: () => void;
}

export default function Navbar({ onJoinClick, theme = 'white', onToggleTheme }: NavbarProps) {
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

  const isWhite = theme === 'white';

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? isWhite
            ? 'bg-white/90 backdrop-blur-xl border-b border-slate-200/80 shadow-md shadow-slate-900/5 py-3.5'
            : 'bg-[#4c0677]/90 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20 py-3.5'
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
            <span
              className={`font-display text-2xl font-black tracking-tight ${
                isWhite ? 'text-[#820ad1]' : 'text-white'
              }`}
            >
              Credi<span className={isWhite ? 'text-[#4c0677]' : 'text-purple-200'}>ULEP</span>
            </span>
            <span
              className={`block text-[9px] font-bold tracking-widest uppercase ${
                isWhite ? 'text-[#820ad1]' : 'text-purple-200'
              }`}
            >
              Colombia Fintech
            </span>
          </div>
        </button>

        {/* Desktop Links */}
        <div
          className={`hidden md:flex items-center gap-7 px-6 py-2 rounded-full border shadow-xs backdrop-blur-md ${
            isWhite
              ? 'bg-white/80 border-slate-200/80 text-slate-800'
              : 'bg-white/10 border-white/20 text-white'
          }`}
        >
          <button
            onClick={() => scrollToSection('inicio')}
            className={`text-xs font-bold transition-colors cursor-pointer ${
              isWhite ? 'text-slate-700 hover:text-[#820ad1]' : 'text-white hover:text-purple-200'
            }`}
          >
            Inicio
          </button>
          <button
            onClick={() => scrollToSection('beneficios')}
            className={`text-xs font-bold transition-colors cursor-pointer ${
              isWhite ? 'text-slate-700 hover:text-[#820ad1]' : 'text-white hover:text-purple-200'
            }`}
          >
            Beneficios
          </button>
          <button
            onClick={() => scrollToSection('solicitud')}
            className={`text-xs font-bold transition-colors cursor-pointer ${
              isWhite ? 'text-slate-700 hover:text-[#820ad1]' : 'text-white hover:text-purple-200'
            }`}
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
            className={`px-4 py-2.5 rounded-full border font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer ${
              isWhite
                ? 'border-[#820ad1] text-[#820ad1] hover:bg-[#820ad1] hover:text-white'
                : 'border-white/30 hover:border-white text-white hover:bg-white/10'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            Iniciar sesión
          </a>
        </div>

        {/* Mobile Controls */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`p-2 rounded-xl transition-colors ${
              isWhite ? 'text-[#820ad1] hover:bg-purple-50' : 'text-white hover:bg-white/10'
            }`}
            aria-label="Abrir menú"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div
          className={`md:hidden absolute top-full left-0 right-0 border-b shadow-2xl px-6 py-6 flex flex-col gap-4 animate-in fade-in duration-200 ${
            isWhite
              ? 'bg-white/95 backdrop-blur-2xl border-slate-200 text-slate-800'
              : 'bg-[#4c0677]/95 backdrop-blur-2xl border-white/10 text-white'
          }`}
        >
          <button
            onClick={() => scrollToSection('inicio')}
            className={`text-left font-bold py-1 ${
              isWhite ? 'text-slate-800 hover:text-[#820ad1]' : 'text-white hover:text-purple-200'
            }`}
          >
            Inicio
          </button>
          <button
            onClick={() => scrollToSection('beneficios')}
            className={`text-left font-bold py-1 ${
              isWhite ? 'text-slate-800 hover:text-[#820ad1]' : 'text-white hover:text-purple-200'
            }`}
          >
            Beneficios
          </button>
          <button
            onClick={() => scrollToSection('solicitud')}
            className={`text-left font-bold py-1 ${
              isWhite ? 'text-slate-800 hover:text-[#820ad1]' : 'text-white hover:text-purple-200'
            }`}
          >
            Pre-Aprobación Express
          </button>
          <hr className={isWhite ? 'border-slate-200' : 'border-white/10'} />

          <a
            href="https://groupulep.github.io/credito/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`w-full py-3 rounded-full border font-bold text-center flex items-center justify-center gap-2 text-xs ${
              isWhite
                ? 'border-[#820ad1] text-[#820ad1] hover:bg-purple-50'
                : 'border-white/30 text-white hover:bg-white/10'
            }`}
          >
            <LogIn className="w-4 h-4" />
            Iniciar sesión
          </a>
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onJoinClick();
            }}
            className={`w-full py-3 rounded-full font-bold text-center shadow-lg flex items-center justify-center gap-2 text-xs ${
              isWhite
                ? 'bg-[#820ad1] text-white'
                : 'bg-white text-[#820ad1]'
            }`}
          >
            Pre-Aprobación Express
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </nav>
  );
}

