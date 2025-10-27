import { Avatar, Card } from "antd";
import dayjs from "dayjs";
import React from "react";
import { WorkerList } from "service/workers/type";
import { Collapse } from "antd";
import file from "service/file";

interface LeftDetailProps {
  items: any;
  last_name?: string;
  first_name?: string;
  avatar?: string;
}
const LeftDetail: React.FC<LeftDetailProps> = ({
  items,
  last_name,
  first_name,
  avatar,
}) => {
  return (
    <Card>
      <div className="flex justify-center flex-col items-center">
        <Avatar
          shape="circle"
          size={80}
          src={file.fileToUrl(avatar as string)}
        />
        <div className="text-xl text-[#667085] font-medium">{last_name}</div>
        <div className="text-2xl font-medium ">{first_name}</div>
        <div className="h-px bg-[#EAECF0] mb-2 mt-2 w-full"></div>
      </div>
      <Collapse
        defaultActiveKey={["1"]}
        ghost
        items={items}
        expandIconPosition="end"
      />
    </Card>
  );
};

export default LeftDetail;
