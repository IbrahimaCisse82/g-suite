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
          address: string | null
          business_sector: string | null
          city: string | null
          country: string | null
          created_at: string | null
          currency: string | null
          email: string | null
          id: string
          initial_setup_completed: boolean | null
          logo_url: string | null
          name: string
          ninea: string | null
          phone: string | null
          rccm: string | null
          representative_first_name: string | null
          representative_last_name: string | null
          representative_title: string | null
          request_message: string | null
          status: string | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          address?: string | null
          business_sector?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          currency?: string | null
          email?: string | null
          id?: string
          initial_setup_completed?: boolean | null
          logo_url?: string | null
          name: string
          ninea?: string | null
          phone?: string | null
          rccm?: string | null
          representative_first_name?: string | null
          representative_last_name?: string | null
          representative_title?: string | null
          request_message?: string | null
          status?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          address?: string | null
          business_sector?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          currency?: string | null
          email?: string | null
          id?: string
          initial_setup_completed?: boolean | null
          logo_url?: string | null
          name?: string
          ninea?: string | null
          phone?: string | null
          rccm?: string | null
          representative_first_name?: string | null
          representative_last_name?: string | null
          representative_title?: string | null
          request_message?: string | null
          status?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
      company_subscriptions: {
        Row: {
          company_id: string | null
          created_at: string | null
          end_date: string | null
          id: string
          is_active: boolean | null
          start_date: string | null
          status: string | null
          subscription_plan_id: string | null
        }
        Insert: {
          company_id?: string | null
          created_at?: string | null
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          start_date?: string | null
          status?: string | null
          subscription_plan_id?: string | null
        }
        Update: {
          company_id?: string | null
          created_at?: string | null
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          start_date?: string | null
          status?: string | null
          subscription_plan_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_subscriptions_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_subscriptions_subscription_plan_id_fkey"
            columns: ["subscription_plan_id"]
            isOneToOne: false
            referencedRelation: "subscription_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      contacts: {
        Row: {
          address: string | null
          city: string | null
          company_id: string | null
          country: string | null
          created_at: string | null
          email: string | null
          id: string
          name: string
          phone: string | null
          type: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          company_id?: string | null
          country?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          name: string
          phone?: string | null
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          company_id?: string | null
          country?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          name?: string
          phone?: string | null
          type?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contacts_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      deliveries: {
        Row: {
          company_id: string
          created_at: string
          delivery_address: string | null
          delivery_date: string | null
          id: string
          invoice_id: string | null
          notes: string | null
          status: string | null
          tracking_number: string | null
          updated_at: string
        }
        Insert: {
          company_id: string
          created_at?: string
          delivery_address?: string | null
          delivery_date?: string | null
          id?: string
          invoice_id?: string | null
          notes?: string | null
          status?: string | null
          tracking_number?: string | null
          updated_at?: string
        }
        Update: {
          company_id?: string
          created_at?: string
          delivery_address?: string | null
          delivery_date?: string | null
          id?: string
          invoice_id?: string | null
          notes?: string | null
          status?: string | null
          tracking_number?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "deliveries_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deliveries_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      financial_accounts: {
        Row: {
          account_name: string
          account_number: string | null
          account_type: string
          balance: number | null
          company_id: string
          created_at: string
          currency: string | null
          id: string
          is_active: boolean | null
          updated_at: string
        }
        Insert: {
          account_name: string
          account_number?: string | null
          account_type: string
          balance?: number | null
          company_id: string
          created_at?: string
          currency?: string | null
          id?: string
          is_active?: boolean | null
          updated_at?: string
        }
        Update: {
          account_name?: string
          account_number?: string | null
          account_type?: string
          balance?: number | null
          company_id?: string
          created_at?: string
          currency?: string | null
          id?: string
          is_active?: boolean | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "financial_accounts_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices: {
        Row: {
          company_id: string
          contact_id: string | null
          created_at: string
          currency: string | null
          due_date: string | null
          id: string
          invoice_date: string
          invoice_number: string
          notes: string | null
          status: string | null
          subtotal: number | null
          tax_amount: number | null
          total_amount: number | null
          updated_at: string
        }
        Insert: {
          company_id: string
          contact_id?: string | null
          created_at?: string
          currency?: string | null
          due_date?: string | null
          id?: string
          invoice_date?: string
          invoice_number: string
          notes?: string | null
          status?: string | null
          subtotal?: number | null
          tax_amount?: number | null
          total_amount?: number | null
          updated_at?: string
        }
        Update: {
          company_id?: string
          contact_id?: string | null
          created_at?: string
          currency?: string | null
          due_date?: string | null
          id?: string
          invoice_date?: string
          invoice_number?: string
          notes?: string | null
          status?: string | null
          subtotal?: number | null
          tax_amount?: number | null
          total_amount?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "invoices_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      paid_account_requests: {
        Row: {
          admin_notes: string | null
          company_id: string
          created_at: string
          expires_at: string | null
          id: string
          plan_id: string
          processed_at: string | null
          processed_by: string | null
          request_message: string | null
          requested_by: string
          status: string | null
          updated_at: string
        }
        Insert: {
          admin_notes?: string | null
          company_id: string
          created_at?: string
          expires_at?: string | null
          id?: string
          plan_id: string
          processed_at?: string | null
          processed_by?: string | null
          request_message?: string | null
          requested_by: string
          status?: string | null
          updated_at?: string
        }
        Update: {
          admin_notes?: string | null
          company_id?: string
          created_at?: string
          expires_at?: string | null
          id?: string
          plan_id?: string
          processed_at?: string | null
          processed_by?: string | null
          request_message?: string | null
          requested_by?: string
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "paid_account_requests_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "paid_account_requests_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "subscription_plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "paid_account_requests_requested_by_fkey"
            columns: ["requested_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      product_categories: {
        Row: {
          company_id: string | null
          created_at: string | null
          description: string | null
          id: string
          name: string
        }
        Insert: {
          company_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          company_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_categories_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      product_stock: {
        Row: {
          company_id: string
          created_at: string
          id: string
          last_stock_update: string | null
          minimum_stock_level: number | null
          product_id: string
          quantity_in_stock: number | null
          updated_at: string
        }
        Insert: {
          company_id: string
          created_at?: string
          id?: string
          last_stock_update?: string | null
          minimum_stock_level?: number | null
          product_id: string
          quantity_in_stock?: number | null
          updated_at?: string
        }
        Update: {
          company_id?: string
          created_at?: string
          id?: string
          last_stock_update?: string | null
          minimum_stock_level?: number | null
          product_id?: string
          quantity_in_stock?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_stock_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_stock_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          barcode: string | null
          category_id: string | null
          company_id: string | null
          cost: number | null
          created_at: string | null
          description: string | null
          id: string
          min_stock_level: number | null
          name: string
          price: number | null
          sku: string | null
          stock_quantity: number | null
          unit_price: number | null
          updated_at: string | null
        }
        Insert: {
          barcode?: string | null
          category_id?: string | null
          company_id?: string | null
          cost?: number | null
          created_at?: string | null
          description?: string | null
          id?: string
          min_stock_level?: number | null
          name: string
          price?: number | null
          sku?: string | null
          stock_quantity?: number | null
          unit_price?: number | null
          updated_at?: string | null
        }
        Update: {
          barcode?: string | null
          category_id?: string | null
          company_id?: string | null
          cost?: number | null
          created_at?: string | null
          description?: string | null
          id?: string
          min_stock_level?: number | null
          name?: string
          price?: number | null
          sku?: string | null
          stock_quantity?: number | null
          unit_price?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "product_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          company_id: string | null
          created_at: string | null
          email: string | null
          first_name: string | null
          id: string
          is_company_admin: boolean | null
          is_first_login: boolean | null
          last_name: string | null
          role: string | null
          updated_at: string | null
        }
        Insert: {
          company_id?: string | null
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id: string
          is_company_admin?: boolean | null
          is_first_login?: boolean | null
          last_name?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          company_id?: string | null
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          is_company_admin?: boolean | null
          is_first_login?: boolean | null
          last_name?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      stock_movements: {
        Row: {
          company_id: string
          created_at: string
          id: string
          movement_type: string
          notes: string | null
          product_id: string
          quantity: number
          reference_id: string | null
          reference_type: string | null
        }
        Insert: {
          company_id: string
          created_at?: string
          id?: string
          movement_type: string
          notes?: string | null
          product_id: string
          quantity: number
          reference_id?: string | null
          reference_type?: string | null
        }
        Update: {
          company_id?: string
          created_at?: string
          id?: string
          movement_type?: string
          notes?: string | null
          product_id?: string
          quantity?: number
          reference_id?: string | null
          reference_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "stock_movements_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stock_movements_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      storage_sites: {
        Row: {
          address: string | null
          city: string | null
          company_id: string
          country: string | null
          created_at: string
          id: string
          is_active: boolean | null
          name: string
          updated_at: string
        }
        Insert: {
          address?: string | null
          city?: string | null
          company_id: string
          country?: string | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          name: string
          updated_at?: string
        }
        Update: {
          address?: string | null
          city?: string | null
          company_id?: string
          country?: string | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "storage_sites_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      subscription_plans: {
        Row: {
          created_at: string | null
          currency: string | null
          duration_months: number | null
          features: string[] | null
          id: string
          max_users: number | null
          name: string
          plan_type: string | null
          price: number | null
        }
        Insert: {
          created_at?: string | null
          currency?: string | null
          duration_months?: number | null
          features?: string[] | null
          id?: string
          max_users?: number | null
          name: string
          plan_type?: string | null
          price?: number | null
        }
        Update: {
          created_at?: string | null
          currency?: string | null
          duration_months?: number | null
          features?: string[] | null
          id?: string
          max_users?: number | null
          name?: string
          plan_type?: string | null
          price?: number | null
        }
        Relationships: []
      }
      system_admins: {
        Row: {
          created_at: string | null
          email: string
          id: string
          is_active: boolean | null
          is_first_login: boolean | null
          name: string
          password: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          is_active?: boolean | null
          is_first_login?: boolean | null
          name: string
          password?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          is_active?: boolean | null
          is_first_login?: boolean | null
          name?: string
          password?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      treasury_transactions: {
        Row: {
          amount: number
          category: string | null
          company_id: string
          created_at: string
          description: string
          id: string
          transaction_date: string
          transaction_type: string
          updated_at: string
        }
        Insert: {
          amount: number
          category?: string | null
          company_id: string
          created_at?: string
          description: string
          id?: string
          transaction_date?: string
          transaction_type: string
          updated_at?: string
        }
        Update: {
          amount?: number
          category?: string | null
          company_id?: string
          created_at?: string
          description?: string
          id?: string
          transaction_date?: string
          transaction_type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "treasury_transactions_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      trial_accounts: {
        Row: {
          company_id: string
          created_at: string
          expires_at: string | null
          id: string
          status: string | null
          updated_at: string
        }
        Insert: {
          company_id: string
          created_at?: string
          expires_at?: string | null
          id?: string
          status?: string | null
          updated_at?: string
        }
        Update: {
          company_id?: string
          created_at?: string
          expires_at?: string | null
          id?: string
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "trial_accounts_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
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
      [_ in never]: never
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
    Enums: {},
  },
} as const
