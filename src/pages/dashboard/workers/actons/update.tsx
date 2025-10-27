import { ProFormInstance, ProFormText } from "@ant-design/pro-form";
import { IModalForm } from "components/modal";
import dayjs from "dayjs";
import { useEffect, useRef } from "react";
import { ActionComponentProps } from "types";
import { WorkerList } from "service/workers/type";
import { Info } from "./parts/info";
import workers from "service/workers";
import file from "service/file";
import { useRequest } from "ahooks";
import { notification } from "antd";

export const UpdateService = ({
  onCancel,
  onFinish,
  open,
  detail,
}: ActionComponentProps<WorkerList>) => {
  const formRef = useRef<ProFormInstance>();

  useEffect(() => {
    if (open) {
      formRef.current?.setFieldsValue({
        ...detail,
        family_name: detail?.family_name ?? undefined,
        first_name: detail?.first_name ?? undefined,
        last_name: detail?.last_name,
        rd: detail?.rd,
        birth_date: detail?.birth_date ?? undefined,
        gender: detail?.gender ?? undefined,
        email: detail?.email ?? undefined,
        phone: detail?.phone,
        is_disability: detail?.is_disability,
        position: detail?.position,
        total_worked_year: detail?.total_worked_year,
        worker_year: detail?.worker_year,
        salary: detail?.salary,
        role_id: detail?.role_id,
        profile_id: [
          {
            url: file.fileToUrl(detail?.profile?.physical_path as string),
            id: detail?.profile?.id as any,
            name: detail?.profile?.original_name,
            size: detail?.profile?.file_size,
            uid: `${detail?.profile?.id}`,
            type: detail?.profile?.extention,
          },
        ],
      });
    }
  }, [open]);

  const upload = useRequest(file.upload, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });
  return (
    <IModalForm
      open={open}
      title="Засах"
      formRef={formRef}
      cancelText={"Буцах"}
      width={1000}
      okText={"Хадгалах"}
      modalProps={{ maskClosable: false, onCancel }}
      onRequest={async (values) => {
        if (values?.profile_id[0]?.uid.includes("rc-upload")) {
          if (values.profile_id && values.profile_id.length > 0) {
            values.profile_id = await upload
              .runAsync({
                file: values.profile_id[0].originFileObj,
              })
              .then((el: any) => el.map((el: any) => el.id));
          }
          if (
            await workers.updateWorkers(
              {
                ...values,
                profile_id: values.profile_id[0],
                birth_date: dayjs(values?.birth_date).toDate(),
              },
              detail?.id || 0
            )
          ) {
            return true;
          }
        } else {
          if (
            await workers.updateWorkers(
              {
                ...values,
                profile_id: detail?.profile_id,
                birth_date: dayjs(values?.birth_date).toDate(),
              },
              detail?.id || 0
            )
          ) {
            return true;
          }
        }
      }}
      onSuccess={onFinish}
    >
      <Info />
    </IModalForm>
  );
};
