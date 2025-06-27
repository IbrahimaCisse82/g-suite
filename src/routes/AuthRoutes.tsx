
import React from 'react';
import { Route } from 'react-router-dom';
import UserLogin from '@/pages/UserLogin';
import ResetPassword from '@/pages/ResetPassword';
import TrialActivation from '@/pages/TrialActivation';

export const AuthRoutes = () => (
  <>
    <Route path="/auth/login" element={<UserLogin />} />
    <Route path="/user-login" element={<UserLogin />} />
    <Route path="/auth/reset-password" element={<ResetPassword />} />
    <Route path="/trial-activation/:token" element={<TrialActivation />} />
  </>
);
