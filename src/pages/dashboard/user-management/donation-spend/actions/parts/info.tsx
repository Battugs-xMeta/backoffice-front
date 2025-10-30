import { UserOutlined } from "@ant-design/icons";
import {
  ProFormDatePicker,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Avatar, Col, Row, notification } from "antd";
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
      <Row gutter={[24, 24]}>
        <Col span={12}>
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
        </Col>
        <Col span={12}>
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
        </Col>
      </Row>
      <ProFormTextArea
        name={"description"}
        placeholder={"Тайлбар"}
        label={"Тайлбар"}
        rules={FORM_ITEM_RULE()}
      />
    </>
  );
};
