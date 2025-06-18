
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { UserBasicInfo } from './user-details/UserBasicInfo';
import { UserPermissions } from './user-details/UserPermissions';
import { UserActivity } from './user-details/UserActivity';

interface UserDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
}

export const UserDetailsDialog = ({ isOpen, onClose, user }: UserDetailsDialogProps) => {
  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-semibold">
                {user.firstName[0]}{user.lastName[0]}
              </span>
            </div>
            Détails de l'utilisateur
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <UserBasicInfo user={user} />
          <UserPermissions user={user} />
          <UserActivity user={user} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
