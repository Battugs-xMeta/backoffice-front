import {
  FormListActionType,
  ModalFormProps,
  ProFormInstance,
} from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { IModalForm } from "components/modal";
import dayjs from "dayjs";
import { useEffect, useRef } from "react";
import finance from "service/finance";
import { Info } from "./parts/info";
import { PageLoading } from "@ant-design/pro-layout";
import { notification } from "antd";
import { UpdateInfo } from "./parts/update_info";

type PropsCancel = ModalFormProps & {
  onCancel: () => void;
  id?: any;
  data?: number;
  onFinish?: () => void;
};

export const UpdateBudget = ({
  onCancel,
  data,
  onFinish,
  id,
  ...rest
}: PropsCancel) => {
  const formRef = useRef<ProFormInstance>();
  const actionRef = useRef<FormListActionType<any>>();

  const updateAddBudge = useRequest(finance.updateNorBudget, {
    manual: true,
    onSuccess: () => {
      onFinish && onFinish();
    },

    onError: (err) => {
      onFinish && onFinish();
    },
  });

  const getNorBudge = useRequest(finance.getNorBudget, {
    manual: true,
    onError: (err) => {
      notification.error({
        message: err.message,
      }),
        onFinish && onFinish();
    },
  });

  useEffect(() => {
    getNorBudge?.run(data);
  }, [data]);

  useEffect(() => {
    if (!!getNorBudge.data) {
      formRef.current?.setFieldsValue({
        ...getNorBudge.data,
        amount: getNorBudge.data?.budget ?? undefined,
      });
    }
  }, [getNorBudge.data]);

  return (
    <IModalForm
      {...rest}
      title="Норматив зардлын төсөв засварлах"
      modalProps={{ onCancel: onCancel }}
      okText="Нэмэх"
      cancelText="Буцах"
      width={550}
      onOpenChange={() => formRef.current?.resetFields()}
      formRef={formRef}
      open={!!data}
      onRequest={async (values) => {
        if (
          !!values &&
          (await updateAddBudge.runAsync(
            {
              ...values,
              year: dayjs().year(),
            },
            data
          ))
        ) {
          return true;
        }
        return false;
      }}
    >
      {getNorBudge.loading ? (
        <PageLoading />
      ) : (
        <UpdateInfo
          actionRef={actionRef}
          formRef={formRef}
          disabledOne={true}
        />
      )}
    </IModalForm>
  );
};
