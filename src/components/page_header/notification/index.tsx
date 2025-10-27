import { useRequest } from "ahooks";
import {
  Badge,
  Button,
  Carousel,
  Empty,
  Flex,
  Image,
  Modal,
  Popover,
  Skeleton,
  notification,
} from "antd";
import CheckIcon from "assets/government/icons/check-square-broken.svg";
import BellIcon from "assets/icons/Bell.svg";
import { IfCondition } from "components/condition";
import { useEffect, useState } from "react";
import file from "service/file";
import notificationService from "service/notification";
import { MainNotification } from "service/notification/type";
import { INotificationList } from "./list";
import { INotificationTitle } from "./title";

const INotification = () => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<MainNotification[]>([]);

  const list = useRequest(notificationService.list, {
    manual: true,
    onSuccess: (res) => {
      if (res.un_seen_count > 0) {
        let mainNotf: MainNotification[] = [];
        res.items.map((i) => {
          if (!i.is_seen && i.notification?.thumbnail_id !== 0) {
            mainNotf.push(i.notification);
          }
        });
        setNotifications(mainNotf);
      }
    },
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  const seenNotifi = useRequest(notificationService.seenEachNotif, {
    manual: true,
    onSuccess: () => {
      list.run();
    },
  });

  const seenAll = useRequest(notificationService.seenAll, {
    manual: true,
    onSuccess: () => {
      list.run();
      notification.success({
        message: "Амжилттай",
      });
    },
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  useEffect(() => {
    list.run();
  }, []);

  return (
    <>
      <Popover
        open={open}
        onOpenChange={(open) => setOpen(open)}
        overlayInnerStyle={{
          padding: 0,
        }}
        trigger="click"
        title={<INotificationTitle setOpen={setOpen} />}
        content={
          <div className="max-w-[540px] min-w-[540px]">
            {/* <div className="flex items-center justify-between">
            <div className="flex items-center  gap-2  "> */}
            {list?.data && list.data?.items?.length > 0 ? (
              <Button
                type="text"
                className="mb-2"
                loading={seenAll.loading}
                onClick={() => seenAll.run()}
              >
                <Flex justify="center" align="center">
                  <img src={CheckIcon} />
                  <span className="ml-2">Бүгдийг уншсан болгох</span>
                </Flex>
              </Button>
            ) : (
              <Empty
                description={
                  <div className=" text-gray-900 font-semibold text-sm">
                    Мэдэгдэл байхгүй байна
                  </div>
                }
              />
            )}

            <IfCondition
              condition={list.loading}
              whenTrue={new Array(2).fill(0).map((_, index) => (
                <div
                  key={index}
                  className="space-y-2 p-4 border-t  border-solid border-b-0 border-r-0 border-l-0 border-gray-200"
                >
                  <div className="flex items-center justify-between">
                    <Skeleton.Input active className="h-[14px]" />
                    <Skeleton.Input active className="h-[14px]" />
                  </div>
                  <div>
                    <Skeleton.Input active className="h-[14px] w-full" />
                    <Skeleton.Input active className="h-[14px] w-full" />
                    <Skeleton.Input active className="h-[14px] w-full" />
                    <Skeleton.Input active className="h-[14px] w-full" />
                    <Skeleton.Button active className="h-[14px]" />
                  </div>
                </div>
              ))}
              whenFalse={
                <INotificationList
                  items={list.data?.items || []}
                  setNotifications={(notification: MainNotification[]) => {
                    if (notification.length > 0) {
                      seenNotifi.run(notification[0].id);
                    }
                    setNotifications(notification);
                  }}
                />
              }
            />
          </div>
        }
      >
        <Badge
          count={
            list.data?.un_seen_count || 0 > 0 ? (
              <div className="bg-red-500 text-white p-2 rounded-full h-[14px] w-[14px] flex items-center justify-center">
                <div className="text-[10px] ">{list.data?.un_seen_count}</div>
              </div>
            ) : null
          }
          overflowCount={99}
          className=" cursor-pointer"
          size="small"
        >
          <img src={BellIcon} alt="bell" width={24} height={24} />
        </Badge>
      </Popover>

      <Modal
        open={notifications?.length > 0}
        footer={false}
        onCancel={() => setNotifications([])}
        width="50%"
      >
        <Carousel autoplay dotPosition="left">
          {notifications.map((i) => {
            return (
              <div key={i.id} className="mt-5 flex items-center flex-col">
                <Image
                  src={file.fileToUrl(i.thumbnail?.physical_path || "")}
                  alt="i.id"
                  height="50%"
                />
                <Flex
                  align="center"
                  justify="center"
                  className="text-center mt-4"
                  vertical
                >
                  <span className="text-xl font-semibold">{i.title}</span>
                  <span className="mt-4">{i.description}</span>
                </Flex>
              </div>
            );
          })}
        </Carousel>
      </Modal>
    </>
  );
};

export default INotification;
