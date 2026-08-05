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
}

export default function BenefitsSection({ onCtaClick }: BenefitsSectionProps) {
  const benefits = [
    {
      icon: Zap,
      title: 'Desembolso Digital Inmediato',
      description: 'Recibe tu dinero en Nequi, Daviplata o cualquier banco en Colombia mediante PSE una vez aprobado.',
      badge: 'Respuesta en 15 min',
    },
    {
      icon: Percent,
      title: 'Tasa Fija Garantizada (2.5% mes)',
      description: 'Sin cambios en tus cuotas ni letras pequeñas. Tasa preferencial y mensual fija durante todo el periodo.',
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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-purple-100 text-xs font-bold tracking-wider uppercase shadow-sm">
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span>Ventajas Exclusivas</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
            ¿Por qué elegir <span className="bg-white text-[#820ad1] px-3 py-1 rounded-2xl inline-block">CrediULEP</span>?
          </h2>

          <p className="text-base md:text-lg text-purple-100/90 leading-relaxed">
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
                className="bg-white/10 backdrop-blur-xl border border-white/20 hover:border-white/40 p-7 rounded-[28px] transition-all hover:-translate-y-1 shadow-lg shadow-black/10 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-white text-[#820ad1] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold text-white bg-white/15 px-3 py-1 rounded-full border border-white/20 uppercase tracking-wider">
                      {benefit.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white font-display">
                    {benefit.title}
                  </h3>

                  <p className="text-xs text-purple-100/80 leading-relaxed font-normal">
                    {benefit.description}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-white/10 flex items-center text-xs font-bold text-purple-200 group-hover:text-white transition-colors">
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
            className="inline-flex items-center gap-3 px-10 py-4.5 bg-white hover:bg-slate-100 text-[#820ad1] font-extrabold text-sm rounded-full shadow-2xl shadow-black/30 hover:-translate-y-0.5 transition-all cursor-pointer group"
          >
            <span>Obtener Pre-Aprobación con estos Beneficios</span>
            <ArrowRight className="w-4 h-4 text-[#820ad1] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
