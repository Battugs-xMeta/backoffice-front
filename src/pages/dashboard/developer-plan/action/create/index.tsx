import { ProFormInstance, ProFormSelect, ProFormTextArea } from "@ant-design/pro-form";
import { IModalForm } from "components/modal";
import { DevelopmentPlanOption } from "config";
import { useRef } from "react";
import developerPlan from "service/developer-plan";
import { PlanList } from "service/developer-plan/type";
import { ActionComponentProps } from "types";

export const CreateForm: React.FC<ActionComponentProps<PlanList>> = ({
  ...rest
}) => {
  const formRef = useRef<ProFormInstance>();

  return (
    <IModalForm
      width={1064}
      onRequest={async (values) => {
        return developerPlan.create(values);
      }}
      formRef={formRef}
      open={rest.open}
      title="Хөгжлийн төлөвлөгөө нэмэх"
      okText="Нэмэх"
      cancelText="Буцах"
      modalProps={{ maskClosable: false, onCancel: rest?.onCancel }}
      onSuccess={() => {
        if (rest?.onFinish) rest?.onFinish()
        formRef.current?.resetFields()
      }}
      initialValues={{
        duration: 1,
      }}
    >
      <ProFormTextArea
        name="structure"
        placeholder={"Дэлгэрэнгүй оруулна уу"}
        label="Бүтэц"
        rules={[
          {
            required: true,
            message: "Энэ талбарийг оруулах шаардлагатай!",
          },
        ]}
      />
      <ProFormTextArea
        name="purpose"
        placeholder={"Дэлгэрэнгүй оруулна уу"}
        label="Зорилт"
        rules={[
          {
            required: true,
            message: "Энэ талбарийг оруулах шаардлагатай!",
          },
        ]}
      />
      <ProFormTextArea
        name="activity"
        placeholder={"Дэлгэрэнгүй оруулна уу"}
        label="Үйл ажиллагаа"
        rules={[
          {
            required: true,
            message: "Энэ талбарийг оруулах шаардлагатай!",
          },
        ]}
      />
      <ProFormSelect
        name="duration"
        placeholder={"Хугацаа"}
        label="Хугацаа"
        options={DevelopmentPlanOption?.map((el) => ({ ...el }))}
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
