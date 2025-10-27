import { useRequest } from "ahooks";
import { Card, Flex, Tag } from "antd";
import { ITable } from "components/index";
import SymbolInformation from "components/symbol-information";
import InitTableHeader from "components/table-header";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import report from "service/report";
import { ReportHalfYearInterface } from "service/report/types";
import { reportForm } from "../store";
import { PlanTypeRender } from "./plan-type-render";
import StatusRender from "./status-render";

export interface DataInterface {
  title: string;
  type: string;
  hugatsaa: string;
  half_year: number;
  end_year: number;
}

const HalfYear: React.FC = () => {
  const [store] = useAtom(reportForm);
  const navigate = useNavigate();

  const list = useRequest(report.listHalfYear, {
    manual: true,
  });

  useEffect(() => {
    list.run({ ...store });
  }, [store]);

  const navigation = (
    record: ReportHalfYearInterface,
    month: number,
    code: string
  ) => {
    navigate(
      `/dashboard/report/${record.report_id}?isFirst=${
        month === 0
      }&code=${code}`
    );
  };

  return (
    <Card bodyStyle={{ padding: 0 }} className="py-4 " bordered={false}>
      <InitTableHeader
        store={reportForm}
        customHeaderTitle="Хагас жил бүр"
        hideCreate
        refresh={list.refresh}
        hideFormFilter
        hideFilter
        hideSearch
        toolbarItems={<SymbolInformation />}
      />

      <ITable<ReportHalfYearInterface>
        columns={[
          {
            title: "Нэр",
            dataIndex: "name",
          },
          {
            title: "Төрөл",
            dataIndex: "plan_type",
            renderText: (_, record) => <PlanTypeRender report={record} />,
          },
          {
            title: "Мэдээлэл оруулах хугацаа",
            dataIndex: "monthly_day",
            render: (_, record) => (
              <div className="space-y-2">
                <div className="flex item-center gap-2 ">
                  <span className="text-xs text-gray-700">Хагас жил : </span>{" "}
                  <Tag className="h-fit ml-4">
                    {record.half_year_month_start} сарын{" "}
                    {record.half_year_month_start_day}
                  </Tag>
                  <div>-</div>
                  <Tag className="h-fit">
                    {record?.half_year_month_start_deadline} сарын{" "}
                    {record.half_year_month_start_day_deadline}
                  </Tag>
                </div>
                <div className="flex item-center gap-2">
                  <span className="text-xs text-gray-700">Жилийн эцэс :</span>
                  <Tag className="h-fit">
                    {record.half_year_month_end} сарын{" "}
                    {record.half_year_month_end_day}
                  </Tag>
                  <div>-</div>
                  <Tag className="h-fit">
                    {record?.half_year_month_end_deadline} сарын{" "}
                    {record.half_year_month_end_day_deadline}
                  </Tag>{" "}
                </div>
              </div>
            ),
          },
          {
            title: "Хагас жил",
            dataIndex: ["half_year", 0, "status"],
            align: "center",
            renderText: (value, record) => (
              <Flex justify="center">
                <StatusRender
                  tooltip={record.half_year[0]?.return_description}
                  status={value}
                  isHalfYear
                  navigate={() => navigation(record, 0, record?.code || "")}
                />
              </Flex>
            ),
          },
          {
            title: "Жилийн эцэс",
            dataIndex: ["half_year", 1, "status"],
            align: "center",
            renderText: (value, record) => (
              <Flex justify="center">
                <StatusRender
                  tooltip={record.half_year[1]?.return_description}
                  status={value}
                  isHalfYear
                  navigate={() => navigation(record, 1, record?.code || "")}
                />
              </Flex>
            ),
          },
        ]}
        hidePagination
        pagination={false}
        loading={list.loading}
        dataSource={list.data}
        hideAction
      />
    </Card>
  );
};

export default HalfYear;
