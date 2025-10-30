import { useRequest } from "ahooks";
import { Flex, Tag, notification } from "antd";
import { PageCard } from "components/card";
import { ITable } from "components/table";
import InitTableHeader from "components/table-header";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import finance from "service/finance";
import { NormativeBudgesTypeList } from "service/finance/type";
import { moneyFormat } from "utils/index";
import { CreateDetailNormative } from "../action/create_detail";
import { CustomRenderer } from "../component/custom_column";
import { storeNorExpense } from "../store";
import { storeNorExpenseType } from "./store";
// import { UpdateBudget } from "../action/update_budge";

export const NormativeTypeList = () => {
  const [parentStore, setParentStore] = useAtom(storeNorExpense);
  const [store] = useAtom(storeNorExpenseType);
  const [addDetail, setAddDetail] = useState<NormativeBudgesTypeList>();

  const list = useRequest(finance.listNorBudget, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  useEffect(() => {
    list.run({ ...parentStore, ...store });
  }, [store, parentStore]);

  return (
    <>
      <PageCard xR>
        <div className="px-2 py-0">
          <InitTableHeader
            store={storeNorExpenseType}
            customHeaderTitle="Норматив зардал"
            searchPlaceHolder="Хайх"
            hideSearch
            hideFormFilter
            hideCreate
            refresh={list.refresh}
            fileName="Норматив зардал"
          />
        </div>
        <ITable<NormativeBudgesTypeList>
          total={list.data?.length || 0}
          loading={list.loading}
          dataSource={list?.data || []}
          refresh={(values) => {
            list.run({ ...parentStore, ...store, ...values });
            setParentStore({ ...parentStore });
          }}
          columns={[
            {
              dataIndex: "name",
              title: "Нэр",
              align: "left",
              width: 250,
              render: (value) => (
                <div className="flex gap-2">
                  <span className="text-sm text-[#475467] font-normal">
                    {value || "-"}
                  </span>
                </div>
              ),
            },
            {
              dataIndex: "budget",
              title: "Батлагдсан төсөв",
              align: "center",
              width: 150,
              render: (value) => (
                <span className="text-sm text-[#475467] font-normal flex text-center justify-center">
                  {moneyFormat(value as number) + " ₮" || "-"}
                </span>
              ),
            },
            {
              dataIndex: "s",
              title: "Зарцуулсан хувь",
              align: "center",
              width: 100,
              render: (value, record) => (
                <Flex align="center" justify="center">
                  <Tag bordered={false}>
                    {(100 - (record.remaining * 100) / record.budget).toFixed(
                      3
                    )}
                    %
                  </Tag>
                </Flex>
              ),
            },
            {
              dataIndex: ["elderly", "age"],
              title: "1 сар",
              width: 100,
              align: "center",
              render: (value, record) => (
                <Flex align="center" justify="center">
                  <CustomRenderer record={record} monthNumber={1} />
                </Flex>
              ),
            },
            {
              dataIndex: ["elderly", "gender"],
              title: "2 сар",
              width: 100,
              align: "center",
              render: (value, record) => (
                <Flex align="center" justify="center">
                  <CustomRenderer record={record} monthNumber={1} />
                </Flex>
              ),
            },
            {
              dataIndex: ["elderly", "education"],
              title: "3 сар",
              width: 100,
              align: "center",
              render: (value, record) => (
                <Flex align="center" justify="center">
                  <CustomRenderer record={record} monthNumber={2} />
                </Flex>
              ),
            },
            {
              dataIndex: "movement_type",
              title: "4 сар",
              width: 100,
              align: "center",
              render: (value, record) => (
                <Flex align="center" justify="center">
                  <CustomRenderer
                    record={record}
                    monthNumber={3}
                    setAddDetail={setAddDetail}
                  />
                </Flex>
              ),
            },
            {
              dataIndex: "unique_number",
              title: "5 сар",
              width: 100,
              align: "center",
              render: (value, record) => (
                <Flex align="center" justify="center">
                  <CustomRenderer record={record} monthNumber={4} />
                </Flex>
              ),
            },
            {
              dataIndex: "unique_number",
              title: "6 сар",
              width: 100,
              align: "center",
              render: (value, record) => (
                <Flex align="center" justify="center">
                  <CustomRenderer record={record} monthNumber={5} />
                </Flex>
              ),
            },
            {
              dataIndex: "create",
              title: "7 сар",
              width: 100,
              align: "center",
              render: (value, record) => (
                <Flex align="center" justify="center">
                  <CustomRenderer record={record} monthNumber={6} />
                </Flex>
              ),
            },
            {
              dataIndex: "sa",
              title: "8 сар",
              width: 100,
              align: "center",
              render: (value, record) => (
                <Flex align="center" justify="center">
                  <CustomRenderer record={record} monthNumber={7} />
                </Flex>
              ),
            },
            {
              dataIndex: "s",
              title: "9 сар",
              width: 100,
              align: "center",
              render: (value, record) => (
                <Flex align="center" justify="center">
                  <CustomRenderer record={record} monthNumber={8} />
                </Flex>
              ),
            },
            {
              dataIndex: "as",
              title: "10 сар",
              width: 100,
              align: "center",
              render: (value, record) => (
                <Flex align="center" justify="center">
                  <CustomRenderer record={record} monthNumber={9} />
                </Flex>
              ),
            },
            {
              dataIndex: "as",
              title: "11 сар",
              width: 100,
              align: "center",
              render: (value, record) => (
                <Flex align="center" justify="center">
                  <CustomRenderer record={record} monthNumber={10} />
                </Flex>
              ),
            },
            {
              dataIndex: "as",
              title: "12 сар",
              width: 100,
              align: "center",
              render: (value, record) => (
                <Flex align="center" justify="center">
                  <CustomRenderer record={record} monthNumber={11} />
                </Flex>
              ),
            },
            {
              dataIndex: "remaining",
              title: "Үлдэгдэл",
              align: "center",
              width: 150,
              render: (value) => (
                <span className="text-base text-[#475467] font-medium">
                  {moneyFormat(value as number, "mnt") || 0}
                </span>
              ),
            },
          ]}
          // UpdateComponent={UpdateBudget}
        />
      </PageCard>
      <CreateDetailNormative
        data={addDetail}
        onCancel={() => setAddDetail(undefined)}
        onFinish={async () => {
          setAddDetail(undefined);
          list.run({ ...parentStore, ...store });
          setParentStore({ ...parentStore });
        }}
      />
    </>
  );
};
