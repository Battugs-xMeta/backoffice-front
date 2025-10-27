import { UserOutlined } from "@ant-design/icons";
import { useDebounceFn, useRequest } from "ahooks";
import { Avatar, Card, Tooltip, notification } from "antd";
import { ExportButton, FilterForm, ITable } from "components/index";
import InitTableHeader from "components/table-header";
import dayjs from "dayjs";
import { useAtom } from "jotai";
import { FC, useEffect, useState } from "react";
import careInformation from "service/care-information";
import { ElderlyList } from "service/care-information/types";
import { exportFromTable } from "utils/export";
import { atomElderlysWaitingForm } from "utils/store";
import { DetailService } from "./actions/detail";
import { ApproveModal } from "./modals/approve";
import file from "service/file";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { PageCard } from "components/card";

const Waiting: FC = () => {
  const [form, setForm] = useAtom(atomElderlysWaitingForm);
  const [approveAction, setApproveAction] = useState<ElderlyList>();
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
      query: search,
      sortDate: null,
      status: 4, // Хүлээгдэж байгаа үед status 6 гэж хүсэлт дуудаж байгаа
    });
  };

  useEffect(() => {
    run();
  }, [form]);

  // const searchRun = useDebounceFn(list.run, { wait: 500 });

  return (
    <div className="flex flex-col gap-4">
      {/* <FilterForm
        initialValues={{
          ...form,
        }}
        setselecteddate={setForm}
      /> */}
      <PageCard xR>
        <div className="px-2 py-0">
          <InitTableHeader
            customHeaderTitle="Үйлчлүүлэгчдийн жагсаалт"
            refresh={() => list.run({ ...form, status: 4, query: search })}
            hideCreate
            search={search}
            setSearch={(e) => {
              setSearch(e);
              list.run({
                ...form,
                query: e,
                sortDate: null,
                status: 4, // Хүлээгдэж байгаа үед status 6 гэж хүсэлт дуудаж байгаа
              });
            }}
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
          refresh={(values) => list.run({ ...form, ...values, status: 4 })}
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
          DetailComponent={DetailService}
          customActions={(record) => (
            <div className="flex items-center gap-4">
              <Tooltip title="Зөвшөөрөх">
                <IoMdCheckmarkCircleOutline
                  size={20}
                  className={" text-green-700"}
                  onClick={() => setApproveAction(record)}
                />
              </Tooltip>
            </div>
          )}
          setApproveModal={(record) => {
            setApproveAction(record);
          }}
        />
        <ApproveModal
          data={approveAction}
          onCancel={() => setApproveAction(undefined)}
          onFinish={async () => {
            run();
            setApproveAction(undefined);
          }}
        />
      </PageCard>
    </div>
  );
};

export default Waiting;
