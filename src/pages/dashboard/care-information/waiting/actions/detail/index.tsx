import { ModalForm } from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Button, notification } from "antd";
import Badge from "components/badge";
import RightDetail from "components/detail-modal/right-detail";
import { LeftItemsDetail } from "components/left-modal";
import { FaArrowLeft } from "react-icons/fa";
import { IoMdCheckmark } from "react-icons/io";
import requested from "service/requested";
import { ActionComponentProps } from "types";
import { Documents } from "./components/documents";
import { HealthConditionDocument } from "./components/health_condition";
import { Migration } from "./components/migration";

export const DetailService = ({ ...rest }: ActionComponentProps<any>) => {
  const list = useRequest(
    () => requested.getUserDetail(rest.detail?.elderly?.id),
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
      label: "Үйл явдал",
      children: <Migration data={list?.data?.elderly} />,
    },
    {
      key: "2",
      label: "Бичиг баримт",
      children: <Documents data={list?.data?.elderly} />,
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
            <Badge title={"Хүлээлэгт оруулсан"} color="yellow" />
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
                <Button
                  size="large"
                  className="text-sm flex items-center justify-center"
                  onClick={() => {
                    rest.onCancel();
                  }}
                  icon={
                    <FaArrowLeft
                      accentHeight={11.67}
                      color="#344054"
                      size={12}
                      className=""
                    />
                  }
                >
                  Буцах
                </Button>
                <Button
                  size="large"
                  className="text-sm flex items-center justify-center"
                  type="primary"
                  onClick={() => {
                    rest.setApproveModal(rest.detail);
                    rest?.onCancel();
                  }}
                  icon={<IoMdCheckmark color="#fff" size={13} className="" />}
                >
                  Хүлээж авах
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
