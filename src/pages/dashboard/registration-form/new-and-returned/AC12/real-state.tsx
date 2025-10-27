import ProForm, { ProFormDigit } from "@ant-design/pro-form";
import { Card, Col, Row } from "antd";
import { FORM_ITEM_RULE } from "config";
import { moneyFormat } from "utils/index";

const RealState = () => {
  return (
    <Card
      title="Үл хөдлөх хөрөнгө (Төгрөгөөр)"
      className="bg-[#F5F8F8] justify-center"
    >
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <ProFormDigit
            name={["real_estate", "residential"]}
            placeholder={"Үнийн дүн"}
            label="Орон сууцны барилга"
            convertValue={(value) => moneyFormat(value)}
          />
        </Col>
        <Col span={12}>
          <ProFormDigit
            name={["real_estate", "non_residential"]}
            placeholder={"Үнийн дүн"}
            label="Орон сууцны бус барилга"
            convertValue={(value) => moneyFormat(value)}
          />
        </Col>
      </Row>
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <ProFormDigit
            name={["real_estate", "land"]}
            placeholder={"Үнийн дүн"}
            label="Газар"
            convertValue={(value) => moneyFormat(value)}
          />
        </Col>
        <Col span={12}>
          <ProFormDigit
            name={["real_estate", "equipment"]}
            placeholder={"Үнийн дүн"}
            convertValue={(value) => moneyFormat(value)}
            label="Тоног төхөөрөмж"
            shouldUpdate
          />
        </Col>
      </Row>
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <ProFormDigit
            name={["real_estate", "furniture"]}
            placeholder={"Үнийн дүн"}
            label="Тавилга, эд хогшил"
            convertValue={(value) => moneyFormat(value)}
          />
        </Col>
        <Col span={12}>
          <ProForm.Item noStyle shouldUpdate>
            {(form) => {
              return (
                <ProFormDigit
                  placeholder={"Үнийн дүн"}
                  name={["real_estate", "total"]}
                  label="Нийт"
                  fieldProps={{
                    value:
                      form.getFieldsValue()?.real_estate?.furniture +
                        form.getFieldsValue()?.real_estate?.equipment +
                        form.getFieldsValue()?.real_estate?.land +
                        form.getFieldsValue()?.real_estate?.non_residential +
                        form.getFieldsValue()?.real_estate?.residential || 0,
                  }}
                  disabled
                  initialValue={0}
                />
              );
            }}
          </ProForm.Item>
        </Col>
      </Row>
    </Card>
  );
};

export default RealState;
