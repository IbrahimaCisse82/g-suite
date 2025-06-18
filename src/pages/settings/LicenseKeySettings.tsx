
import React from "react";
import { LicenseKeySettings } from "@/components/settings/LicenseKeySettings";
import { Layout } from '@/components/Layout';

export default function LicenseKeySettingsPage() {
  return (
    <Layout>
      <div className="gradient-bg min-h-full">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-readable-primary mb-2">Clés de licence</h1>
            <p className="text-xl text-readable-secondary">Gérez vos licences et abonnements</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg">
            <LicenseKeySettings />
          </div>
        </div>
      </div>
    </Layout>
  );
}
