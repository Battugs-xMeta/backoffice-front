import { useRequest } from "ahooks";
import { PageCard } from "components/card";
import { ITable } from "components/table";
import InitTableHeader from "components/table-header";
import roleManagement from "service/role-management";
import workers from "service/workers";
import { WorkerList } from "service/workers/type";
import { Assign } from "./create";
import { Update } from "./update";

export const Employee = () => {
  const fetch = useRequest(workers.getWorkers, { defaultParams: [{}] });

  return (
    <PageCard xR>
      <InitTableHeader
        customHeaderTitle={"Хандах эрхтэй ажилчид"}
        CreateComponent={Assign}
        refresh={fetch.refresh}
      />
      <ITable<WorkerList>
        loading={fetch.loading}
        columns={[
          {
            title: "Овог",
            dataIndex: "last_name",
          },
          {
            title: "Нэр",
            dataIndex: "first_name",
          },
          {
            title: "И-мэйл хаяг",
            dataIndex: "email",
          },
          {
            title: "Албан тушаал",
            dataIndex: "position",
          },
          {
            title: "Хандах эрх",
            dataIndex: ["role", "name"],
          },
        ]}
        dataSource={fetch.data?.items}
        total={fetch.data?.total}
        refresh={(values) => fetch.run(values)}
        UpdateComponent={Update}
        RemoveModelConfig={{
          action: (id) => roleManagement.unAssign(id),
          config: (record) => ({
            uniqueKey: record?.id,
            display: record?.last_name + " " + record?.first_name,
          }),
        }}
      />
    </PageCard>
  );
};
