import http from "..";
import {
  ReportHalfYearBaseInterface,
  ReportHalfYearInterface,
  ReportMonthBaseInterface,
  ReportMonthlyInterface,
  ReportPlanInterface,
} from "./types";

namespace report {
  export const listHalfYear = (body: any) =>
    http.post<ReportHalfYearInterface[]>("/carecenter/report/half_year", {
      hasAuth: true,
      body,
    });
  export const listMonthly = (body: any) =>
    http.post<ReportMonthlyInterface[]>("/carecenter/report/monthly", {
      hasAuth: true,
      body,
    });
  export const get = (body: any) =>
    http.post<ReportMonthBaseInterface[] | ReportHalfYearBaseInterface[]>(
      `/carecenter/report/get`,
      { hasAuth: true, body }
    );
  export const update = (id: number, body: any) =>
    http.put(`/carecenter/report/${id}`, { hasAuth: true, body });
  export const remove = () =>
    http.del("/carecenter/report/delete", { hasAuth: true });
  export const getPlan = (id: number) =>
    http.get<ReportPlanInterface>(`/carecenter/report/report_plan/${id}`, {
      hasAuth: true,
    });
}

export default report;
