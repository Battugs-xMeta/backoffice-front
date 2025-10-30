import { UserOutlined } from "@ant-design/icons";
import ProForm, {
  ProFormDatePicker,
  ProFormInstance,
  ProFormMoney,
  ProFormRadio,
  ProFormSelect,
} from "@ant-design/pro-form";
import UploadButton from "@ant-design/pro-form/es/components/UploadButton";
import { useRequest } from "ahooks";
import { Avatar, notification } from "antd";
import { UploadFile } from "antd/lib";
import { UploadDraggerButton } from "components/index";
import { IModalForm } from "components/modal";
import dayjs from "dayjs";
import { debounce } from "lodash";
import moment from "moment";
import { useEffect, useRef } from "react";
import careInformation from "service/care-information";
import file from "service/file";
import payment from "service/payment";
import { PaymentElderly } from "service/payment/type";
import { ActionComponentProps } from "types";

interface SelectOption {
  value: number;
  label: React.ReactNode;
}

export const CreateService = ({
  ...rest
}: ActionComponentProps<PaymentElderly>) => {
  const formRef = useRef<ProFormInstance>();
  const uploadMulti = useRequest(file.uploads, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  const create = useRequest(payment.create, {
    manual: true,
    onError: (err) => {
      notification.error({
        message: err.message,
      });
    },
  });

  useEffect(() => {
    elderies.run({ current: 1, pageSize: 20, status: 6 }); // Идвэхтэй үйлчлүүлэгчийн жагсаалтийг авахдаа status ийг 6 болгож дуудна
  }, []);

  const elderies = useRequest(careInformation.getElderlyList, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  const debouncedSearchElderlies = debounce((value) => {
    elderies.run({
      current: 1,
      pageSize: 20,
      status: 6,
      query: value,
    });
  }, 500);

  return (
    <IModalForm
      open={rest.open}
      modalProps={{ maskClosable: false, onCancel: rest.onCancel }}
      formRef={formRef}
      title="Төлбөрийн мэдээлэл бүртгэх"
      width={700}
      scrollToFirstError={true}
      onOpenChange={() => formRef.current?.resetFields()}
      cancelText={"Буцах"}
      okText={"Нэмэх"}
      className="px-1"
      onRequest={async (values) => {
        if (!!values) {
          if (values.credentials && values.credentials.length > 0) {
            values.credentials = await uploadMulti
              .runAsync({
                names: values.credentials?.map((el: UploadFile) => el?.name),
                files: values.credentials,
              })
              .then((el: any) => el.map((el: any) => el.id));
          }
          if (
            await create.runAsync({
              ...values,
              date: dayjs(values.date).toDate(),
              credentials: values.credentials,
            })
          ) {
            return true;
          }
        }
      }}
      onSuccess={rest.onFinish}
      initialValues={{
        delivered_type: 1,
        date: dayjs(),
      }}
    >
      <div className="bg-white rounded my-3">
        {/* <Info /> */}
        <ProFormSelect
          name={"elderly_id"}
          label="Үйлчлүүлэгч"
          shouldUpdate
          fieldProps={{
            showSearch: true,
            loading: elderies.loading,
            filterOption: false,
            onSearch: debouncedSearchElderlies,
          }}
          required
          placeholder="Сонгох"
          options={elderies?.data?.items?.reduce<SelectOption[]>(
            (acc, record) => {
              acc.push({
                label: (
                  <div className="flex gap-2 items-center">
                    {record?.elderly?.profile ? (
                      <Avatar
                        shape="circle"
                        size={25}
                        src={file.fileToUrl(
                          record?.elderly?.profile?.physical_path || "AS"
                        )}
                      />
                    ) : (
                      <Avatar
                        shape="circle"
                        size={25}
                        icon={<UserOutlined rev={undefined} />}
                      />
                    )}
                    <span>{`${record?.elderly?.last_name?.substring(0, 1)}. ${record?.elderly?.first_name
                      }`}</span>
                  </div>
                ),
                value: record?.id,
              });
              return acc;
            },
            []
          )}
        />

        <ProFormMoney
          required
          name="amount"
          label="Мөнгөн дүн"
          customSymbol="₮"
          placeholder="300,000"
        />

        <ProFormDatePicker name="date" label="Хүлээж авсан огноо" />
        <ProFormRadio.Group
          name="delivered_type"
          label="Хүлээлгэж өгсөн"
          options={[
            {
              label: "Өөрөө",
              value: 1,
            },
            {
              label: "Итгэмжлэгч",
              value: 2,
            },
          ]}
        />

        <ProForm.Item
          noStyle
          shouldUpdate={(a, b) => a.delivered_type != b.delivered_type}
        >
          {(form) => {
            return (
              form.getFieldValue("delivered_type") === 2 && (
                <UploadDraggerButton
                  max={1}
                  label={"Файл хавсаргах"}
                  name={"credentials"}
                  required={false}
                  accept="image/*,.pdf"
                />
              )
            );
          }}
        </ProForm.Item>
      </div>
    </IModalForm>
  );
};
