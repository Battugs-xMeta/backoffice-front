import { Column } from "@ant-design/charts";
import ProFormDatePickerYear from "@ant-design/pro-form/es/components/DatePicker/YearPicker";
import { useRequest } from "ahooks";
import { CustomDashboardCard } from "components/card";
import dayjs from "dayjs";
import { useAtom } from "jotai";
import { useEffect } from "react";
import Dashboard from "service/dashboard";
import { moneyFormat } from "utils/index";
import { expenseStore } from "./store";

export const ExpenseGraphic = ({}) => {
  const [store, setStore] = useAtom(expenseStore);

  const fetch = useRequest(Dashboard.getNormativeExpense, { manual: true });

  useEffect(() => {
    fetch.run({ ...store });
  }, [store]);

  const config = {
    data: fetch.data?.flatMap((dt) =>
      dt.care_centers.map((el) => ({
        ...el,
        month: dt.month,
        amount: el.amount,
      }))
    ),
    xField: "month",
    yField: "amount",
    colorField: "name",
    group: true,
    style: {
      fill: (datum: any) => {
        return datum?.color;
      },
    },
    loading: fetch.loading,
    legend: false,
    tooltip: (d: any) => ({
      value: moneyFormat(d?.amount),
      name: `${d?.name}`,
      color: d?.color,
    }),
  };

  return (
    <CustomDashboardCard
      title="Зардлын нормативын график"
      className="bg-white overflow-hidden"
      rightTop={
        <ProFormDatePickerYear
          name={"year"}
          label={false}
          allowClear={false}
          fieldProps={{
            value: dayjs().set("year", store.year),
            onChange: (value) => {
              setStore({ ...store, year: dayjs(value).year() });
            },
            disabledDate: current => current && current > dayjs().endOf('day')
          }}
        />
      }
    >
      <div className="relative overflow-hidden h-[350px] ">
        <Column
          {...config}
          axis={{
            y: {
              labelFormatter: (v: any) => {
                return moneyFormat(v);
              },
              title: "Зарцуулсан хэмжээ / төг /",
            },
            x: {
              title: "Сар",
            },
          }}
        />
      </div>
    </CustomDashboardCard>
  );
};
