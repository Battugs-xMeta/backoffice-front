import { ProFormRadio } from "@ant-design/pro-form";
import { IfCondition } from "components/condition";
import { useState } from "react";
import { FilterFinanceButton, FilterFinanceLine } from "service/finance/type";
import DonationToForm from "./donation-form";
import DonationToSpend from "./donation-spend";
import NormativeExpense from "./nor-expense";
import Form30Page from "./toform-30";
import Spend30 from "./tospend-30";

const TransictionsPage = () => {
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

      <IfCondition
        condition={tab === FilterFinanceLine.toForm30}
        whenTrue={<Form30Page />}
      />
      <IfCondition
        condition={tab === FilterFinanceLine.toSpend30}
        whenTrue={<Spend30 />}
      />
      <IfCondition
        condition={tab === FilterFinanceLine.donationtoForm}
        whenTrue={<DonationToForm />}
      />
      <IfCondition
        condition={tab === FilterFinanceLine.donationToSpend}
        whenTrue={<DonationToSpend />}
      />
      <IfCondition
        condition={tab === FilterFinanceLine.norExpense}
        whenTrue={<NormativeExpense />}
      />
    </div>
  );
};

export default TransictionsPage;

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
