import { Tag } from "antd";

type Props = {
  isOrg?: boolean;
};
export const RenderDonationType = ({ isOrg }: Props) => {
  return (
    <Tag
      color={isOrg ? "#027A48" : "#F2F4F7"}
      bordered={false}
      className="rounded-2xl  px-2"
    >
      <span
        className={`${
          isOrg ? "text-[#027A48]" : "text-[#344054] "
        }text-xs  font-normal`}
      >
        {isOrg ? "Байгууллага" : "Хувь хүн"}{" "}
      </span>
    </Tag>
  );
};
