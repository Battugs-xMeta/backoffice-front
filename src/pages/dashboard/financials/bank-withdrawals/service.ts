import { PaginationResponse } from "types";
import http from "../../../../services";
import { BankWithdrawalsListRequest } from "./types";

namespace bankWithdrawalsService {
  export const list = (body: BankWithdrawalsListRequest) =>
    http.post<PaginationResponse<BankWithdrawalsListRequest>>(
      "/banks/withdrawals/list",
      {
        hasAuth: true,
        body,
      }
    );
}

export default bankWithdrawalsService;
