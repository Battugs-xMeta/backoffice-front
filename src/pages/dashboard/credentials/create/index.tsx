import { ArrowLeftOutlined } from "@ant-design/icons";
import ProForm, { ProFormInstance } from "@ant-design/pro-form";
import { PageLoading } from "@ant-design/pro-layout";
import { useRequest } from "ahooks";
import { Button, Card, Col, Row, UploadFile, notification } from "antd";
import { UploadButton } from "components/index";
import dayjs from "dayjs";
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import accreditation from "service/accreditation";
import file from "service/file";

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const AccreditationCreate: React.FC<any> = () => {
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

  const create = useRequest(accreditation.create, {
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

  return (
    <div className="mt-4">
      <Card>
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
          <span className="font-base text-black font-semibold">
            {dayjs().year()} он
          </span>
        </div>
      </Card>
      {uploadMulti.loading && create.loading ? (
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
          loading={uploadMulti.loading && create.loading}
          onFinish={async (values) => {
            if (
              values.letter_of_request &&
              values.letter_of_request?.length > 0
            ) {
              values.letter_of_request = await uploadMulti
                .runAsync({
                  names: values.letter_of_request?.map(
                    (el: UploadFile) => el?.name
                  ),
                  files: values.letter_of_request,
                })
                .then((el: any) => el.map((el: any) => el.id));
            }
            if (
              values.resumes_of_employees &&
              values.resumes_of_employees?.length > 0
            ) {
              values.resumes_of_employees = await uploadMulti
                .runAsync({
                  names: values.resumes_of_employees?.map(
                    (el: UploadFile) => el?.name
                  ),
                  files: values.resumes_of_employees,
                })
                .then((el: any) => el.map((el: any) => el.id));
            }
            if (values.company_profile && values.company_profile?.length > 0) {
              values.company_profile = await uploadMulti
                .runAsync({
                  names: values.company_profile?.map(
                    (el: UploadFile) => el?.name
                  ),
                  files: values.company_profile,
                })
                .then((el: any) => el.map((el: any) => el.id));
            }
            if (
              values.company_certificate &&
              values.company_certificate?.length > 0
            ) {
              values.company_certificate = await uploadMulti
                .runAsync({
                  names: values.company_certificate?.map(
                    (el: UploadFile) => el?.name
                  ),
                  files: values.company_certificate,
                })
                .then((el: any) => el.map((el: any) => el.id));
            }
            if (
              values.further_improvement_plan &&
              values.further_improvement_plan?.length > 0
            ) {
              values.further_improvement_plan = await uploadMulti
                .runAsync({
                  names: values.further_improvement_plan?.map(
                    (el: UploadFile) => el?.name
                  ),
                  files: values.further_improvement_plan,
                })
                .then((el: any) => el.map((el: any) => el.id));
            }
            if (
              values.conclusion_of_security &&
              values.conclusion_of_security?.length > 0
            ) {
              values.conclusion_of_security = await uploadMulti
                .runAsync({
                  names: values.conclusion_of_security?.map(
                    (el: UploadFile) => el?.name
                  ),
                  files: values.conclusion_of_security,
                })
                .then((el: any) => el.map((el: any) => el.id));
            }
            if (
              values.standardized_report &&
              values.standardized_report?.length > 0
            ) {
              values.standardized_report = await uploadMulti
                .runAsync({
                  names: values.standardized_report?.map(
                    (el: UploadFile) => el?.name
                  ),
                  files: values.standardized_report,
                })
                .then((el: any) => el.map((el: any) => el.id));
            }
            if (
              values.financial_statement &&
              values.financial_statement?.length > 0
            ) {
              values.financial_statement = await uploadMulti
                .runAsync({
                  names: values.financial_statement?.map(
                    (el: UploadFile) => el?.name
                  ),
                  files: values.financial_statement,
                })
                .then((el: any) => el.map((el: any) => el.id));
            }
            if (values.activity_report && values.activity_report?.length > 0) {
              values.activity_report = await uploadMulti
                .runAsync({
                  names: values.activity_report?.map(
                    (el: UploadFile) => el?.name
                  ),
                  files: values.activity_report,
                })
                .then((el: any) => el.map((el: any) => el.id));
            }
            if (values.year_end_report && values.year_end_report?.length > 0) {
              values.year_end_report = await uploadMulti
                .runAsync({
                  names: values.year_end_report?.map(
                    (el: UploadFile) => el?.name
                  ),
                  files: values.year_end_report,
                })
                .then((el: any) => el.map((el: any) => el.id));
            }

            create.run(values);
          }}
          formRef={formRef}
          formKey="base-form-use-demo"
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
                      loading={uploadMulti.loading || create.loading}
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
                  accept="image/*,.pdf"
                />
              </Col>
              <Col span={12}>
                <UploadButton
                  required
                  name={"resumes_of_employees"}
                  label="Ажилтан, албан хаагчдын дэлгэрэнгүй анкет"
                  extra="PNG, JPG, PDF (хэмжээ: 800x400px)"
                  accept="image/*,.pdf"
                />
              </Col>
              <Col span={12}>
                <UploadButton
                  required
                  name={"company_profile"}
                  label="Байгууллагын танилцуулга"
                  extra="PNG, JPG, PDF (хэмжээ: 800x400px)"
                  accept="image/*,.pdf"
                />
              </Col>
              <Col span={12}>
                <UploadButton
                  required
                  name={"company_certificate"}
                  label="Байгууллагын гэрчилгээний хуулбар"
                  extra="PNG, JPG, PDF (хэмжээ: 800x400px)"
                  accept="image/*,.pdf"
                />
              </Col>

              <Col span={12}>
                <UploadButton
                  required
                  name={"further_improvement_plan"}
                  label="Цаашид үйл ажиллагаа сайжруулах чиглэсэн төлөвлөгөө"
                  extra="PNG, JPG, PDF (хэмжээ: 800x400px)"
                  accept="image/*,.pdf"
                />
              </Col>
              <Col span={12}>
                <UploadButton
                  required
                  name={"conclusion_of_security"}
                  label="Нийгмийн хамгааллын хяналтын улсын байцаагчийн дүгнэлт"
                  extra="PNG, JPG, PDF (хэмжээ: 800x400px)"
                  accept="image/*,.pdf"
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
                  accept="image/*,.pdf"
                />
              </Col>
              <Col span={12}>
                <UploadButton
                  required
                  name={"financial_statement"}
                  label="Санхүүгийн баталгаажсан тайлан"
                  extra="PNG, JPG, PDF (хэмжээ: 800x400px)"
                  accept="image/*,.pdf"
                />
              </Col>
              <Col span={12}>
                <UploadButton
                  required
                  name={"activity_report"}
                  label="Магадлан итгэмжлэл хүчинтэй хугацааны үйл ажиллагааны тайлан"
                  extra="PNG, JPG, PDF (хэмжээ: 800x400px)"
                  accept="image/*,.pdf"
                />
              </Col>

              <Col span={12}>
                <UploadButton
                  required
                  name={"year_end_report"}
                  label="Жилийн эцсийн тайлан"
                  extra="PNG, JPG, PDF (хэмжээ: 800x400px)"
                  accept="image/*,.pdf"
                />
              </Col>
            </Row>
          </Card>
        </ProForm>
      )}
    </div>
  );
};

export default AccreditationCreate;
