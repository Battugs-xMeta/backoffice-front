import { PaginationResponse, SuccessResponse } from "types";
import http from "..";
import { MenuInterface, RoleInterface } from "./type";

namespace roleManagement {
  export const list = (body?: any) =>
    http.post<PaginationResponse<RoleInterface>>("/carecenter/role/list", {
      hasAuth: true,
      body,
    });
  export const listAll = (body?: any) =>
    http.get<RoleInterface[]>("/carecenter/role/list/all", {
      hasAuth: true,
      body,
    });
  export const create = (body: any) =>
    http.post("/carecenter/role", { hasAuth: true, body });

  export const update = (id: number, body: any) =>
    http.put(`/carecenter/role/${id}`, { hasAuth: true, body });

  export const remove = (id: string) => {
    return null;
  };

  export const assign = (id: number, body: any) =>
    http.put<SuccessResponse>(`/carecenter/employee/add_role/${id}`, {
      hasAuth: true,
      body,
    });

  export const unAssign = (id: number) =>
    http.put<SuccessResponse>(`/carecenter/employee/remove_role/${id}`, {
      hasAuth: true,
    });

  export const listEmployee = (body?: any) =>
    http.post("/carecenter/role/employee/list", { hasAuth: true, body });

  export const listMenu = (body?: any) =>
    http.get<MenuInterface[]>("/carecenter/menu/list/childs", {
      hasAuth: true,
      body,
    });
}

export default roleManagement;
