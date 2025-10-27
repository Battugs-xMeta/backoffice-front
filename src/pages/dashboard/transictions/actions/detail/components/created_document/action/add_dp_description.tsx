import { UserOutlined } from "@ant-design/icons";
import ProForm, {
  ModalForm,
  ModalFormProps,
  ProFormDatePicker,
  ProFormDigit,
  ProFormInstance,
  ProFormSelect,
  ProFormTextArea,
} from "@ant-design/pro-form";
import { PageLoading } from "@ant-design/pro-layout";
import { useRequest } from "ahooks";
import { Avatar, Button, Col, Empty, Row, Spin, Tag, notification } from "antd";
import { IModalForm } from "components/modal";
import { DevelopmentPlanOption } from "config";
import dayjs from "dayjs";
import { debounce } from "lodash";
import moment from "moment";
import { useEffect, useRef } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";
import careInformation from "service/care-information";
import file from "service/file";

interface SelectOption {
  value: number;
  label: React.ReactNode;
}

type PropsCancel = ModalFormProps & {
  onCancel: () => void;
  data?: number;
  onFinish?: () => void;
};

export const AddDPDescriptionModal = ({
  onCancel,
  data,
  onFinish,
  ...rest
}: PropsCancel) => {
  const formRef = useRef<ProFormInstance>();

  const onSubmit = useRequest(careInformation.createDPDetail, {
    manual: true,
    onSuccess: () => {
      notification.success({
        message: "Амжилттай",
      }),
        run();
    },
    onError: (err) => {
      notification.error({
        message: err.message,
      }),
        run();
    },
  });

  const dpDetailList = useRequest(careInformation.getDPDetailList, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  const run = () => {
    dpDetailList.run(data ?? 0);
  };

  useEffect(() => {
    run();
  }, []);

  return (
    <div className="w-full">
      <ModalForm
        {...rest}
        title={dpDetailList?.data?.description}
        width={850}
        modalProps={{
          onCancel,
          maskClosable: false,
          className: "rounded",
        }}
        loading={dpDetailList.loading}
        labelAlign="left"
        layout="vertical"
        open={!!data}
        submitter={{
          render: ({ submit: onSubmit }) => {
            return (
              <>
                <div className="flex justify-end w-full rounded-xl gap-2">
                  <Button
                    size="middle"
                    className="text-sm  items-center"
                    icon={<FaArrowLeft size={12} />}
                    onClick={() => onCancel && onCancel()}
                  >
                    Буцах
                  </Button>
                </div>
              </>
            );
          },
        }}
      >
        <>
          <div className="grid grid-cols-2 mt-4">
            <div className="col-span-1 flex flex-col gap-2">
              <p className="text-gray-600 text-base">
                Давтамж:
                <span className="font-bold ml-1 text-gray-900">
                  {
                    DevelopmentPlanOption?.find(
                      (el) => el.value === dpDetailList?.data?.count
                    )?.label
                  }
                </span>
              </p>
              <p className="text-gray-600 text-base ">
                Үргэлжлэх хугацаа:
                <span className="font-bold ml-1 text-gray-900">
                  {dayjs(dpDetailList?.data?.deadline).format("YYYY/MM/DD")}
                </span>
              </p>
            </div>
            <div className="col-span-1 flex flex-col gap-2">
              <p className="text-gray-600 text-base flex gap-2">
                Хариуцах ажилтан:{" "}
                <span className="font-bold">
                  <Tag className="flex gap-1 items-center bg-gray-200 rounded-full">
                    <Avatar
                      shape="circle"
                      size={24}
                      className="flex items-center"
                      src={file.fileToUrl(
                        dpDetailList?.data?.created_employee?.profile
                          ?.physical_path || "AS"
                      )}
                    />
                    <p className="m-0 p-0 text-sm font-semibold">
                      <span>{`${dpDetailList?.data?.created_employee?.last_name?.substring(
                        0,
                        1
                      )}. ${
                        dpDetailList?.data?.created_employee?.first_name
                      }`}</span>
                    </p>
                  </Tag>
                </span>
              </p>
            </div>
          </div>
          <div className="bg-[#F5F8F8] p-5 mt-5 rounded-lg flex flex-col gap-3 overflow-x-auto h-80">
            {dpDetailList?.data?.dtls ? (
              dpDetailList?.data?.dtls
                ?.reverse()
                ?.map((item: any, index: any) => (
                  <div className="bg-white p-5 rounded-lg" key={index + 1}>
                    <div className="flex gap-2 items-center">
                      <Avatar
                        shape="circle"
                        size={30}
                        className="flex items-center"
                        src={file.fileToUrl(
                          item?.created_employee?.profile?.physical_path || "AS"
                        )}
                      />
                      <div className="flex flex-col m-0 p-0 ">
                        <p className="m-0 p-0 text-sm font-semibold">
                          <span>{`${item?.created_employee?.last_name?.substring(
                            0,
                            1
                          )}. ${item?.created_employee?.first_name}`}</span>
                        </p>
                        <p className="m-0 p-0 text-xs font-normal">
                          {dayjs(item?.updated_at).format("YYYY-MM-DD HH:mm")}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm font-medium text-gray-700 mt-4">
                      {item?.description}
                    </p>
                  </div>
                ))
            ) : (
              <Empty
                className="h-full items-center flex flex-col justify-center"
                description="Дата байхгүй байна"
              />
            )}
          </div>
        </>
      </ModalForm>
    </div>
  );
};
