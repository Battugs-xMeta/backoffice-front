import { ProFormInstance } from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { notification } from "antd";
import { UploadFile } from "antd/lib";
import { IModalForm } from "components/modal";
import moment from "moment";
import { useRef } from "react";
import file from "service/file";
import transictions from "service/transictions";
import { TransictiontypeList } from "service/transictions/types";
import { ActionComponentProps } from "types";
import { Info } from "./parts/info";
import dayjs from "dayjs";

export const CreateService = ({
  ...rest
}: ActionComponentProps<TransictiontypeList>) => {
  const formRef = useRef<ProFormInstance>();
  const uploadMulti = useRequest(file.uploads, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  const CreateTransictions = useRequest(transictions.CreateTransictions, {
    onSuccess: () => {
      notification.success({
        message: "Амжилттай",
      });
    },
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
      modalProps={{ maskClosable: false, onCancel: rest.onCancel }}
      formRef={formRef}
      title="Шилжилт хөдөлгөөн бүртгэх"
      width={1000}
      scrollToFirstError={true}
      onOpenChange={() => formRef.current?.resetFields()}
      cancelText={"Буцах"}
      okText={"Хадгалах"}
      className="px-1"
      onRequest={async (values) => {
        if (!!values) {
          if (values.protocols && values.protocols.length > 0) {
            values.protocols = await uploadMulti
              .runAsync({
                names: values.protocols?.map((el: UploadFile) => el?.name),
                files: values.protocols,
              })
              .then((el: any) => el.map((el: any) => el.id));
          }
          if (values.death_certificate && values.death_certificate.length > 0) {
            values.death_certificate = await uploadMulti
              .runAsync({
                names: values.death_certificate?.map(
                  (el: UploadFile) => el?.name
                ),
                files: values.death_certificate,
              })
              .then((el: any) => el.map((el: any) => el.id));
          }
          if (
            values.forensic_definition &&
            values.forensic_definition.length > 0
          ) {
            values.forensic_definition = await uploadMulti
              .runAsync({
                names: values.forensic_definition?.map(
                  (el: UploadFile) => el?.name
                ),
                files: values.forensic_definition,
              })
              .then((el: any) => el.map((el: any) => el.id));
          }
          if (
            await CreateTransictions.runAsync({
              ...values,
              protocols: values.protocols,
              forensic_definition: values.forensic_definition,
              death_certificate: values.death_certificate,
              out_date: dayjs(values.out_date).toDate(),
              death_date: dayjs(values.death_date).toDate(),
              // death_date: dayjs(values.out_date).format("YYYY-MM-DD"),
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
