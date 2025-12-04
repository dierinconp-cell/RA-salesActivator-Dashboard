import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAgents } from "@/hooks/useDashboardData";

interface AgentFilterProps {
  value: string | null;
  onChange: (value: string) => void;
}

export const AgentFilter = ({ value, onChange }: AgentFilterProps) => {
  const { data: agents, isLoading } = useAgents();

  if (isLoading) {
    return (
      <div className="w-full max-w-md">
        <div className="h-12 bg-card rounded-xl animate-pulse" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      <Select value={value || undefined} onValueChange={onChange}>
        <SelectTrigger className="h-12 bg-card border-border text-foreground rounded-xl shadow-[var(--shadow-card)] hover:bg-secondary transition-colors">
          <SelectValue placeholder="Seleccionar Agente" />
        </SelectTrigger>
        <SelectContent className="bg-card border-border">
          {agents?.map((agent) => (
            <SelectItem key={agent.id} value={agent.id} className="text-foreground hover:bg-secondary">
              {agent.full_name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};