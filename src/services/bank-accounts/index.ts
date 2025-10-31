import { PaginationResponse } from "types";
import http from "..";
import { BankAccountListItem, BankAccountListRequest } from "./types";

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
