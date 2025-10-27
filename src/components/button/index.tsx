import { Button, ButtonProps, Tooltip } from "antd";

interface CustomButtonProps extends ButtonProps {
  isDelete?: boolean;
  extraIcon?: React.ReactNode;
}

export const CustomButton = ({ ...rest }: CustomButtonProps) => {
  return (
    <Tooltip title={rest.title}>
      <Button
        {...rest}
        type="primary"
        className={`${
          rest?.isDelete && "bg-[#DD695C]"
        } flex items-center font-medium p-4`}
      >
        <div className="flex items-center gap-1">
          {rest?.title}
          {rest?.extraIcon}
        </div>
      </Button>
    </Tooltip>
  );
};

export const DefaultButton = ({ ...rest }: ButtonProps) => {
  return (
    <Tooltip title={rest.title}>
      <Button
        {...rest}
        type="default"
        className=" flex gap-1 items-center font-medium px-3 py-2"
      >
        {rest?.title}
      </Button>
    </Tooltip>
  );
};
