import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface KPICardProps {
  title: string;
  value: number | string;
  suffix?: string;
  trend?: "up" | "down" | "neutral";
  isLoading?: boolean;
}

export const KPICard = ({ title, value, suffix = "", trend, isLoading }: KPICardProps) => {
  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;

  if (isLoading) {
    return (
      <Card className="p-6 bg-card border-border shadow-[var(--shadow-card)] rounded-xl">
        <div className="space-y-3">
          <div className="h-4 w-32 bg-muted rounded animate-pulse" />
          <div className="h-10 w-24 bg-muted rounded animate-pulse" />
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-card border-border shadow-[var(--shadow-card)] rounded-xl hover:border-accent/50 transition-all">
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground font-medium tracking-wide uppercase">
          {title}
        </p>
        <div className="flex items-baseline gap-2">
          <h3 className="text-4xl font-bold text-foreground">
            {value}
          </h3>
          {suffix && (
            <span className="text-2xl font-semibold text-muted-foreground">
              {suffix}
            </span>
          )}
        </div>
        {trend && (
          <div className="flex items-center gap-1 mt-2">
            <TrendIcon
              className={`h-4 w-4 ${
                trend === "up"
                  ? "text-green-500"
                  : trend === "down"
                  ? "text-red-500"
                  : "text-muted-foreground"
              }`}
            />
          </div>
        )}
      </div>
    </Card>
  );
};