import { ProFormInstance } from "@ant-design/pro-form";
import { IModalForm } from "components/modal";
import { useEffect, useRef } from "react";
import { ActionComponentProps } from "types";
import { WorkerList } from "service/workers/type";
import LeftDetail from "components/detail-modal/left-detail";
import RightDetail from "components/detail-modal/right-detail";
import Migration from "./components/migration";
import { Button } from "antd";

export const DetailService = ({
  ...rest
}: ActionComponentProps<WorkerList>) => {
  const formRef = useRef<ProFormInstance>();
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

  const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

  const detailPromt = [
    {
      name: "Регистрийн дугаар:",
      value: rest.detail?.last_name,
    },
    {
      name: "Регистрийн дугаар:",
      value: rest.detail?.rd,
    },
    {
      name: "Регистрийн дугаар:",
      value: rest.detail?.first_name,
    },
    {
      name: "Регистрийн дугаар:",
      value: rest.detail?.email,
    },
    {
      name: "Регистрийн дугаар:",
      value: rest.detail?.gender,
    },
    {
      name: "Регистрийн дугаар:",
      value: rest.detail?.phone,
    },
  ];

  const rightItems = [
    {
      key: "1",
      label: "Шилжилт хөдөлгөөн",
      children: <Migration />,
    },
    {
      key: "2",
      label: "Tab 2",
      children: "Content of Tab Pane 2",
    },
    {
      key: "3",
      label: "Tab 3",
      children: "Content of Tab Pane 3",
    },
  ];

  const leftitems = [
    {
      key: "1",
      label: <div className="font-semibold text-base">Хувийн мэдээлэл</div>,
      children: (
        <div>
          {detailPromt?.map((item, index) => {
            return (
              <div
                key={index}
                className="mb-4 pt-0 mt-0 w-full flex justify-between"
              >
                <div className="text-[#475467] mt-2 col-span-1 font-normal w-[60%]">
                  {item.name}
                </div>
                <div className="font-semibold  mt-2 w-[40%]">{item.value}</div>
              </div>
            );
          })}
        </div>
      ),
    },
    {
      key: "2",
      label: "This is panel header 2",
      children: <p>{text}</p>,
    },
    {
      key: "3",
      label: "This is panel header 3",
      children: <p>{text}</p>,
    },
  ];

  return (
    <IModalForm
      open={rest.open}
      title="Ажилтны дэлгэрэнгүй мэдээлэл"
      submitter={{
        render: ({ submit }) => {
          return (
            <div className="flex justify-end rounded-xl">
              <Button
                type="primary"
                // onClick={onSubmit}
                // loading={submit.loading}
              >
                Үргэлжүүлэх
              </Button>
            </div>
          );
        },
      }}
      okText={""}
      width={1330}
      scrollToFirstError={true}
      modalProps={{ maskClosable: false, onCancel: rest.onCancel }}
    >
      <div className="w-full flex gap-4">
        <div className="w-[35%]">
          <LeftDetail
            items={leftitems}
            last_name={rest.detail?.last_name}
            first_name={rest.detail?.first_name}
          />
        </div>
        <div className="w-[65%]">
          <RightDetail items={rightItems} />
        </div>
      </div>
    </IModalForm>
  );
};
