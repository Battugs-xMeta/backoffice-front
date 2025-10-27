import {
  ProFormInstance,
  ProFormSelect,
  ProFormTextArea,
} from "@ant-design/pro-form";
import { IModalForm } from "components/modal";
import { useEffect, useRef } from "react";
import { ActionComponentProps } from "types";
import { PlanList } from "service/developer-plan/type";
import developerPlan from "service/developer-plan";
import { DevelopmentPlanOption } from "config";

export const EditForm = ({
  onCancel,
  onFinish,
  open,
  detail,
}: ActionComponentProps<PlanList>) => {
  const formRef = useRef<ProFormInstance>();

  useEffect(() => {
    if (open) {
      formRef.current?.setFieldsValue({
        ...detail,
        structure: detail?.structure ?? undefined,
        purpose: detail?.purpose ?? undefined,
        acivity: detail?.activity ?? undefined,
        duration: detail?.duration ?? undefined,
      });
    }
  }, [open]);

  return (
    <IModalForm
      open={open}
      title="Хөгжлийн төлөвлөгөө засах"
      formRef={formRef}
      cancelText={"Буцах"}
      okText={"Засах"}
      modalProps={{ maskClosable: false, onCancel }}
      onRequest={async (values) => {
        return developerPlan.update(
          {
            ...values,
          },
          detail?.id || 0
        );
      }}
      onSuccess={() => {
        if (onFinish) {
          onFinish()
        }
        formRef.current?.resetFields()
      }}
    >
      <div className="pt-6">
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
          placeholder={"Дэлгэрэнгүй оруулна уу"}
          label="Хугацаа"
          options={DevelopmentPlanOption?.map((el) => ({ ...el }))}
          rules={[
            {
              required: true,
              message: "Энэ талбарийг оруулах шаардлагатай!",
            },
          ]}
        />
      </div>
    </IModalForm>
  );
};
