import { atom } from "jotai";

export enum RoleManagementTab {
  Permission = "Permission",
  Employee = "Employee",
}

interface RoleManagementStoreInterface {
  tab: RoleManagementTab;
}
export const storeRoleManagement = atom<RoleManagementStoreInterface>({
  tab: RoleManagementTab.Permission,
});
