import { ProFormRadio } from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { notification } from "antd";
import { IfCondition } from "components/index";
import { useState } from "react";
import transictions from "service/transictions";
import {
  FilterTransictionsButton,
  FilterTransictionsline,
} from "service/transictions/types";
import All from "./all";
import Died from "./died";
import Force from "./force";
import Moving from "./moving";
import OwnRequest from "./own-request";

const TransictionsPage = () => {
  const [tab, setTab] = useState<any>(FilterTransictionsline.All);

  const list = useRequest(transictions.list, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  const Incomebuttons: FilterTransictionsButton[] = [
    {
      value: FilterTransictionsline.All,
      label: "Бүгд",
    },
    {
      value: FilterTransictionsline.Moving,
      label: "Шилжсэн",
    },
    {
      value: FilterTransictionsline.Force,
      label: "Албадан гаргасан",
    },
    {
      value: FilterTransictionsline.OwnRequest,
      label: "Өөрийн хүсэлтээр гарсан",
    },
    {
      value: FilterTransictionsline.Died,
      label: "Нас барсан",
    },
  ];

  return (
    <div className="space-y-3 mt-4">
      <ProFormRadio.Group
        name={"incomeline"}
        radioType="button"
        fieldProps={{
          size: "large",
          value: tab,
          onChange: (e) => {
            setTab(e.target.value);
          },
        }}
        options={Incomebuttons?.map((el) => ({
          ...el,
          onChange: (e) => {
            setTab(e);
          },
        }))}
        initialValue={FilterTransictionsline.All}
      />

      <IfCondition
        condition={tab === FilterTransictionsline.All}
        whenTrue={<All />}
      />
      <IfCondition
        condition={tab === FilterTransictionsline.Moving}
        whenTrue={<Moving />}
      />
      <IfCondition
        condition={tab === FilterTransictionsline.Force}
        whenTrue={<Force />}
      />
      <IfCondition
        condition={tab === FilterTransictionsline.OwnRequest}
        whenTrue={<OwnRequest />}
      />

      <IfCondition
        condition={tab === FilterTransictionsline.Died}
        whenTrue={<Died />}
      />
    </div>
  );
};

export default TransictionsPage;

export const getColor = (status: number) => {
  switch (status) {
    case 11:
      return "green";
    case 14:
      return "red";
    case 13:
      return "yellow";
    case 12:
      return "blue";
    default:
      return "#FFFAEB";
  }
};
