import { CloudDownloadOutlined } from "@ant-design/icons";
import { Button, Flex, Modal } from "antd";
import { ITable } from "components/table";
import { useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import None from "assets/icons/report/none.svg";
import { Link } from "react-router-dom";
import file from "service/file";
import { LaboratoryTest } from "service/requested/types";
import { formatMB } from "utils/index";

type DocumentsType = {
  data?: LaboratoryTest[];
};

interface DocumentList {
  name?: String;
  size?: number;
  path?: String;
  isHave?: any;
}

export const HealthDoc: React.FC<DocumentsType> = ({ data }) => {
  const [isFileOpen, setFileOpen] = useState<any | undefined>(undefined);

  const documentList = data?.map((value) => {
    return {
      name: value?.laboratory_test?.name,
      size: value?.files[0]?.file_size,
      path: value?.files[0]?.physical_path,
      isHave: value.files.length > 0,
    };
  });

  return (
    <div className="mt-5">
      <ITable<DocumentList>
        scroll={false}
        dataSource={documentList ?? []}
        actionWidth={10}
        hidePagination
        columns={[
          {
            dataIndex: ["name"],
            title: "Нэр",
            align: "left",
            render: (value, record) => (
              <div className="flex flex-col justify-center">
                <span
                  className={`text-base font-bold flex text-center ${
                    record.isHave ? "text-[#344054]" : "text-[#DD695C]"
                  }`}
                >
                  {value || "-"}
                </span>

                <span className="font-normal text-sm text-gray-600">
                  Хэмжээ :{" "}
                  <span className="font-bold">{formatMB(record?.size, 2)}</span>
                </span>
              </div>
            ),
          },
          {
            dataIndex: ["isHave"],
            title: "Байгаа эсэх",
            align: "center",
            render: (value) => (
              <Flex justify="center" align="center">
                {value ? (
                  <FaCheck size={14} color="green" className="ml-1" />
                ) : (
                  <img src={None} />
                )}
              </Flex>
            ),
          },
        ]}
        customActions={(record) => {
          return record.isHave ? (
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
          ) : null;
        }}
      />
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
  );
};
