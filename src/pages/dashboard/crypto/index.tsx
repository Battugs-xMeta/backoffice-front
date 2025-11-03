import { ProFormRadio } from "@ant-design/pro-form";
import { IfCondition } from "components/condition";
import { useState } from "react";
import { FilterFinanceButton, FilterFinanceLine } from "service/finance/type";

const CryptoPage = () => {
  const [tab, setTab] = useState<any>(FilterFinanceLine.toForm30);

  const Incomebuttons: FilterFinanceButton[] = [
    {
      value: FilterFinanceLine.toForm30,
      label: "30%-н бүрдүүлэлт",
    },
    {
      value: FilterFinanceLine.toSpend30,
      label: "30%-н зарцуулалт",
    },
    {
      value: FilterFinanceLine.donationtoForm,
      label: "Хандивын бүрдүүлэлт",
    },
    {
      value: FilterFinanceLine.donationToSpend,
      label: "Хандивын зарцуулалт",
    },
    {
      value: FilterFinanceLine.norExpense,
      label: "Норматив зардал",
    },
  ];

  return (
    <div className="space-y-3 mt-4">
      <ProFormRadio.Group
        radioType="button"
        fieldProps={{
          size: "large",
          value: tab,
          onChange: (e) => {
            setTab(e.target.value);
          },
        }}
        options={Incomebuttons?.map((el) => ({
          ...el,
          onChange: (e) => {
            setTab(e);
          },
        }))}
        initialValue={FilterFinanceLine.toForm30}
      />
    </div>
  );
};

export default CryptoPage;

export const getColor = (status: number) => {
  switch (status) {
    case 11:
      return "green";
    case 14:
      return "red";
    case 13:
      return "yellow";
    case 12:
      return "blue";
    default:
      return "#FFFAEB";
  }
};
