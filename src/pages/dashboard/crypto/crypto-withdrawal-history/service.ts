import { PaginationResponse } from "types";
import http from "../../../../services";
import { BankDepositListRequest, BankDepositListType } from "./types";

namespace cryptoWithdrawalHistoryService {
  export const list = (body: BankDepositListRequest) =>
    http.post<PaginationResponse<BankDepositListType>>(
      "/crypto/withdrawal-history/list",
      {
        hasAuth: true,
        body,
      }
    );
}

export default cryptoWithdrawalHistoryService;
