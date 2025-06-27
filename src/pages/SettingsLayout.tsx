
import React from "react";
import { Outlet } from "react-router-dom";
import { BaseLayout } from "@/components/layout/BaseLayout";

/**
 * Layout parent pour la section /settings et ses sous-pages
 */
export default function SettingsLayout() {
  return (
    <BaseLayout showBackButton={false}>
      <div className="min-h-full bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-5xl mx-auto py-8 flex flex-col gap-8">
          <Outlet />
        </div>
      </div>
    </BaseLayout>
  );
}
