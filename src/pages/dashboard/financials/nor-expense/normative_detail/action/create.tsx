import { ProFormInstance } from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { notification } from "antd";
import { UploadFile } from "antd/lib";
import { IModalForm } from "components/modal";
import { useRef } from "react";
import file from "service/file";
import finance from "service/finance";
import { NormativeDetailList } from "service/finance/type";
import { ActionComponentProps } from "types";
import { Info } from "./parts/info";

export const CreateService = ({
  ...rest
}: ActionComponentProps<NormativeDetailList>) => {
  const formRef = useRef<ProFormInstance>();

  const CreateDetailNor = useRequest(finance.CreateNorDetail, {
    manual: true,
  });

  const uploadMulti = useRequest(file.uploads, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  return (
    <IModalForm
      open={rest.open}
      modalProps={{ maskClosable: false, onCancel: rest.onCancel }}
      formRef={formRef}
      title="Зарцуулалт бүртгэх"
      width={800}
      scrollToFirstError={true}
      onOpenChange={() => formRef.current?.resetFields()}
      cancelText={"Буцах"}
      okText={"Нэмэх"}
      className="px-1"
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
      onSuccess={rest.onFinish}
    >
      <div className="bg-white rounded my-3">
        <Info formRef={formRef} />
      </div>
    </IModalForm>
  );
};
