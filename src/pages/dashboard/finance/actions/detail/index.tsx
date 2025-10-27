import { ModalForm } from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Button, notification } from "antd";
import Badge from "components/badge";
import RightDetail from "components/detail-modal/right-detail";
import { LeftItemsDetail } from "components/left-modal";
import { TransictionsStatus } from "config";
import { IoMdCheckmark } from "react-icons/io";
import { TbSwitchHorizontal } from "react-icons/tb";
import transictions from "service/transictions";
import { ActionComponentProps } from "types";
import { getColor } from "../..";
import { CreatedDocument } from "./components/created-document";
import { Documents } from "./components/documents";
import { HealthConditionDocument } from "./components/health_condition";
import { Notes } from "./components/notes";

export const DetailService = ({ ...rest }: ActionComponentProps<any>) => {
  const list = useRequest(
    () => transictions.getTransictionUserDetail(rest?.detail?.id),
    {
      ready: rest.open,
      onError: (err) =>
        notification.error({
          message: err.message,
        }),
    }
  );

  const rightItems = [
    {
      key: "1",
      label: "Бичиг баримт",
      children: <Documents data={list?.data?.elderly} />,
    },
    {
      key: "2",
      label: "Хөгжлийн төлөвлөгөө",
      children: <CreatedDocument data={list?.data?.elderly} />,
    },
    {
      key: "3",
      label: "Эрүүл мэндийн тэмдэглэл",
      children: <HealthConditionDocument data={list?.data?.elderly} />,
    },
    {
      key: "4",
      label: "Тэмдэглэл",
      children: <Notes data={list?.data?.elderly} />,
    },
    {
      key: "5",
      label: "Үйл явдал",
      children: <HealthConditionDocument data={list?.data?.elderly} />,
      disabled: true,
    },
  ];

  return (
    <ModalForm
      open={rest.open}
      width={1330}
      title={
        <div className="flex items-center gap-4 px-1 py-2">
          <div className="text-base text-gray-800 font-semibold">
            {"Үйлчлүүлэгчийн дэлгэрэнгүй мэдээлэл"}
            {`(${rest?.detail?.elderly?.rd})`}
          </div>
          <div>
            <Badge
              color={getColor(rest?.detail?.movement_type as number)}
              title={
                (TransictionsStatus as { [key: string]: string })[
                  rest?.detail?.movement_type as number
                ]
              }
            />
          </div>
        </div>
      }
      scrollToFirstError={{
        behavior: "smooth",
        block: "center",
        inline: "center",
      }}
      style={{
        top: 1,
      }}
      layout="vertical"
      labelAlign="left"
      colProps={{
        span: 12,
      }}
      modalProps={{ maskClosable: false, onCancel: rest.onCancel }}
      submitter={{
        render: ({ submit }) => {
          return (
            <div className="flex items-center justify-end w-full px-5 border-t border-solid border-b-0 border-l-0 border-r-0 border-gray-300 pt-3">
              <div className="flex items-center gap-1">
                {/* <Button
                  size="large"
                  className="w-1/2 text-sm flex items-center justify-center"
                  onClick={() => {
                    rest.setWaitModal(rest?.detail);
                  }}
                >
                  <IoMdCheckmark color="" size={15} className="mx-2" />
                  Мэдээлэл засах
                </Button> */}
                <Button
                  size="large"
                  className="text-sm flex items-center justify-center"
                  type="primary"
                  icon={<TbSwitchHorizontal size={15} />}
                  onClick={() => rest.setTransictionModal(rest?.detail)}
                >
                  Шилжилт хөдөлгөөн хийх
                </Button>
              </div>
            </div>
          );
        },
      }}
    >
      <div className="w-full flex gap-4">
        <div className="w-[35%]">
          <LeftItemsDetail list={list} rest={rest} />
        </div>
        <div className="w-[65%]">
          <RightDetail items={rightItems} />
        </div>
      </div>
    </ModalForm>
  );
};
