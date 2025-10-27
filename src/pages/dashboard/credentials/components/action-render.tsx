import { ArrowRightOutlined } from "@ant-design/icons";
import { useRequest } from "ahooks";
import { Button, Flex, notification } from "antd";
import { IfCondition } from "components/condition";
import { AccreditationStatus } from "config";
import { useState } from "react";
import { Link } from "react-router-dom";
import accreditation from "service/accreditation";
import { Accreditation } from "service/accreditation/types";
import { Detail } from "../detail";

type Props = {
  data?: Accreditation;
  refresh: () => void;
};

export const ActionRender = ({ data, refresh }: Props) => {
  const [detail, setDetail] = useState<Accreditation>();

  const fetchDetail = useRequest(accreditation.get, {
    manual: true,
    onSuccess: (data) => {
      setDetail(data);
    },
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  const sendRequest = useRequest(accreditation.sendRequest, {
    manual: true,
    onSuccess: () => {
      notification.success({
        message: "Амжилттай хүсэлт илгээлээ",
      });
      // fetch({} as any);
      refresh()
    },
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  return (
    <>
      <Flex align="center" gap={24}>
        {/* Buttons */}
        {data?.status === AccreditationStatus.Temprary || data?.status === AccreditationStatus.Rejected ? <Link to={`/dashboard/credentials/${data?.id}`}>
          <Button
            type="default"
            size="large"
            className=" text-gray-700 font-semibold"
          >
            Засварлах
          </Button>
        </Link> :
          <Link to={`/dashboard/credentials/view/${data?.id}`}>
            <Button
              type="default"
              size="large"
              className=" text-gray-700 font-semibold"
            >
              Дэлгэрэнгүй
            </Button>
          </Link>}
        <IfCondition
          condition={
            data?.status !== AccreditationStatus.Approved
          }
          whenTrue={
            <Button
              type="primary"
              size="large"
              disabled={data?.status !== AccreditationStatus.Rejected && data?.status !== AccreditationStatus.Temprary}
              onClick={() => sendRequest.run(data?.id || 0)}
              loading={sendRequest.loading}
            >
              {data?.status === AccreditationStatus.Rejected
                ? "Дахин илгээх"
                : "Хүсэлт илгээх"}
              <ArrowRightOutlined rev="" />
            </Button>
          }
        />
        <IfCondition
          condition={data?.status === AccreditationStatus.Approved}
          whenTrue={
            <Button
              type="primary"
              size="large"
              onClick={() => fetchDetail.run(data?.id || 0)}
            >
              Гэрчилгээ харах
            </Button>
          }
        />
      </Flex>

      <Detail
        data={detail}
        onCancel={() => {
          setDetail(undefined);
        }}
      />
    </>
  );
};
