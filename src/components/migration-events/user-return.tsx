import { Avatar } from "antd";
import CareGiverBadge from "components/badge/caregiver";
import dayjs from "dayjs";
import { FC } from "react";
import file from "service/file";

interface Props {
  data: any;
}

const UserReturn: FC<Props> = ({ data }) => {
  return (
    <div className="flex gap-3">
      <div className="flex-col flex  items-start">
        <div className="font-medium text-sm ">
          <CareGiverBadge status={data?.status_code} />
        </div>
        <div>{dayjs(data.updated_at).format("YYYY-MM-DD HH:mm:ss")}</div>
        <div className="flex gap-2 items-center my-2 ">
          <Avatar
            shape="circle"
            size={30}
            src={file.fileToUrl(
              data?.modified_user?.profile?.physical_path || "AS"
            )}
            className="flex items-center"
          />
          <div className="flex flex-col m-0 p-0 ">
            <p className="m-0 p-0 text-sm font-semibold capitalize">
              {data?.modified_user?.first_name}
            </p>
            <p className="m-0 p-0 text-xs font-normal capitalize">
              {data?.modified_user?.position}
            </p>
          </div>
        </div>

        <div className="bg-[#FEF3F2] rounded-full px-3 py-2 w-full">
          <span className="text-sm font-medium text-[#F04438]">
            Тайлбар: {data?.description || data?.system_description}
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserReturn;
