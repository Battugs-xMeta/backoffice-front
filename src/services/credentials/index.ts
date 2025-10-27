import { SuccessResponse } from "types";
import http from "..";

namespace credentials {
  export const get_credentials = (body: any) =>
    http.post("/carecenter/document/accreditation", {
      hasAuth: true,
      body,
    });
  // export const documentAC11B = (body: any) =>
  //   http.post<any>("/carecenter/document/ac_11_b", {
  //     hasAuth: true,
  //     body,
  //   });
  // export const documentAC12 = (body: any) =>
  //   http.post<AC12TYPE>("/carecenter/document/ac_12", {
  //     hasAuth: true,
  //     body,
  //   });
  // export const getUserDetail = (id: number) =>
  //   http.get<UserDetailListType>(`/carecenter/elderly/${id}`, {
  //     hasAuth: true,
  //   });
  // export const cancelRequest = (id: number, body: any) =>
  //   http.put(`/carecenter/elderly/change_status/${id}`, {
  //     hasAuth: true,
  //     body,
  //   });
  // export const waitRequest = (id: number, body: any) =>
  //   http.put(`/carecenter/elderly/change_status/${id}`, {
  //     hasAuth: true,
  //     body,
  //   });
  // export const approveRequest = (id: number, body: any) =>
  //   http.put(`/carecenter/elderly/change_status/${id}`, {
  //     hasAuth: true,
  //     body,
  //   });
  // export const cancelequest = (id: number) =>
  //   http.get<UserDetailListType>(`/carecenter/elderly/${id}`, {
  //     hasAuth: true,
  //   });
  // export const deleteTraining = (id: number) =>
  //   http.del<SuccessResponse>(`/carecenter/training/${id}`, {
  //     hasAuth: true,
  //   });
}

export default credentials;
