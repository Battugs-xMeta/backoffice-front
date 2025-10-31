export interface UserListRequest {
  current?: number;
  pageSize?: number;
  query?: string;
}

export interface UserListType {
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
  referral: Referral;
}

export interface Referral {
  referralCode: null;
  referredBy: null;
}
