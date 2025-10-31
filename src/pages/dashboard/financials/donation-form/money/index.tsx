import { Tag } from "antd";
import { RenderDonationType } from "components/donation-type";
import { Profile } from "components/profile";
import { ITable } from "components/table";
import InitTableHeader from "components/table-header";
import moment from "moment";
import { FC, useState } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import finance from "service/finance";
import { CashDonationType } from "service/finance/type";
import { moneyFormat } from "utils/index";
// import { FormInterface } from "..";
import { PageCard } from "components/card";
import { PaginationResponse } from "types";
import { ApproveDonation } from "../actions/approve";
import { CreateService } from "../actions/create";
import { UpdateService } from "../actions/update";

interface Props {
  data?: PaginationResponse<CashDonationType>;
  loading: boolean;
  refresh: () => void;
}

const MoneyPage: FC<Props> = ({ data, refresh, loading }) => {
  const [approve, setApprove] = useState<CashDonationType>();

  return (
    <PageCard xR>
      <div className="px-2 py-0 mb-4">
        <InitTableHeader
          hideSearch
          customHeaderTitle="Мөнгөн хандив"
          searchPlaceHolder="Овог, нэр "
          refresh={refresh}
          addButtonName={"Нэмэх"}
          fileName="Мөнгөн хандив"
          CreateComponent={CreateService}
        />
      </div>
      <ITable<CashDonationType>
        total={data?.total}
        loading={loading}
        dataSource={data?.items ?? []}
        refresh={refresh}
        UpdateComponent={UpdateService}
        customActions={(record) => {
          return !record.is_approved && (
            <div className={`flex items-center cursor-pointer`}>
              <IoMdCheckmarkCircleOutline
                size={20}
                className={" text-green-700"}
                onClick={() => setApprove(record)}
              />
            </div>
          );
        }}
        setApproveModal={(record) => {
          setApprove(record);
        }}
        columns={[
          {
            dataIndex: "first_name",
            title: "Хандивлагчийн нэр",
            align: "left",
            render: (value) => (
              <div className="flex gap-2">
                <span className="text-sm text-[#475467] font-normal">
                  {value || "-"}
                </span>
              </div>
            ),
          },
          {
            dataIndex: "is_organization",
            title: "Хандивлагчийн төрөл",
            align: "left",
            renderText: (value) => <RenderDonationType isOrg={value} />,
          },
          {
            dataIndex: "is_approved",
            title: "Баталгаажсан эсэх",
            align: "left",
            render: (value) => (
              <span className="text-sm text-[#475467] font-normal flex text-center">
                <Tag
                  color={value ? "green" : "red"}
                  bordered={false}
                  className="font-normal text-xs"
                >
                  {value ? "Тийм" : "Үгүй"}
                </Tag>
              </span>
            ),
          },
          {
            dataIndex: "total_amount",
            title: "Хандивын дүн",
            render: (value) => (
              <span className="text-sm text-[#475467] font-normal flex text-center">
                {moneyFormat(Number(value), "mnt") || "-"}
              </span>
            ),
          },
          {
            dataIndex: "email",
            title: "Имэйл",
            render: (value) => (
              <span className="text-sm text-[#475467] font-normal">
                {value || "-"}
              </span>
            ),
          },
          {
            dataIndex: "date",
            title: "Хүлээн авсан огноо",
            align: "center",
            render: (value) => (
              <span className="text-sm text-[#475467] font-normal">
                {moment(value || 0).format("YYYY-MM-DD") || "-"}
              </span>
            ),
          },
          {
            dataIndex: "date",
            title: "Бүртгэсэн ажилтан",
            align: "left",
            render: (_, record) => <Profile user={record.created_employee} />,
          },
          {
            dataIndex: "updated_at",
            title: "Бүртгэсэн огноо",
            align: "left",
            render: (value) => (
              <span className="text-sm text-[#475467] font-normal">
                {moment(value || 0).format("YYYY-MM-DD") || "-"}
              </span>
            ),
          },
        ]}
        RemoveModelConfig={{
          action: finance.deleteDonatioMoney,
          config: (record) => ({
            uniqueKey: record?.id,
            display: record?.first_name,
            title: "Remove",
          }),
        }}
      />
      <ApproveDonation
        data={approve}
        onCancel={() => setApprove(undefined)}
        onFinish={async () => {
          refresh();
          setApprove(undefined);
        }}
      />
    </PageCard>
  );
};

export default MoneyPage;
