import { CloudDownloadOutlined } from "@ant-design/icons";
import { useRequest } from "ahooks";
import { Button, Flex, Modal, notification } from "antd";
import None from "assets/government/icons/none.svg";
import { ITable } from "components/table";
import { useEffect, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import file from "service/file";
import requested from "service/requested";
import { Elderlys } from "service/requested/types";
import { formatKB } from "utils/index";

type DocumentsType = {
  data?: Elderlys;
};

interface DocumentList {
  name?: String;
  size?: number;
  path?: String;
  isHave: any;
}

export const ContractDoc: React.FC<DocumentsType> = ({ data }) => {
  const [isFileOpen, setFileOpen] = useState<any | undefined>(undefined);

  const elderlyData = useRequest(requested.getUserDetail,
    {
      onError: (err) =>
        notification.error({
          message: err.message,
        }),
    }
  );

  useEffect(() => {
    if (data) {
      elderlyData.run(data.id)
    }
  }, [data]);

  const documentList = [
    {
      name: "Нийгмийн ажилтны нөхцөл байдлын үнэлгээний хуудас",
      id: 1,
      isHave: elderlyData.data?.elderly?.situational?.length ?? 0 > 0,
      files: elderlyData.data?.elderly?.situational,
    },
    {
      id: 2,
      name: "Сум, хорооны Засаг даргын тодорхойлолт",
      isHave: elderlyData.data?.elderly?.definition_governor?.length ?? 0 > 0,
      files: elderlyData.data?.elderly?.definition_governor,
    },
    {
      id: 3,
      name: "Аймаг, дүүргийн засаг даргын захирамж",
      isHave: elderlyData?.data?.social_worker_elderly?.ordinances?.length ?? 0 > 0,
      files: elderlyData?.data?.social_worker_elderly?.ordinances,
    },
    {
      id: 4,
      name: "Хөдөлмөр, халамжийн үйлчилгээний газар, хэлтсийн албан тоот",
      isHave: elderlyData?.data?.social_worker_elderly?.welfare_documents?.length ?? 0 > 0,
      files: elderlyData?.data?.social_worker_elderly?.welfare_documents,
    },
  ];

  return (
    <>
      <div className="mt-5">
        <ITable<DocumentList>
          scroll={false}
          loading={elderlyData.loading}
          dataSource={documentList ?? []}
          total={documentList.length}
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
                    className={`text-base font-bold flex text-center ${record.isHave ? "text-[#344054]" : "text-[#DD695C]"
                      }`}
                  >
                    {value || "-"}
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
          expandable={{
            rowExpandable: (record: any) => record?.files?.length > 0,
            expandedRowRender: (record: any) => (
              <div className="mb-2">
                <ITable
                  dataSource={record?.files || []}
                  className="p-0 m-0 remove-padding-table custom-ant-card-padding-border-remove"
                  id="main-table"
                  columns={[
                    {
                      dataIndex: "original_name",
                      render: (_, record) => (
                        <div className="flex flex-col justify-center">
                          <span className="text-base font-bold flex text-center">
                            {record?.original_name || "-"}
                          </span>
                          <span className="font-normal text-sm text-gray-600">
                            Хэмжээ :
                            <span className="font-bold">
                              {formatKB(record?.file_size || 0, 1)}
                            </span>
                          </span>
                        </div>
                      ),
                    },
                  ]}
                  hidePagination
                  customActions={(record: any) => {
                    return (
                      <div className="flex gap-2 items-center">
                        <div className="p-4 cursor-pointer">
                          <Link
                            to={file.fileToUrl(record?.physical_path as string)}
                            className="p-4 cursor-pointer  text-gray-700"
                            target="blank"
                            download
                          >
                            <AiOutlineEye
                              size={20}
                              className={" text-gray-700"}
                            // onClick={() => setFileOpen(record)}
                            />
                          </Link>
                        </div>
                        <Link
                          to={file.fileToUrl(record?.physical_path as string)}
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
              </div>
            ),
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
                <Button
                  icon={
                    <CloudDownloadOutlined
                      style={{
                        fontSize: 20,
                      }}
                      rev={undefined}
                    />
                  }
                  title="Татах"
                />
              </div>
            }
          >
            <div className="bg-[#F0F2F5] pt-5">
              <iframe
                style={{ border: "none" }}
                src={file.fileToUrl(isFileOpen?.path)}
                width={1050}
                height={850}
                className="mx-12"
              ></iframe>
            </div>
          </Modal>
        )}
      </div>
    </>
  );
};
