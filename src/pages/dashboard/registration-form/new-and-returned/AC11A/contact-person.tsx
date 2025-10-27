import {
  ProFormInstance,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-form";
import { Card, Col, Row } from "antd";
import { SectionContainer } from "components/index";
import LeafletMap from "components/map";
import { BankList, FORM_ITEM_RULE } from "config";
import { useEffect, useState } from "react";

const ContactPerson = ({
  formRef,
  detail,
}: {
  formRef: React.MutableRefObject<ProFormInstance | undefined>;
  detail: any;
}) => {
  const [pay_location, setPayLocation] = useState<[number, number]>(
    formRef.current?.getFieldValue("pay_location") || [0, 0]
  );

  useEffect(() => {
    if (detail?.payment) {
      setPayLocation([detail?.payment?.latitude, detail?.payment?.longitude]);
    }
  }, [detail]);

  return (
    <div className="flex flex-col gap-2">
      <Card
        title={"Холбоо барих хүний талаарх мэдээлэл"}
        className="bg-[#F5F8F8]"
      >
        <Row gutter={[24, 24]}>
          <Col span={8} className="w-full">
            <ProFormText
              name={"contact_last_name"}
              placeholder={"Овог"}
              label="Овог"
              rules={FORM_ITEM_RULE()}
            />
          </Col>
          <Col span={8}>
            <ProFormText
              name={"contact_first_name"}
              placeholder={"Нэр"}
              label="Нэр"
              rules={FORM_ITEM_RULE()}
            />
          </Col>
          <Col span={8}>
            <ProFormText
              name={"contact_position"}
              rules={FORM_ITEM_RULE()}
              label="Албан тушаал"
              placeholder="Албан тушаал"
            />
          </Col>
        </Row>

        <Row gutter={[24, 24]}>
          <Col span={12} className="w-full">
            <ProFormText
              label="Утас"
              name={"contact_phone_number"}
              placeholder={"Утас"}
              fieldProps={{
                addonBefore: "+976",
              }}
              rules={[
                {
                  required: true,
                  pattern: /^[1-9]{1}[0-9]{7}$/g,
                  message: "Энэ талбар утасны дугаар байх ёстой",
                },
              ]}
            />
          </Col>
          <Col span={12}>
            <ProFormText
              label="Цахим шуудан"
              name={"contact_email"}
              placeholder={"sample@example.domain"}
              rules={[
                {
                  required: true,
                  pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  message: "Энэ талбар и-мэйл хаяг байх ёстой",
                },
              ]}
            />
          </Col>
        </Row>
      </Card>

      <Card
        title={"Хандив, төлбөр хүлээн авах мэдээлэл"}
        className="bg-[#F5F8F8]"
      >
        <Row gutter={[24, 24]}>
          <Col span={12} className="w-full">
            <ProFormSelect
              options={BankList.map(({ label, value, image }) => ({
                label: (
                  <div className="flex gap-2 items-center">
                    <img src={image} width={18} /> <div>{label}</div>
                  </div>
                ),
                value,
              }))}
              placeholder="Банкны нэр"
              name={["payment", "bank_name"]}
              label="Банкны нэр"
              rules={FORM_ITEM_RULE()}
            />
          </Col>
          <Col span={12}>
            <ProFormText
              name={["payment", "account_number"]}
              placeholder={"Дансны дугаар"}
              label={"Дансны дугаар"}
              rules={FORM_ITEM_RULE()}
            />
          </Col>
        </Row>

        <Row gutter={[24, 24]}>
          <Col span={12} className="w-full">
            <ProFormText
              label="Хүлээн авагчийн нэр"
              name={["payment", "receiver_name"]}
              placeholder={"“Залуучуудын газар” ХХК"}
              rules={FORM_ITEM_RULE()}
            />
          </Col>

          <Col span={12} className="w-full">
            <ProFormText
              label="Хандив, тусламжийн эд материал хүлээн авах байршил, дэлгэрэнгүй хаяг"
              name={["payment", "address_detail"]}
              placeholder={"Дэлгэрэнгүй хаяг"}
              rules={FORM_ITEM_RULE()}
            />
          </Col>
        </Row>
        <SectionContainer>
          <div
            style={{
              height: "300px",
              width: "100%",
              marginBottom: "20px",
              position: "relative",
            }}
          >
            <p className="mb-2 ml-1">
              Хандив, тусламжийн эд материал хүлээн авах байршил, дэлгэрэнгүй
              хаяг
            </p>
            <LeafletMap
              position={{ val: pay_location, set: setPayLocation }}
              onPositionChange={(lat: number, long: number) => {
                formRef.current?.setFieldValue(["pay_location"], [lat, long]);
              }}
            />
          </div>
          <ProFormText hidden name="pay_location" />
        </SectionContainer>
      </Card>
    </div>
  );
};

export default ContactPerson;
