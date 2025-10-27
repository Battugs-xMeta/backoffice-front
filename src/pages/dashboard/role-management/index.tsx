import { IfCondition } from "components/condition";
import { useAtom } from "jotai";
import { Employee } from "./employee";
import { Permission } from "./permission";
import { RoleManagementTab, storeRoleManagement } from "./store";
import { Tab } from "./tab";

const RoleMangement = () => {
  const [store] = useAtom(storeRoleManagement);

  return (
    <div className="mt-5 space-y-5">
      <Tab />

      <IfCondition
        condition={store.tab === RoleManagementTab.Permission}
        whenTrue={<Permission />}
        whenFalse={<Employee />}
      />
    </div>
  );
};

export default RoleMangement;
