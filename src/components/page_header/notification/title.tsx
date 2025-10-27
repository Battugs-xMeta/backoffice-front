import { CloseOutlined } from "@ant-design/icons";

type Props = {
  setOpen: (open: boolean) => void;
};
export const INotificationTitle = ({ setOpen }: Props) => {
  return (
    <div className="flex items-center justify-between border border-l-0 border-r-0 border-t-0 py-[23px]  border-solid border-gray-200 px-4">
      <div className="text-gray-700 text-base">Мэдэгдэл</div>
      <CloseOutlined
        className="text-gray-500 cursor-pointer"
        rev={undefined}
        onClick={() => setOpen(false)}
      />
    </div>
  );
};
