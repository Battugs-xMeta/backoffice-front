import { useRequest } from "ahooks";
import { notification } from "antd";
import { ExportButton, ITable } from "components/index";
import InitTableHeader from "components/table-header";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { exportFromTable } from "utils/export";
import { atomBankAccountsForm } from "utils/store";
import { PageCard } from "components/card";
import moment from "moment";
import { Breadcrumbs } from "components/breadcrumbs";
import Badge from "components/badge";
import { BANK_ACCOUNT_FILTER_OPTIONS } from "components/filter-popover/options";
import bankWithdrawalsService from "pages/dashboard/financials/bank-withdrawals/service";
import {
  BankWithdrawalsListType,
  UserBankWithdrawalsTypeEnum,
} from "pages/dashboard/financials/bank-withdrawals/types";

const BankWithdrawals = () => {
  const [form, setForm] = useAtom(atomBankAccountsForm);
  const [search, setSearch] = useState<string>("");
  const [currentFilter, setCurrentFilter] =
    useState<UserBankWithdrawalsTypeEnum>(
      UserBankWithdrawalsTypeEnum.BankWithdrawalsTypeQuery
    );

  const handleFilterApply = (filterType: string) => {
    const enumValue = filterType as UserBankWithdrawalsTypeEnum;
    setCurrentFilter(enumValue);
    list.run({
      current: form?.current || 1,
      pageSize: form?.pageSize || 20,
      query: search,
      type: enumValue,
    });
  };

  const list = useRequest(bankWithdrawalsService.list, {
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
      <Breadcrumbs path={<span>Bank Withdrawals</span>} />
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
            customHeaderTitle="Bank Withdrawals"
            refresh={() =>
              list.run({ ...form, query: search, type: currentFilter })
            }
            hideCreate
            hideFormFilter={false}
            onFilterApply={handleFilterApply}
            filterOptions={BANK_ACCOUNT_FILTER_OPTIONS}
            filterTitle="Filter Bank Withdrawals"
            defaultFilterValue={currentFilter}
            toolbarItems={
              <div className="flex">
                <ExportButton
                  onClick={() => {
                    exportFromTable(
                      ["Bank Withdrawals"],
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
        <ITable<BankWithdrawalsListType>
          dataSource={
            (list?.data?.items ?? []) as unknown as BankWithdrawalsListType[]
          }
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
              dataIndex: "accountName",
              title: "Овог нэр",
              align: "left",
              render: (_, option) => (
                <span className="text-sm text-[#475467] font-normal flex text-center">
                  {`${option?.User?.lastName ?? ""} ${
                    option?.User?.firstName ?? ""
                  }`}
                </span>
              ),
            },
            {
              dataIndex: "accountNumber",
              title: "Дансны дугаар",
              align: "left",
              render: (value) => (
                <span className="text-sm text-[#475467] font-normal flex text-center">
                  {value ?? ""}
                </span>
              ),
            },
            {
              dataIndex: "iban",
              title: "IBAN",
              align: "left",
              render: (_, option) => (
                <span className="text-sm text-[#475467] font-normal flex text-center">
                  {option?.Wallet?.iban ?? ""}
                </span>
              ),
            },
            {
              dataIndex: "bank status",
              title: "bank status",
              align: "left",
              render: (_, option) => (
                <Badge
                  title={String(option?.Wallet?.status)}
                  color={
                    option?.Wallet?.status === "verified" ? "green" : "yellow"
                  }
                />
              ),
            },
            {
              dataIndex: "receiveAmount",
              title: "receiveAmount",
              render: (value: any) => (
                <span className="text-sm text-[#475467] font-normal flex text-center">
                  {value}
                </span>
              ),
            },
            {
              dataIndex: "totalAmount",
              title: "totalAmount",
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
              dataIndex: "transferTime",
              title: "Шилжүүлгийн огноо",
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

export default BankWithdrawals;
