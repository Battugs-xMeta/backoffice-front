import { ProFormInstance } from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Flex, message } from "antd";
import { UploadButton } from "components/index";
import { IModalForm } from "components/modal";
import { useAtom } from "jotai";
import { useEffect, useRef } from "react";
import file from "service/file";
import reportDetail from "service/report-detail";
import { ReportPlanOtherInterface } from "service/report-detail/type";
import { ActionComponentProps } from "types";
import { convertFileToUploadFile } from "utils/index";
import { reportDetailForm } from "../store";

export const Update = ({
  open,
  onCancel,
  onFinish,
  detail,
}: ActionComponentProps<ReportPlanOtherInterface>) => {
  const [form] = useAtom(reportDetailForm);
  const formRef = useRef<ProFormInstance>();
  const upload = useRequest(file.upload, {
    manual: true,
    onError: (err) => message.error(err.message),
  });

  useEffect(() => {
    formRef.current?.resetFields();
    if (detail) {
      formRef.current?.setFieldsValue({
        ...detail,
        pdf_file: detail.report_pdf
          ? convertFileToUploadFile(detail.report_pdf.physical_path)
          : [],
        excel_file: detail.report_excel
          ? convertFileToUploadFile(detail.report_excel.physical_path)
          : [],
      });
    }
  }, [open]);

  return (
    <IModalForm
      open={open}
      modalProps={{ maskClosable: false, onCancel }}
      okText="Хадгалах"
      formRef={formRef}
      title={form.plan?.report_plan?.name}
      onSuccess={() => {
        onFinish?.();
        return;
      }}
      onRequest={async (values) => {
        if (values.excel_file?.length > 0 && !values.excel_file[0].isBefore) {
          const uploadedFile = await upload.runAsync({
            file: values.excel_file[0].originFileObj,
          });
          values.excel_file_id = uploadedFile?.[0]?.id;
        }

        if (values.pdf_file?.length > 0 && !values.pdf_file[0].isBefore) {
          const uploadedFile = await upload.runAsync({
            file: values.pdf_file[0].originFileObj,
          });
          values.pdf_file_id = uploadedFile?.[0]?.id;
        }
        values.report_id = form?.plan?.report_plan_id || 0;
        values.is_first = form.isFirst;
        return await reportDetail.update({
          excel_file_id: detail?.report_excel_id,
          pdf_file_id: detail?.report_pdf_id,
          ...values,
        });
      }}
    >
      <Flex align="start" gap={24} wrap={"wrap"} className=" my-[32px] ">
        <UploadButton
          name={"pdf_file"}
          wrapperClassName="w-1/2"
          label="Хавсралт файл(PDF файл заавал хавсаргана уу)"
          max={1}
          accept=".pdf"
          required
          rules={[
            {
              required: true,
              validator: (_, value) => {
                if (
                  value &&
                  value?.[0]?.originFileObj?.type !== "application/pdf"
                ) {
                  return Promise.reject("Файл PDF файл байх ёстой");
                }
                return Promise.resolve(value);
              },
            },
          ]}
        />
        <UploadButton
          name={"excel_file"}
          wrapperClassName="w-1/2"
          label="Хавсралт файл(Excel файл заавал хавсаргана уу)"
          max={1}
          required
          rules={[
            {
              required: true,
              validator: (_, value) => {
                if (
                  value &&
                  value?.[0]?.originFileObj.type !==
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                ) {
                  return Promise.reject("Файл Excel файл байх ёстой");
                }
                return Promise.resolve(value);
              },
            },
          ]}
        />
      </Flex>
    </IModalForm>
  );
};
