import UserCreate from "components/migration-events/user-create";
import UserDied from "components/migration-events/user-deid";
import UserForce from "components/migration-events/user-force";
import UserMoving from "components/migration-events/user-moving-carecenter";
import UserOwnRequest from "components/migration-events/user-ownrequest";
import UserReturn from "components/migration-events/user-return";
import UserReturnCareCenter from "components/migration-events/user-return-carecenter";
import UserSent from "components/migration-events/user-sent";
import UserSentCareCenter from "components/migration-events/user-sent-carecenter";
import UserServicingCareCenter from "components/migration-events/user-servicing-carecenter";
import UserWaitingCareCenter from "components/migration-events/user-waiting-carecenter";
import { ElderlyStatus } from "config";
import { FC } from "react";

interface Props {
  status?: 1 | 2 | 3 | 4 | Number;
  data: any;
}

const CareGiverComponentStatus: FC<Props> = ({ data, status }) => {
  let text = "Хадгалагдсан";
  let colorClass = "bg-gray-100 text-gray-700";
  let component = <UserCreate data={data} />;
  switch (status) {
    case ElderlyStatus.ElderlySave:
      component = <UserCreate data={data} />;
      break;
    case ElderlyStatus.ElderlyRequestSendToDistrict:
      component = <UserSent data={data} />;
      break;
    case ElderlyStatus.ElderlyRequestSendSendToCareCenter:
      component = <UserSentCareCenter data={data} />;
      break;
    case ElderlyStatus.ElderlyWaiting:
      component = <UserWaitingCareCenter data={data} />;
      break;
    case ElderlyStatus.ElderlyTakingCare:
      component = <UserServicingCareCenter data={data} />;
      break;
    case ElderlyStatus.ElderlyCareCenterReturned:
      component = <UserReturnCareCenter data={data} />;
      break;
    case ElderlyStatus.ElderlyDied:
      component = <UserDied data={data} />;

      break;
    case ElderlyStatus.ReturnSum:
      component = <UserReturn data={data} />;
      break;
    case ElderlyStatus.MovingCarecenter:
      component = <UserMoving data={data} />;
      break;
    case ElderlyStatus.UserForce:
      component = <UserForce data={data} />;
      break;
    case ElderlyStatus.OwnRequestCarecenter:
      component = <UserOwnRequest data={data} />;
      break;
    default:
      text = "Хадгалагдсан";
      colorClass = "bg-gray-100 text-gray-700";
      break;
  }

  return component;
};

export default CareGiverComponentStatus;
