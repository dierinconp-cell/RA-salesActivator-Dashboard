import * as React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useQuery } from "@tanstack/react-query";
import { supabaseExternal } from "@/lib/supabaseExternal";
import { CheckCircle2, XCircle, BarChart3, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface MeetingDetailProps {
  sessionId: string;
  open: boolean;
  onClose: () => void;
}

export const MeetingDetail = ({ sessionId, open, onClose }: MeetingDetailProps) => {
  const { data: details, isLoading } = useQuery({
    queryKey: ["meeting-detail", sessionId],
    queryFn: async () => {
      const { data: results, error } = await supabaseExternal
        .from("vista_resultados_detallados")
        .select("*")
        .eq("analysis_session_id", sessionId) as any;

      if (error) throw error;
      return results;
    },
    enabled: !!sessionId && open,
  });

  const nombreCliente = details?.[0]?.nombre_cliente || "Cliente Desconocido";

  // Agrupar por fuente y calcular totales
  const crmResults = React.useMemo(() => details?.filter((d) => d.fuente_criterio === "crm") || [], [details]);
  const transcriptResults = React.useMemo(() => details?.filter((d) => d.fuente_criterio === "transcript") || [], [details]);

  const calculateTotals = (items: any[]) => {
    const totalObtenido = items.reduce((sum, item) => sum + (item.puntaje_real_obtenido || 0), 0);
    const totalMaximo = items.reduce((sum, item) => sum + (item.puntaje_maximo_posible || 0), 0);
    const porcentaje = totalMaximo > 0 ? Math.round((totalObtenido * 100) / totalMaximo * 10) / 10 : 0;
    return { totalObtenido, totalMaximo, porcentaje };
  };

  const crmTotals = React.useMemo(() => calculateTotals(crmResults), [crmResults]);
  const transcriptTotals = React.useMemo(() => calculateTotals(transcriptResults), [transcriptResults]);

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="bg-card border-border overflow-y-auto sm:max-w-2xl">
        <SheetHeader>
          <SheetTitle className="text-foreground">
            Detalles de la Reunión - {nombreCliente}
          </SheetTitle>
        </SheetHeader>

        {isLoading ? (
          <div className="space-y-4 mt-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-24 bg-muted rounded-lg animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="mt-6 space-y-6">
            {/* Grupo CRM */}
            {crmResults.length > 0 && (
              <Card className="border-primary/20">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-primary" />
                      <CardTitle className="text-base">CRM (Prospección)</CardTitle>
                    </div>
                    <Badge variant="secondary" className="text-sm font-semibold">
                      {crmTotals.porcentaje}%
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">
                    Puntaje: <span className="font-semibold text-foreground">{crmTotals.totalObtenido}</span> de {crmTotals.totalMaximo}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {crmResults.map((result, index) => (
                    <div
                      key={index}
                      className="p-3 bg-secondary/50 rounded-lg border border-border/50"
                    >
                      <div className="flex items-start gap-3">
                        {result.is_met ? (
                          <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                        ) : (
                          <XCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                        )}
                        <div className="flex-1">
                          <h4 className="text-sm font-semibold text-foreground mb-1">
                            {result.accion_critica}
                          </h4>
                          <div className="text-xs text-muted-foreground mb-2">
                            Puntuación: <strong className="text-foreground">{result.puntaje_real_obtenido}</strong> / {result.puntaje_maximo_posible}
                          </div>
                          {result.comentarios_ia && (
                            <p className="text-sm text-muted-foreground mt-2">
                              {result.comentarios_ia}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Grupo Transcripción */}
            {transcriptResults.length > 0 && (
              <Card className="border-primary/20">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-primary" />
                      <CardTitle className="text-base">Transcripción (Conversación)</CardTitle>
                    </div>
                    <Badge variant="secondary" className="text-sm font-semibold">
                      {transcriptTotals.porcentaje}%
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">
                    Puntaje: <span className="font-semibold text-foreground">{transcriptTotals.totalObtenido}</span> de {transcriptTotals.totalMaximo}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {transcriptResults.map((result, index) => (
                    <div
                      key={index}
                      className="p-3 bg-secondary/50 rounded-lg border border-border/50"
                    >
                      <div className="flex items-start gap-3">
                        {result.is_met ? (
                          <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                        ) : (
                          <XCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                        )}
                        <div className="flex-1">
                          <h4 className="text-sm font-semibold text-foreground mb-1">
                            {result.accion_critica}
                          </h4>
                          <div className="text-xs text-muted-foreground mb-2">
                            Puntuación: <strong className="text-foreground">{result.puntaje_real_obtenido}</strong> / {result.puntaje_maximo_posible}
                          </div>
                          {result.comentarios_ia && (
                            <p className="text-sm text-muted-foreground mt-2">
                              {result.comentarios_ia}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};