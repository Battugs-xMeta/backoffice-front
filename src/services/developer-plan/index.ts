import { PaginationResponse, SuccessResponse } from "types";
import http from "..";
import { PlanList } from "./type";

namespace developerPlan {
  export const create = (body: any) =>
    http.post<SuccessResponse>("/carecenter/developer_plan", {
      hasAuth: true,
      body,
    });
  export const list = (body: any) =>
    http.post<PaginationResponse<PlanList>>("/carecenter/developer_plan/list", {
      hasAuth: true,
      body,
    });
  export const update = (body: any, id: any) =>
    http.put<SuccessResponse>(`/carecenter/developer_plan/${id}`, {
      hasAuth: true,
      body,
    });
  export const deletePlan = (id: any) =>
    http.del<SuccessResponse>(`/carecenter/developer_plan/${id}`, {
      hasAuth: true,
    });
}

export default developerPlan;
