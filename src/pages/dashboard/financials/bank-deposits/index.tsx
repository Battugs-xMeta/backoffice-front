import { ProFormSelect } from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { notification } from "antd";
import Badge from "components/badge";
import { Breadcrumbs } from "components/breadcrumbs";
import { PageCard } from "components/card";
import { FilterForm, ITable } from "components/index";
import InitTableHeader from "components/table-header";
import { FORM_ITEM_RULE } from "config";
import { useAtom } from "jotai";
import moment from "moment";
import { useEffect, useState } from "react";

import { atomBankDepositsForm } from "utils/store";
import bankDepositService from "./service";
import {
  BankDepositListType,
  UserBankDepositConditionTypeEnum,
  UserBankDepositConditionTypeEnumOptions,
  UserBankDepositTypeEnum,
  UserBankDepositTypeEnumOptions,
} from "./types";

const BankDeposits = () => {
  const [form, setForm] = useAtom(atomBankDepositsForm);
  const [search, setSearch] = useState<string>("");

  const list = useRequest(bankDepositService.list, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  useEffect(() => {
    const requestData = { ...form };
    if (form.type === UserBankDepositTypeEnum.BankDepositTypeAmount) {
      requestData.amount = Number(form.amount);
    }
    list.run(requestData);
  }, [form]);

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumbs path={<span>Bank Deposits</span>} />
      <FilterForm
        initialValues={{
          ...form,
        }}
        setselecteddate={setForm}
      />
      <PageCard xR>
        <div className="px-2">
          <InitTableHeader
            setSearch={(e) => {
              setSearch(e);
              if (
                form?.type === UserBankDepositTypeEnum.BankDepositTypeAmount
              ) {
                list.run({ ...form, query: "", amount: Number(e) });
              } else {
                list.run({ ...form, query: e });
              }
            }}
            fileName="Bank Deposits"
            customHeaderTitle="Bank Deposits"
            refresh={() =>
              list.run({ ...form, query: search, type: form.type })
            }
            hideCreate
            tableID="main-table"
            filter={
              <div className="flex gap-2">
                <ProFormSelect
                  name={"type"}
                  options={UserBankDepositTypeEnumOptions}
                  rules={FORM_ITEM_RULE()}
                  fieldProps={{
                    onChange: (value: UserBankDepositTypeEnum) => {
                      setForm({ ...form, type: value });
                    },
                    value: form?.type,
                  }}
                />
                {form?.type ===
                  UserBankDepositTypeEnum.BankDepositTypeAmount && (
                  <ProFormSelect
                    name={"condition"}
                    options={UserBankDepositConditionTypeEnumOptions}
                    rules={FORM_ITEM_RULE()}
                    fieldProps={{
                      onChange: (value: UserBankDepositConditionTypeEnum) => {
                        setForm({ ...form, query: value });
                      },
                      value:
                        UserBankDepositConditionTypeEnum.DepositWithdrawalConditionEqual,
                    }}
                  />
                )}
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
          refresh={(values) => list.run({ ...form, ...values })}
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
