
export interface Schedule {
  id: number;
  created_at: Date;
  updated_at: Date;
  day: number;
  start_time: string;
  end_time: string;
  is_rest_day: boolean;
}
