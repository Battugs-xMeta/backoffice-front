export interface PlanList {
  id: number;
  created_at: Date;
  updated_at: Date;
  structure: string;
  purpose: string;
  activity: string;
  duration: number;
  created_user_id: number;
  modified_user_id: number;
}
