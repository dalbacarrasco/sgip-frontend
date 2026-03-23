import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PaymentScheduleItem } from "../types";

interface Props {
    schedule: PaymentScheduleItem[];
    fixedInstallment: number;
    amount: number;
    annualRate: number;
}

function formatCurrency(value: number) {
    return new Intl.NumberFormat("es-BO", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
    }).format(value);
}

function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString("es-BO");
}

function formatPercent(value: number) {
    return `${(value * 100).toFixed(4)}%`;
}

export function PaymentScheduleTable({
    schedule,
    fixedInstallment,
    amount,
    annualRate,
}: Props) {
    const totalInterest = schedule.reduce(
        (sum, item) => sum + item.interestAmount,
        0
    );
    const totalPaid = schedule.reduce(
        (sum, item) => sum + item.totalAmount,
        0
    );

    return (
        <div className="space-y-4">
            {/* Resumen del préstamo */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="pt-4">
                        <p className="text-sm text-muted-foreground">Monto solicitado</p>
                        <p className="text-xl font-semibold">{formatCurrency(amount)}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-4">
                        <p className="text-sm text-muted-foreground">Cuota mensual</p>
                        <p className="text-xl font-semibold">
                            {formatCurrency(fixedInstallment)}
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-4">
                        <p className="text-sm text-muted-foreground">Total intereses</p>
                        <p className="text-xl font-semibold text-red-500">
                            {formatCurrency(totalInterest)}
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-4">
                        <p className="text-sm text-muted-foreground">Total a pagar</p>
                        <p className="text-xl font-semibold">
                            {formatCurrency(totalPaid)}
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Tabla del cronograma */}
            <Card>
                <CardHeader>
                    <CardTitle>Cronograma de pagos</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>#</TableHead>
                                    <TableHead>Fecha nominal</TableHead>
                                    <TableHead>Fecha ajustada</TableHead>
                                    <TableHead>Capital</TableHead>
                                    <TableHead>Interés</TableHead>
                                    <TableHead>Cuota total</TableHead>
                                    <TableHead>Saldo</TableHead>
                                    <TableHead>TEM</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {schedule.map((item) => (
                                    <TableRow key={item.installmentNumber}>
                                        <TableCell>{item.installmentNumber}</TableCell>
                                        <TableCell>{formatDate(item.nominalDueDate)}</TableCell>
                                        <TableCell>{formatDate(item.dueDate)}</TableCell>
                                        <TableCell>{formatCurrency(item.principalAmount)}</TableCell>
                                        <TableCell className="text-red-500">
                                            {formatCurrency(item.interestAmount)}
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {formatCurrency(item.totalAmount)}
                                        </TableCell>
                                        <TableCell>{formatCurrency(item.remainingBalance)}</TableCell>
                                        <TableCell className="text-muted-foreground">
                                            {formatPercent(item.effectiveRate)}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}