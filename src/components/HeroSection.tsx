import React from 'react';
import { ArrowRight, CheckCircle2, Clock } from 'lucide-react';

interface HeroSectionProps {
  onCtaClick: () => void;
  theme?: 'white' | 'purple';
}

export default function HeroSection({
  onCtaClick,
  theme = 'white',
}: HeroSectionProps) {
  const isWhite = theme === 'white';

  return (
    <section
      id="inicio"
      className={`relative pt-24 pb-16 md:pt-32 md:pb-20 overflow-hidden bg-transparent ${
        isWhite ? 'text-slate-900' : 'text-white'
      }`}
    >
      {/* Background Decorative Blurs */}
      <div
        className={`absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl -z-10 pointer-events-none ${
          isWhite ? 'bg-purple-300/20' : 'bg-white/10'
        }`}
      />
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl -z-10 pointer-events-none ${
          isWhite ? 'bg-[#820ad1]/10' : 'bg-purple-400/20'
        }`}
      />

      <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
        <h1
          className={`text-4xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight leading-[1.15] ${
            isWhite ? 'text-slate-900' : 'text-white'
          }`}
        >
          Pre-aprobación Express hasta{' '}
          <span
            className={`px-3 py-1 rounded-2xl font-black inline-block shadow-md ${
              isWhite
                ? 'bg-[#820ad1] text-white shadow-[#820ad1]/20'
                : 'bg-white text-[#820ad1]'
            }`}
          >
            $15.000.000
          </span>{' '}
          con tasa fija del 1.5% E.A
        </h1>

        <p
          className={`text-base md:text-lg max-w-2xl mx-auto leading-relaxed ${
            isWhite ? 'text-slate-600' : 'text-purple-100'
          }`}
        >
          <strong className={isWhite ? 'text-[#820ad1] font-extrabold' : 'text-white font-bold'}>
            CrediULEP Colombia
          </strong>{' '}
          te ofrece acceso inmediato a créditos personales y educativos de hasta{' '}
          <strong
            className={`px-2 py-0.5 rounded-lg ${
              isWhite ? 'text-[#820ad1] bg-[#820ad1]/10' : 'text-white bg-white/15'
            }`}
          >
            $15.000.000
          </strong>{' '}
          sin trámites extensos, con aprobación digital inmediata y desembolsos directos por PSE, Nequi o Daviplata.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={onCtaClick}
            className={`w-full sm:w-auto px-10 py-4.5 rounded-full font-extrabold text-base transition-all hover:-translate-y-0.5 text-center cursor-pointer flex items-center justify-center gap-2.5 group ${
              isWhite
                ? 'bg-[#820ad1] hover:bg-[#6d08b1] text-white shadow-xl shadow-[#820ad1]/25'
                : 'bg-white hover:bg-slate-100 text-[#820ad1] shadow-xl shadow-black/25'
            }`}
          >
            Solicitar Pre-Aprobación Express
            <ArrowRight
              className={`w-5 h-5 group-hover:translate-x-1 transition-transform ${
                isWhite ? 'text-white' : 'text-[#820ad1]'
              }`}
            />
          </button>
        </div>

        {/* Core high-level claims */}
        <div
          className={`pt-8 border-t grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto ${
            isWhite ? 'border-slate-200' : 'border-white/15'
          }`}
        >
          <div
            className={`p-4 rounded-2xl border shadow-sm transition-all ${
              isWhite
                ? 'bg-white border-slate-200/90 shadow-purple-900/5 text-slate-900'
                : 'bg-white/10 border-white/20 text-white backdrop-blur-md'
            }`}
          >
            <p
              className={`text-2xl md:text-3xl font-bold font-display ${
                isWhite ? 'text-[#820ad1]' : 'text-white'
              }`}
            >
              1.5% E.A
            </p>
            <p
              className={`text-xs font-semibold mt-1 ${
                isWhite ? 'text-slate-500' : 'text-purple-200'
              }`}
            >
              Tasa Fija Preferencial
            </p>
          </div>
          <div
            className={`p-4 rounded-2xl border shadow-sm transition-all ${
              isWhite
                ? 'bg-white border-slate-200/90 shadow-purple-900/5 text-slate-900'
                : 'bg-white/10 border-white/20 text-white backdrop-blur-md'
            }`}
          >
            <p
              className={`text-2xl md:text-3xl font-bold font-display ${
                isWhite ? 'text-[#820ad1]' : 'text-white'
              }`}
            >
              Hasta $15M
            </p>
            <p
              className={`text-xs font-semibold mt-1 ${
                isWhite ? 'text-slate-500' : 'text-purple-200'
              }`}
            >
              Monto Máximo
            </p>
          </div>
          <div
            className={`p-4 rounded-2xl border shadow-sm transition-all ${
              isWhite
                ? 'bg-white border-slate-200/90 shadow-purple-900/5 text-slate-900'
                : 'bg-white/10 border-white/20 text-white backdrop-blur-md'
            }`}
          >
            <p
              className={`text-2xl md:text-3xl font-bold font-display ${
                isWhite ? 'text-[#820ad1]' : 'text-white'
              }`}
            >
              15 min
            </p>
            <p
              className={`text-xs font-semibold mt-1 ${
                isWhite ? 'text-slate-500' : 'text-purple-200'
              }`}
            >
              Respuesta 100% Digital
            </p>
          </div>
        </div>

        <div
          className={`pt-2 flex flex-wrap items-center justify-center gap-6 text-xs font-semibold ${
            isWhite ? 'text-slate-600' : 'text-purple-100'
          }`}
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className={`w-4 h-4 ${isWhite ? 'text-[#820ad1]' : 'text-white'}`} />
            <span>Desembolso por PSE, Nequi o Daviplata</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className={`w-4 h-4 ${isWhite ? 'text-[#820ad1]' : 'text-white'}`} />
            <span>Sin costos de estudio de crédito</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className={`w-4 h-4 ${isWhite ? 'text-[#820ad1]' : 'text-white'}`} />
            <span>Aprobación digital express</span>
          </div>
        </div>
      </div>
    </section>
  );
}


