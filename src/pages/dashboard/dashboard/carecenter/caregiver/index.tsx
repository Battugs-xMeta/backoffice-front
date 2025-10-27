import { Pie, PieConfig } from "@ant-design/charts";
import { EllipsisOutlined } from "@ant-design/icons";
import { Flex } from "antd";
import { CustomDashboardCard } from "components/card";
import { HorizontalChart } from "components/horizontal-chart";
import { CareCenterDetail } from "service/dashboard/types";
import { formatNumber, moneyFormat } from "utils/index";

const colors = [
  { type: "81-100", color: "#69C0FF" },
  { type: "61-80", color: "#B37FEB" },
  { type: "41-60", color: "#FF7875" },
  { type: "21-40", color: "#FF9C6E" },
  { type: "0-20", color: "#95DE64" },
];

type Props = {
  data?: CareCenterDetail["care_center"]["eldely"]["age_and_gender"];
  loading?: boolean;
};
export const CareGiver = ({ loading, data }: Props) => {
  const config: PieConfig = {
    data: data || [],
    angleField: "count",
    colorField: "age_range",
    innerRadius: 0.4,
    label: {
      text: "count",
      style: {
        fontWeight: "bold",
      },
    },
    tooltip: (d) => ({
      value: `${moneyFormat(d?.count)}`,
      name: `${d?.age_range}`,
      color: colors?.find((el) => el.type === d?.age_range)?.color,
    }),
    legend: false,
    style: {
      fill: ({ age_range }: { age_range: any }) => {
        return colors?.find((el) => el.type === age_range)?.color;
      },
    },
  };
  return (
    <CustomDashboardCard
      title="Асруулагчдын насны ангилал"
      className="bg-white"
      rightTop={<EllipsisOutlined rev={undefined} />}
      bodyClassName="space-y-10"
      loading={loading}
    >
      <div>
        <Pie {...config} height={200} width={200} />
        <div className="flex justify-center">
          <div className="space-y-[10px]">
            <div className="font-semibold text-base text-gray-900">Нас</div>
            {data?.map((el, key) => {
              const color = colors?.find(
                (dt) => dt.type === el.age_range
              )?.color;
              return (
                <div key={key}>
                  {/* Indicator */}
                  <div className="flex items-center gap-2 ">
                    <div
                      className="w-2 h-2  rounded-full"
                      style={{ backgroundColor: color }}
                    />
                    <div className="text-scale-600 text-sm ml-2">
                      {el.age_range}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="space-y-[12px]">
        <div className="font-semibold text-base text-gray-900 text-center">
          Хүйс
        </div>
        <HorizontalChart
          data={data?.map((el) => ({
            currentFirst: el.male,
            currentSecond: el.femala,
          }))}
        />
      </div>
    </CustomDashboardCard>
  );
};
