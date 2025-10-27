import { Progress } from "antd";

type Props = {
  items?: {
    label: string;
    value?: number;
  }[];
};
export const ProgressChart = ({ items }: Props) => {
  // calculate percent
  const total = items?.reduce((acc, item) => acc + (item?.value || 0), 0) || 0;

  const percent = items?.map((item) => ((item?.value || 0) / total) * 100);

  return (
    <div className="">
      <div className="flex items-center justify-between">
        <div>
          <div className=" text-gray-900  text-md">{items?.[0]?.label}</div>
          <div className="text-gray-900 font-semibold text-[30px] text-left">
            {items?.[0]?.value || 0}
          </div>
        </div>
        <div>
          <div className=" text-gray-900  text-md">{items?.[1]?.label}</div>
          <div className=" font-semibold text-[30px] text-right text-[#DD695C]">
            {items?.[1]?.value || 0}
          </div>
        </div>
      </div>
      <Progress
        className="mt-[4px]"
        percent={100}
        strokeWidth={12}
        success={{ percent: percent?.[0], strokeColor: "#69C0FF" }}
        trailColor="#69C0FF"
        strokeColor={"#DD695C"}
        showInfo={false}
      />
    </div>
  );
};
