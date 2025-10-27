import { useDebounceFn, useRequest } from "ahooks";
import { Avatar, Tag, Tooltip, notification } from "antd";
import { PageCard } from "components/card";
import { FilterForm } from "components/index";
import { ITable } from "components/table";
import InitTableHeader from "components/table-header";
import { ElderlyWaitStatus } from "config";
import dayjs from "dayjs";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { MdAccessTime } from "react-icons/md";
import file from "service/file";
import requested from "service/requested";
import { FilterRequestedline, RequestItem } from "service/requested/types";
import { atomRequestedForm } from "utils/store";
import { DetailService } from "./actions/detail";
import { CancelModal } from "./actions/modals/cancel";
import { WaitModal } from "./actions/modals/wait";

const CamePage: React.FC = () => {
  const [form, setForm] = useAtom(atomRequestedForm);
  const [closeAction, setCloseAction] = useState<RequestItem>();
  const [waitAction, setWaitAction] = useState<RequestItem>();
  const [search, setSearch] = useState<string>("");

  const list = useRequest(requested.getRequested, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  const getColor = (status: number) => {
    switch (status) {
      case 1:
        return "#FFFAEB";
      case 2:
        return "#1890FF";
      case 3:
        return "#FFFAEB";
      case 4:
        return "#50A1FF";
      case 7:
        return "#ff0000";
      default:
        return "#FFFAEB";
    }
  };

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
    <div className="flex flex-col gap-4">
      <FilterForm
        initialValues={{
          ...form,
        }}
        hideFilters
      />
      <PageCard xR>
        <div className="px-2 py-0">
          <InitTableHeader
            search={search}
            setSearch={(e) => {
              setSearch(e);
              searchRun.run({ ...form, query: e });
            }}
            customHeaderTitle="Ирсэн хүсэлтийн жагсаалт"
            hideCreate
            refresh={() => list.run({ ...form, query: search })}
            hideFormFilter={true}
          />
        </div>
        <ITable<RequestItem>
          dataSource={list?.data?.items ?? []}
          total={list.data?.total}
          loading={list.loading}
          form={form}
          setForm={setForm}
          columns={[
            {
              dataIndex: ["elderly", "profile", "physical_path"],
              title: "",
              align: "center",
              width: 40,
              render: (_, record) => (
                <Avatar
                  shape="circle"
                  size={25}
                  src={file.fileToUrl(
                    record?.elderly?.profile?.physical_path || "AS"
                  )}
                />
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
              render: (value) => (
                <span className="text-sm text-[#475467] font-normal">
                  {value || "-"}
                </span>
              ),
            },
            {
              dataIndex: ["social_worker_elderly", "city", "name"],
              title: "Хаанаас ирсэн",
              render: (value) => (
                <div className="flex gap-2 items-center">
                  <Avatar shape="circle" size={20} src={"/svg/vector.svg"} />
                  <span className="text-sm text-[#475467] font-normal">
                    {value || "-"}
                  </span>
                </div>
              ),
            },
            {
              dataIndex: "elderly",
              title: "Хүйс",
              align: "center",
              render: (_, record) => (
                <span className="text-sm text-[#475467] font-normal">
                  {record.elderly.gender === 0 ? "Эрэгтэй" : "Эмэгтэй"}
                </span>
              ),
            },
            {
              dataIndex: ["elderly", "birth_date"],
              title: "Төрсөн огноо",
              render: (_, record) => (
                <span className="text-sm text-[#475467] font-normal">
                  {dayjs(record.elderly.birth_date).format("YYYY-MM-DD")}
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
            {
              dataIndex: "status",
              title: "Төлөв",
              render: (_, record) => (
                <Tag color={getColor(record.status)}>
                  <span className="text-xs text-[#B54708] font-normal">
                    {
                      (ElderlyWaitStatus as { [key: string]: string })[
                      record?.status ? record?.status : 1
                      ]
                    }
                  </span>
                </Tag>
              ),
            },
          ]}
          setCloseModal={(record) => {
            setCloseAction(record);
          }}
          setWaitModal={(record) => {
            setWaitAction(record);
          }}
          DetailComponent={DetailService}
          customActions={(record) => {
            return (
              <div className="flex items-center gap-4">
                <Tooltip title="Цуцлах">
                  <IoMdClose
                    size={21}
                    color="red"
                    onClick={() => {
                      setCloseAction(record);
                    }}
                  />
                </Tooltip>
                <Tooltip title="Хүлээлгэх">
                  <MdAccessTime
                    size={21}
                    color="#F79009"
                    onClick={() => {
                      setWaitAction(record);
                    }}
                  />
                </Tooltip>
              </div>
            );
          }}
        />
        <CancelModal
          data={closeAction}
          onCancel={() => setCloseAction(undefined)}
          onFinish={async () => {
            run();
            setCloseAction(undefined);
          }}
        />
        <WaitModal
          data={waitAction}
          onCancel={() => setWaitAction(undefined)}
          onFinish={async () => {
            run();
            setWaitAction(undefined);
          }}
        />
      </PageCard>
    </div>
  );
};

export default CamePage;
