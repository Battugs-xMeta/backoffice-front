import { useRequest } from "ahooks";
import { Card, message } from "antd";
import { ExportButton, ITable } from "components/index";
import { Profile } from "components/profile";
import InitTableHeader from "components/table-header";
import dayjs from "dayjs";
import { useAtom } from "jotai";
import { useEffect } from "react";
import finance from "service/finance";
import { DonationExpenseInterface } from "service/finance/type";
import { exportFromTable } from "utils/export";
import { moneyFormat } from "utils/index";
import { reportDetailForm } from "../store";

export const SpendList = () => {
  const [form] = useAtom(reportDetailForm);
  const list = useRequest(finance.listDonationSpend, {
    manual: true,
    onError: (err) => message.error(err.message),
  });

  useEffect(() => {
    list.run({ ...form });
  }, [form.plan]);
  return (
    <Card className="custom-ant-card-padding-remove">
      <div className="p-4 pb-0">
        <InitTableHeader
          search={""}
          customHeaderTitle="Хандивын зарцуулалт"
          searchPlaceHolder="Хайх..."
          refresh={list.refresh}
          hideCreate
          toolbarItems={
            <div className="flex">
              <ExportButton
                onClick={() => {
                  exportFromTable(
                    ["Хандивын зарцуулалт"],
                    window.document.getElementById("main-table") as HTMLElement,
                    window
                  );
                }}
              />
            </div>
          }
        />
      </div>
      <ITable<DonationExpenseInterface>
        scroll={{ x: "max-content" }}
        total={list.data?.total}
        loading={list.loading}
        dataSource={list?.data?.items ?? []}
        refresh={(values) => list.run({ ...form, ...values })}
        hideAction
        columns={[
          {
            dataIndex: "description",
            title: "Зориулалт",
            align: "left",
          },
          {
            dataIndex: "amount",
            title: "Шилжүүлсэн огноо",
            align: "center",
            render: (value, record) => (
              <span className="text-sm text-[#475467] font-normal">
                {moneyFormat(Number(value), "mnt") || "-"}
              </span>
            ),
          },

          {
            dataIndex: "description",
            title: "Бүртгэсэн ажилтан",
            align: "left",
            render: (_, record) => <Profile user={record.created_employee} />,
          },
          {
            dataIndex: "updated_at",
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
