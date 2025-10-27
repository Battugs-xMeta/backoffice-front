import { PlusOutlined } from "@ant-design/icons";
import {
  FormListActionType,
  ProFormDatePicker,
  ProFormDigit,
  ProFormList,
  ProFormRadio,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-form";
import { Button, Col, Row } from "antd";
import { DeleteButton } from "components/index";
import { FORM_ITEM_RULE } from "config";
import { useAtom } from "jotai";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import {
  FilterDonationButton,
  FilterDonationLine,
  FilterMoneyButton,
  FilterMoneyline,
  Goods,
} from "service/finance/type";
import { moneyFormat } from "utils/index";
import { storeDonationForm } from "../../store";

interface InfoProps {
  goods?: Goods[];
}
export const Info = ({ goods }: InfoProps) => {
  const [store] = useAtom(storeDonationForm);

  const [tab, setTab] = useState<any>(
    store.donation_type === "money"
      ? FilterMoneyline.Money
      : FilterMoneyline.Other
  );
  const actionRef = useRef<FormListActionType>();
  const [addMoney, setAddingMoney] = useState<number[]>([]);

  const total = addMoney.reduce((a, b) => a + b, 0);

  const DonationButtons: FilterDonationButton[] = [
    {
      value: FilterDonationLine.Cash,
      label: "Бэлэн мөнгө",
    },
    {
      value: FilterDonationLine.Bank,
      label: "Дансаар",
    },
  ];

  const Moneybuttons: FilterMoneyButton[] = [
    {
      value: FilterMoneyline.Money,
      label: "Мөнгөн",
    },
    {
      value: FilterMoneyline.Other,
      label: "Бусад",
    },
  ];

  return (
    <>
      <ProFormRadio.Group
        name="donation_type"
        radioType="button"
        shouldUpdate
        label="Хандивийн хэлбэр"
        fieldProps={{
          size: "large",
          onChange: (e) => {
            setTab(e.target.value);
          },
        }}
        // disabled={!!store.donation_type}
        options={Moneybuttons?.map((el) => ({
          ...el,
          onChange: (e) => {
            setTab(e);
          },
        }))}
      />
      <ProFormRadio.Group
        fieldProps={{
          defaultValue: false,
        }}
        label="Хандивийн төрөл"
        name="is_organization"
        options={[
          {
            label: "Хувь хүн",
            value: false,
          },
          {
            label: "Байгууллага",
            value: true,
          },
        ]}
      />
      {tab === FilterMoneyline.Money && (
        <>
          <Row gutter={[24, 24]}>
            <Col span={16}>
              <ProFormText
                name={"first_name"}
                placeholder={"Хандивлагч байгууллага, иргэний нэр"}
                label={"Нэр оруулна уу"}
                rules={FORM_ITEM_RULE()}
              />
            </Col>
            <Col span={8}>
              <ProFormRadio.Group
                name={"transaction_type"}
                radioType="button"
                label="Хандивласан хэлбэр"
                fieldProps={{
                  size: "large",
                }}
                options={DonationButtons?.map((el) => ({
                  ...el,
                }))}
                initialValue={FilterDonationLine.Cash}
              />
            </Col>
          </Row>
          <Row gutter={[24, 24]}>
            <Col span={12}>
              <ProFormDigit
                name={"total_amount"}
                placeholder={"0"}
                label={"Шилжүүлсэн дүн"}
                rules={FORM_ITEM_RULE()}
                fieldProps={{
                  addonAfter: "₮",
                }}
                convertValue={(value) => moneyFormat(value)}
              />
            </Col>
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
                label={"Хандивласан огноо"}
                width="lg"
              />
            </Col>
          </Row>
        </>
      )}

      {tab === FilterMoneyline.Other && (
        <>
          <ProFormText
            name={"first_name"}
            placeholder={"Хандивлагч байгууллага, иргэний нэр"}
            label={"Нэр оруулна уу"}
            rules={FORM_ITEM_RULE()}
          />
          <div className="bg-[#F5F8F8] p-3 border-gray-300 rounded-lg border-solid border-2">
            <ProFormList
              name={"goods"}
              creatorButtonProps={{
                className: " hidden",
              }}
              actionRef={actionRef}
              actionRender={() => []}
            >
              {(_fields, _index, action, _count) => {
                const [quantity, setQuantity] = useState(0);
                const [unit_amount, setUnitAmount] = useState(0);

                useEffect(() => {
                  const newTotal = [...addMoney];
                  newTotal[_index] = quantity * unit_amount;
                  setAddingMoney(newTotal);
                }, [quantity, unit_amount]);

                return (
                  <div className={`${_index >= 0 && "mt-0"}`}>
                    <div className="flex items-center gap-2">
                      <>
                        <ProFormText
                          name={"name"}
                          label="Хандивласан бараа"
                          placeholder={"Бараа"}
                        />
                        <ProFormDigit
                          name={"quantity"}
                          label="Тоо ширхэг"
                          shouldUpdate
                          placeholder={"Тоо ширхэг"}
                          fieldProps={{
                            onChange: (e) => {
                              setQuantity(e === null ? 0 : e);
                            },
                          }}
                        />
                        <ProFormDigit
                          name={"unit_amount"}
                          label="Нэгжийн үнэ"
                          placeholder={"Тоо ширхэг"}
                          shouldUpdate
                          fieldProps={{
                            onChange: (e) => {
                              setUnitAmount(e === null ? 0 : e);
                            },
                          }}
                          convertValue={(value) => moneyFormat(value)}
                        />
                      </>
                      <DeleteButton
                        onClick={() => actionRef?.current?.remove(_index)}
                      />
                    </div>
                  </div>
                );
              }}
            </ProFormList>
            <div className="flex justify-between items-center">
              <Button
                icon={<PlusOutlined rev={undefined} />}
                type="primary"
                ghost
                className="mb-3 border-0  font-medium text-[#144E5A]"
                onClick={() => actionRef.current?.add({})}
              >
                Нэмэх
              </Button>
              <p className="text-sm font-medium">
                Одоогоор нийт :
                {moneyFormat(
                  total === 0
                    ? goods?.reduce(
                        (acc, el) => acc + el.total_amount,
                        0 || 0
                      ) || 0
                    : total
                ) + "₮"}
              </p>
            </div>
          </div>
        </>
      )}

      <Row gutter={[24, 24]} className="mt-3">
        <Col span={12}>
          <ProFormText
            name={"phone_number"}
            placeholder={"Утасны дугаар"}
            fieldProps={{
              addonBefore: "+976",
            }}
            rules={
              (FORM_ITEM_RULE(),
              [
                {
                  pattern: /^[1-9]{1}[0-9]{7}$/g,
                  message: "Энэ талбар утасны дугаар байх ёстой",
                },
              ])
            }
            label="Утасны дугаар"
          />
        </Col>
        <Col span={12}>
          <ProFormText
            name="email"
            placeholder="И-мэйл"
            label="Имэйл"
            rules={
              (FORM_ITEM_RULE(),
              [
                {
                  pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  message: "Энэ талбар и-мэйл хаяг байх ёстой",
                },
              ])
            }
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
