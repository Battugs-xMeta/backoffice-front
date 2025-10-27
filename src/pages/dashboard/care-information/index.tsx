import { ProFormRadio } from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { IfCondition } from "components/index";
import { FC, useState } from "react";
import careInformation from "service/care-information";
import {
  FilterServecingline,
  FilterServicingButton,
} from "service/care-information/types";
import Servecing from "./servecing";
import Waiting from "./waiting";

const CareInformation: FC = () => {
  const [tab, setTab] = useState<any>(FilterServecingline.Serving);

  const statusCounts = useRequest(careInformation.getStatusCounts);

  const servicingButtons: FilterServicingButton[] = [
    {
      value: FilterServecingline.Serving,
      label: `Үйлчлүүлж байгаа (${
        statusCounts.data?.find((x) => x.status === FilterServecingline.Serving)
          ?.count
      })`,
    },
    {
      value: FilterServecingline.Waiting,
      label: `Хүлээлэгт байгаа (${
        statusCounts.data?.find((x) => x.status === FilterServecingline.Waiting)
          ?.count
      })`,
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
        options={servicingButtons?.map((el) => ({
          ...el,
          onChange: (e) => {
            setTab(e);
          },
        }))}
        initialValue={FilterServecingline.Serving}
      />

      <IfCondition
        condition={tab === FilterServecingline.Serving}
        whenTrue={<Servecing />}
      />
      <IfCondition
        condition={tab === FilterServecingline.Waiting}
        whenTrue={<Waiting />}
      />
    </div>
  );
};

export default CareInformation;
