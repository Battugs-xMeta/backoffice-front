import { PaginationResponse, SuccessResponse } from "types";
import http from "..";
import { TransictiontypeList } from "./types";

namespace transictions {
  export const list = (body: any) =>
    http.post<PaginationResponse<TransictiontypeList>>(
      `/carecenter/movement/list`,
      {
        hasAuth: true,
        body,
      }
    );
  export const getTransictionUserDetail = (id: number) =>
    http.get<any>(`/carecenter/movement/${id}`, {
      hasAuth: true,
    });

  export const create = (body: any) =>
    http.post<SuccessResponse>("/ministry/developer_plan", {
      hasAuth: true,
      body,
    });
  export const update = (body: any, id: any) =>
    http.put<SuccessResponse>(`/ministry/developer_plan/${id}`, {
      hasAuth: true,
      body,
    });
  export const deletePlan = (id: any) =>
    http.del<SuccessResponse>(`/ministry/developer_plan/${id}`, {
      hasAuth: true,
    });
  export const CreateTransictions = (body: any) =>
    http.post<SuccessResponse>("/carecenter/movement", {
      hasAuth: true,
      body,
    });
}

export default transictions;
