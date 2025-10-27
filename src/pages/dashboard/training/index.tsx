import { UserOutlined } from "@ant-design/icons";
import { useDebounceFn, useRequest } from "ahooks";
import { Avatar, Tag, notification } from "antd";
import files from "assets/icons/certicate_file.svg";
import { PageCard } from "components/card";
import { ExportButton, FilterForm, ITable } from "components/index";
import InitTableHeader from "components/table-header";
import dayjs from "dayjs";
import { useAtom } from "jotai";
import moment from "moment";
import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import file from "service/file";
import training from "service/training";
import { TrainingList } from "service/training/type";
import { exportFromTable } from "utils/export";
import { atomWorkersForm } from "utils/store";
import { CreateService } from "./actions/create";
import { UpdateService } from "./actions/update";

const TrainingPage: FC = () => {
  const [form, setForm] = useAtom(atomWorkersForm);
  const [create, setCreate] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const list = useRequest(training.getTraining, {
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
    <div className="flex flex-col gap-4 mt-4">
      <FilterForm
        initialValues={{
          ...form,
        }}
        setselecteddate={setForm}
      />
      <PageCard xR>
        <div className="px-2 py-0">
          <InitTableHeader
            addButtonName="Нэмэх"
            search={search}
            setSearch={(e) => {
              setSearch(e);
              searchRun.run({ ...form, query: e });
            }}
            customHeaderTitle="Ажилчдын сургалтанд хамрагдсан судалгаа"
            searchPlaceHolder="Овог, нэр , албан тушаал "
            setCreate={setCreate}
            refresh={() => list.run({ ...form })}
            toolbarItems={
              <div className="flex">
                <ExportButton
                  onClick={() => {
                    exportFromTable(
                      ["Ажилчдын сургалтанд хамрагдсан судалгаа"],
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
        <ITable<TrainingList>
          total={list.data?.total}
          loading={list.loading}
          dataSource={list?.data?.items ?? []}
          refresh={(values) => list.run({ ...form, ...values })}
          UpdateComponent={UpdateService}
          form={form}
          setForm={setForm}
          columns={[
            {
              dataIndex: "employee",
              title: "",
              align: "center",
              width: 40,
              renderText(value, record) {
                return value?.profile ? (
                  <Avatar
                    shape="circle"
                    size={25}
                    src={file.fileToUrl(value?.profile?.physical_path)}
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
              dataIndex: "employee",
              title: "Овог",
              align: "left",
              render: (value: any) => (
                <div className="text-sm text-[#475467] font-normal">
                  <span className="">{value?.family_name}</span>
                </div>
              ),
            },
            {
              dataIndex: "employee",
              title: "Нэр",
              render: (value: any) => (
                <div className="text-sm text-[#475467] font-normal">
                  <span className="">{value?.first_name}</span>
                </div>
              ),
            },
            {
              dataIndex: "employee",
              title: "Албан тушаал",
              render: (value: any) => (
                <span className="text-sm text-[#475467] font-normal">
                  {value.position}
                </span>
              ),
            },
            {
              dataIndex: ["employee", "total_worked_year"],
              title: "Ажилласан жил",
              render: (val) => (
                <span className="text-sm text-[#475467] font-normal">
                  {val}
                </span>
              ),
            },
            {
              dataIndex: "phone",
              title: "Сургалтанд суусан огноо",
              render: (_, record) => (
                <span className="text-sm text-[#475467] font-normal">
                  {dayjs(record.start_date).format("YYYY-MM-DD")}
                </span>
              ),
            },
            {
              dataIndex: "phone",
              title: "Сургалтын нэр",
              render: (_, record) => (
                <span className="text-sm text-[#475467] font-normal">
                  {record.name}
                </span>
              ),
            },
            {
              dataIndex: "phone",
              title: "Хугацаа /хоног/",
              render: (_, record) => {
                return (
                  <span className="text-sm text-[#475467] font-normal">
                    {parseInt(moment(record?.end_date).date().toString()) -
                      parseInt(moment(record?.start_date).date().toString())}
                  </span>
                );
              },
            },
            {
              dataIndex: "is_certificate",
              title: "Сертификаттай эсэх",
              render: (value) => (
                <span className="text-sm text-[#475467] font-normal flex text-center">
                  <Tag
                    color={value ? "green" : "red"}
                    bordered={false}
                    className="font-normal text-xs"
                  >
                    {value ? "Тийм" : "Үгүй"}
                  </Tag>
                </span>
              ),
            },
            {
              dataIndex: "certificate",
              title: "Хавсралт файл",
              align: "start",
              render: (_, record) => (
                record?.certificate &&
                <span className="text-sm text-[#475467] font-normal">
                  <Link
                    to={file.fileToUrl(
                      record?.certificate?.physical_path ?? ""
                    )}
                    className="cursor-pointer  text-gray-700"
                    target="blank"
                    download
                  >
                    <div className="flex gap-2 items-center">
                      <img src={files} alt="file" />
                      <span className="text-sm text-[#475467] font-normal">
                        {record?.certificate?.original_name || "-"}
                      </span>
                    </div>
                  </Link>
                </span>
              ),
            },
          ]}
          CreateComponent={CreateService}
          create={create as boolean}
          setCreate={setCreate}
          RemoveModelConfig={{
            action: training.deleteTraining,
            config: (record) => ({
              uniqueKey: record?.id,
              display: record?.employee?.first_name,
              title: "Remove",
            }),
          }}
        />
      </PageCard>
    </div>
  );
};

export default TrainingPage;
