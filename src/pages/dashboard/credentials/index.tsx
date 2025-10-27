import { PlusCircleOutlined } from "@ant-design/icons";
import { useRequest } from "ahooks";
import { Button, Flex, Result, Spin, notification } from "antd";
import { ITableList } from "components/table-list";
import { RegisterFormStatusEnum } from "config";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import accreditation from "service/accreditation";
import { Accreditation } from "service/accreditation/types";
import register_form from "service/registration-form";
import { AccreditationStatusTag } from "utils/utils_func";
import { ActionRender } from "./components/action-render";
import { Info } from "./components/info";

const Accreditations: React.FC = () => {
  const listData = useRequest(accreditation.list, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  const status = useRequest(register_form.getStatus, {
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  useEffect(() => {
    listData.run()
  }, []);

  return (
    <div>
      {status.loading ? <Flex>
        <Spin />
      </Flex> :
        <>
          {status?.data?.status !== RegisterFormStatusEnum.approved ?
            <Result
              status="warning"
              title="Та эхлээд байгууллагын мэдээлэл баталгаажуулах хэрэгтэй"
              extra={
                <Link to="/dashboard/registration">
                  <Button type="primary" key="console">
                    Байгууллагын Мэдээлэл
                  </Button>
                </Link>
              }
            /> :
            <>
              <div className="flex justify-end mb-3 mt-4">
                <Link to="create">
                  <Button
                    key="3"
                    size="large"
                    type="primary"
                    disabled={(listData.data?.[0]?.end_year || 0) > new Date().getFullYear()}
                    icon={<PlusCircleOutlined rev={undefined} />}
                  >
                    Итгэмжлэл үүсгэх
                  </Button>
                </Link>
              </div>
              <ITableList<Accreditation>
                dataSource={listData.data}
                loading={listData.loading}
                pagination
                seperate
                gap={4}
                columns={[
                  {
                    dataIndex: "start_year",
                    render: (value, record) => {
                      return (
                        <span className="font-semibold text-base">
                          {value} - {record?.end_year} он
                        </span>
                      );
                    },
                  },
                  {
                    dataIndex: "status",
                    render: (_value, record) => {
                      return AccreditationStatusTag(record?.status);
                    },
                  },
                  {
                    dataIndex: "status",
                    className: "xl:flex-1 xl:flex xl:justify-end",
                    render: (_, record) => {
                      return <Info data={record} />;
                    },
                  },
                  {
                    render: (_, record) => {
                      return <ActionRender data={record} refresh={listData.refresh} />;
                    },
                  },
                ]}
              />
            </>}
        </>}
    </div>
  );
};

export default Accreditations;
