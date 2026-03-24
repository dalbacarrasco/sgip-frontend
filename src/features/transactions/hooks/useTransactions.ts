import { useMutation } from "@tanstack/react-query";
import { transactionService } from "../services/transactionService";
import { CreateTransactionRequest } from "../types";

export function useCreateTransaction() {
    return useMutation({
        mutationFn: (data: CreateTransactionRequest) =>
            transactionService.create(data),
    });
}