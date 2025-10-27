import {
  ModalForm,
  ModalFormProps,
  ProFormInstance,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Button, notification } from "antd";
import { SectionContainer } from "components/index";
import { useRef } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { IoAddCircleOutline } from "react-icons/io5";
import careInformation from "service/care-information";

type PropsCancel = ModalFormProps & {
  onCancel: () => void;
  data?: number;
  onFinish?: () => void;
};

export const AddCondition = ({
  onCancel,
  data,
  onFinish,
  ...rest
}: PropsCancel) => {
  const formRef = useRef<ProFormInstance>();

  const cancelRequest = useRequest(careInformation.createHealthNote, {
    manual: true,
    onSuccess: () => {
      notification.success({
        message: "Амжилттай",
      }),
        onFinish && onFinish();
    },

    onError: (err) => {
      notification.error({
        message: err.message,
      }),
        onFinish && onFinish();
    },
  });

  return (
    <ModalForm
      {...rest}
      modalProps={{ maskClosable: false, onCancel, className: "rounded " }}
      labelAlign="left"
      layout="vertical"
      width={550}
      onOpenChange={() => formRef.current?.resetFields()}
      formRef={formRef}
      open={!!data}
      submitter={{
        render: ({ submit: cancelRequest }) => {
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
                className="w-1/2 text-sm flex items-center justify-center"
                type="primary"
                icon={<IoAddCircleOutline size={20} />}
                onClick={cancelRequest}
              >
                Нэмэх
              </Button>
            </div>
          );
        },
      }}
      onFinish={async (values) => {
        if (
          !!data &&
          (await cancelRequest.runAsync({ ...values, elderly_id: data }))
        ) {
          return true;
        }
        return false;
      }}
    >
      <SectionContainer label="Эрүүл мэндийн түүх нэмэх">
        <ProFormText
          name="service_name"
          placeholder="Үйлчилгээний нэр"
          label={"Үйлчилгээний нэр"}
          rules={[
            {
              required: true,
              message: "Заавал оруулна уу",
            },
          ]}
        />
        <ProFormTextArea
          name="description"
          placeholder="Дэлгэрэнгүй оруулна уу"
          label={"Тайлбар"}
          rules={[
            {
              required: true,
              message: "Тайлбар оруулна уу",
            },
          ]}
        />
      </SectionContainer>
    </ModalForm>
  );
};
