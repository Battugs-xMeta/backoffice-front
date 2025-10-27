import { ModalForm } from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Button, Flex, notification } from "antd";
import { FaArrowLeft } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { ActionComponentProps, SuccessResponse } from "types";

type Props<T> = ActionComponentProps<T> & {
  api?: () => Promise<any>;
  title?: string;
  description?: string;
};

export const ConfirmModal = <T,>({
  open,
  onCancel,
  onFinish,
  api,
  title,
  description,
}: Props<T>) => {
  const submit = useRequest(
    () => {
      const res = api?.();
      return new Promise((resolve) => setTimeout(() => resolve(res), 3000));
    },
    {
      manual: true,
      onSuccess: () => {
        notification.success({ message: "Амжилттай" });
        onFinish?.();
      },
      onError: (err) => notification.error({ message: err.message }),
    }
  );

  return (
    <ModalForm
      open={open}
      title={title ?? "Баталгаажуулах"}
      modalProps={{ maskClosable: false, onCancel }}
      width={500}
      submitter={{
        render: ({ submit: submitForm }) => {
          return (
            <Flex align="center" justify="space-between" className="w-full">
              <Button
                size="large"
                className="w-1/2 text-sm  items-center"
                onClick={() => onCancel?.()}
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
                className="w-1/2 text-sm flex items-center justify-center"
                type="primary"
                onClick={submitForm}
                loading={submit.loading}
              >
                <IoMdCheckmarkCircleOutline
                  color="#fff"
                  size={18}
                  className="mx-2"
                />
                Батлах
              </Button>
            </Flex>
          );
        },
      }}
      onFinish={async () => {
        if (await submit.runAsync()) {
          return true;
        }
        return false;
      }}
    >
      <div className="text-gray-700 font-medium text-sm">
        <div>{description}</div>
        <div>Энэ үйлдлийг буцаах боломжгүй.</div>
      </div>
    </ModalForm>
  );
};
