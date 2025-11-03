import { atom } from "jotai";
import { parseInt } from "lodash";
import moment from "moment";
import {
  BankDepositListRequest,
  UserBankDepositTypeEnum,
} from "pages/dashboard/financials/bank-deposits/types";

import { FilterDeadline } from "types";
import { calculateDeadlineDate } from "utils/index";
export interface FilterFormType {
  deadline?: FilterDeadline;
  search?: string;
  sortDate?: Object;
  service_ids?: number[];
  pageSize: number;
  current: number;
  query?: string;
}

export interface FinainceFormInfo {
  month?: string;
  year: number;
}

const defualtAtom = {
  pageSize: 20,
  current: 1,
  sortDate: {
    start_day: calculateDeadlineDate(FilterDeadline.Month)?.map((el) =>
      el.format("YYYY-MM-DD")
    )[0],
    end_day: calculateDeadlineDate(FilterDeadline.Month)?.map((el) =>
      el.format("YYYY-MM-DD")
    )[1],
  },
  query: "",
};

const defualtAtomBankDeposits = {
  pageSize: 20,
  current: 1,
  sortDate: {
    start_day: calculateDeadlineDate(FilterDeadline.Month)?.map((el) =>
      el.format("YYYY-MM-DD")
    )[0],
    end_day: calculateDeadlineDate(FilterDeadline.Month)?.map((el) =>
      el.format("YYYY-MM-DD")
    )[1],
  },
  query: "",
  type: UserBankDepositTypeEnum.BankDepositTypeQuery,
  amount: 0,
  condition: undefined,
};

export const atomWorkersForm = atom<FilterFormType>(defualtAtom);
export const atomDeveloperPlan = atom<FilterFormType>(defualtAtom);
export const atomElderlysWaitingForm = atom<FilterFormType>(defualtAtom);
export const atomElderlysServicingForm = atom<FilterFormType>(defualtAtom);
export const atomUsersForm = atom<FilterFormType>(defualtAtom);
export const atomBankAccountsForm = atom<FilterFormType>(defualtAtom);
export const atomBankDepositsForm = atom<BankDepositListRequest>(
  defualtAtomBankDeposits
);
export const atomCryptoDepositHistoryForm = atom<FilterFormType>(defualtAtom);
export const atomCryptoWithdrawalHistoryForm =
  atom<FilterFormType>(defualtAtom);
export const atomRequestedForm = atom<FilterFormType>(defualtAtom);
export const atomTransictionAllForm = atom<FilterFormType>(defualtAtom);
export const atomTransictionMovingForm = atom<FilterFormType>(defualtAtom);
export const atomTransictionForceForm = atom<FilterFormType>(defualtAtom);
export const atomTransictionOwnRequestForm = atom<FilterFormType>(defualtAtom);
export const atomTransictionDiedForm = atom<FilterFormType>(defualtAtom);
export const atomFinanceToSpend30Form = atom<FilterFormType>(defualtAtom);
export const atomFinanceToDonationMoneyForm = atom<FilterFormType>(defualtAtom);
export const atomFinanceToDonationOtherForm = atom<FilterFormType>(defualtAtom);
export const atomFinanceToDonationSpend = atom<FilterFormType>(defualtAtom);
export const atomFinanceNormative = atom<FilterFormType>(defualtAtom);
export const atomFinanceNormativeDetail = atom<FilterFormType>(defualtAtom);
export const atomFinanceNormativeInfo = atom<FinainceFormInfo>({
  // month: moment().format("MM"),
  year: parseInt(moment().format("YYYY")),
});
