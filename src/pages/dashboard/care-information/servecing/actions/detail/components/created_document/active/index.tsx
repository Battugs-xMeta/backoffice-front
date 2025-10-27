import { useRequest } from "ahooks";
import { Avatar, Button, Card, notification } from "antd";
import { DevelopmentPlanOption } from "config";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import careInformation from "service/care-information";
import file from "service/file";
import { Elderlys } from "service/requested/types";
import PlusMessage from "assets/icons/message-plus-square.svg";
import { AddDPDescriptionModal } from "../action/add_dp_description";

type DocumentsType = {
  data?: Elderlys;
  reRender: boolean;
};

const ActiveDevPlan: React.FC<DocumentsType> = ({ data, reRender }) => {
  const [viewModal, setViewModal] = useState<number>();
  const list = useRequest(careInformation.getDPList, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  const run = () => {
    list.run(data?.id ?? 0);
  };

  useEffect(() => {
    run();
  }, [data?.id, reRender]);

  return (
    <div>
      <div className="flex flex-col gap-3">
        {list.data?.map((item, index) => {
          return (
            <Card
              className="bg-[#F5F8F8] rounded-2xl flex flex-col justify-between w-full"
              key={index}
            >
              <div className="text-base font-medium">{item?.structure}</div>
              <div className="text-sm font-normal text-gray-600 mb-5">
                {
                  DevelopmentPlanOption?.find((x) => x.value === item?.duration)
                    ?.label
                }
              </div>
              <div className="overflow-x-auto">
                <div className="flex gap-2 w-full">
                  {item?.elderly_dps?.map((item, index) => (
                    <div
                      className="bg-[#ffffff] px-6 py-1 pb-5 rounded-2xl min-w-[250px]"
                      key={`dp-${index}`}
                    >
                      <p className="text-base font-medium text=gray-800 mt-2">
                        {item?.description}
                      </p>
                      <p className="text-sm text-gray-700 font-normal">
                        {item?.count &&
                          DevelopmentPlanOption?.find(
                            (el) => el.value === item.count
                          )?.label}
                      </p>
                      <div className="h-px bg-[#EAECF0] mb-2 mt-3 w-full "></div>
                      <div className="flex justify-between items-center pt-2">
                        <div className="flex gap-2 items-center">
                          <Avatar
                            shape="circle"
                            size={30}
                            src={file.fileToUrl(
                              item?.created_employee?.profile?.physical_path ||
                              "AS"
                            )}
                            className="flex items-center"
                          />
                          <div className="flex flex-col m-0 p-0 ">
                            <p className="m-0 p-0 text-sm font-semibold">
                              Дуусах хугацаа
                            </p>
                            <p className="m-0 p-0 text-xs font-normal">
                              {dayjs(item?.deadline).format("YYYY-MM-DD")}
                            </p>
                          </div>
                        </div>
                        <Button
                          type="primary"
                          size="small"
                          className="flex justify-center items-center gap-2 py-4"
                          onClick={() => setViewModal(item?.id)}
                        >
                          {item.dtls?.length || 0} <img src={PlusMessage} alt="plus" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
      {viewModal && (
        <AddDPDescriptionModal
          data={viewModal}
          onCancel={() => {
            setViewModal(undefined)
            list.refresh()
          }}
          onFinish={async () => {
            setViewModal(undefined);
            list.refresh()
          }}
        />
      )}
    </div>
  );
};

export default ActiveDevPlan;
