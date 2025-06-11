export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      companies: {
        Row: {
          address: string
          business_sector: Database["public"]["Enums"]["business_sector"]
          city: string
          country: string
          created_at: string
          email: string
          id: string
          logo_url: string | null
          name: string
          ninea: string | null
          phone: string | null
          rccm: string | null
          representative_first_name: string
          representative_last_name: string
          updated_at: string
          website: string | null
        }
        Insert: {
          address: string
          business_sector: Database["public"]["Enums"]["business_sector"]
          city: string
          country?: string
          created_at?: string
          email: string
          id?: string
          logo_url?: string | null
          name: string
          ninea?: string | null
          phone?: string | null
          rccm?: string | null
          representative_first_name: string
          representative_last_name: string
          updated_at?: string
          website?: string | null
        }
        Update: {
          address?: string
          business_sector?: Database["public"]["Enums"]["business_sector"]
          city?: string
          country?: string
          created_at?: string
          email?: string
          id?: string
          logo_url?: string | null
          name?: string
          ninea?: string | null
          phone?: string | null
          rccm?: string | null
          representative_first_name?: string
          representative_last_name?: string
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          company_id: string | null
          created_at: string
          first_name: string | null
          id: string
          is_company_admin: boolean | null
          last_name: string | null
          role: string | null
          updated_at: string
        }
        Insert: {
          company_id?: string | null
          created_at?: string
          first_name?: string | null
          id: string
          is_company_admin?: boolean | null
          last_name?: string | null
          role?: string | null
          updated_at?: string
        }
        Update: {
          company_id?: string | null
          created_at?: string
          first_name?: string | null
          id?: string
          is_company_admin?: boolean | null
          last_name?: string | null
          role?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      user_invitations: {
        Row: {
          company_id: string
          created_at: string
          email: string
          expires_at: string
          first_name: string | null
          id: string
          invited_by: string
          last_name: string | null
          role: string | null
          status: Database["public"]["Enums"]["invitation_status"] | null
          token: string
          updated_at: string
        }
        Insert: {
          company_id: string
          created_at?: string
          email: string
          expires_at?: string
          first_name?: string | null
          id?: string
          invited_by: string
          last_name?: string | null
          role?: string | null
          status?: Database["public"]["Enums"]["invitation_status"] | null
          token?: string
          updated_at?: string
        }
        Update: {
          company_id?: string
          created_at?: string
          email?: string
          expires_at?: string
          first_name?: string | null
          id?: string
          invited_by?: string
          last_name?: string | null
          role?: string | null
          status?: Database["public"]["Enums"]["invitation_status"] | null
          token?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_invitations_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_invitations_invited_by_fkey"
            columns: ["invited_by"]
            isOneToOne: false
            referencedRelation: "profiles"
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
      business_sector:
        | "agriculture"
        | "industrie"
        | "construction"
        | "commerce"
        | "transport"
        | "hebergement_restauration"
        | "information_communication"
        | "activites_financieres"
        | "immobilier"
        | "activites_specialisees"
        | "administration_publique"
        | "enseignement"
        | "sante_action_sociale"
        | "arts_spectacles"
        | "autres_services"
      invitation_status: "pending" | "accepted" | "expired" | "cancelled"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      business_sector: [
        "agriculture",
        "industrie",
        "construction",
        "commerce",
        "transport",
        "hebergement_restauration",
        "information_communication",
        "activites_financieres",
        "immobilier",
        "activites_specialisees",
        "administration_publique",
        "enseignement",
        "sante_action_sociale",
        "arts_spectacles",
        "autres_services",
      ],
      invitation_status: ["pending", "accepted", "expired", "cancelled"],
    },
  },
} as const
