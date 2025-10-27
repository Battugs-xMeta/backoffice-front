import { PaginationResponse, SuccessResponse } from "types";
import http from "..";
import { TrainingList } from "./type";

namespace training {
  export const create = (body: any) =>
    http.post("/carecenter/training", {
      hasAuth: true,
      body,
    });
  export const getTraining = (body: any) =>
    http.post<PaginationResponse<TrainingList>>("/carecenter/training/list", {
      hasAuth: true,
      body,
    });
  export const getUser = (id: any) =>
    http.get(`/user/${id}`, {
      hasAuth: true,
    });

  export const updateTraining = (body: any, id: number) =>
    http.put(`/carecenter/training/${id}`, {
      hasAuth: true,
      body,
    });
  export const deleteTraining = (id: number) =>
    http.del<SuccessResponse>(`/carecenter/training/${id}`, {
      hasAuth: true,
    });
}

export default training;
