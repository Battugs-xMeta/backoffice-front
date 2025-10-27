import { ElderlyStatus } from "config";
import { FC } from "react";

interface Props {
  status?: 1 | 2 | 3 | 4 | Number;
  desc?: String;
}

const CareGiverBadge: FC<Props> = ({ status, desc }) => {
  let text = "Хадгалагдсан";
  let colorClass = "bg-gray-100 text-gray-700";
  switch (status) {
    case ElderlyStatus.ElderlySave:
      text = "Хадгалагдсан";
      colorClass = "bg-gray-100 text-gray-700";
      break;
    case ElderlyStatus.ElderlyRequestSendToDistrict:
      text = "Хүсэлт илгээсэн";
      colorClass = "bg-[#FFFAEB] text-[#B54708]";
      break;
    case ElderlyStatus.ElderlyRequestSendSendToCareCenter:
      text = "Асрамжийн газарт хуваарилсан";
      colorClass = "bg-[#FFFAEB] text-[#B54708]";
      break;
    case ElderlyStatus.ElderlyWaiting:
      text = "Хүлээлэгт оруулсан";
      colorClass = "bg-blue-50 text-blue-700";
      break;
    case ElderlyStatus.ElderlyAllocated:
      text = "Хүлээлэгт оруулсан";
      colorClass = "bg-blue-50 text-blue-700";
      break;
    case ElderlyStatus.ElderlyTakingCare:
      text = "Үйлчлүүлж байгаа";
      colorClass = "bg-green-50 text-green-700";
      break;
    case ElderlyStatus.ElderlyCareCenterReturned:
      text = "Асрамжийн газраас буцаагдсан";
      colorClass = "bg-red-50 text-red-700";
      break;
    case ElderlyStatus.ElderlyDied:
      text = "Нас барсан";
      colorClass = "bg-red-50 text-red-700";
      break;
    case ElderlyStatus.MovingCarecenter:
      text = "Асрамжийн газар хооронд шилжсэн";
      colorClass = "bg-gray-50 text-gray-700";
      break;
    case ElderlyStatus.ReturnSum:
      text = "Буцаагдсан";
      colorClass = "bg-[#FEF3F2] text-[#F04438]";
      break;
    case ElderlyStatus.WaitDistrict:
      text = "Хүлээлэгт орсон";
      colorClass = "bg-blue-50 text-blue-700";
      break;
    case ElderlyStatus.OwnRequestCarecenter:
      text = "Өөрийн хүсэлтээр гарсан";
      colorClass = "bg-gray-50 text-gray-700";
      break;
    case ElderlyStatus.UserForce:
      text = "Албадан гаргасан";
      colorClass = "bg-gray-50 text-gray-700";
      break;
    default:
      text = "Хадгалагдсан";
      colorClass = "bg-gray-100 text-gray-700";
      break;
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium truncate ${colorClass}`}
    >
      {desc || text}
    </span>
  );
};

export default CareGiverBadge;
