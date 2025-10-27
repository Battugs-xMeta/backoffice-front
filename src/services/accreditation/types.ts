import { extend } from "lodash";
import { User } from "service/auth/type";
import { FileInterface } from "service/file/types";
import { Base } from "types";

export interface Accreditation extends Base {
  care_center_id: number;
  start_year: number;
  end_year: number;
  letter_of_request: FileInterface[];
  resumes_of_employees: FileInterface[];
  company_profile: FileInterface[];
  company_certificate: FileInterface[];
  further_improvement_plan: FileInterface[];
  conclusion_of_security: FileInterface[];
  standardized_report: FileInterface[];
  financial_statement: FileInterface[];
  activity_report: FileInterface[];
  year_end_report: FileInterface[];
  // created_employee_id: number;
  // created_employee: EdEmployee;
  // modified_employee_id: number;
  // modified_employee: EdEmployee;
  user_id: null;
  status: number;
  return_description: string;
  approved_date: Date;
  protocols: FileInterface[];
  certificates: FileInterface[];
  status_histories: StatusHistory[];
  certificate_date: Date;
  user: any;
}

export interface ActivityReport {
  id: number;
  created_at: string;
  updated_at: string;
  file_name: string;
  original_name: string;
  physical_path: string;
  extention: string;
  file_size: number;
}

export interface EdEmployee {
  id: number;
  created_at: string;
  updated_at: string;
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
}

export interface StatusHistory {
  id: number;
  created_at: string;
  updated_at: string;
  accreditation_id: number;
  status: number;
  description: string;
  employee_id: number | null;
  user_id?: number;
}

export interface AccreditationInput {
  id: number;
  created_at: string;
  updated_at: string;
  care_center_id: number;
  start_year: number;
  end_year: number;
  letter_of_request: null;
  resumes_of_employees: null;
  company_profile: null;
  company_certificate: null;
  further_improvement_plan: null;
  conclusion_of_security: null;
  standardized_report: null;
  financial_statement: null;
  activity_report: null;
  year_end_report: null;
  created_employee_id: number;
  modified_employee_id: number;
  user_id: number;
  status: number;
  return_description: string;
  approved_date: string;
  protocols: null;
  certificates: null;
  certificate_date: string;
}
