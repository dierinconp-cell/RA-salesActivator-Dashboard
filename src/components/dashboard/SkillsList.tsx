import { Card } from "@/components/ui/card";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { useSkillsAnalysis } from "@/hooks/useDashboardData";

interface SkillsListProps {
  agentId: string | null;
}

export const SkillsList = ({ agentId }: SkillsListProps) => {
  const { data, isLoading } = useSkillsAnalysis(agentId);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 bg-card border-border shadow-[var(--shadow-card)] rounded-xl">
          <div className="h-6 w-32 bg-muted rounded animate-pulse mb-4" />
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-muted rounded animate-pulse" />
            ))}
          </div>
        </Card>
        <Card className="p-6 bg-card border-border shadow-[var(--shadow-card)] rounded-xl">
          <div className="h-6 w-32 bg-muted rounded animate-pulse mb-4" />
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-muted rounded animate-pulse" />
            ))}
          </div>
        </Card>
      </div>
    );
  }

  if (!data || (data.strengths.length === 0 && data.opportunities.length === 0)) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 bg-card border-border shadow-[var(--shadow-card)] rounded-xl">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-accent" />
            Fortalezas Principales
          </h3>
          <div className="text-muted-foreground text-center py-8">
            No hay datos disponibles
          </div>
        </Card>
        <Card className="p-6 bg-card border-border shadow-[var(--shadow-card)] rounded-xl">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-accent" />
            Oportunidades de Mejora
          </h3>
          <div className="text-muted-foreground text-center py-8">
            No hay datos disponibles
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="p-6 bg-card border-border shadow-[var(--shadow-card)] rounded-xl">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-accent" />
          Fortalezas Principales
        </h3>
        <div className="space-y-3">
          {data.strengths.map((skill, index) => (
            <div
              key={index}
              className="p-4 bg-secondary/50 rounded-lg border border-border/50 hover:border-accent/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">{skill.action}</span>
                <span className="text-sm font-bold text-accent">{skill.rate.toFixed(1)}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent rounded-full transition-all duration-500"
                  style={{ width: `${skill.rate}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 bg-card border-border shadow-[var(--shadow-card)] rounded-xl">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-accent" />
          Oportunidades de Mejora
        </h3>
        <div className="space-y-3">
          {data.opportunities.map((skill, index) => (
            <div
              key={index}
              className="p-4 bg-secondary/50 rounded-lg border border-border/50 hover:border-accent/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">{skill.action}</span>
                <span className="text-sm font-bold text-destructive">{skill.rate.toFixed(1)}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-destructive rounded-full transition-all duration-500"
                  style={{ width: `${skill.rate}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};