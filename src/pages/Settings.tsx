
import React from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { BadgeCheck, Users, Building, Key } from "lucide-react";

// Simple sidebar navigation for sub-settings
const settingsNav = [
  {
    path: "/settings/profile",
    icon: <Building className="w-5 h-5" />,
    name: "Profil de l'entreprise",
  },
  {
    path: "/settings/users",
    icon: <Users className="w-5 h-5" />,
    name: "Utilisateurs",
  },
  {
    path: "/settings/licenses",
    icon: <Key className="w-5 h-5" />,
    name: "Clés de licence",
  },
];

export default function Settings() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="flex flex-col md:flex-row gap-8 md:gap-16 p-6 max-w-5xl mx-auto">
        {/* Sidebar navigation */}
        <nav className="md:w-56 flex-shrink-0 md:border-r md:border-border mt-2">
          <ul className="flex md:flex-col gap-2">
            {settingsNav.map(({ path, icon, name }) => (
              <li key={path}>
                <button
                  onClick={() => navigate(path)}
                  className={[
                    "w-full flex items-center gap-2 px-4 py-2 rounded transition-all",
                    pathname === path
                      ? "bg-green-100 text-green-700 font-semibold"
                      : "hover:bg-muted"
                  ].join(" ")}
                  aria-current={pathname === path ? "page" : undefined}
                >
                  {icon}
                  {name}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        {/* Main content */}
        <div className="flex-1 min-w-0">
          <Outlet />
        </div>
      </div>
    </Layout>
  );
}
