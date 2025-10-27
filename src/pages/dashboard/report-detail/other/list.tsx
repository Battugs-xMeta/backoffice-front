import { useRequest } from "ahooks";
import { Button } from "antd";
import { PageCard } from "components/card";
import { Profile } from "components/profile";
import { ITable } from "components/table";
import dayjs from "dayjs";
import { useAtom } from "jotai";
import file from "service/file";
import reportDetail from "service/report-detail";
import { ReportPlanOtherInterface } from "service/report-detail/type";
import { REPORT_STATUS } from "service/report/types";
import { ReportDetailEmpty } from "../empty";
import { reportDetailForm } from "../store";
import { Create } from "./create";
import { Update } from "./update";

export const ReportOtherList = () => {
  const [form, setForm] = useAtom(reportDetailForm);
  const getReport = useRequest(reportDetail.getPlan, {
    manual: true,
    onSuccess: (data) => {
      setForm({ ...form, plan: data });
    },
  });

  return (
    <div>
      <PageCard bodyClassName="space-y-6" title={form.plan?.report_plan?.name}>
        {!form?.plan?.report_excel_id && (
          <ReportDetailEmpty
            refresh={() => setForm({ ...form })}
            create={Create}
          />
        )}
        {(form?.plan?.report_excel_id || 0) > 0 && (
          <ITable<ReportPlanOtherInterface>
            loading={getReport.loading}
            refresh={() =>
              getReport.run({
                ...form,
                report_plan_id: form.plan?.report_plan_id,
                is_first: form.isFirst,
                year: form.year,
                month: form.month,
              })
            }
            columns={[
              {
                title: "Хавсралт файл(PDF)",
                dataIndex: "report_pdf",
                key: "file",
                renderText: (value, record) =>
                  (
                    <Button
                      type="text"
                      href={file.fileToUrl(
                        record?.report_pdf?.physical_path || ""
                      )}
                      target="_blank"
                    >
                      {record.report_pdf?.original_name}
                    </Button>
                  ) || "Файл үүсгээгүй байна",
              },
              {
                title: "Хавсралт файл(XLSX)",
                dataIndex: "report_excel",
                key: "second",
                renderText: (value, record) =>
                  (
                    <Button
                      type="text"
                      href={file.fileToUrl(
                        record?.report_excel?.physical_path || ""
                      )}
                      target="_blank"
                    >
                      {record.report_excel?.original_name}
                    </Button>
                  ) || "Файл үүсгээгүй байна",
              },
              {
                title: "Үүсгэсэн огноо",
                dataIndex: "created_at",
                key: "created_at",
                render: (_, record) =>
                  dayjs(record.created_at).format("YYYY-MM-DD"),
              },
              {
                title: "Ажилтан",
                dataIndex: "created_user",
                render: (_, record) => (
                  <Profile user={record.created_employee} />
                ),
              },
            ]}
            dataSource={([{ ...form.plan }] as any) || []}
            UpdateComponent={
              form.plan?.status === REPORT_STATUS.SAVED ||
              form.plan?.status === REPORT_STATUS.RETURNED
                ? Update
                : undefined
            }
          />
        )}
      </PageCard>
    </div>
  );
};
