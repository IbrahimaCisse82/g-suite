
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirection automatique vers la page d'accueil principale
    navigate('/accueil', { replace: true });
  }, [navigate]);

  // Affichage temporaire pendant la redirection
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
        <p className="text-muted-foreground">Redirection vers l'accueil...</p>
      </div>
    </div>
  );
};

export default Index;
