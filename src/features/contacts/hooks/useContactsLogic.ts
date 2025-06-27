
import { useState, useCallback } from 'react';
import { useContactsQuery } from '@/hooks/contacts/useContactsQuery';
import { useContactsHandlers } from '@/hooks/useContactsHandlers';
import { usePerformance } from '@/hooks/usePerformance';

export const useContactsLogic = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedContact, setSelectedContact] = useState<any>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [editingContact, setEditingContact] = useState<any>(null);
  const [showEditForm, setShowEditForm] = useState(false);
  
  const { data: contacts = [], isLoading: loading, error } = useContactsQuery();
  const { handleCreateContact, handleEditContact, handleDeleteContact } = useContactsHandlers();
  const { measureOperation } = usePerformance('Contacts');

  const openCreateForm = useCallback(() => {
    setShowCreateForm(true);
  }, []);

  const closeCreateForm = useCallback(() => {
    setShowCreateForm(false);
  }, []);

  const handleViewContact = useCallback((contact: any) => {
    const endMeasure = measureOperation('View Contact');
    setSelectedContact(contact);
    setShowDetails(true);
    endMeasure();
  }, [measureOperation]);

  const handleEditContactClick = useCallback((contact: any) => {
    setEditingContact(contact);
    setShowEditForm(true);
  }, []);

  const closeEditForm = useCallback(() => {
    setEditingContact(null);
    setShowEditForm(false);
  }, []);

  const closeDetails = useCallback(() => {
    setSelectedContact(null);
    setShowDetails(false);
  }, []);

  const onContactCreated = useCallback(async (contactData: any) => {
    const endMeasure = measureOperation('Create Contact');
    try {
      await handleCreateContact(contactData);
      setShowCreateForm(false);
    } finally {
      endMeasure();
    }
  }, [handleCreateContact, measureOperation]);

  const onContactEdited = useCallback(async (contactData: any) => {
    const endMeasure = measureOperation('Edit Contact');
    try {
      await handleEditContact(editingContact?.id, contactData);
      setShowEditForm(false);
      setEditingContact(null);
    } finally {
      endMeasure();
    }
  }, [handleEditContact, editingContact, measureOperation]);

  return {
    // State
    contacts,
    loading,
    error,
    showCreateForm,
    selectedContact,
    showDetails,
    editingContact,
    showEditForm,
    
    // Actions
    openCreateForm,
    closeCreateForm,
    handleViewContact,
    handleEditContactClick,
    closeEditForm,
    closeDetails,
    onContactCreated,
    onContactEdited,
    handleDeleteContact,
  };
};
