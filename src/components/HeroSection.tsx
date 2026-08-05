import React from 'react';
import { ArrowRight, CheckCircle2, Clock } from 'lucide-react';

interface HeroSectionProps {
  onCtaClick: () => void;
}

export default function HeroSection({
  onCtaClick,
}: HeroSectionProps) {
  return (
    <section id="inicio" className="relative pt-24 pb-16 md:pt-32 md:pb-20 overflow-hidden bg-transparent text-white">
      {/* Background Decorative Blurs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-white/10 blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-400/20 blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/25 text-white text-xs font-bold tracking-wider uppercase shadow-sm">
          <span>Fintech CrediULEP Colombia</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight text-white leading-[1.15]">
          Pre-aprobación Express hasta{' '}
          <span className="bg-white text-[#820ad1] px-3 py-1 rounded-2xl font-black inline-block shadow-md">
            $15.000.000
          </span>{' '}
          con tasa fija del 2.5% mensual
        </h1>

        <p className="text-base md:text-lg text-purple-100 max-w-2xl mx-auto leading-relaxed">
          <strong className="text-white font-bold">CrediULEP Colombia</strong> te ofrece acceso inmediato a créditos personales y educativos de hasta <strong className="text-white bg-white/15 px-2 py-0.5 rounded-lg">$15.000.000</strong> sin trámites extensos, con aprobación digital inmediata y desembolsos directos por PSE, Nequi o Daviplata.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={onCtaClick}
            className="w-full sm:w-auto px-10 py-4.5 rounded-full bg-white hover:bg-slate-100 text-[#820ad1] font-extrabold text-base shadow-xl shadow-black/25 transition-all hover:-translate-y-0.5 text-center cursor-pointer flex items-center justify-center gap-2.5 group"
          >
            Solicitar Pre-Aprobación Express
            <ArrowRight className="w-5 h-5 text-[#820ad1] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Core high-level claims */}
        <div className="pt-8 border-t border-white/15 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 shadow-sm text-white">
            <p className="text-2xl md:text-3xl font-bold text-white font-display">2.5% mes</p>
            <p className="text-xs text-purple-200 font-semibold mt-1">Tasa Fija Preferencial</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 shadow-sm text-white">
            <p className="text-2xl md:text-3xl font-bold text-white font-display">Hasta $15M</p>
            <p className="text-xs text-purple-200 font-semibold mt-1">Monto Máximo</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 shadow-sm text-white">
            <p className="text-2xl md:text-3xl font-bold text-white font-display">15 min</p>
            <p className="text-xs text-purple-200 font-semibold mt-1">Respuesta 100% Digital</p>
          </div>
        </div>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-6 text-xs text-purple-100 font-semibold">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-white" />
            <span>Desembolso por PSE, Nequi o Daviplata</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-white" />
            <span>Sin costos de estudio de crédito</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-white" />
            <span>Aprobación digital express</span>
          </div>
        </div>
      </div>
    </section>
  );
}

