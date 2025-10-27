import { PageLoading } from "@ant-design/pro-layout";
import { useRequest } from "ahooks";
import { Col, Row, notification } from "antd";
import CustomCard from "components/custom-card";
import { BankList, PROPERTY_TYPE, RESPONSIBILITY_TYPE } from "config";
import { useAuthContext } from "context/auth";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import register_form from "service/registration-form";

const SentAC11A: React.FC = () => {
  const getAC11A = useRequest(register_form.getDocumentAC11A, {
    manual: true,
    onError(err) {
      notification.error({
        message: err.message,
      });
    },
  });

  const [user] = useAuthContext();
  useEffect(() => {
    getAC11A.runAsync();
  }, []);

  return (
    <div className="w-full">
      {getAC11A.loading ? (
        <PageLoading />
      ) : (
        <div className="flex flex-col gap-5">
          <Row gutter={[24, 24]}>
            <Col span={24}>
              <div className="bg-[#F5F8F8] p-[24px] rounded-xl break-all">
                <span className="text-base font-medium text-[#101828]">
                  Аж ахуйн нэгж, байгууллагын хаяг
                </span>
                <div className="grid grid-cols-2 gap-5">
                  <div className="w-full col-span-1 flex flex-col gap-5 mt-5">
                    <CustomCard
                      title="Регистрийн дугаар"
                      children={getAC11A.data?.company_rd}
                    />
                    <CustomCard
                      title="Аймаг / Нийслэл"
                      children={getAC11A.data?.city?.name}
                    />
                    <CustomCard
                      title="Сум /Дүүрэг"
                      children={getAC11A.data?.district?.name}
                    />
                    <CustomCard
                      title="Баг / Хороо"
                      children={getAC11A.data?.khoroo?.name}
                    />
                    <CustomCard
                      title="Гудамж / Хороолол"
                      children={getAC11A.data?.street}
                    />
                    <CustomCard
                      title="Байшин / Байр"
                      children={getAC11A.data?.building}
                    />
                    <CustomCard
                      title="Хашаа / Хаалганы дугаар"
                      children={getAC11A.data?.door_number}
                    />
                  </div>
                  <div className="w-full col-span-1 flex flex-col gap-5 mt-5">
                    <CustomCard
                      title="Утас"
                      children={getAC11A.data?.phone_number}
                    />
                    <CustomCard
                      title="Цахим шуудан"
                      children={getAC11A.data?.email}
                    />
                    <CustomCard
                      title="Цахим хуудас"
                      children={getAC11A.data?.website}
                    />
                    <CustomCard
                      title="Facebook холбоос"
                      children={getAC11A.data?.facebook}
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
                  Хариуцлагын хэлбэр
                </span>
                <div className="w-full col-span-1 flex flex-col gap-7 mt-5">
                  <CustomCard
                    title="Асрамжийн үйл ажиллагаа явуулж эхэлсэн он, сар, өдөр"
                    children={dayjs(getAC11A.data?.start_date).format(
                      "YYYY-MM-DD"
                    )}
                  />
                  <CustomCard
                    title="Хариуцлагын хэлбэр"
                    children={RESPONSIBILITY_TYPE.map((el) => {
                      return (
                        el.value === getAC11A.data?.responsibility_type &&
                        el.label
                      );
                    })}
                  />
                  <CustomCard
                    title="Өмчийн хэлбэр"
                    children={PROPERTY_TYPE.map((el) => {
                      return (
                        el.value === getAC11A.data?.property_type && el.label
                      );
                    })}
                  />
                </div>
              </div>
            </Col>
            <Col span={12}>
              <div className="bg-[#F5F8F8] p-[24px] rounded-xl">
                <span className="text-base font-medium text-[#101828]">
                  Хүчин чадлын үзүүлэлт
                </span>
                <div className="w-full col-span-1 flex flex-col gap-5 mt-5">
                  <CustomCard
                    title="Хүлээн авах боломжтой хүний тоо"
                    children={getAC11A.data?.possible_people_number}
                  />
                  <CustomCard
                    title="Орны тоо"
                    children={getAC11A.data?.bed_count}
                  />
                  <CustomCard
                    title="Ширээ"
                    children={getAC11A.data?.table_count}
                  />
                  <CustomCard
                    title="Сандал"
                    children={getAC11A.data?.chair_count}
                  />
                </div>
              </div>
            </Col>
          </Row>
          <Row gutter={[24, 24]}>
            <Col span={12}>
              <div className="bg-[#F5F8F8] p-[24px] rounded-xl">
                <span className="text-base font-medium text-[#101828]">
                  Холбоо барих хүний талаарх мэдээлэл
                </span>
                <div className="w-full col-span-1 flex flex-col gap-4 mt-5">
                  <CustomCard
                    title="Овог"
                    children={getAC11A.data?.contact_last_name}
                  />
                  <CustomCard
                    title="Нэр"
                    children={getAC11A.data?.contact_first_name}
                  />
                  <CustomCard
                    title="Албан тушаал"
                    children={getAC11A.data?.contact_position}
                  />
                  <CustomCard
                    title="Утас"
                    children={getAC11A.data?.contact_phone_number}
                  />
                  <CustomCard
                    title="Цахим шуудан"
                    children={getAC11A.data?.contact_email}
                  />
                </div>
              </div>
            </Col>
            <Col span={12}>
              <div className="bg-[#F5F8F8] p-[24px] rounded-xl">
                <span className="text-base font-medium text-[#101828]">
                  Хандив, төлбөр хүлээн авах мэдээлэл
                </span>
                <div className="w-full col-span-1 flex flex-col gap-4 mt-5">
                  <CustomCard
                    title="Банкны нэр"
                    children={BankList.map((el) => {
                      return (
                        el.value === getAC11A?.data?.payment?.bank_name &&
                        el.label
                      );
                    })}
                  />
                  <CustomCard
                    title="Дансны дугаар"
                    children={getAC11A?.data?.payment?.account_number || "-"}
                  />
                  <CustomCard
                    title="Хүлээн авагчийн нэр"
                    children={getAC11A?.data?.payment?.receiver_name || "-"}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default SentAC11A;
