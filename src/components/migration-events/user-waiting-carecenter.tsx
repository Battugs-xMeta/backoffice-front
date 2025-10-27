import { Avatar } from "antd";
import CareGiverBadge from "components/badge/caregiver";
import dayjs from "dayjs";
import { FC } from "react";
import file from "service/file";

interface Props {
  data: any;
}

const UserWaitingCareCenter: FC<Props> = ({ data }) => {
  return (
    <div className="flex w-full justify-between">
      <div className="flex-col flex items-start">
        <div className="flex justify-between ">
          <div className="font-medium text-sm ">
            <CareGiverBadge status={data?.status_code} />
          </div>
        </div>
        <div>{dayjs(data.updated_at).format("YYYY-MM-DD HH:mm:ss")}</div>
        <div className="flex gap-2 items-center my-2 ">
          <Avatar
            shape="circle"
            size={30}
            src={file.fileToUrl(
              data?.modified_employee?.profile?.physical_path || "AS"
            )}
            className="flex items-center"
          />
          <div className="flex flex-col m-0 p-0 ">
            <p className="m-0 p-0 text-sm font-semibold capitalize">
              {data?.modified_employee?.first_name}
            </p>
            <p className="m-0 p-0 text-xs font-normal capitalize">
              {data?.modified_employee?.position}
            </p>
          </div>
        </div>

        <div className="bg-gray-100 rounded-full px-3 py-2 w-full">
          <span className="text-sm font-medium text-[#667085]">
            Тайлбар: {data?.description || data?.system_description}
          </span>
        </div>
      </div>
      <div className="text-sm text-[#475467] font-bold flex gap-2 ">
        <Avatar
          shape="circle"
          size={28}
          src={file.fileToUrl(data?.care_center?.logo?.physical_path || "AS")}
        />
        <span className="mt-1">{data?.care_center?.organization_name}</span>
      </div>
    </div>
  );
};

export default UserWaitingCareCenter;
