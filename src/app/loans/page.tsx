"use client";

import { useState } from "react";
import { LoanSimulatorForm } from "@/features/loans/components/LoanSimulatorForm";
import { PaymentScheduleTable } from "@/features/loans/components/PaymentScheduleTable";
import { useSimulateLoan, useApplyLoan } from "@/features/loans/hooks/useLoans";
import { SimulateLoanRequest, SimulateLoanResponse } from "@/features/loans/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Cliente de prueba hardcodeado — el documento permite esto sin auth
const TEST_CLIENT_ID = "00000000-0000-0000-0000-000000000001";

export default function LoansPage() {
    const [simulationResult, setSimulationResult] =
        useState<SimulateLoanResponse | null>(null);
    const [lastRequest, setLastRequest] =
        useState<SimulateLoanRequest | null>(null);
    const [appliedLoanId, setAppliedLoanId] = useState<string | null>(null);

    const simulateMutation = useSimulateLoan();
    const applyMutation = useApplyLoan();

    const handleSimulate = (data: SimulateLoanRequest) => {
        setLastRequest(data);
        setAppliedLoanId(null);
        simulateMutation.mutate(data, {
            onSuccess: (result) => setSimulationResult(result),
            onError: (error) => alert(error.message),
        });
    };

    const handleApply = () => {
        if (!lastRequest) return;

        applyMutation.mutate(
            { ...lastRequest, clientId: TEST_CLIENT_ID },
            {
                onSuccess: (result) => {
                    setAppliedLoanId(result.loanId);
                },
                onError: (error) => alert(error.message),
            }
        );
    };

    return (
        <main className="container mx-auto p-6 space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Simulador de préstamos</h1>
                <p className="text-muted-foreground">
                    Calculá tu cuota mensual y cronograma de pagos
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Formulario */}
                <div className="lg:col-span-1">
                    <LoanSimulatorForm
                        onSimulate={handleSimulate}
                        isLoading={simulateMutation.isPending}
                    />
                </div>

                {/* Resultado */}
                <div className="lg:col-span-2">
                    {simulateMutation.isPending && (
                        <div className="flex items-center justify-center h-40 text-muted-foreground">
                            Calculando cronograma...
                        </div>
                    )}

                    {simulateMutation.isError && (
                        <div className="p-4 bg-red-50 text-red-600 rounded-lg">
                            {simulateMutation.error.message}
                        </div>
                    )}

                    {simulationResult && !simulateMutation.isPending && (
                        <div className="space-y-4">
                            <PaymentScheduleTable
                                schedule={simulationResult.schedule}
                                fixedInstallment={simulationResult.fixedInstallment}
                                amount={simulationResult.amount}
                                annualRate={simulationResult.annualRate}
                            />

                            {/* Botón para solicitar el préstamo */}
                            {!appliedLoanId ? (
                                <Button
                                    onClick={handleApply}
                                    disabled={applyMutation.isPending}
                                    className="w-full"
                                    size="lg"
                                >
                                    {applyMutation.isPending
                                        ? "Solicitando..."
                                        : "Solicitar este préstamo"}
                                </Button>
                            ) : (
                                <div className="p-4 bg-green-50 rounded-lg flex items-center gap-3">
                                    <Badge className="bg-green-500">Solicitud enviada</Badge>
                                    <p className="text-sm text-green-700">
                                        Tu préstamo fue registrado. ID: {appliedLoanId}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}

                    {!simulationResult && !simulateMutation.isPending && (
                        <div className="flex items-center justify-center h-40 text-muted-foreground border-2 border-dashed rounded-lg">
                            Completá el formulario para ver el cronograma
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}