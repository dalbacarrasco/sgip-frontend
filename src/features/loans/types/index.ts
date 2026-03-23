export enum LoanType {
  FixedInstallment = 0,      // sistema francés
  DecreasingInstallment = 1  // sistema alemán
}

export interface SimulateLoanRequest {
  amount: number;
  annualRate: number;
  termInMonths: number;
  type: LoanType;
  firstPaymentDate: string;
}

export interface PaymentScheduleItem {
  installmentNumber: number;
  nominalDueDate: string;
  dueDate: string;
  totalAmount: number;
  principalAmount: number;
  interestAmount: number;
  remainingBalance: number;
  effectiveRate: number;
  actualDays: number;
}

export interface SimulateLoanResponse {
  amount: number;
  annualRate: number;
  termInMonths: number;
  fixedInstallment: number;
  schedule: PaymentScheduleItem[];
}

export interface ApplyLoanRequest {
  clientId: string;
  amount: number;
  annualRate: number;
  termInMonths: number;
  type: LoanType;
  firstPaymentDate: string;
}

export interface ApplyLoanResponse {
  loanId: string;
  clientId: string;
  amount: number;
  status: string;
  createdAt: string;
}

export interface LoanDetail {
  id: string;
  clientId: string;
  amount: number;
  annualRate: number;
  termInMonths: number;
  type: number;
  status: string;
  rejectionReason?: string;
  createdAt: string;
}