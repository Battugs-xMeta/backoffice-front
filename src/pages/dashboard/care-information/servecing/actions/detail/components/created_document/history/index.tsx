import { Empty } from "antd";
import React from "react";
import { Elderlys } from "service/requested/types";

type DocumentsType = {
  data?: Elderlys;
  reRender: boolean;
};

const HistoryDevPlan: React.FC<DocumentsType> = ({ data, reRender }) => {
  // const list = useRequest(careInformation.getDPList, {
  //   manual: true,
  //   onError: (err) =>
  //     notification.error({
  //       message: err.message,
  //     }),
  // });

  // const run = () => {
  //   list.run(data?.id ?? 0);
  // };

  // useEffect(() => {
  //   run();
  // }, [data?.id, reRender]);

  return (
    <div>
      <div className="flex flex-col gap-3">
        <Empty
          className="h-full items-center flex flex-col justify-center"
          description="Хөгжлийн төлөвлөгөөний түүх байхгүй байна"
        />
      </div>
    </div>
  );
};

export default HistoryDevPlan;
