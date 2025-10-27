import { ModalForm, ProFormInstance } from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Button, notification } from "antd";
import Badge from "components/badge";
import LeftDetail from "components/detail-modal/left-detail";
import RightDetail from "components/detail-modal/right-detail";
import { useEffect, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import { MdAccessTime } from "react-icons/md";
import requested from "service/requested";
import { ActionComponentProps } from "types";
import { Documents } from "./components/documents";
import { Migration } from "./components/migration";
import { LeftItemsDetail } from "components/left-modal";

export const DetailService = ({ ...rest }: ActionComponentProps<any>) => {
  const formRef = useRef<ProFormInstance>();

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

  useEffect(() => {
    if (rest.open) {
      formRef.current?.setFieldsValue({
        ...rest.detail,
        birth_date: rest.detail?.birth_date ?? undefined,
        email: rest.detail?.email ?? undefined,
        family_name: rest.detail?.family_name ?? undefined,
        first_name: rest.detail?.first_name ?? undefined,
        gender: rest.detail?.gender ?? undefined,
        is_disability: rest.detail?.is_disability,
        last_name: rest.detail?.last_name,
        phone: rest.detail?.phone,
        position: rest.detail?.position,
        salary: rest.detail?.salary,
        rd: rest.detail?.rd,
      });
    }
  }, [open]);

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
            {"Ажилтны дэлгэрэнгүй мэдээлэл"} {`(${rest.detail?.elderly?.rd})`}
          </div>
          <div>
            <Badge title="Хүлээгдэж байгаа" color="yellow" />
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
                  className="w-1/2  bg-error-400 text-sm flex items-center justify-center"
                  type="primary"
                  onClick={() => {
                    rest.setCloseModal(rest.detail);
                    rest?.onCancel();
                  }}
                >
                  <IoMdClose
                    accentHeight={11.67}
                    color="#fff"
                    size={18}
                    className="mx-2"
                  />
                  Цуцлах
                </Button>
                <Button
                  size="large"
                  className="w-1/2  bg-[#F79009] text-sm flex items-center justify-center mx-2"
                  type="primary"
                  icon={
                    <MdAccessTime size={18} color="#fff" className="ml-2" />
                  }
                  onClick={() => {
                    rest.setWaitModal(rest.detail);
                    rest?.onCancel();
                  }}
                >
                  Хүлээлэгт оруулах
                </Button>
              </div>
            </div>
          );
        },
      }}
    >
      <div className="w-full flex gap-4 bg-[#F5F8F8] pt-4">
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
