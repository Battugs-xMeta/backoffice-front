import { useRequest } from "ahooks";
import { Card, message } from "antd";
import { Profile } from "components/profile";
import { ITable } from "components/table";
import InitTableHeader from "components/table-header";
import dayjs from "dayjs";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import file from "service/file";
import finance from "service/finance";
import {
  NormativeDetailList,
  NormativeTypeArrayOptions,
} from "service/finance/type";
import { moneyFormat } from "utils/index";
import { reportDetailForm } from "../store";

export const NormativeExpenseList = () => {
  const [form] = useAtom(reportDetailForm);
  const list = useRequest(finance.listNorDetail, {
    manual: true,
    onError: (err) => message.error(err.message),
  });

  useEffect(() => {
    list.run({ ...form });
  }, [form]);

  return (
    <Card className="custom-ant-card-padding-remove mt-6">
      <div className="p-4 pb-0">
        <InitTableHeader
          customHeaderTitle="Норматив зардлын дэлгэрэнгүй"
          searchPlaceHolder="Хайх"
          refresh={() => list.run({ ...form })}
          hideCreate
          fileName="Норматив зардлын дэлгэрэнгүй"
          search={""}
        />
      </div>
      <ITable<NormativeDetailList>
        total={list.data?.total}
        loading={list.loading}
        dataSource={list?.data?.items ?? []}
        refresh={(values) => {
          list.run({ ...form, ...values });
        }}
        hideAction
        columns={[
          {
            dataIndex: "normative_type",
            title: "Норматив зардлын төрөл",
            align: "left",
            width: 200,
            render: (value) => (
              <div className="flex gap-2">
                <span className="text-sm text-[#475467] font-normal">
                  {NormativeTypeArrayOptions.find((el) => el.value === value)
                    ?.label || "-"}
                </span>
              </div>
            ),
          },
          {
            dataIndex: "amount",
            title: "Нийт",
            align: "left",
            render: (value) => (
              <span className="text-sm text-[#475467] font-normal flex text-center">
                {moneyFormat((value as number) || 0) + "₮"}
              </span>
            ),
          },
          {
            dataIndex: "description",
            title: "Тайлбар",
            align: "left",
            render: (value) => (
              <span className="text-sm text-[#475467] font-normal">
                {value || "-"}
              </span>
            ),
          },
          {
            dataIndex: "description",
            title: "Бүртгэсэн ажилтан",
            align: "left",
            render: (_, record) => <Profile user={record?.created_employee} />,
          },
          {
            dataIndex: "order_files",
            title: "Тушаал",
            align: "center",
            render: (_, record) => (
              <span className="text-sm text-[#475467] font-normal">
                <ul>
                  {record?.order_files.length > 0
                    ? record?.order_files?.map((noteFile, index) => {
                        return (
                          <Link
                            to={file.fileToUrl(noteFile?.physical_path)}
                            className="cursor-pointer  text-gray-700"
                            target="blank"
                            download
                          >
                            <li> {noteFile?.original_name}</li>
                          </Link>
                        );
                      })
                    : "-"}
                </ul>
              </span>
            ),
          },
          {
            dataIndex: "contract_files",
            title: "Гэрээ",
            align: "center",
            render: (_, record) => (
              <span className="text-sm text-[#475467] font-normal">
                <ul>
                  {record?.contract_files.length > 0
                    ? record?.contract_files?.map((noteFile, index) => {
                        return (
                          <Link
                            to={file.fileToUrl(noteFile?.physical_path)}
                            className="cursor-pointer  text-gray-700"
                            target="blank"
                            download
                          >
                            <li>{noteFile?.original_name}</li>
                          </Link>
                        );
                      })
                    : "-"}
                </ul>
              </span>
            ),
          },
          {
            dataIndex: "meeting_note_files",
            title: "Хурлын тэмдэглэл",
            align: "center",
            render: (_, record) => (
              <span className="text-sm text-[#475467] font-normal">
                <ul>
                  {record?.meeting_note_files.length > 0
                    ? record?.meeting_note_files?.map((noteFile, index) => {
                        return (
                          <Link
                            to={file.fileToUrl(noteFile?.physical_path)}
                            className="cursor-pointer  text-gray-700"
                            target="blank"
                            download
                          >
                            <li>{noteFile?.original_name}</li>
                          </Link>
                        );
                      })
                    : "-"}
                </ul>
              </span>
            ),
          },
          {
            dataIndex: "advice_files",
            title: "Зөвлөмж",
            align: "center",
            render: (_, record) => (
              <span className="text-sm text-[#475467] font-normal">
                <ul>
                  {record?.advice_files.length > 0
                    ? record?.advice_files?.map((noteFile, index) => {
                        return (
                          <Link
                            to={file.fileToUrl(noteFile?.physical_path)}
                            className="cursor-pointer  text-gray-700"
                            target="blank"
                            download
                          >
                            <li>{noteFile?.original_name}</li>
                          </Link>
                        );
                      })
                    : "-"}
                </ul>
              </span>
            ),
          },
          {
            dataIndex: "created_at",
            title: "Бүртгэсэн огноо",
            align: "left",
            renderText: (value) => (
              <span className="text-sm text-[#475467] font-normal">
                {dayjs(value || 0).format("YYYY-MM-DD") || "-"}
              </span>
            ),
          },
        ]}
      />
    </Card>
  );
};
