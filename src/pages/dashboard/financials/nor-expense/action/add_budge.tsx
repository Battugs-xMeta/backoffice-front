import {
  FormListActionType,
  ModalFormProps,
  ProFormInstance,
} from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { IModalForm } from "components/modal";
import dayjs from "dayjs";
import { useRef } from "react";
import finance from "service/finance";
import { Info } from "./parts/info";

type PropsCancel = ModalFormProps & {
  onCancel: () => void;
  data?: boolean;
  onFinish?: () => void;
};

export const AddBudget = ({
  onCancel,
  data,
  onFinish,
  ...rest
}: PropsCancel) => {
  const formRef = useRef<ProFormInstance>();
  const actionRef = useRef<FormListActionType<any>>();

  const createAddBudge = useRequest(finance.CreateNorBudget, {
    manual: true,
    onSuccess: () => {
      onFinish && onFinish();
    },

    onError: (err) => {
      onFinish && onFinish();
    },
  });

  return (
    <IModalForm
      {...rest}
      title="Норматив зардлын төсөв бүртгэх"
      modalProps={{ maskClosable: false, onCancel: onCancel }}
      okText="Нэмэх"
      cancelText="Буцах"
      width={550}
      onOpenChange={() => formRef.current?.resetFields()}
      formRef={formRef}
      open={!!data}
      onRequest={async (values) => {
        if (
          !!values &&
          (await createAddBudge.runAsync({
            ...values,
            year: dayjs().year(),
          }))
        ) {
          return true;
        }
        return false;
      }}
    >
      <Info actionRef={actionRef} formRef={formRef} />
    </IModalForm>
  );
};
