import { ProFormDigit, ProFormList, ProFormText } from "@ant-design/pro-form";
import { Card, Col, Row } from "antd";
import { FORM_ITEM_RULE } from "config";
import { TbExclamationMark } from "react-icons/tb";
import { NormativeTypeEnum } from "service/finance/type";
import { moneyFormat } from "utils/index";

export const UpdateInfo = ({ actionRef, formRef }: any) => {
  return (
    <div className="mt-6">
      <Row gutter={[24, 24]} className="">
        <Col span={24}>
          <ProFormDigit
            name="budget"
            placeholder="1,000,000,000"
            label={"Жилийн батлагдсан төсөв"}
            fieldProps={{
              addonAfter: "₮",
              //   className: "ml-[12px] pr-[24px]",
            }}
            convertValue={(value) => moneyFormat(value)}
            rules={FORM_ITEM_RULE()}
          />
        </Col>
      </Row>

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
            <ProFormDigit
              name="budget"
              placeholder="1,000,000,0001"
              label={
                (_index === 0 && "Эм бэлдмэл эмнэлгийн хэрэгслийн төсөв") ||
                (_index === 1 && "Хоол хүнсний төсөв") ||
                "Нормын хувцас, зөөлөн эдлэлийн төсөв"
              }
              fieldProps={{
                addonAfter: "₮",
              }}
              convertValue={(value) => moneyFormat(value)}
            />
          );
        }}
      </ProFormList>

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
