import {
  CheckCircleOutlined,
  CloseOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Alert } from "antd";
import { useState } from "react";

type Props = {
  title?: React.ReactNode | string;
  message?: React.ReactNode | string;
  type: "success" | "info" | "warning" | "error";
  showIcon?: boolean;
  closable?: boolean;
};
const TYPE_COLOR = {
  success: {
    container: "bg-success-25 border-success-300",
    icon: <CheckCircleOutlined rev={undefined} className="text-[20px]" />,
    title: "text-success-700",
    message: "text-success-700",
  },
  info: {
    container: "bg-info-25 border-info-300",
    icon: <CheckCircleOutlined rev={undefined} className="text-[20px]" />,
    title: "text-info-700",
    message: "",
  },
  warning: {
    container: "bg-warning-25 border-warning-300",
    icon: <CheckCircleOutlined rev={undefined} className="text-[20px]" />,
    title: "text-warning-700",
    message: "",
  },
  error: {
    container: "bg-error-25 border-error-300",
    icon: <ExclamationCircleOutlined rev={undefined} className="text-[20px]" />,
    title: "text-error-700",
    message: "text-gray-600",
  },
};

export const IAlert = ({
  title,
  message,
  type,
  showIcon = true,
  closable = true,
}: Props) => {
  const [show, setShow] = useState(true);
  const classNames = TYPE_COLOR?.[`${type}`];

  return (
    <Alert
      message={
        <div
          className={` text-sm  flex items-center gap-2 ${classNames.title}`}
        >
          {showIcon && classNames.icon}
          <span className=" font-semibold">{title}</span>
        </div>
      }
      closable={closable}
      closeIcon={
        <CloseOutlined
          className={`text-${type}-500 cursor-pointer hover:text-${type}-700`}
          rev={undefined}
        />
      }
      description={
        <span className={`ml-[28px] ${classNames.message}`}>{message}</span>
      }
      type="success"
      className={classNames.container}
    />
  );
};
