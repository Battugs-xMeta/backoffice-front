import { useDebounceFn, useRequest } from "ahooks";
import { Avatar, notification } from "antd";
import Badge from "components/badge";
import { PageCard } from "components/card";
import { ExportButton, ITable } from "components/index";
import InitTableHeader from "components/table-header";
import { useAtom } from "jotai";
import moment from "moment";
import { useEffect, useState } from "react";
import charityOrganization from "service/charity-organization";
import { CharityOrganizationList } from "service/charity-organization/type";
import file from "service/file";
import { exportFromTable } from "utils/export";
import { atomTransictionAllForm } from "utils/store";
import { CreateForm } from "./action/create";
import { UpdateForm } from "./action/update";

const CharityOrganizationPage: React.FC = () => {
  const [form, setForm] = useAtom(atomTransictionAllForm);
  const [search, setSearch] = useState<string>("");
  const [create, setCreate] = useState<boolean>(false);

  const list = useRequest(charityOrganization.list, {
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

  return (
    <div className="mt-10">
      <PageCard xR>
        <div className="px-2 py-0">
          <InitTableHeader
            search={search}
            setSearch={(e) => {
              setSearch(e);
              list.run({ ...form, query: e });
            }}
            customHeaderTitle="Буяны байгууллагын жагсаалт"
            searchPlaceHolder="Нэр"
            refresh={() => list.run({ ...form })}
            setCreate={setCreate}
            addButtonName={"Бүртгэх"}
            toolbarItems={
              <div className="flex">
                <ExportButton
                  onClick={() => {
                    exportFromTable(
                      ["Буяны байгууллагын жагсаалт"],
                      window.document.getElementById(
                        "main-table"
                      ) as HTMLElement,
                      window
                    );
                  }}
                />
              </div>
            }
          />
        </div>
        <ITable<CharityOrganizationList>
          total={list.data?.total}
          loading={list.loading}
          dataSource={list?.data?.items ?? []}
          refresh={(values) => list.run({ ...form, ...values })}
          RemoveModelConfig={{
            action: charityOrganization.deleteOrg,
            config: (record) => ({
              uniqueKey: record?.id,
              display: record?.company_name,
              title: "Remove",
            }),
          }}
          form={form}
          setForm={setForm}
          CreateComponent={CreateForm}
          UpdateComponent={UpdateForm}
          create={create as boolean}
          setCreate={setCreate}
          columns={[
            {
              title: "Нэр",
              dataIndex: "company_name",
              align: "left",
              render: (value) => (
                <div className="flex gap-2">
                  <span className="text-sm text-[#475467] font-normal">
                    {value || "-"}
                  </span>
                </div>
              ),
            },
            {
              dataIndex: "phone_numbers",
              title: "Утасны дугаар",
              align: "left",
              render: (value, record) =>
                record?.phone_numbers?.map((val) => (
                  <span className="p-1">
                    <Badge title={val || "-"} color="gray" />
                  </span>
                )),
            },
            {
              dataIndex: "address",
              title: "Хаяг",
              render: (value) => (
                <span className="text-sm text-[#475467] font-normal flex text-center">
                  {value || "-"}
                </span>
              ),
            },
            {
              dataIndex: "created_at",
              title: "Бүртгэсэн огноо",
              align: "center",
              render: (value) => (
                <span className="text-sm text-[#475467] font-normal">
                  {moment(value || 0).format("YYYY-MM-DD") || "-"}
                </span>
              ),
            },
            {
              dataIndex: "received_employees",
              title: "Бүртгэсэн ажилтан",
              align: "left",
              render: (value, record) => (
                <div className="flex gap-2 items-center">
                  <Avatar
                    shape="circle"
                    size={25}
                    src={file.fileToUrl(
                      record?.created_employee?.profile?.physical_path || "AS"
                    )}
                  />
                  <span className="text-sm text-[#475467] font-normal">
                    {`${record?.created_employee?.last_name
                      .substring(0, 1)
                      .toUpperCase()}.${record?.created_employee?.first_name
                      }` || "-"}
                  </span>
                </div>
              ),
            },
          ]}
        />
      </PageCard>
    </div>
  );
};

export default CharityOrganizationPage;
