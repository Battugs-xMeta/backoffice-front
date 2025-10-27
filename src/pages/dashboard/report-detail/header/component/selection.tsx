import { Flex } from "antd";
import { CardSelect } from "components/card-select";
import dayjs from "dayjs";
import { useAtom } from "jotai";
import { reportDetailForm } from "../../store";
import { IfCondition } from "components/condition";
import { REPORT_PLAN_FREQUENCY } from "service/report/types";
import { useRequest } from "ahooks";
import reportDetail from "service/report-detail";
export const HeaderSelection = () => {
  const [form, setForm] = useAtom(reportDetailForm);

  const getReport = useRequest(
    (values) =>
      reportDetail.getPlan({
        ...form,
        report_plan_id: form.plan?.report_plan_id,
        is_first: form.isFirst,
        year: form.year,
        month: form.month,
        ...values,
      }),
    {
      manual: true,
      onSuccess: (data) => {
        setForm({ ...form, plan: data });
      },
    }
  );
  return (
    <Flex align="center" wrap="wrap" gap={16}>
      <CardSelect
        label={"Он"}
        options={Array.from({ length: dayjs().year() - 1999 }, (_, i) => ({
          label: `${dayjs().year() - i}`,
          value: dayjs().year() - i,
        }))}
        value={form.year}
        onChange={(value) => {
          setForm({ ...form, year: value });
          getReport.run({ year: value });
        }}
      />

      <IfCondition
        condition={
          form.plan?.report_plan?.frequency === REPORT_PLAN_FREQUENCY.HALF_YEAR
        }
        whenTrue={
          <CardSelect
            label={"Тайлант хугацаа"}
            options={[
              { label: "Хагас жил", value: "true" },
              { label: "Бүтэн жил", value: "false" },
            ]}
            onChange={(value) => {
              setForm({ ...form, isFirst: value === "true" });
              getReport.run({ is_first: value === "true" });
            }}
            value={form.isFirst ? "true" : "false"}
          />
        }
        whenFalse={
          <CardSelect
            label={"Тайлант хугацаа"}
            options={Array.from({ length: 12 }, (_, i) => ({
              label: `${i + 1} сар`,
              value: i + 1,
            }))}
            onChange={(value) => {
              setForm({ ...form, month: value });
              getReport.run({ month: value });
            }}
            value={form.month}
          />
        }
      />
    </Flex>
  );
};
