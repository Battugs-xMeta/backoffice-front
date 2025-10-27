import { PageCard } from "components/card";
import InitTableHeader from "components/table-header";
import { ITableList } from "components/table-list";
import { useRequest } from "ahooks";
import roleManagement from "service/role-management";
import { useEffect } from "react";
import { RoleInterface } from "service/role-management/type";
import { dateFormat } from "utils/index";
import { CreatePermission } from "./create";
import { UpdatePermission } from "./update";

export const Permission = () => {
  const fetch = useRequest(roleManagement.list, {
    manual: true,
  });

  useEffect(() => {
    fetch.run({});
  }, []);

  return (
    <PageCard xR>
      <InitTableHeader
        customHeaderTitle={"Эрхийн бүлэг"}
        refresh={fetch.refresh}
        CreateComponent={CreatePermission}
      />
      <ITableList<RoleInterface>
        dataSource={fetch.data?.items || []}
        gap={4}
        total={fetch.data?.total || 0}
        columns={[
          {
            dataIndex: "name",
            className: "text-left text-primary-500 font-bold ",
          },
          {
            right: true,
            dataIndex: "employee_count",
            className: "text-scale-600 font-semibold",
            render: (value) => <span>Хандах эрхтэй ажилтан:{value || 0}</span>,
          },
          {
            dataIndex: "updated_at",
            className: "text-scale-600 font-semibold",
            render: (value) => (
              <span>Сүүлд шинэчлэгдсэн огноо: {dateFormat(value)}</span>
            ),
          },
        ]}
        refresh={(values) => fetch.run(values)}
        UpdateComponent={UpdatePermission}
        updateBtnConfig={{
          title: "Эрх тохируулах",
          size: "large",
          className: "px-2",
        }}
      />
    </PageCard>
  );
};
