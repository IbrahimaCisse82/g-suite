
import { useState } from "react";
import { User, UserFormData } from "./types";

const initialUsers: User[] = [
  { 
    id: 1, 
    firstName: "Jean",
    lastName: "Dupont",
    email: "jean.dupont@exemple.com", 
    phone: "+33 1 23 45 67 89",
    role: "manager",
    isActive: true,
    lastLogin: "2024-01-15 10:30",
    createdAt: "2024-01-01"
  },
  { 
    id: 2, 
    firstName: "Marie",
    lastName: "Martin",
    email: "marie.martin@exemple.com", 
    phone: "+33 1 98 76 54 32",
    role: "comptable",
    isActive: true,
    lastLogin: "2024-01-14 16:45",
    createdAt: "2024-01-05"
  },
  { 
    id: 3, 
    firstName: "Pierre",
    lastName: "Dubois",
    email: "pierre.dubois@exemple.com", 
    phone: "+33 1 55 44 33 22",
    role: "commercial",
    isActive: false,
    lastLogin: "2024-01-10 08:15",
    createdAt: "2023-12-15"
  }
];

export const useUsersData = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);

  const handleAddUser = (userData: UserFormData) => {
    const newUser: User = {
      id: Math.max(...users.map(u => u.id)) + 1,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      phone: userData.phone || '',
      role: userData.role,
      isActive: userData.isActive,
      lastLogin: '',
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setUsers([...users, newUser]);
  };

  return {
    users,
    handleAddUser
  };
};
