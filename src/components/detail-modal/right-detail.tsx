import { Card, Tabs } from "antd";
import React from "react";

const RightDetail: React.FC<any> = ({ data, items }) => {
  return (
    <Card>
      <Tabs defaultActiveKey="1" items={items} onChange={() => {}} />
    </Card>
  );
};

export default RightDetail;
