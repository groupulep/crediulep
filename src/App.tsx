import React, { useState } from 'react';
import { LoanData } from './types';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AgreementsSection from './components/AgreementsSection';
import BenefitsSection from './components/BenefitsSection';
import WaitlistForm from './components/WaitlistForm';
import Footer from './components/Footer';

export default function App() {
  const [calculatorState, setCalculatorState] = useState<LoanData>({
    loanAmount: 15000000, // 15 Millones COP default
    loanTerm: 12,
  });

  const [activeTab, setActiveTab] = useState<'inicio' | 'beneficios' | 'solicitud'>('inicio');
  const [theme, setTheme] = useState<'white' | 'purple'>('white');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'white' ? 'purple' : 'white'));
  };

  const handleScrollToWaitlist = (loanOverride?: number) => {
    if (loanOverride !== undefined) {
      setCalculatorState((prev) => ({ ...prev, loanAmount: loanOverride }));
    }
    setActiveTab('solicitud');
    const element = document.getElementById('solicitud');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isWhite = theme === 'white';

  return (
    <div
      className={`min-h-screen font-sans scroll-smooth antialiased relative overflow-hidden transition-colors duration-500 ${
        isWhite
          ? 'bg-slate-50 text-slate-900 selection:bg-[#820ad1] selection:text-white'
          : 'bg-[#820ad1] text-white selection:bg-white selection:text-[#820ad1]'
      }`}
    >
      {/* Background Ambient Blurs */}
      {isWhite ? (
        <>
          <div className="absolute top-[-100px] right-[-100px] w-[600px] h-[600px] bg-purple-300/30 rounded-full filter blur-[140px] pointer-events-none -z-10" />
          <div className="absolute top-[30%] left-[-150px] w-[500px] h-[500px] bg-[#820ad1]/10 rounded-full filter blur-[130px] pointer-events-none -z-10" />
          <div className="absolute bottom-[20%] right-[-100px] w-[500px] h-[500px] bg-purple-200/40 rounded-full filter blur-[140px] pointer-events-none -z-10" />
        </>
      ) : (
        <>
          <div className="absolute top-[-100px] right-[-100px] w-[600px] h-[600px] bg-white/10 rounded-full filter blur-[140px] pointer-events-none -z-10" />
          <div className="absolute top-[30%] left-[-150px] w-[500px] h-[500px] bg-purple-400/20 rounded-full filter blur-[130px] pointer-events-none -z-10" />
          <div className="absolute bottom-[20%] right-[-100px] w-[500px] h-[500px] bg-white/10 rounded-full filter blur-[140px] pointer-events-none -z-10" />
        </>
      )}

      {/* Main Navbar */}
      <Navbar
        onJoinClick={() => handleScrollToWaitlist()}
        activeSection={activeTab}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Hero Section */}
      <HeroSection
        onCtaClick={() => handleScrollToWaitlist()}
        theme={theme}
      />

      {/* Agreements Box */}
      <AgreementsSection theme={theme} />

      {/* Benefits Section */}
      <BenefitsSection
        onCtaClick={() => handleScrollToWaitlist()}
        theme={theme}
      />

      {/* Pre-Aprobación Express Application Form */}
      <WaitlistForm
        initialLoanAmount={calculatorState.loanAmount}
        theme={theme}
      />

      {/* Footer */}
      <Footer theme={theme} />
    </div>
  );
}

