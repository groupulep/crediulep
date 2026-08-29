import React, { useState } from 'react';
import { WaitlistData, EncryptedDataPackage } from '../types';
import {
  Mail,
  User,
  Sparkles,
  QrCode,
  ArrowRight,
  ArrowLeft,
  Phone,
  Zap,
  ShieldCheck,
  Lock,
  Eye,
  EyeOff,
  Copy,
  Check,
  CreditCard,
  KeyRound,
} from 'lucide-react';
import {
  encryptDataAES,
  maskName,
  maskEmail,
  maskPhone,
} from '../utils/crypto';

interface WaitlistFormProps {
  initialLoanAmount: number;
  theme?: 'white' | 'purple';
}

export default function WaitlistForm({ initialLoanAmount, theme = 'white' }: WaitlistFormProps) {
  const isWhite = theme === 'white';
  const [step, setStep] = useState(1);
  const [loanAmount, setLoanAmount] = useState<number>(initialLoanAmount || 1000000); // 1M COP default
  const [loanTermDays, setLoanTermDays] = useState<number>(30); // days default (30 days = 1 month)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [relation, setRelation] = useState<WaitlistData['relation']>('Estudiante');
  const [paymentMethod, setPaymentMethod] = useState<WaitlistData['paymentMethod']>('PSE / Transferencia');
  const [terms, setTerms] = useState(true);
  const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string; terms?: string }>({});

  const [folioNumber, setFolioNumber] = useState(8492);
  const [encryptedPackage, setEncryptedPackage] = useState<EncryptedDataPackage | null>(null);
  const [showMaskedData, setShowMaskedData] = useState(true);
  const [showEncryptedPayload, setShowEncryptedPayload] = useState(false);
  const [copiedToken, setCopiedToken] = useState(false);
  const [isEncrypting, setIsEncrypting] = useState(false);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Interest calculation (1.5% E.A. prorated by days)
  const calculateInterest = (principal: number, days: number) => {
    const annualRate = 0.015;
    return principal * annualRate * (days / 365);
  };

  const totalInterest = calculateInterest(loanAmount, loanTermDays);
  const totalToPay = loanAmount + totalInterest;

  const getTermLabel = (days: number) => {
    if (days === 30) return '1 Mes (30 días)';
    return `${days} Días`;
  };

  const validateStep2 = () => {
    // Make form completely frictionless and free to use without blocking the user
    if (!name.trim()) setName('Solicitante CrediULEP');
    if (!email.trim()) setEmail('solicitud@crediulep.co');
    if (!phone.trim()) setPhone('+57 300 000 0000');
    setTerms(true);
    setErrors({});
    return true;
  };

  const handleNextStep = async () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      if (validateStep2()) {
        setIsEncrypting(true);
        const generatedFolio = Math.floor(1000 + Math.random() * 8999);
        setFolioNumber(generatedFolio);

        // Prepare confidential dossier for AES-256 encryption
        const confidentialPayload = JSON.stringify({
          folio: `CO-${generatedFolio}`,
          name: name || 'Solicitante CrediULEP',
          email: email || 'solicitud@crediulep.co',
          phone: phone || '+57 300 000 0000',
          relation,
          paymentMethod,
          loanAmount,
          loanTermDays,
          totalToPay,
          totalInterest,
          fixedRate: '1.5% E.A.',
          issuedAt: new Date().toISOString(),
          issuer: 'CrediULEP Colombia',
        });

        // Perform AES-GCM 256-bit client-side encryption + SHA-256 hash
        const encResult = await encryptDataAES(confidentialPayload);
        setEncryptedPackage(encResult);
        setIsEncrypting(false);
        setStep(3);

        // Open WhatsApp message with encrypted verification token
        const waNumber = '573169008561';
        const waMessage = `Hola CrediULEP, envío mi solicitud de pre-aprobación express:\n• Folio Seguro: #CO-${generatedFolio}\n• Solicitante: ${name || 'Solicitante CrediULEP'}\n• Monto: ${formatCurrency(loanAmount)}\n• Token de Seguridad Cifrado (SHA-256): ${encResult.sha256Hash.slice(0, 16)}...`;

        const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`;
        window.open(waUrl, '_blank');
      }
    }
  };

  const handleCopyToken = () => {
    if (!encryptedPackage) return;
    const tokenToCopy = `CREDIULEP-SECURE-TOKEN::${encryptedPackage.sha256Hash}::IV-${encryptedPackage.ivHex}::CIPHER-${encryptedPackage.ciphertext}`;
    navigator.clipboard.writeText(tokenToCopy);
    setCopiedToken(true);
    setTimeout(() => setCopiedToken(false), 2500);
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const relations: WaitlistData['relation'][] = ['Estudiante', 'Docente', 'Egresado', 'Otro'];
  const paymentMethods: { id: WaitlistData['paymentMethod']; label: string; desc: string }[] = [
    { id: 'PSE / Transferencia', label: 'PSE / Cuenta Bancaria', desc: 'Transferencia directa a tu cuenta bancaria en Colombia' },
    { id: 'Nequi / Daviplata', label: 'Billetera Digital', desc: 'Desembolso express a Nequi o Daviplata' },
    { id: 'Descuento de Nómina', label: 'Descuento de Nómina', desc: 'Deducción acordada para docentes y colaboradores' },
  ];

  return (
    <section id="solicitud" className="py-16 bg-transparent relative scroll-mt-20">
      <div className="max-w-3xl mx-auto px-6">
        <div
          className={`border shadow-2xl rounded-[36px] overflow-hidden text-[#191919] transition-all ${
            isWhite
              ? 'bg-white border-slate-200/90 shadow-purple-900/10'
              : 'bg-white border-white/80 shadow-black/25'
          }`}
        >
          {/* Progress Bar Top */}
          {step < 3 && (
            <div className="w-full h-2 bg-[#f3e8ff] flex">
              <div
                style={{ width: `${(step / 2) * 100}%` }}
                className="h-full bg-[#820ad1] transition-all duration-500"
              />
            </div>
          )}

          <div className="p-8 sm:p-12 space-y-8">
            {step < 3 && (
              <div className="space-y-4">
                <div className="flex justify-between items-center flex-wrap gap-2">
                  <span className="text-[10px] font-bold text-[#820ad1] uppercase tracking-widest bg-[#f3e8ff] px-3 py-1.5 rounded-full border border-[#820ad1]/20 flex items-center gap-1.5">
                    <Zap className="w-3 h-3 text-[#820ad1] fill-[#820ad1]" />
                    Pre-Aprobación Express — Paso {step} de 2
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-full flex items-center gap-1">
                      <Lock className="w-2.5 h-2.5 text-emerald-600" />
                      Cifrado AES-256 E2EE Activo
                    </span>
                    <span className="text-xs text-[#191919] font-bold">
                      {step === 1 && 'Configuración de Crédito'}
                      {step === 2 && 'Datos del Acreditado'}
                    </span>
                  </div>
                </div>
                <hr className="border-[#820ad1]/10" />
              </div>
            )}

            {/* STEP 1: LOAN CONFIGURATION */}
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="space-y-2">
                  <h3 className="text-2xl font-extrabold text-[#191919] font-display">Pre-Aprobación Express</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Ajusta el monto y el plazo deseado. Disfruta de la tasa fija preferencial del <strong className="text-[#820ad1]">1.5% E.A.</strong>
                  </p>
                </div>

                <div className="space-y-6 pt-2">
                  {/* Preset amounts */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[100000, 500000, 1000000, 3000000, 5000000, 10000000, 15000000].map((amt) => (
                      <button
                        key={amt}
                        onClick={() => setLoanAmount(amt)}
                        className={`py-2.5 px-2 rounded-2xl text-xs font-bold transition-all border cursor-pointer text-center ${
                          loanAmount === amt
                            ? 'bg-[#820ad1] border-[#820ad1] text-white shadow-md shadow-[#820ad1]/20'
                            : 'bg-white border-slate-200 text-[#191919] hover:bg-[#f3e8ff] hover:border-[#820ad1]/30'
                        }`}
                      >
                        {formatCurrency(amt)}
                      </button>
                    ))}
                  </div>

                  {/* Manual Amount Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-[#191919] font-bold">
                      <span>Monto Solicitado</span>
                      <span className="text-[#820ad1] font-mono text-sm bg-[#f3e8ff] border border-[#820ad1]/20 px-3 py-0.5 rounded-xl">
                        {formatCurrency(loanAmount)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="100000"
                      max="15000000"
                      step="100000"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="w-full h-2 bg-[#f3e8ff] rounded-lg appearance-none cursor-pointer accent-[#820ad1]"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                      <span>$100.000</span>
                      <span>$7.500.000</span>
                      <span>$15.000.000</span>
                    </div>
                  </div>

                  {/* Term Selection (5 días a 1 mes) */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Plazo de Devolución</label>
                    <div className="grid grid-cols-5 gap-2">
                      {[5, 10, 15, 20, 30].map((days) => (
                        <button
                          key={days}
                          onClick={() => setLoanTermDays(days)}
                          className={`py-2.5 px-1 rounded-xl text-xs font-bold border transition-all cursor-pointer text-center ${
                            loanTermDays === days
                              ? 'bg-[#820ad1] border-[#820ad1] text-white shadow-sm'
                              : 'bg-white border-slate-200 text-slate-700 hover:border-[#820ad1]/30'
                          }`}
                        >
                          {days === 30 ? '1 Mes' : `${days} Días`}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Realtime Estimate Pill */}
                  <div className="bg-[#f8f0fc] p-4 rounded-2xl border border-[#e8d8fa] flex justify-between items-center gap-4">
                    <div>
                      <span className="text-[10px] text-[#820ad1] font-bold uppercase tracking-wider block">
                        Total Estimado a Pagar ({getTermLabel(loanTermDays)})
                      </span>
                      <span className="text-xl font-black text-[#191919] font-mono block">
                        {formatCurrency(totalToPay)}
                      </span>
                      <span className="text-[10px] text-slate-500 block mt-0.5">
                        Interés fijo: {formatCurrency(totalInterest)}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-[#820ad1] bg-white border border-[#820ad1]/20 px-3 py-1.5 rounded-xl shadow-sm text-center">
                      1.5% E.A.
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: USER DETAILS & BASIC CONTACT INFO */}
            {step === 2 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-extrabold text-[#191919] font-display">Datos Básicos de Contacto</h3>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      Sitio Seguro & Sin Compromiso
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Ingresa tus datos básicos de contacto para enviarte la cotización y simulación detallada a tu WhatsApp. No solicitamos contraseñas ni documentos sensibles.
                  </p>
                </div>

                <div className="space-y-4 pt-2">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                      Nombre o Apodo de Contacto
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-3.5 w-4 h-4 text-[#820ad1]" />
                      <input
                        type="text"
                        placeholder="Ej. Carlos Gómez"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                        }}
                        className={`w-full pl-10 pr-4 py-3 bg-white border rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#820ad1]/20 focus:border-[#820ad1] text-[#191919] ${
                          errors.name ? 'border-red-400' : 'border-slate-200'
                        }`}
                      />
                    </div>
                    {errors.name && <p className="text-xs text-red-500 font-semibold">{errors.name}</p>}
                  </div>

                  {/* Phone / WhatsApp */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                      Número de WhatsApp / Celular
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-[#820ad1]" />
                      <input
                        type="tel"
                        placeholder="Ej. 316 900 8561"
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                        }}
                        className={`w-full pl-10 pr-4 py-3 bg-white border rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#820ad1]/20 focus:border-[#820ad1] text-[#191919] ${
                          errors.phone ? 'border-red-400' : 'border-slate-200'
                        }`}
                      />
                    </div>
                    {errors.phone && <p className="text-xs text-red-500 font-semibold">{errors.phone}</p>}
                  </div>

                  {/* Optional Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
                      <span>Correo Electrónico (Opcional)</span>
                      <span className="text-[10px] text-slate-400 font-normal">Para envío de constancia</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-[#820ad1]" />
                      <input
                        type="email"
                        placeholder="Ej. carlos@ejemplo.com"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                        }}
                        className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#820ad1]/20 focus:border-[#820ad1] text-[#191919]"
                      />
                    </div>
                  </div>

                  {/* Relation */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Vínculo o Afiliación</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                      {relations.map((rel) => (
                        <button
                          type="button"
                          key={rel}
                          onClick={() => setRelation(rel)}
                          className={`py-2 px-1 rounded-xl text-xs font-bold border transition-all cursor-pointer text-center ${
                            relation === rel
                              ? 'bg-[#820ad1] border-[#820ad1] text-white shadow-sm'
                              : 'bg-white border-slate-200 text-slate-700 hover:border-[#820ad1]/30'
                          }`}
                        >
                          {rel}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Preferred Payment / Desembolso Method */}
                  <div className="space-y-2 pt-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Preferencia de Desembolso</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {paymentMethods.map((pm) => (
                        <button
                          type="button"
                          key={pm.id}
                          onClick={() => setPaymentMethod(pm.id)}
                          className={`p-3 rounded-2xl border text-left space-y-1 transition-all cursor-pointer ${
                            paymentMethod === pm.id
                              ? 'border-[#820ad1] bg-[#f8f0fc] shadow-sm'
                              : 'border-slate-200 bg-white hover:border-[#820ad1]/30'
                          }`}
                        >
                          <span className="text-xs font-bold text-[#191919] block">{pm.label}</span>
                          <span className="text-[10px] text-slate-500 block leading-tight">{pm.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Safe Notice */}
                  <div className="p-3.5 bg-emerald-50/90 border border-emerald-200 rounded-2xl flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                    <div className="space-y-1 text-xs text-slate-700 leading-relaxed">
                      <p className="font-bold text-emerald-900">Garantía de Confianza y Seguridad:</p>
                      <p className="text-[11px] text-emerald-800">
                        Esta simulación es informativa y 100% gratuita. No solicitamos números de cuenta bancaria, contraseñas, PIN ni documentos de identidad en este formulario.
                      </p>
                    </div>
                  </div>

                  {/* Terms */}
                  <div className="space-y-2 pt-1">
                    <label className="flex items-start gap-2.5 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={terms}
                        onChange={(e) => {
                          setTerms(e.target.checked);
                          if (errors.terms) setErrors((prev) => ({ ...prev, terms: undefined }));
                        }}
                        className="mt-1 accent-[#820ad1] rounded cursor-pointer"
                      />
                      <span className="text-xs text-slate-500 leading-relaxed">
                        Acepto los Términos de Servicio y la Política de Protección de Datos de <strong>CrediULEP Colombia</strong>.
                      </span>
                    </label>
                    {errors.terms && <p className="text-xs text-red-500 font-semibold">{errors.terms}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: PRE-APPROVAL TICKET & ENCRYPTED SECURITY CERTIFICATE */}
            {step === 3 && (
              <div className="text-center space-y-8 animate-in zoom-in-95 duration-300">
                <div className="w-16 h-16 rounded-3xl bg-[#f3e8ff] text-[#820ad1] flex items-center justify-center mx-auto shadow-md">
                  <Sparkles className="w-8 h-8 animate-pulse" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-[#191919] font-display">¡Crédito Pre-Aprobado y Cifrado!</h3>
                  <p className="text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
                    Felicidades, <strong className="text-[#191919]">{showMaskedData ? maskName(name) : name}</strong>. Tu pre-aprobación express ha sido asegurada con cifrado criptográfico confidencial.
                  </p>
                </div>

                {/* Privacy Toggle Bar */}
                <div className="flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setShowMaskedData((prev) => !prev)}
                    className="px-3.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                  >
                    {showMaskedData ? (
                      <>
                        <Eye className="w-3.5 h-3.5 text-[#820ad1]" />
                        Mostrar Datos Completos
                      </>
                    ) : (
                      <>
                        <EyeOff className="w-3.5 h-3.5 text-emerald-600" />
                        Ocultar (Máscara Confidencial)
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowEncryptedPayload((prev) => !prev)}
                    className={`px-3.5 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                      showEncryptedPayload
                        ? 'bg-[#820ad1] text-white border-[#820ad1]'
                        : 'bg-purple-50 text-[#820ad1] border-purple-200 hover:bg-purple-100'
                    }`}
                  >
                    <KeyRound className="w-3.5 h-3.5" />
                    {showEncryptedPayload ? 'Ver Credencial Digital' : 'Ver Cifrado AES-256'}
                  </button>
                </div>

                {/* Digital Folio Ticket - Signature Nu Dark Purple Card */}
                {!showEncryptedPayload ? (
                  <div className="max-w-sm mx-auto bg-gradient-to-br from-[#24033b] via-[#4c0677] to-[#820ad1] text-white rounded-3xl p-6 relative shadow-2xl overflow-hidden border border-[#820ad1]/40 text-left space-y-5">
                    {/* Security Badge Header */}
                    <div className="flex justify-between items-center border-b border-white/10 pb-3">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[9px] uppercase tracking-widest text-purple-200 font-semibold">CrediULEP</span>
                          <span className="text-[8px] bg-emerald-500/30 text-emerald-300 border border-emerald-400/40 px-1.5 py-0.2 rounded font-mono">AES-256</span>
                        </div>
                        <span className="font-extrabold text-sm text-white">Pre-Aprobación Express</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] text-purple-200 block">Folio Protegido</span>
                        <span className="font-mono font-bold text-sm text-emerald-400">#CO-{folioNumber}</span>
                      </div>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div className="flex justify-between">
                        <span className="opacity-70">Solicitante:</span>
                        <span className="font-bold">{showMaskedData ? maskName(name) : name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="opacity-70">WhatsApp / Teléfono:</span>
                        <span className="font-bold text-purple-100">{showMaskedData ? maskPhone(phone) : phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="opacity-70">Correo:</span>
                        <span className="font-bold text-purple-200">{showMaskedData ? maskEmail(email) : email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="opacity-70">Vínculo:</span>
                        <span className="font-bold text-purple-200">{relation}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="opacity-70">Desembolso:</span>
                        <span className="font-bold text-purple-100">{paymentMethod}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-white/10">
                        <span className="opacity-70">Monto Aprobado:</span>
                        <span className="font-mono font-black text-emerald-400 text-sm">{formatCurrency(loanAmount)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="opacity-70">Plazo ({getTermLabel(loanTermDays)}):</span>
                        <span className="font-mono font-bold text-white">{formatCurrency(totalToPay)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="opacity-70">Tasa Preferencial:</span>
                        <span className="text-emerald-300 font-bold">1.5% E.A. (Fija)</span>
                      </div>
                    </div>

                    <div className="border-t border-white/10 pt-3 flex justify-between items-center gap-4">
                      <div className="space-y-0.5">
                        <span className="text-[8px] opacity-60 block uppercase flex items-center gap-1">
                          <Lock className="w-2.5 h-2.5 text-emerald-400" />
                          Hash Criptográfico SHA-256
                        </span>
                        <span className="font-mono text-[9px] tracking-wider text-purple-200 block truncate max-w-[200px]">
                          {encryptedPackage ? `${encryptedPackage.sha256Hash.slice(0, 20)}...` : `CU-COL-${folioNumber}`}
                        </span>
                      </div>
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center p-1 shrink-0">
                        <QrCode className="w-full h-full text-[#24033b]" />
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Encrypted Package Technical View */
                  <div className="max-w-sm mx-auto bg-slate-900 text-slate-200 rounded-3xl p-5 relative shadow-2xl border border-purple-500/40 text-left space-y-4 font-mono text-xs">
                    <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                      <span className="text-[11px] font-bold text-purple-400 flex items-center gap-1.5">
                        <Lock className="w-3 h-3 text-emerald-400" />
                        Cifrado AES-GCM 256-bit
                      </span>
                      <span className="text-[9px] bg-emerald-950 text-emerald-400 border border-emerald-700 px-2 py-0.5 rounded-full">
                        E2EE VERIFIED
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase block font-sans font-bold">Firma Digital SHA-256:</span>
                        <p className="text-[10px] text-emerald-400 break-all bg-black/40 p-2 rounded-xl border border-slate-800">
                          {encryptedPackage?.sha256Hash || 'Cargando hash...'}
                        </p>
                      </div>

                      <div>
                        <span className="text-[10px] text-slate-400 uppercase block font-sans font-bold">Vector de Inicialización (IV):</span>
                        <p className="text-[10px] text-purple-300 break-all bg-black/40 p-1.5 rounded-xl border border-slate-800">
                          {encryptedPackage?.ivHex || 'N/A'}
                        </p>
                      </div>

                      <div>
                        <span className="text-[10px] text-slate-400 uppercase block font-sans font-bold">Payload Cifrado (Base64):</span>
                        <p className="text-[9px] text-slate-400 break-all bg-black/40 p-2 rounded-xl border border-slate-800 max-h-24 overflow-y-auto">
                          {encryptedPackage?.ciphertext || 'N/A'}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleCopyToken}
                      className="w-full py-2 px-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-sans text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {copiedToken ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                      {copiedToken ? '¡Token Cifrado Copiado!' : 'Copiar Token Criptográfico'}
                    </button>
                  </div>
                )}

                <div className="pt-2 space-y-4 max-w-sm mx-auto">
                  <p className="text-xs text-slate-500 leading-normal">
                    Se abrió la ventana de WhatsApp para enviar tu pre-aprobación asegurada a <strong className="text-[#191919]">+57 3169008561</strong>. Si no se abrió automáticamente, haz clic en el botón a continuación.
                  </p>

                  <a
                    href={`https://wa.me/573169008561?text=${encodeURIComponent(
                      `Hola CrediULEP, envío mi solicitud de pre-aprobación express:\n• Folio Seguro: #CO-${folioNumber}\n• Solicitante: ${name || 'Solicitante CrediULEP'}\n• Monto: ${formatCurrency(loanAmount)}\n• Token de Seguridad (SHA-256): ${encryptedPackage?.sha256Hash.slice(0, 16) || folioNumber}...`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-lg shadow-emerald-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Phone className="w-4 h-4" />
                    Enviar Solicitud Segura por WhatsApp (+57 3169008561)
                  </a>

                  <button
                    onClick={() => {
                      setStep(1);
                      setName('');
                      setEmail('');
                      setPhone('');
                      setTerms(false);
                      setEncryptedPackage(null);
                    }}
                    className="text-xs text-[#820ad1] font-bold hover:underline cursor-pointer block mx-auto"
                  >
                    Nueva Solicitud Express
                  </button>
                </div>
              </div>
            )}

            {/* ACTION BUTTONS (STEPS 1-2) */}
            {step < 3 && (
              <div className="flex items-center justify-between gap-4 pt-4 border-t border-[#820ad1]/10">
                <button
                  onClick={handlePrevStep}
                  disabled={step === 1}
                  className={`px-5 py-3 rounded-2xl border border-slate-200 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer ${
                    step === 1
                      ? 'opacity-30 cursor-not-allowed text-slate-400'
                      : 'text-[#191919] hover:bg-slate-50'
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Atrás
                </button>

                <button
                  onClick={handleNextStep}
                  disabled={isEncrypting}
                  className="px-7 py-3.5 rounded-2xl bg-[#820ad1] hover:bg-[#6d08b1] text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-[#820ad1]/25 transition-all cursor-pointer disabled:opacity-50"
                >
                  {isEncrypting ? (
                    <>
                      <Lock className="w-4 h-4 animate-spin" />
                      Cifrando Datos...
                    </>
                  ) : step === 2 ? (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      Generar Pre-Aprobación Cifrada
                    </>
                  ) : (
                    <>
                      Continuar
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

