import { Card, Tag } from "antd";
import { RenderDonationType } from "components/donation-type";
import { ITable } from "components/index";
import { Profile } from "components/profile";
import InitTableHeader from "components/table-header";
import dayjs from "dayjs";
import moment from "moment";
import { FC } from "react";
import finance from "service/finance";
import { CashDonationType } from "service/finance/type";
import { PaginationResponse } from "types";
import { isValidDate, moneyFormat } from "utils/index";
import { CreateService } from "../actions/create";
import { UpdateService } from "../actions/update";

interface Props {
  data?: PaginationResponse<CashDonationType>;
  loading: boolean;
  refresh: () => void;
}

const OtherPage: FC<Props> = ({ data, loading, refresh }) => {
  return (
    <Card className="custom-ant-card-padding-remove">
      <div className="p-4 pb-0 mb-4">
        <InitTableHeader
          customHeaderTitle="Бусад (Эд материал, хувцас гэх мэт...)"
          searchPlaceHolder="Овог, нэр "
          refresh={refresh}
          addButtonName={"Нэмэх"}
          fileName="Бусад (Эд материал, хувцас гэх мэт...)"
          CreateComponent={CreateService}
        />
      </div>
      <ITable<CashDonationType>
        total={data?.total}
        loading={loading}
        dataSource={data?.items ?? []}
        refresh={(values) => refresh()}
        UpdateComponent={UpdateService}
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
                  className="font-normal text-[12px]"
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
            render: (_, record) => <Profile user={record?.created_employee} />,
          },
          {
            dataIndex: "updated_at",
            title: "Бүртгэсэн огноо",
            align: "left",
            renderText: (value) => (
              <span className="text-sm text-[#475467] font-normal">
                {isValidDate(value)
                  ? dayjs(value || 0).format("YYYY-MM-DD")
                  : "-"}
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
    </Card>
  );
};

export default OtherPage;
