
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSecureAdminAuth } from '@/hooks/useSecureAdminAuth';
import { useToast } from '@/hooks/use-toast';
import { SecureAdminForm } from './SecureAdminForm';
import { PasswordCreationModal } from './PasswordCreationModal';
import { Button } from '@/components/ui/button';

export const SecureAdminLoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [showPasswordCreation, setShowPasswordCreation] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const { login, updatePassword } = useSecureAdminAuth();
  const { toast } = useToast();

  const handleSubmit = async (submittedFormData: { email: string; password: string }) => {
    setFormData(submittedFormData);
    setLoading(true);
    setErrors([]);

    try {
      const result = await login(submittedFormData.email, submittedFormData.password);
      
      if (result.success) {
        if (result.isFirstLogin) {
          setShowPasswordCreation(true);
        } else {
          navigate('/admin');
        }
      }
    } catch (error: any) {
      console.error('Login error:', error);
      setErrors([error.message || 'Une erreur est survenue lors de la connexion']);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordCreation = async (passwordData: { newPassword: string; confirmPassword: string }) => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setErrors(['Les mots de passe ne correspondent pas']);
      return;
    }

    if (passwordData.newPassword.length < 8) {
      setErrors(['Le nouveau mot de passe doit contenir au moins 8 caractères']);
      return;
    }

    setLoading(true);
    setErrors([]);

    try {
      await updatePassword(formData.email, passwordData.newPassword);
      navigate('/admin');
    } catch (error: any) {
      setErrors([error.message || 'Erreur lors de la création du mot de passe']);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {showPasswordCreation ? (
        <PasswordCreationModal 
          onSubmit={handlePasswordCreation}
          errors={errors}
          loading={loading}
        />
      ) : (
        <>
          <SecureAdminForm 
            onSubmit={handleSubmit}
            errors={errors}
            loading={loading}
          />
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <Button 
              variant="outline" 
              onClick={() => navigate('/')}
              className="text-sm"
            >
              Retour à l'accueil
            </Button>
          </div>
          
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 max-w-md">
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
              <p className="text-xs text-gray-600 text-center">
                <strong>Connexion sécurisée.</strong><br />
                Veuillez saisir vos identifiants personnels.<br />
                Contactez le support si vous rencontrez un problème d'accès.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
