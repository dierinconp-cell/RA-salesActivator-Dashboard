import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useMeetingsHistory } from "@/hooks/useDashboardData";
import { useState } from "react";
import { MeetingDetail } from "./MeetingDetail";

interface MeetingsTableProps {
  agentId: string | null;
}

export const MeetingsTable = ({ agentId }: MeetingsTableProps) => {
  const { data: meetings, isLoading } = useMeetingsHistory(agentId);
  const [selectedMeetingId, setSelectedMeetingId] = useState<string | null>(null);

  if (isLoading) {
    return (
      <Card className="p-6 bg-card border-border shadow-[var(--shadow-card)] rounded-xl">
        <div className="h-6 w-48 bg-muted rounded animate-pulse mb-4" />
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-12 bg-muted rounded animate-pulse" />
          ))}
        </div>
      </Card>
    );
  }

  if (!meetings || meetings.length === 0) {
    return (
      <Card className="p-6 bg-card border-border shadow-[var(--shadow-card)] rounded-xl">
        <h3 className="text-lg font-semibold text-foreground mb-4">Historial de Reuniones</h3>
        <div className="text-muted-foreground text-center py-8">
          No hay reuniones registradas
        </div>
      </Card>
    );
  }

  const getPerformanceColor = (performance: number) => {
    if (performance >= 80) return "text-green-500";
    if (performance >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <>
      <Card className="p-6 bg-card border-border shadow-[var(--shadow-card)] rounded-xl overflow-hidden">
        <h3 className="text-lg font-semibold text-foreground mb-4">Historial de Reuniones</h3>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">Fecha</TableHead>
                <TableHead className="text-muted-foreground">Cliente</TableHead>
                <TableHead className="text-muted-foreground">Rendimiento</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {meetings.map((meeting) => (
                <TableRow
                  key={meeting.id}
                  className="border-border hover:bg-secondary/50 cursor-pointer transition-colors"
                  onClick={() => setSelectedMeetingId(meeting.id)}
                >
                  <TableCell className="text-foreground">
                    {new Date(meeting.date).toLocaleDateString("es-ES", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="text-foreground font-medium">
                    {meeting.clientName}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 max-w-xs">
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-accent rounded-full transition-all duration-500"
                            style={{ width: `${meeting.performance}%` }}
                          />
                        </div>
                      </div>
                      <span className={`text-sm font-bold ${getPerformanceColor(meeting.performance)}`}>
                        {meeting.performance.toFixed(1)}%
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {selectedMeetingId && (
        <MeetingDetail
          sessionId={selectedMeetingId}
          open={!!selectedMeetingId}
          onClose={() => setSelectedMeetingId(null)}
        />
      )}
    </>
  );
};