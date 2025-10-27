import {
  ModalFormProps,
  ProFormDatePicker,
  ProFormDigit,
  ProFormInstance,
  ProFormSelect,
  ProFormTextArea,
} from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Col, Row, notification } from "antd";
import { IModalForm } from "components/modal";
import { DevelopmentPlanOption } from "config";
import dayjs from "dayjs";
import { debounce } from "lodash";
import moment from "moment";
import { useEffect, useRef } from "react";
import careInformation from "service/care-information";

interface SelectOption {
  value: number;
  label: React.ReactNode;
}

type PropsCancel = ModalFormProps & {
  onCancel: () => void;
  data?: number;
  onFinish?: () => void;
};

export const AddDPModal = ({
  onCancel,
  data,
  onFinish,
  ...rest
}: PropsCancel) => {
  const formRef = useRef<ProFormInstance>();

  const addDevRequest = useRequest(careInformation.createDP, {
    manual: true,
    onSuccess: () => {
      onFinish && onFinish();
      formRef.current?.resetFields();
    },
    onError: (err) => {
      notification.error({
        message: err.message,
      }),
        onFinish && onFinish();
    },
  });

  const DPlist = useRequest(careInformation.getDPList, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  const debouncedDPList = debounce((value) => {
    DPlist.run(data || 0);
  }, 1000);

  useEffect(() => {
    DPlist.run(data || 0);
  }, []);

  return (
    <IModalForm
      {...rest}
      title="Хөгжлийн төлөвлөгөө нэмэх"
      okText="Нэмэх"
      cancelText="Буцах"
      width={850}
      modalProps={{ onCancel: onCancel }}
      onSuccess={onFinish}
      formRef={formRef}
      open={!!data}
      onRequest={async (values) => {
        if (
          !!data &&
          (await addDevRequest.runAsync({
            ...values,
            elderly_id: data,
            deadline: dayjs(values.deadline).toDate(),
          }))
        ) {
          return true;
        }
        return false;
      }}
    >
      <div className="mt-4">
        <Row gutter={[24, 24]}>
          <Col span={8}>
            <ProFormSelect
              name={"plan_id"}
              label="Бүтэц"
              shouldUpdate
              fieldProps={{
                showSearch: true,
                loading: DPlist.loading,
                filterOption: false,
                onSearch: debouncedDPList,
                onChange: (value) => {
                  DPlist.run(data || 0);
                },
              }}
              required
              placeholder="Сонгох"
              options={DPlist?.data?.reduce<SelectOption[]>((acc, record) => {
                acc.push({
                  label: (
                    <div className="flex gap-2 items-center">
                      <span>{record.structure}</span>
                    </div>
                  ),
                  value: record.id,
                });
                return acc;
              }, [])}
            />
          </Col>
          <Col span={5}>
            <ProFormDatePicker
              fieldProps={{
                disabledDate: (current) => {
                  return current && current < moment().endOf("day");
                },
              }}
              name={"deadline"}
              label="Дуусах хугацаа"
              placeholder={"Огноо сонгох"}
            />
          </Col>
          <Col span={11}>
            <ProFormDigit
              name="frequency"
              placeholder="Давтамж"
              label={"Давтамж"}
              width={"lg"}
              rules={[
                {
                  required: true,
                  message: "Заавал оруулна уу",
                },
              ]}
              fieldProps={{
                width: "lg",
                className: "custom-ant-form-item-m0",
                addonBefore: (
                  <ProFormSelect
                    name={"count"}
                    width={160}
                    options={DevelopmentPlanOption.map((el) => ({ ...el }))}
                    initialValue={DevelopmentPlanOption[0].value}
                  />
                ),
              }}
            />
          </Col>
        </Row>

        <ProFormTextArea
          name="description"
          placeholder="Нэрийг бичнэ үү...."
          label={"Хийгдэх ажлын нэр"}
        />
      </div>
    </IModalForm>
  );
};
