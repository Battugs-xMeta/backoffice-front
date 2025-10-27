import ProForm, { ProFormDigit } from "@ant-design/pro-form";
import { Card, Col, Row } from "antd";
import { FORM_ITEM_RULE } from "config";
import { moneyFormat } from "utils/index";

const Expense = () => {
  return (
    <Card title="Зардал" className="bg-[#F5F8F8] justify-center">
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <ProFormDigit
            name={["expenses", "raw_materials"]}
            placeholder={"Үнийн дүн"}
            label="Түүхий эд, материалын зардал"
            convertValue={(value) => moneyFormat(value)}
          />
        </Col>
        <Col span={12}>
          <ProFormDigit
            name={["expenses", "goods_purchased_for_sale"]}
            placeholder={"Үнийн дүн"}
            label="Дахин борлуулахаар худалдан авсан барааны өртөг"
            convertValue={(value) => moneyFormat(value)}
          />
        </Col>
      </Row>
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <ProFormDigit
            name={["expenses", "service"]}
            placeholder={"Үнийн дүн"}
            label="Үйлчилгээний зардал"
            convertValue={(value) => moneyFormat(value)}
          />
        </Col>
        <Col span={12}>
          <ProFormDigit
            name={["expenses", "salary"]}
            placeholder={"Үнийн дүн"}
            label="Нийт цалин хөлс"
            convertValue={(value) => moneyFormat(value)}
          />
        </Col>
      </Row>
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <ProFormDigit
            name={["expenses", "other"]}
            placeholder={"Үнийн дүн"}
            label="Бусад зардал"
            convertValue={(value) => moneyFormat(value)}
          />
        </Col>
        <Col span={12}>
          <ProFormDigit
            name={["expenses", "taxes_and_fees"]}
            placeholder={"Үнийн дүн"}
            label="Татвар, хураамж"
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
                  name={["expenses", "total"]}
                  placeholder={"Үнийн дүн"}
                  label="Нийт зардал"
                  convertValue={(value) =>
                    moneyFormat(
                      form.getFieldValue("expenses")?.raw_materials +
                        form.getFieldValue("expenses")
                          ?.goods_purchased_for_sale +
                        form.getFieldValue("expenses")?.service +
                        form.getFieldValue("expenses")?.salary +
                        form.getFieldValue("expenses")?.other +
                        form.getFieldValue("expenses")?.profit_and_loss +
                        form.getFieldValue("expenses")?.taxes_and_fees
                    )
                  }
                  fieldProps={{
                    value:
                      form.getFieldsValue()?.expenses?.raw_materials +
                        form.getFieldsValue()?.expenses
                          ?.goods_purchased_for_sale +
                        form.getFieldsValue()?.expenses?.service +
                        form.getFieldsValue()?.expenses?.salary +
                        form.getFieldsValue()?.expenses?.other +
                        form.getFieldsValue()?.expenses?.profit_and_loss +
                        form.getFieldsValue()?.expenses?.taxes_and_fees || 0,
                  }}
                  disabled
                  initialValue={0}
                />
              </Col>
            );
          }}
        </ProForm.Item>
        <Col span={12}>
          <ProFormDigit
            name={["expenses", "profit_and_loss"]}
            placeholder={"Үнийн дүн"}
            label="Ашиг/ алдагдал"
            convertValue={(value) => moneyFormat(value)}
          />
        </Col>
      </Row>
    </Card>
  );
};

export default Expense;
