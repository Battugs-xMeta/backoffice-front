import { useRequest } from "ahooks";
import { List, Tooltip, notification } from "antd";
import GroupedPerson from "assets/icons/grouped-person.svg";
import { PageCard } from "components/card";
import { Profile } from "components/profile";
import { ITable } from "components/table";
import InitTableHeader from "components/table-header";
import { useAtom } from "jotai";
import { useEffect } from "react";
import finance from "service/finance";
import { FinanceStatusToSpend30Array, Spent30 } from "service/finance/type";
import { dateFormat, moneyFormat } from "utils/index";
import { CreateService } from "./actions/create";
import { UpdateService } from "./actions/update";
import { Header } from "./header";
import { storeSpend30 } from "./store";

// 30 % зарцуулалт хуудас
const Spend30 = () => {
  const [store] = useAtom(storeSpend30);

  const list = useRequest(finance.listSpend30, {
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
        <InitTableHeader
          customHeaderTitle="Үйлчлүүлэгчдийн тэтгэвэр,тэтгэмжийн 30 хувийн зарцуулалт"
          searchPlaceHolder="Овог, нэр , регистрийн дугаар "
          refresh={list.refresh}
          addButtonName={"Нэмэх"}
          fileName="Үйлчлүүлэгчдийн тэтгэвэр,тэтгэмжийн 30 хувийн зарцуулалт"
          CreateComponent={CreateService}
          store={storeSpend30}
        />
        <ITable<Spent30>
          total={list.data?.total}
          loading={list.loading}
          dataSource={list?.data?.items || []}
          refresh={(values) => list.run({ ...store, ...values })}
          UpdateComponent={UpdateService}
          columns={[
            {
              dataIndex: "elderlies",
              title: "Үйлчлүүлэгч",
              align: "left",
              render: (value, record) => (
                <Tooltip title={
                  <List>
                    {record.elderlies.map((i) => {
                      return <List.Item className="text-white p-0" key={i.elderly_id}>{i?.elderly?.last_name?.substring(0, 1)}.{i?.elderly?.first_name}</List.Item>
                    })}

                  </List>
                }>
                  <div className="flex gap-2">
                    <div className="bg-gray-100 rounded-2xl flex px-3 py-2 gap-1">
                      <img src={GroupedPerson} alt="GrpupedPerson" />
                      <span className="text-sm text-[#475467] font-normal">
                        {Array.isArray(value) ? value.length : "-"}
                      </span>
                    </div>
                  </div>
                </Tooltip>
              ),
            },
            {
              dataIndex: "expense_type",
              title: "Төрөл",
              align: "left",
              render: (value) => (
                <span className="text-sm text-[#475467] font-normal flex text-center">
                  {FinanceStatusToSpend30Array.find((el) => el.value === value)
                    ?.label || "-"}
                </span>
              ),
            },
            {
              dataIndex: "title",
              title: "Нэр",
              render: (value) => (
                <span className="text-sm text-[#475467] font-normal flex text-center">
                  {value || "-"}
                </span>
              ),
            },
            {
              dataIndex: "quantity",
              title: "Тоо/ширхэг",
              render: (value) => (
                <span className="text-sm text-[#475467] font-normal">
                  {value || "-"}
                </span>
              ),
            },
            {
              dataIndex: "amount",
              title: "Мөнгөн дүн",
              align: "center",
              render: (value, record) => (
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
                  {dateFormat(value) || "-"}
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
              render: (_, record) => <Profile user={record.created_employee} />,
            },
            {
              dataIndex: "updated_at",
              title: "Бүртгэсэн огноо",
              align: "left",
              renderText: (value) => (
                <span className="text-sm text-[#475467] font-normal">
                  {dateFormat(value)}
                </span>
              ),
            },
          ]}
          RemoveModelConfig={{
            action: finance.deleteSpend30,
            config: (record) => ({
              uniqueKey: record?.id,
              display: record?.title,
              title: "Remove",
            }),
          }}
        />
      </PageCard>
    </div>
  );
};

export default Spend30;
