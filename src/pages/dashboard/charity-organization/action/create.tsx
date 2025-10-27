import {
  ProFormInstance,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-form";
import { IModalForm } from "components/modal";
import { DevelopmentPlanOption, FORM_ITEM_RULE } from "config";
import { useRef } from "react";
import charityOrganization from "service/charity-organization";
import { CharityOrganizationList } from "service/charity-organization/type";
import developerPlan from "service/developer-plan";
import { PlanList } from "service/developer-plan/type";
import { ActionComponentProps } from "types";

export const CreateForm: React.FC<
  ActionComponentProps<CharityOrganizationList>
> = ({ ...rest }) => {
  const formRef = useRef<ProFormInstance>();

  return (
    <IModalForm
      formRef={formRef}
      width={800}
      onOpenChange={() => formRef.current?.resetFields()}
      onRequest={async (values) => {
        return charityOrganization.create(values);
      }}
      open={rest.open}
      title="Буяны байгууллага бүртгэх"
      okText="Бүртгэх"
      cancelText="Буцах"
      modalProps={{ maskClosable: false, onCancel: rest?.onCancel }}
      onSuccess={rest?.onFinish}
      initialValues={{
        duration: 1,
      }}
    >
      <ProFormText
        name="company_name"
        placeholder={"Заавал оруулна уу"}
        label="Байгууллагын нэр"
        rules={[
          {
            required: true,
            message: "Энэ талбарийг оруулах шаардлагатай!",
          },
        ]}
      />
      <ProFormSelect
        name="phone_numbers"
        className="mupltiple-selecter"
        fieldProps={{
          mode: "tags",
        }}
        rules={[
          {
            validator: (_, value) => {
              if (!value || value.length === 0) {
                return Promise.reject(
                  new Error("Энэ талбар утасны дугаар байх ёстой")
                );
              }
              for (let phoneNumber of value) {
                if (!/^[1-9]{1}[0-9]{7}$/.test(phoneNumber)) {
                  return Promise.reject(
                    new Error("Энэ талбар утасны дугаар байх ёстой")
                  );
                }
              }
              return Promise.resolve();
            },
          },
        ]}
        placeholder={"Дугаар нэмэх"}
        label="Утасны дугаар"
        extra="Утасны дугаараа оруулаад “Enter” дарна уу"
      />
      <ProFormTextArea
        name="Address"
        placeholder={"Дэлгэрэнгүй хаяг"}
        label="Хаяг"
        rules={[
          {
            required: true,
            message: "Энэ талбарийг оруулах шаардлагатай!",
          },
        ]}
      />
    </IModalForm>
  );
};
