import { CloudDownloadOutlined } from "@ant-design/icons";
import ProForm, {
  ProFormInstance,
  ProFormTextArea,
} from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Avatar, Button, Card, Modal, Tooltip, notification } from "antd";
import PowerIcon from "assets/icons/powerpoint.svg";
import { CreateButton, ExportButton } from "components/index";
import { ITable } from "components/table";
import dayjs from "dayjs";
import { useAtom } from "jotai";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { FaArrowLeft } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import careInformation from "service/care-information";
import file from "service/file";
import { Documents, Elderlys } from "service/requested/types";
import { exportFromTable } from "utils/export";
import { formatMB } from "utils/index";
import { atomWorkersForm } from "utils/store";
type DocumentsType = {
  data?: Elderlys;
};

interface DocumentList {
  name?: String;
  size?: number;
  path?: String;
}

export const CreatedDocument: React.FC<DocumentsType> = ({ data }) => {
  const formRef = useRef<ProFormInstance>();
  const [form, setForm] = useAtom(atomWorkersForm);
  const [visible, setVisible] = useState<number>(0);
  const list = useRequest(careInformation.getDPList, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  const createDP = useRequest(careInformation.createDP, {
    manual: true,
    onSuccess: () => {
      notification.success({
        message: "Амжилттай",
      });
      setVisible(0);
    },
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  const run = () => {
    list.run(data?.id || 0);
  };

  useEffect(() => {
    run();
  }, [form, !!visible, data?.id]);

  return (
    <div className="mt-5 p-2">
      <div className="flex justify-between items-center mb-2">
        <p className="text-lg font-bold">Хөгжлийн төлөвлөгөө</p>
        <ExportButton
          onClick={() => {
            exportFromTable(
              ["Үйлчлүүлэгчдийн дэлгэрэнгүй мэдээлэл"],
              window.document.getElementById("main-table") as HTMLElement,
              window
            );
          }}
        />
      </div>
      <div className="flex flex-col gap-3">
        {list.data?.map((item, index) => {
          return (
            <Card
              className="bg-[#F5F8F8] rounded-2xl flex flex-col justify-between w-full"
              key={index}
            >
              <div className="text-base font-medium">{item.structure}</div>
              <div className="text-sm font-normal text-gray-600 mb-5">
                {item.duration} сарын хугацаанд
              </div>
              <div className=" overflow-x-auto">
                <div className="flex gap-2 w-full">
                  {visible === index + 1 ? (
                    <ProForm
                      formRef={formRef}
                      onFinish={async (values) => {
                        if (
                          await createDP.runAsync({
                            ...values,
                            elderly_id: data?.id,
                            plan_id: item.id,
                          })
                        ) {
                          return true;
                        }
                        return false;
                      }}
                      className="bg-[#ffffff] p-6 rounded-2xl"
                      submitter={{
                        render: ({ submit: onSubmit }) => {
                          return (
                            <>
                              <div className="flex justify-end w-full rounded-xl gap-2">
                                <Button
                                  size="middle"
                                  className="text-sm  items-center"
                                  icon={<FaArrowLeft size={12} />}
                                  onClick={() => setVisible(0)}
                                >
                                  Буцах
                                </Button>
                                <Button
                                  size="middle"
                                  className="text-sm flex items-center gap-2 justify-center"
                                  type="primary"
                                  onClick={onSubmit}
                                >
                                  <IoMdAddCircleOutline size={18} />
                                  Хадгалах
                                </Button>
                              </div>
                            </>
                          );
                        },
                      }}
                    >
                      <ProFormTextArea
                        name="description"
                        label="Тайлбар"
                        width={250}
                      />
                    </ProForm>
                  ) : (
                    <div
                      className="bg-[#ffffff] p-6 flex justify-center items-center min-w-[150px] rounded-2xl border-dashed 1px border-[#EAECF0] flex-col hover:cursor-pointer"
                      style={{
                        pointerEvents: "none",
                        opacity: 0.5,
                      }}
                      onClick={() => setVisible(index + 1)}
                    >
                      <IoMdAddCircleOutline size={30} color="#98A2B3" />
                      <div className="text-sm text-center font-medium text-gray-700 ml-2">
                        Төвөвлөгөө нэмэх
                      </div>
                    </div>
                  )}
                  <div className="flex gap-2 w-full">
                    {item.elderly_dps?.reverse().map((item, index) => (
                      <div
                        className="bg-[#ffffff] px-6 py-1 pb-5 rounded-2xl min-w-[250px]"
                        key={`dp-${index}`}
                      >
                        <p className="text-sm font-normal text-gray-600 pt-1">
                          {dayjs(item?.created_employee?.updated_at).format(
                            "YYYY-MM-DD HH:mm"
                          )}
                        </p>
                        <div className="flex gap-2 items-center mb-3">
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
                              {item?.created_employee.first_name}
                            </p>
                            <p className="m-0 p-0 text-xs font-normal">
                              {item?.created_employee.position}
                            </p>
                          </div>
                        </div>
                        <div className="text-gray-700 text-sm font-medium ml-1">
                          {item?.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
