import ProForm, {
  ProFormDatePicker,
  ProFormDigit,
  ProFormSelect,
} from "@ant-design/pro-form";
import { Card, Col, Row } from "antd";
import { FORM_ITEM_RULE, PROPERTY_TYPE, RESPONSIBILITY_TYPE } from "config";
import dayjs from "dayjs";

const ResponsibilityType = () => {
  return (
    <div>
      <Card title={"Хариуцлагын хэлбэр"} className="bg-[#F5F8F8] ">
        <ProFormDatePicker
          name={"start_date"}
          fieldProps={{
            disabledDate: (current) => {
              return current && current > dayjs().endOf("day");
            },
          }}
          label={"Асрамжийн үйл ажиллагаа явуулж эхэлсэн он, сар, өдөр"}
          rules={FORM_ITEM_RULE()}
          placeholder={"Огноо сонгох"}
        />
        <Row gutter={[24, 24]}>
          <Col span={12} className="w-full">
            <ProFormSelect
              label="Хариуцлагын хэлбэр"
              name={"responsibility_type"}
              options={RESPONSIBILITY_TYPE.map((el) => ({ ...el }))}
              rules={FORM_ITEM_RULE()}
              placeholder={"Сонгоно уу"}
              initialValue={RESPONSIBILITY_TYPE[0].value}
            />
          </Col>
          <Col span={12} className="w-full">
            <ProFormSelect
              label="Өмчийн хэлбэр"
              name={"property_type"}
              options={PROPERTY_TYPE.map((el) => ({ ...el }))}
              rules={FORM_ITEM_RULE()}
              initialValue={PROPERTY_TYPE[0].value}
            />
          </Col>
        </Row>
        <div className="text-base font-semibold mb-4">
          Хүчин чадлын үзүүлэлт
        </div>
        <Row gutter={[24, 24]}>
          <Col span={12} className="w-full">
            <ProFormDigit
              label="Хүлээн авах боломжтой хүний тоо"
              name={"possible_people_number"}
              placeholder={"Тоо хэмжээ"}
              rules={FORM_ITEM_RULE()}
            />
          </Col>
          <Col span={12} className="w-full">
            <ProFormDigit
              name={"bed_count"}
              placeholder={"Тоо хэмжээ"}
              label="Орны тоо"
              rules={FORM_ITEM_RULE()}
            />
          </Col>
        </Row>
        <Row gutter={[24, 24]}>
          <Col span={12} className="w-full">
            <ProFormDigit
              name={"table_count"}
              placeholder={"Тоо хэмжээ"}
              rules={FORM_ITEM_RULE()}
              label="Ширээ"
            />
          </Col>
          <Col span={12} className="w-full">
            <ProFormDigit
              name={"chair_count"}
              placeholder={"Тоо хэмжээ"}
              rules={FORM_ITEM_RULE()}
              label="Сандал"
            />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default ResponsibilityType;
