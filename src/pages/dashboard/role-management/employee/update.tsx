import { ProFormSelect } from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Form } from "antd";
import { IModalForm } from "components/modal";
import { Profile } from "components/profile";
import { FORM_ITEM_RULE } from "config";
import { useEffect } from "react";
import roleManagement from "service/role-management";
import workers from "service/workers";
import { WorkerList } from "service/workers/type";
import { ActionComponentProps } from "types";

export const Update = ({
  open,
  onCancel,
  onFinish,
  detail,
}: ActionComponentProps<WorkerList>) => {
  const [form] = Form.useForm();

  const roles = useRequest(roleManagement.listAll);
  const employees = useRequest(workers.listActive, {});

  useEffect(() => {
    form.resetFields();
    if (open) {
      form.setFieldsValue({
        ...detail,
        employee_id: detail?.id,
        role_id: detail?.role_id,
      });
    }
  }, [open, detail]);

  return (
    <IModalForm
      open={open}
      modalProps={{
        onCancel,
      }}
      onSuccess={() => {
        onFinish?.();
      }}
      form={form}
      onRequest={(values) => {
        return roleManagement.assign(values.employee_id, values);
      }}
      title="Нэмэх"
      okText="Нэмэх"
      cancelText="Буцах"
    >
      <ProFormSelect
        name={"employee_id"}
        label="Ажилтан"
        rules={FORM_ITEM_RULE()}
        options={employees.data?.map((el) => ({
          value: el.id,
          label: <Profile user={el as any} />,
        }))}
      />
      <ProFormSelect
        name={"role_id"}
        label="Эрхийн бүлэг сонгох"
        rules={FORM_ITEM_RULE()}
        options={roles.data?.map((el) => ({
          value: el.id,
          label: el.name,
        }))}
      />
    </IModalForm>
  );
};
