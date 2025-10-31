import { ModalFormProps, ProFormInstance } from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { IModalForm } from "components/modal";
import dayjs from "dayjs";
import { useEffect, useRef } from "react";
import finance from "service/finance";
import {
  NormativeBudgesTypeList,
  NormativeTypeArrayOptions,
} from "service/finance/type";
import { Info } from "../normative_detail/action/parts/info";
import { notification } from "antd";
import file from "service/file";
import { UploadFile } from "antd/lib";

type PropsCancel = ModalFormProps & {
  onCancel: () => void;
  id?: any;
  data?: NormativeBudgesTypeList;
  onFinish?: () => void;
};

export const CreateDetailNormative = ({
  onCancel,
  data,
  onFinish,
  id,
  ...rest
}: PropsCancel) => {
  const formRef = useRef<ProFormInstance>();

  const uploadMulti = useRequest(file.uploads, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  useEffect(() => {
    if (!!data) {
      formRef.current?.setFieldsValue({
        normative_type_id: NormativeTypeArrayOptions.find(
          (el) => el.label === data?.name
        )?.value,
      });
    }
  }, [data]);

  const CreateDetailNor = useRequest(finance.CreateNorDetail, {
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
      title="Зарцуулалт бүртгэх"
      modalProps={{ maskClosable: false, onCancel: onCancel }}
      okText="Нэмэх"
      cancelText="Буцах"
      width={800}
      onOpenChange={() => formRef.current?.resetFields()}
      formRef={formRef}
      open={!!data}
      onRequest={async (values) => {
        if (!!values) {
          if (values.order_files && values.order_files?.length > 0) {
            values.order_files = await uploadMulti
              .runAsync({
                names: values.order_files?.map((el: UploadFile) => el?.name),
                files: values.order_files,
              })
              .then((el: any) => el.map((el: any) => el.id));
          }
          if (
            values.meeting_note_files &&
            values.meeting_note_files?.length > 0
          ) {
            values.meeting_note_files = await uploadMulti
              .runAsync({
                names: values.meeting_note_files?.map(
                  (el: UploadFile) => el?.name
                ),
                files: values.meeting_note_files,
              })
              .then((el: any) => el.map((el: any) => el.id));
          }
          if (values.contract_files && values.contract_files?.length > 0) {
            values.contract_files = await uploadMulti
              .runAsync({
                names: values.contract_files?.map((el: UploadFile) => el?.name),
                files: values.contract_files,
              })
              .then((el: any) => el.map((el: any) => el.id));
          }
          if (values.advice_files && values.advice_files?.length > 0) {
            values.advice_files = await uploadMulti
              .runAsync({
                names: values.advice_files?.map((el: UploadFile) => el?.name),
                files: values.advice_files,
              })
              .then((el: any) => el.map((el: any) => el.id));
          }
          if (
            await CreateDetailNor.runAsync({
              ...values,
              order_files: values.order_files,
              contract_files: values.contract_files,
              meeting_note_files: values.meeting_note_files,
              advice_files: values.advice_files,
            })
          ) {
            return true;
          }
        }
      }}
    >
      <Info disabledOne={true} />
    </IModalForm>
  );
};
