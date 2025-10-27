import { CloudDownloadOutlined } from "@ant-design/icons";
import { ModalForm } from "@ant-design/pro-form";
import { Button, Modal } from "antd";
import { ITable } from "components/table";
import dayjs from "dayjs";
import { useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Accreditation } from "service/accreditation/types";
import file from "service/file";
import { formatMB } from "utils/index";

type dataType = {
  data?: Accreditation;
  onCancel: () => void;
};

interface certifactesListType {
  name?: String;
  size?: number;
  path?: String;
}

export const Detail: React.FC<dataType> = ({ data, onCancel }) => {
  const [isFileOpen, setFileOpen] = useState<any | undefined>(undefined);

  const certifactesList = data?.certificates?.map((value) => {
    return {
      name: value?.original_name,
      size: value?.file_size,
      path: value?.physical_path,
    };
  });

  return (
    <ModalForm
      title="Гэрчилгээ"
      open={!!data}
      modalProps={{ maskClosable: false, onCancel, className: "rounded" }}
      submitter={{
        render: () => {
          return (
            <Button
              size="large"
              className=""
              onClick={() => onCancel && onCancel()}
            >
              <FaArrowLeft
                accentHeight={11.67}
                color="#344054"
                size={12}
                className="mx-2"
              />
              Буцах
            </Button>
          );
        },
      }}
    >
      <div className="flex justify-between">
        <p className="text-base font-medium">
          Баталсан огноо :{" "}
          {data?.approved_date
            ? dayjs(data?.approved_date).format("YYYY-MM-DD")
            : "-"}
        </p>
        <p className="text-base font-medium">
          Баталсан ажилтан :{" "}
          {`${data?.user?.last_name.substring(0, 1)}. ${
            data?.user?.first_name
          }`}
        </p>
      </div>

      <div className="mt-5">
        <ITable<certifactesListType>
          scroll={false}
          dataSource={certifactesList ?? []}
          total={certifactesList?.length}
          actionWidth={10}
          hidePagination
          columns={[
            {
              dataIndex: ["name"],
              title: "Нэр",
              align: "left",
              render: (value, record) => (
                <div className="flex flex-col justify-center">
                  <span className="text-base font-bold flex text-center">
                    {value || "-"}
                  </span>
                  <span className="font-normal text-sm text-gray-600">
                    Хэмжээ :{" "}
                    <span className="font-bold">
                      {formatMB(record?.size, 2)}
                    </span>
                  </span>
                </div>
              ),
            },
          ]}
          customActions={(record) => {
            return (
              <div className="flex gap-2 items-center">
                <div className="p-4 cursor-pointer">
                  <Link
                    to={file.fileToUrl(record?.path as string)}
                    className="p-4 cursor-pointer  text-gray-700"
                    target="blank"
                    download
                  >
                    <AiOutlineEye size={20} className={" text-gray-700"} />
                  </Link>
                </div>
                <Link
                  to={file.fileToUrl(record?.path as string)}
                  className="p-4 cursor-pointer  text-gray-700"
                  target="blank"
                  download
                >
                  <CloudDownloadOutlined
                    style={{
                      fontSize: 20,
                    }}
                    rev={undefined}
                  />
                </Link>
              </div>
            );
          }}
        />
        <p className="text-base font-medium">
          Хүчинтэй хугацаа : {data?.end_year || "-"}
        </p>
        {isFileOpen && (
          <Modal
            title={
              <div className="p-6">
                <div className="font-semibold">{isFileOpen?.name}</div>
              </div>
            }
            open={isFileOpen}
            width={1144}
            onCancel={() => setFileOpen(undefined)}
            footer={
              <div
                className="flex items-center gap-2 p-6 justify-end"
                style={{ borderTop: "1px solid #D0D5DD" }}
              >
                <Button
                  icon={
                    <FaArrowLeft
                      accentHeight={11.67}
                      color="#344054"
                      size={12}
                      className="mx-2"
                    />
                  }
                  title="Буцах"
                  onClick={() => setFileOpen(undefined)}
                />
                <Link
                  to={file.fileToUrl(isFileOpen?.path as string)}
                  className="p-4 cursor-pointer  text-gray-700"
                  target="blank"
                  download
                >
                  <Button
                    title="Татах"
                    icon={
                      <CloudDownloadOutlined
                        style={{
                          fontSize: 20,
                        }}
                        rev={undefined}
                      />
                    }
                  />
                </Link>
              </div>
            }
          >
            <div className="bg-[#F0F2F5] pt-5"></div>
          </Modal>
        )}
      </div>
    </ModalForm>
  );
};
