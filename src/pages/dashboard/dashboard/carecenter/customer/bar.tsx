import { Col, Flex, Row, Tooltip } from "antd";
import { useAtom } from "jotai";
import {
  DashboardCustomerInterface,
  DashboardCustomerYearInterface,
} from "service/dashboard/types";
import { dashboardStore } from "../../store";

type Props = {
  data?: DashboardCustomerInterface[];
  loading?: boolean;
};

const colors = {
  "ХЧА-гүй үйлчүүлэгчид": "#69C0FF",
  "Дан тусгай хэрэгцээт": "#B37FEB",
  "Хавсарсан тусгай хэрэгцээт": "#FF7875",
};

const colors2 = {
  "ХЧА-гүй үйлчүүлэгчид": "#FFCCC7",
  "Дан тусгай хэрэгцээт": "#EFDBFF",
  "Хавсарсан тусгай хэрэгцээт": "#BAE7FF",
};

const getColor = (name: string, type: string) => {
  const pickColors = type === "current" ? colors : colors2;
  switch (name) {
    case "Хавсарсан тусгай хэрэгцээт":
      return pickColors["Хавсарсан тусгай хэрэгцээт"];
    case "Дан тусгай хэрэгцээт":
      return pickColors["Дан тусгай хэрэгцээт"];
    case "ХЧА-гүй үйлчүүлэгчид":
      return pickColors["ХЧА-гүй үйлчүүлэгчид"];
    default:
      break;
  }
  return;
};

export const BarChart = ({ data }: Props) => {
  const [store] = useAtom(dashboardStore);

  // Find the maximum value of the data
  const max = Math.max(
    ...(data?.map((el) =>
      el.current_year.reduce<number>((a, b) => a + b.amount, 0)
    ) || []),
    ...(data?.flatMap((el) =>
      el.prev_year.reduce<number>((a, b) => a + b.amount, 0)
    ) || [])
  );

  const increment = Math.ceil(max / 10);

  // Calculate the indicator values
  const indicatorValues = [];
  for (let i = 0; i <= Math.ceil(max / increment); i++) {
    indicatorValues.push(i * increment);
  }

  return (
    <div className="space-y-3">
      {data?.map((el, key) => {
        const currentTotal = el.current_year?.reduce((a, b) => a + b.amount, 0);
        const preTotal = el.prev_year?.reduce((a, b) => a + b.amount, 0);
        return (
          <div className="flex items-start gap-2" key={key}>
            <div className="text-left text-scale-600 text-sm  font-light w-1/3">
              {el.care_center_name}
            </div>

            <div className="w-2/3 space-y-[1px]">
              {/* Current Year */}
              <div className="flex  items-center ">
                {el.current_year?.map((item, index) => {
                  return (
                    <Bar
                      key={`current-year-${el.care_center_name}-${index}`}
                      item={item}
                      total={max}
                      type="current"
                    />
                  );
                })}
                <div className="text-scale-900 text-xs font-medium ml-1">
                  {currentTotal.toFixed(0)}
                </div>
              </div>

              {/* Previous Year  */}
              <div className="flex  items-center">
                {el.prev_year?.map((item, index) => {
                  return (
                    <Bar
                      key={`prev-year-${el.care_center_name}-${index}`}
                      item={item}
                      total={max}
                      type="previous"
                    />
                  );
                })}
                <div className="text-scale-900 text-xs font-medium ml-1">
                  {preTotal.toFixed(0)}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Bottom of the Chart Indicators */}
      <div className="flex">
        <div className="w-1/3" />
        <div className="flex items-center justify-between w-2/3 ">
          {indicatorValues.map((el, key) => {
            return (
              <div
                key={`indicator-${key}`}
                className=" text-scale-600 font-light text-xs"
              >
                {el}
              </div>
            );
          })}
        </div>
      </div>

      <Row justify="center" align="middle">
        <Col lg={6} md={6} sm={12} xs={12}>
          <div className=" text-scale-600 text-base font-light">
            {store.year}
          </div>
        </Col>
        {Object.keys(colors).map((el, key) => {
          return (
            // <div key={key} className="flex flex-wrap items-center gap-2">
            <Col lg={6} md={6} sm={24} xs={24}>
              <Flex gap={10} align="center">
                <div
                  className="h-[8px] w-[8px] rounded-full"
                  style={{ backgroundColor: getColor(el, "current") }}
                />
                <div className="text-scale-600 text-xs">{el}</div>
              </Flex>
            </Col>
          );
        })}
      </Row>

      <Row>
        <Col lg={6} md={6} sm={12} xs={12}>
          <div className=" text-scale-600 text-base font-light">
            {store.year - 1}
          </div>
        </Col>
        {Object.keys(colors2).map((el, key) => {
          return (
            // <div key={key} className="flex flex-wrap items-center gap-2">
            <Col lg={6} md={6} sm={24} xs={24}>
              <Flex gap={10} align="center">
                <div
                  className="h-[8px] w-[8px] rounded-full"
                  style={{ backgroundColor: getColor(el, "previous") }}
                />
                <div className="text-scale-600 text-xs">{el}</div>
              </Flex>
            </Col>
          );
        })}
      </Row>

      {/* Legends of the Chart */}
      {/* <div className="flex flex-wrap flex-col justify-center items-center gap-2">
        <div className="flex gap-2 items-center">
          <div className=" text-scale-600 text-base font-light">
            {store.year}
          </div>
        </div>
        <div className="flex gap-2">
          <div className=" text-scale-600 text-base font-light">
            {store.year - 1}
          </div>
          {Object.keys(colors2).map((el, key) => {
            return (
              <div key={key} className="flex flex-wrap items-center gap-2">
                <div
                  className="h-[8px] w-[8px] rounded-full"
                  style={{ backgroundColor: getColor(el, "previous") }}
                />
                <div className="text-scale-600 text-xs">{el}</div>
              </div>
            );
          })}
        </div>
      </div> */}
    </div>
  );
};

type BarProps = {
  item: DashboardCustomerYearInterface;
  total: number;
  type: string;
};
const Bar = ({ item, total, type }: BarProps) => {
  // calculate percent
  const percent = (item.amount / total) * 100;

  return (
    <Tooltip
      trigger={"hover"}
      title={
        <div>
          <div>{item.name}</div>
          <div>{item.amount.toFixed(0)}</div>
        </div>
      }
    >
      <div
        className="h-[18px]"
        style={{
          backgroundColor: getColor(item.name, type),
          width: `${percent}%`,
        }}
      />
    </Tooltip>
  );
};
