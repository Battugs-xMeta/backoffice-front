import { CloudDownloadOutlined } from "@ant-design/icons";
import { useRequest } from "ahooks";
import {
  Button,
  Card,
  Flex,
  Spin,
  Table,
  TableColumnsType,
  notification,
} from "antd";
import Check from "assets/icons/report/check.svg";
import { ITable } from "components/table";
import React, { useEffect, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { FaArrowLeft } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import accreditation from "service/accreditation";
import file from "service/file";
import { formatKB } from "utils/index";

const AccreditationView: React.FC = () => {
  const { id } = useParams();
  const [docs, setDocs] = useState<any[]>([]);

  const accreditationData = useRequest(accreditation.get, {
    manual: true,
    onSuccess: (res) => {
      const tmpDocs: any = [
        {
          title: "Тайлан",
          list: [
            {
              name: "Үйл ажиллагааны тайлан",
              chidrens: res?.activity_report,
            },
            {
              name: "Санхүүгийн баталгаажсан тайлан",
              chidrens: res?.financial_statement,
            },
            {
              name: "Стандартын шаардлагын хэрэгжилт",
              chidrens: res?.standardized_report,
            },
            {
              name: "Тайлан",
              chidrens: res?.year_end_report,
            },
          ],
        },
        {
          title: "Магадлан итгэмжлэх хүсэлтийн маягт",
          list: [
            {
              name: "Магадлан итгэмжлэлд орохыг хүссэн албан бичиг",
              chidrens: res?.letter_of_request,
            },
            {
              name: "Ажилтан, албан хаагчдын дэлгэрэнгүй анкет",
              chidrens: res?.resumes_of_employees,
            },
            {
              name: "Байгууллагын танилцуулга",
              chidrens: res?.company_profile,
            },
            {
              name: "Байгууллагын гэрчилгээний хуулбар",
              chidrens: res?.company_certificate,
            },
            {
              name: "Үйл ажиллагааны төлөвлөгөө",
              chidrens: res?.further_improvement_plan,
            },
            {
              name: "Улсын байцаагчийн дүгнэлт",
              chidrens: res?.conclusion_of_security,
            },
          ],
        },
      ];

      setDocs(tmpDocs);
    },
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  useEffect(() => {
    if (id) {
      accreditationData.run(parseInt(id));
    }
  }, [id]);

  const columns: TableColumnsType<any> = [
    {
      title: "№",
      dataIndex: "id",
      key: "index",
      render(value, record, index) {
        return index + 1;
      },
    },
    { title: "Файлууд", dataIndex: "name", key: "name" },
    {
      title: "Байгаа эсэх",
      dataIndex: "is_have",
      key: "is_have",
      align: "center",
      width: 100,
      render(value, record, index) {
        return record.chidrens?.length > 0 ? (
          <Flex justify="center" align="center">
            {" "}
            <img src={Check} alt="none" />
          </Flex>
        ) : null;
      },
    },
  ];
  return (
    <div>
      {accreditationData.loading && docs.length > 0 ? (
        <Flex align="center" justify="center">
          <Spin />
        </Flex>
      ) : (
        <>
          <Card className="mt-5 flex flex-col">
            <Link to="/dashboard/credentials">
              <Button
                className="text-sm items-center"
                icon={<FaArrowLeft size={12} />}
                // onClick={() => onCancel && onCancel()}
              >
                Буцах
              </Button>
            </Link>
            <div className="text-[20px] font-semibold mt-2">
              Магадлан итгэмжлэх хүсэлтийн маягт
            </div>

            {docs.map((doc) => {
              return (
                <Table
                  key={doc?.title}
                  title={() => (
                    <div className="font-semibold text-base">{doc?.title}</div>
                  )}
                  columns={columns}
                  rowKey={"name"}
                  pagination={false}
                  expandable={{
                    rowExpandable: (record) => record.name !== "Not Expandable",
                    expandedRowRender: (record) => (
                      <p style={{ marginTop: 0 }}>
                        {
                          <ITable
                            className="p-0 m-0 remove-padding-table custom-ant-card-padding-border-remove"
                            id="main-table"
                            hidePagination
                            size="small"
                            showHeader={false}
                            dataSource={record.chidrens}
                            columns={[
                              { title: "", dataIndex: "", key: "x" },
                              {
                                title: "Нэр",
                                dataIndex: "name",
                                key: "name",
                                render(value, record, index) {
                                  return (
                                    <div className="flex flex-col">
                                      <span className="font-semibold">
                                        {record?.original_name || "Файл"}
                                      </span>
                                      <span>
                                        Хэмжээ:{" "}
                                        <span className="font-semibold">
                                          {formatKB(record?.file_size, 2)}
                                        </span>
                                      </span>
                                    </div>
                                  );
                                },
                              },
                            ]}
                            customActions={(record: any) => {
                              return (
                                <div className="flex gap-2 items-center">
                                  <div className="p-4 cursor-pointer">
                                    <Link
                                      to={file.fileToUrl(
                                        record?.physical_path as string
                                      )}
                                      className="p-4 cursor-pointer  text-gray-700"
                                      target="blank"
                                      download
                                    >
                                      <AiOutlineEye
                                        size={20}
                                        className={" text-gray-700"}
                                      />
                                    </Link>
                                  </div>
                                  <Link
                                    to={file.fileToUrl(
                                      record?.physical_path as string
                                    )}
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
                        }
                      </p>
                    ),
                  }}
                  dataSource={doc?.list || []}
                />
              );
            })}
          </Card>
        </>
      )}
    </div>
  );
};

export default AccreditationView;
