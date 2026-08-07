import React from 'react';
import { Building2, Award, Handshake } from 'lucide-react';

interface AgreementsSectionProps {
  theme?: 'white' | 'purple';
}

export default function AgreementsSection({ theme = 'white' }: AgreementsSectionProps) {
  const isWhite = theme === 'white';

  const convenios = [
    {
      name: 'FUNDACIÓN ULEP',
      subtitle: 'Convenio Educativo y Social',
      description: 'Respaldo institucional para líneas de crédito educativo, becas y becas-crédito preferenciales.',
    },
    {
      name: 'GROUP ULEP',
      subtitle: 'Aliado Tecnológico y Financiero',
      description: 'Estructuración y garantía de procesos Fintech con acompañamiento continuo en Colombia.',
    },
  ];

  return (
    <section className="py-8 relative">
      <div className="max-w-5xl mx-auto px-6">
        <div
          className={`rounded-[32px] p-6 md:p-8 shadow-xl transition-all ${
            isWhite
              ? 'bg-white border border-slate-200/90 shadow-purple-900/5 text-slate-900'
              : 'bg-white/10 backdrop-blur-xl border border-white/20 shadow-black/15 text-white'
          }`}
        >
          {/* Header */}
          <div
            className={`flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b text-center md:text-left ${
              isWhite ? 'border-slate-200' : 'border-white/15'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-md ${
                  isWhite ? 'bg-[#820ad1] text-white' : 'bg-white text-[#820ad1]'
                }`}
              >
                <Handshake className="w-5 h-5" />
              </div>
              <div>
                <span
                  className={`text-[10px] font-extrabold uppercase tracking-widest block ${
                    isWhite ? 'text-[#820ad1]' : 'text-purple-200'
                  }`}
                >
                  Respaldo Institucional
                </span>
                <h3
                  className={`text-lg md:text-xl font-bold font-display ${
                    isWhite ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  Convenios y Alianzas Estratégicas
                </h3>
              </div>
            </div>
            <span
              className={`text-xs font-semibold px-3.5 py-1.5 rounded-full border ${
                isWhite
                  ? 'text-slate-700 bg-slate-100 border-slate-200'
                  : 'text-purple-100 bg-white/15 border-white/20'
              }`}
            >
              Cobertura Nacional Colombia
            </span>
          </div>

          {/* Convenios Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
            {convenios.map((item, idx) => (
              <div
                key={idx}
                className={`border rounded-2xl p-5 transition-all flex items-start gap-4 group ${
                  isWhite
                    ? 'bg-slate-50/80 border-slate-200 hover:border-[#820ad1]/40'
                    : 'bg-white/10 border-white/20 hover:border-white/40'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform ${
                    isWhite
                      ? 'bg-[#820ad1]/10 text-[#820ad1]'
                      : 'bg-purple-200/20 text-white'
                  }`}
                >
                  {idx === 0 ? <Award className="w-5 h-5" /> : <Building2 className="w-5 h-5" />}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4
                      className={`text-base font-extrabold font-display tracking-tight ${
                        isWhite ? 'text-slate-900' : 'text-white'
                      }`}
                    >
                      {item.name}
                    </h4>
                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded-md uppercase ${
                        isWhite
                          ? 'bg-[#820ad1] text-white'
                          : 'bg-white text-[#820ad1]'
                      }`}
                    >
                      Convenio Activo
                    </span>
                  </div>
                  <p
                    className={`text-xs font-semibold ${
                      isWhite ? 'text-[#820ad1]' : 'text-purple-200'
                    }`}
                  >
                    {item.subtitle}
                  </p>
                  <p
                    className={`text-[11px] leading-relaxed pt-1 ${
                      isWhite ? 'text-slate-600' : 'text-purple-100/80'
                    }`}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
