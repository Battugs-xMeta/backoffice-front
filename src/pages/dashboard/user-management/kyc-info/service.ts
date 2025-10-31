import { PaginationResponse } from "types";
import http from "../../../../services";
import {
  UserListType,
  UserListRequest,
} from "pages/dashboard/user-management/kyc-info/types";

namespace usersService {
  export const list = (body: UserListRequest) =>
    http.post<PaginationResponse<UserListType>>("/users/list", {
      hasAuth: true,
      body,
    });
}

export default usersService;
