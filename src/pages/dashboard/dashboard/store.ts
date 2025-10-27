import dayjs from "dayjs";
import { atom } from "jotai";
import { CareCenterDetail } from "service/dashboard/types";

export interface DashboardStoreInterface {
  loading?: boolean;
  data?: CareCenterDetail;
  year: number;
}
export const dashboardStore = atom<DashboardStoreInterface>({
  year: dayjs().year(),
});
