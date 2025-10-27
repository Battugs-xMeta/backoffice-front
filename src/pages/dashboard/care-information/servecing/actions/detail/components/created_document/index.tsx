import { ProFormRadio } from "@ant-design/pro-form";
import { CreateButton } from "components/index";
import { useState } from "react";
import {
  FilterDevelopmentButton,
  FilterDevelopmentline,
} from "service/care-information/types";
import { Elderlys } from "service/requested/types";
import { AddDPModal } from "./action/add_dp_modal";
import ActiveDevPlan from "./active";
import HistoryDevPlan from "./history";

type DocumentsType = {
  data?: Elderlys;
};

export const CreatedDocument: React.FC<DocumentsType> = ({ data }) => {
  const [tab, setTab] = useState<any>(FilterDevelopmentline.active);
  const [visibleModal, setVisibleModal] = useState<number>();
  const [reRender, setReRender] = useState<boolean>(false);

  const developmentButtons: FilterDevelopmentButton[] = [
    {
      value: FilterDevelopmentline.active,
      label: "Идэвхтэй төлөвлөгөө",
    },
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
            initialValue={FilterDevelopmentline.active}
          />
        </div>
        <div className="flex gap-2 m-0 p-0">
          {tab === FilterDevelopmentline.active && (
            <CreateButton
              size="large"
              onClick={() => setVisibleModal?.(data?.id as number)}
              addButtonName="Нэмэх"
            />
          )}
        </div>
      </div>

      <AddDPModal
        data={visibleModal}
        onCancel={() => setVisibleModal(undefined)}
        onFinish={async () => {
          setVisibleModal(undefined);
          setReRender(!reRender);
        }}
      />

      {tab === FilterDevelopmentline.active ? (
        <ActiveDevPlan data={data} reRender={reRender} />
      ) : (
        <HistoryDevPlan data={data} reRender={reRender} />
      )}
    </div>
  );
};
