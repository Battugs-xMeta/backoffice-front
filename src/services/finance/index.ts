import { PaginationResponse, SuccessResponse } from "types";
import http from "..";
import {
  DonationExpensePaginzation,
  DonationPaginzation,
  ExpensePaginzation,
  GetNormativeType,
  InfoType,
  NormativeBudgesTypeList,
  NormativeDetailList,
  NormativeHistory,
} from "./type";
// import { TransictiontypeList } from "./types";

namespace finance {
  // З0%  ийн зарцуулалт api-service
  export const listSpend30 = (body: any) =>
    http.post<ExpensePaginzation>(`/carecenter/expense/list`, {
      hasAuth: true,
      body,
    });
  export const CreateSpend30 = (body: any) =>
    http.post<SuccessResponse>("/carecenter/expense", {
      hasAuth: true,
      body,
    });
  export const updateSpend30 = (body: any, id: any) =>
    http.put<SuccessResponse>(`/carecenter/expense/${id}`, {
      hasAuth: true,
      body,
    });
  export const deleteSpend30 = (id: any) =>
    http.del<SuccessResponse>(`/carecenter/expense/${id}`, {
      hasAuth: true,
    });

  // Хандивийн бүрдүүлэлт төрөл : Мөнгөн хандив
  export const listDonationMoney = (body: any) =>
    http.post<DonationPaginzation>(`/carecenter/donation/list`, {
      hasAuth: true,
      body,
    });
  export const approveDonation = (id: number) =>
    http.put<SuccessResponse>(`/carecenter/donation/approve/${id}`, {
      hasAuth: true,
    });
  export const CreateDonationMoney = (body: any) =>
    http.post<SuccessResponse>("/carecenter/donation", {
      hasAuth: true,
      body,
    });
  export const updateDonationMoney = (body: any, id: any) =>
    http.put<SuccessResponse>(`/carecenter/donation/${id}`, {
      hasAuth: true,
      body,
    });
  export const deleteDonatioMoney = (id: any) =>
    http.del<SuccessResponse>(`/carecenter/donation/${id}`, {
      hasAuth: true,
    });

  // Хандивийн зарцуулалт
  export const listDonationSpend = (body: any) =>
    http.post<DonationExpensePaginzation>(
      `/carecenter/dontation_expense/list`,
      {
        hasAuth: true,
        body,
      }
    );

  export const CreateDonationSpend = (body: any) =>
    http.post<SuccessResponse>("/carecenter/dontation_expense", {
      hasAuth: true,
      body,
    });
  export const updateDonationSpend = (body: any, id: any) =>
    http.put<SuccessResponse>(`/carecenter/dontation_expense/${id}`, {
      hasAuth: true,
      body,
    });
  export const deleteDonationSpend = (id: any) =>
    http.del<SuccessResponse>(`/carecenter/dontation_expense/${id}`, {
      hasAuth: true,
    });

  // Норматив
  export const listNorBudget = (body: any) =>
    http.post<NormativeBudgesTypeList[]>(
      `/carecenter/normative_expense_budget/list`,
      {
        hasAuth: true,
        body,
      }
    );
  export const CreateNorBudget = (body: any) =>
    http.post<SuccessResponse>("/carecenter/normative_expense_budget", {
      hasAuth: true,
      body,
    });
  export const updateNorBudget = (body: any, id: any) =>
    http.put<SuccessResponse>(`/carecenter/normative_expense_budget/${id}`, {
      hasAuth: true,
      body,
    });
  export const getNorBudget = (id: any) =>
    http.get<GetNormativeType>(`/carecenter/normative_expense_budget/${id}`, {
      hasAuth: true,
    });
  export const getBudgetHistory = (id: any) =>
    http.get<NormativeHistory[]>(
      `/carecenter/normative_expense_budget/history/${id}`,
      {
        hasAuth: true,
      }
    );
  export const normative_info = (body: any) =>
    http.post<InfoType>(`/carecenter/normative_expense_budget/info`, {
      hasAuth: true,
      body,
    });

  // Detail normative
  export const listNorDetail = (body: any) =>
    http.post<PaginationResponse<NormativeDetailList>>(
      `/carecenter/normative_expense/list`,
      {
        hasAuth: true,
        body,
      }
    );
  export const CreateNorDetail = (body: any) =>
    http.post<SuccessResponse>("/carecenter/normative_expense", {
      hasAuth: true,
      body,
    });

  export const updateNorDetail = (body: any, id: any) =>
    http.put<SuccessResponse>(`/carecenter/normative_expense/${id}`, {
      hasAuth: true,
      body,
    });

  export const deleteNorDetail = (id: any) =>
    http.del<SuccessResponse>(`/carecenter/normative_expense/${id}`, {
      hasAuth: true,
    });
}

export default finance;
