import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface Agent {
  id: string;
  full_name: string;
}

interface KPIData {
  generalPerformance: number;
  prospectingPerformance: number;
  conversationPerformance: number;
  meetingsAnalyzed: number;
}

interface PerformancePoint {
  week: string;
  performance: number;
}

interface Skill {
  action: string;
  rate: number;
}

interface Meeting {
  id: string;
  date: string;
  clientName: string;
  performance: number;
}

export const useAgents = () => {
  return useQuery({
    queryKey: ["agents"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("commercial_agents")
        .select("id, full_name")
        .order("full_name", { ascending: true });

      if (error) throw error;
      return data as Agent[];
    },
  });
};

export const useKPIData = (agentId: string | null) => {
  return useQuery({
    queryKey: ["kpi-data", agentId],
    queryFn: async () => {
      if (!agentId) return null;

      // Query the pre-calculated view
      const { data: results, error: resultsError } = await supabase
        .from("vista_resultados_detallados" as any)
        .select("*")
        .eq("commercial_agent_id", agentId) as any;

      if (resultsError) throw resultsError;

      if (!results || results.length === 0) {
        return {
          generalPerformance: 0,
          prospectingPerformance: 0,
          conversationPerformance: 0,
          meetingsAnalyzed: 0,
        };
      }

      // Count unique sessions
      const uniqueSessions = new Set(results.map((r) => r.analysis_session_id));
      const meetingsAnalyzed = uniqueSessions.size;

      // Calculate General Performance using pre-calculated scores
      const totalScore = results.reduce((sum, r) => sum + (r.puntaje_real_obtenido || 0), 0);
      const maxScore = results.reduce((sum, r) => sum + (r.puntaje_maximo_posible || 0), 0);
      const generalPerformance = maxScore > 0 ? (totalScore * 100) / maxScore : 0;

      // Calculate Prospecting Performance (fuente_criterio = 'crm')
      const prospectingResults = results.filter((r) => r.fuente_criterio === "crm");
      const prospectingScore = prospectingResults.reduce((sum, r) => sum + (r.puntaje_real_obtenido || 0), 0);
      const maxProspectingScore = prospectingResults.reduce((sum, r) => sum + (r.puntaje_maximo_posible || 0), 0);
      const prospectingPerformance =
        maxProspectingScore > 0 ? (prospectingScore * 100) / maxProspectingScore : 0;

      // Calculate Conversation Performance (fuente_criterio = 'transcript')
      const conversationResults = results.filter((r) => r.fuente_criterio === "transcript");
      const conversationScore = conversationResults.reduce((sum, r) => sum + (r.puntaje_real_obtenido || 0), 0);
      const maxConversationScore = conversationResults.reduce((sum, r) => sum + (r.puntaje_maximo_posible || 0), 0);
      const conversationPerformance =
        maxConversationScore > 0 ? (conversationScore * 100) / maxConversationScore : 0;

      return {
        generalPerformance: Math.round(generalPerformance * 10) / 10,
        prospectingPerformance: Math.round(prospectingPerformance * 10) / 10,
        conversationPerformance: Math.round(conversationPerformance * 10) / 10,
        meetingsAnalyzed,
      };
    },
    enabled: !!agentId,
  });
};

export const usePerformanceEvolution = (agentId: string | null) => {
  return useQuery({
    queryKey: ["performance-evolution", agentId],
    queryFn: async () => {
      if (!agentId) return [];

      // Query the pre-calculated view
      const { data: results, error: resultsError } = await supabase
        .from("vista_resultados_detallados" as any)
        .select("*")
        .eq("commercial_agent_id", agentId) as any;

      if (resultsError) throw resultsError;

      if (!results || results.length === 0) return [];

      // Group by week using pre-calculated scores
      const weeklyData = new Map<string, { total: number; max: number }>();

      results.forEach((result) => {
        const meetingDate = result.fecha_reunion;
        if (!meetingDate) return;

        const date = new Date(meetingDate);
        const weekStart = new Date(date);
        weekStart.setDate(date.getDate() - date.getDay());
        const weekKey = weekStart.toISOString().split("T")[0];

        const existing = weeklyData.get(weekKey) || { total: 0, max: 0 };
        weeklyData.set(weekKey, {
          total: existing.total + (result.puntaje_real_obtenido || 0),
          max: existing.max + (result.puntaje_maximo_posible || 0),
        });
      });

      // Convert to array and calculate percentages
      const performanceData: PerformancePoint[] = Array.from(weeklyData.entries())
        .map(([week, data]) => ({
          week,
          performance: data.max > 0 ? Math.round((data.total * 100) / data.max * 10) / 10 : 0,
        }))
        .sort((a, b) => a.week.localeCompare(b.week));

      return performanceData;
    },
    enabled: !!agentId,
  });
};

export const useSkillsAnalysis = (agentId: string | null) => {
  return useQuery({
    queryKey: ["skills-analysis", agentId],
    queryFn: async () => {
      if (!agentId) return { strengths: [], opportunities: [] };

      // Query the pre-calculated view
      const { data: results, error: resultsError } = await supabase
        .from("vista_resultados_detallados" as any)
        .select("*")
        .eq("commercial_agent_id", agentId) as any;

      if (resultsError) throw resultsError;

      if (!results || results.length === 0) {
        return { strengths: [], opportunities: [] };
      }

      // Group by critical action
      const actionStats = new Map<string, { met: number; total: number }>();

      results.forEach((result) => {
        const action = result.accion_critica;
        if (!action) return;
        
        const stats = actionStats.get(action) || { met: 0, total: 0 };
        actionStats.set(action, {
          met: stats.met + (result.is_met ? 1 : 0),
          total: stats.total + 1,
        });
      });

      // Calculate success rates
      const skills: Skill[] = Array.from(actionStats.entries())
        .map(([action, stats]) => ({
          action,
          rate: Math.round((stats.met * 100) / stats.total * 10) / 10,
        }))
        .sort((a, b) => b.rate - a.rate);

      return {
        strengths: skills.slice(0, 3),
        opportunities: skills.slice(-3).reverse(),
      };
    },
    enabled: !!agentId,
  });
};

export const useMeetingsHistory = (agentId: string | null) => {
  return useQuery({
    queryKey: ["meetings-history", agentId],
    queryFn: async () => {
      if (!agentId) return [];

      // Query the pre-calculated view
      const { data: results, error: resultsError } = await supabase
        .from("vista_resultados_detallados" as any)
        .select("*")
        .eq("commercial_agent_id", agentId) as any;

      if (resultsError) throw resultsError;

      if (!results || results.length === 0) return [];

      // Group by session and calculate performance using pre-calculated scores
      const sessionMap = new Map<string, {
        date: string;
        clientName: string;
        totalScore: number;
        maxScore: number;
      }>();

      results.forEach((result) => {
        const sessionId = result.analysis_session_id;
        if (!sessionId) return;

        const date = result.fecha_reunion || "";
        const clientName = result.nombre_cliente || "Cliente desconocido";

        const existing = sessionMap.get(sessionId) || {
          date,
          clientName,
          totalScore: 0,
          maxScore: 0,
        };

        sessionMap.set(sessionId, {
          ...existing,
          totalScore: existing.totalScore + (result.puntaje_real_obtenido || 0),
          maxScore: existing.maxScore + (result.puntaje_maximo_posible || 0),
        });
      });

      // Convert to array and calculate percentages
      const meetings: Meeting[] = Array.from(sessionMap.entries())
        .map(([id, data]) => ({
          id,
          date: data.date,
          clientName: data.clientName,
          performance: data.maxScore > 0 ? Math.round((data.totalScore * 100) / data.maxScore * 10) / 10 : 0,
        }))
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      return meetings;
    },
    enabled: !!agentId,
  });
};