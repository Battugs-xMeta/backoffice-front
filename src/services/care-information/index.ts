import { PaginationResponse, SuccessResponse } from "types";
import http from "..";
import {
  ElderlyDPlist,
  ElderlyList,
  HealthConditionType,
  StatusCount,
} from "./types";

namespace careInformation {
  export const create = (body: any) =>
    http.post("/carecenter/elderly", {
      hasAuth: true,
      body,
    });

  export const getElderlyList = (body: any) =>
    http.post<PaginationResponse<ElderlyList>>("/carecenter/elderly/list", {
      hasAuth: true,
      body,
    });
  export const getStatusCounts = () =>
    http.get<StatusCount[]>("/carecenter/elderly/counts", {
      hasAuth: true,
    });
  export const getUser = (id: any) =>
    http.get(`/user/${id}`, {
      hasAuth: true,
    });
  export const getLaboratory = () =>
    http.get(`/carecenter/elderly/laboratory_tests`, {
      hasAuth: true,
    });
  export const updateElderly = (body: any, id: number) =>
    http.put(`/carecenter/elderly/${id}`, {
      hasAuth: true,
      body,
    });
  export const deleteElderly = (id: number) =>
    http.del<SuccessResponse>(`/carecenter/elderly/${id}`, {
      hasAuth: true,
    });
  export const approveRequest = (id: number, body: any) =>
    http.put(`/carecenter/elderly/change_status/${id}`, {
      hasAuth: true,
      body,
    });
  export const createHealthNote = (body: any) =>
    http.post("/carecenter/elderly_health_note", {
      hasAuth: true,
      body,
    });
  export const getHealthNoteList = (body: any) =>
    http.post<PaginationResponse<HealthConditionType>>(
      "/carecenter/elderly_health_note/list",
      {
        hasAuth: true,
        body,
      }
    );
  export const createNote = (body: any) =>
    http.post("/carecenter/elderly_note", {
      hasAuth: true,
      body,
    });

  export const noteList = (body: any) =>
    http.post<PaginationResponse<any>>("/carecenter/elderly_note/list", {
      hasAuth: true,
      body,
    });
  export const updateNoteList = (body: any, id: number) =>
    http.put(`/carecenter/elderly_note/${id}`, {
      hasAuth: true,
      body,
    });

  // elderly develepor plan
  export const getDPList = (id: number) =>
    http.get<ElderlyDPlist[]>(
      `/carecenter/elderly_developer_plan/group/${id}`,
      {
        hasAuth: true,
      }
    );
  export const getDPDetailList = (id: number) =>
    http.get<any>(`/carecenter/elderly_developer_plan/${id}`, {
      hasAuth: true,
    });
  export const createDP = (body: any) =>
    http.post(`/carecenter/elderly_developer_plan`, {
      hasAuth: true,
      body,
    });
  export const createDPDetail = (body: any) =>
    http.post(`/carecenter/elderly_developer_plan/dtl`, {
      hasAuth: true,
      body,
    });
}

export default careInformation;
