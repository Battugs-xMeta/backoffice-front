import { FileInterface } from "service/file/types";
import { ReportPlanInterface } from "service/report/types";
import { Base } from "types";

export interface ReportUniteDetailInterface extends Base {
  report_plan_id: number;
  report_plan?: ReportPlanInterface;

  numbers: ReportUniteNumberInterface[];
}

export interface ReportUniteNumberInterface extends Base {
  category_name: string;
  md?: string;
  service: {
    count: number;
    count_female: number;
    amount: number;
    amount_female: number;
  };
  elderly: {
    count: number;
    count_female: number;
    amount: number;
    amount_female: number;
  };
  disability: {
    count: number;
    count_female: number;
    amount: number;
    amount_female: number;
  };
}

export interface ReportPlanOtherInterface extends Base {
  report_plan_id: number;
  report_plan?: ReportPlanInterface;
  status: number;
  approved_date?: Date;
  report_excel?: FileInterface;
  report_pdf?: FileInterface;
  report_excel_id?: number;
  report_pdf_id?: number;
  approved_user_id?: number;
  return_description?: string;
}

export interface ReportDetailOfficeInterface extends Base {
  activity_report?: any;
  document_Key: string;
  is_generated: boolean;
  file_jwt: string;
  only_office_struct: OnlyOfficeInterface;
}

export interface OnlyOfficeInterface {
  document: {
    fileType: string;
    key: string;
    permissions: {
      edit: boolean;
    };
    title: string;
    url: string;
  };

  editorConfig: {
    callbackUrl: string;
  };
}
