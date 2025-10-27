import dayjs from "dayjs";
import { atom } from "jotai";
import { ReportPlanOtherInterface } from "service/report-detail/type";

export enum ReportActivityDetailTab {
  "Б-АС-1.1А" = "Б-АС-1.1А",
  "Б-АС-1.1Б" = "Б-АС-1.1Б",
  "Б-АС-1.2" = "Б-АС-1.2",
  "Б-АС-1.3" = "Б-АС-1.3",
  "Б-АС-1.4" = "Б-АС-1.4",
  "Б-АС-1.5" = "Б-АС-1.5",
  "Б-АС-1.6" = "Б-АС-1.6",
}

export interface ReportDetailFormInterface {
  year: number;
  period: number;
  month?: number;
  code?: string;
  isFirst?: boolean;
  plan?: ReportPlanOtherInterface;
  tab?: ReportActivityDetailTab;
}

export const reportDetailForm = atom<ReportDetailFormInterface>({
  year: dayjs().year(),
  period: 1,
  month: dayjs().month() + 1,
});
