import api from "@/core/api";
import { CreateTransactionRequest, CreateTransactionResponse } from "../types";

export const transactionService = {
    create: async (
        data: CreateTransactionRequest
    ): Promise<CreateTransactionResponse> => {
        const response = await api.post("/api/v1/transactions", data);
        return response.data;
    },
};