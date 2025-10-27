import { PageCard } from "components/card";
import { StaticCard } from "../component/card";
import register_form from "service/registration-form";
import { useRequest } from "ahooks";
import { notification } from "antd";
import { useEffect } from "react";
import { moneyFormat } from "utils/index";

export const BAC12List = () => {
  const getAC12 = useRequest(register_form.getdocumentAC12, {
    manual: true,
    onError(err) {
      notification.error({
        message: err.message,
      });
    },
  });

  useEffect(() => {
    getAC12.run();
  }, []);

  return (
    <PageCard className="  rounded-2xl p-6">
      <div className="text-gray-700 font-semibold">
        Б-АС-1.2 - Төрөлжсөн асрамжийн үйл ажиллагаа эрхэлдэг аж ауйн нэгж,
        байгууллагын орлого, зарлага, хөрөнгийн мэдээ
      </div>
      <div className="space-y-6 mt-6">
        <StaticCard
          title="Орлого (Төгрөгөөр)"
          data={getAC12.data}
          items={[
            {
              label: "Борлуулалтын орлого",
              value: ["income", "sales_revenue"],
              isMoney: true,
            },
            {
              label: "Улсын төсвөөс авсан татаас",
              value: ["income", "subsidy_from_government"],
              isMoney: true,
            },
            {
              label: "Үндсэн бус үйл ажиллагааны орлого",
              value: ["income", "non_core"],
              isMoney: true,
            },
            {
              label: "Бусад орлого (Тодорхойлж бичих)",
              value: ["income", "other"],
              isMoney: true,
            },
            {
              label: "Нийт орлого",
              value: ["income", "total"],
              isMoney: true,
            },
          ]}
        />
        <StaticCard
          title="Зардал (Төгрөгөөр)"
          data={getAC12.data || {}}
          items={[
            {
              label: "Түүхий эд, материалын зардал",
              value: ["expenses", "raw_materials"],
              isMoney: true,
            },
            {
              label: "Дахин борлуулахаар худалдан авсан барааны өртөг",
              value: ["expenses", "goods_purchased_for_sale"],
              isMoney: true,
            },
            {
              label: "Үйлчилгээний зардал",
              value: ["expenses", "service"],
              isMoney: true,
            },
            {
              label: "Нийт цалин хөлс",
              value: ["expenses", "salary"],
              isMoney: true,
            },
            {
              label: "Бусад зардал",
              value: ["expenses", "other"],
              isMoney: true,
            },

            {
              label: "Татвар, хураамж",
              value: ["expenses", "taxes_and_fees"],
              isMoney: true,
            },
            {
              label: "Нийт зардал",
              value: ["expenses", "total"],
              isMoney: true,
            },
            {
              label: "Ашиг/ алдагдал",
              value: ["expenses", "profit_and_loss"],
              isMoney: true,
            },
          ]}
        />
        <StaticCard
          title="Үл хөдлөх хөрөнгө"
          data={getAC12.data?.real_estate || {}}
          items={[
            {
              label: "Орон сууцны барилга",
              value: "residential",
              isMoney: true,
            },
            {
              label: "Орон сууцны бус барилга",
              value: "non_residential",
              isMoney: true,
            },
            {
              label: "Газар",
              value: "land",
              isMoney: true,
            },
            {
              label: "Тоног төхөөрөмж",
              value: "equipment",
              isMoney: true,
            },
            {
              label: "Тавилга, эд хогшил",
              value: "furniture",
              isMoney: true,
            },
            {
              label: "Нийт",
              value: "total",
              render: () => {
                return moneyFormat(
                  (getAC12.data?.real_estate?.residential ?? 0) +
                    (getAC12.data?.real_estate?.non_residential ?? 0) +
                    (getAC12.data?.real_estate?.land ?? 0) +
                    (getAC12.data?.real_estate?.equipment ?? 0) +
                    (getAC12.data?.real_estate?.furniture ?? 0)
                );
              },
            },
          ]}
        />

        <StaticCard
          data={getAC12.data?.movable_assets || {}}
          title="Хөдлөх хөрөнгө (Төгрөгөөр)"
          items={[
            {
              label: "Машин, тээврийн хэрэгсэл, тоног төхөөрөмж",
              value: "vehicles_equipment",
              isMoney: true,
            },
            {
              label: "Хангамжийн материал",
              value: "bed",
              isMoney: true,
            },
            {
              label: "Ор",
              value: "bed",
              isMoney: true,
            },
            {
              label: "Ширээ",
              value: "table",
              isMoney: true,
            },
            {
              label: "Сандал",
              value: "chair",
              isMoney: true,
            },
            {
              label: "Мал, амьтад",
              value: "animal",
              isMoney: true,
            },
            {
              label: "Нийт",
              value: "total",
              render: () => {
                return moneyFormat(
                  (getAC12.data?.movable_assets?.vehicles_equipment ?? 0) +
                    (getAC12.data?.movable_assets?.supply_materials ?? 0) +
                    (getAC12.data?.movable_assets?.bed ?? 0) +
                    (getAC12.data?.movable_assets?.table ?? 0) +
                    (getAC12.data?.movable_assets?.chair ?? 0) +
                    (getAC12.data?.movable_assets?.animal ?? 0)
                );
              },
            },
          ]}
        />
      </div>
    </PageCard>
  );
};
