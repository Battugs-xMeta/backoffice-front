import { PageLoading } from "@ant-design/pro-layout";
import { useRequest } from "ahooks";
import { Col, Row, notification } from "antd";
import CustomCard from "components/custom-card";
import { HOT_WATERSUPPLY_TYPE } from "config";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import register_form from "service/registration-form";
import {
  heatingSourcebuttons,
  ownershipFormButtons,
  propertyFormButtons,
  roomNumberButtons,
  sourceWaterButtons,
} from "../../new-and-returned/AC11B/buildings-facilities";
import { moneyFormat } from "utils/index";

const SentAC11B: React.FC = () => {
  const getAC11B = useRequest(register_form.getDocumentAC11B, {
    manual: true,
    onError(err) {
      notification.error({
        message: err.message,
      });
    },
  });

  useEffect(() => {
    getAC11B.runAsync();
  }, []);

  return (
    <div className="w-full">
      {getAC11B.loading ? (
        <PageLoading />
      ) : (
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-5">
            {getAC11B?.data?.buildings?.map((el, key) => {
              return (
                <>
                  <Row gutter={[24, 24]}>
                    <Col span={24}>
                      <div className="bg-[#F5F8F8] p-[24px] rounded-xl">
                        <span className="text-base font-medium text-[#101828]">
                          Ерөнхий мэдээлэл (Барилга-{key + 1})
                        </span>
                        <div className="grid grid-cols-2 gap-5">
                          <div className="w-full col-span-1 flex flex-col gap-5 mt-5">
                            <CustomCard
                              title="Барилга ашиглалтанд орсон огноо"
                              children={
                                dayjs(el.date_of_construction).format(
                                  "YYYY-MM-DD"
                                ) ?? "-"
                              }
                            />
                            <CustomCard
                              title="Халуун усны хангамж"
                              children={HOT_WATERSUPPLY_TYPE.map((value) => {
                                const matchingBuilding =
                                  el.hot_water_supply === value.value &&
                                  value.label;
                                return matchingBuilding ? value.label : null;
                              })}
                            />
                            <CustomCard
                              title="Өмчийн хэлбэр"
                              children={propertyFormButtons.map((value) => {
                                const matchingBuilding =
                                  el.property_type === value.value &&
                                  value.label;
                                return matchingBuilding ? value.label : null;
                              })}
                            />
                            <CustomCard
                              title="Эзэмшлийн хэлбэр"
                              children={ownershipFormButtons.map((value) => {
                                const matchingBuilding =
                                  el.possession_type === value.value &&
                                  value.label;
                                return matchingBuilding ? value.label : null;
                              })}
                            />
                            <CustomCard
                              title="Өрөөний тоо"
                              children={roomNumberButtons.map((value) => {
                                const matchingBuilding =
                                  el.room_count_type === value.value &&
                                  value.label;
                                return matchingBuilding ? value.label : null;
                              })}
                            />
                            <CustomCard
                              title="Хөгжлийн бэрхшээлтэй хүнд зориулсан ариун цэврийн өрөө"
                              children={
                                el.is_have_disable_person_toilet
                                  ? "Байгаа"
                                  : "Байхгүй"
                              }
                            />
                          </div>
                          <div className="w-full col-span-1 flex flex-col gap-5 mt-5">
                            <CustomCard
                              title="Хаяг, байршил"
                              children={el.full_address}
                            />

                            <CustomCard
                              title="Ундны усны эх үүсвэр"
                              children={sourceWaterButtons.map((value) => {
                                const matchingBuilding =
                                  el.source_of_water === value.value &&
                                  value.label;
                                return matchingBuilding ? value.label : null;
                              })}
                            />
                            <CustomCard
                              title="Сургалт, хүмүүжлийн тусгай өрөө"
                              children={
                                el.is_have_train_room ? "Байгаа" : "Байхгүй"
                              }
                            />
                            <CustomCard
                              title="Хөгжлийн бэрхшээлтэй иргэнд тусгайлан тохижуулсан
                       (налуу зам, цахилгаан шат) ариун цэврийн байгууламж"
                              children={
                                el.is_have_disable_person_sanitary_facilities
                                  ? "Байгаа"
                                  : "Байхгүй"
                              }
                            />

                            <CustomCard
                              title="Халаалтын эх үүсвэр"
                              children={heatingSourcebuttons.map((value) => {
                                const matchingBuilding =
                                  el.heat_source === value.value && value.label;
                                return matchingBuilding ? value.label : null;
                              })}
                            />
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row gutter={[24, 24]}>
                    <Col span={12}>
                      <div className="bg-[#F5F8F8] p-[24px] rounded-xl">
                        <span className="text-base font-medium text-[#101828]">
                          Ус татуургын бие засах газар
                        </span>
                        <div className="w-full col-span-1 flex flex-col gap-8 mt-5">
                          <CustomCard
                            title="Төвлөрсөн системд холбогдсон"
                            children={el?.toilet.connected_centralized}
                          />
                          <CustomCard
                            title="Битүү тунгаагуур руу урсдаг"
                            children={el?.toilet.flow}
                          />
                          <CustomCard
                            title="Нүхэн жорлон руу урсдаг"
                            children={el.toilet.flow_pit}
                          />
                        </div>
                      </div>
                    </Col>
                    <Col span={12}>
                      <div className="bg-[#F5F8F8] p-[24px] rounded-xl">
                        <span className="text-base font-medium text-[#101828]">
                          Нүхэн жорлон
                        </span>
                        <div className="w-full col-span-1 flex flex-col gap-3 mt-5">
                          <CustomCard
                            title="Сайжруулсан"
                            children={el?.pit_toilet.improved}
                          />
                          <CustomCard
                            title="Энгийн"
                            children={el.pit_toilet.simple}
                          />
                          <CustomCard
                            title="Задгай нүх"
                            children={el?.pit_toilet.open_hole}
                          />
                          <CustomCard
                            title="Био жорлон"
                            children={el?.pit_toilet.bio}
                          />
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row gutter={[24, 24]}>
                    <Col span={24}>
                      <div className="bg-[#F5F8F8] p-[24px] rounded-xl">
                        <span className="text-base font-medium text-[#101828]">
                          Барилгын нийт талбайн хэмжээ
                        </span>
                        <div className="grid grid-cols-2 gap-5">
                          <div className="w-full col-span-1 flex flex-col gap-5 mt-5">
                            <CustomCard
                              title="Сууц"
                              children={el?.area.residential + " м²"}
                            />
                            <CustomCard
                              title="Бусад"
                              children={el?.area.other + " м²"}
                            />
                          </div>
                          <div className="w-full col-span-1 flex flex-col gap-5 mt-5">
                            <CustomCard
                              title="Үйлчилгээ"
                              children={el?.area.for_service + " м²"}
                            />
                            <CustomCard
                              title="Нийт"
                              children={el?.area.total + " м²"}
                            />
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row gutter={[24, 24]}>
                    <Col span={24}>
                      <div className="bg-[#F5F8F8] p-[24px] rounded-xl">
                        <span className="text-base font-medium text-[#101828]">
                          Засвар үйлчилгээний мэдээлэл
                        </span>
                        <div className="grid grid-cols-2 gap-5">
                          <div className="w-full col-span-1 flex flex-col gap-5 mt-5">
                            <CustomCard
                              title="Засвар үйлчилгээ хийсэн эсэх"
                              children={
                                el?.maintenance.is_done ? "Тийм" : "Үгүй"
                              }
                            />
                            <CustomCard
                              title="Цаашид үйл ажиллагаа явуулах боломжтой эсэх"
                              children={
                                el?.maintenance.is_further_possible
                                  ? "Тийм"
                                  : "Үгүй"
                              }
                            />
                            <CustomCard
                              title="Их засвар хийсэн огноо"
                              children={
                                dayjs(
                                  el?.maintenance?.date_of_major_renovation
                                ).format("YYYY-MM-DD") ?? "-"
                              }
                            />
                          </div>
                          <div className="w-full col-span-1 flex flex-col gap-5 mt-5">
                            <CustomCard
                              title="Мөнгөн дүн"
                              children={
                                moneyFormat(
                                  el?.maintenance.major_renovation_amount
                                ) + " ₮"
                              }
                            />
                            <CustomCard
                              title="Урсгал засвар хийсэн огноо"
                              children={
                                dayjs(
                                  el?.maintenance?.date_of_maintenance
                                ).format("YYYY-MM-DD") ?? "-"
                              }
                            />
                            <CustomCard
                              title="Мөнгөн дүн"
                              children={
                                moneyFormat(
                                  el?.maintenance.date_of_maintenance_amount
                                ) + " ₮"
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </>
              );
            })}
          </div>
          <Row gutter={[24, 24]}>
            <Col span={24}>
              <div className="bg-[#F5F8F8] p-[20px] rounded-xl">
                <span className="text-base font-medium text-[#101828] ">
                  Тоног төхөөрөмжийн мэдээлэл
                </span>
                <div className="flex gap-3">
                  <Col span={12}>
                    <div className="grid grid-cols-1 gap-5 bg-[#FFFFFF] p-[24px] rounded-xl mt-5">
                      <span className="text-base font-medium text-[#101828] ">
                        Тээврийн хэрэгсэл
                      </span>
                      <div className="w-full col-span-1 flex flex-col gap-5 mt-5">
                        <CustomCard
                          title="Машин, тээврийн хэрэгсэл"
                          children={
                            getAC11B?.data?.equipment?.is_have_vehicles
                              ? "Байгаа"
                              : "Байхгүй"
                          }
                        />
                        <CustomCard
                          title="Суудлын"
                          children={getAC11B?.data?.equipment?.car_count || "-"}
                        />
                        <CustomCard
                          title="Автобус"
                          children={getAC11B?.data?.equipment?.bus_count || "-"}
                        />
                        <CustomCard
                          title="Ачааны"
                          children={
                            getAC11B?.data?.equipment?.truck_count || "-"
                          }
                        />
                        <CustomCard
                          title="Мотоцикл"
                          children={
                            getAC11B?.data?.equipment?.motorcycle_count || "-"
                          }
                        />
                        <CustomCard
                          title="Тусгай зориулалтын"
                          children={
                            getAC11B?.data?.equipment?.special_purpose_count ||
                            "-"
                          }
                        />
                        <CustomCard
                          title="Байгууллагын эзэмшлийн"
                          children={
                            getAC11B?.data?.equipment?.company_owned_count ||
                            "-"
                          }
                        />
                        <CustomCard
                          title="Бусдын эзэмшлийн"
                          children={
                            getAC11B?.data?.equipment?.other_owned_count || "-"
                          }
                        />
                      </div>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className="grid grid-cols-1 gap-5 bg-[#FFFFFF] p-[24px] rounded-xl mt-5">
                      <span className="text-base font-medium text-[#101828] ">
                        Бусад
                      </span>
                      <div className="w-full col-span-1 flex flex-col gap-5 mt-5">
                        <CustomCard
                          title="Ор"
                          children={getAC11B?.data?.bed_count || "-"}
                        />
                        <CustomCard
                          title="Ширээ"
                          children={getAC11B?.data?.table_count || "-"}
                        />
                        <CustomCard
                          title="Сандал"
                          children={getAC11B?.data?.chair_count || "-"}
                        />
                        <CustomCard
                          title="Компьютер, тоног төхөөрөмж"
                          children={getAC11B?.data?.computer_count || "-"}
                        />
                        <CustomCard
                          title="Мал, амьтад"
                          children={getAC11B?.data?.animal_count || "-"}
                        />
                      </div>
                    </div>
                  </Col>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default SentAC11B;
