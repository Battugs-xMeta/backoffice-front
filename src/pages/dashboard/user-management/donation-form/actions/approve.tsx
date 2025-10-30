import {
  ModalForm,
  ModalFormProps,
  ProFormInstance,
  ProFormTextArea,
} from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Button, notification } from "antd";
import { useRef } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import finance from "service/finance";
import { CashDonationType } from "service/finance/type";
import requested from "service/requested";

type PropsWait = ModalFormProps & {
  onCancel: () => void;
  data?: CashDonationType;
  onFinish?: () => void;
};

export const ApproveDonation = ({
  onCancel,
  data,
  onFinish,
  ...rest
}: PropsWait) => {
  const formRef = useRef<ProFormInstance>();
  const approveDon = useRequest(finance.approveDonation, {
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
      modalProps={{ maskClosable: false, onCancel, className: "rounded" }}
      width={450}
      onOpenChange={() => formRef.current?.resetFields()}
      formRef={formRef}
      open={!!data}
      title="Баталгаажуулах"
      submitter={{
        render: ({ submit: waitRequest }) => {
          return (
            <div className="flex  justify-between  w-full rounded-xl">
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
                className="w-1/2 text-sm flex items-center justify-center"
                type="primary"
                onClick={waitRequest}
              >
                <IoMdCheckmarkCircleOutline
                  color="#fff"
                  size={18}
                  className="mx-2"
                />
                Батлах
              </Button>
            </div>
          );
        },
      }}
      onFinish={async () => {
        if (!!data && (await approveDon.runAsync(data.id))) {
          return true;
        }
        return false;
      }}
    >
      <p className="m-0 p-0">Хандивын орлогын гүйлгээг баталгаажуулах уу?</p>
      <p className="m-0 p-0">Энэ үйлдлийг буцаах боломжгүй</p>
    </ModalForm>
  );
};
