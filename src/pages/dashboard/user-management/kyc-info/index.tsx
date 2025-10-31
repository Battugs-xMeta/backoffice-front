import { useDebounceFn, useRequest } from "ahooks";
import { notification } from "antd";
import Badge from "components/badge";
import { Breadcrumbs } from "components/breadcrumbs";
import { PageCard } from "components/card";
import { ExportButton, FilterForm, ITable } from "components/index";
import InitTableHeader from "components/table-header";
import { useAtom } from "jotai";
import moment from "moment";
import { useEffect, useState } from "react";
import usersService from "service/users";
import { UserListType } from "service/users/types";
import { exportFromTable } from "utils/export";
import { atomUsersForm } from "utils/store";

const KycInfo = () => {
  const [form, setForm] = useAtom(atomUsersForm);
  const [search, setSearch] = useState<string>("");

  const list = useRequest(usersService.list, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  useEffect(() => {
    list.run({ ...form, query: search });
  }, [form]);

  const searchRun = useDebounceFn(list.run, { wait: 1000 });
  return (
    <div className="flex flex-col gap-4">
      <Breadcrumbs path={<span>KYC info</span>} />
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
              searchRun.run({ ...form, query: e });
            }}
            customHeaderTitle="KYC info"
            refresh={() => searchRun.run({ ...form, query: search })}
            hideCreate
            toolbarItems={
              <div className="flex">
                <ExportButton
                  onClick={() => {
                    exportFromTable(
                      ["KYC info"],
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
        <ITable<UserListType>
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
              width: 300,
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
              render: (value) => (
                <span className="text-sm text-[#475467] font-normal flex text-center">
                  {value ?? ""}
                </span>
              ),
            },
            {
              dataIndex: "firstName",
              title: "Нэр",
              align: "left",
              render: (value) => (
                <span className="text-sm text-[#475467] font-normal flex text-center">
                  {value ?? ""}
                </span>
              ),
            },
            {
              dataIndex: "email",
              title: "И-мэйл",
              render: (value: any) => (
                <span className="text-sm text-[#475467] font-normal flex text-center">
                  {value || "-"}
                </span>
              ),
            },
            {
              dataIndex: "kycLevel",
              title: "kycLevel",
              render: (value: any) => (
                <span className="text-sm text-[#475467] font-normal flex text-center">
                  {value}
                </span>
              ),
            },
            {
              dataIndex: "vipLevel",
              title: "vipLevel",
              render: (value: any) => (
                <span className="text-sm text-[#475467] font-normal flex text-center">
                  {value}
                </span>
              ),
            },
            {
              dataIndex: "subAccountId",
              title: "subAccountId",
              render: (value: any) => (
                <span className="text-sm text-[#475467] font-normal flex text-center">
                  {value || "-"}
                </span>
              ),
            },
            {
              dataIndex: "canTrade",
              title: "canTrade",
              render: (value: any) => (
                <Badge
                  title={String(value)}
                  color={value === true ? "green" : "red"}
                />
              ),
            },
            {
              dataIndex: "canWithdraw",
              title: "canWithdraw",
              render: (value: any) => (
                <Badge
                  title={String(value)}
                  color={value === true ? "green" : "red"}
                />
              ),
            },
            {
              dataIndex: "isWhitelistEnabled",
              title: "isWhitelistEnabled",
              render: (value: any) => (
                <Badge
                  title={String(value)}
                  color={value === true ? "green" : "red"}
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
          // setTransictionModal={(record) => {
          //   setTransictionAction(record);
          // }}
          // DetailComponent={DetailService}
        />
        {/* <TransictionAction
          data={transictionAction}
          onCancel={() => setTransictionAction(undefined)}
          onFinish={async () => {
            run();
            setTransictionAction(undefined);
          }}
        /> */}
      </PageCard>
    </div>
  );
};

export default KycInfo;
