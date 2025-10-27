import { ProFormRadio } from "@ant-design/pro-form";
import { IfCondition } from "components/index";
import React, { useState } from "react";
import {
  FilterRequestedButton,
  FilterRequestedline,
} from "service/requested/types";
import CamePage from "./came";
import ReturnedPage from "./returned";

const DeceasedCitizensPage: React.FC = () => {
  const [tab, setTab] = useState<any>(FilterRequestedline.requested);
  const requestedButtons: FilterRequestedButton[] = [
    {
      value: FilterRequestedline.requested,
      label: "Ирсэн хүсэлтүүд",
    },
    {
      value: FilterRequestedline.returned,
      label: "Цуцлагдсан хүсэлтүүд",
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
        options={requestedButtons?.map((el) => ({
          ...el,
          onChange: (e) => {
            setTab(e);
          },
        }))}
        initialValue={FilterRequestedline.requested}
      />
      <IfCondition
        condition={tab === FilterRequestedline.requested}
        whenTrue={<CamePage />}
      />
      <IfCondition
        condition={tab === FilterRequestedline.returned}
        whenTrue={<ReturnedPage />}
      />
    </div>
  );
};

export default DeceasedCitizensPage;
