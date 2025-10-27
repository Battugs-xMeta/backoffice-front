import { Progress } from "antd";

type Props = {
  process: number;
  items?: {
    label: string;
    value?: number;
  }[];
};
export const Process = ({ items, process }: Props) => {
  const total = items?.reduce((acc, item) => acc + (item?.value || 0), 0) || 0;

  const percent = items?.map((item) => ((item?.value || 0) / total) * 100);

  return (
    <div className="mt-1">
      <Progress
        percent={Number(process.toFixed(1))}
        size="small"
        success={{ percent: percent?.[0], strokeColor: "#D0D5DD" }}
        trailColor="#D0D5DD"
        strokeColor={"#144E5A"}
      />
    </div>
  );
};
