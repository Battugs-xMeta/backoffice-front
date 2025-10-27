import { Flex, Tag } from "antd";
import { IfCondition } from "components/condition";
import { useAtom } from "jotai";
import { PlanTypeRender } from "pages/dashboard/report/component/plan-type-render";
import { REPORT_PLAN_FREQUENCY } from "service/report/types";
import { reportDetailForm } from "../../store";

export const HeaderInfo = () => {
  const [form] = useAtom(reportDetailForm);
  return (
    <Flex align="center" justify="space-between" wrap="wrap" gap={16}>
      <div className="text-sm">
        <span className="text-gray-500">Мэдээллийн төрөл: </span>
        <PlanTypeRender report={form.plan?.report_plan} />
      </div>
      <div className="text-sm">
        <span className="text-gray-500">Давтамж: </span>
        <span className=" font-medium text-gray-900 ">
          {form.plan?.report_plan?.frequency === REPORT_PLAN_FREQUENCY.MONTHLY
            ? "Сар"
            : "Хагас жил"}
        </span>
      </div>
      <Flex className="text-sm" gap={2}>
        <span className="text-gray-500">Мэдээлэл оруулах хугацаа: </span>
        <div className="flex item-center gap-2 ">
          {/* Frequency is Half year && IsFirst is true  */}
          <IfCondition
            condition={
              !!form.isFirst &&
              form.plan?.report_plan?.frequency ===
                REPORT_PLAN_FREQUENCY.HALF_YEAR
            }
            whenTrue={
              <>
                <Tag className="h-fit" bordered={false}>
                  {form.plan?.report_plan?.half_year_month_start} сарын{" "}
                  {form.plan?.report_plan?.half_year_month_start_day}
                </Tag>
                <div>-</div>
                <Tag className="h-fit" bordered={false}>
                  {form.plan?.report_plan?.half_year_month_start_deadline} сарын{" "}
                  {form.plan?.report_plan?.half_year_month_start_day_deadline}
                </Tag>
              </>
            }
          />

          {/* Isfirst  is false && frequency is Half year */}
          <IfCondition
            condition={
              !form.isFirst &&
              form.plan?.report_plan?.frequency ===
                REPORT_PLAN_FREQUENCY.HALF_YEAR
            }
            whenTrue={
              <>
                <Tag className="h-fit" bordered={false}>
                  {form.plan?.report_plan?.half_year_month_end} сарын{" "}
                  {form.plan?.report_plan?.half_year_month_end_day}
                </Tag>
                <div>-</div>
                <Tag className="h-fit" bordered={false}>
                  {form.plan?.report_plan?.half_year_month_end_deadline} сарын{" "}
                  {form.plan?.report_plan?.half_year_month_end_day_deadline}
                </Tag>
              </>
            }
          />

          {/* When FREQUENCY monthly */}
          <IfCondition
            condition={
              form.plan?.report_plan?.frequency ===
              REPORT_PLAN_FREQUENCY.MONTHLY
            }
            whenTrue={
              <Tag bordered={false}>
                Сар бүрийн {form.plan?.report_plan?.monthly_day_start} -{" "}
                {form.plan?.report_plan?.monthly_day_end} хооронд
              </Tag>
            }
          />
        </div>
      </Flex>
    </Flex>
  );
};
