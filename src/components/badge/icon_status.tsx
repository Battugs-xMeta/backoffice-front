import CancelIcon from "assets/government/icons/cancel.svg";
import SentIcon from "assets/government/icons/sent.svg";
import UserIcon from "assets/government/icons/userIcon.svg";
import Movement from "assets/government/icons/movement.svg";
import WaitingIcon from "assets/government/icons/waiting.svg";
import { FC } from "react";
import { ElderlyStatus } from "config";

interface Props {
  status?: 1 | 2 | 3 | 4 | Number;
  desc?: String;
  img?: any;
}

const CareGiverIconStatus: FC<Props> = ({ status, desc }) => {
  let text = "Хадгалагдсан";
  let colorClass = "bg-gray-100 text-gray-700";
  let img = SentIcon;

  switch (status) {
    case ElderlyStatus.ElderlySave:
      img = SentIcon;
      break;
    case ElderlyStatus.ElderlyRequestSendToDistrict:
      img = SentIcon;
      break;
    case ElderlyStatus.ElderlyRequestSendSendToCareCenter:
      img = SentIcon;
      break;
    case ElderlyStatus.UserForce:
      img = UserIcon;
      break;
    case ElderlyStatus.ElderlyWaiting:
      img = WaitingIcon;
      break;
    case ElderlyStatus.ElderlyAllocated:
      break;
    case ElderlyStatus.ElderlyTakingCare:
      break;
    case ElderlyStatus.ElderlyCareCenterReturned:
      break;
    case ElderlyStatus.ElderlyDied:
      img = UserIcon;
      break;
    case ElderlyStatus.OwnRequestCarecenter:
      img = UserIcon;
      break;
    case ElderlyStatus.ReturnSum:
      img = CancelIcon;
      break;
    case ElderlyStatus.WaitDistrict:
      break;
    case ElderlyStatus.MovingCarecenter:
      img = Movement;

      break;
    default:
      text = "Хадгалагдсан";
      colorClass = "bg-gray-100 text-gray-700";
      break;
  }

  return <img src={img} alt="frame" />;
};

export default CareGiverIconStatus;
