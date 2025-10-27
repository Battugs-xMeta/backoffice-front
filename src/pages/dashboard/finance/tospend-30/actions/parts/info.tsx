import { UserOutlined } from "@ant-design/icons";
import {
  ProFormDatePicker,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Avatar, notification } from "antd";
import { FORM_ITEM_RULE } from "config";
import dayjs from "dayjs";
import { debounce } from "lodash";
import moment from "moment";
import { useEffect } from "react";
import careInformation from "service/care-information";
import file from "service/file";
import { FinanceStatusToSpend30Array } from "service/finance/type";
import { moneyFormat } from "utils/index";

interface SelectOption {
  value: number;
  label: React.ReactNode;
}

export const Info = ({}) => {
  const elderies = useRequest(careInformation.getElderlyList, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  useEffect(() => {
    elderies.run({ current: 1, pageSize: 20, status: 6 }); // Идвэхтэй үйлчлүүлэгчийн жагсаалтийг авахдаа status ийг 6 болгож дуудна
  }, []);

  const debouncedSearchElderlies = debounce((value) => {
    elderies.run({
      current: 1,
      pageSize: 20,
      status: 6,
      query: value,
    });
  }, 1000);

  return (
    <>
      <ProFormSelect
        name={"elderlies"}
        label="Үйлчлүүлэгч"
        shouldUpdate
        className="mupltiple-selecter"
        fieldProps={{
          showSearch: true,
          loading: elderies.loading,
          filterOption: false,
          onSearch: debouncedSearchElderlies,
        }}
        required
        mode="multiple"
        placeholder="Сонгох"
        options={elderies?.data?.items.reduce<SelectOption[]>((acc, record) => {
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
                <span>{`${record?.elderly?.last_name?.substring(0, 1)}. ${
                  record?.elderly?.first_name
                }`}</span>
              </div>
            ),
            value: record.elderly?.id,
          });
          return acc;
        }, [])}
      />
      <ProFormSelect
        name={"expense_type"}
        shouldUpdate
        options={FinanceStatusToSpend30Array.map((el) => ({ ...el }))}
        rules={FORM_ITEM_RULE()}
        label="Шийдвэрийн төрөл"
        initialValue={FinanceStatusToSpend30Array[0].value}
      />
      <ProFormText
        name={"title"}
        placeholder={"Нэр"}
        label={"Нэр"}
        rules={FORM_ITEM_RULE()}
      />
      <ProFormDigit
        name={"quantity"}
        placeholder={"0"}
        label={"Тоо ширхэг"}
        rules={FORM_ITEM_RULE()}
      />
      <ProFormDigit
        name={"amount"}
        placeholder={"0"}
        label={"Мөнгөн дүн"}
        rules={FORM_ITEM_RULE()}
        fieldProps={{
          addonAfter: "₮",
        }}
        convertValue={(value) => moneyFormat(value)}
      />
      <ProFormDatePicker
        fieldProps={{
          disabledDate: (current) => {
            return current && current > moment().endOf("day");
          },
        }}
        name={"date"}
        rules={FORM_ITEM_RULE()}
        placeholder={"Огноо сонгох"}
        label={"Огноо"}
        width="lg"
      />
      <ProFormTextArea
        name={"description"}
        placeholder={"Тайлбар"}
        label={"Тайлбар"}
        rules={FORM_ITEM_RULE()}
      />
    </>
  );
};
