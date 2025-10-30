import { Col, Row } from "antd";
import { CustomDashboardCard } from "components/card";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import { CareCenterDetail } from "service/dashboard/types";

interface MovementProps {
  data?: CareCenterDetail["care_center"]["movements"];
  loading?: boolean;
}

export interface MovementItemProps {
  title: string;
  value: number;
  change: number;
  color: string;
  key: string;
}

const calculateWidth = (value: number, total: number) => {
  return (value / total) * 100;
};

const getColor = (status: number) => {
  switch (status) {
    case 11:
      return "#B37FEB";
    case 12:
      return "#69C0FF";
    case 13:
      return "#95DE64";
    case 14:
      return "#FF7875";
    default:
      return "#000";
  }
};

const getTitle = (status: number) => {
  switch (status) {
    case 11:
      return "Шилжсэн";
    case 12:
      return "Сайн дур";
    case 13:
      return "Албадан гаргасан";
    case 14:
      return "Нас барсан";
    default:
      return "Нас барсан";
  }
};

const Movement = ({ data, loading }: MovementProps) => {
  const total = data?.reduce((acc, item) => acc + item.count, 0) || 0;
  return (
    <CustomDashboardCard
      title="Шилжилт хөдөлгөөн"
      className="bg-white"
      loading={loading}
    >
      <div className="space-y-4">
        <Row>
          {data?.map((item) => (
            // <div key={item.status} className="flex flex-col justify-start">
            <Col lg={6} md={6} sm={12} xs={24} key={item.name}>
              <h3 className="text-sm font-medium text-gray-500">
                {getTitle(item.status)}
              </h3>
              <div className="flex items-end gap-1">
                <div
                  className="h-6 mb-2"
                  style={{
                    borderRight: `4px solid ${getColor(item.status)}`,
                  }}
                />
                <p className="text-3xl font-bold text-[#6759CE] p-0 m-0">
                  {item.count}
                </p>

                <span
                  className={`text-sm font-medium mb-1 flex items-center ${
                    item.percent > 0 ? `text-green-500` : `text-red-500`
                  }`}
                >
                  {item.percent > 0 ? <BsArrowUp /> : <BsArrowDown />}
                  {`${item.percent}%`}
                </span>
              </div>
            </Col>
          ))}
        </Row>

        <div className="grid grid-cols-4 gap-4"></div>
        <div className="w-full flex rounded-md overflow-hidden">
          {data?.map((item, index) => {
            const length = calculateWidth(item.count, total);
            return (
              <div
                key={`mov-${index}`}
                style={{
                  width: `${length}%`,
                  height: "8px",
                  backgroundColor: getColor(item.status),
                }}
              />
            );
          })}
        </div>
      </div>
    </CustomDashboardCard>
  );
};

export default Movement;
