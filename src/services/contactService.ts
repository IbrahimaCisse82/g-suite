
/**
 * Service pour la logique métier des contacts
 * Sépare la logique métier des composants UI
 */

export interface ContactData {
  id?: string;
  company_name: string;
  contact_person: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  postal_code?: string;
  country?: string;
}

export class ContactService {
  static validateContactData(data: Partial<ContactData>): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!data.company_name?.trim()) {
      errors.push('Nom de l\'entreprise requis');
    }

    if (!data.contact_person?.trim()) {
      errors.push('Personne de contact requise');
    }

    if (!data.email?.trim()) {
      errors.push('Email requis');
    } else if (!this.isValidEmail(data.email)) {
      errors.push('Format d\'email invalide');
    }

    if (!data.phone?.trim()) {
      errors.push('Téléphone requis');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static formatContactForDisplay(contact: ContactData): string {
    return `${contact.company_name} - ${contact.contact_person}`;
  }

  static generateContactSummary(contact: ContactData): string {
    const parts = [
      contact.company_name,
      contact.city,
      contact.country
    ].filter(Boolean);

    return parts.join(', ');
  }
}
