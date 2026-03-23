import { useMutation } from "@tanstack/react-query";
import { loanService } from "../services/loanService";
import { SimulateLoanRequest, ApplyLoanRequest } from "../types";

export function useSimulateLoan() {
    return useMutation({
        mutationFn: (data: SimulateLoanRequest) => loanService.simulate(data),
    });
}

export function useApplyLoan() {
    return useMutation({
        mutationFn: (data: ApplyLoanRequest) => loanService.apply(data),
    });
}

export function useApproveLoan() {
    return useMutation({
        mutationFn: (id: string) => loanService.approve(id),
    });
}