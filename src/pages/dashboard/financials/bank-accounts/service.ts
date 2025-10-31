import { PaginationResponse } from "types";
import { BankAccountListItem, BankAccountListRequest } from "./types";
import http from "service/index";

namespace bankAccountService {
  export const list = (body: BankAccountListRequest) =>
    http.post<PaginationResponse<BankAccountListItem>>(
      "/banks/user-bank-account-wallets/list",
      {
        hasAuth: true,
        body,
      }
    );
}

export default bankAccountService;
