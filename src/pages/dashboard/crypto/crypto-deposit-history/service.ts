import { PaginationResponse } from "types";
import http from "../../../../services";
import { BankDepositListRequest, BankDepositListType } from "./types";

namespace cryptoDepositHistoryService {
  export const list = (body: BankDepositListRequest) =>
    http.post<PaginationResponse<BankDepositListType>>(
      "/crypto/deposit-history/list",
      {
        hasAuth: true,
        body,
      }
    );
}

export default cryptoDepositHistoryService;
