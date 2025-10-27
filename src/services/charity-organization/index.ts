import { PaginationResponse, SuccessResponse } from "types";
import http from "..";
import { CharityOrganizationList } from "./type";

namespace charityOrganization {
  export const list = (body: any) =>
    http.post<PaginationResponse<CharityOrganizationList>>(
      `/carecenter/charity_work/list`,
      {
        hasAuth: true,
        body,
      }
    );
  export const getDetail = (id: number) =>
    http.get<any>(`/carecenter/movement/${id}`, {
      hasAuth: true,
    });

  export const create = (body: any) =>
    http.post<SuccessResponse>("/carecenter/charity_work", {
      hasAuth: true,
      body,
    });
  export const update = (body: any, id: any) =>
    http.put<SuccessResponse>(`/carecenter/charity_work/${id}`, {
      hasAuth: true,
      body,
    });
  export const deleteOrg = (id: any) =>
    http.del<SuccessResponse>(`/carecenter/charity_work/${id}`, {
      hasAuth: true,
    });
}

export default charityOrganization;
