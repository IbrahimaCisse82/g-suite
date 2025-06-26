
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface EmployeeFormData {
  employee_number: string;
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  address?: string;
  position: string;
  department?: string;
  hire_date: Date;
  contract_type: string;
  salary?: number;
}

interface EmployeeFormProps {
  onSubmit: (data: EmployeeFormData) => void;
  onCancel: () => void;
}

export const EmployeeForm = ({ onSubmit, onCancel }: EmployeeFormProps) => {
  const [hireDate, setHireDate] = React.useState<Date>();
  
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<EmployeeFormData>();

  const handleFormSubmit = (data: EmployeeFormData) => {
    onSubmit({
      ...data,
      hire_date: hireDate!
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Nouvel Employé</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="employee_number">Numéro employé</Label>
              <Input
                id="employee_number"
                {...register('employee_number', { required: 'Le numéro est requis' })}
                placeholder="EMP001"
              />
              {errors.employee_number && <p className="text-red-500 text-sm">{errors.employee_number.message}</p>}
            </div>
            
            <div>
              <Label htmlFor="first_name">Prénom</Label>
              <Input
                id="first_name"
                {...register('first_name', { required: 'Le prénom est requis' })}
                placeholder="Jean"
              />
              {errors.first_name && <p className="text-red-500 text-sm">{errors.first_name.message}</p>}
            </div>

            <div>
              <Label htmlFor="last_name">Nom</Label>
              <Input
                id="last_name"
                {...register('last_name', { required: 'Le nom est requis' })}
                placeholder="Dupont"
              />
              {errors.last_name && <p className="text-red-500 text-sm">{errors.last_name.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                placeholder="jean.dupont@entreprise.com"
              />
            </div>
            
            <div>
              <Label htmlFor="phone">Téléphone</Label>
              <Input
                id="phone"
                {...register('phone')}
                placeholder="+221 77 123 45 67"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="address">Adresse</Label>
            <Textarea
              id="address"
              {...register('address')}
              placeholder="Adresse complète..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="position">Poste</Label>
              <Input
                id="position"
                {...register('position', { required: 'Le poste est requis' })}
                placeholder="Comptable"
              />
              {errors.position && <p className="text-red-500 text-sm">{errors.position.message}</p>}
            </div>

            <div>
              <Label htmlFor="department">Département</Label>
              <Input
                id="department"
                {...register('department')}
                placeholder="Comptabilité"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label>Date d'embauche</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {hireDate ? format(hireDate, 'dd MMMM yyyy', { locale: fr }) : 'Sélectionner'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={hireDate}
                    onSelect={setHireDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label htmlFor="contract_type">Type de contrat</Label>
              <Select onValueChange={(value) => setValue('contract_type', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Type de contrat" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cdi">CDI</SelectItem>
                  <SelectItem value="cdd">CDD</SelectItem>
                  <SelectItem value="stage">Stage</SelectItem>
                  <SelectItem value="freelance">Freelance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="salary">Salaire (XOF)</Label>
              <Input
                id="salary"
                type="number"
                {...register('salary', { min: 0 })}
                placeholder="150000"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Annuler
            </Button>
            <Button type="submit">
              Créer l'employé
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
