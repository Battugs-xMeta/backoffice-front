import { useRequest } from "ahooks";
import { Skeleton } from "antd";
import { CustomDashboardCard } from "components/card";
import { IfCondition } from "components/condition";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { BarChart } from "./bar";
import { dashboardStore } from "../../store";
import Dashboard from "service/dashboard";

export const Customer = () => {
  const [store] = useAtom(dashboardStore);

  const fetch = useRequest(Dashboard.getTotalCustomer, {
    manual: true,
  });

  useEffect(() => {
    fetch.run({ ...store });
  }, [store]);

  return (
    <CustomDashboardCard
      title="Нийт үйлчлүүлэгч"
      rightTop={
        <div className="flex gap-2 items-end">
          <div className=" text-2xl leading-none text-gray-900 font-medium">
            {fetch.data && fetch.data?.length > 0 ? fetch.data[0].used_bed : 0}
          </div>
          <div>/</div>
          <div className="text-base  text-scale-600 leading-none">{fetch.data && fetch.data?.length > 0 ? fetch.data[0].capacity_bed : 0}</div>
        </div>
      }
      className="bg-white flex flex-col justify-between relative w-full"
      bodyClassName="flex flex-col justify-end"
    >
      <IfCondition
        condition={fetch.loading}
        whenTrue={
          <Skeleton
            loading={true}
            active
            paragraph={{ rows: 10, width: "100%" }}
          />
        }
        whenFalse={<BarChart data={fetch.data} />}
      />
    </CustomDashboardCard>
  );
};
