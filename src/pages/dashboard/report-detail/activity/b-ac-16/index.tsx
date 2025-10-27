import { useRequest } from "ahooks";
import { PageCard } from "components/card";
import { FileRender } from "components/file-render";
import { Profile } from "components/profile";
import { ITable } from "components/table";
import { useAtom } from "jotai";
import { useEffect } from "react";
import reportDetail from "service/report-detail";
import { dateFormat } from "utils/index";
import { reportDetailForm } from "../../store";

export const BAC16List = () => {
  const [store] = useAtom(reportDetailForm);
  const fetch = useRequest(reportDetail.getACMovements, { manual: true });

  useEffect(() => {
    if (store.plan)
      fetch.run({
        ...store,
        is_first: false,
        report_plan_id: store.plan?.report_plan_id,
        is_dead: true,
      });
  }, [store]);

  return (
    <PageCard
      xR
      className="  rounded-2xl "
      bodyClassName=" space-y-4"
      title="Б-АС-1.6 - Нас барсан асруулагчийн мэдээ"
      titleClassName="px-4"
    >
      <ITable
        dataSource={fetch.data || []}
        hideAction
        hidePagination
        loading={fetch.loading}
        columns={[
          {
            title: "Ургийн овог",
            dataIndex: "elderly",
            render: (_, record) => <Profile user={record?.elderly} />,
          },
          {
            title: "Овог",
            dataIndex: ["elderly", "last_name"],
          },
          {
            title: "Нэр",
            dataIndex: ["elderly", "first_name"],
          },
          {
            title: "Регистрийн дугаар",
            dataIndex: ["elderly", "rd"],
          },
          {
            title: "Хүйс",
            dataIndex: ["elderly", "gender"],
            renderText: (value) => (value === 0 ? "Эрэгтэй" : "Эмэгтэй"),
          },
          {
            title: "Аймаг / Нийслэл",
            dataIndex: ["elderly", "address", "city", "name"],
          },
          {
            title: "Сум / Дүүрэг",
            dataIndex: ["elderly", "address", "district", "name"],
          },
          {
            title: "Баг / Хороо",
            dataIndex: ["elderly", "address", "khoroo", "name"],
          },
          {
            title: "Нас барсан огноо",
            dataIndex: "death_date",
            renderText: (value) => dateFormat(value),
          },
          {
            title: "Оршуулсан байршил",
            dataIndex: "burial_address",
          },
          {
            title: "Нас барсны гэрчилгээ",
            dataIndex: "death_certificate",
            render: (_, record) => (
              <div className="space-y-2">
                {record.death_certificate?.map((el, key) => (
                  <FileRender
                    staticFileIcon
                    data={el}
                    key={key}
                    width={32}
                    height={32}
                    className="items-center"
                  />
                ))}
              </div>
            ),
          },
          {
            title: "Шүүх эмнэлэгийн тодорхойлолт",
            dataIndex: "forensic_definition",
            render: (_, record) => (
              <div className="space-y-2">
                {record.forensic_definition?.map((el, key) => (
                  <FileRender
                    staticFileIcon
                    data={el}
                    key={key}
                    width={32}
                    height={32}
                    className="items-center"
                  />
                ))}
              </div>
            ),
          },
          {
            title: "Буяны ажил гүйцэтгэгч байгууллага",
            dataIndex: ["charity_work", "company_name"],
          },
          {
            title: "Тайлбар",
            dataIndex: "description",
          },
        ]}
      />
    </PageCard>
  );
};
