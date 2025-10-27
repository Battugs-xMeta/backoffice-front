import { CloseOutlined } from "@ant-design/icons";
import {
  ModalForm,
  ModalFormProps,
  ProFormInstance,
} from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Button, Typography, notification } from "antd";
import { useRef } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";

type Props = ModalFormProps & {
  onRequest?: (body?: any) => Promise<any>;
  onSuccess?: () => void;
  children?: React.ReactNode;
  title?: React.ReactNode;
  footer?: React.ReactNode;
  cancelText?: string;
  okText?: string;
  width?: number;
  customSubmitter?: React.ReactNode;
};

export const IModalForm = ({
  onRequest,
  onSuccess: onDone,
  title,
  footer,
  cancelText,
  width,
  okText,
  customSubmitter,
  ...rest
}: Props) => {
  const submit = useRequest(async (values) => onRequest && onRequest(values), {
    manual: true,
    onSuccess: () => {
      onDone && onDone();
      notification.success({
        message: "Амжилттай",
      });
    },
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  return (
    <ModalForm
      {...rest}
      onFinishFailed={(err) => {
        notification.info({ message: "Талбарын утга дутуу байна." });
      }}
      width={width}
      scrollToFirstError={{
        behavior: "smooth",
        block: "center",
        inline: "center",
      }}
      children={<div className="">{rest.children}</div>}
      title={
        <>
          <div className="flex items-center justify-between">
            <div className="text-base text-gray-800 font-semibold">{title}</div>
            <Button
              type="link"
              onClick={() =>
                rest.modalProps?.onCancel &&
                rest.modalProps.onCancel(null as any)
              }
              icon={
                <CloseOutlined
                  className="text-gray-500"
                  size={12}
                  rev={undefined}
                />
              }
            />
          </div>
          <div className="h-px bg-[#EAECF0] my-2"></div>
        </>
      }
      layout="vertical"
      labelAlign="left"
      modalProps={{
        maskClosable: false,
        ...rest.modalProps,
        closable: false,
        className: `${rest.className} rounded`,
      }}
      submitter={{
        render: ({ submit: onSubmit }) => {
          return (
            (rest.submitter || rest.submitter === undefined) && (
              <>
                <div className="h-px bg-[#EAECF0] my-2"></div>
                <div className="flex justify-between w-full rounded-xl">
                  <Button
                    size="large"
                    className="w-1/2 text-sm  items-center"
                    icon={<FaArrowLeft size={12} />}
                    onClick={() =>
                      rest.modalProps?.onCancel &&
                      rest.modalProps?.onCancel(null as any)
                    }
                  >
                    {cancelText}
                  </Button>
                  <Button
                    size="large"
                    className="w-1/2 text-sm flex items-center gap-2 justify-center"
                    type="primary"
                    onClick={onSubmit}
                    loading={submit.loading}
                  >
                    <IoMdAddCircleOutline size={18} />
                    <p>{okText}</p>
                  </Button>
                  {/* <Button
                  {...rest}
                  className={`flex items-center   font-medium gap-1 ${rest.className}`}
                  icon={<IoAddCircleOutline size={20} />}
                  type="primary"
                >
                  {addButtonName || "Нэмэх"}
                </Button> */}
                </div>
              </>
            )
          );
        },
      }}
      onFinish={async (values) => {
        if (await submit.runAsync(values)) {
          return true;
        }
        return false;
      }}
    />
  );
};

type PropsRemove = ModalFormProps & {
  onRequest?: (id: number, body: any) => Promise<any>;
  onDone?: () => void;
  display: React.ReactNode;
  uniqueKey?: number;
  onCancel: () => void;
  body?: any;
  title?: string;
  remove?: boolean;
  cancelTitle?: string;
  customTitle?: string;
};

export const RemoveModal = ({
  onCancel,
  open,
  onRequest,
  onDone,
  display,
  uniqueKey,
  title,
  body,
  remove,
  cancelTitle,
  customTitle,
  ...rest
}: PropsRemove) => {
  const formRef = useRef<ProFormInstance>();
  const submit = useRequest(
    async () => onRequest && onRequest(uniqueKey ?? 0, body),
    {
      manual: true,
      onSuccess: () => {
        onDone && onDone();
        notification.success({
          message: "Амжилттай устгалаа",
        });
      },
      onError: (err) =>
        notification.error({
          message: err.message,
        }),
    }
  );
  return (
    <ModalForm
      {...rest}
      modalProps={{
        maskClosable: false,
        onCancel,
        className: "max-w-lg custom-ant-modal-footer-remove rounded",
      }}
      className="p-5"
      width={400}
      onOpenChange={() => formRef.current?.resetFields()}
      formRef={formRef}
      open={open}
      submitter={{
        render: ({ submit }) => {
          return (
            <div className="flex  justify-between  w-full px-6  pb-6 rounded-xl">
              <Button
                size="large"
                className="w-1/2 text-sm"
                onClick={() => onCancel && onCancel()}
              >
                Буцах
              </Button>
              <Button
                size="large"
                className="w-1/2  bg-error-600 text-sm"
                type="primary"
                onClick={submit}
              >
                {remove ? "Устгах" : "Deactivate"}
              </Button>
            </div>
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
      {/* <img src="/icons/delete.png" width={48} height={48} className="mb-4" /> */}
      {/* <div className=" text-lg font-semibold text-gray-900  mb-2">
        {display}
      </div> */}
      <Typography.Text className="text-gray-500">
        Та {display}-ийг устгах гэж байна.
      </Typography.Text>
    </ModalForm>
  );
};
