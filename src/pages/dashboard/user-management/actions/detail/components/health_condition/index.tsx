import { useRequest } from "ahooks";
import { Avatar, Timeline, notification } from "antd";
import { CreateButton } from "components/index";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import careInformation from "service/care-information";
import { Elderlys } from "service/requested/types";
import { AddCondition } from "./add_condition";
import file from "service/file";
type DocumentsType = {
  data?: Elderlys;
};

export const HealthConditionDocument: React.FC<DocumentsType> = ({ data }) => {
  const [visibleModal, setVisibleModal] = useState<number>();

  const list = useRequest(careInformation.getHealthNoteList, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  const run = () => {
    list.run({
      elderly_id: data?.id || 0,
    });
  };

  useEffect(() => {
    run();
  }, [visibleModal]);

  return (
    <div className="mt-5">
      <div className="flex justify-between items-center">
        <p className="text-lg font-bold">Эрүүл мэндийн түүх</p>
        <CreateButton
          size="large"
          onClick={() => setVisibleModal?.(data?.id as number)}
          addButtonName="Нэмэх"
          disabled
        />
      </div>
      <div className="ml-2 h-[900px] overflow-y-auto">
        <Timeline
          className="mt-5"
          items={
            list.data?.items.map((item, index) => ({
              children: (
                <div className="flex gap-3 " key={index}>
                  <div className="flex-col flex  items-start">
                    <div className="font-medium text-sm ">
                      {item.service_name}
                    </div>
                    <div>
                      {dayjs(item.updated_at).format("YYYY-MM-DD HH:mm:ss")}
                    </div>
                    <div className="flex gap-2 items-center my-2 ">
                      <Avatar
                        shape="circle"
                        size={30}
                        src={file.fileToUrl(
                          item?.created_employee?.profile?.physical_path || "AS"
                        )}
                        className="flex items-center"
                      />
                      <div className="flex flex-col m-0 p-0 ">
                        <p className="m-0 p-0 text-sm font-semibold">
                          {item?.created_employee.first_name}
                        </p>
                        <p className="m-0 p-0 text-xs font-normal">
                          {item?.created_employee.position}
                        </p>
                      </div>
                    </div>
                    <div className="bg-[#F5F8F8] rounded-full px-3 py-2 ">
                      <span className="text-sm font-medium">
                        Тайлбар: {item?.description}
                      </span>
                    </div>
                  </div>
                </div>
              ),
              position: "right",
              dot: (
                <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-[#667085]"></div>
                </div>
              ),
            })) || []
          }
        />
      </div>
      <AddCondition
        data={visibleModal}
        onCancel={() => setVisibleModal(undefined)}
        onFinish={async () => {
          run();
          setVisibleModal(undefined);
        }}
      />
    </div>
  );
};
