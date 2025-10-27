import { Pie, PieConfig } from "@ant-design/charts";
import { CareCenterDetail } from "service/dashboard/types";

const colors = [
  { type: "Гэмтэл, согогийн өвчин", value: 10, color: "#69C0FF" },
  { type: "Арьсны өвчин", value: 9, color: "#B37FEB" },
  { type: "Эх барих, эмэгтэйчүүдийн өвчин", value: 8, color: "#FF9C6E" },
  { type: "Мэс заслын өвчин", value: 7, color: "#FF85C0" },
  { type: "Чих, хамар хоолойн өвчин", value: 6, color: "#95DE64" },
  { type: "Нүдний өвчин", value: 5, color: "#FF7875" },
  { type: "Мэдрэлийн өвчин", value: 4, color: "#FF7875" },
  { type: "Дотрын өвчнүүд", value: 3, color: "#FFA600" },
  { type: "Сэтгэц, зан үйлийн эмгэг", value: 2, color: "#FE7A35" },
  { type: "Халдварт өвчин", value: 1, color: "#00748E" },
];

type Props = {
  data?: CareCenterDetail["care_center"]["disability"]["types"];
};
export const SpecialNeedType = ({ data }: Props) => {
  const config: PieConfig = {
    data: data,
    angleField: "total",
    colorField: "name",
    innerRadius: 0.4,
    label: {
      text: "total",
      style: {
        fontWeight: "bold",
      },
    },
    legend: false,
    tooltip: (d) => ({
      value: `${d?.total}`,
      name: `${d?.name}`,
      color: colors?.find((el) => el.type === d?.name)?.color,
    }),
    style: {
      fill: ({ name }: { name: any }) => {
        return colors?.find((el) => el.type === name)?.color;
      },
    },
  };

  return (
    <div className=" min-h-[200px]">
      <Pie {...config} height={200} width={200} />
      <div className="space-y-2">
        <div className="font-semibold text-base text-gray-900 ">
          Тусгай хэрэгцээний төрөл
        </div>
        {data?.map((el, key) => {
          const color = colors.find((dt) => dt.type === el.name)?.color;
          return (
            <div key={key}>
              {/* Indicator */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div
                    className="w-2 h-2  rounded-full"
                    style={{ backgroundColor: color }}
                  />
                  <div className="text-scale-600 text-sm ml-2">{el.name}</div>
                </div>
                <div className="  text-scale-600 text-sm ">{el.total}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
