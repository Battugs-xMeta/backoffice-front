import { Card, message } from "antd";
import GroupedPerson from "assets/icons/grouped-person.svg";
import { Profile } from "components/profile";
import { ITable } from "components/table";
import dayjs from "dayjs";
import { useAtom } from "jotai";
import { FinanceStatusToSpend30Array, Spent30 } from "service/finance/type";
import { moneyFormat } from "utils/index";
import { reportDetailForm } from "../store";
import InitTableHeader from "components/table-header";
import { ExportButton } from "components/index";
import { exportFromTable } from "utils/export";
import { useRequest } from "ahooks";
import finance from "service/finance";
import { useEffect } from "react";

export const ExpenseList = () => {
  const [form] = useAtom(reportDetailForm);
  const list = useRequest(finance.listSpend30, {
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
          search={""}
          customHeaderTitle="Үйлчлүүлэгчдийн тэтгэвэр,тэтгэмжийн 30 хувийн зарцуулалт"
          searchPlaceHolder="Овог, нэр , регистрийн дугаар "
          refresh={() => list.run({ ...form })}
          hideCreate
          toolbarItems={
            <div className="flex">
              <ExportButton
                onClick={() => {
                  exportFromTable(
                    [
                      "Үйлчлүүлэгчдийн тэтгэвэр,тэтгэмжийн 30 хувийн зарцуулалт",
                    ],
                    window.document.getElementById("main-table") as HTMLElement,
                    window
                  );
                }}
              />
            </div>
          }
        />
      </div>
      <ITable<Spent30>
        hideAction
        scroll={{ x: 1400 }}
        total={list.data?.total}
        loading={list.loading}
        dataSource={list?.data?.items ?? []}
        refresh={(values) => list.run({ ...form, ...values })}
        columns={[
          {
            dataIndex: "elderlies",
            title: "Үйлчлүүлэгч",
            align: "left",
            render: (value) => (
              <div className="flex gap-2">
                <div className="bg-gray-100 rounded-2xl flex px-3 py-2 gap-1">
                  <img src={GroupedPerson} alt="GrpupedPerson" />
                  <span className="text-sm text-[#475467] font-normal">
                    {Array.isArray(value) ? value.length : "-"}
                  </span>
                </div>
              </div>
            ),
          },
          {
            dataIndex: "expense_type",
            title: "Төрөл",
            align: "left",
            renderText: (value) => (
              <span className="text-sm text-[#475467] font-normal flex text-center">
                {FinanceStatusToSpend30Array.find((el) => el.value === value)
                  ?.label || "-"}
              </span>
            ),
          },
          {
            dataIndex: "title",
            title: "Нэр",
            renderText: (value) => (
              <span className="text-sm text-[#475467] font-normal flex text-center">
                {value || "-"}
              </span>
            ),
          },
          {
            dataIndex: "quantity",
            title: "Тоо/ширхэг",
            renderText: (value) => (
              <span className="text-sm text-[#475467] font-normal">
                {value || "-"}
              </span>
            ),
          },
          {
            dataIndex: "amount",
            title: "Мөнгөн дүн",
            align: "center",
            renderText: (value, record) => (
              <span className="text-sm text-[#475467] font-normal">
                {moneyFormat(Number(value), "mnt") || "-"}
              </span>
            ),
          },
          {
            dataIndex: "date",
            title: "Огноо",
            align: "left",
            renderText: (value) => (
              <span className="text-sm text-[#475467] font-normal">
                {dayjs(value || 0).format("YYYY-MM-DD") || "-"}
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
