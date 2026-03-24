export enum TransactionType {
    LoanDisbursement = 0,
    InstallmentPayment = 1,
    PortfolioInvestment = 2,
    Withdrawal = 3,
    Transfer = 4,
}

export interface CreateTransactionRequest {
    clientId: string;
    idempotencyKey: string;
    type: TransactionType;
    amount: number;
    referenceId?: string;
    description?: string;
}

export interface CreateTransactionResponse {
    transactionId: string;
    idempotencyKey: string;
    status: string;
    amount: number;
    wasDuplicate: boolean;
}