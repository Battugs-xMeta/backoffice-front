import { DownloadOutlined, SendOutlined } from "@ant-design/icons";
import { useRequest } from "ahooks";
import { Button, Flex, notification } from "antd";
import { RenderReportStatus } from "components/report-status";
import { useAtom } from "jotai";
import { reportDetailForm } from "../../store";
import file from "service/file";
import reportDetail from "service/report-detail";
import { REPORT_STATUS } from "service/report/types";
import { useState } from "react";
import { ConfirmModal } from "components/modal/confirm";

export const HeaderAction = () => {
  const [form, setForm] = useAtom(reportDetailForm);
  const [confirm, setConfirm] = useState(false);

  const getReport = useRequest(reportDetail.getPlan, {
    manual: true,
    onSuccess: (data) => {
      setForm({ ...form, plan: data });
    },
  });

  return (
    <>
      <Flex
        align="center"
        gap={16}
        wrap="wrap"
        className=" justify-between w-full 2xl:justify-normal 2xl:w-fit"
      >
        <div className="flex items-center gap-2 text-sm">
          <span className="text-[#344054]   font-medium">Төлөв : </span>{" "}
          <RenderReportStatus status={form.plan?.status} />
        </div>
        <Flex align="center" wrap="wrap" gap={16}>
          <a
            href={file.fileToUrl(
              form.plan?.report_plan?.document?.physical_path || ""
            )}
            target="_blank"
          >
            <Button size="large" icon={<DownloadOutlined rev={undefined} />}>
              <span className="text-[#344054] font-semibold text-sm">
                Маягт татах
              </span>
            </Button>
          </a>
          <Button
            type="primary"
            size="large"
            disabled={
              form.plan?.status !== REPORT_STATUS.SAVED &&
              form.plan?.status !== REPORT_STATUS.RETURNED &&
              form.plan?.status !== REPORT_STATUS.AVAILABLE
            }
            onClick={() => setConfirm(true)}
          >
            <span>Тайлан илгээх</span>
            <SendOutlined rev={undefined} />
          </Button>
        </Flex>
      </Flex>

      <ConfirmModal
        open={confirm}
        description="Тайлан илгээхдээ та итгэлтэй байна уу?"
        onCancel={() => setConfirm(false)}
        onFinish={() => {
          getReport.run({
            ...form,
            report_plan_id: form.plan?.report_plan_id,
            is_first: form.isFirst,
            year: form.year,
            month: form.month,
          });
          setConfirm(false);
        }}
        api={async () =>
          await reportDetail.send({
            ...form,
            report_plan_id: form.plan?.report_plan_id,
            is_first: form.isFirst,
          })
        }
      />
    </>
  );
};
