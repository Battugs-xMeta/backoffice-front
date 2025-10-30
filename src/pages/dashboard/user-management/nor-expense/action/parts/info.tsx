import { ProFormDigit, ProFormList, ProFormText } from "@ant-design/pro-form";
import { Card, Col, Row } from "antd";
import { FORM_ITEM_RULE } from "config";
import { TbExclamationMark } from "react-icons/tb";
import { NormativeTypeEnum } from "service/finance/type";
import { moneyFormat } from "utils/index";

export const Info = ({ actionRef, formRef, disabledOne }: any) => {
  return (
    <div className="mt-6">
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <ProFormDigit
            name="budget"
            placeholder="1,000,000,000"
            label={"Жилийн батлагдсан төсөв"}
            fieldProps={{
              addonAfter: "₮",
            }}
            convertValue={(value) => moneyFormat(value)}
            rules={FORM_ITEM_RULE()}
          />
        </Col>
      </Row>
      <Row gutter={[24, 24]}>
        <ProFormList
          name={"types"}
          creatorButtonProps={{
            className: "hidden",
          }}
          alwaysShowItemLabel
          actionRef={actionRef}
          actionRender={() => []}
          initialValue={[
            {
              normative_type: NormativeTypeEnum.drug,
              budget: 0,
            },
            {
              normative_type: NormativeTypeEnum.food,
              budget: 0,
            },
            {
              normative_type: NormativeTypeEnum.clothes,
              budget: 0,
            },
          ]}
          rules={[
            {
              validator: (rule, value) => {
                if (
                  formRef.current?.getFieldValue("budget") !==
                  value?.reduce(
                    (acc: number, record: any) => acc + record.budget,
                    0
                  )
                ) {
                  return Promise.reject("Тоо бага байна");
                }
                return Promise.resolve();
              },
              message:
                "Зардлын төрлүүдийн нийлбэр дүн нь жилийн батлагдсан төсөвтэй адил байна",
            },
          ]}
        >
          {(_fields, _index, _, _count) => {
            return (
              <Row gutter={[24, 24]} className="m-0 p-0">
                <Col span={14}>
                  <ProFormText
                    name="normaitve_type"
                    label={"Зардлын төрөл"}
                    disabled={disabledOne}
                    placeholder={
                      (_index === 0 && "Эм бэлдмэл эмнэлгийн хэрэгсэл") ||
                      (_index === 1 && "Хоол хүнс") ||
                      "Нормын хувцас, зөөлөн эдлэл"
                    }
                    key={1}
                  />
                </Col>
                <Col span={10}>
                  <ProFormDigit
                    name="budget"
                    placeholder="1,000,000,0001"
                    label={"Зарцуулах дүн"}
                    fieldProps={{
                      addonAfter: "₮",
                    }}
                    convertValue={(value) => moneyFormat(value)}
                  />
                </Col>
              </Row>
            );
          }}
        </ProFormList>
      </Row>

      <Card className="bg-gray-100 border-gray-300 p-0">
        <div className="flex gap-2">
          <TbExclamationMark size={22} color="gray" />
          <div className="text-gray-500 font-semibold text-sm">
            Зардлын төрлүүдийн нийлбэр дүн нь жилийн батлагдсан төсөвтэй адил
            байна
          </div>
        </div>
      </Card>

      <Row gutter={[24, 24]} className="mt-4">
        <Col span={24}>
          <ProFormText
            name="description"
            placeholder="Энд тайлбар оруулна."
            label={"Тайлбар"}
            rules={FORM_ITEM_RULE()}
          />
        </Col>
      </Row>
    </div>
  );
};
