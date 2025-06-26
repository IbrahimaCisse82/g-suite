
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

interface Budget {
  id: string;
  name: string;
  fiscal_year: number;
  start_date: string;
  end_date: string;
  total_amount: number;
  status: string;
  created_at: string;
}

interface BudgetLine {
  id: string;
  budget_id: string;
  account_number: string;
  account_name: string;
  budgeted_amount: number;
  actual_amount: number;
  variance: number;
  category: string;
  notes?: string;
}

export const useBudgets = () => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [budgetLines, setBudgetLines] = useState<BudgetLine[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchBudgets = async () => {
    try {
      const { data, error } = await supabase
        .from('budgets')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBudgets(data || []);
    } catch (error) {
      console.error('Erreur lors du chargement des budgets:', error);
      toast.error('Erreur lors du chargement des budgets');
    } finally {
      setLoading(false);
    }
  };

  const fetchBudgetLines = async (budgetId: string) => {
    try {
      const { data, error } = await supabase
        .from('budget_lines')
        .select('*')
        .eq('budget_id', budgetId)
        .order('account_number');

      if (error) throw error;
      setBudgetLines(data || []);
    } catch (error) {
      console.error('Erreur lors du chargement des lignes de budget:', error);
      toast.error('Erreur lors du chargement des lignes de budget');
    }
  };

  const createBudget = async (budgetData: any) => {
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('company_id')
        .eq('id', user?.id)
        .single();

      const { data, error } = await supabase
        .from('budgets')
        .insert([{
          ...budgetData,
          company_id: profile?.company_id,
          created_by: user?.id
        }])
        .select()
        .single();

      if (error) throw error;
      
      setBudgets(prev => [data, ...prev]);
      toast.success('Budget créé avec succès');
      return data;
    } catch (error) {
      console.error('Erreur lors de la création du budget:', error);
      toast.error('Erreur lors de la création du budget');
      throw error;
    }
  };

  const createBudgetLine = async (budgetId: string, lineData: any) => {
    try {
      const { data, error } = await supabase
        .from('budget_lines')
        .insert([{
          ...lineData,
          budget_id: budgetId
        }])
        .select()
        .single();

      if (error) throw error;
      
      setBudgetLines(prev => [...prev, data]);
      toast.success('Ligne de budget ajoutée avec succès');
      return data;
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la ligne:', error);
      toast.error('Erreur lors de l\'ajout de la ligne');
      throw error;
    }
  };

  const deleteBudget = async (budgetId: string) => {
    try {
      const { error } = await supabase
        .from('budgets')
        .delete()
        .eq('id', budgetId);

      if (error) throw error;
      
      setBudgets(prev => prev.filter(b => b.id !== budgetId));
      toast.success('Budget supprimé avec succès');
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      toast.error('Erreur lors de la suppression');
      throw error;
    }
  };

  useEffect(() => {
    if (user) {
      fetchBudgets();
    }
  }, [user]);

  return {
    budgets,
    budgetLines,
    loading,
    createBudget,
    createBudgetLine,
    deleteBudget,
    fetchBudgetLines
  };
};
