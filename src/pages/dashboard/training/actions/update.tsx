import { ProFormInstance, ProFormItem } from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Avatar, notification } from "antd";
import { IModalForm } from "components/modal";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import fileService from "service/file";
import { ActionComponentProps } from "types";
import workers from "service/workers";
import { Info } from "./parts/info";
import training from "service/training";
import file from "service/file";
import { debounce } from "lodash";

export const UpdateService = ({
  onCancel,
  onFinish,
  open,
  detail,
}: ActionComponentProps<any>) => {
  const formRef = useRef<ProFormInstance>();

  const getWorkers = useRequest(workers.getWorkers, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  useEffect(() => {
    if (open) {
      formRef.current?.setFieldsValue({
        is_certificate: detail?.is_certificate,
        start_date: detail?.start_date,
        end_date: detail?.end_date ?? [],
        name: detail?.name,
        employee_id: detail.employee_id,
        certificate_id: detail.is_certificate
          ? [
              {
                url: file.fileToUrl(
                  detail?.certificate?.physical_path as string
                ),
                id: detail?.certificate?.id as any,
                name: detail?.certificate?.original_name,
                size: detail?.certificate?.file_size,
                uid: `${detail?.certificate?.id}`,
                type: detail?.certificate?.extention,
              },
            ]
          : undefined,
      });
    }
  }, [open]);

  useEffect(() => {
    getWorkers.run({ current: 1, pageSize: 20 });
  }, [open]);

  const upload = useRequest(fileService.upload, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  const newFileUpload = async (files: any[]) => {
    if (!files[0]?.uid.includes("rc-upload")) {
      return parseInt(files[0]?.uid);
    }
    const file = await upload.runAsync({
      file: files[0].originFileObj,
    });
    return file[0].id;
  };

  const data = getWorkers.data?.items.map((el) => {
    return {
      label: (
        <div className="flex gap-2 items-center">
          <Avatar
            shape="circle"
            size={"small"}
            src={file.fileToUrl(el?.profile?.physical_path || "AS")}
          />
          <span>{`${el?.last_name?.substring(0, 1)}. ${el?.first_name}`}</span>
        </div>
      ),
      value: el.id,
    };
  });

  const debouncedSearch = debounce((value) => {
    getWorkers.run({
      current: 1,
      pageSize: 20,
      query: value,
    });
  }, 1000);

  return (
    <IModalForm
      open={open}
      title="Засах"
      formRef={formRef}
      onOpenChange={() => {
        formRef.current?.resetFields();
      }}
      modalProps={{ maskClosable: false, onCancel }}
      width={700}
      scrollToFirstError={true}
      cancelText={"Буцах"}
      okText={"Засах"}
      onRequest={async (values) => {
        if (values.certificate_id) {
          const fileId = await newFileUpload(values.certificate_id);
          return training.updateTraining(
            {
              ...values,
              is_certificate: values.is_certificate ? true : false,
              certificate_id: fileId,
              start_date: dayjs(values.start_date).toDate(),
              end_date: dayjs(values.end_date).toDate(),
            },
            detail?.id || 0
          );
        } else {
          return training.updateTraining(
            {
              ...values,
              is_certificate: false,
              start_date: dayjs(values.start_date).toDate(),
              end_date: dayjs(values.end_date).toDate(),
            },
            detail?.id || 0
          );
        }
      }}
      onSuccess={onFinish}
    >
      <Info
        loading={getWorkers.loading}
        formRef={formRef}
        debouncedSearch={debouncedSearch}
        data={data || []}
      />
    </IModalForm>
  );
};
