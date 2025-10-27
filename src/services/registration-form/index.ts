import http from "..";
import {
  AC11ATYPE,
  AC12TYPE,
  CareCenterStatusType,
  GETAC11A,
  GETAC11TYPE,
  GETAC12TYPE,
} from "./types";

namespace register_form {
  export const sendRequest = () =>
    http.post("/carecenter/document/send_request", {
      hasAuth: true,
    });
  export const documentAC11A = (body: any) =>
    http.post<AC11ATYPE>("/carecenter/document/ac_11_a", {
      hasAuth: true,
      body,
    });
  export const getDocumentAC11A = () =>
    http.get<GETAC11A>("/carecenter/document/ac_11_a", {
      hasAuth: true,
    });
  export const documentAC11B = (body: any) =>
    http.post<any>("/carecenter/document/ac_11_b", {
      hasAuth: true,
      body,
    });
  export const getDocumentAC11B = () =>
    http.get<GETAC11TYPE>("/carecenter/document/ac_11_b", {
      hasAuth: true,
    });
  export const documentAC12 = (body: any) =>
    http.post<AC12TYPE>("/carecenter/document/ac_12", {
      hasAuth: true,
      body,
    });
  export const getdocumentAC12 = () =>
    http.get<GETAC12TYPE>("/carecenter/document/ac_12", {
      hasAuth: true,
    });
  export const getStatus = () =>
    http.get<CareCenterStatusType>("/carecenter/document", {
      hasAuth: true,
    });
}

export default register_form;
