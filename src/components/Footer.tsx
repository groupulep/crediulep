import React, { useState } from 'react';
import { ShieldCheck, X } from 'lucide-react';

interface FooterProps {
  theme?: 'white' | 'purple';
}

export default function Footer({ theme = 'white' }: FooterProps) {
  const isWhite = theme === 'white';
  const currentYear = new Date().getFullYear();
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const handleLegalClick = (e: React.MouseEvent, docName: string) => {
    e.preventDefault();
    setActiveModal(docName);
  };

  return (
    <footer
      className={`pt-16 pb-12 relative overflow-hidden border-t transition-colors ${
        isWhite
          ? 'bg-slate-950 text-white border-slate-800'
          : 'bg-[#190028] text-white border-[#820ad1]/30'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div
          className={`grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 pb-12 border-b ${
            isWhite ? 'border-slate-800' : 'border-[#820ad1]/20'
          }`}
        >
          {/* Brand Col - 5 Cols */}
          <div className="md:col-span-5 space-y-5">
            <div className="flex items-center gap-3">
              <div>
                <span className="font-display text-2xl font-black tracking-tight text-white">
                  Credi<span className="text-[#a84ee6]">ULEP</span>
                </span>
                <span className="block text-[9px] text-[#a84ee6] font-bold tracking-widest uppercase">Colombia Fintech</span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-purple-200/80 pt-2">
              <ShieldCheck className="w-5 h-5 text-[#a84ee6] shrink-0" />
              <span className="text-xs font-semibold text-purple-200/80">Trámites Digitales Seguros con Cifrado AES-256 y SSL</span>
            </div>
          </div>

          {/* Links - 3 Cols */}
          <div className="md:col-span-3 space-y-3.5">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#a84ee6]">Navegación</h4>
            <ul className="space-y-2 text-xs text-purple-200/70 font-bold">
              <li>
                <a href="#inicio" className="hover:text-white transition-colors">Inicio</a>
              </li>
              <li>
                <a href="#beneficios" className="hover:text-white transition-colors">Beneficios</a>
              </li>
              <li>
                <a
                  href="https://groupulep.github.io/BANKULEP/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors text-purple-300 font-extrabold flex items-center gap-1 mt-1"
                >
                  Iniciar sesión →
                </a>
              </li>
            </ul>
          </div>

          {/* Legal and Disclaimer - 4 Cols */}
          <div className="md:col-span-4 space-y-3.5">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#a84ee6]">Aviso Regulatorio</h4>
            <p className="text-xs text-purple-200/50 leading-relaxed">
              CrediULEP Colombia opera como plataforma digital de crédito. Operaciones de financiamiento directo con tasa de interés fija mensual.
            </p>
            <div className="pt-2 flex flex-wrap gap-x-4 gap-y-2">
              <button
                onClick={(e) => handleLegalClick(e, 'Aviso de Privacidad')}
                className="text-xs text-purple-300 hover:text-white font-bold cursor-pointer"
              >
                Privacidad
              </button>
              <button
                onClick={(e) => handleLegalClick(e, 'Términos y Condiciones')}
                className="text-xs text-purple-300 hover:text-white font-bold cursor-pointer"
              >
                Términos
              </button>
              <button
                onClick={(e) => handleLegalClick(e, 'Metodología Tasa Fija 1.5% E.A.')}
                className="text-xs text-purple-300 hover:text-white font-bold cursor-pointer"
              >
                Metodología Tasa Fija 1.5% E.A.
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-purple-300/40 font-semibold">
          <span>&copy; {currentYear} software GROUP ULEP S.A.S. Todos los derechos reservados.</span>
        </div>
      </div>

      {/* Legal Modal */}
      {activeModal && (
        <div className="fixed inset-0 bg-[#190028]/80 backdrop-blur-md z-50 flex items-center justify-center p-6 animate-in fade-in duration-200">
          <div className="bg-white max-w-md w-full rounded-[32px] p-6 text-[#191919] space-y-4 shadow-2xl relative border border-[#820ad1]/20">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-[#191919] transition-colors cursor-pointer"
              aria-label="Cerrar modal"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="space-y-1">
              <span className="text-[10px] text-[#820ad1] font-extrabold uppercase tracking-wider block">Documentación Fintech Colombia</span>
              <h3 className="font-display font-black text-xl">{activeModal}</h3>
            </div>
            {activeModal === 'Aviso de Privacidad' && (
              <div className="space-y-2 text-xs text-slate-600 leading-relaxed max-h-72 overflow-y-auto pr-1">
                <p>
                  <strong>Responsable del Tratamiento:</strong> GROUP ULEP S.A.S. (NIT y personería en Colombia). En cumplimiento de la Ley Estatutaria 1581 de 2012 y el Decreto 1377 de 2013 (Régimen General de Protección de Datos Personales - Habeas Data).
                </p>
                <p>
                  <strong>Seguridad y Cifrado Criptográfico:</strong> Toda la información suministrada (nombres, documento, teléfono y correo) es protegida mediante algoritmos de cifrado de extremo a extremo <strong>AES-GCM de 256 bits</strong> y firmado digital <strong>SHA-256</strong> sobre canales seguros <strong>HTTPS / TLS 1.3</strong>.
                </p>
                <p>
                  <strong>Finalidad:</strong> Evaluación crediticia de pre-aprobación express, emisión de constancia digital de crédito y contacto directo con el titular a través de canales autorizados. Sus datos nunca son comercializados con terceros.
                </p>
                <p>
                  <strong>Derechos del Titular:</strong> Conocer, actualizar, rectificar y solicitar la supresión de sus datos personales escribiendo a <em>groupulep@gmail.com</em>.
                </p>
              </div>
            )}

            {activeModal === 'Términos y Condiciones' && (
              <div className="space-y-2 text-xs text-slate-600 leading-relaxed max-h-72 overflow-y-auto pr-1">
                <p>
                  <strong>Naturaleza del Servicio:</strong> CrediULEP es una plataforma tecnológica financiera operada por GROUP ULEP S.A.S. que facilita la pre-aprobación y gestión de microcréditos digitales para la comunidad y personas vinculadas.
                </p>
                <p>
                  <strong>Conexión Segura:</strong> Este sitio opera exclusivamente bajo protocolo HTTPS con certificados SSL/TLS validados. Ninguna transacción solicita contraseñas bancarias directas ni claves secretas de cajero.
                </p>
                <p>
                  <strong>Pre-Aprobación Express:</strong> La simulación y solicitud de pre-aprobación inicial es 100% gratuita. La aprobación definitiva está sujeta a verificación de identidad y capacidad de desembolso por los canales oficiales autorizados.
                </p>
              </div>
            )}

            {activeModal === 'Metodología Tasa Fija 1.5% E.A.' && (
              <div className="space-y-2 text-xs text-slate-600 leading-relaxed max-h-72 overflow-y-auto pr-1">
                <p>
                  <strong>Transparencia de Costos:</strong> Tasa preferencial fija del 1.5% Efectiva Anual (E.A.), cumpliendo estrictamente con los límites de tasa de usura legal certificados por la Superintendencia Financiera de Colombia.
                </p>
                <p>
                  <strong>Sin Cobros Ocultos:</strong> Simulador de crédito transparente donde se desglosan el capital, intereses prorrateados exactos por días o meses y total a desembolsar sin cláusulas abusivas ni comisiones ocultas.
                </p>
              </div>
            )}
            <button
              onClick={() => setActiveModal(null)}
              className="w-full py-3 bg-[#820ad1] hover:bg-[#6d08b1] text-white font-bold text-xs rounded-2xl transition-all cursor-pointer shadow-md"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </footer>
  );
}

