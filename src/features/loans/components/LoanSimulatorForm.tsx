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
import { LoanType, SimulateLoanRequest } from "../types";

const schema = z.object({
    amount: z.coerce.number()
        .min(500, "El monto mínimo es $500")
        .max(50000, "El monto máximo es $50,000"),
    annualRate: z.coerce.number()
        .min(0.18, "La tasa mínima es 18%")
        .max(0.35, "La tasa máxima es 35%"),
    termInMonths: z.coerce.number()
        .min(6, "El plazo mínimo es 6 meses")
        .max(60, "El plazo máximo es 60 meses"),
    type: z.coerce.number(),
    firstPaymentDate: z.string().min(1, "La fecha es requerida"),
});

type FormData = z.infer<typeof schema>;

interface Props {
    onSimulate: (data: SimulateLoanRequest) => void;
    isLoading: boolean;
}

export function LoanSimulatorForm({ onSimulate, isLoading }: Props) {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema) as any,
        defaultValues: {
            type: LoanType.FixedInstallment,
            annualRate: 0.24,
        },
    });

    const onSubmit = (data: FormData) => {
        onSimulate({
            amount: data.amount,
            annualRate: data.annualRate,
            termInMonths: data.termInMonths,
            type: data.type as LoanType,
            firstPaymentDate: new Date(data.firstPaymentDate).toISOString(),
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Simulador de préstamo</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit as any)} className="space-y-4">

                    <div className="space-y-1">
                        <Label>Monto ($500 - $50,000)</Label>
                        <Input
                            type="number"
                            placeholder="Ej: 5000"
                            {...register("amount")}
                        />
                        {errors.amount && (
                            <p className="text-sm text-red-500">{errors.amount.message}</p>
                        )}
                    </div>

                    <div className="space-y-1">
                        <Label>Tasa anual (18% - 35%)</Label>
                        <Input
                            type="number"
                            step="0.01"
                            placeholder="Ej: 0.24"
                            {...register("annualRate")}
                        />
                        {errors.annualRate && (
                            <p className="text-sm text-red-500">{errors.annualRate.message}</p>
                        )}
                    </div>

                    <div className="space-y-1">
                        <Label>Plazo en meses (6 - 60)</Label>
                        <Input
                            type="number"
                            placeholder="Ej: 12"
                            {...register("termInMonths")}
                        />
                        {errors.termInMonths && (
                            <p className="text-sm text-red-500">{errors.termInMonths.message}</p>
                        )}
                    </div>

                    <div className="space-y-1">
                        <Label>Tipo de préstamo</Label>
                        <Select
                            defaultValue={String(LoanType.FixedInstallment)}
                            onValueChange={(val) => setValue("type", Number(val))}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Seleccioná un tipo" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value={String(LoanType.FixedInstallment)}>
                                    Cuota fija (sistema francés)
                                </SelectItem>
                                <SelectItem value={String(LoanType.DecreasingInstallment)}>
                                    Cuota decreciente (sistema alemán)
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-1">
                        <Label>Fecha del primer pago</Label>
                        <Input
                            type="date"
                            {...register("firstPaymentDate")}
                        />
                        {errors.firstPaymentDate && (
                            <p className="text-sm text-red-500">
                                {errors.firstPaymentDate.message}
                            </p>
                        )}
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Calculando..." : "Simular préstamo"}
                    </Button>

                </form>
            </CardContent>
        </Card>
    );
}