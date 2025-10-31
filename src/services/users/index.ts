import { PaginationResponse } from "types";
import http from "..";
import { UserListType, UserListRequest } from "service/users/types";

namespace usersService {
  export const list = (body: UserListRequest) =>
    http.post<PaginationResponse<UserListType>>("/users/list", {
      hasAuth: true,
      body,
    });
}

export default usersService;
