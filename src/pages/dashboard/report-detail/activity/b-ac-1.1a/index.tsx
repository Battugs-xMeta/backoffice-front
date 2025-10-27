import { useRequest } from "ahooks";
import { PageCard } from "components/card";
import { PROPERTY_TYPE, RESPONSIBILITY_TYPE } from "config";
import { useAtom } from "jotai";
import { useEffect } from "react";
import register_form from "service/registration-form";
import { reportDetailForm } from "../../store";
import { StaticCard } from "../component/card";

export const BAC11AList = () => {
  const [store] = useAtom(reportDetailForm);
  const fetch = useRequest(register_form.getDocumentAC11A, { manual: true });

  useEffect(() => {
    fetch.run();
  }, [store]);

  return (
    <PageCard className="  rounded-2xl p-6">
      <div className="text-gray-700 font-semibold">
        Б-АС-1.1А - Төрөлжсөн асрамжийн үйл ажиллагаа эрхэлдэг аж ауйн нэгж,
        байгууллагын мэдээ
      </div>
      <div className="space-y-6 mt-6">
        <StaticCard
          data={fetch.data || []}
          title="Аж ахуйн нэгж, байгууллагын хаяг"
          items={[
            {
              label: "Регистрийн дугаар",
              value: "company_rd",
            },
            {
              label: "Аймаг / Нийслэл",
              value: ["city", "name"],
            },
            {
              label: "Сум /Дүүрэг",
              value: ["district", "name"],
            },
            {
              label: "Баг / Хороо",
              value: ["khoroo", "name"],
            },
            {
              label: "Гудамж / Хороолол",
              value: "street",
            },
            {
              label: "Байшин / Байр",
              value: "building",
            },
            {
              label: "Хашаа / Хаалганы  дугаар",
              value: "door_number",
            },
            {
              label: "Утас",
              value: "phone_number",
            },
            {
              label: "Цахим шуудан",
              value: "email",
            },
            {
              label: "Цахим хуудас",
              value: "website",
            },
            {
              label: "Facebook холбоос",
              value: "facebook",
            },
          ]}
        />
        <StaticCard
          data={fetch.data || []}
          title="Хариуцлагын хэлбэр"
          items={[
            {
              label: "Үйл ажиллагаа явуулж эхэлсэн огноо",
              value: "start_date",
              type: "DATE",
            },
            {
              label: "Хариуцлагын хэлбэр",
              value: "responsibility_type",
              type: "ENUM",
              enums: RESPONSIBILITY_TYPE,
            },
            {
              label: "Өмчийн хэлбэр",
              value: "property_type",
              enums: PROPERTY_TYPE,
              type: "ENUM",
            },
          ]}
        />
        <StaticCard
          title="Хүчин чадлын үзүүлэлт"
          data={fetch.data || []}
          items={[
            {
              label: "Хүлээн авах боломжтой хүний тоо",
              value: "possible_people_number",
            },
            {
              label: "Орны тоо",
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
          ]}
        />
      </div>
    </PageCard>
  );
};
