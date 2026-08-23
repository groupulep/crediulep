export interface LoanData {
  loanAmount: number;
  loanTerm: number; // in months
}

export interface EncryptedDataPackage {
  ciphertext: string;
  ivHex: string;
  sha256Hash: string;
  timestamp: string;
}

export interface WaitlistData {
  name: string;
  email: string;
  phone: string;
  documentNumber?: string;
  relation: 'Estudiante' | 'Docente' | 'Colaborador' | 'Egresado' | 'Otro';
  loanAmount: number;
  loanTerm: number;
  paymentMethod: 'PSE / Transferencia' | 'Nequi / Daviplata' | 'Descuento de Nómina';
  encryptedPackage?: EncryptedDataPackage;
}

export interface AmortizationRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
}

