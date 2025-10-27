import { CheckCircleOutlined } from "@ant-design/icons";
import { Button, ButtonProps, Tooltip } from "antd";
import EditIcon from "assets/icons/edit-05.svg";
import { AiOutlineEye } from "react-icons/ai";
import { BiCheckCircle } from "react-icons/bi";
import { FiTrash2 } from "react-icons/fi";
import { IoAddCircleOutline, IoSend } from "react-icons/io5";
import { MdOutlineCheckCircleOutline, MdOutlineClose } from "react-icons/md";
import { RiUserSettingsLine } from "react-icons/ri";
interface PropsCreate extends ButtonProps {
  addButtonName?: string;
}

export const SendButton = ({ ...rest }: ButtonProps) => {
  return (
    <Button
      {...rest}
      className={`flex items-center mt-0 font-medium gap-1 ${rest.className}`}
      icon={<IoSend size={20} />}
      type="primary"
      size="large"
    >
      Илгээх
    </Button>
  );
};

export const CreateButton = ({ addButtonName, ...rest }: PropsCreate) => {
  return (
    <Button
      {...rest}
      className={`flex items-center font-medium gap-1 ${rest.className} ${
        rest.hidden && "hidden"
      }`}
      icon={<IoAddCircleOutline size={20} />}
      type="primary"
    >
      {addButtonName || "Нэмэх"}
    </Button>
  );
};

export const ApproveButton = ({ ...rest }: ButtonProps) => {
  return (
    <Button
      {...rest}
      className="flex items-center  font-medium gap-1"
      icon={<BiCheckCircle size={20} />}
      type="primary"
    >
      Approve
    </Button>
  );
};
export const DeleteButton = ({ ...rest }: ButtonProps) => {
  return (
    <Tooltip title="Устгах">
      <Button
        {...rest}
        color="red"
        className="text-red-500 flex gap-1 items-center font-medium p-0 justify-center"
        type="link"
      >
        <FiTrash2 size={20} />
      </Button>
    </Tooltip>
  );
};

export const DetailButton = ({
  color,
  ...rest
}: ButtonProps & { color?: string }) => {
  return (
    <Tooltip title="Дэлгэрэнгүй">
      <Button
        {...rest}
        className="flex gap-1 items-center font-medium p-0"
        type="link"
      >
        <AiOutlineEye size={20} className={color ? color : " text-gray-700"} />
      </Button>
    </Tooltip>
  );
};

export const EditButton = ({ ...rest }: ButtonProps) => {
  return (
    <Tooltip title="Засварлах">
      <Button
        type="link"
        // type="primary"
        className=" flex gap-1 items-center font-medium p-0"
        {...rest}
      >
        {!rest.icon && <img src={EditIcon} />}
        {rest?.title}
      </Button>
    </Tooltip>
  );
};

export const InActiveButton = ({
  tooltipTitle,
  ...rest
}: ButtonProps & {
  tooltipTitle?: string;
}) => {
  return (
    <Tooltip title={tooltipTitle ? tooltipTitle : "Cancel"}>
      <Button
        {...rest}
        color="red"
        className="text-red-500 flex items-center gap-1 font-medium px-1"
        type="link"
      >
        <MdOutlineClose size={20} />
      </Button>
    </Tooltip>
  );
};

export const CheckButton = ({
  tooltipTitle,
  ...rest
}: ButtonProps & {
  tooltipTitle?: string;
}) => {
  return (
    <Tooltip title={tooltipTitle ? tooltipTitle : "Approve"}>
      <Button
        {...rest}
        color="red"
        className=" flex items-center gap-1 font-medium px-1"
        type="link"
      >
        <MdOutlineCheckCircleOutline className="text-success-600" size={20} />
      </Button>
    </Tooltip>
  );
};

export const ConfirmButton = ({ ...rest }: ButtonProps) => {
  return (
    <Button
      {...rest}
      icon={
        <CheckCircleOutlined
          className="text-white "
          size={20}
          rev={undefined}
        />
      }
      color="green"
      type="default"
      style={{
        backgroundColor: "#039855",
        borderColor: "#039855",
        color: "#fff",
      }}
    >
      Confirm
    </Button>
  );
};

export const PermissionButton = ({ ...rest }) => {
  return (
    <Tooltip title="Permission">
      <Button
        {...rest}
        className="text-gray-700 flex items-center gap-1 font-medium px-1"
        type="link"
      >
        <RiUserSettingsLine size={20} />
      </Button>
    </Tooltip>
  );
};
