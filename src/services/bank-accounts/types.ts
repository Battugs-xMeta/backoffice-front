import { UserListType } from "service/users/types";

export interface BankAccountListRequest {
  current?: number;
  pageSize?: number;
  query?: string;
  type?: UserBankAccountWalletsTypeEnum;
}

export enum UserBankAccountWalletsTypeEnum {
  UserBankAccountWalletsTypeIBAN = "iban",
  UserBankAccountWalletsTypeAccountNumber = "account_number",
  DefaultFilterByUser = "default_filter_by_user",
}

export const UserBankAccountWalletsTypeEnumOptions = [
  {
    label: "IBAN",
    value: UserBankAccountWalletsTypeEnum.UserBankAccountWalletsTypeIBAN,
  },
  {
    label: "Account Number",
    value:
      UserBankAccountWalletsTypeEnum.UserBankAccountWalletsTypeAccountNumber,
  },
  {
    label: "Default Filter By User",
    value: UserBankAccountWalletsTypeEnum.DefaultFilterByUser,
  },
];

export interface BankAccountListItem {
  id: string;
  created_at: Date;
  updated_at: Date;
  walletCode: string;
  accountName: string;
  accountNumber: string;
  bankId: string;
  iban: string;
  status: Status;
  verifiedAt: Date;
  userId: string;
  User: UserListType;
  Bank: Bank;
}

export interface Bank {
  id: string;
  created_at: Date;
  updated_at: Date;
  code: Code;
  clearingCode: string;
  nameEn: NameEn;
  nameMn: NameMn;
  icon: string;
  length: number;
  order: number;
  isEnabled: boolean;
}

export enum Code {
  Golomt = "GOLOMT",
  Khan = "KHAN",
  Tdb = "TDB",
  Xac = "XAC",
}

export enum NameEn {
  GolomtBank = "Golomt bank",
  KhanBank = "Khan bank",
  TDBank = "TDBank",
  XacBank = "Xac bank",
}

export enum NameMn {
  ГоломтБанк = "Голомт банк",
  ХХБанк = "ХХБанк",
  ХаанБанк = "Хаан банк",
  ХасБанк = "Хас банк",
}

export interface MetaData {
  referral?: Referral;
}

export interface Referral {
  referralCode: null;
  referredBy: null;
}

export enum Status {
  PendingVerification = "pending_verification",
  Verified = "verified",
}
