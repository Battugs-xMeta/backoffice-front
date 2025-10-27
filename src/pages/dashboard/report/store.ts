import dayjs from "dayjs";
import { atom } from "jotai";

export interface ReportFormInterface {
  year: number;
}
export const reportForm = atom<ReportFormInterface>({ year: dayjs().year() });
