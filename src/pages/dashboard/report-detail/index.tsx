import { useRequest } from "ahooks";
import { IAlert } from "components/alert";
import { IfCondition } from "components/condition";
import { useQueryParam } from "hook/useQueryParam";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import reportDetail from "service/report-detail";
import { REPORT_CODE, REPORT_STATUS } from "service/report/types";
import { ActivityList } from "./activity";
import { DonationList } from "./donation";
import { ExpenseList } from "./expense";
import { ReportDetailHeader } from "./header";
import { NormativeExpenseList } from "./normative-expense";
import { ReportOtherList } from "./other/list";
import { reportDetailForm } from "./store";
import { UnitedList } from "./united";

const ReportDetailtPage = () => {
  const [form, setForm] = useAtom(reportDetailForm);
  const param = useParams<{ id?: string }>();

  const query = useQueryParam();
  const code = query.get("code");
  const isFirst = query.get("isFirst");
  const month = query.get("month");

  if (!isFirst || !param.id) return <Navigate to="/dashboard/report" />;

  const getPlan = useRequest(reportDetail.getPlan, {
    manual: true,
    onSuccess: (data) => {
      setForm({
        ...form,
        code: code ?? undefined,
        isFirst: isFirst ? isFirst === "true" : undefined,
        plan: data,
        month: Number(month) || form.month,
      });
    },
  });

  useEffect(() => {
    getPlan.run({
      report_plan_id: parseInt((param?.id || "0") as string),
      is_first: isFirst === "true",
      year: form.year,
      month: Number(month) ?? form.month,
    });
  }, []);

  return (
    <div className="space-y-6 mt-6">
      <ReportDetailHeader />

      <IfCondition
        condition={form.plan?.status === REPORT_STATUS.RETURNED}
        whenTrue={
          <IAlert
            type="error"
            title="Шалтгаан"
            message={form.plan?.return_description}
            closable={false}
          />
        }
      />

      <IfCondition
        condition={code === REPORT_CODE.NORMATIVE_EXPENSE}
        whenTrue={<NormativeExpenseList />}
      />
      <IfCondition
        condition={code === REPORT_CODE.DONATION}
        whenTrue={<DonationList />}
      />
      <IfCondition
        condition={code === REPORT_CODE.EXPENSE}
        whenTrue={<ExpenseList />}
      />
      <IfCondition
        condition={code === REPORT_CODE.UNITED}
        whenTrue={<UnitedList />}
      />
      <IfCondition
        condition={code === REPORT_CODE.ACTIVITY}
        whenTrue={<ActivityList />}
      />
      <IfCondition condition={!code} whenTrue={<ReportOtherList />} />
    </div>
  );
};
export default ReportDetailtPage;
