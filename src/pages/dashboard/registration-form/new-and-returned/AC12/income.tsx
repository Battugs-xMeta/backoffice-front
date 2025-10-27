import ProForm, { ProFormDigit } from "@ant-design/pro-form";
import { Card, Col, Row } from "antd";
import { FORM_ITEM_RULE } from "config";
import { moneyFormat } from "utils/index";

const Income = () => {
  return (
    <Card title="Орлого (Төгрөгөөр)" className="bg-[#F5F8F8] justify-center">
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <ProFormDigit
            name={["income", "sales_revenue"]}
            label="Борлуулалтын орлого"
            placeholder={"Үнийн дүн"}
            convertValue={(value) => moneyFormat(value)}
          />
        </Col>
        <Col span={12}>
          <ProFormDigit
            label="Улсын төсвөөс авсан татаас"
            name={["income", "subsidy_from_government"]}
            placeholder={"Үнийн дүн"}
            convertValue={(value) => moneyFormat(value)}
          />
        </Col>
      </Row>

      <Row gutter={[24, 24]}>
        <Col span={12}>
          <ProFormDigit
            name={["income", "non_core"]}
            label="Үндсэн бус үйл ажиллагааны орлого"
            placeholder={"Үнийн дүн"}
            convertValue={(value) => moneyFormat(value)}
          />
        </Col>
        <Col span={12}>
          <ProFormDigit
            name={["income", "other"]}
            placeholder={"Үнийн дүн"}
            label="Бусад орлого (Тодорхойлж бичих)"
            convertValue={(value) => moneyFormat(value)}
          />
        </Col>
      </Row>

      <Row gutter={[24, 24]}>
        <ProForm.Item noStyle shouldUpdate>
          {(form) => {
            return (
              <Col span={12}>
                <ProFormDigit
                  placeholder={"Үнийн дүн"}
                  name={["income", "total"]}
                  label="Нийт орлого"
                  convertValue={(value) =>
                    moneyFormat(
                      form.getFieldValue("income")?.sales_revenue +
                        form.getFieldValue("income")?.subsidy_from_government +
                        form.getFieldValue("income")?.non_core +
                        form.getFieldValue("income")?.other
                    )
                  }
                  fieldProps={{
                    value:
                      form.getFieldsValue()?.income?.other +
                      form.getFieldsValue()?.income?.non_core +
                      form.getFieldsValue()?.income?.subsidy_from_government +
                      form.getFieldsValue()?.income?.sales_revenue,
                  }}
                  disabled
                  initialValue={0}
                />
              </Col>
            );
          }}
        </ProForm.Item>
      </Row>
    </Card>
  );
};

export default Income;
