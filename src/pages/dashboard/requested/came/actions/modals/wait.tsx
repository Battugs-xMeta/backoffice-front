import {
  ModalForm,
  ModalFormProps,
  ProFormInstance,
  ProFormTextArea,
} from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Button, notification } from "antd";
import { SectionContainer } from "components/index";
import { useRef, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";
import requested from "service/requested";
import { RequestItem } from "service/requested/types";

type PropsWait = ModalFormProps & {
  onCancel: () => void;
  data?: RequestItem;
  onFinish?: () => void;
};

export const WaitModal = ({ onCancel, data, onFinish, ...rest }: PropsWait) => {
  const formRef = useRef<ProFormInstance>();
  const [descCount, setDescCount] = useState<number>(0);
  const waitRequest = useRequest(requested.waitRequest, {
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
                className="w-1/2  bg-[#F79009] text-sm flex items-center justify-center"
                type="primary"
                onClick={waitRequest}
              >
                <MdAccessTime color="#fff" size={18} className="mx-2" />
                Хүлээлэгт оруулах
              </Button>
            </div>
          );
        },
      }}
      onFinish={async () => {
        if (!!data && (await waitRequest.runAsync(data.id, { status: 4 }))) {
          return true;
        }
        return false;
      }}
    >
      <SectionContainer label="Үйлчлүүлэгчийг хүлээлэгт оруулах">
        <ProFormTextArea
          fieldProps={{
            onChange: (e) => setDescCount(e.target.value.length),
          }}
          name="description"
          placeholder="Тайлбар оруулах"
          extra={`${
            descCount <= 275
              ? 275 - descCount + " тэмдэгт үлдсэн"
              : "275 тэмдэгтээс давсан байна."
          } `}
        />
      </SectionContainer>
    </ModalForm>
  );
};
