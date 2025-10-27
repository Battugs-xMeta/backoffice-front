import { Tag } from "antd";
import { REPORT_PLAN_TYPE, ReportMonthlyInterface } from "service/report/types";

type Props = {
  report?: ReportMonthlyInterface | any;
};
export const PlanTypeRender = ({ report }: Props) => {
  return (
    <Tag style={{ color: "#027A48", background: "#ECFDF3" }} bordered={false}>
      {report?.plan_type === REPORT_PLAN_TYPE.NEWS && "Мэдээ"}
      {report?.plan_type === REPORT_PLAN_TYPE.PERFORMANCE && "Гүйцэтгэл"}
      {report?.plan_type === REPORT_PLAN_TYPE.PLANS && "Төлөвлөгөө"}
    </Tag>
  );
};
