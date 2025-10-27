import { ProFormRadio } from "@ant-design/pro-form";
import { useState } from "react";
import {
  FilterDevelopmentButton,
  FilterDevelopmentline,
} from "service/care-information/types";
import { Elderlys } from "service/requested/types";
import ActiveDevPlan from "./active";

type DocumentsType = {
  data?: Elderlys;
};

export const CreatedDocument: React.FC<DocumentsType> = ({ data }) => {
  const [tab, setTab] = useState<any>(FilterDevelopmentline.active);
  const [reRender, setReRender] = useState<boolean>(false);

  const developmentButtons: FilterDevelopmentButton[] = [
    {
      value: FilterDevelopmentline.history,
      label: "Хөгжлийн төлөвлөгөөний түүх",
    },
  ];

  return (
    <div className="mt-5 p-2">
      <div className="flex justify-between items-center ">
        <div className="mt-5">
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
            options={developmentButtons?.map((el) => ({
              ...el,
              onChange: (e) => {
                setTab(e);
              },
            }))}
            initialValue={FilterDevelopmentline.history}
          />
        </div>
      </div>

      <ActiveDevPlan data={data} reRender={reRender} />
    </div>
  );
};
