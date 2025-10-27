import { Flex } from "antd";
import { HorizontalChart } from "components/horizontal-chart";
import { AgeAndGender } from "service/dashboard/types";
type Props = {
  data?: AgeAndGender[];
};

export const SpecialGender = ({ data }: Props) => {
  return (
    <Flex gap={12} className=" justify-center xl:justify-normal">
      <div className=" space-y-[12px]">
        <div className="font-semibold text-base text-gray-900 text-center">
          Нас
        </div>
        {(data || [])?.map((el, key) => {
          return (
            <div
              key={key}
              className=" text-scale-600 font-medium h-6  content-center "
            >
              {el.age_range}
            </div>
          );
        })}
      </div>
      <div className=" space-y-[12px] w-4/5">
        <div className="font-semibold text-base text-gray-900 text-center">
          ХЧА Нас болон хүйсээр
        </div>
        <HorizontalChart
          data={(data || [])?.map((el) => ({
            currentFirst: el.male || 0,
            currentSecond: el.femala || 0,
          }))}
        />
      </div>
    </Flex>
  );
};
