import { ElderlyStatus } from "config";
import { FC } from "react";
import UserCreate from "./user-create";
import UserSent from "./user-sent";
import UserSentCareCenter from "./user-sent-carecenter";
import UserWaitingCareCenter from "./user-waiting-carecenter";
import UserServicingCareCenter from "./user-servicing-carecenter";
import UserReturnCareCenter from "./user-return-carecenter";
import UserDied from "./user-deid";
import UserReturn from "./user-return";
import UserMoving from "./user-moving-carecenter";
import UserForce from "./user-force";
import UserOwnRequest from "./user-ownrequest";

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
