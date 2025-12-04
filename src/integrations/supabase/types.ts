export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      analysis_sessions: {
        Row: {
          client_company_id: string | null
          commercial_agent_id: string
          completed_at: string | null
          context_notification_sent_at: string | null
          created_at: string | null
          final_weighted_score: number | null
          ia_detected_meeting_type_id: string | null
          ia_detection_reason: string | null
          id: string
          is_meeting_type_mismatched: boolean
          meeting_type_id: string | null
          prospecting_analysis_status:
            | Database["public"]["Enums"]["analysis_dimension_status"]
            | null
          session_status: Database["public"]["Enums"]["session_processing_status"]
          transcript_analysis_status:
            | Database["public"]["Enums"]["analysis_dimension_status"]
            | null
          transcript_id: string
          updated_at: string | null
        }
        Insert: {
          client_company_id?: string | null
          commercial_agent_id: string
          completed_at?: string | null
          context_notification_sent_at?: string | null
          created_at?: string | null
          final_weighted_score?: number | null
          ia_detected_meeting_type_id?: string | null
          ia_detection_reason?: string | null
          id?: string
          is_meeting_type_mismatched?: boolean
          meeting_type_id?: string | null
          prospecting_analysis_status?:
            | Database["public"]["Enums"]["analysis_dimension_status"]
            | null
          session_status: Database["public"]["Enums"]["session_processing_status"]
          transcript_analysis_status?:
            | Database["public"]["Enums"]["analysis_dimension_status"]
            | null
          transcript_id: string
          updated_at?: string | null
        }
        Update: {
          client_company_id?: string | null
          commercial_agent_id?: string
          completed_at?: string | null
          context_notification_sent_at?: string | null
          created_at?: string | null
          final_weighted_score?: number | null
          ia_detected_meeting_type_id?: string | null
          ia_detection_reason?: string | null
          id?: string
          is_meeting_type_mismatched?: boolean
          meeting_type_id?: string | null
          prospecting_analysis_status?:
            | Database["public"]["Enums"]["analysis_dimension_status"]
            | null
          session_status?: Database["public"]["Enums"]["session_processing_status"]
          transcript_analysis_status?:
            | Database["public"]["Enums"]["analysis_dimension_status"]
            | null
          transcript_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "analysis_sessions_client_company_id_fkey"
            columns: ["client_company_id"]
            isOneToOne: false
            referencedRelation: "client_companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "analysis_sessions_commercial_agent_id_fkey"
            columns: ["commercial_agent_id"]
            isOneToOne: false
            referencedRelation: "commercial_agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "analysis_sessions_meeting_type_id_fkey"
            columns: ["meeting_type_id"]
            isOneToOne: false
            referencedRelation: "meeting_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "analysis_sessions_transcript_id_fkey"
            columns: ["transcript_id"]
            isOneToOne: true
            referencedRelation: "transcripts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_ia_detected_meeting_type"
            columns: ["ia_detected_meeting_type_id"]
            isOneToOne: false
            referencedRelation: "meeting_types"
            referencedColumns: ["id"]
          },
        ]
      }
      client_companies: {
        Row: {
          commercial_agent_id: string | null
          created_at: string | null
          crm_organization_id: string | null
          id: string
          industry: string | null
          name: string
        }
        Insert: {
          commercial_agent_id?: string | null
          created_at?: string | null
          crm_organization_id?: string | null
          id?: string
          industry?: string | null
          name: string
        }
        Update: {
          commercial_agent_id?: string | null
          created_at?: string | null
          crm_organization_id?: string | null
          id?: string
          industry?: string | null
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "client_companies_commercial_agent_id_fkey"
            columns: ["commercial_agent_id"]
            isOneToOne: false
            referencedRelation: "commercial_agents"
            referencedColumns: ["id"]
          },
        ]
      }
      client_contacts: {
        Row: {
          client_company_id: string | null
          created_at: string | null
          crm_person_id: string | null
          email: string | null
          full_name: string
          id: string
        }
        Insert: {
          client_company_id?: string | null
          created_at?: string | null
          crm_person_id?: string | null
          email?: string | null
          full_name: string
          id?: string
        }
        Update: {
          client_company_id?: string | null
          created_at?: string | null
          crm_person_id?: string | null
          email?: string | null
          full_name?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "client_contacts_client_company_id_fkey"
            columns: ["client_company_id"]
            isOneToOne: false
            referencedRelation: "client_companies"
            referencedColumns: ["id"]
          },
        ]
      }
      commercial_agents: {
        Row: {
          created_at: string | null
          email: string
          full_name: string
          id: string
        }
        Insert: {
          created_at?: string | null
          email: string
          full_name: string
          id?: string
        }
        Update: {
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
        }
        Relationships: []
      }
      criterion_results: {
        Row: {
          analysis_session_id: string
          created_at: string | null
          criterion_id: string
          criterion_score: number
          evidence_snippets: string[] | null
          id: string
          is_met: boolean
          justification: string | null
        }
        Insert: {
          analysis_session_id: string
          created_at?: string | null
          criterion_id: string
          criterion_score: number
          evidence_snippets?: string[] | null
          id?: string
          is_met: boolean
          justification?: string | null
        }
        Update: {
          analysis_session_id?: string
          created_at?: string | null
          criterion_id?: string
          criterion_score?: number
          evidence_snippets?: string[] | null
          id?: string
          is_met?: boolean
          justification?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "criterion_results_analysis_session_id_fkey"
            columns: ["analysis_session_id"]
            isOneToOne: false
            referencedRelation: "analysis_sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "criterion_results_criterion_id_fkey"
            columns: ["criterion_id"]
            isOneToOne: false
            referencedRelation: "evaluation_criteria"
            referencedColumns: ["id"]
          },
        ]
      }
      deal_stage_to_meeting_type_mapping: {
        Row: {
          created_at: string | null
          id: string
          meeting_type_id: string
          pipedrive_stage_id: number
          pipedrive_stage_name: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          meeting_type_id: string
          pipedrive_stage_id: number
          pipedrive_stage_name?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          meeting_type_id?: string
          pipedrive_stage_id?: number
          pipedrive_stage_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_meeting_type"
            columns: ["meeting_type_id"]
            isOneToOne: false
            referencedRelation: "meeting_types"
            referencedColumns: ["id"]
          },
        ]
      }
      evaluation_criteria: {
        Row: {
          confirmation_rule: string
          created_at: string | null
          critical_action: string
          example: string | null
          id: string
          is_active: boolean | null
          meeting_type_id: string | null
          source: Database["public"]["Enums"]["criterion_source"]
          suggested_weight: number
        }
        Insert: {
          confirmation_rule: string
          created_at?: string | null
          critical_action: string
          example?: string | null
          id?: string
          is_active?: boolean | null
          meeting_type_id?: string | null
          source?: Database["public"]["Enums"]["criterion_source"]
          suggested_weight: number
        }
        Update: {
          confirmation_rule?: string
          created_at?: string | null
          critical_action?: string
          example?: string | null
          id?: string
          is_active?: boolean | null
          meeting_type_id?: string | null
          source?: Database["public"]["Enums"]["criterion_source"]
          suggested_weight?: number
        }
        Relationships: [
          {
            foreignKeyName: "evaluation_criteria_meeting_type_id_fkey"
            columns: ["meeting_type_id"]
            isOneToOne: false
            referencedRelation: "meeting_types"
            referencedColumns: ["id"]
          },
        ]
      }
      meeting_types: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      meetings: {
        Row: {
          client_company_id: string | null
          commercial_agent_id: string
          context_status: string
          created_at: string | null
          crm_activity_id: string | null
          crm_deal_id: string | null
          crm_host: string | null
          id: string
          meeting_type_id: string | null
          scheduled_time: string
        }
        Insert: {
          client_company_id?: string | null
          commercial_agent_id: string
          context_status?: string
          created_at?: string | null
          crm_activity_id?: string | null
          crm_deal_id?: string | null
          crm_host?: string | null
          id?: string
          meeting_type_id?: string | null
          scheduled_time: string
        }
        Update: {
          client_company_id?: string | null
          commercial_agent_id?: string
          context_status?: string
          created_at?: string | null
          crm_activity_id?: string | null
          crm_deal_id?: string | null
          crm_host?: string | null
          id?: string
          meeting_type_id?: string | null
          scheduled_time?: string
        }
        Relationships: [
          {
            foreignKeyName: "meetings_client_company_id_fkey"
            columns: ["client_company_id"]
            isOneToOne: false
            referencedRelation: "client_companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "meetings_commercial_agent_id_fkey"
            columns: ["commercial_agent_id"]
            isOneToOne: false
            referencedRelation: "commercial_agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "meetings_meeting_type_id_fkey"
            columns: ["meeting_type_id"]
            isOneToOne: false
            referencedRelation: "meeting_types"
            referencedColumns: ["id"]
          },
        ]
      }
      transcripts: {
        Row: {
          commercial_agent_id: string | null
          created_at: string | null
          id: string
          meeting_id: string | null
          orphan_notification_sent_at: string | null
          participants_emails: string[] | null
          processing_status: Database["public"]["Enums"]["transcript_processing_status"]
          raw_json_content: Json | null
          start_time: string | null
          updated_at: string | null
        }
        Insert: {
          commercial_agent_id?: string | null
          created_at?: string | null
          id?: string
          meeting_id?: string | null
          orphan_notification_sent_at?: string | null
          participants_emails?: string[] | null
          processing_status?: Database["public"]["Enums"]["transcript_processing_status"]
          raw_json_content?: Json | null
          start_time?: string | null
          updated_at?: string | null
        }
        Update: {
          commercial_agent_id?: string | null
          created_at?: string | null
          id?: string
          meeting_id?: string | null
          orphan_notification_sent_at?: string | null
          participants_emails?: string[] | null
          processing_status?: Database["public"]["Enums"]["transcript_processing_status"]
          raw_json_content?: Json | null
          start_time?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transcripts_commercial_agent_id_fkey"
            columns: ["commercial_agent_id"]
            isOneToOne: false
            referencedRelation: "commercial_agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transcripts_meeting_id_fkey"
            columns: ["meeting_id"]
            isOneToOne: false
            referencedRelation: "meetings"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      analysis_dimension_status:
        | "pendiente"
        | "procesando"
        | "completado"
        | "error"
      criterion_source: "transcript" | "crm"
      session_processing_status:
        | "iniciada"
        | "completado_parcialmente"
        | "completado_totalmente"
        | "error"
      transcript_processing_status: "recibida" | "vinculada"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      analysis_dimension_status: [
        "pendiente",
        "procesando",
        "completado",
        "error",
      ],
      criterion_source: ["transcript", "crm"],
      session_processing_status: [
        "iniciada",
        "completado_parcialmente",
        "completado_totalmente",
        "error",
      ],
      transcript_processing_status: ["recibida", "vinculada"],
    },
  },
} as const
