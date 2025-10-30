import { useRequest } from "ahooks";
import { Avatar, Flex, Table, Tooltip, notification } from "antd";
import Add from "assets/icons/report/add.svg";
import Check from "assets/icons/report/check.svg";
import None from "assets/icons/report/none.svg";
import { PageCard } from "components/card";
import { ITable } from "components/table";
import InitTableHeader from "components/table-header";
import dayjs from "dayjs";
import { useAtom } from "jotai";
import { useEffect } from "react";
import file from "service/file";
import payment from "service/payment";
import { PaymentElderly } from "service/payment/type";
import { firstLastNames, moneyFormat } from "utils/index";
import { CreateService } from "../actions/create";
import { financeStore } from "./store";
import { Header } from "./header";
import SymbolInformation from "components/symbol-information";

const Form30Page = () => {
  const [store] = useAtom(financeStore);

  const list = useRequest(payment.list, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  useEffect(() => {
    list.run({
      ...store,
    });
  }, [store]);

  const returnStatusIcon = (
    status: number,
    year: number,
    month: number,
    amount: number
  ) => {
    let retVal = null;
    switch (status) {
      case 0:
        retVal = <img src={None} alt="none" />;
        if (year === dayjs().year() && month === dayjs().month() + 1) {
          retVal = <img src={Add} alt="none" />;
        }
        break;
      case 1:
        retVal = (
          <Tooltip title={moneyFormat(amount, "mnt")}>
            {" "}
            <img src={Check} alt="none" />
          </Tooltip>
        );
        break;
    }
    return (
      <Flex align="center" justify="center">
        {retVal}
      </Flex>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <Header data={list.data} />
      <PageCard xR>
        <div className="px-2 py-0">
          <InitTableHeader
            store={financeStore}
            customHeaderTitle="Үйлчлүүлэгчдийн тэтгэвэр,тэтгэмжийн 30 хувийн бүрдүүлэлт"
            searchPlaceHolder="Овог, нэр , регистрийн дугаар "
            refresh={list.refresh}
            addButtonName={"Нэмэх"}
            fileName="Үйлчлүүлэгчдийн тэтгэвэр,тэтгэмжийн 30 хувийн бүрдүүлэлт"
            CreateComponent={CreateService}
            toolbarItems={<SymbolInformation hideItems={["5", "4", "3"]} />}
          />
        </div>
        <ITable<PaymentElderly>
          hidePagination
          loading={list.loading}
          dataSource={list?.data?.elderlies ?? []}
          refresh={(values) => list.run({ ...store, ...values })}
          hideAction
          columns={[
            {
              dataIndex: "received_employees",
              title: "",
              align: "center",
              render: (_, record) => {
                return (
                  <Flex align="center" gap={10}>
                    <Avatar
                      style={{ backgroundColor: "#87d068" }}
                      src={
                        record?.elderly?.profile?.physical_path
                          ? file.fileToUrl(
                              record?.elderly?.profile?.physical_path || ""
                            )
                          : "https://api.dicebear.com/7.x/miniavs/svg?seed=3"
                      }
                      size={"small"}
                    />
                    <Flex vertical className="text-sm" align="flex-start">
                      <span className="font-semibold">
                        {firstLastNames(
                          record?.elderly?.last_name,
                          record?.elderly?.first_name
                        ) || "-"}
                      </span>
                      <span>{record?.elderly?.rd}</span>
                    </Flex>
                  </Flex>
                );
              },
            },
            {
              dataIndex: ["elderly", "family_name"],
              title: "Нийт төлсөн дүн",
              align: "left",
              width: 120,
              render: (value, record) => {
                return record.total_paid
                  ? moneyFormat(record.total_paid, "mnt")
                  : "0 ₮";
              },
            },
            {
              dataIndex: ["elderly", "first_name"],
              width: 100,
              title: "Төрөл",
              align: "left",
              render: (value, record) => record.payment_type,
            },
            {
              dataIndex: "jan",
              title: "1 сар",
              align: "center",
              width: 90,
              render: (value, record) =>
                returnStatusIcon(
                  record.months[0].status,
                  store.year,
                  1,
                  record.months[0].amount
                ),
            },
            {
              dataIndex: "feb",
              title: "2 сар",
              align: "center",
              width: 90,
              render: (value, record) =>
                returnStatusIcon(
                  record.months[1].status,
                  store.year,
                  2,
                  record.months[1].amount
                ),
            },
            {
              dataIndex: "march",
              title: "3 сар",
              align: "center",
              width: 90,
              render: (value, record) =>
                returnStatusIcon(
                  record.months[2].status,
                  store.year,
                  3,
                  record.months[2].amount
                ),
            },
            {
              dataIndex: "april",
              title: "4 сар",
              align: "center",
              width: 90,
              render: (value, record) =>
                returnStatusIcon(
                  record.months[3].status,
                  store.year,
                  4,
                  record.months[3].amount
                ),
            },
            {
              dataIndex: "may",
              title: "5 сар",
              align: "center",
              width: 90,
              render: (value, record) =>
                returnStatusIcon(
                  record.months[4].status,
                  store.year,
                  5,
                  record.months[4].amount
                ),
            },
            {
              dataIndex: "june",
              title: "6 сар",
              align: "center",
              width: 90,
              render: (value, record) =>
                returnStatusIcon(
                  record.months[5].status,
                  store.year,
                  6,
                  record.months[5].amount
                ),
            },
            {
              dataIndex: "jul",
              title: "7 сар",
              align: "center",
              width: 90,
              render: (value, record) =>
                returnStatusIcon(
                  record.months[6].status,
                  store.year,
                  7,
                  record.months[6].amount
                ),
            },
            {
              dataIndex: "au",
              title: "8 сар",
              align: "center",
              width: 90,
              render: (value, record) =>
                returnStatusIcon(
                  record.months[7].status,
                  store.year,
                  8,
                  record.months[7].amount
                ),
            },
            {
              dataIndex: "sep",
              title: "9 сар",
              align: "center",
              width: 90,
              render: (value, record) =>
                returnStatusIcon(
                  record.months[8].status,
                  store.year,
                  9,
                  record.months[8].amount
                ),
            },
            {
              dataIndex: "oct",
              title: "10 сар",
              align: "center",
              width: 90,
              render: (value, record) =>
                returnStatusIcon(
                  record.months[9].status,
                  store.year,
                  10,
                  record.months[9].amount
                ),
            },
            {
              dataIndex: "nov",
              title: "11 сар",
              align: "center",
              width: 90,
              render: (value, record) =>
                returnStatusIcon(
                  record.months[10].status,
                  store.year,
                  11,
                  record.months[10].amount
                ),
            },
            {
              dataIndex: "dec",
              title: "12 сар",
              align: "center",
              width: 90,
              render: (value, record) =>
                returnStatusIcon(
                  record.months[11].status,
                  store.year,
                  12,
                  record.months[11].amount
                ),
            },
          ]}
          summary={(pageData) => {
            let totalElderlyPaidAmount = 0;
            let janMonth = 0;
            let febMonth = 0;
            let marMonth = 0;
            let aprMonth = 0;
            let mayMonth = 0;
            let junMonth = 0;
            let julMonth = 0;
            let augMonth = 0;
            let sepMonth = 0;
            let octMonth = 0;
            let novMonth = 0;
            let decMonth = 0;

            pageData.forEach(({ months, elderly, total_paid }) => {
              totalElderlyPaidAmount += total_paid;
              months.map((month, index) => {
                switch (index) {
                  case 0:
                    janMonth += month.amount;
                    break;
                  case 1:
                    febMonth += month.amount;
                    break;
                  case 2:
                    marMonth += month.amount;
                    break;
                  case 3:
                    aprMonth += month.amount;
                    break;
                  case 4:
                    mayMonth += month.amount;
                    break;
                  case 5:
                    junMonth += month.amount;
                    break;
                  case 6:
                    julMonth += month.amount;
                    break;
                  case 7:
                    augMonth += month.amount;
                    break;
                  case 8:
                    sepMonth += month.amount;
                    break;
                  case 9:
                    octMonth += month.amount;
                    break;
                  case 10:
                    novMonth += month.amount;
                    break;
                  case 11:
                    decMonth += month.amount;
                    break;
                }
              });
            });

            return (
              <>
                <Table.Summary.Row>
                  <Table.Summary.Cell index={0}>Нийт</Table.Summary.Cell>
                  <Table.Summary.Cell index={1}>
                    {list?.data?.elderlies?.length}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell
                    align="left"
                    index={2}
                    className="text-xs"
                  >
                    {totalElderlyPaidAmount
                      ? moneyFormat(totalElderlyPaidAmount, "mnt")
                      : "0 ₮"}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={3} />

                  <Table.Summary.Cell
                    className="text-xs"
                    align="center"
                    index={4}
                  >
                    {janMonth ? moneyFormat(janMonth, "mnt") : "0 ₮"}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell
                    className="text-xs"
                    align="center"
                    index={5}
                  >
                    {febMonth ? moneyFormat(febMonth, "mnt") : "0 ₮"}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell
                    className="text-xs"
                    align="center"
                    index={6}
                  >
                    {marMonth ? moneyFormat(marMonth, "mnt") : "0 ₮"}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell
                    className="text-xs"
                    align="center"
                    index={7}
                  >
                    {aprMonth ? moneyFormat(aprMonth, "mnt") : "0 ₮"}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell
                    className="text-xs"
                    align="center"
                    index={8}
                  >
                    {mayMonth ? moneyFormat(mayMonth, "mnt") : "0 ₮"}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell
                    className="text-xs"
                    align="center"
                    index={9}
                  >
                    {junMonth ? moneyFormat(junMonth, "mnt") : "0 ₮"}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell
                    className="text-xs"
                    align="center"
                    index={10}
                  >
                    {julMonth ? moneyFormat(julMonth, "mnt") : "0 ₮"}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell
                    className="text-xs"
                    align="center"
                    index={11}
                  >
                    {augMonth ? moneyFormat(augMonth, "mnt") : "0 ₮"}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell
                    className="text-xs"
                    align="center"
                    index={12}
                  >
                    {sepMonth ? moneyFormat(sepMonth, "mnt") : "0 ₮"}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell
                    className="text-xs"
                    align="center"
                    index={13}
                  >
                    {octMonth ? moneyFormat(octMonth, "mnt") : "0 ₮"}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell
                    className="text-xs"
                    align="center"
                    index={14}
                  >
                    {novMonth ? moneyFormat(novMonth, "mnt") : "0 ₮"}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell
                    className="text-xs"
                    align="center"
                    index={15}
                  >
                    {decMonth ? moneyFormat(decMonth, "mnt") : "0 ₮"}
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              </>
            );
          }}
        />
      </PageCard>
    </div>
  );
};

export default Form30Page;
