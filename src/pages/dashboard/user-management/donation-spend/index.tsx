import { useRequest } from "ahooks";
import { notification } from "antd";
import { PageCard } from "components/card";
import { Profile } from "components/profile";
import { ITable } from "components/table";
import InitTableHeader from "components/table-header";
import dayjs from "dayjs";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import finance from "service/finance";
import { DonationExpenseInterface } from "service/finance/type";
import { moneyFormat } from "utils/index";
import { CreateService } from "./actions/create";
import { UpdateService } from "./actions/update";
import { Header } from "./header";
import { storeDonationSpend } from "./store";

const DonationToSpend = () => {
  const [store] = useAtom(storeDonationSpend);

  const list = useRequest(finance.listDonationSpend, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  useEffect(() => {
    list.run({ ...store });
  }, [store]);

  return (
    <div className="flex flex-col gap-4">
      <Header data={list.data} />
      <PageCard xR>
        <div className="px-2 py-0">
          <InitTableHeader
            customHeaderTitle="Хандивын зарцуулалт"
            searchPlaceHolder="Хайх..."
            refresh={list.refresh}
            addButtonName={"Нэмэх"}
            fileName="Хандивын зарцуулалт"
            CreateComponent={CreateService}
            store={storeDonationSpend}
          />
        </div>
        <ITable<DonationExpenseInterface>
          total={list.data?.total}
          loading={list.loading}
          dataSource={list?.data?.items ?? []}
          refresh={(values) => list.run({ ...store, ...values })}
          UpdateComponent={UpdateService}
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
          RemoveModelConfig={{
            action: finance.deleteDonationSpend,
            config: (record) => ({
              uniqueKey: record?.id,
              display: record?.description,
              title: "Remove",
            }),
          }}
        />
      </PageCard>
    </div>
  );
};

export default DonationToSpend;
