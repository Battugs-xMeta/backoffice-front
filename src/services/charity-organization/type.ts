import { CreatedEmployee } from "service/care-information/types";

export interface CharityOrganizationList {
  id: number;
  created_at: Date;
  updated_at: Date;
  care_center_id: number;
  company_name: string;
  phone_numbers: string[];
  address: string;
  created_employee_id: number;
  created_employee: CreatedEmployee;
}
