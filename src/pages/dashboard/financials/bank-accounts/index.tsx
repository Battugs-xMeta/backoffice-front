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
import bankAccountService from "services/bank-accounts";
import {
  UserBankAccountWalletsTypeEnum,
  BankAccountListItem,
} from "services/bank-accounts/types";
import { BANK_ACCOUNT_FILTER_OPTIONS } from "components/filter-popover/options";

const BankAccounts = () => {
  const [form, setForm] = useAtom(atomBankAccountsForm);
  const [search, setSearch] = useState<string>("");
  const [currentFilter, setCurrentFilter] =
    useState<UserBankAccountWalletsTypeEnum>(
      UserBankAccountWalletsTypeEnum.DefaultFilterByUser
    );

  const handleFilterApply = (filterType: string) => {
    const enumValue = filterType as UserBankAccountWalletsTypeEnum;
    setCurrentFilter(enumValue);
    list.run({
      current: form?.current || 1,
      pageSize: form?.pageSize || 20,
      query: search,
      type: enumValue,
    });
  };

  const list = useRequest(bankAccountService.list, {
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
      <Breadcrumbs path={<span>Bank Accounts</span>} />
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
            customHeaderTitle="Bank Accounts"
            refresh={() =>
              list.run({ ...form, query: search, type: currentFilter })
            }
            hideCreate
            hideFormFilter={false}
            onFilterApply={handleFilterApply}
            filterOptions={BANK_ACCOUNT_FILTER_OPTIONS}
            filterTitle="Filter Bank Accounts"
            defaultFilterValue={currentFilter}
            toolbarItems={
              <div className="flex">
                <ExportButton
                  onClick={() => {
                    exportFromTable(
                      ["Bank Accounts"],
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
        <ITable<BankAccountListItem>
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
              dataIndex: "accountName",
              title: "Овог нэр",
              align: "left",
              render: (value) => (
                <span className="text-sm text-[#475467] font-normal flex text-center">
                  {value ?? ""}
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
              dataIndex: "bank",
              title: "Банкны нэр",
              render: (_: any, option) => (
                <span className="text-sm text-[#475467] font-normal flex text-center">
                  {option.Bank.nameMn || "-"}
                </span>
              ),
            },
            {
              dataIndex: "iban",
              title: "IBAN",
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
              dataIndex: "verifiedAt",
              title: "Баталгаажсан огноо",
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

export default BankAccounts;
