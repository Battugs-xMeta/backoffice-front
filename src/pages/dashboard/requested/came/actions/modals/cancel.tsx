import {
  ModalForm,
  ModalFormProps,
  ProFormInstance,
  ProFormTextArea,
} from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Button, notification } from "antd";
import { SectionContainer } from "components/index";
import { useRef } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import requested from "service/requested";
import { RequestItem } from "service/requested/types";

type PropsCancel = ModalFormProps & {
  onCancel: () => void;
  data?: RequestItem;
  onFinish?: () => void;
};

export const CancelModal = ({
  onCancel,
  data,
  onFinish,
  ...rest
}: PropsCancel) => {
  const formRef = useRef<ProFormInstance>();

  const cancelRequest = useRequest(requested.cancelRequest, {
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
                onClick={() => onCancel && onCancel()}
              >
                <FaArrowLeft
                  accentHeight={11.67}
                  color="#344054"
                  size={12}
                  className="mx-2"
                />
                Буцах
              </Button>
              <Button
                size="large"
                className="w-1/2  bg-error-400 text-sm flex items-center justify-center"
                type="primary"
                onClick={cancelRequest}
              >
                <IoMdClose
                  accentHeight={11.67}
                  color="#fff"
                  size={13}
                  className="mx-2"
                />
                Цуцлах
              </Button>
            </div>
          );
        },
      }}
      onFinish={async (values) => {
        if (
          !!data &&
          (await cancelRequest.runAsync(data.id, { ...values, status: 7 }))
        ) {
          return true;
        }
        return false;
      }}
    >
      <SectionContainer label="Цуцлах шалтгаан">
        <ProFormTextArea
          name="description"
          placeholder="Шалтгаан дэлгэрэнгүй"
          label={"Цуцалсан мэдээллийг шалтгааны хамт нэгдсэн санруу явуулна."}
        />
      </SectionContainer>
    </ModalForm>
  );
};
