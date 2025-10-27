import { Radio, Tabs } from "antd";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { RoleManagementTab, storeRoleManagement } from "./store";

export const Tab = () => {
  const [store, setStore] = useAtom(storeRoleManagement);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("tab")) {
      setStore({ tab: searchParams.get("tab") as RoleManagementTab });
    }
  }, [searchParams]);

  return (
    <>
      <Radio.Group
        value={store.tab}
        onChange={(e) => setSearchParams({ tab: e.target.value })}
      >
        <Radio.Button value={RoleManagementTab.Permission}>
          Эрхийн бүлэг
        </Radio.Button>
        <Radio.Button value={RoleManagementTab.Employee}>Гишүүд</Radio.Button>
      </Radio.Group>
    </>
  );
};
