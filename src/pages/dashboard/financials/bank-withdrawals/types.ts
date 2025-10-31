import { UserListType } from "pages/dashboard/user-management/kyc-info/types";

export interface BankWithdrawalsListRequest {
  current?: number;
  pageSize?: number;
  query?: string;
  amount?: number;
  condition?: UserBankWithdrawalsConditionTypeEnum;
  type?: UserBankWithdrawalsTypeEnum;
}

export enum UserBankWithdrawalsTypeEnum {
  BankWithdrawalsTypeID = "id",
  BankWithdrawalsTypeTxnID = "txn_id",
  BankWithdrawalsTypeAmount = "amount",
  BankWithdrawalsTypeQuery = "default_filter_by_user",
}

export enum UserBankWithdrawalsConditionTypeEnum {
  DepositWithdrawalConditionGreaterThan = "greater_than",
  DepositWithdrawalConditionLessThan = "less_than",
  DepositWithdrawalConditionEqual = "equal",
}

export interface BankWithdrawalsListType {
  id: string;
  created_at: Date;
  updated_at: Date;
  accountNumber: string;
  bankId: string;
  currency: Currency;
  feeAmount: number;
  metadata: Metadata;
  walletId: string;
  Wallet: Wallet;
  receiveAmount: number;
  status: ItemStatus;
  totalAmount: number;
  transferTime: Date;
  userId: string;
  User: User;
}

export interface User {
  id: string;
  created_at: Date;
  updated_at: Date;
  email: string;
  binanceEmail: string;
  firstName: string;
  lastName: string;
  subAccountId: string;
  canTrade: boolean;
  canWithdraw: boolean;
  isWhitelistEnabled: boolean;
  kycLevel: number;
  vipLevel: number;
  status: number;
  metaData: MetaData;
}

export interface MetaData {
  referral?: Referral;
  reason?: string;
  updatedBy?: string;
  updatedTime?: number;
}

export interface Referral {
  referralCode: null;
  referredBy: null;
}

export interface Wallet {
  id: string;
  created_at: Date;
  updated_at: Date;
  walletCode: string;
  accountName: string;
  accountNumber: string;
  bankId: string;
  iban: string;
  status: WalletStatus;
  verifiedAt: Date;
  userId: string;
  User: null;
  Bank: null;
}

export enum WalletStatus {
  Verified = "verified",
}

export enum Currency {
  Mnt = "MNT",
}

export interface Metadata {
  serviceFee: number;
  serviceFeeTxnId: string;
  txnFee: number;
  txnFeeTxnId: null | string;
  txnTaskId: string;
}

export enum ItemStatus {
  Transferred = "TRANSFERRED",
}
