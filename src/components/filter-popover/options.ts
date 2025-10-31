import { UserBankAccountWalletsTypeEnum } from "services/bank-accounts/types";
import { UserBankDepositTypeEnum } from "services/bank-deposits/types";

export const BANK_ACCOUNT_FILTER_OPTIONS = [
  {
    label: "IBAN",
    value: UserBankAccountWalletsTypeEnum.UserBankAccountWalletsTypeIBAN,
  },
  {
    label: "Account Number",
    value: UserBankAccountWalletsTypeEnum.UserBankAccountWalletsTypeAccountNumber,
  },
  {
    label: "Default Filter By User",
    value: UserBankAccountWalletsTypeEnum.DefaultFilterByUser,
  },
];

export const BANK_DEPOSIT_FILTER_OPTIONS = [
  {
    label: "ID",
    value: UserBankDepositTypeEnum.BankDepositTypeID,
  },
  {
    label: "Transaction ID",
    value: UserBankDepositTypeEnum.BankDepositTypeTxnID,
  },
  {
    label: "Amount",
    value: UserBankDepositTypeEnum.BankDepositTypeAmount,
  },
  {
    label: "Default Filter By User",
    value: UserBankDepositTypeEnum.BankDepositTypeQuery,
  },
];