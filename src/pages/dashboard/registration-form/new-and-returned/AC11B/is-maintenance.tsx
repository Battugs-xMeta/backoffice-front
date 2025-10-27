import { ProFormDigit, ProFormRadio } from "@ant-design/pro-form";
import { Card, Col, Row } from "antd";
import { SectionField } from "components/index";
import { useState } from "react";
import { FORM_ITEM_RULE } from "config";
import {
  FilterDisablityFromRoomButton,
  FilterDisablityFromRoomLine,
} from "service/registration-form/types";

const Maintenance = () => {
  const [carTab, setCarTab] = useState<any>(FilterDisablityFromRoomLine.have);

  const carButtons: FilterDisablityFromRoomButton[] = [
    {
      value: FilterDisablityFromRoomLine.have,
      label: "Байгаа",
    },
    {
      value: FilterDisablityFromRoomLine.none,
      label: "Байхгүй",
    },
  ];

  return (
    <Card title={"Тоног төхөөрөмжийн мэдээлэл"} className="bg-[#F5F8F8]">
      <SectionField
        label="Машин, тээврийн хэрэгсэл"
        children={
          <ProFormRadio.Group
            name={["equipment", "is_have_vehicles"]}
            radioType="button"
            fieldProps={{
              size: "large",
              value: carTab,
              onChange: (e) => {
                setCarTab(e.target.value);
              },
            }}
            options={carButtons?.map((el) => ({
              ...el,
              onChange: (e) => {
                setCarTab(e);
              },
            }))}
            initialValue={FilterDisablityFromRoomLine.have}
          />
        }
      />
      {carTab === true && (
        <>
          <Row gutter={[24, 24]}>
            <Col span={6}>
              <ProFormDigit
                name={["equipment", "car_count"]}
                placeholder={"Тоо хэмжээ"}
                fieldProps={{
                  addonBefore: "Суудлын",
                }}
                rules={FORM_ITEM_RULE()}
              />
            </Col>
            <Col span={6}>
              <ProFormDigit
                name={["equipment", "truck_count"]}
                placeholder={"Тоо хэмжээ"}
                fieldProps={{
                  addonBefore: "Ачааны",
                }}
                rules={FORM_ITEM_RULE()}
              />
            </Col>
            <Col span={6}>
              <ProFormDigit
                name={["equipment", "bus_count"]}
                placeholder={"Тоо хэмжээ"}
                fieldProps={{
                  addonBefore: "Автобус",
                }}
                rules={FORM_ITEM_RULE()}
              />
            </Col>
            <Col span={6}>
              <ProFormDigit
                name={["equipment", "motorcycle_count"]}
                placeholder={"Тоо хэмжээ"}
                fieldProps={{
                  addonBefore: "Мотоцикл",
                }}
                rules={FORM_ITEM_RULE()}
              />
            </Col>
          </Row>
          <Row gutter={[24, 24]}>
            <Col span={8}>
              <ProFormDigit
                name={["equipment", "special_purpose_count"]}
                placeholder={"Тоо хэмжээ"}
                fieldProps={{
                  addonBefore: "Тусгай зориулалтын",
                }}
                rules={FORM_ITEM_RULE()}
              />
            </Col>
            <Col span={8}>
              <ProFormDigit
                name={["equipment", "company_owned_count"]}
                placeholder={"Тоо хэмжээ"}
                fieldProps={{
                  addonBefore: "Байгууллагын эзэмшлийн",
                }}
                rules={FORM_ITEM_RULE()}
              />
            </Col>
            <Col span={8}>
              <ProFormDigit
                name={["equipment", "other_owned_count"]}
                placeholder={"Тоо хэмжээ"}
                fieldProps={{
                  addonBefore: "Бусдын эзэмшлийн",
                }}
                rules={FORM_ITEM_RULE()}
              />
            </Col>
          </Row>
        </>
      )}
      <div className="mb-2 w-full">
        <label className="text-gray-700 text-sm font-medium ">Бусад</label>
      </div>
      <Row gutter={[24, 24]}>
        <Col span={8}>
          <ProFormDigit
            name={"bed_count"}
            placeholder={"Тоо хэмжээ"}
            fieldProps={{
              addonBefore: "Ор",
            }}
          />
        </Col>

        <Col span={8}>
          <ProFormDigit
            name={"table_count"}
            placeholder={"Тоо хэмжээ"}
            fieldProps={{
              addonBefore: "Ширээ",
            }}
          />
        </Col>

        <Col span={8}>
          <ProFormDigit
            name={"chair_count"}
            placeholder={"Тоо хэмжээ"}
            fieldProps={{
              addonBefore: "Сандал",
            }}
          />
        </Col>
      </Row>
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <ProFormDigit
            name={"computer_count"}
            placeholder={"Тоо хэмжээ"}
            fieldProps={{
              addonBefore: "Компьютер, тоног төхөөрөмж",
            }}
          />
        </Col>
        <Col span={12}>
          <ProFormDigit
            name={"animal_count"}
            placeholder={"Тоо хэмжээ"}
            fieldProps={{
              addonBefore: "Мал, амьтад",
            }}
          />
        </Col>
      </Row>
    </Card>
  );
};

export default Maintenance;
