
export interface ModuleMaintenance {
  id: string;
  module_name: string;
  sub_module_name?: string;
  is_disabled: boolean;
  maintenance_reason?: string;
  disabled_by: string;
  disabled_at: string;
  estimated_end_time?: string;
}

export interface NewMaintenanceForm {
  module_name: string;
  sub_module_name: string;
  maintenance_reason: string;
  estimated_end_time: string;
}

export interface Module {
  id: string;
  name: string;
  submodules: string[];
}
