import http from "..";
import { AllCareCentersType, AllElderlyNoteType, ResponseType } from "./type";
namespace Address {
  export const city = () =>
    http.get<ResponseType[]>("/public/address/city", {
      hasAuth: true,
    });
  export const district = (id: any) =>
    http.get<ResponseType[]>(`/public/address/district/${id}`, {
      hasAuth: true,
    });
  export const khoroo = (id: any) =>
    http.get<ResponseType[]>(`/public/address/khoroo/${id}`, {
      hasAuth: true,
    });
  export const AllCareCenters = (body: any) =>
    http.get<AllCareCentersType[]>("/carecenter/care_center/active/all", {
      hasAuth: true,
      body,
    });
  export const AllElderlyNotes = (body: any) =>
    http.post<AllElderlyNoteType[]>("/carecenter/elderly_note/all", {
      hasAuth: true,
      body,
    });
}

export default Address;

//userAppTerms
