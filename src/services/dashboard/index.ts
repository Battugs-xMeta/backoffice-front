import http from "..";
import {
  CareCenterDetail,
  CareCenterListInterface,
  DashboarExpenseInterface,
  DashboardCustomerInterface,
  DashboardFilter,
} from "./types";

namespace Dashboard {
  export const getDashboard = () =>
    http.get<any>("carecenter/dashboard", {
      hasAuth: true,
    });
  export const getCareCenter = (body: DashboardFilter) =>
    http.post<CareCenterDetail>("carecenter/dashboard", {
      hasAuth: true,
      body,
    });
  export const getList = (body: any) =>
    http.post<CareCenterListInterface[]>(`/carecenter/list`, {
      hasAuth: true,
      body: body ? body : {},
    });
  export const getTotalCustomer = (body?: any) =>
    http.post<DashboardCustomerInterface[]>("/carecenter/dashboard/elderlies", {
      hasAuth: true,
      body,
    });
  export const getExpense = (body?: any) =>
    http.post<DashboarExpenseInterface[]>("/carecenter/dashboard/expense", {
      hasAuth: true,
      body,
    });
  export const getNormativeExpense = (body?: any) =>
    http.post<DashboarExpenseInterface[]>(
      "carecenter/dashboard/normative_expense",
      {
        body,
        hasAuth: true,
      }
    );
  export const getDonation = (body?: any) =>
    http.post<DashboarExpenseInterface[]>("/carecenter/dashboard/donation", {
      body,
      hasAuth: true,
    });
}

export default Dashboard;
