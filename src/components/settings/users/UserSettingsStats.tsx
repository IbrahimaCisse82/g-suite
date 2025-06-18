
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Shield } from "lucide-react";
import { User } from "./types";

interface UserSettingsStatsProps {
  users: User[];
}

export const UserSettingsStats = ({ users }: UserSettingsStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total utilisateurs</p>
              <p className="text-3xl font-bold text-gray-900">{users.length}</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Utilisateurs actifs</p>
              <p className="text-3xl font-bold text-green-600">
                {users.filter(u => u.isActive).length}
              </p>
            </div>
            <Shield className="w-8 h-8 text-green-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Managers</p>
              <p className="text-3xl font-bold text-purple-600">
                {users.filter(u => u.role === 'manager').length}
              </p>
            </div>
            <Shield className="w-8 h-8 text-purple-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
