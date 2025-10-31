import { UserListType } from "services/users/types";

export interface BankDepositListRequest {
  current?: number;
  pageSize?: number;
  query?: string;
  amount?: number;
  condition?: UserBankDepositConditionTypeEnum;
  type?: UserBankDepositTypeEnum;
}

export enum UserBankDepositTypeEnum {
  BankDepositTypeID = "id",
  BankDepositTypeTxnID = "txn_id",
  BankDepositTypeAmount = "amount",
  BankDepositTypeQuery = "default_filter_by_user",
}

export const UserBankDepositTypeEnumOptions = [
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

export enum UserBankDepositConditionTypeEnum {
  DepositWithdrawalConditionGreaterThan = "greater_than",
  DepositWithdrawalConditionLessThan = "less_than",
  DepositWithdrawalConditionEqual = "equal",
}

export const UserBankDepositConditionTypeEnumOptions = [
  {
    label: "Greater Than",
    value:
      UserBankDepositConditionTypeEnum.DepositWithdrawalConditionGreaterThan,
  },
  {
    label: "Less Than",
    value: UserBankDepositConditionTypeEnum.DepositWithdrawalConditionLessThan,
  },
  {
    label: "Equal",
    value: UserBankDepositConditionTypeEnum.DepositWithdrawalConditionEqual,
  },
];
export interface BankDepositListType {
  id: string;
  created_at: Date;
  updated_at: Date;
  currency: Currency;
  depositAmount: number;
  email: string;
  paymentWalletId: PaymentWalletID;
  status: Status;
  transferTime: Date;
  txnAmount: number;
  txnId: string;
  userId: string;
  User: UserListType;
}

export interface MetaData {
  referral?: Referral;
}

export interface Referral {
  referralCode: null;
  referredBy: null;
}

export enum Currency {
  Mnt = "MNT",
}

export enum PaymentWalletID {
  PaymentWalletID = "PAYMENT_WALLET_ID",
}

export enum Status {
  Transferred = "TRANSFERRED",
}
