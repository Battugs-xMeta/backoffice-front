import { useDebounceFn, useRequest } from "ahooks";
import { Card, notification } from "antd";
import { ExportButton, ITable } from "components/index";
import InitTableHeader from "components/table-header";
import { DevelopmentPlanOption } from "config";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import developerPlan from "service/developer-plan";
import { PlanList } from "service/developer-plan/type";
import { exportFromTable } from "utils/export";
import { atomDeveloperPlan } from "utils/store";
import { CreateForm } from "./action/create";
import { EditForm } from "./action/edit";
import { PageCard } from "components/card";

const DeveloperPlan: React.FC = () => {
  const [form, setForm] = useAtom(atomDeveloperPlan);
  const [create, setCreate] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const list = useRequest(developerPlan.list, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  const run = () => {
    list.run({
      ...form,
      query: search,
    });
  };

  useEffect(() => {
    run();
  }, [form]);

  const searchRun = useDebounceFn(list.run, { wait: 1000 });

  return (
    <div className="pt-7">
      <PageCard xR>
        <div className="px-2 py-0">
          <InitTableHeader
            search={search}
            setSearch={(e) => {
              setSearch(e);
              searchRun.run({ ...form, query: e });
            }}
            customHeaderTitle="Хөгжлийн төлөвлөгөө"
            hideSearch
            refresh={() => list.run({ ...form })}
            addButtonName={"Нэмэх"}
            setCreate={setCreate}
            toolbarItems={
              <div className="flex">
                <ExportButton
                  onClick={() => {
                    exportFromTable(
                      ["Хөгжлийн төлөвлөгөө"],
                      window.document.getElementById(
                        "main-table"
                      ) as HTMLElement,
                      window
                    );
                  }}
                />
              </div>
            }
            hideFormFilter={true}
          />
        </div>
        <div>
          <ITable<PlanList>
            dataSource={list?.data?.items ?? []}
            total={list?.data?.total}
            loading={list?.loading}
            UpdateComponent={EditForm}
            refresh={(values) => list.run({ ...form, ...values })}
            setForm={setForm}
            columns={[
              {
                title: "Бүтэц",
                dataIndex: "structure",
                key: "structure",
                render: (value) => (
                  <span className="text-sm text-[#475467] font-normal">
                    {value || "-"}
                  </span>
                ),
              },
              {
                title: "Зорилт",
                dataIndex: "purpose",
                key: "purpose",
                render: (value) => (
                  <span className="text-sm text-[#475467] font-normal">
                    {value || "-"}
                  </span>
                ),
              },
              {
                title: "Үйл ажиллагаа",
                dataIndex: "activity",
                key: "activity",
                render: (value) => (
                  <span className="text-sm text-[#475467] font-normal">
                    {value || "-"}
                  </span>
                ),
              },
              {
                title: "Хугацаа",
                dataIndex: "duration",
                key: "duration",
                render: (value) => (
                  <span className="text-sm text-[#475467] font-normal">
                    {
                      DevelopmentPlanOption?.find((x) => x.value === value)
                        ?.label
                    }
                  </span>
                ),
              },
            ]}
            CreateComponent={CreateForm}
            setCreate={setCreate}
            form={form}
            create={create}
            RemoveModelConfig={{
              action: developerPlan.deletePlan,
              config: (record) => ({
                uniqueKey: record?.id,
                display: record?.structure,
                title: "Remove",
              }),
            }}
          />
        </div>
      </PageCard>
    </div>
  );
};

export default DeveloperPlan;
