import { CareCenterListInterface } from "service/dashboard/types";
import { FileInterface } from "service/file/types";
import { Base } from "types";

export enum FilterTypeline {
  A13 = "A13", // AC-1.3
  A14 = "A14", // AC-1.4",
  A15 = "A15", // "AC-1.5",
  A16 = "A16", // "AC-1.6",
}

export enum REPORT_PLAN_TYPE {
  PERFORMANCE = 1,
  PLANS = 2,
  NEWS = 3,
}

export interface FilterReportButton {
  value: FilterTypeline;
  label: string;
}

export enum REPORT_STATUS {
  NOT_SENT = 0, // Мэдээ илгээгээгүй
  NOTIME_SUBMIT = 1, // Мэдээ оруулах хугацаа болоогүй
  AVAILABLE = 2, // Мэдээ оруулах хугацаа болсон
  LATE_SENT = 3, // Хоцорч оруулсан
  SENT = 4, // Мэдээ илгээсэн / Хугацаандаа оуулсан
  CONFIRMED = 5, // Батлагдсан
  RETURNED = 6, // Буцаасан тайлан
  SAVED = 7, // Хадгалсан
}

export enum REPORT_CODE {
  EXPENSE = "expense",
  NORMATIVE_EXPENSE = "normative_expense",
  DONATION = "donation",
  UNITED = "united_report",
  ACTIVITY = "activity_report",
}

export interface ReportMonthlyInterface {
  monthly_day_start?: number;
  monthly_day_end?: number;
  months: ReportMonthInterface[];
  name: string;
  plan_type: REPORT_PLAN_TYPE;
  is_difficulty: boolean;
  code?: REPORT_CODE;
  report_id: number;
}

export interface ReportHalfYearInterface {
  name: string;
  plan_type: REPORT_PLAN_TYPE;
  half_year: ReportMonthInterface[];
  half_year_month_end: number;
  half_year_month_end_day: number;
  half_year_month_end_day_deadline: number;
  half_year_month_end_deadline: number;
  half_year_month_start: number;
  half_year_month_start_day: number;
  half_year_month_start_day_deadline: number;
  half_year_month_start_deadline: number;
  is_difficulty: boolean;
  code?: REPORT_CODE;
  report_id: number;
}

export interface ReportMonthBaseInterface extends Base {
  approved_date?: Date;
  approved_user_id: number;
  care_center_id: number;
  report_excel_id: number;
  report_pdf_id: number;
  report_excel?: FileInterface;
  report_pdf?: FileInterface;
  report_plan_id: number;
  status: REPORT_STATUS;
}

export interface ReportHalfYearBaseInterface extends Base {
  approved_date?: Date;
  approved_user_id: number;
  care_center_id: number;
  report_excel_id: number;
  report_pdf_id: number;
  report_excel?: FileInterface;
  report_pdf?: FileInterface;
  report_plan_id: number;
  status: REPORT_STATUS;
}

export interface ReportMonthInterface {
  name: string;
  status: number;
  return_description?: string;
}

export enum REPORT_PLAN_FREQUENCY {
  MONTHLY = 1,
  HALF_YEAR = 2,
}
export interface ReportPlanInterface extends Base {
  is_difficult: boolean;
  code: string;
  name: string;
  plan_type: REPORT_PLAN_TYPE;
  frequency: REPORT_PLAN_FREQUENCY;
  monthly_day_start?: number;
  monthly_day_end?: number;
  half_year_month_end: number;
  half_year_month_end_day: number;
  half_year_month_end_day_deadline: number;
  half_year_month_end_deadline: number;
  half_year_month_start: number;
  half_year_month_start_day: number;
  half_year_month_start_day_deadline: number;
  half_year_month_start_deadline: number;
  property_type: number;
  description: string;
  care_centers?: CareCenterListInterface[];
  document_id: number;
  document?: FileInterface;
  only_office_token?: string;
}
