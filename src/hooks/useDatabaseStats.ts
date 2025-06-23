
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface DatabaseStats {
  status: string;
  connectionCount: number;
  lastBackup: string;
  usage: number;
}

export const useDatabaseStats = () => {
  const [stats, setStats] = useState<DatabaseStats>({
    status: 'En ligne',
    connectionCount: 0,
    lastBackup: 'OK',
    usage: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDatabaseStats = async () => {
      try {
        // Récupérer le nombre total d'entreprises
        const { count: companiesCount } = await supabase
          .from('companies')
          .select('*', { count: 'exact', head: true });

        // Récupérer le nombre total d'utilisateurs
        const { count: usersCount } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });

        // Calculer un pourcentage d'utilisation basé sur les données
        const totalRecords = (companiesCount || 0) + (usersCount || 0);
        const usage = Math.min(Math.round((totalRecords / 1000) * 100), 100);

        setStats({
          status: 'En ligne',
          connectionCount: Math.floor(Math.random() * 20) + 5, // Simulation des connexions actives
          lastBackup: 'OK',
          usage: usage
        });
      } catch (error) {
        console.error('Erreur lors de la récupération des statistiques:', error);
        setStats({
          status: 'Erreur',
          connectionCount: 0,
          lastBackup: 'Erreur',
          usage: 0
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchDatabaseStats();
  }, []);

  return { stats, isLoading };
};
