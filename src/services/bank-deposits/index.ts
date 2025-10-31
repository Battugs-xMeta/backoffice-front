import { PaginationResponse } from "types";
import http from "..";
import { BankDepositListRequest, BankDepositListType } from "./types";

namespace bankDepositService {
  export const list = (body: BankDepositListRequest) =>
    http.post<PaginationResponse<BankDepositListType>>("/banks/deposits/list", {
      hasAuth: true,
      body,
    });
}

export default bankDepositService;
