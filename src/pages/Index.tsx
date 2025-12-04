import { useState } from "react";
import { AgentFilter } from "@/components/dashboard/AgentFilter";
import { KPICard } from "@/components/dashboard/KPICard";
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";
import { SkillsList } from "@/components/dashboard/SkillsList";
import { MeetingsTable } from "@/components/dashboard/MeetingsTable";
import { useKPIData } from "@/hooks/useDashboardData";
import { BarChart3 } from "lucide-react";

const Index = () => {
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);
  const { data: kpiData, isLoading: isLoadingKPI } = useKPIData(selectedAgentId);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent/10 rounded-lg">
              <BarChart3 className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Sales Activator</h1>
              <p className="text-sm text-muted-foreground">Focus Dashboard</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* Filter Section */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-1">Seleccionar Agente</h2>
            <p className="text-sm text-muted-foreground">
              Elige un agente para ver su desempeño detallado
            </p>
          </div>
        </div>

        <AgentFilter value={selectedAgentId} onChange={setSelectedAgentId} />

        {selectedAgentId ? (
          <>
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <KPICard
                title="Rendimiento General"
                value={kpiData?.generalPerformance.toFixed(1) || "0.0"}
                suffix="%"
                isLoading={isLoadingKPI}
              />
              <KPICard
                title="Prospección"
                value={kpiData?.prospectingPerformance.toFixed(1) || "0.0"}
                suffix="%"
                isLoading={isLoadingKPI}
              />
              <KPICard
                title="Conversación"
                value={kpiData?.conversationPerformance.toFixed(1) || "0.0"}
                suffix="%"
                isLoading={isLoadingKPI}
              />
              <KPICard
                title="Reuniones Analizadas"
                value={kpiData?.meetingsAnalyzed || 0}
                isLoading={isLoadingKPI}
              />
            </div>

            {/* Performance Chart */}
            <PerformanceChart agentId={selectedAgentId} />

            {/* Skills Lists */}
            <SkillsList agentId={selectedAgentId} />

            {/* Meetings Table */}
            <MeetingsTable agentId={selectedAgentId} />
          </>
        ) : (
          <div className="text-center py-24">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
              <BarChart3 className="h-8 w-8 text-accent" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Selecciona un agente
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Para comenzar, selecciona un agente comercial del menú desplegable superior para visualizar
              su desempeño detallado y métricas clave.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
