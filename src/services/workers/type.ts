import { RoleInterface } from "service/role-management/type";
import { Base } from "types";

export enum GenderType {
  male = 0,
  female = 1,
}

export interface WorkerList {
  id: number;
  created_at: string;
  updated_at: string;
  profile_id: any;
  profile: Profile;
  family_name: string;
  rd: string;
  birth_date: string;
  gender: number;
  is_disability: boolean;
  salary: number;
  first_name: string;
  last_name: string;
  email: string;
  is_active: boolean;
  phone: string;
  position: string;
  care_center_id: number;
  total_worked_year: number;
  worker_year: number;
  role_id: number;
  role?: RoleInterface;
}

export interface Profile {
  id: number;
  created_at: string;
  updated_at: string;
  file_name: string;
  original_name: string;
  physical_path: string;
  extention: string;
  file_size: number;
}
