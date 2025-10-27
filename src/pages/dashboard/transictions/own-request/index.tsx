import { useDebounceFn, useRequest } from "ahooks";
import { Avatar, Card, Tag, notification } from "antd";
import { ExportButton, FilterForm } from "components/index";
import { ITable } from "components/table";
import InitTableHeader from "components/table-header";
import { useEffect, useState } from "react";
import transictions from "service/transictions";
import { exportFromTable } from "utils/export";
import { atomTransictionOwnRequestForm } from "utils/store";
import { useAtom } from "jotai";
import file from "service/file";
import moment from "moment";
import { getColor } from "..";
import { TransictionsStatus } from "config";
import {
  MovementStatusEnum,
  TransictiontypeList,
} from "service/transictions/types";
import { DetailService } from "../actions/detail";
import { UserOutlined } from "@ant-design/icons";
import { PageCard } from "components/card";

const OwnRequest = () => {
  const [filter, setFilter] = useState<any>({
    page: 0,
    pageSize: 20,
  });
  const [form, setForm] = useAtom(atomTransictionOwnRequestForm);
  const [search, setSearch] = useState<string>("");
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
      query: search,
      movement_type: MovementStatusEnum.ownRequest, // Өөрийн хүсэлтээр гарсан үед movement type Ийг 12 болгож хүсэлт дуудна
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
                movement_type: MovementStatusEnum.ownRequest,
              });
            }}
            customHeaderTitle="Өөрийн хүсэлтээр гарсан үйлчлүүлэгчдийн жагсаалт"
            searchPlaceHolder="Овог, нэр , регистрийн дугаар "
            hideCreate
            refresh={() =>
              list.run({
                ...form,
                movement_type: MovementStatusEnum.ownRequest,
                query: search,
              })
            }
            toolbarItems={
              <div className="flex">
                <ExportButton
                  onClick={() => {
                    exportFromTable(
                      ["Өөрийн хүсэлтээр гарсан үйлчлүүлэгчдийн жагсаалт"],
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
              movement_type: MovementStatusEnum.ownRequest,
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
            {
              dataIndex: ["elderly", "education"],
              title: "Боловсрол",
              align: "left",
              render: (value) => (
                <span className="text-sm text-[#475467] font-normal">
                  {value || "-"}
                </span>
              ),
            },
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

export default OwnRequest;
