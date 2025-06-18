
import React, { useState } from "react";
import { UserFormDialog } from "@/components/admin/UserFormDialog";
import { UserSettingsHeader } from "@/components/settings/users/UserSettingsHeader";
import { UserSettingsStats } from "@/components/settings/users/UserSettingsStats";
import { UsersList } from "@/components/settings/users/UsersList";
import { useUsersData } from "@/components/settings/users/useUsersData";

const UsersSettings = () => {
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const { users, handleAddUser } = useUsersData();

  const onAddUser = (userData: any) => {
    handleAddUser(userData);
    setIsAddUserOpen(false);
  };

  return (
    <div className="max-w-6xl mx-auto py-8 space-y-6">
      <UserSettingsHeader onAddUser={() => setIsAddUserOpen(true)} />
      <UserSettingsStats users={users} />
      <UsersList users={users} />

      <UserFormDialog
        isOpen={isAddUserOpen}
        onClose={() => setIsAddUserOpen(false)}
        onSubmit={onAddUser}
        title="Inviter un utilisateur"
      />
    </div>
  );
};

export default UsersSettings;
