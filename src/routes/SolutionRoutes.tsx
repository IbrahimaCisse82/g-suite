
import React from 'react';
import { Route } from 'react-router-dom';
import ComptabiliteSolution from '@/pages/solutions/ComptabiliteSolution';
import CommercialeSolution from '@/pages/solutions/CommercialeSolution';
import EntrepriseSolution from '@/pages/solutions/EntrepriseSolution';

export const SolutionRoutes = () => (
  <>
    <Route path="/solutions/comptabilite" element={<ComptabiliteSolution />} />
    <Route path="/solutions/commerciale" element={<CommercialeSolution />} />
    <Route path="/solutions/entreprise" element={<EntrepriseSolution />} />
  </>
);
