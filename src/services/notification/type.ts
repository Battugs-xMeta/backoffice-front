import { FileInterface } from "service/file/types";
import { Base } from "types";

export interface Notification extends Base {
  un_seen_count: number;
  items: NotificationItem[];
}

export interface NotificationItem {
  id: number;
  created_at: string;
  updated_at: string;
  notification_id: number;
  notification: MainNotification;
  care_center_id: number;
  is_seen: boolean;
}

export interface MainNotification {
  id: number;
  created_at: string;
  updated_at: string;
  created_user_id: number;
  title: string;
  description: string;
  thumbnail_id: number;
  thumbnail?: FileInterface;
  attachment_id: number;
  attachment?: FileInterface;
  property_type: number;
}
