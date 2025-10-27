import { useRequest } from "ahooks";
import { PageCard } from "components/card";
import { ITable } from "components/index";
import SymbolInformation from "components/symbol-information";
import InitTableHeader from "components/table-header";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import report from "service/report";
import { ReportMonthlyInterface } from "service/report/types";
import { reportForm } from "../store";
import { PlanTypeRender } from "./plan-type-render";
import StatusRender from "./status-render";

export interface DataInterface {
  title: string;
  type: string;
  hugatsaa: string;
  "1sar": number;
  "2sar": number;
  "3sar": number;
  "4sar": number;
  "5sar": number;
  "6sar": number;
  "7sar": number;
  "8sar": number;
  "9sar": number;
  "10sar": number;
  "11sar": number;
  "12sar": number;
}

const Monthly: React.FC = () => {
  const [store] = useAtom(reportForm);
  const navigate = useNavigate();

  const list = useRequest(report.listMonthly, {
    manual: true,
  });

  useEffect(() => {
    list.run({ ...store });
  }, [store]);

  const navigation = (
    record: ReportMonthlyInterface,
    month: number,
    code: string
  ) => {
    navigate(
      `/dashboard/report/${record.report_id}?isFirst=${
        month === 1
      }&code=${code}&month=${month}`
    );
  };

  return (
    <PageCard xR>
      <InitTableHeader
        store={reportForm}
        customHeaderTitle="Сар бүр"
        refresh={list.refresh}
        toolbarItems={<SymbolInformation />}
        hideCreate
        hideSearch
        hideFilter
        hideFormFilter
      />

      <ITable<ReportMonthlyInterface>
        columns={[
          {
            title: "Нэр",
            dataIndex: "name",
          },
          {
            title: "Төрөл",
            dataIndex: "plan_type",
            width: 100,
            render: (_, record) => <PlanTypeRender report={record} />,
          },
          {
            title: "Мэдээлэл оруулах хугацаа",
            dataIndex: "monthly_day",
            width: 200,
            render: (_, record) =>
              `Сар бүрийн ${record.monthly_day_start} - ${record.monthly_day_end} хооронд`,
          },
          ...(Array.from({ length: 12 }, (_, i) => ({
            title: `${i + 1} сар`,
            dataIndex: ["months", i, "status"],
            width: 50,
            align: "center",
            renderText: (value: any, record: ReportMonthlyInterface) => (
              <StatusRender
                status={value}
                navigate={() => navigation(record, i + 1, record?.code || "")}
                month={i + 1}
                tooltip={record?.months[i]?.return_description}
              />
            ),
          })) as any),
        ]}
        loading={list.loading}
        pagination={false}
        hidePagination
        dataSource={list.data || []}
        hideAction
        scroll={{
          x: "max-content",
        }}
      />
    </PageCard>
  );
};

export default Monthly;
