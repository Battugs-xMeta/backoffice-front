import { LinkOutlined } from "@ant-design/icons";
import { Divider } from "antd";
import { IfCondition } from "components/condition";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import file from "service/file";
import { NotificationItem } from "service/notification/type";

type Props = {
  items?: NotificationItem[];
  setNotifications: any
};

export const INotificationList = ({ items, setNotifications }: Props) => {
  return (
    <div className="w-full">
      {items?.map((el, key) => {
        return (
          <div
            className="flex items-start gap-3  border-t  border-solid border-b-0 border-r-0 border-l-0 border-gray-200 hover:bg-primary-100 cursor-pointer p-4"
            key={key}
            onClick={() => setNotifications([el.notification])}
          >
            <div className="space-y-2 w-full">
              <div className="flex items-center justify-between">
                <div className="text-gray-700 font-semibold text-sm ">
                  ХХҮЕГ
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-xs text-gray-600 font-normal">
                    {dayjs(el.created_at).format("YYYY-MM-DD HH:mm:ss")}
                  </div>
                  {!el.is_seen && (
                    <div className="w-[10px] h-[10px] bg-primary-500 rounded-full " />
                  )}
                </div>
              </div>

              <div className={`text-gray-700 font-light `}>
                {el?.notification?.title}
              </div>

              <Divider />

              <div className="mt-2 flex gap-5">
                <IfCondition
                  condition={el?.notification?.attachment_id !== 0}
                  whenTrue={
                    <Link className="underline" to={file.fileToUrl(el?.notification?.attachment?.physical_path || '')} target="_blank">
                      <LinkOutlined rev={undefined} />
                      <span className="ml-1">Хавсралт</span>
                    </Link>
                  }
                />

                <IfCondition
                  condition={el?.notification?.thumbnail_id !== 0}
                  whenTrue={
                    <Link className="underline" to={file.fileToUrl(el?.notification?.thumbnail?.physical_path || '')} target="_blank">
                      <LinkOutlined rev={undefined} />
                      <span className="ml-1">Зураг</span>
                    </Link>
                  }
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
