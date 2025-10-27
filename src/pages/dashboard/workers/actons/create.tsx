import { ProFormInstance } from "@ant-design/pro-form";
import { IModalForm } from "components/modal";
import { useRef } from "react";
import { ActionComponentProps } from "types";
import { Info } from "./parts/info";
import workers from "service/workers";
import dayjs from "dayjs";
import { WorkerList } from "service/workers/type";
import { useRequest } from "ahooks";
import file from "service/file";
import { notification } from "antd";

export const CreateService = ({
  ...rest
}: ActionComponentProps<WorkerList>) => {
  const formRef = useRef<ProFormInstance>();

  const upload = useRequest(file.upload, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  const createEmployee = useRequest(workers.createWorkers, {
    manual: true,
    onError: (err) => {
      notification.error({
        message: err.message,
      });
    },
  });

  return (
    <IModalForm
      open={rest.open}
      title="Ажилтан нэмэх"
      formRef={formRef}
      onOpenChange={() => {
        formRef.current?.resetFields();
      }}
      width={1000}
      scrollToFirstError={true}
      modalProps={{ maskClosable: false, onCancel: rest.onCancel }}
      cancelText={"Буцах"}
      okText={"Хадгалах"}
      className="px-3"
      onRequest={async (values) => {
        if (!!values) {
          if (values.profile_id && values.profile_id.length > 0) {
            values.profile_id = await upload
              .runAsync({
                file: values.profile_id[0].originFileObj,
              })
              .then((el: any) => el.map((el: any) => el.id));
          }
          if (
            await createEmployee.runAsync({
              ...values,
              profile_id: values.profile_id[0],
              birth_date: dayjs(values.birth_date).toDate(),
            })
          ) {
            return true;
          }
        }
      }}
      onSuccess={rest.onFinish}
    >
      <Info />
    </IModalForm>
  );
};
