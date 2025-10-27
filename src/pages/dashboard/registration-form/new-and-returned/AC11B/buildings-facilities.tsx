import {
  FormListActionType,
  ProFormDatePicker,
  ProFormDigit,
  ProFormList,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-form";
import { Button, Col, Row } from "antd";
import { DeleteButton } from "components/index";
import { useRef } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { FORM_ITEM_RULE, HOT_WATERSUPPLY_TYPE } from "config";
import {
  FilterDisablityFromRoomButton,
  FilterDisablityFromRoomLine,
  FilterHeatingSourceButton,
  FilterHeatingSourceLine,
  FilterMaintenanceDoneButton,
  FilterMaintenanceDoneLine,
  FilterOwnerShipButton,
  FilterOwnerShipFormLine,
  FilterPropertyFormButton,
  FilterPropertyFormLine,
  FilterRoomNumberButton,
  FilterRoomNumbersLine,
  FilterSourceWaterButton,
  FilterSourceWaterLine,
} from "service/registration-form/types";
import { moneyFormat } from "utils/index";
import dayjs from "dayjs";
import moment from "moment";

const BuildingsFacilities = () => {
  const actionRef = useRef<FormListActionType<any>>();

  const sourceWaterButtons: FilterSourceWaterButton[] = [
    {
      value: FilterSourceWaterLine.focused,
      label: "Төвлөрсөн",
    },
    {
      value: FilterSourceWaterLine.decentralized,
      label: "Төвлөрсөн бус",
    },
  ];

  const disablityFromRoombuttons: FilterDisablityFromRoomButton[] = [
    {
      value: FilterDisablityFromRoomLine.have,
      label: "Байгаа",
    },
    {
      value: FilterDisablityFromRoomLine.none,
      label: "Байхгүй",
    },
  ];

  const disablityFromElevetarbuttons: FilterDisablityFromRoomButton[] = [
    {
      value: FilterDisablityFromRoomLine.have,
      label: "Байгаа",
    },
    {
      value: FilterDisablityFromRoomLine.none,
      label: "Байхгүй",
    },
  ];

  const maintenanceDonebuttons: FilterMaintenanceDoneButton[] = [
    {
      value: FilterMaintenanceDoneLine.yes,
      label: "Тийм",
    },
    {
      value: FilterMaintenanceDoneLine.no,
      label: "Үгүй",
    },
  ];

  const specialTrainingRoombuttons: FilterDisablityFromRoomButton[] = [
    {
      value: FilterDisablityFromRoomLine.have,
      label: "Байгаа",
    },
    {
      value: FilterDisablityFromRoomLine.none,
      label: "Байхгүй",
    },
  ];

  const heatingSourcebuttons: FilterHeatingSourceButton[] = [
    {
      value: FilterHeatingSourceLine.focused,
      label: "Төвлөрсөн",
    },
    {
      value: FilterHeatingSourceLine.decentralized,
      label: "Төвлөрсөн бус",
    },
    {
      value: FilterHeatingSourceLine.state,
      label: "Бие даасан",
    },
  ];

  return (
    <>
      <ProFormList
        name={"buildings"}
        creatorButtonProps={{
          className: "hidden",
        }}
        alwaysShowItemLabel
        actionRef={actionRef}
        actionRender={() => []}
        initialValue={[{}]}
      >
        {(_fields, _index, action, _count) => {
          return (
            <>
              <div
                className={`bg-[#E7EDEE] rounded p-8 ${
                  _index > 0 ? "mt-3" : ""
                }`}
              >
                <div className="flex justify-between">
                  <h1 className="text-[#1D2939] text-xl ml-1">
                    Барилга байгууламж {`- ${_index + 1}`}
                  </h1>
                  {_index > 0 && (
                    <DeleteButton
                      onClick={() => actionRef?.current?.remove(_index)}
                    />
                  )}
                </div>
                <Row gutter={[24, 24]}>
                  <Col span={24}>
                    <ProFormText
                      label="Барилга байгууламжийн хаяг байршил"
                      name={"full_address"}
                      rules={FORM_ITEM_RULE()}
                      placeholder={"Хаягаа бүтэн бичнэ үү..."}
                    />
                  </Col>
                </Row>
                <Row gutter={[24, 24]}>
                  <Col span={12}>
                    <ProFormDatePicker
                      fieldProps={{
                        disabledDate: (current) => {
                          return current && current > moment().endOf("day");
                        },
                      }}
                      label={"Барилга ашиглалтанд орсон огноо"}
                      name={"date_of_construction"}
                      rules={FORM_ITEM_RULE()}
                      placeholder={"Огноо сонгох"}
                      width="lg"
                    />
                  </Col>
                  <Col span={12}>
                    <ProFormSelect
                      label="Халуун усны хангамж"
                      name={"hot_water_supply"}
                      placeholder={"Сонгох"}
                      options={HOT_WATERSUPPLY_TYPE.map((el) => ({ ...el }))}
                      rules={FORM_ITEM_RULE()}
                    />
                  </Col>
                </Row>
                <div className="mb-2 w-full">
                  <label className="text-gray-700 text-sm font-medium ">
                    Барилгын нийт талбайн хэмжээ
                  </label>
                </div>
                <Row gutter={[24, 24]}>
                  <Col span={6}>
                    <ProFormDigit
                      name={["area", "total"]}
                      placeholder={"Тоо хэмжээ"}
                      fieldProps={{
                        addonBefore: "Нийт",
                      }}
                      rules={FORM_ITEM_RULE()}
                    />
                  </Col>
                  <Col span={6}>
                    <ProFormDigit
                      name={["area", "residential"]}
                      placeholder={"Тоо хэмжээ"}
                      fieldProps={{
                        addonBefore: "Сууц",
                      }}
                      rules={FORM_ITEM_RULE()}
                    />
                  </Col>
                  <Col span={6}>
                    <ProFormDigit
                      name={["area", "for_service"]}
                      placeholder={"Тоо хэмжээ"}
                      fieldProps={{
                        addonBefore: "Үйлчилгээ",
                      }}
                      rules={FORM_ITEM_RULE()}
                    />
                  </Col>
                  <Col span={6}>
                    <ProFormDigit
                      name={["area", "other"]}
                      placeholder={"Тоо хэмжээ"}
                      fieldProps={{
                        addonBefore: "Бусад",
                      }}
                      rules={FORM_ITEM_RULE()}
                    />
                  </Col>
                </Row>
                <Row gutter={[24, 24]} className="flex gap-6 ml-1">
                  <div>
                    <div className="mb-2 w-full">
                      <label className="text-gray-700 text-sm font-medium ">
                        Өмчийн хэлбэр
                      </label>
                    </div>
                    <ProFormRadio.Group
                      name={"property_type"}
                      radioType="button"
                      fieldProps={{
                        size: "middle",
                      }}
                      options={propertyFormButtons?.map((el) => ({
                        ...el,
                      }))}
                      rules={FORM_ITEM_RULE()}
                    />
                  </div>
                  <div>
                    <div className="mb-2 w-full">
                      <label className="text-gray-700 text-sm font-medium ">
                        Эзэмшлийн хэлбэр
                      </label>
                    </div>
                    <ProFormRadio.Group
                      name={"possession_type"}
                      radioType="button"
                      fieldProps={{
                        size: "middle",
                      }}
                      options={ownershipFormButtons?.map((el) => ({
                        ...el,
                      }))}
                      rules={FORM_ITEM_RULE()}
                      // initialValue={FilterOwnerShipFormLine.locally}
                    />
                  </div>
                  <div>
                    <div className="mb-2 w-full">
                      <label className="text-gray-700 text-sm font-medium ">
                        Өрөөний тоо
                      </label>
                    </div>
                    <ProFormRadio.Group
                      name={"room_count_type"}
                      radioType="button"
                      fieldProps={{
                        size: "middle",
                      }}
                      options={roomNumberButtons?.map((el) => ({
                        ...el,
                      }))}
                      rules={FORM_ITEM_RULE()}
                    />
                  </div>
                  <div>
                    <div className="mb-2 w-full">
                      <label className="text-gray-700 text-sm font-medium ">
                        Ундны усны эх үүсвэр
                      </label>
                    </div>
                    <ProFormRadio.Group
                      name={"source_of_water"}
                      radioType="button"
                      fieldProps={{
                        size: "middle",
                      }}
                      options={sourceWaterButtons?.map((el) => ({
                        ...el,
                      }))}
                      rules={FORM_ITEM_RULE()}
                    />
                  </div>
                  <div>
                    <div className="mb-2 w-full">
                      <label className="text-gray-700 text-sm font-medium ">
                        Сургалт, хүмүүжлийн тусгай өрөө
                      </label>
                    </div>
                    <ProFormRadio.Group
                      name={"is_have_train_room"}
                      radioType="button"
                      fieldProps={{
                        size: "middle",
                      }}
                      options={specialTrainingRoombuttons?.map((el) => ({
                        ...el,
                      }))}
                      rules={FORM_ITEM_RULE()}
                    />
                  </div>
                </Row>

                <h1 className="text-[#1D2939] text-xl ml-1">
                  Бие засах газрын төрөл
                </h1>
                <div className="mb-2 w-full">
                  <label className="text-gray-700 text-sm font-medium ">
                    Ус татуургын бие засах газар
                  </label>
                </div>
                <Row gutter={[24, 24]}>
                  <Col span={8}>
                    <ProFormDigit
                      name={["toilet", "connected_centralized"]}
                      placeholder={"Тоо хэмжээ"}
                      fieldProps={{
                        addonBefore: "Төвлөрсөн системд холбогдсон",
                      }}
                      rules={FORM_ITEM_RULE()}
                    />
                  </Col>
                  <Col span={8}>
                    <ProFormDigit
                      name={["toilet", "flow"]}
                      placeholder={"Тоо хэмжээ"}
                      fieldProps={{
                        addonBefore: "Битүү тунгаагуур руу урсдаг",
                      }}
                      rules={FORM_ITEM_RULE()}
                    />
                  </Col>
                  <Col span={8}>
                    <ProFormDigit
                      name={["toilet", "flow_pit"]}
                      placeholder={"Тоо хэмжээ"}
                      fieldProps={{
                        addonBefore: "Нүхэн жорлон руу урсдаг",
                      }}
                      rules={FORM_ITEM_RULE()}
                    />
                  </Col>
                </Row>

                <div className="mb-2 w-full">
                  <label className="text-gray-700 text-sm font-medium ">
                    Нүхэн жорлон
                  </label>
                </div>
                <Row gutter={[24, 24]}>
                  <Col span={6}>
                    <ProFormDigit
                      name={["pit_toilet", "improved"]}
                      placeholder={"Тоо хэмжээ"}
                      fieldProps={{
                        addonBefore: "Сайжруулсан",
                      }}
                      rules={FORM_ITEM_RULE()}
                    />
                  </Col>
                  <Col span={6}>
                    <ProFormDigit
                      name={["pit_toilet", "simple"]}
                      placeholder={"Тоо хэмжээ"}
                      fieldProps={{
                        addonBefore: "Энгийн",
                      }}
                      rules={FORM_ITEM_RULE()}
                    />
                  </Col>
                  <Col span={6}>
                    <ProFormDigit
                      name={["pit_toilet", "open_hole"]}
                      placeholder={"Тоо хэмжээ"}
                      fieldProps={{
                        addonBefore: "Задгай нүх",
                      }}
                      rules={FORM_ITEM_RULE()}
                    />
                  </Col>
                  <Col span={6}>
                    <ProFormDigit
                      name={["pit_toilet", "bio"]}
                      placeholder={"Тоо хэмжээ"}
                      fieldProps={{
                        addonBefore: "Био жорлон",
                      }}
                      rules={FORM_ITEM_RULE()}
                    />
                  </Col>
                </Row>

                <Row gutter={[24, 24]}>
                  <Col span={8}>
                    <div className="mb-2 w-full">
                      <label className="text-gray-700 text-sm font-medium ">
                        Хөгжлийн бэрхшээлтэй хүнд зориулсан ариун цэврийн өрөө
                      </label>
                    </div>

                    <ProFormRadio.Group
                      name={"is_have_disable_person_toilet"}
                      radioType="button"
                      fieldProps={{
                        size: "middle",
                      }}
                      options={disablityFromRoombuttons?.map((el) => ({
                        ...el,
                      }))}
                      rules={FORM_ITEM_RULE()}
                    />
                  </Col>
                  <Col span={14}>
                    <div className="mb-2 w-full">
                      <label className="text-gray-700 text-sm font-medium ">
                        Хөгжлийн бэрхшээлтэй иргэнд тусгайлан тохижуулсан (налуу
                        зам, цахилгаан шат) ариун цэврийн байгууламж
                      </label>
                    </div>

                    <ProFormRadio.Group
                      name={"is_have_disable_person_sanitary_facilities"}
                      radioType="button"
                      fieldProps={{
                        size: "middle",
                      }}
                      options={disablityFromElevetarbuttons?.map((el) => ({
                        ...el,
                      }))}
                      rules={FORM_ITEM_RULE()}
                    />
                  </Col>
                </Row>

                <h1 className="text-[#1D2939] text-xl ml-1">
                  Засвар үйлчилгээний мэдээлэл
                </h1>
                <Row gutter={[15, 15]}>
                  <Col span={7}>
                    <div className="mb-2 w-full">
                      <label className="text-gray-700 text-sm font-medium ">
                        Засвар үйлчилгээ хийсэн эсэх
                      </label>
                    </div>
                    <ProFormRadio.Group
                      name={["maintenance", "is_done"]}
                      radioType="button"
                      fieldProps={{
                        size: "middle",
                      }}
                      options={maintenanceDonebuttons?.map((el) => ({
                        ...el,
                      }))}
                      rules={FORM_ITEM_RULE()}
                      // initialValue={FilterMaintenanceDoneLine.yes}
                    />
                  </Col>
                  <Col span={8}>
                    <div className="mb-2 w-full">
                      <label className="text-gray-700 text-sm font-medium ">
                        Цаашид үйл ажиллагаа явуулах боломжтой эсэх
                      </label>
                    </div>
                    <ProFormRadio.Group
                      name={["maintenance", "is_further_possible"]}
                      radioType="button"
                      fieldProps={{
                        size: "middle",
                        // value: operationsPossible,
                      }}
                      options={maintenanceDonebuttons?.map((el) => ({
                        ...el,
                      }))}
                      rules={FORM_ITEM_RULE()}
                      // initialValue={FilterMaintenanceDoneLine.yes}
                    />
                  </Col>
                </Row>
                <div className="mb-2 w-full">
                  <label className="text-gray-700 text-sm font-medium ">
                    Халаалтын эх үүсвэр
                  </label>
                </div>
                <ProFormRadio.Group
                  name={"heat_source"}
                  radioType="button"
                  fieldProps={{
                    size: "middle",
                  }}
                  options={heatingSourcebuttons?.map((el) => ({
                    ...el,
                  }))}
                  rules={FORM_ITEM_RULE()}
                  // initialValue={FilterHeatingSourceLine.focused}
                />
                <Row gutter={[24, 24]}>
                  <Col span={6}>
                    <ProFormDatePicker
                      fieldProps={{
                        disabledDate: (current) => {
                          return current && current > moment().endOf("day");
                        },
                      }}
                      label={"Их засвар хийсэн огноо"}
                      name={["maintenance", "date_of_major_renovation"]}
                      // rules={FORM_ITEM_RULE()}
                      placeholder={"Огноо сонгох"}
                      width={"md"}
                    />
                  </Col>
                  <Col span={6}>
                    <ProFormDigit
                      label="Мөнгөн дүн"
                      name={["maintenance", "major_renovation_amount"]}
                      placeholder={"1'000'000"}
                      fieldProps={{
                        addonAfter: "₮",
                      }}
                      convertValue={(value) => moneyFormat(value)}
                      // rules={FORM_ITEM_RULE()}
                    />
                  </Col>
                  <Col span={6}>
                    <ProFormDatePicker
                      fieldProps={{
                        disabledDate: (current) => {
                          return current && current > moment().endOf("day");
                        },
                      }}
                      label={"Урсгал засвар хийсэн огноо"}
                      name={["maintenance", "date_of_maintenance"]}
                      // rules={FORM_ITEM_RULE()}
                      placeholder={"Огноо сонгох"}
                      width={"md"}
                    />
                  </Col>
                  <Col span={6}>
                    <ProFormDigit
                      label="Мөнгөн дүн"
                      name={["maintenance", "date_of_maintenance_amount"]}
                      placeholder={"1'000'000"}
                      convertValue={(value) => moneyFormat(value)}
                      fieldProps={{
                        addonAfter: "₮",
                      }}
                      // rules={FORM_ITEM_RULE()}
                    />
                  </Col>
                </Row>
              </div>
            </>
          );
        }}
      </ProFormList>

      <Button
        icon={<PlusOutlined rev={undefined} />}
        type="default"
        className="border font-medium mt-2 solid"
        onClick={() => actionRef.current?.add({})}
      >
        Барилга байгууламжийн мэдээлэл нэмэх
      </Button>
    </>
  );
};

export default BuildingsFacilities;

export const propertyFormButtons: FilterPropertyFormButton[] = [
  {
    value: FilterPropertyFormLine.state,
    label: "Төрийн өмч",
  },
  {
    value: FilterPropertyFormLine.locally,
    label: "Орон нутгийн өмч",
  },
  {
    value: FilterPropertyFormLine.personal,
    label: "Хувийн өмч",
  },
];

export const ownershipFormButtons: FilterOwnerShipButton[] = [
  {
    value: FilterOwnerShipFormLine.locally,
    label: "Өөрийн",
  },
  {
    value: FilterOwnerShipFormLine.for_rent,
    label: "Түрээсийн",
  },
  {
    value: FilterOwnerShipFormLine.rent_without_sweat,
    label: "Хөлсгүй түрээсийн",
  },
];

export const roomNumberButtons: FilterRoomNumberButton[] = [
  {
    value: FilterRoomNumbersLine.one_or_three,
    label: "1-3",
  },
  {
    value: FilterRoomNumbersLine.four_or_five,
    label: "4-5",
  },
  {
    value: FilterRoomNumbersLine.up_sex,
    label: "6-с дээш",
  },
];

export const sourceWaterButtons: FilterSourceWaterButton[] = [
  {
    value: FilterSourceWaterLine.focused,
    label: "Төвлөрсөн",
  },
  {
    value: FilterSourceWaterLine.decentralized,
    label: "Төвлөрсөн бус",
  },
];

export const disablityFromRoombuttons: FilterDisablityFromRoomButton[] = [
  {
    value: FilterDisablityFromRoomLine.have,
    label: "Байгаа",
  },
  {
    value: FilterDisablityFromRoomLine.none,
    label: "Байхгүй",
  },
];

export const disablityFromElevetarbuttons: FilterDisablityFromRoomButton[] = [
  {
    value: FilterDisablityFromRoomLine.have,
    label: "Байгаа",
  },
  {
    value: FilterDisablityFromRoomLine.none,
    label: "Байхгүй",
  },
];

export const maintenanceDonebuttons: FilterMaintenanceDoneButton[] = [
  {
    value: FilterMaintenanceDoneLine.yes,
    label: "Тийм",
  },
  {
    value: FilterMaintenanceDoneLine.no,
    label: "Үгүй",
  },
];

export const specialTrainingRoombuttons: FilterDisablityFromRoomButton[] = [
  {
    value: FilterDisablityFromRoomLine.have,
    label: "Байгаа",
  },
  {
    value: FilterDisablityFromRoomLine.none,
    label: "Байхгүй",
  },
];

export const heatingSourcebuttons: FilterHeatingSourceButton[] = [
  {
    value: FilterHeatingSourceLine.focused,
    label: "Төвлөрсөн",
  },
  {
    value: FilterHeatingSourceLine.decentralized,
    label: "Төвлөрсөн бус",
  },
  {
    value: FilterHeatingSourceLine.state,
    label: "Бие даасан",
  },
];
