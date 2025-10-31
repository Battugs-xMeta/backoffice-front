import { useRequest } from "ahooks";
import { notification } from "antd";
import { ExportButton, ITable } from "components/index";
import InitTableHeader from "components/table-header";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { exportFromTable } from "utils/export";
import { atomUsersForm } from "utils/store";
import { PageCard } from "components/card";
import usersService from "service/users";
import { UserListType } from "service/users/types";
import moment from "moment";
import { Breadcrumbs } from "components/breadcrumbs";
import Badge from "components/badge";

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
    list.run({
      current: form?.current || 1,
      pageSize: form?.pageSize || 20,
      query: search,
    });
  }, [form]);

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumbs path={<span>KYC info</span>} />
      <PageCard xR>
        <div className="px-2">
          <InitTableHeader
            search={search}
            setSearch={(e) => {
              setSearch(e);
              list.run({
                ...form,
                query: e,
              });
            }}
            customHeaderTitle="KYC info"
            refresh={() => list.run({ ...form, query: search })}
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
