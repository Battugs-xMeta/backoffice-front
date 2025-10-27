import { ProFormInstance } from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Avatar, notification } from "antd";
import { IModalForm } from "components/modal";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { ActionComponentProps } from "types";
import { TrainingList } from "service/training/type";
import training from "service/training";
import workers from "service/workers";
import fileService from "service/file";
import { Info } from "./parts/info";
import { debounce } from "lodash";
import file from "service/file";

export const CreateService = ({
  ...rest
}: ActionComponentProps<TrainingList>) => {
  const formRef = useRef<ProFormInstance>();

  const createRequest = useRequest(training.create, {
    manual: true,
  });

  const getWorkers = useRequest(workers.getWorkers, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

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

  useEffect(() => {
    getWorkers.run({ current: 1, pageSize: 20 });
  }, [rest.open]);

  const debouncedSearch = debounce((value) => {
    getWorkers.run({
      current: 1,
      pageSize: 20,
      query: value,
    });
  }, 1000);

  const upload = useRequest(fileService.upload, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  return (
    <IModalForm
      open={rest.open}
      title="Сургалтын мэдээлэл"
      formRef={formRef}
      onOpenChange={() => {
        formRef.current?.resetFields();
      }}
      width={700}
      scrollToFirstError={true}
      modalProps={{ maskClosable: false, onCancel: rest.onCancel }}
      cancelText={"Буцах"}
      okText={"Нэмэх"}
      onRequest={async (values) => {
        if (!!values) {
          if (values.certificate_id && !values.certificate_id[0]?.isBefore) {
            const uploadedFile = await upload.runAsync({
              file: values.certificate_id[0].originFileObj,
            });
            values.certificate_id = uploadedFile?.[0]?.id;
          }
        }
        if (
          await createRequest.runAsync({
            ...values,
            certificate_id: values.certificate_id,
            is_certificate: values.is_certificate ? true : false,
            start_date: dayjs(values.start_date).toDate(),
            end_date: dayjs(values.end_date).toDate(),
          })
        ) {
          return true;
        }
      }}
      onSuccess={rest.onFinish}
    >
      <Info
        loading={getWorkers.loading}
        data={data || []}
        debouncedSearch={debouncedSearch}
        formRef={formRef}
      />
    </IModalForm>
  );
};
