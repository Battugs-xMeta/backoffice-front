import { useRequest } from "ahooks";
import { Card, Tag, message } from "antd";
import { ExportButton } from "components/index";
import { Profile } from "components/profile";
import { ITable } from "components/table";
import InitTableHeader from "components/table-header";
import dayjs from "dayjs";
import { useAtom } from "jotai";
import { useEffect } from "react";
import finance from "service/finance";
import { CashDonationType } from "service/finance/type";
import { exportFromTable } from "utils/export";
import { reportDetailForm } from "../store";
import { isValidDate, moneyFormat } from "utils/index";
import { RenderDonationType } from "components/donation-type";

export const FormList = () => {
  const [form] = useAtom(reportDetailForm);
  const list = useRequest(finance.listDonationMoney, {
    manual: true,
    onError: (err) => message.error(err.message),
  });

  useEffect(() => {
    list.run({ ...form });
  }, [form]);

  return (
    <Card className="custom-ant-card-padding-remove">
      <div className="p-4 pb-0">
        <InitTableHeader
          search={""}
          customHeaderTitle="Хандивын бүрдүүлэлт"
          searchPlaceHolder="Овог, нэр "
          refresh={list.refresh}
          hideCreate
          toolbarItems={
            <div className="flex">
              <ExportButton
                onClick={() => {
                  exportFromTable(
                    ["Мөнгөн хандив"],
                    window.document.getElementById("main-table") as HTMLElement,
                    window
                  );
                }}
              />
            </div>
          }
        />
      </div>
      <ITable<CashDonationType>
        scroll={{ x: "max-content" }}
        total={list.data?.total}
        loading={list.loading}
        dataSource={list?.data?.items ?? []}
        refresh={(values) => list.run({ ...form, ...values })}
        hideAction
        columns={[
          {
            dataIndex: "first_name",
            title: "Хандивлагчийн нэр",
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
            dataIndex: "is_organization",
            title: "Хандивлагчийн төрөл",
            align: "left",
            renderText: (value) => <RenderDonationType isOrg={value} />,
          },
          {
            dataIndex: "is_approved",
            title: "Баталгаажсан эсэх",
            align: "left",
            render: (value) => (
              <span className="text-sm text-[#475467] font-normal flex text-center">
                <Tag
                  color={value ? "green" : "red"}
                  bordered={false}
                  className="font-normal text-[14px]"
                >
                  {value ? "Тийм" : "Үгүй"}
                </Tag>
              </span>
            ),
          },
          {
            dataIndex: "total_amount",
            title: "Хандивын дүн",
            render: (value) => (
              <span className="text-sm text-[#475467] font-normal flex text-center">
                {moneyFormat(Number(value), "mnt") || "-"}
              </span>
            ),
          },
          {
            dataIndex: "email",
            title: "Имэйл",
            render: (value) => (
              <span className="text-sm text-[#475467] font-normal">
                {value || "-"}
              </span>
            ),
          },
          {
            dataIndex: "date",
            title: "Хүлээн авсан огноо",
            align: "center",
            renderText: (value) => (
              <span className="text-sm text-[#475467] font-normal">
                {isValidDate(value)
                  ? dayjs(value || 0).format("YYYY-MM-DD")
                  : "-"}
              </span>
            ),
          },
          {
            dataIndex: "date",
            title: "Бүртгэсэн ажилтан",
            align: "left",
            render: (_, record) => <Profile user={record?.created_employee} />,
          },
          {
            dataIndex: "updated_at",
            title: "Бүртгэсэн огноо",
            align: "left",
            renderText: (value) => (
              <span className="text-sm text-[#475467] font-normal">
                {isValidDate(value)
                  ? dayjs(value || 0).format("YYYY-MM-DD")
                  : "-"}
              </span>
            ),
          },
        ]}
      />
    </Card>
  );
};
