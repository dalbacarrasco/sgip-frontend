"use client";

import { useState } from "react";
import { TransactionForm } from "@/features/transactions/components/TransactionForm";
import { useCreateTransaction } from "@/features/transactions/hooks/useTransactions";
import { CreateTransactionRequest, CreateTransactionResponse } from "@/features/transactions/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TransactionsPage() {
    const [results, setResults] = useState<CreateTransactionResponse[]>([]);
    const createMutation = useCreateTransaction();

    const handleSubmit = (data: CreateTransactionRequest) => {
        createMutation.mutate(data, {
            onSuccess: (result) => {
                setResults((prev) => [result, ...prev]);
            },
            onError: (error) => alert(error.message),
        });
    };

    return (
        <main className="container mx-auto p-6 space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Transacciones</h1>
                <p className="text-muted-foreground">
                    Registrá pagos con garantía de no duplicados
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Formulario */}
                <TransactionForm
                    onSubmit={handleSubmit}
                    isLoading={createMutation.isPending}
                />

                {/* Resultados */}
                <div className="space-y-4">
                    <h2 className="text-lg font-medium">Transacciones procesadas</h2>

                    {results.length === 0 && (
                        <div className="flex items-center justify-center h-40 text-muted-foreground border-2 border-dashed rounded-lg">
                            Aún no hay transacciones
                        </div>
                    )}

                    {results.map((result) => (
                        <Card key={result.transactionId}>
                            <CardHeader className="pb-2">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-sm font-medium">
                                        {result.transactionId}
                                    </CardTitle>
                                    <div className="flex gap-2">
                                        <Badge
                                            className={
                                                result.status === "Completed"
                                                    ? "bg-green-500"
                                                    : "bg-yellow-500"
                                            }
                                        >
                                            {result.status}
                                        </Badge>
                                        {result.wasDuplicate && (
                                            <Badge variant="outline" className="text-orange-500 border-orange-500">
                                                Duplicado detectado
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <div>
                                        <p className="text-muted-foreground">Monto</p>
                                        <p className="font-medium">${result.amount}</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground">Idempotency Key</p>
                                        <p className="font-mono text-xs truncate">
                                            {result.idempotencyKey}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </main>
    );
}