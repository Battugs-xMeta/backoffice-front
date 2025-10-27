import { Flex, Typography } from "antd";
import { IfCondition } from "components/condition";
import { AccreditationStatus } from "config";
import dayjs from "dayjs";
import { Accreditation } from "service/accreditation/types";
import { dateFormat } from "utils/index";

type Props = {
  data?: Accreditation;
};

export const Info = ({ data }: Props) => {
  return (
    <Flex align="center" gap={24} className=" flex-wrap xl:flex-nowrap">
      <IfCondition
        condition={data?.status !== AccreditationStatus.Temprary}
        whenTrue={
          <Typography.Text className="text-sm text-scale-700  whitespace-nowrap">
            Илгээсэн:{" "}
            <span className="font-semibold">
              {dateFormat(data?.updated_at)}
            </span>
          </Typography.Text>
        }
        whenFalse={
          <Typography.Text className="text-sm  text-scale-700">
            Хадгалсан:
            <span className="font-semibold">
              {dateFormat(data?.updated_at)}
            </span>
          </Typography.Text>
        }
      />

      <IfCondition
        condition={
          data?.status === AccreditationStatus.Approved
        }
        whenTrue={
          <div className="text-sm  text-scale-700  whitespace-nowrap">
            Итгэмжлэсэн огноо:{" "}
            <span className="font-semibold">
              {dateFormat(data?.approved_date)}
            </span>
          </div>
        }
      />
      <IfCondition
        condition={data?.status === AccreditationStatus.Approved}
        whenTrue={
          <div>
            Дуусах огноо:{" "}
            <span className="font-semibold text-scale-700">
              {dayjs(data?.approved_date).add(3, "year").format("YYYY-MM-DD")}
            </span>
          </div>
        }
      />
    </Flex>
  );
};
