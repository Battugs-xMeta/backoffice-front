import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import ProForm, { ProFormInstance } from "@ant-design/pro-form";
import { PageLoading } from "@ant-design/pro-layout";
import { useRequest } from "ahooks";
import { Button, Card, Col, Row, Spin, Typography, notification } from "antd";
import { UploadButton } from "components/index";
import { AccreditationStatus } from "config";
import dayjs from "dayjs";
import React, { useEffect, useRef } from "react";
import { TbExclamationMark } from "react-icons/tb";
import { Link, useParams } from "react-router-dom";
import accreditation from "service/accreditation";
import file from "service/file";
import { AntdFile } from "types";
import { AccreditationStatusTag } from "utils/utils_func";

const AccreditationUpdate: React.FC<any> = () => {
  const formRef = useRef<
    ProFormInstance<{
      letter_of_request: any;
      resumes_of_employees: any;
      company_profile: any;
      company_certificate: any;
      further_improvement_plan: any;
      conclusion_of_security: any;
      standardized_report: any;
      financial_statement: any;
      activity_report: any;
      year_end_report: any;
    }>
  >();

  const uploadMulti = useRequest(file.uploads, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  const accreditationData = useRequest(accreditation.get, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  const sendRequest = useRequest(accreditation.sendRequest, {
    manual: true,
    onSuccess: () => {
      notification.success({
        message: "Амжилттай хүсэлт илгээлээ",
      });
    },
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  const update = useRequest(accreditation.update, {
    manual: true,
    onSuccess: (res) => {
      notification.success({
        message: "Амжилттай хадгалллаа",
      });
      setTimeout(() => {
        window.location.href = "/dashboard/credentials";
      }, 500);
    },
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  const { id } = useParams();
  useEffect(() => {
    if (id) {
      accreditationData.run(parseInt(id));
    }
  }, [id]);

  const newFileUploads = async (files: any[]) => {
    const oldFileIDs: number[] = [];

    files.map((file) => {
      if (!file?.uid.includes("rc-upload")) {
        oldFileIDs.push(parseInt(file.uid));
      }
    });

    const ids = await uploadMulti
      .runAsync({
        names: files?.reduce<string[]>((acc, record) => {
          if (record?.uid.includes("rc-upload")) {
            acc.push(record.fileName || "");
            return acc;
          }
          return acc;
        }, []),
        files: files?.reduce<string[]>((acc, record) => {
          if (record?.uid.includes("rc-upload")) {
            acc.push(record);
            return acc;
          }
          return acc;
        }, []),
      })
      .then((el: any) => el.map((el: any) => el.id));

    return oldFileIDs.concat(ids);
  };

  const status = accreditationData?.data?.status;
  const approvedDate = accreditationData?.data?.approved_date;
  const updatedAt = accreditationData?.data?.updated_at;
  return (
    <div>
      {accreditationData.loading ? (
        <Spin />
      ) : (
        <>
          <Card
            className={`${
              accreditationData?.data?.status === AccreditationStatus.Rejected
                ? " border-red-300"
                : ""
            }`}
          >
            <div className="flex justify-between">
              <div className="flex gap-5 items-center">
                <Link to="/dashboard/credentials">
                  <Button
                    className="font-semibold"
                    icon={<ArrowLeftOutlined rev="" />}
                    type="default"
                  >
                    Буцах
                  </Button>
                </Link>
                <span className="text-base text-black font-semibold">
                  {accreditationData?.data?.start_year} он
                </span>
                {AccreditationStatusTag(accreditationData?.data?.status || 0)}
              </div>
              <div className="text-base flex gap-2 items-center">
                <div>
                  <Typography.Text className="text-base">
                    {accreditationData?.data?.status !==
                    AccreditationStatus.Temprary ? (
                      <>Илгээсэн: </>
                    ) : (
                      <>Хадгалсан: </>
                    )}
                    <span className="font-semibold">
                      {" "}
                      {dayjs(accreditationData?.data?.updated_at).format(
                        "YYYY-MM-DD"
                      )}
                    </span>
                  </Typography.Text>
                  {accreditationData?.data?.status !==
                    AccreditationStatus.Temprary &&
                    accreditationData?.data?.status !==
                      AccreditationStatus.SentRequest && (
                      <Typography.Text className="text-base ml-3">
                        Шийдвэрлэсэн:{" "}
                        <span className="font-semibold">
                          {status === AccreditationStatus.Approved
                            ? approvedDate
                              ? dayjs(approvedDate).format("YYYY-MM-DD")
                              : "-"
                            : updatedAt
                            ? dayjs(updatedAt).format("YYYY-MM-DD")
                            : "-"}
                        </span>
                      </Typography.Text>
                    )}
                </div>
                <div>
                  {accreditationData.data?.status ===
                    AccreditationStatus.Temprary ||
                  accreditationData?.data?.status ===
                    AccreditationStatus?.Rejected ? (
                    <Button
                      className="ml-4"
                      icon={<ArrowRightOutlined rev="" />}
                      type="primary"
                      onClick={() =>
                        sendRequest.run(accreditationData?.data?.id ?? 0)
                      }
                    >
                      {accreditationData.data?.status ===
                      AccreditationStatus.Temprary
                        ? "Хүсэлт илгээх"
                        : "Дахин илгээх"}
                    </Button>
                  ) : null}
                </div>
              </div>
            </div>
          </Card>
          {accreditationData?.data?.status === AccreditationStatus.Rejected && (
            <Card className="bg-red-100 border-red-300 mt-6">
              <div className="flex gap-2">
                <TbExclamationMark size={20} color="red" />
                <div className="text-red-500 font-semibold">Шалтгаан</div>
              </div>
              <p className="text-[#475467] ml-7">
                {accreditationData?.data?.return_description || "-"}
              </p>
              {/* <div className="">{accreditationData?.data?.}</div> */}
            </Card>
          )}
          {uploadMulti.loading && update.loading ? (
            <PageLoading />
          ) : (
            <ProForm<{
              letter_of_request: any;
              resumes_of_employees: any;
              company_profile: any;
              company_certificate: any;
              further_improvement_plan: any;
              conclusion_of_security: any;
              standardized_report: any;
              financial_statement: any;
              activity_report: any;
              year_end_report: any;
            }>
              onFinish={async (values) => {
                values.letter_of_request = await newFileUploads(
                  values.letter_of_request
                );
                values.resumes_of_employees = await newFileUploads(
                  values.resumes_of_employees
                );
                values.company_profile = await newFileUploads(
                  values.company_profile
                );
                values.company_certificate = await newFileUploads(
                  values.company_certificate
                );
                values.further_improvement_plan = await newFileUploads(
                  values.further_improvement_plan
                );
                values.conclusion_of_security = await newFileUploads(
                  values.conclusion_of_security
                );
                values.standardized_report = await newFileUploads(
                  values.standardized_report
                );
                values.financial_statement = await newFileUploads(
                  values.financial_statement
                );
                values.activity_report = await newFileUploads(
                  values.activity_report
                );
                values.year_end_report = await newFileUploads(
                  values.year_end_report
                );

                if (accreditationData?.data?.id) {
                  update.run(values, accreditationData?.data?.id);
                }
              }}
              loading={accreditationData.loading}
              formRef={formRef}
              params={{ id: "100" }}
              formKey="base-form-use-demo"
              initialValues={{
                company_certificate:
                  accreditationData.data?.company_certificate.reduce<
                    AntdFile[]
                  >((acc, record) => {
                    acc.push({
                      uid: record?.id.toString(),
                      name: record.original_name,
                      fileName: record.original_name,
                      status: "done",
                      url: `${import.meta.env.VITE_FILE_GET_URL}${
                        record.physical_path
                      }`,
                      response: "done",
                      size: record.file_size,
                    });
                    return acc;
                  }, []),
                company_profile: accreditationData.data?.company_profile.reduce<
                  AntdFile[]
                >((acc, record) => {
                  acc.push({
                    uid: record?.id.toString(),
                    name: record.original_name,
                    fileName: record.original_name,
                    status: "done",
                    url: `${import.meta.env.VITE_FILE_GET_URL}${
                      record.physical_path
                    }`,
                    response: "done",
                    size: record.file_size,
                  });
                  return acc;
                }, []),
                conclusion_of_security:
                  accreditationData.data?.conclusion_of_security.reduce<
                    AntdFile[]
                  >((acc, record) => {
                    acc.push({
                      uid: record?.id.toString(),
                      name: record.original_name,
                      fileName: record.original_name,
                      status: "done",
                      url: `${import.meta.env.VITE_FILE_GET_URL}${
                        record.physical_path
                      }`,
                      response: "done",
                      size: record.file_size,
                    });
                    return acc;
                  }, []),
                financial_statement:
                  accreditationData.data?.financial_statement.reduce<
                    AntdFile[]
                  >((acc, record) => {
                    acc.push({
                      uid: record?.id.toString(),
                      name: record.original_name,
                      fileName: record.original_name,
                      status: "done",
                      url: `${import.meta.env.VITE_FILE_GET_URL}${
                        record.physical_path
                      }`,
                      response: "done",
                      size: record.file_size,
                    });
                    return acc;
                  }, []),
                further_improvement_plan:
                  accreditationData.data?.further_improvement_plan.reduce<
                    AntdFile[]
                  >((acc, record) => {
                    acc.push({
                      uid: record?.id.toString(),
                      name: record.original_name,
                      fileName: record.original_name,
                      status: "done",
                      url: `${import.meta.env.VITE_FILE_GET_URL}${
                        record.physical_path
                      }`,
                      response: "done",
                      size: record.file_size,
                    });
                    return acc;
                  }, []),
                letter_of_request:
                  accreditationData.data?.letter_of_request.reduce<AntdFile[]>(
                    (acc, record) => {
                      acc.push({
                        uid: record?.id.toString(),
                        name: record.original_name,
                        fileName: record.original_name,
                        status: "done",
                        url: `${import.meta.env.VITE_FILE_GET_URL}${
                          record.physical_path
                        }`,
                        response: "done",
                        size: record.file_size,
                      });
                      return acc;
                    },
                    []
                  ),
                resumes_of_employees:
                  accreditationData.data?.resumes_of_employees.reduce<
                    AntdFile[]
                  >((acc, record) => {
                    acc.push({
                      uid: record?.id.toString(),
                      name: record.original_name,
                      fileName: record.original_name,
                      status: "done",
                      url: `${import.meta.env.VITE_FILE_GET_URL}${
                        record.physical_path
                      }`,
                      response: "done",
                      size: record.file_size,
                    });
                    return acc;
                  }, []),
                standardized_report:
                  accreditationData.data?.standardized_report.reduce<
                    AntdFile[]
                  >((acc, record) => {
                    acc.push({
                      uid: record?.id.toString(),
                      name: record.original_name,
                      fileName: record.original_name,
                      status: "done",
                      url: `${import.meta.env.VITE_FILE_GET_URL}${
                        record.physical_path
                      }`,
                      response: "done",
                      size: record.file_size,
                    });
                    return acc;
                  }, []),
                year_end_report: accreditationData.data?.year_end_report.reduce<
                  AntdFile[]
                >((acc, record) => {
                  acc.push({
                    uid: record?.id.toString(),
                    name: record.original_name,
                    fileName: record.original_name,
                    status: "done",
                    url: `${import.meta.env.VITE_FILE_GET_URL}${
                      record.physical_path
                    }`,
                    response: "done",
                    size: record.file_size,
                  });
                  return acc;
                }, []),
                activity_report: accreditationData.data?.activity_report.reduce<
                  AntdFile[]
                >((acc, record) => {
                  acc.push({
                    uid: record?.id.toString(),
                    name: record.original_name,
                    fileName: record.original_name,
                    status: "done",
                    url: `${import.meta.env.VITE_FILE_GET_URL}${
                      record.physical_path
                    }`,
                    response: "done",
                    size: record.file_size,
                  });
                  return acc;
                }, []),
              }}
              title="Магадлан итгэмжлэх хүсэлтийн маягт"
              autoFocusFirstInput
              submitter={{
                render: ({ submit }) => {
                  return (
                    <div className="mt-5 float-right	">
                      <div className="flex items-center gap-1">
                        <Button
                          size="large"
                          type="primary"
                          loading={uploadMulti.loading || update.loading}
                          onClick={() => formRef.current?.submit()}
                        >
                          Түр хадгалах
                        </Button>
                      </div>
                    </div>
                  );
                },
              }}
            >
              <Card className="mt-5">
                <span className="text-[20px] font-semibold">
                  Магадлан итгэмжлэх хүсэлтийн маягт
                </span>

                <Row gutter={10} className="mt-5">
                  <Col span={12}>
                    <UploadButton
                      required
                      name={"letter_of_request"}
                      label="Магадлан итгэмжлэлд орохыг хүссэн албан бичиг"
                      extra="PNG, JPG, PDF (хэмжээ: 800x400px)"
                    />
                  </Col>
                  <Col span={12}>
                    <UploadButton
                      required
                      name={"resumes_of_employees"}
                      label="Ажилтан, албан хаагчдын дэлгэрэнгүй анкет"
                      extra="PNG, JPG, PDF (хэмжээ: 800x400px)"
                    />
                  </Col>
                  <Col span={12}>
                    <UploadButton
                      required
                      name={"company_profile"}
                      label="Байгууллагын танилцуулга"
                      extra="PNG, JPG, PDF (хэмжээ: 800x400px)"
                    />
                  </Col>
                  <Col span={12}>
                    <UploadButton
                      required
                      name={"company_certificate"}
                      label="Байгууллагын гэрчилгээний хуулбар"
                      extra="PNG, JPG, PDF (хэмжээ: 800x400px)"
                    />
                  </Col>

                  <Col span={12}>
                    <UploadButton
                      required
                      name={"further_improvement_plan"}
                      label="Цаашид үйл ажиллагаа сайжруулах чиглэсэн төлөвлөгөө"
                      extra="PNG, JPG, PDF (хэмжээ: 800x400px)"
                    />
                  </Col>
                  <Col span={12}>
                    <UploadButton
                      required
                      name={"conclusion_of_security"}
                      label="Нийгмийн хамгааллын хяналтын улсын байцаагчийн дүгнэлт"
                      extra="PNG, JPG, PDF (хэмжээ: 800x400px)"
                    />
                  </Col>
                </Row>
              </Card>

              <Card className="mt-5">
                <span className="text-[20px] font-semibold">Тайлан</span>

                <Row gutter={10} className="mt-5">
                  <Col span={12}>
                    <UploadButton
                      required
                      name={"standardized_report"}
                      label="Асрамжийн газарт мөрдөгдөж буй стандартын шаардлагын хэрэгжилтийн тайлан"
                      extra="PNG, JPG, PDF (хэмжээ: 800x400px)"
                    />
                  </Col>
                  <Col span={12}>
                    <UploadButton
                      required
                      name={"financial_statement"}
                      label="Санхүүгийн баталгаажсан тайлан"
                      extra="PNG, JPG, PDF (хэмжээ: 800x400px)"
                    />
                  </Col>
                  <Col span={12}>
                    <UploadButton
                      required
                      name={"activity_report"}
                      label="Магадлан итгэмжлэл хүчинтэй хугацааны үйл ажиллагааны тайлан"
                      extra="PNG, JPG, PDF (хэмжээ: 800x400px)"
                    />
                  </Col>

                  <Col span={12}>
                    <UploadButton
                      required
                      name={"year_end_report"}
                      label="Жилийн эцсийн тайлан"
                      extra="PNG, JPG, PDF (хэмжээ: 800x400px)"
                    />
                  </Col>
                </Row>
              </Card>
            </ProForm>
          )}
        </>
      )}
    </div>
  );
};

export default AccreditationUpdate;
