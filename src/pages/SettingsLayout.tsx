
import React from "react";
import { Layout } from "@/components/Layout";
import { Outlet } from "react-router-dom";

/**
 * Layout parent pour la section /settings et ses sous-pages
 * Affiche le sidebar, le header, etc.
 */
export default function SettingsLayout() {
  return (
    <Layout>
      <div className="max-w-5xl mx-auto py-8 flex flex-col gap-8">
        <Outlet />
      </div>
    </Layout>
  );
}
