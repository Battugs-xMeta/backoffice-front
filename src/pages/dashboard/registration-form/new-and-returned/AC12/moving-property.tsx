import ProForm, { ProFormDigit } from "@ant-design/pro-form";
import { Card, Col, Row } from "antd";
import { FORM_ITEM_RULE } from "config";
import { moneyFormat } from "utils/index";

const MovingProperty = () => {
  return (
    <Card
      title="Хөдлөх хөрөнгө (Төгрөгөөр)"
      className="bg-[#F5F8F8] justify-center"
    >
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <ProFormDigit
            label="Машин, тээврийн хэрэгсэл, тоног төхөөрөмж"
            name={["movable_assets", "vehicles_equipment"]}
            placeholder={"Үнийн дүн"}
            convertValue={(value) => moneyFormat(value)}
          />
        </Col>
        <Col span={12}>
          <ProFormDigit
            label="Хангамжийн материал"
            convertValue={(value) => moneyFormat(value)}
            name={["movable_assets", "supply_materials"]}
            placeholder={"Үнийн дүн"}
          />
        </Col>
      </Row>

      <Row gutter={[24, 24]}>
        <Col span={12}>
          <ProFormDigit
            convertValue={(value) => moneyFormat(value)}
            name={["movable_assets", "bed"]}
            label="Ор"
            placeholder={"Үнийн дүн"}
          />
        </Col>
        <Col span={12}>
          <ProFormDigit
            convertValue={(value) => moneyFormat(value)}
            label="Ширээ"
            name={["movable_assets", "table"]}
            placeholder={"Үнийн дүн"}
          />
        </Col>
      </Row>
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <ProFormDigit
            convertValue={(value) => moneyFormat(value)}
            label="Сандал"
            name={["movable_assets", "chair"]}
            placeholder={"Үнийн дүн"}
          />
        </Col>
        <Col span={12}>
          <ProFormDigit
            convertValue={(value) => moneyFormat(value)}
            label="Мал, амьтад"
            name={["movable_assets", "animal"]}
            placeholder={"Үнийн дүн"}
          />
        </Col>
      </Row>
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <ProForm.Item noStyle shouldUpdate>
            {(form) => {
              return (
                <ProFormDigit
                  placeholder={"Үнийн дүн"}
                  name={["movable_assets", "total"]}
                  label="Нийт"
                  fieldProps={{
                    value:
                      form.getFieldsValue()?.movable_assets
                        ?.vehicles_equipment +
                        form.getFieldsValue()?.movable_assets
                          ?.supply_materials +
                        form.getFieldsValue()?.movable_assets?.bed +
                        form.getFieldsValue()?.movable_assets?.table +
                        form.getFieldsValue()?.movable_assets?.chair +
                        form.getFieldsValue()?.movable_assets?.animal || 0,
                  }}
                  disabled
                  initialValue={0}
                />
              );
            }}
          </ProForm.Item>
        </Col>
        {/* <Col span={12}>
          <ProFormDigit
            convertValue={(value) => moneyFormat(value)}
            name={"total"}
            label="Нийт"
            placeholder={"Үнийн дүн"}
            fieldProps={{
              value: 
            }}
            disabled
          />
        </Col> */}
      </Row>
    </Card>
  );
};

export default MovingProperty;
