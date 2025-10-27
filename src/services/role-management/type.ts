import { Base } from "types";

export interface RoleInterface extends Base {
  name: string;
  permissions?: PermissInterface[];
  care_center_id: number;
  is_care_center: boolean;
  menus: MenuInterface[];
  employee_count: number;
}

export interface PermissInterface extends Base {
  is_care_center: boolean;
  is_global: boolean;
  method: string;
  name: string;
  path: string;
  code: string;
}

export interface MenuInterface extends Base {
  is_care_center: boolean;
  order_number: number;
  parent_id: number;
  path: string;
  permissions?: PermissInterface[];
  name: string;
  menu_id: number;
}
