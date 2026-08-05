import React, { useState } from 'react';
import { LoanData } from './types';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AgreementsSection from './components/AgreementsSection';
import BenefitsSection from './components/BenefitsSection';
import WaitlistForm from './components/WaitlistForm';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

export default function App() {
  const [calculatorState, setCalculatorState] = useState<LoanData>({
    loanAmount: 15000000, // 15 Millones COP default
    loanTerm: 12,
  });

  const [activeTab, setActiveTab] = useState<'inicio' | 'beneficios' | 'solicitud'>('inicio');

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

  return (
    <div className="min-h-screen bg-[#820ad1] text-white font-sans selection:bg-white selection:text-[#820ad1] scroll-smooth antialiased relative overflow-hidden">
      {/* Background Ambient Blurs for Inverted Nu Purple Canvas */}
      <div className="absolute top-[-100px] right-[-100px] w-[600px] h-[600px] bg-white/10 rounded-full filter blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-[30%] left-[-150px] w-[500px] h-[500px] bg-purple-400/20 rounded-full filter blur-[130px] pointer-events-none -z-10" />
      <div className="absolute bottom-[20%] right-[-100px] w-[500px] h-[500px] bg-white/10 rounded-full filter blur-[140px] pointer-events-none -z-10" />

      {/* Main Navbar */}
      <Navbar
        onJoinClick={() => handleScrollToWaitlist()}
        activeSection={activeTab}
      />

      {/* Hero Section */}
      <HeroSection
        onCtaClick={() => handleScrollToWaitlist()}
      />

      {/* Agreements Box */}
      <AgreementsSection />

      {/* Benefits Section */}
      <BenefitsSection
        onCtaClick={() => handleScrollToWaitlist()}
      />

      {/* Pre-Aprobación Express Application Form */}
      <WaitlistForm
        initialLoanAmount={calculatorState.loanAmount}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}

