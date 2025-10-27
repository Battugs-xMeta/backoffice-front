import { ProFormItem, ProFormSelect, ProFormText } from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Form } from "antd";
import { IModalForm } from "components/modal";
import { FORM_ITEM_RULE } from "config";
import { useEffect } from "react";
import roleManagement from "service/role-management";
import { RoleInterface } from "service/role-management/type";
import { ActionComponentProps } from "types";

export const UpdatePermission = ({
  open,
  onCancel,
  onFinish,
  detail,
}: ActionComponentProps<RoleInterface>) => {
  const [form] = Form.useForm();

  const menuIDS = Form.useWatch("menu_ids", form) as number[];
  const menus = useRequest(roleManagement.listMenu, { manual: true });

  useEffect(() => {
    form.resetFields();
    if (open) {
      menus.run();
      form.setFieldsValue({
        ...detail,
        menu_ids: detail?.menus?.map((el) => el.menu_id),
        menu_permissions: detail?.menus?.reduce((acc, el) => {
          acc[el.menu_id] = {
            menu_id: el.menu_id,
            permission_ids: el.permissions?.map((el) => el.id),
          };
          return acc;
        }, {} as any),
      });
    }
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
        values.menu_permissions = Object.values(
          values.menu_permissions || {}
        )?.map((el) => el);

        return roleManagement.update(detail?.id || 0, values);
      }}
      title="Эрхийн бүлэг тохируулах"
    >
      <ProFormText name="name" label="Бүлгийн нэр" rules={FORM_ITEM_RULE()} />
      <ProFormSelect
        name={"menu_ids"}
        label="Цэс"
        mode="multiple"
        options={menus.data?.map((el) => ({ value: el.id, label: el.name }))}
      />

      <div className="w-full border border-solid border-gray-200 rounded-xl bg-gray-50">
        <div className="flex items-center py-4 px-6  font-semibold text-gray-600 border-b  border-solid border-gray-200 border-t-0 border-l-0 border-r-0">
          <div className="w-1/3">Үйлдэл</div>
          <div className="w-2/3">Хандах эрх</div>
        </div>
        <div className=" custom-ant-form-item-m0  w-full">
          {menus.data
            ?.filter((el) => menuIDS?.includes(el.id))
            ?.map((el, key) => {
              return (
                <div
                  key={key}
                  className="flex  items-baseline border-b border-solid border-gray-200 border-l-0 border-r-0 border-t-0 px-6 py-4"
                >
                  <div className="w-1/3 text-gray-900 font-semibold">
                    {el.name}
                  </div>
                  <div className="w-2/3">
                    <ProFormItem
                      hidden
                      name={["menu_permissions", `${el.id}`, "menu_id"]}
                      initialValue={el.id}
                    />
                    <ProFormSelect
                      name={["menu_permissions", `${el.id}`, `permission_ids`]}
                      options={el.permissions?.map((el) => ({
                        value: el.id,
                        label: el.name,
                      }))}
                      mode="multiple"
                      rules={FORM_ITEM_RULE()}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </IModalForm>
  );
};
