
import React from "react";
import { Outlet } from "react-router-dom";

/**
 * Layout parent pour la section /settings et ses sous-pages
 * N'utilise pas Layout pour éviter la duplication du sidebar
 */
export default function SettingsLayout() {
  return (
    <div className="max-w-5xl mx-auto py-8 flex flex-col gap-8">
      <Outlet />
    </div>
  );
}
