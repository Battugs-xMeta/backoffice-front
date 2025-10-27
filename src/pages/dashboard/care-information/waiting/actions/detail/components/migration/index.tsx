import { PageLoading } from "@ant-design/pro-layout";
import { useRequest } from "ahooks";
import { Timeline, notification } from "antd";
import CareGiverIconStatus from "components/badge/icon_status";
import CareGiverComponentStatus from "components/migration-events";
import { useEffect } from "react";
import requested from "service/requested";
import { Elderlys } from "service/requested/types";

type MigrationType = {
  data?: Elderlys;
};

export const Migration: React.FC<MigrationType> = ({ data }) => {
  const list = useRequest(() => requested.getElderlyEvents(data?.id), {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  const run = () => {
    list.run();
  };

  useEffect(() => {
    run();
  }, [data]);

  return (
    <>
      {list.loading || !data ? (
        <PageLoading />
      ) : (
        <div className="ml-2 h-[900px] overflow-y-auto w-full">
          <Timeline
            className="mt-5 ml-3"
            items={
              list?.data?.map((item: any) => ({
                children: (
                  <CareGiverComponentStatus
                    data={item}
                    status={item?.status_code}
                  />
                ),
                position: "right",
                dot: <CareGiverIconStatus status={item?.status_code} />,
              })) || []
            }
          />
        </div>
      )}
    </>
  );
};
