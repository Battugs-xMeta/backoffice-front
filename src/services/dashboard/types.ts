import { Logo, Payment } from 'service/address/type';
import { City, Citys } from 'service/requested/types';
import { PaginationResponse } from 'types';

export interface DashboardFilter {
  care_center_id?: number;
  year?: string | number;
}

export interface CareCenterDetail {
  report: CarecenterReport;
  request: CareCenterRequest;
  care_center: CareCenter;
}
export interface CareCenterDisability {
  age_and_gender: AgeAndGender[];
  basic_count: number;
  disability_count: number;
  double_disability_count: number;
  one_disability_count: number;
  types: { name: string; total: number }[];
}

export interface CareCenter {
  eldely: Eldely;
  donation: Donation;
  movements: Movement[];
  list: PaginationResponse<any>;
  disability: CareCenterDisability;
}

export interface CareCenterRequest {
  accreditation: number;
  new_care_center: number;
}

export interface CarecenterReport {
  purchase: Activity;
  budget_plan: Activity;
  finance: Activity;
  expenditure_normative: Activity;
  thirty_percent_spending: Activity;
  donation: Activity;
  activity: Activity;
}

export interface Activity {
  total: number;
  current: number;
}

export interface Movement {
  name: string;
  status: number;
  count: number;
  percent: number;
}

export interface Donation {
  amount: number;
  cash_amount: number;
  other_amount: number;
  percent: number;
}

export interface Eldely {
  total: number;
  current: number;
  free_bed: number;
  age_and_gender: AgeAndGender[];
}

export interface AgeAndGender {
  age_range: string;
  count: number;
  male: number;
  femala: number;
}

export interface CareCenterListInterface {
  id: number;
  organization_name: string;
  organization_code: string;
  description: string;
  logo: Logo;
  bed_count: number;
  current_count: number;
  phone_number: string;
  email: string;
  city: City;
  district: Citys;
  khoroo: Citys;
  status: number;
  street: string;
  building: string;
  door_number: string;
  is_accreditation: boolean;
  payment: Payment;
}

// Dashboard Customer Interface
export interface DashboardCustomerInterface {
  care_center_id: number;
  care_center_name: string;
  current_year: DashboardCustomerYearInterface[];
  prev_year: DashboardCustomerYearInterface[];
  used_bed: number;
  capacity_bed: number;
}

export interface DashboardCustomerYearInterface {
  name: string;
  amount: number;
}

// Dashboard Normative Expense
export interface DashboarExpenseInterface {
  year: number;
  month: number;
  care_centers: NormativeExpenseCareCenterInterface[];
}

export interface NormativeExpenseCareCenterInterface {
  name: string;
  amount: number;
  color: string;
}
