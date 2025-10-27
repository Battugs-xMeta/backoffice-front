import { PaginationResponse, SuccessResponse } from "types";
import http from "..";
import { RequestItem, UserDetailListType } from "./types";

namespace requested {
  export const getRequested = (body: any) =>
    http.post<PaginationResponse<RequestItem>>("/carecenter/elderly/requests", {
      hasAuth: true,
      body,
    });
  export const getUserDetail = (id: number) =>
    http.get<UserDetailListType>(`/carecenter/elderly/${id}`, {
      hasAuth: true,
    });
  export const cancelRequest = (id: number, body: any) =>
    http.put(`/carecenter/elderly/change_status/${id}`, {
      hasAuth: true,
      body,
    });
  export const waitRequest = (id: number, body: any) =>
    http.put(`/carecenter/elderly/change_status/${id}`, {
      hasAuth: true,
      body,
    });
  export const getElderlyEvents = (id: any) =>
    http.get<any>(`carecenter/elderly/activity/${id}`, {
      hasAuth: true,
    });
}

export default requested;
