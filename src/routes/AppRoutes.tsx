
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { StaticRoutes } from './StaticRoutes';
import { AuthRoutes } from './AuthRoutes';
import { AdminRoutes } from './AdminRoutes';
import { CoreRoutes } from './CoreRoutes';
import { SolutionRoutes } from './SolutionRoutes';
import { TPERoutes } from './TPERoutes';
import { SettingsRoutes } from './SettingsRoutes';
import NotFound from '@/pages/NotFound';

export const AppRoutes = () => (
  <Routes>
    {StaticRoutes()}
    {TPERoutes()}
    {SolutionRoutes()}
    {AdminRoutes()}
    {AuthRoutes()}
    {CoreRoutes()}
    {SettingsRoutes()}
    <Route path="*" element={<NotFound />} />
  </Routes>
);
