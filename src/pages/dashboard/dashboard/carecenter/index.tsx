import ProFormDatePickerYear from "@ant-design/pro-form/es/components/DatePicker/YearPicker";
import { Flex } from "antd";
import { CareGiver } from "./caregiver";

import { CustomDashboardCard } from "components/card";
import dayjs from "dayjs";
import { useAtom } from "jotai";
import { dashboardStore } from "../store";
import { Customer } from "./customer";
import Movement from "./movement";
import { SpecialCustomer } from "./special-customer";

type Props = {
  data?: any;
  loading?: boolean;
};

export const CareCenterGraphic = ({ data, loading }: Props) => {
  const [store, setStore] = useAtom(dashboardStore);
  return (
    <CustomDashboardCard
      title="Асрамжийн газрын график үзүүлэлт"
      rightTop={
        <Flex gap={24}>
          <ProFormDatePickerYear
            fieldProps={{
              value: dayjs().set("year", store.year),
              onChange: (value) => {
                setStore({ ...store, year: dayjs(value).year() });
              },
              disabledDate: current => current && current > dayjs().endOf('day')
            }}
          />
        </Flex>
      }
      bodyClassName="space-y-6"
    >
      <div className="space-y-6">
        {/* Customer  & Age  & Donation */}
        <Customer />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Disability Special */}
          <div className=" col-span-1">
            <SpecialCustomer data={data?.care_center} loading={loading} />
          </div>

          {/* CareGiver */}
          <div className="col-span-1 ">
            <CareGiver
              data={data?.care_center.eldely.age_and_gender}
              loading={loading}
            />
          </div>
        </div>
      </div>

      {/* Expense Graphic & Movement & Carecenter List */}
      <Movement data={data?.care_center.movements} />
    </CustomDashboardCard>
  );
};
