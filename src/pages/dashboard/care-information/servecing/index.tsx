import { UserOutlined } from "@ant-design/icons";
import { useDebounceFn, useRequest } from "ahooks";
import { Avatar, Card, Tooltip, notification } from "antd";
import { ExportButton, FilterForm, ITable } from "components/index";
import InitTableHeader from "components/table-header";
import dayjs from "dayjs";
import { useAtom } from "jotai";
import { FC, useEffect, useState } from "react";
import { TbSwitchHorizontal } from "react-icons/tb";
import careInformation from "service/care-information";
import { ElderlyList } from "service/care-information/types";
import file from "service/file";
import { exportFromTable } from "utils/export";
import { atomElderlysServicingForm } from "utils/store";
import { DetailService } from "./actions/detail";
import { TransictionAction } from "./actions/modal";
import { PageCard } from "components/card";

const Servecing: FC = () => {
  const [form, setForm] = useAtom(atomElderlysServicingForm);
  const [transictionAction, setTransictionAction] = useState<ElderlyList>();
  const [search, setSearch] = useState<string>("");

  const list = useRequest(careInformation.getElderlyList, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  const run = () => {
    list.run({
      ...form,
      status: 6, // Үйлчлүүлж байгаа үед status 6 р хүсэлт явуулна
      query: search,
    });
  };

  useEffect(() => {
    run();
  }, [form]);

  // const searchRun = useDebounceFn(list.run, { wait: 1000 });

  return (
    <div className="flex flex-col gap-4">
      <FilterForm
        initialValues={{
          ...form,
        }}
        setselecteddate={setForm}
      />
      <PageCard xR>
        <div className="px-2 py-0">
          <InitTableHeader
            search={search}
            setSearch={(e) => {
              setSearch(e);
              // searchRun.run({ ...form, query: e, status: 6 });
              list.run({
                ...form,
                status: 6, // Үйлчлүүлж байгаа үед status 6 р хүсэлт явуулна
                query: e,
              });
            }}
            customHeaderTitle="Үйлчлүүлэгчдийн жагсаалт"
            refresh={() => list.run({ ...form, status: 6, query: search })}
            hideCreate
            toolbarItems={
              <div className="flex">
                <ExportButton
                  onClick={() => {
                    exportFromTable(
                      ["Үйлчлүүлэгчдийн дэлгэрэнгүй мэдээлэл"],
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
        <ITable<ElderlyList>
          dataSource={list?.data?.items ?? []}
          total={list.data?.total}
          loading={list.loading}
          form={form}
          setForm={setForm}
          refresh={(values) => list.run({ ...form, ...values, status: 6 })}
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
              dataIndex: ["elderly", "last_name"],
              title: "Овог",
              align: "left",
              render: (value) => (
                <span className="text-sm text-[#475467] font-normal flex text-center">
                  {value || "-"}
                </span>
              ),
            },
            {
              dataIndex: ["elderly", "first_name"],
              title: "Нэр",
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
                <span className="text-sm text-[#475467] font-normal">
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
              dataIndex: "elderly",
              title: "Хүйс",
              align: "center",
              width: 50,
              render: (_, record) => (
                <span className="text-sm text-[#475467] font-normal">
                  {record?.elderly?.gender === 0 ? "Эрэгтэй" : "Эмэгтэй"}
                </span>
              ),
            },
            {
              dataIndex: ["elderly", "birth_date"],
              title: "Төрсөн огноо",
              render: (_, record) => (
                <span className="text-sm text-[#475467] font-normal">
                  {dayjs(record?.elderly?.updated_at).format("YYYY-MM-DD")}
                </span>
              ),
            },
            {
              dataIndex: ["elderly", "education"],
              title: "Боловсрол",
              render: (value) => (
                <span className="text-sm text-[#475467] font-normal">
                  {value || "-"}
                </span>
              ),
            },
          ]}
          setTransictionModal={(record) => {
            setTransictionAction(record);
          }}
          DetailComponent={DetailService}
        />
        <TransictionAction
          data={transictionAction}
          onCancel={() => setTransictionAction(undefined)}
          onFinish={async () => {
            run();
            setTransictionAction(undefined);
          }}
        />
      </PageCard>
    </div>
  );
};

export default Servecing;
