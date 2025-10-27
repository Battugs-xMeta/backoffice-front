import {
  SaveOutlined
} from "@ant-design/icons";
import { ProFormInstance } from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Button, Flex, notification } from "antd";
import { IAlert } from "components/alert";
import { PageCard } from "components/card";
import { IfCondition } from "components/condition";
import { ITable } from "components/table";
import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import reportDetail from "service/report-detail";
import { ReportUniteNumberInterface } from "service/report-detail/type";
import { REPORT_STATUS } from "service/report/types";
import { moneyFormat } from "utils/index";
import { reportDetailForm } from "../store";

const moneyField = () => {
  return () => ({
    size: "small",
    formatter: (value: any, record: any) => {
      return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    addonBefore: "₮",
    className: "w-[150px]",
  });
};

const numberField = () => {
  return () => ({
    size: "small",
  });
};

const formItemProps = {
  formItemProps: {
    rules: [
      {
        required: true,
        message: "Тоо оруулна уу!",
      },
    ],
  },
};

export const UnitedList = () => {
  const [form] = useAtom(reportDetailForm);
  const formRef = useRef<ProFormInstance>();
  const [editableKeys, setEditableRowKeys] = useState<React.Key>();
  const [data, setData] = useState<ReportUniteNumberInterface[]>([]);
  const getUniteReport = useRequest(reportDetail.getUniteReportDetail, {
    manual: true,
    onSuccess: (data) => {
      setData(
        data?.numbers.map((el, key) => ({ ...el, md: `${++key}` })) || []
      );
    },
  });

  // const getReport = useRequest(reportDetail.getPlan, {
  //   manual: true,
  // });

  const update = useRequest(
    async (values) => {
      const res = await reportDetail.updateUniteReportDetail(values);
      return new Promise((resolve) => setTimeout(() => resolve(res), 3000));
    },
    {
      manual: true,
      debounceWait: 500,
      onError: (err) => notification.error({ message: err.message }),
    }
  );

  useEffect(() => {
    getUniteReport.run({
      ...form,
      is_first: form.isFirst,
      report_plan_id: form.plan?.report_plan_id,
    });

    // getReport.run({
    //   ...form,
    //   report_plan_id: form.plan?.report_plan_id,
    //   is_first: form.isFirst,
    //   year: form.year,
    //   month: form.month,
    // })

  }, [form]);

  const setRecord = (record: ReportUniteNumberInterface) => {
    const item = data.find((item) => item.id === record.id);

    if (!item) return;

    // add  column 5,9 value  to column 1

    const column1 = record.elderly.count + record.disability.count;

    // add  column 6,10 value  to column 2

    const column2 =
      record.elderly.count_female + record.disability.count_female;

    // add  column 7,11 value  to column 3

    const column3 = record.elderly.amount + record.disability.amount;

    // add  column 8,12 value  to column 4

    const column4 =
      record.elderly.amount_female + record.disability.amount_female;

    const index = data.indexOf(item);

    item.service.count = column1 || 0;
    item.service.count_female = column2 || 0;
    item.service.amount = column3 || 0;
    item.service.amount_female = column4 || 0;

    data[index] = { ...item, ...record };
    setData([...data]);

    update.run({
      report_plan_id: form.plan?.report_plan_id,
      numbers: [...data],
      year: form.year,
      is_first: form.isFirst,
    });
  };

  return (
    <PageCard
      yR={form.plan?.status !== REPORT_STATUS.SENT && form.plan?.status !== REPORT_STATUS.CONFIRMED}
      className="mt-6"
      bodyClassName="space-y-4"
      title={form.plan?.report_plan?.name}
      extra={
        <IfCondition
          condition={form.plan?.status !== REPORT_STATUS.SENT && form.plan?.status !== REPORT_STATUS.CONFIRMED}
          whenTrue={
            <Flex align="center" gap={12} className="my-[20px]">
              <Button
                type="primary"
                size="large"
                loading={update.loading}
                icon={<SaveOutlined rev={undefined} />}
                onClick={() =>
                  update.run({
                    report_plan_id: form.plan?.report_plan_id,
                    numbers: data,
                    year: form.year,
                  })
                }
              >
                Хадгалах
              </Button>
            </Flex>
          }
        />
      }
    >
      <IAlert
        closable={false}
        type="success"
        title="Балансын шалгалт"
        message="багана(1)=багана(5+9), багана(2)=багана(6+10), багана(3)=багана(7+11), багана(4)=багана(8+12)"
      />
      <ITable<ReportUniteNumberInterface>
        hideAction
        bordered
        dataSource={
          [
            {
              category_name: "А",
              md: "Б",
              service: {
                count: 1,
                count_female: 2,
                amount: 3,
                amount_female: 4,
              },
              elderly: {
                count: 5,
                count_female: 6,
                amount: 7,
                amount_female: 8,
              },
              disability: {
                count: 9,
                count_female: 10,
                amount: 11,
                amount_female: 12,
              },
            } as any,
            {
              category_name: "Бүгд мөр(1)=мөр(2÷22)",
              md: "",
              service: {},
              elderly: {},
              disability: {},
            } as any,
            ...data,
          ] || []
        }
        headerTitle={
          <div className="text-xs text-gray-400">
            {update.loading
              ? ` Хадгалж байна...`
              : "Таны сүүлийн өөрчлөлтийг амжилттай хадгаллаа."}
          </div>
        }
        editable={{
          onValuesChange: async (record, dataSource) => {
            setRecord(record);
          },
          editableKeys: editableKeys ? [editableKeys] : [],
          form: formRef.current,
        }}
        hidePagination
        rowClassName={(record) => {
          return record.md === "Б" ? " bg-gray-100" : "";
        }}
        onRow={(record) => {
          return {
            onDoubleClick: () => {
              if (form.plan?.status !== REPORT_STATUS.CONFIRMED && form.plan?.status !== REPORT_STATUS.SENT) {
                setEditableRowKeys(record.id);
              }
            },
            className: "cursor-pointer",
          };
        }}
        columns={[
          {
            title: "Төрөлжсөн асрамжийн үйлчилгээ",
            children: [
              {
                title: "Насны бүлэг",
                valueType: "text",
                dataIndex: "category_name",
                editable: () => false,
              },
              {
                title: "МД",
                valueType: "text",
                dataIndex: "md",
                className: "bg-gray-100",
                align: "center",
                editable: () => false,
              },
              {
                title: "Хамрагдсан иргэн",
                dataIndex: ["service", "count"],
                valueType: "digit",
                fieldProps: numberField(),
                editable: () => false,
              },
              {
                title: <div className="h-[20px]" />,
                children: [
                  {
                    title: "Эмэгтэй",
                    dataIndex: ["service", "count_female"],
                    valueType: "digit",
                    fieldProps: numberField(),
                    editable: () => false,
                  },
                ],
              },
              {
                title: "Зарцуулсан зардал мян.төг",
                dataIndex: ["service", "amount"],
                valueType: "money",
                fieldProps: moneyField(),
                editable: () => false,
                render: (_, record) =>
                  record.category_name === "Бүгд мөр(1)=мөр(2÷22)"
                    ? "-"
                    : moneyFormat(
                      record.service.amount,
                      record.md === "Б" ? "" : "mnt"
                    ),
              },
              {
                title: <div className="h-[20px]" />,
                children: [
                  {
                    title: "Эмэгтэй",
                    dataIndex: ["service", "amount_female"],
                    valueType: "money",
                    fieldProps: moneyField(),
                    editable: () => false,
                    render: (_, record) =>
                      record.category_name === "Бүгд мөр(1)=мөр(2÷22)"
                        ? "-"
                        : moneyFormat(
                          record.service.amount_female,
                          record.md === "Б" ? "" : "mnt"
                        ),
                  },
                ],
              },
            ],
          },
          {
            title: "Ахмад настан",
            dataIndex: "elderly",
            children: [
              {
                title: "Хамрагдсан иргэн",
                dataIndex: ["elderly", "count"],
                valueType: "digit",
                fieldProps: numberField(),
                ...formItemProps,
              },
              {
                title: <div className="h-[20px]" />,
                children: [
                  {
                    title: "Эмэгтэй",
                    dataIndex: ["elderly", "count_female"],
                    valueType: "digit",
                    fieldProps: numberField(),
                    ...formItemProps,
                  },
                ],
              },
              {
                title: "Зарцуулсан зардал мян.төг",
                dataIndex: ["elderly", "amount"],
                valueType: "money",
                fieldProps: moneyField(),
                render: (_, record) =>
                  record.category_name === "Бүгд мөр(1)=мөр(2÷22)"
                    ? "-"
                    : moneyFormat(
                      record.elderly.amount,
                      record.md === "Б" ? "" : "mnt"
                    ),
                ...formItemProps,
              },
              {
                title: <div className="h-[20px]" />,
                children: [
                  {
                    title: "Эмэгтэй",
                    dataIndex: ["elderly", "amount_female"],
                    valueType: "money",

                    fieldProps: moneyField(),
                    render: (_, record) =>
                      record.category_name === "Бүгд мөр(1)=мөр(2÷22)"
                        ? "-"
                        : moneyFormat(
                          record.elderly.amount_female,
                          record.md === "Б" ? "" : "mnt"
                        ),
                    ...formItemProps,
                  },
                ],
              },
            ],
          },
          {
            title: "Хөгжлийн бэрхшээлтэй иргэн",
            dataIndex: "disability",
            children: [
              {
                title: "Хамрагдсан иргэн",
                dataIndex: ["disability", "count"],
                valueType: "digit",

                fieldProps: numberField(),
                ...formItemProps,
              },
              {
                title: <div className="h-[20px]" />,
                children: [
                  {
                    title: "Эмэгтэй",
                    dataIndex: ["disability", "count_female"],
                    valueType: "digit",
                    fieldProps: numberField(),
                    ...formItemProps,
                  },
                ],
              },
              {
                title: "Зарцуулсан зардал мян.төг",
                dataIndex: ["disability", "amount"],
                valueType: "money",
                fieldProps: moneyField(),
                render: (_, record) =>
                  record.category_name === "Бүгд мөр(1)=мөр(2÷22)"
                    ? "-"
                    : moneyFormat(
                      record.disability.amount,
                      record.md === "Б" ? "" : "mnt"
                    ),
                ...formItemProps,
              },
              {
                title: <div className="h-[20px]" />,
                children: [
                  {
                    title: "Эмэгтэй",
                    dataIndex: ["disability", "amount_female"],
                    valueType: "money",
                    fieldProps: moneyField(),
                    render: (_, record) =>
                      record.category_name === "Бүгд мөр(1)=мөр(2÷22)"
                        ? "-"
                        : moneyFormat(
                          record.disability.amount_female,
                          record.md === "Б" ? "" : "mnt"
                        ),
                    ...formItemProps,
                  },
                ],
              },
            ],
          },
        ]}
      />
    </PageCard>
  );
};
