import { ProFormSelect } from "@ant-design/pro-form";

type Props = {
  placeHolder?: string;
  value?: string | number;
  label: string;
  onChange?: (e: any) => void;
  options?: { label: any; value: string | number }[];
  size?: string;
};
export const CardSelect = ({
  onChange,
  placeHolder,
  value,
  label,
  options,
  size = "default",
}: Props) => {
  return (
    <div
      className={`flex items-center gap-2 custom-ant-form-item-m0 bg-white w-fit  rounded-lg border border-solid   flex-nowrap  border-[#D0D5DD] px-4 ${
        (size === "large" && "p-2") ||
        (size === "small" && "p-0") ||
        (size === "md" && "p-1") ||
        (size === "default" && "px-[10px] py-[2px]")
      }`}
    >
      <div className=" text-gray-500 font-medium text-nowrap">{label} : </div>
      <ProFormSelect
        placeholder={placeHolder || "Сонгох"}
        fieldProps={{
          value,
          bordered: false,
          size: "small",
        }}
        allowClear={false}
        options={options}
        onChange={onChange}
      />
    </div>
  );
};
