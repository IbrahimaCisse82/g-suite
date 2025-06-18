
import React from "react";
import { LicenseKeySettings } from "@/components/settings/LicenseKeySettings";
import { Layout } from '@/components/Layout';

export default function LicenseKeySettingsPage() {
  return (
    <Layout>
      <div className="gradient-bg min-h-full">
        <div className="max-w-2xl mx-auto py-8 px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-readable-primary">Clés de licence</h1>
            <p className="text-readable-secondary mt-2">Gérez vos licences et abonnements</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg">
            <LicenseKeySettings />
          </div>
        </div>
      </div>
    </Layout>
  );
}
