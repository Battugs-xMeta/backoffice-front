import { SuccessResponse } from "types";
import http from "..";
import {
  ReportDetailOfficeInterface,
  ReportPlanOtherInterface,
  ReportUniteDetailInterface,
} from "./type";
import { TransictiontypeList } from "service/transictions/types";

namespace reportDetail {
  export const getUniteReportDetail = (body: any) =>
    http.post<ReportUniteDetailInterface>(
      `/carecenter/report/get/consolidated`,
      {
        hasAuth: true,
        body,
      }
    );
  export const updateUniteReportDetail = (body: any) =>
    http.post<SuccessResponse>("/carecenter/report/consolidated", {
      hasAuth: true,
      body,
    });
  export const getPlan = (body: any) =>
    http.post<ReportPlanOtherInterface>(`/carecenter/report/get`, {
      hasAuth: true,
      body,
    });
  export const create = (body: any) =>
    http.post("/carecenter/report/create", { hasAuth: true, body });
  export const update = (body: any) =>
    http.put("/carecenter/report/update", { hasAuth: true, body });
  export const send = (body: any) =>
    http.post("/carecenter/report/send_request", { hasAuth: true, body });

  // ** NOTE ** : For Report Detail Activity Report Movements
  export const getACMovements = (body: any) =>
    http.post<TransictiontypeList[]>("/carecenter/report/get/movement", {
      hasAuth: true,
      body,
    });

  export const getActivity = (body: any) =>
    http.post<ReportDetailOfficeInterface>(`/carecenter/report/get/activity`, {
      hasAuth: true,
      body,
    });

  export const generateAc13 = (body: any) =>
    http.post<SuccessResponse>("carecenter/report/generate/ac13", {
      hasAuth: true,
      body,
    });

  export const generateAc14 = (body: any) =>
    http.post<SuccessResponse>("carecenter/report/generate/ac14", {
      hasAuth: true,
      body,
    });
}

export default reportDetail;
