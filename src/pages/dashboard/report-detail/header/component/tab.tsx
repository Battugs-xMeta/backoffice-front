import { Tabs } from "antd";
import { IfCondition } from "components/condition";
import { useAtom } from "jotai";
import { reportDetailForm, ReportActivityDetailTab } from "../../store";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { REPORT_CODE } from "service/report/types";

export const HeaderTab = () => {
  const [form, setForm] = useAtom(reportDetailForm);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setForm({
      ...form,
      tab:
        (searchParams.get("tab") as ReportActivityDetailTab) ??
        ReportActivityDetailTab["Б-АС-1.1А"],
    });
  }, [searchParams]);

  return (
    <div className="overflow-hidden">
      <IfCondition
        condition={form.code === REPORT_CODE.ACTIVITY}
        whenTrue={
          <Tabs
            activeKey={form.tab}
            items={Object.values(ReportActivityDetailTab)?.map((el) => ({
              label: el,
              key: el,
            }))}
            onChange={(e) => {
              setSearchParams({
                tab: e,
                isFirst: searchParams?.get("isFirst") ?? "",
                code: searchParams.get("code") || "",
              });
            }}
          />
        }
      />
    </div>
  );
};
