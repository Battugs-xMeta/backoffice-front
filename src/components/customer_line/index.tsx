import { Avatar } from "antd";
import React from "react";
import { PropsLatestCarest } from "components/render/status";

interface CustomerLineProps {
  img: string;
  status: any;
  date: string;
  name: string;
}

const CustomerLine: React.FC<CustomerLineProps> = ({
  img,
  status,
  date,
  name,
}) => {
  const color = "#146135";
  const avatar = img?.substring(0, 2) || "AA";
  return (
    <>
      <div className="flex justify-between">
        <div className="flex">
          <Avatar shape="circle" style={{ backgroundColor: color }} size={40}>
            {avatar.toUpperCase()}
          </Avatar>
          <div className="ml-3 ">
            <h2 className="mt-0 pt-0 text-sm font-bold">{name}</h2>
            <p className="text-gray-500 mt-0 pt-0">
              <PropsLatestCarest status={status} />
            </p>
          </div>
        </div>
        <div>
          <div className="flex-grow">
            <p className="text-gray-500 text-sm">{date}</p>
          </div>
        </div>
      </div>
      <div className="h-px bg-[#EAECF0] mb-2"></div>
    </>
  );
};

export default CustomerLine;
