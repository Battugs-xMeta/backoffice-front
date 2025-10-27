import { PageLoading } from "@ant-design/pro-layout";
import { useRequest } from "ahooks";
import { Col, Row, notification } from "antd";
import CustomCard from "components/custom-card";
import React, { useEffect } from "react";
import register_form from "service/registration-form";
import { moneyFormat } from "utils/index";

const SentAC12: React.FC = () => {
  const getAC12 = useRequest(register_form.getdocumentAC12, {
    manual: true,
    onError(err) {
      notification.error({
        message: err.message,
      });
    },
  });

  useEffect(() => {
    getAC12.runAsync();
  }, []);

  const totalIncome =
    (getAC12.data?.income?.sales_revenue || 0) +
    (getAC12.data?.income?.subsidy_from_government || 0) +
    (getAC12.data?.income?.non_core || 0) +
    (getAC12.data?.income?.other || 0);

  const totalExpense =
    (getAC12.data?.expenses?.raw_materials || 0) +
    (getAC12.data?.expenses?.goods_purchased_for_sale || 0) +
    (getAC12.data?.expenses?.service || 0) +
    (getAC12.data?.expenses?.salary || 0) +
    (getAC12.data?.expenses?.other || 0) +
    (getAC12.data?.expenses?.taxes_and_fees || 0);

  const totalNotMivng =
    (getAC12.data?.real_estate?.residential ?? 0) +
    (getAC12.data?.real_estate?.non_residential ?? 0) +
    (getAC12.data?.real_estate?.land ?? 0) +
    (getAC12.data?.real_estate?.equipment ?? 0) +
    (getAC12.data?.real_estate?.furniture ?? 0);

  const totalMoving =
    (getAC12.data?.movable_assets?.vehicles_equipment ?? 0) +
    (getAC12.data?.movable_assets?.supply_materials ?? 0) +
    (getAC12.data?.movable_assets?.bed ?? 0) +
    (getAC12.data?.movable_assets?.table ?? 0) +
    (getAC12.data?.movable_assets?.chair ?? 0) +
    (getAC12.data?.movable_assets?.animal ?? 0);
  return (
    <div className="w-full">
      {getAC12.loading ? (
        <PageLoading />
      ) : (
        <div className="flex flex-col gap-5">
          <Row gutter={[24, 24]}>
            <Col span={12}>
              <div className="bg-[#F5F8F8] p-[24px] rounded-xl">
                <span className="text-base font-medium text-[#101828]">
                  Орлого (Төгрөгөөр)
                </span>
                <div className="grid grid-cols-1 gap-5">
                  <div className="w-full col-span-1 flex flex-col gap-5 mt-5">
                    <CustomCard
                      title="Борлуулалтын орлого"
                      children={
                        moneyFormat(getAC12.data?.income?.sales_revenue) + " ₮"
                      }
                    />
                    <CustomCard
                      title="Улсын төсвөөс авсан татаас"
                      children={
                        moneyFormat(
                          getAC12.data?.income?.subsidy_from_government
                        ) + " ₮"
                      }
                    />
                    <CustomCard
                      title="Үндсэн бус үйл ажиллагааны орлого"
                      children={
                        moneyFormat(getAC12.data?.income?.non_core) + " ₮"
                      }
                    />
                    <CustomCard
                      title="Бусад орлого (Тодорхойлж бичих)"
                      children={moneyFormat(getAC12.data?.income?.other) + " ₮"}
                    />
                    <CustomCard
                      title="Нийт орлого"
                      children={moneyFormat(totalIncome) + " ₮"}
                    />
                  </div>
                </div>
              </div>
            </Col>
            <Col span={12}>
              <div className="bg-[#F5F8F8] p-[24px] rounded-xl">
                <span className="text-base font-medium text-[#101828]">
                  Зардал (Төгрөгөөр)
                </span>
                <div className="grid grid-cols-1 gap-5">
                  <div className="w-full col-span-1 flex flex-col gap-5 mt-5">
                    <CustomCard
                      title="Түүхий эд, материалын зардал"
                      children={
                        moneyFormat(getAC12.data?.expenses?.raw_materials) +
                        " ₮"
                      }
                    />
                    <CustomCard
                      title="Дахин борлуулахаар худалдан авсан барааны өртөг"
                      children={
                        moneyFormat(
                          getAC12.data?.expenses?.goods_purchased_for_sale
                        ) + " ₮"
                      }
                    />
                    <CustomCard
                      title="Үйлчилгээний зардал"
                      children={
                        moneyFormat(getAC12.data?.expenses?.service) + " ₮"
                      }
                    />
                    <CustomCard
                      title="Нийт цалин хөлс"
                      children={
                        moneyFormat(getAC12.data?.expenses?.salary) + " ₮"
                      }
                    />
                    <CustomCard
                      title="Бусад зардал"
                      children={
                        moneyFormat(getAC12.data?.expenses?.other) + " ₮"
                      }
                    />
                    <CustomCard
                      title="Татвар, хураамж"
                      children={
                        moneyFormat(getAC12.data?.expenses?.taxes_and_fees) +
                        " ₮"
                      }
                    />
                    <CustomCard
                      title="Нийт зардал"
                      children={moneyFormat(totalExpense) + " ₮"}
                    />
                    <CustomCard
                      title="Ашиг/ алдагдал"
                      children={
                        moneyFormat(getAC12.data?.expenses?.profit_and_loss) +
                        " ₮"
                      }
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
                  Үл хөдлөх хөрөнгө
                </span>
                <div className="grid grid-cols-1 gap-5">
                  <div className="w-full col-span-1 flex flex-col gap-5 mt-5">
                    <CustomCard
                      title="Орон сууцны барилга"
                      children={
                        moneyFormat(getAC12.data?.real_estate?.residential) +
                        " ₮"
                      }
                    />
                    <CustomCard
                      title="Орон сууцны бус барилга"
                      children={
                        moneyFormat(
                          getAC12.data?.real_estate?.non_residential
                        ) + " ₮"
                      }
                    />
                    <CustomCard
                      title="Газар"
                      children={
                        moneyFormat(getAC12.data?.real_estate?.land) + " ₮"
                      }
                    />
                    <CustomCard
                      title="Тоног төхөөрөмж"
                      children={
                        moneyFormat(getAC12.data?.real_estate?.equipment) + " ₮"
                      }
                    />
                    <CustomCard
                      title="Тавилга, эд хогшил"
                      children={
                        moneyFormat(getAC12.data?.real_estate?.furniture) + " ₮"
                      }
                    />
                    <CustomCard
                      title="Нийт"
                      children={moneyFormat(totalNotMivng) + " ₮"}
                    />
                  </div>
                </div>
              </div>
            </Col>
            <Col span={12}>
              <div className="bg-[#F5F8F8] p-[24px] rounded-xl">
                <span className="text-base font-medium text-[#101828]">
                  Хөдлөх хөрөнгө (Төгрөгөөр)
                </span>
                <div className="grid grid-cols-1 gap-5">
                  <div className="w-full col-span-1 flex flex-col gap-5 mt-5">
                    <CustomCard
                      title="Машин, тээврийн хэрэгсэл, тоног төхөөрөмж"
                      children={
                        moneyFormat(
                          getAC12.data?.movable_assets?.vehicles_equipment
                        ) + " ₮"
                      }
                    />
                    <CustomCard
                      title="Хангамжийн материал"
                      children={
                        moneyFormat(
                          getAC12.data?.movable_assets?.supply_materials
                        ) + " ₮"
                      }
                    />
                    <CustomCard
                      title="Ор"
                      children={
                        moneyFormat(getAC12.data?.movable_assets?.bed) + " ₮"
                      }
                    />
                    <CustomCard
                      title="Ширээ"
                      children={
                        moneyFormat(getAC12.data?.movable_assets?.table) + " ₮"
                      }
                    />
                    <CustomCard
                      title="Сандал"
                      children={
                        moneyFormat(getAC12.data?.movable_assets?.chair) + " ₮"
                      }
                    />
                    <CustomCard
                      title="Мал, амьтад"
                      children={
                        moneyFormat(getAC12.data?.movable_assets?.animal) + " ₮"
                      }
                    />
                    <CustomCard
                      title="Нийт"
                      children={moneyFormat(totalMoving) + " ₮"}
                    />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default SentAC12;
