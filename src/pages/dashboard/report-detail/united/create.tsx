import { ProFormDigit, ProFormInstance } from "@ant-design/pro-form";
import { Col, Row, message } from "antd";
import { IModalForm } from "components/modal";
import { useEffect, useRef } from "react";
import {
  ReportHalfYearInterface,
  ReportMonthlyInterface,
} from "service/report/types";
import { ActionComponentProps } from "types";

export const Create = ({
  open,
  onCancel,
  onFinish,
}: ActionComponentProps<ReportMonthlyInterface | ReportHalfYearInterface>) => {
  const formRef = useRef<ProFormInstance>();

  useEffect(() => {
    formRef.current?.resetFields();
  }, [open]);

  return (
    <IModalForm
      open={open}
      modalProps={{ maskClosable: false, onCancel }}
      okText="Үүсгэх"
      formRef={formRef}
      title="Нэгдсэн мэдээ"
      onSuccess={() => {
        onFinish?.();
        message.success("Амжилттай үүсгэлээ");
        return;
      }}
      onRequest={async (values) => {
        return await Promise.resolve();
      }}
    >
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <ProFormDigit
            name={"total_spend_money"}
            label="Нийт зарцуулсан зардал мян.төг"
            placeholder={"Тоон тэмдэгт оруулна уу"}
          />
        </Col>
        <Col span={12}>
          <ProFormDigit
            name={"total_spend_money_female"}
            label="Нийт зарцуулсан зардал мян.төг / эмэгтэй / "
            placeholder={"Тоон тэмдэгт оруулна уу"}
          />
        </Col>
      </Row>

      <Row gutter={[24, 24]}>
        <Col span={12}>
          <ProFormDigit
            name={"elder_spent_money"}
            label="Ахмад настан зарцуулсан зардал мян.төг"
            placeholder={"Тоон тэмдэгт оруулна уу"}
          />
        </Col>
        <Col span={12}>
          <ProFormDigit
            name={"elder_spent_money_female"}
            label="Зарцуулсан зардал мян.төг / эмэгтэй /"
            placeholder={"Тоон тэмдэгт оруулна уу"}
          />
        </Col>
      </Row>
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <ProFormDigit
            name={"disably_spent_money"}
            placeholder={"Тоон тэмдэгт оруулна уу"}
            label="Хөгжлийн бэрхшээлтэй иргэн зарцуулсан зардал мян.төг"
          />
        </Col>
        <Col span={12}>
          <ProFormDigit
            name={"disably_spent_money_female"}
            placeholder={"Тоон тэмдэгт оруулна уу"}
            label="Хөгжлийн бэрхшээлтэй иргэн зарцуулсан зардал мян.төг / эмэгтэй /"
          />
        </Col>
      </Row>
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <ProFormDigit
            name={"resident_spent_money"}
            placeholder={"Тоон тэмдэгт оруулна уу"}
            label="Хамрагдсан иргэн"
          />
        </Col>
        <Col span={12}>
          <ProFormDigit
            placeholder={"Тоон тэмдэгт оруулна уу"}
            name={"resident_spent_money_female"}
            label="Хамрагдсан иргэн / эмэгтэй /"
          />
        </Col>
      </Row>
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <ProFormDigit
            name={"elder"}
            label="Ахмад настан"
            placeholder={"Тоон тэмдэгт оруулна уу"}
          />
        </Col>
        <Col span={12}>
          <ProFormDigit
            name={"elder_female"}
            label="Ахмад настан / эмэгтэй /"
            placeholder={"Тоон тэмдэгт оруулна уу"}
          />
        </Col>
      </Row>
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <ProFormDigit
            name={"disability"}
            label="Хөгжлийн бэрхшээлтэй иргэн"
            placeholder={"Тоон тэмдэгт оруулна уу"}
          />
        </Col>
        <Col span={12}>
          <ProFormDigit
            name={"disability_female"}
            placeholder={"Тоон тэмдэгт оруулна уу"}
            label="Хөгжлийн бэрхшээлтэй иргэн / эмэгтэй /"
          />
        </Col>
      </Row>
    </IModalForm>
  );
};
