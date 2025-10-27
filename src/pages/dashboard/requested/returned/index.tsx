import { useDebounceFn, useRequest } from "ahooks";
import { Avatar, Tag, notification } from "antd";
import { PageCard } from "components/card";
import { FilterForm } from "components/index";
import { ITable } from "components/table";
import InitTableHeader from "components/table-header";
import { ElderlyStatus } from "config";
import dayjs from "dayjs";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import file from "service/file";
import requested from "service/requested";
import { RequestItem } from "service/requested/types";
import { atomRequestedForm } from "utils/store";
import { DetailService } from "../came/actions/detail";

const ReturnedPage: React.FC = () => {
  const [form, setForm] = useAtom(atomRequestedForm);
  // const [closeAction, setCloseAction] = useState<RequestItem>();
  // const [waitAction, setWaitAction] = useState<RequestItem>();
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
        return "#B54708";
      default:
        return "#FFFAEB";
    }
  };

  const run = () => {
    list.run({
      ...form,
      query: search,
      status: ElderlyStatus.ElderlyCareCenterReturned
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
              searchRun.run({ ...form, query: e, status: ElderlyStatus.ElderlyCareCenterReturned });
            }}
            customHeaderTitle="Цуцалсан хүсэлтийн жагсаалт"
            hideCreate
            refresh={() => list.run({ ...form, query: search, status: ElderlyStatus.ElderlyCareCenterReturned })}
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
              render: () => (
                <Tag color="red">
                  Буцаагдсан
                </Tag>
              ),
            },
          ]}
        // DetailComponent={DetailService}
        />
      </PageCard>
    </div >
  );
};

export default ReturnedPage;
