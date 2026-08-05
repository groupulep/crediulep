import React from 'react';
import { Building2, Award, Handshake } from 'lucide-react';

export default function AgreementsSection() {
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
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[32px] p-6 md:p-8 shadow-xl shadow-black/15">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-white/15 text-center md:text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white text-[#820ad1] flex items-center justify-center shrink-0 shadow-md">
                <Handshake className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold text-purple-200 uppercase tracking-widest block">
                  Respaldo Institucional
                </span>
                <h3 className="text-lg md:text-xl font-bold text-white font-display">
                  Convenios y Alianzas Estratégicas
                </h3>
              </div>
            </div>
            <span className="text-xs font-semibold text-purple-100 bg-white/15 px-3.5 py-1.5 rounded-full border border-white/20">
              Cobertura Nacional Colombia
            </span>
          </div>

          {/* Convenios Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
            {convenios.map((item, idx) => (
              <div
                key={idx}
                className="bg-white/10 border border-white/20 hover:border-white/40 rounded-2xl p-5 transition-all flex items-start gap-4 group"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-200/20 text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  {idx === 0 ? <Award className="w-5 h-5" /> : <Building2 className="w-5 h-5" />}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-extrabold text-white font-display tracking-tight">
                      {item.name}
                    </h4>
                    <span className="text-[9px] font-bold text-[#820ad1] bg-white px-2 py-0.5 rounded-md uppercase">
                      Convenio Activo
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-purple-200">
                    {item.subtitle}
                  </p>
                  <p className="text-[11px] text-purple-100/80 leading-relaxed pt-1">
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
