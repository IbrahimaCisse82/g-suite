
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { LoginForm } from '@/components/auth/LoginForm';
import { PasswordCreationForm } from '@/components/auth/PasswordCreationForm';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstLogin, setIsFirstLogin] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Vérifier si l'utilisateur a un profil avec un compte d'entreprise
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('company_id, role, is_first_login')
        .eq('id', data.user.id)
        .single();

      if (profileError || !profile || !profile.company_id) {
        await supabase.auth.signOut();
        throw new Error('Aucun compte d\'entreprise associé à cet email');
      }

      // Vérifier si c'est la première connexion
      if (profile.is_first_login) {
        setIsFirstLogin(true);
        toast.info('Première connexion détectée. Veuillez créer un nouveau mot de passe.');
        return;
      }

      toast.success('Connexion réussie');
      navigate('/dashboard');
      
    } catch (error: any) {
      toast.error(error.message || 'Erreur de connexion');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordCreated = () => {
    setIsFirstLogin(false);
  };

  if (isFirstLogin) {
    return <PasswordCreationForm onPasswordCreated={handlePasswordCreated} />;
  }

  return (
    <LoginForm
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      onSubmit={handleLogin}
      isLoading={isLoading}
    />
  );
};

export default UserLogin;
