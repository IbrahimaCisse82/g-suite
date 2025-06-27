
import React from 'react';
import { Route } from 'react-router-dom';
import SettingsLayout from '@/pages/SettingsLayout';
import { Settings } from '@/pages/Settings';
import ProfileSettings from '@/pages/ProfileSettings';
import UsersSettings from '@/pages/UsersSettings';
import { SubscriptionSettings } from '@/pages/SubscriptionSettings';
import LicensesSettings from '@/pages/LicensesSettings';

export const SettingsRoutes = () => (
  <Route path="/settings" element={<SettingsLayout />}>
    <Route index element={<Settings />} />
    <Route path="profile" element={<ProfileSettings />} />
    <Route path="users" element={<UsersSettings />} />
    <Route path="subscriptions" element={<SubscriptionSettings />} />
    <Route path="licenses" element={<LicensesSettings />} />
  </Route>
);
