import { useRequest } from "ahooks";
import { PageCard } from "components/card";
import { useAtom } from "jotai";
import { useEffect } from "react";
import reportDetail from "service/report-detail";
import { reportDetailForm } from "../../store";
import { ITable } from "components/table";
import { Profile } from "components/profile";
import { dateFormat } from "utils/index";
import { TransictionsStatus } from "config";

export const BAC15List = () => {
  const [store] = useAtom(reportDetailForm);
  const fetch = useRequest(reportDetail.getACMovements, { manual: true });

  useEffect(() => {
    fetch.run({
      ...store,
      is_first: store.isFirst,
      report_plan_id: store.plan?.report_plan_id,
      is_dead: false,
    });
  }, []);

  return (
    <PageCard
      xR
      className="  rounded-2xl  "
      bodyClassName=" space-y-4"
      title="Б-АС-1.5 - Төрөлжсөн асрамжийн үйл ажиллагаа эрхэлдэг аж ахуйн нэгж, байгууллагаар асруулагчийн шилжилт хөдөлгөөний мэдээ"
      titleClassName="px-4"
    >
      <ITable
        dataSource={fetch.data || []}
        loading={fetch.loading}
        columns={[
          {
            title: "Ургийн овог",
            dataIndex: "elderly",
            render: (_, record) => <Profile user={record.elderly} />,
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
            title: "Шилжсэн огноо",
            dataIndex: "out_date",
            renderText: (value) => dateFormat(value),
          },
          {
            title: "Шилжсэн төрөл",
            dataIndex: "movement_type",
            renderText: (value) => (TransictionsStatus as any)?.[value],
          },
          {
            title: "Шилжсэн газар",
            dataIndex: ["to_care_center", "organization_name"],
          },
          {
            title: "Шилжсэн шалтгаан",
            dataIndex: "description",
          },
        ]}
      />
    </PageCard>
  );
};
