import { useRequest } from "ahooks";
import { notification } from "antd";
import { ExportButton, ITable } from "components/index";
import InitTableHeader from "components/table-header";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { exportFromTable } from "utils/export";
import { atomBankDepositsForm } from "utils/store";
import { PageCard } from "components/card";
import moment from "moment";
import { Breadcrumbs } from "components/breadcrumbs";
import Badge from "components/badge";
import bankDepositService from "pages/dashboard/financials/bank-deposits/service";
import {
  BankDepositListType,
  UserBankDepositTypeEnum,
} from "pages/dashboard/financials/bank-deposits/types";
import { BANK_DEPOSIT_FILTER_OPTIONS } from "components/filter-popover/options";

const BankDeposits = () => {
  const [form, setForm] = useAtom(atomBankDepositsForm);
  const [search, setSearch] = useState<string>("");
  const [currentFilter, setCurrentFilter] = useState<UserBankDepositTypeEnum>(
    UserBankDepositTypeEnum.BankDepositTypeQuery
  );

  const handleFilterApply = (filterType: string) => {
    const enumValue = filterType as UserBankDepositTypeEnum;
    setCurrentFilter(enumValue);
    list.run({
      current: form?.current || 1,
      pageSize: form?.pageSize || 20,
      query: search,
      type: enumValue,
    });
  };

  const list = useRequest(bankDepositService.list, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  useEffect(() => {
    list.run({
      current: form?.current || 1,
      pageSize: form?.pageSize || 20,
      query: search,
      type: currentFilter,
    });
  }, [form, search, currentFilter]);

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumbs path={<span>Bank Deposits</span>} />
      <PageCard xR>
        <div className="px-2">
          <InitTableHeader
            search={search}
            setSearch={(e) => {
              setSearch(e);
              list.run({
                ...form,
                query: e,
                type: currentFilter,
              });
            }}
            customHeaderTitle="Bank Deposits"
            refresh={() =>
              list.run({ ...form, query: search, type: currentFilter })
            }
            hideCreate
            hideFormFilter={false}
            onFilterApply={handleFilterApply}
            filterOptions={BANK_DEPOSIT_FILTER_OPTIONS}
            filterTitle="Filter Bank Deposits"
            defaultFilterValue={currentFilter}
            toolbarItems={
              <div className="flex">
                <ExportButton
                  onClick={() => {
                    exportFromTable(
                      ["Bank Deposits"],
                      globalThis.document.getElementById(
                        "main-table"
                      ) as HTMLElement
                    );
                  }}
                />
              </div>
            }
          />
        </div>
        <ITable<BankDepositListType>
          dataSource={list?.data?.items ?? []}
          total={list.data?.total}
          loading={list.loading}
          form={form}
          setForm={setForm}
          refresh={(values) => list.run({ ...form, ...values, status: 6 })}
          columns={[
            {
              dataIndex: "id",
              title: "id",
              align: "left",
              width: 100,
              render: (value) => (
                <span className="text-sm text-[#475467] font-normal whitespace-nowrap">
                  {value ?? ""}
                </span>
              ),
            },
            {
              dataIndex: "lastName",
              title: "Овог",
              align: "left",
              render: (_, option) => (
                <span className="text-sm text-[#475467] font-normal flex text-center">
                  {option.User.lastName ?? ""}
                </span>
              ),
            },
            {
              dataIndex: "firstName",
              title: "Нэр",
              align: "left",
              render: (_, option) => (
                <span className="text-sm text-[#475467] font-normal flex text-center">
                  {option.User.firstName ?? ""}
                </span>
              ),
            },
            {
              dataIndex: "depositAmount",
              title: "depositAmount",
              align: "left",
              render: (value) => (
                <span className="text-sm text-[#475467] font-normal flex text-center">
                  {value ?? ""}
                </span>
              ),
            },
            {
              dataIndex: "txnAmount",
              title: "txnAmount",
              render: (value: any) => (
                <span className="text-sm text-[#475467] font-normal flex text-center">
                  {value}
                </span>
              ),
            },
            {
              dataIndex: "currency",
              title: "currency",
              render: (value: any) => (
                <span className="text-sm text-[#475467] font-normal flex text-center">
                  {value}
                </span>
              ),
            },
            {
              dataIndex: "status",
              title: "Статус",
              render: (value: any) => (
                <Badge
                  title={String(value)}
                  color={value === "verified" ? "green" : "yellow"}
                />
              ),
            },
            {
              dataIndex: "created_at",
              title: "Бүртгэсэн огноо",
              align: "center",
              render: (value) => (
                <span className="text-sm text-[#475467] font-normal">
                  {moment(value ? String(value) : undefined).format(
                    "YYYY-MM-DD HH:mm:ss"
                  ) || "-"}
                </span>
              ),
            },
            {
              dataIndex: "updated_at",
              title: "Шинэчилсэн огноо",
              align: "center",
              render: (value) => (
                <span className="text-sm text-[#475467] font-normal">
                  {moment(value ? String(value) : undefined).format(
                    "YYYY-MM-DD HH:mm:ss"
                  ) || "-"}
                </span>
              ),
            },
          ]}
        />
      </PageCard>
    </div>
  );
};

export default BankDeposits;
