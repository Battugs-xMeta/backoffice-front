import { useDebounceFn, useRequest } from "ahooks";
import { Avatar, Card, Tag, notification } from "antd";
import { ExportButton, FilterForm } from "components/index";
import { ITable } from "components/table";
import InitTableHeader from "components/table-header";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import transictions from "service/transictions";
import { exportFromTable } from "utils/export";
import { atomTransictionDiedForm } from "utils/store";
import {
  MovementStatusEnum,
  TransictiontypeList,
} from "service/transictions/types";
import moment from "moment";
import file from "service/file";
import { getColor } from "..";
import { TransictionsStatus } from "config";
import { DetailService } from "../actions/detail";
import { UserOutlined } from "@ant-design/icons";
import { PageCard } from "components/card";
import { dateFormat } from "utils/index";

const Died = () => {
  const [filter, setFilter] = useState<any>({
    page: 0,
    pageSize: 20,
  });
  const [search, setSearch] = useState<string>("");
  const [form, setForm] = useAtom(atomTransictionDiedForm);

  const list = useRequest(transictions.list, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  const run = () => {
    list.run({
      ...form,
      movement_type: MovementStatusEnum?.died, // Нас барсан  үед movement type Ийг 14 болгож хүсэлт дуудна
      query: search,
    });
  };

  useEffect(() => {
    run();
  }, [form]);

  const searchRun = useDebounceFn(list.run, { wait: 1000 });

  return (
    <div className="flex flex-col gap-4">
      <FilterForm
        initialValues={{
          ...filter,
        }}
        setselecteddate={setForm}
      />
      <PageCard xR>
        <div className="px-2 py-0">
          <InitTableHeader
            search={search}
            setSearch={(e) => {
              setSearch(e);
              searchRun.run({
                ...form,
                query: e,
                movement_type: MovementStatusEnum?.died,
              });
            }}
            customHeaderTitle="Нас барсан үйлчлүүлэгчдийн жагсаалт"
            searchPlaceHolder="Овог, нэр , регистрийн дугаар "
            refresh={() =>
              list.run({
                ...form,
                movement_type: MovementStatusEnum?.died,
                query: search,
              })
            }
            hideCreate
            toolbarItems={
              <div className="flex">
                <ExportButton
                  onClick={() => {
                    exportFromTable(
                      ["Нас барсан үйлчлүүлэгчдийн жагсаалт"],
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
        <ITable<TransictiontypeList>
          total={list.data?.total}
          loading={list.loading}
          dataSource={list?.data?.items ?? []}
          refresh={(values) =>
            list.run({
              ...form,
              ...values,
              movement_type: MovementStatusEnum?.died,
            })
          }
          DetailComponent={DetailService}
          setForm={setForm}
          columns={[
            {
              dataIndex: "received_employees",
              title: "",
              align: "center",
              width: 40,
              renderText(text, record) {
                return record?.elderly?.profile ? (
                  <Avatar
                    shape="circle"
                    size={25}
                    src={file.fileToUrl(
                      record?.elderly?.profile?.physical_path || "AS"
                    )}
                  />
                ) : (
                  <Avatar
                    shape="circle"
                    size={25}
                    icon={<UserOutlined rev={undefined} />}
                  />
                );
              },
            },
            {
              dataIndex: ["elderly", "family_name"],
              title: "Ургийн овог",
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
              dataIndex: ["elderly", "first_name"],
              title: "Нэр",
              align: "left",
              render: (value) => (
                <span className="text-sm text-[#475467] font-normal flex text-center">
                  {value || "-"}
                </span>
              ),
            },
            {
              dataIndex: ["elderly", "rd"],
              title: "Регистрийн дугаар",
              render: (value) => (
                <span className="text-sm text-[#475467] font-normal flex text-center">
                  {value || "-"}
                </span>
              ),
            },
            {
              dataIndex: ["elderly", "age"],
              title: "Нас",
              width: 50,
              render: (value) => (
                <span className="text-sm text-[#475467] font-normal">
                  {value || "-"}
                </span>
              ),
            },
            {
              dataIndex: ["elderly", "gender"],
              title: "Хүйс",
              width: 50,
              align: "center",
              render: (_, record) => (
                <span className="text-sm text-[#475467] font-normal">
                  {record?.elderly?.gender === 0 ? "Эрэгтэй" : "Эмэгтэй"}
                </span>
              ),
            },
            // {
            //   dataIndex: ["elderly", "education"],
            //   title: "Боловсрол",
            //   align: "left",
            //   render: (value) => (
            //     <span className="text-sm text-[#475467] font-normal">
            //       {value || "-"}
            //     </span>
            //   ),
            // },
            {
              dataIndex: "movement_type",
              title: "Төрөл",
              align: "left",
              render: (value) => (
                <span className="text-sm text-[#475467] font-normal">
                  <Tag color={getColor(value as number)}>
                    <span className="text-xs text-[#black] font-normal">
                      {
                        (TransictionsStatus as { [key: string]: string })[
                          value as number
                        ]
                      }
                    </span>
                  </Tag>
                </span>
              ),
            },
            {
              title: "Нас барсан огноо",
              dataIndex: "out_date",
              renderText: (value) => dateFormat(value),
            },
            {
              title: "Буяны байгуулга",
              dataIndex: ["charity_work", "company_name"],
            },
            {
              title: "Оршуулсан байршил",
              dataIndex: "burial_address",
            },
            {
              dataIndex: "unique_number",
              title: "Дугаар",
              align: "center",
              width: 80,
              render: (value) => (
                <span className="text-sm text-[#475467] font-normal">
                  {value || "-"}
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
                    {record?.created_employee?.first_name || "-"}
                  </span>
                </div>
              ),
            },
            {
              dataIndex: "created_at",
              title: "Бүртгэсэн огноо",
              align: "center",
              render: (value) => (
                <span className="text-sm text-[#475467] font-normal">
                  {moment(value || 0).format("YYYY-MM-DD HH:mm:ss") || "-"}
                </span>
              ),
            },
          ]}
        />
      </PageCard>
    </div>
  );
};

export default Died;
