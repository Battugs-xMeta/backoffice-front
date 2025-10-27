import { Base } from "types";

export enum GenderType {
  male = "male",
  female = "female",
}

// export interface TrainingList {
//   id: number;
//   created_at: Date;
//   updated_at: Date;
//   DeletedAt?: Date;
//   year?: string;
//   type?: string;
//   family_name: string;
//   rd: string;
//   birth_date: Date;
//   gender: string;
//   is_disability: boolean;
//   salary: number;
//   first_name: string;
//   last_name: string;
//   email: string;
//   phone: string;
//   position: string;
//   care_center_id: number;
// }

export interface TrainingList {
  id: number;
  created_at: Date;
  updated_at: Date;
  employee_id: number;
  employee: Employee;
  care_center_id: number;
  name: string;
  start_date: Date;
  end_date: Date;
  is_certificate: boolean;
  certificate_id?: number;
  certificate?: Certificate;
}

export interface Certificate {
  id: number;
  created_at: Date;
  updated_at: Date;
  file_name: string;
  original_name: string;
  physical_path: string;
  extention: string;
  file_size: number;
}

export interface Employee {
  id: number;
  created_at: Date;
  updated_at: Date;
  profile_id?: number;
  family_name: string;
  rd: string;
  birth_date: Date;
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
}
