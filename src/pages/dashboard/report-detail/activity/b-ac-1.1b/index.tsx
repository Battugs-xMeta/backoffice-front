import { PageCard } from "components/card";
import { StaticCard } from "../component/card";
import { useRequest } from "ahooks";
import register_form from "service/registration-form";
import { notification } from "antd";
import { useEffect } from "react";
import {
  HEAT_SOURCE_TYPE,
  HOT_WATERSUPPLY_TYPE,
  POSSESSION_TYPE,
  PROPERTY_REPORT_TYPE,
  PROPERTY_TYPE,
  ROOM_TYPE,
  SOURCE_OF_WATER_TYPE,
} from "config";

export const BAC11BList = () => {
  const fetch = useRequest(register_form.getDocumentAC11B, {
    manual: true,
    onError(err) {
      notification.error({
        message: err.message,
      });
    },
  });

  useEffect(() => {
    fetch.run();
  }, []);
  return (
    <PageCard className="  rounded-2xl p-6">
      <div className="text-gray-700 font-semibold">
        Б-АС-1.1Б - Барилга байгууламжийн мэдээлэл
      </div>
      <div className="space-y-6 mt-6">
        {fetch.data?.buildings.map((el, key) => {
          return (
            <div key={key} className="space-y-6">
              <StaticCard
                data={el}
                title={`Ерөнхий мэдээлэл (Барилга-${++key})`}
                items={[
                  {
                    label: "Барилга ашиглалтанд орсон огноо",
                    value: "date_of_construction",
                    type: "DATE",
                  },
                  {
                    label: "Халуун усны хангамж",
                    value: "hot_water_supply",
                    enums: HOT_WATERSUPPLY_TYPE,
                    type: "ENUM",
                  },
                  {
                    label: "Өмчийн хэлбэр",
                    value: "property_type",
                    enums: PROPERTY_REPORT_TYPE,
                    type: "ENUM",
                  },
                  {
                    label: "Эзэмшлийн хэлбэр",
                    value: "possession_type",
                    enums: POSSESSION_TYPE,
                    type: "ENUM",
                  },
                  {
                    label: "Өрөөний тоо",
                    value: "room_count_type",
                    type: "ENUM",
                    enums: ROOM_TYPE,
                  },
                  {
                    label:
                      "Хөгжлийн бэрхшээлтэй хүнд зориулсан ариун цэврийн өрөө",
                    value: "is_have_disable_person_toilet",
                    type: "ENUM",
                    enums: [
                      { label: "Байгаа", value: true },
                      { label: "Байхгүй", value: false },
                    ],
                  },
                  {
                    label: "Хаяг, байршил",
                    value: "full_address",
                  },
                  {
                    label: "Ундны усны эх үүсвэр",
                    value: "source_of_water",
                    type: "ENUM",
                    enums: SOURCE_OF_WATER_TYPE,
                  },
                  {
                    label: "Сургалт, хүмүүжлийн тусгай өрөө",
                    value: "is_have_train_room",
                    type: "ENUM",
                    enums: [
                      { label: "Байгаа", value: true },
                      { label: "Байхгүй", value: false },
                    ],
                  },
                  {
                    label: `Хөгжлийн бэрхшээлтэй иргэнд тусгайлан тохижуулсан
                    (налуу зам, цахилгаан шат) ариун цэврийн байгууламж`,
                    value: "is_have_disable_person_sanitary_facilities",
                    type: "ENUM",
                    enums: [
                      { label: "Байгаа", value: true },
                      { label: "Байхгүй", value: false },
                    ],
                  },
                  {
                    label: `Халаалтын эх үүсвэр`,
                    value: "heat_source",
                    type: "ENUM",
                    enums: HEAT_SOURCE_TYPE,
                  },
                ]}
              />
              <StaticCard
                data={el || {}}
                title="Барилгын нийт талбайн хэмжээ"
                items={[
                  {
                    label: "Сууц",
                    value: ["area", "residential"],
                    prefix: "мкв",
                  },
                  {
                    label: "Бусад",
                    value: ["area", "other"],
                    prefix: "мкв",
                  },
                  {
                    label: "Үйлчилгээ",
                    value: ["area", "service"],
                    prefix: "мкв",
                  },
                  {
                    label: "Нийт",
                    value: ["area", "total"],
                    prefix: "мкв",
                  },
                ]}
              />
              <StaticCard
                title="Засвар үйлчилгээний мэдээлэл"
                data={el || {}}
                items={[
                  {
                    label: "Засвар үйлчилгээ хийсэн эсэх",
                    value: ["maintenance", "is_done"],
                    type: "ENUM",
                    enums: [
                      { label: "Тийм", value: true },
                      { label: "Үгүй", value: false },
                    ],
                  },
                  {
                    label: "Цаашид үйл ажиллагаа явуулах боломжтой эсэх",
                    value: ["maintenance", "is_further_possible"],
                    type: "ENUM",
                    enums: [
                      { label: "Тийм", value: true },
                      { label: "Үгүй", value: false },
                    ],
                  },
                  {
                    label: "Их засвар хийсэн огноо",
                    value: ["maintenance", "date_of_major_renovation"],
                    type: "DATE",
                  },
                  {
                    label: "Мөнгөн дүн",
                    value: ["maintenance", "major_renovation_amount"],
                  },

                  {
                    label: "Урсгал засвар хийсэн огноо",
                    value: ["maintenance", "date_of_maintenance"],
                    type: "DATE",
                  },
                  {
                    label: "Мөнгөн дүн",
                    value: ["maintenance", "date_of_maintenance_amount"],
                  },
                ]}
              />
            </div>
          );
        })}
        <StaticCard
          title="Тоног төхөөрөмжийн мэдээлэл"
          data={fetch.data || {}}
          items={[
            {
              label: "Тээврийн хэрэгсэл",
              items: [
                {
                  label: "Машин, тээврийн хэрэгсэл",
                  value: ["equipment", "is_have_vehicles"],
                  type: "ENUM",
                  enums: [
                    { label: "Байгаа", value: true },
                    { label: "Байхгүй", value: false },
                  ],
                },
                {
                  label: "Суудлын",
                  value: ["equipment", "car_count"],
                },
                {
                  label: "Автобус",
                  value: ["equipment", "bus_count"],
                },
                {
                  label: "Ачааны",
                  value: ["equipment", "truck_count"],
                },
                {
                  label: "Мотоцикл",
                  value: ["equipment", "motorcycle_count"],
                },
                {
                  label: "Тусгай зориулалтын",
                  value: ["equipment", "special_purpose_count"],
                },
                {
                  label: "Байгууллагын эзэмшлийн",
                  value: ["equipment", "company_owned_count"],
                },
                {
                  label: "Бусдын эзэмшлийн",
                  value: ["equipment", "other_owned_count"],
                },
              ],
            },
            {
              label: "Бусад",
              items: [
                {
                  label: "Ор",
                  value: "bed_count",
                },
                {
                  label: "Ширээ",
                  value: "table_count",
                },
                {
                  label: "Сандал",
                  value: "chair_count",
                },
                {
                  label: "Компьютер, тоног төхөөрөмж",
                  value: "computer_count",
                },
                {
                  label: "Мал, амьтад",
                  value: "animal_count",
                },
              ],
            },
          ]}
        />
      </div>
    </PageCard>
  );
};
