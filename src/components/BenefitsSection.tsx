import React from 'react';
import {
  Zap,
  Percent,
  Smartphone,
  GraduationCap,
  MessageSquare,
  ShieldCheck,
  ArrowRight,
  Check
} from 'lucide-react';

interface BenefitsSectionProps {
  onCtaClick: () => void;
  theme?: 'white' | 'purple';
}

export default function BenefitsSection({ onCtaClick, theme = 'white' }: BenefitsSectionProps) {
  const isWhite = theme === 'white';

  const benefits = [
    {
      icon: Zap,
      title: 'Desembolso Digital Inmediato',
      description: 'Recibe tu dinero en Nequi, Daviplata o cualquier banco en Colombia mediante PSE una vez aprobado.',
      badge: 'Respuesta en 15 min',
    },
    {
      icon: Percent,
      title: 'Tasa Fija Garantizada (1.5% E.A)',
      description: 'Sin cambios en tus cuotas ni letras pequeñas. Tasa preferencial fija durante todo el periodo.',
      badge: 'Transparencia Total',
    },
    {
      icon: Smartphone,
      title: '100% Digital y Sin Papeleo',
      description: 'Realiza todo el proceso desde tu celular o computador sin salir de casa ni presentar papeles físicos.',
      badge: 'Sin Filas',
    },
    {
      icon: GraduationCap,
      title: 'Libre Inversión o Educación',
      description: 'Úsalo para matrículas educativas, emergencias, compras o proyectos personales con total libertad.',
      badge: 'Multiproposito',
    },
    {
      icon: MessageSquare,
      title: 'Atención Directa vía WhatsApp',
      description: 'Un equipo de asesores humanos en Colombia disponible para resolver todas tus dudas en tiempo real.',
      badge: 'Soporte 24/7',
    },
    {
      icon: ShieldCheck,
      title: 'Plataforma Segura e Inclusiva',
      description: 'Encriptación SSL de nivel bancario. Protegemos tus datos y facilitamos el acceso al crédito justo.',
      badge: 'Fintech Oficial',
    },
  ];

  return (
    <section id="beneficios" className="py-20 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Badge & Title */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <div
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-bold tracking-wider uppercase shadow-xs ${
              isWhite
                ? 'bg-[#820ad1]/10 border-[#820ad1]/20 text-[#820ad1]'
                : 'bg-white/10 border-white/20 text-purple-100'
            }`}
          >
            <Check className="w-3.5 h-3.5 text-emerald-500" />
            <span>Ventajas Exclusivas</span>
          </div>

          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight leading-tight ${
              isWhite ? 'text-slate-900' : 'text-white'
            }`}
          >
            ¿Por qué elegir{' '}
            <span
              className={`px-3 py-1 rounded-2xl inline-block ${
                isWhite
                  ? 'bg-[#820ad1] text-white shadow-lg shadow-[#820ad1]/20'
                  : 'bg-white text-[#820ad1]'
              }`}
            >
              CrediULEP
            </span>
            ?
          </h2>

          <p
            className={`text-base md:text-lg leading-relaxed ${
              isWhite ? 'text-slate-600' : 'text-purple-100/90'
            }`}
          >
            Diseñamos una experiencia crediticia transparente, rápida y sin trabas administrativas para que cumplas tus metas hoy.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className={`p-7 rounded-[28px] transition-all hover:-translate-y-1 flex flex-col justify-between group border ${
                  isWhite
                    ? 'bg-white border-slate-200/90 hover:border-[#820ad1]/50 shadow-lg shadow-purple-900/5'
                    : 'bg-white/10 backdrop-blur-xl border-white/20 hover:border-white/40 shadow-lg shadow-black/10'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform bg-[#820ad1] text-white">
                      <Icon className="w-6 h-6" />
                    </div>

                    <span
                      className={`text-[10px] font-bold px-3 py-1 rounded-full border uppercase tracking-wider ${
                        isWhite
                          ? 'bg-[#820ad1]/10 text-[#820ad1] border-[#820ad1]/20'
                          : 'bg-white/15 text-white border-white/20'
                      }`}
                    >
                      {benefit.badge}
                    </span>
                  </div>

                  <h3
                    className={`text-xl font-bold font-display ${
                      isWhite ? 'text-slate-900' : 'text-white'
                    }`}
                  >
                    {benefit.title}
                  </h3>

                  <p
                    className={`text-xs leading-relaxed font-normal ${
                      isWhite ? 'text-slate-600' : 'text-purple-100/80'
                    }`}
                  >
                    {benefit.description}
                  </p>
                </div>

                <div
                  className={`pt-6 mt-4 border-t flex items-center text-xs font-bold transition-colors ${
                    isWhite
                      ? 'border-slate-100 text-[#820ad1] group-hover:text-[#6d08b1]'
                      : 'border-white/10 text-purple-200 group-hover:text-white'
                  }`}
                >
                  <span>Conocer más sobre {benefit.title.split(' ')[0]}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action Button in Benefits Section */}
        <div className="mt-14 text-center">
          <button
            onClick={onCtaClick}
            className={`inline-flex items-center gap-3 px-10 py-4.5 font-extrabold text-sm rounded-full transition-all cursor-pointer group ${
              isWhite
                ? 'bg-[#820ad1] hover:bg-[#6d08b1] text-white shadow-2xl shadow-[#820ad1]/30 hover:-translate-y-0.5'
                : 'bg-white hover:bg-slate-100 text-[#820ad1] shadow-2xl shadow-black/30 hover:-translate-y-0.5'
            }`}
          >
            <span>Obtener Pre-Aprobación con estos Beneficios</span>
            <ArrowRight
              className={`w-4 h-4 group-hover:translate-x-1 transition-transform ${
                isWhite ? 'text-white' : 'text-[#820ad1]'
              }`}
            />
          </button>
        </div>
      </div>
    </section>
  );
}

