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

export const Assign = ({
  open,
  onCancel,
  onFinish,
  detail,
}: ActionComponentProps<any>) => {
  const [form] = Form.useForm();

  const roles = useRequest(roleManagement.listAll);
  const employees = useRequest(workers.listActive, {});

  useEffect(() => {
    form.resetFields();
  }, [open]);

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
