import api from "@/core/api";
import {
    SimulateLoanRequest,
    SimulateLoanResponse,
    ApplyLoanRequest,
    ApplyLoanResponse,
    LoanDetail,
    PaymentScheduleItem,
} from "../types";

export const loanService = {
    simulate: async (data: SimulateLoanRequest): Promise<SimulateLoanResponse> => {
        const response = await api.post("/api/v1/loans/simulate", data);
        return response.data;
    },

    apply: async (data: ApplyLoanRequest): Promise<ApplyLoanResponse> => {
        const response = await api.post("/api/v1/loans/apply", data);
        return response.data;
    },

    getById: async (id: string): Promise<LoanDetail> => {
        const response = await api.get(`/api/v1/loans/${id}`);
        return response.data;
    },

    getPaymentSchedule: async (id: string): Promise<PaymentScheduleItem[]> => {
        const response = await api.get(`/api/v1/loans/${id}/payment-schedule`);
        return response.data;
    },

    approve: async (id: string): Promise<{ approved: boolean }> => {
        const response = await api.patch(`/api/v1/loans/${id}/approve`);
        return response.data;
    },
};