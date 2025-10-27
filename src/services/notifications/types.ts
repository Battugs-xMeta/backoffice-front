import { Base } from "service/type";
export enum NotificationType {
  customer = "customer",
  merchant = "merchant",
}

export interface NotificationsModel extends Base {
  id: number;
  age_max: number;
  age_min: number;
  customer_ids: number[];
  description: string;
  gender: string;
  intrests: string[];
  is_planned: boolean;
  is_published: boolean;
  locations: string[];
  planned_date: string;
  reached_count: number;
  reach_count: number;
  service: any;
  service_id: number;
  title: string;
  merchant_id: number;
  merchant: any;
  images: string[];
  is_registered: boolean;
  sales_min?: number;
  sales_max?: number;
  registered_start_date?: string;
  registered_end_date?: string;
  customer_notifications?: NotificationCustomer[];
  type: NotificationType;
  service_ids?: number;
}

enum NotificationCustomerType {
  default = "default",
  order = "order",
}

export interface NotificationCustomer extends Base {
  is_seen: boolean;
  images: string[];
  description: string;
  title: string;
  type: NotificationCustomerType;
  type_id: number;
  customer_id: number;
  notification_id: number;
  notification?: NotificationsModel;
}

export interface NotificationListInput {
  created_at?: string[];
  customer_id?: number;
  deleted_at?: string[];
  description?: string;
  gender?: string;
  intrest?: string;
  is_all?: boolean;
  is_planned?: string;
  is_published?: string;
  limit?: number;
  location?: string;
  page?: number;
  planned_date?: string[];
  service_id?: number;
  sorter?: any;
  title?: string;
  updated_at?: string[];
}

export interface NotificationCreateInput {
  age_max?: number;
  age_min?: number;
  customer_ids?: number[];
  description?: string;
  gender?: string;
  intrests?: string[];
  is_planned?: boolean;
  is_published?: boolean;
  locations?: string[];
  planned_date?: string;
  service_id?: number;
  title?: string;
  sales_min?: number;
  sales_max?: number;
  registered_start_date?: string;
  registered_end_date?: string;
  phone?: string;
  categories?: string[];
  is_online_customer?: boolean;
  nation?: string;
  type?: NotificationType;
}
