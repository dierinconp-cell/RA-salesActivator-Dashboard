import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { usePerformanceEvolution } from "@/hooks/useDashboardData";

interface PerformanceChartProps {
  agentId: string | null;
}

export const PerformanceChart = ({ agentId }: PerformanceChartProps) => {
  const { data: performanceData, isLoading } = usePerformanceEvolution(agentId);

  if (isLoading) {
    return (
      <Card className="p-6 bg-card border-border shadow-[var(--shadow-card)] rounded-xl">
        <div className="space-y-4">
          <div className="h-6 w-48 bg-muted rounded animate-pulse" />
          <div className="h-64 bg-muted rounded animate-pulse" />
        </div>
      </Card>
    );
  }

  if (!performanceData || performanceData.length === 0) {
    return (
      <Card className="p-6 bg-card border-border shadow-[var(--shadow-card)] rounded-xl">
        <h3 className="text-lg font-semibold text-foreground mb-4">Evolución del Rendimiento</h3>
        <div className="h-64 flex items-center justify-center text-muted-foreground">
          No hay datos disponibles
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-card border-border shadow-[var(--shadow-card)] rounded-xl">
      <h3 className="text-lg font-semibold text-foreground mb-6">Evolución del Rendimiento</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={performanceData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis
            dataKey="week"
            stroke="hsl(var(--muted-foreground))"
            tick={{ fill: "hsl(var(--muted-foreground))" }}
            tickFormatter={(value) => {
              const date = new Date(value);
              return `${date.getDate()}/${date.getMonth() + 1}`;
            }}
          />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            tick={{ fill: "hsl(var(--muted-foreground))" }}
            domain={[0, 100]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "0.75rem",
              color: "hsl(var(--foreground))",
            }}
            formatter={(value: number) => [`${value.toFixed(1)}%`, "Rendimiento"]}
            labelFormatter={(label) => {
              const date = new Date(label);
              return `Semana del ${date.toLocaleDateString()}`;
            }}
          />
          <Line
            type="monotone"
            dataKey="performance"
            stroke="hsl(var(--accent))"
            strokeWidth={3}
            dot={{ fill: "hsl(var(--accent))", r: 5 }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};