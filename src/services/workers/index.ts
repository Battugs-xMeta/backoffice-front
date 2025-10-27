import { PaginationResponse, SuccessResponse } from "types";
import http from "..";
import { WorkerList } from "./type";

namespace workers {
  export const createWorkers = (body: any) =>
    http.post("/carecenter/employee", {
      hasAuth: true,
      body,
    });

  export const getWorkers = (body: any) =>
    http.post<PaginationResponse<WorkerList>>("/carecenter/employee/list", {
      hasAuth: true,
      body,
    });
  export const listActive = (body?: any) =>
    http.get<WorkerList[]>(`/carecenter/employee/list/active`, {
      hasAuth: true,
      body,
    });

  export const getUser = (id: any) =>
    http.get(`/user/${id}`, {
      hasAuth: true,
    });
  export const updateWorkers = (body: any, id: number) =>
    http.put(`/carecenter/employee/${id}`, {
      hasAuth: true,
      body,
    });
  export const deleteWorkers = (id: number) =>
    http.del<SuccessResponse>(`/carecenter/employee/${id}`, {
      hasAuth: true,
    });
  export const choisenCareCentersWorkers = (body: any) =>
    http.post<WorkerList[]>(`/carecenter/care_center/employees`, {
      hasAuth: true,
      body,
    });
}

export default workers;
