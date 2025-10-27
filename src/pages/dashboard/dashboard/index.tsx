import { useRequest } from "ahooks";
import { useAtom } from "jotai";
import { useEffect } from "react";
import Dashboard from "service/dashboard";
import { CareCenterGraphic } from "./carecenter";
import { dashboardStore } from "./store";
import { ExpenseGraphic } from "./expense";
import { ThirtyPercentExpenseGraphic } from "./thirty-percent-expense";
import { Donation } from "./donation";

const GovDashboard = () => {
  const [store] = useAtom(dashboardStore);

  const fetch = useRequest(Dashboard.getCareCenter, {
    manual: true,
  });

  useEffect(() => {
    fetch.run({ ...store });
  }, [store]);

  return (
    <div className="mt-4 space-y-6">
      <div className=" ">
        <CareCenterGraphic data={fetch.data} loading={fetch.loading} />
      </div>

      <div>
        <ExpenseGraphic />
      </div>
      <div>
        <ThirtyPercentExpenseGraphic />
      </div>
      <div>
        <Donation />
      </div>
    </div>
  );
};

export default GovDashboard;
