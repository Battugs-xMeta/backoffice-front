import { SuccessResponse } from "types";
import http from "..";
import { Schedule } from "./type";

namespace timeScheduleService {
  export const get = () =>
    http.get<Schedule[]>("/carecenter/settings/time_schedules", {
      hasAuth: true,
    });
  export const save = (body: any) =>
    http.post<SuccessResponse>(`/carecenter/settings/time_schedules/save`, {
      body,
      hasAuth: true,
    });
}

export default timeScheduleService;
