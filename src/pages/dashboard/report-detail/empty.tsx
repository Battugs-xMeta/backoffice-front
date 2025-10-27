import { FileExcelFilled } from "@ant-design/icons";
import { useRequest } from "ahooks";
import { Button } from "antd";
import EmptyIcon from "assets/icons/empty.png";
import { useAtom } from "jotai";
import { useState } from "react";
import reportDetail from "service/report-detail";
import { ActionComponentProps } from "types";
import { reportDetailForm } from "./store";

type Props = {
  refresh?: () => void;
  create?: React.FC<ActionComponentProps<any>>;
  createText?: string;
};
export const ReportDetailEmpty = ({
  create: CreateComponent,
  createText = "Файл үүсгэх",
}: Props) => {
  const [create, setCreate] = useState(false);
  const [form, setForm] = useAtom(reportDetailForm);
  const getReport = useRequest(reportDetail.getPlan, {
    manual: true,
    onSuccess: (data) => {
      setForm({ ...form, plan: data });
    },
  });

  return (
    <>
      <div className="py-10 text-center space-y-2">
        <img src={EmptyIcon} width={152} />
        <div className="text-gray-900 font-semibold text-base">
          Хоосон байна
        </div>
        <Button type="primary" size="large" onClick={() => setCreate(true)}>
          <FileExcelFilled rev={undefined} /> {createText}
        </Button>
      </div>

      {/* Modals */}
      {CreateComponent && (
        <CreateComponent
          open={create}
          onCancel={() => setCreate(false)}
          onFinish={() => {
            getReport.run({
              ...form,
              report_plan_id: form.plan?.report_plan_id,
              is_first: form.isFirst,
              year: form.year,
              month: form.month,
            });
            setCreate(false);
          }}
        />
      )}
    </>
  );
};
