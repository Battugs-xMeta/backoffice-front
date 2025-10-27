export interface Base {
  id?: number;
  created_at: Date;
  updated_at: Date;
  created_user_id?: string;
  updated_user_id?: string;
  created_user?: any;
  updated_user?: any;
}

export interface AntdFile {
  is_before: boolean;
  uid: string;
  name: string;
  status: string;
  response: string;
  url: any;
  originFileObj?: File;
}

export enum LatestCarestType {
  inprogress = "inprogress",
  cancelled = "cancelled",
  ended = "ended",
  notStarted = "not_started",
}
