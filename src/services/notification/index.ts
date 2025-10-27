import { PaginationResponse, SuccessResponse } from "types";
import http from "..";
import { Notification } from "./type";

namespace notificationService {
  export const list = (body?: any) =>
    http.post<Notification>("/carecenter/notification/list", {
      hasAuth: true,
      body,
    });
  export const update = (id: number, body: any) =>
    http.put<SuccessResponse>(`/carecenter/notification/${id}`, {
      body,
      hasAuth: true,
    });

  export const seenAll = () =>
    http.put<SuccessResponse>(`/carecenter/notification/seen_all`, {
      hasAuth: true,
    });

  export const seenEachNotif = (id: number) =>
    http.put<SuccessResponse>(`/carecenter/notification/seen/${id}`, {
      hasAuth: true,
    });
}

export default notificationService;
