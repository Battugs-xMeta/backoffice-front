import { ProFormInstance } from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { notification } from "antd";
import { IModalForm } from "components/modal";
import moment from "moment";
import { useEffect, useRef } from "react";
import file from "service/file";
import finance from "service/finance";
import { NormativeDetailList } from "service/finance/type";
import { ActionComponentProps, AntdFile } from "types";
import { Info } from "./parts/info";

export const UpdateService = ({
  onCancel,
  onFinish,
  open,
  detail,
}: ActionComponentProps<NormativeDetailList>) => {
  const formRef = useRef<ProFormInstance>();

  const UpdateDetailNor = useRequest(finance.updateNorDetail, {
    manual: true,
  });

  useEffect(() => {
    if (open) {
      formRef.current?.setFieldsValue({
        ...detail,
        amount: detail?.amount ?? undefined,
        date: detail?.date ?? undefined,
        description: detail?.description,
        normative_type_id: detail?.normative_type,
        order_files: detail?.order_files?.reduce<AntdFile[]>((acc, record) => {
          acc.push({
            uid: record?.id.toString(),
            name: record?.original_name,
            fileName: record?.original_name,
            status: "done",
            url: `${import.meta.env.VITE_FILE_GET_URL}${record.physical_path}`,
            response: "done",
            size: record.file_size,
          });
          return acc;
        }, []),
        contract_files: detail?.contract_files?.reduce<AntdFile[]>(
          (acc, record) => {
            acc.push({
              uid: record?.id.toString(),
              name: record.original_name,
              fileName: record.original_name,
              status: "done",
              url: `${import.meta.env.VITE_FILE_GET_URL}${
                record.physical_path
              }`,
              response: "done",
              size: record.file_size,
            });
            return acc;
          },
          []
        ),
        meeting_note_files: detail?.meeting_note_files?.reduce<AntdFile[]>(
          (acc, record) => {
            acc.push({
              uid: record?.id.toString(),
              name: record.original_name,
              fileName: record.original_name,
              status: "done",
              url: `${import.meta.env.VITE_FILE_GET_URL}${
                record.physical_path
              }`,
              response: "done",
              size: record.file_size,
            });
            return acc;
          },
          []
        ),
        advice_files: detail?.advice_files?.reduce<AntdFile[]>(
          (acc, record) => {
            acc.push({
              uid: record?.id.toString(),
              name: record.original_name,
              fileName: record.original_name,
              status: "done",
              url: `${import.meta.env.VITE_FILE_GET_URL}${
                record.physical_path
              }`,
              response: "done",
              size: record.file_size,
            });
            return acc;
          },
          []
        ),
      });
    }
  }, [open]);

  const uploadMulti = useRequest(file.uploads, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  const newFileUploads = async (files: any[]) => {
    const oldFileIDs: number[] = [];
    files.map((file) => {
      if (!file?.uid.includes("rc-upload")) {
        oldFileIDs.push(parseInt(file.uid));
      }
    });

    const ids = await uploadMulti
      .runAsync({
        names: files?.reduce<string[]>((acc, record) => {
          if (record?.uid.includes("rc-upload")) {
            acc.push(record.fileName || "");
            return acc;
          }
          return acc;
        }, []),
        files: files?.reduce<string[]>((acc, record) => {
          if (record?.uid.includes("rc-upload")) {
            acc.push(record);
            return acc;
          }
          return acc;
        }, []),
      })
      .then((el: any) => el.map((el: any) => el.id));

    return oldFileIDs.concat(ids);
  };

  return (
    <IModalForm
      open={open}
      title="Засах"
      formRef={formRef}
      cancelText={"Буцах"}
      width={800}
      okText={"Засах"}
      modalProps={{ maskClosable: false, onCancel }}
      initialValues={{}}
      onRequest={async (values) => {
        if (!!values) {
          if (values.order_files) {
            values.order_files = await newFileUploads(values.order_files);
          }
          if (values.contract_files) {
            values.contract_files = await newFileUploads(values.contract_files);
          }
          if (values.meeting_note_files) {
            values.meeting_note_files = await newFileUploads(
              values.meeting_note_files
            );
          }
          if (values.advice_files) {
            values.advice_files = await newFileUploads(values.advice_files);
          }
          if (
            await UpdateDetailNor.runAsync(
              {
                ...values,
              },
              detail?.id
            )
          ) {
            return true;
          }
        }
      }}
      onSuccess={onFinish}
    >
      <Info amountProps={detail?.amount} disabledOne={true} />
    </IModalForm>
  );
};
