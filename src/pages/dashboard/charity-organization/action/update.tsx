import {
  ProFormInstance,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-form";
import { IModalForm } from "components/modal";
import { DevelopmentPlanOption } from "config";
import { useEffect, useRef } from "react";
import charityOrganization from "service/charity-organization";
import { CharityOrganizationList } from "service/charity-organization/type";
import developerPlan from "service/developer-plan";
import { PlanList } from "service/developer-plan/type";
import { ActionComponentProps } from "types";

export const UpdateForm: React.FC<
  ActionComponentProps<CharityOrganizationList>
> = ({ onCancel, onFinish, open, detail }) => {
  const formRef = useRef<ProFormInstance>();
  useEffect(() => {
    if (open) {
      formRef.current?.setFieldsValue({
        ...detail,
        company_name: detail?.company_name ?? undefined,
        phone_numbers: detail?.phone_numbers ?? undefined,
        Address: detail?.address ?? undefined,
      });
    }
  }, [open]);
  return (
    <IModalForm
      formRef={formRef}
      onOpenChange={() => formRef.current?.resetFields()}
      width={800}
      onRequest={async (values) => {
        return charityOrganization.update(values, detail?.id || 0);
      }}
      open={open}
      title="Буяны байгууллага засах"
      okText="Засах"
      cancelText="Буцах"
      modalProps={{ maskClosable: false, onCancel: onCancel }}
      onSuccess={onFinish}
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
        fieldProps={{
          mode: "tags",
        }}
        placeholder={"Дугаар нэмэх"}
        label="Утасны дугаар"
        extra="Утасны дугаараа оруулаад “Enter” дарна уу"
        rules={[
          {
            required: true,
            message: "Энэ талбарийг оруулах шаардлагатай!",
          },
        ]}
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
