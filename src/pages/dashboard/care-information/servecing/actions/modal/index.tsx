import {
  ModalForm,
  ModalFormProps,
  ProFormInstance,
} from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Button, notification } from "antd";
import { UploadFile } from "antd/lib";
import dayjs from "dayjs";
import { useRef } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";
import { ElderlyList } from "service/care-information/types";
import file from "service/file";
import transictions from "service/transictions";
import { Info } from "./parts/info";

type PropsCancel = ModalFormProps & {
  onCancel: () => void;
  data?: ElderlyList;
  onFinish?: () => void;
};
export const TransictionAction = ({
  onCancel,
  data,
  onFinish,
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
  const CreateTransictions = useRequest(transictions.CreateTransictions, {
    onSuccess: () => {
      notification.success({
        message: "Амжилттай",
      });
      onFinish && onFinish();
    },
    manual: true,
    onError: (err) => {
      notification.error({
        message: err.message,
      });
      onFinish && onFinish();
    },
  });

  return (
    <ModalForm
      {...rest}
      modalProps={{ maskClosable: false, onCancel, className: "rounded " }}
      labelAlign="left"
      layout="vertical"
      width={1000}
      title="Шилжилт хөдөлгөөн бүртгэх"
      onOpenChange={() => formRef.current?.resetFields()}
      formRef={formRef}
      initialValues={{
        elderly_id: `${data?.elderly?.last_name.substring(0, 1)}. ${
          data?.elderly?.first_name
        }`,
      }}
      open={!!data}
      submitter={{
        render: ({ submit: CreateTransictions }) => {
          return (
            <div className="flex justify-between w-full rounded-xl">
              <Button
                size="large"
                className="w-1/2 text-sm  items-center"
                icon={<FaArrowLeft size={12} />}
                onClick={() => onCancel && onCancel()}
              >
                Буцах
              </Button>
              <Button
                size="large"
                className="w-1/2 text-sm flex items-center gap-2 justify-center"
                type="primary"
                onClick={CreateTransictions}
              >
                <IoMdAddCircleOutline size={18} />
                Хадгалах
              </Button>
            </div>
          );
        },
      }}
      onFinish={async (values) => {
        if (!!data && !!values) {
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
              elderly_id: data?.elderly?.id,
            })
          ) {
            return true;
          }
        }
      }}
    >
      <div className="bg-white rounded my-3">
        {data && <Info data={data} formRef={formRef} />}
      </div>
    </ModalForm>
  );
};
