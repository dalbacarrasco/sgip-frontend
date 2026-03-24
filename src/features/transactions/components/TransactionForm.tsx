"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { TransactionType, CreateTransactionRequest } from "../types";

const schema = z.object({
    amount: z.coerce.number().min(1, "El monto debe ser mayor a 0"),
    type: z.coerce.number(),
    description: z.string().optional(),
    referenceId: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface Props {
    onSubmit: (data: CreateTransactionRequest) => void;
    isLoading: boolean;
}

const TEST_CLIENT_ID = "00000000-0000-0000-0000-000000000001";

export function TransactionForm({ onSubmit, isLoading }: Props) {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema) as any,
        defaultValues: {
            type: TransactionType.InstallmentPayment,
        },
    });

    const handleFormSubmit = (data: FormData) => {
        const idempotencyKey = `txn-${Date.now()}-${Math.random()
            .toString(36)
            .substring(2, 9)}`;

        onSubmit({
            clientId: TEST_CLIENT_ID,
            idempotencyKey,
            type: data.type as TransactionType,
            amount: data.amount,
            description: data.description,
            referenceId: data.referenceId || undefined,
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Nueva transacción</CardTitle>
            </CardHeader>
            <CardContent>
                <form
                    onSubmit={handleSubmit(handleFormSubmit as any)}
                    className="space-y-4"
                >
                    <div className="space-y-1">
                        <Label>Tipo de transacción</Label>
                        <Select
                            defaultValue={String(TransactionType.InstallmentPayment)}
                            onValueChange={(val) => setValue("type", Number(val))}
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value={String(TransactionType.LoanDisbursement)}>
                                    Desembolso de préstamo
                                </SelectItem>
                                <SelectItem value={String(TransactionType.InstallmentPayment)}>
                                    Pago de cuota
                                </SelectItem>
                                <SelectItem value={String(TransactionType.Withdrawal)}>
                                    Retiro de fondos
                                </SelectItem>
                                <SelectItem value={String(TransactionType.Transfer)}>
                                    Transferencia
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-1">
                        <Label>Monto</Label>
                        <Input
                            type="number"
                            step="0.01"
                            placeholder="Ej: 500"
                            {...register("amount")}
                        />
                        {errors.amount && (
                            <p className="text-sm text-red-500">{errors.amount.message}</p>
                        )}
                    </div>

                    <div className="space-y-1">
                        <Label>ID de referencia (opcional)</Label>
                        <Input
                            placeholder="ID del préstamo relacionado"
                            {...register("referenceId")}
                        />
                    </div>

                    <div className="space-y-1">
                        <Label>Descripción (opcional)</Label>
                        <Input
                            placeholder="Ej: Pago cuota enero"
                            {...register("description")}
                        />
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Procesando..." : "Crear transacción"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}