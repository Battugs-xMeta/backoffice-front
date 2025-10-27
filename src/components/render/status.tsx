import { Tag } from "antd";
import { LatestCarestType } from "service/type";

let globalClass = "border-0 font-medium ";

type PropsLatestCarest = {
  status?: LatestCarestType;
};

export const PropsLatestCarest = ({ status }: PropsLatestCarest) => {
  let className = globalClass;
  let text = "";
  switch (status) {
    case LatestCarestType.inprogress:
      className += " bg-success-50 text-success-700 font-xs";
      text = "Асаргаанд байгаа";
      break;
    case LatestCarestType.notStarted:
      className += " bg-orange-50 text-orange-700 font-xs";
      text = "Давтан ирсэн";
      break;
    case LatestCarestType.ended:
      className += " bg-orange-100 text-orange-700 font-xs";
      text = "Ended";
      break;
    case LatestCarestType.cancelled:
      className += " bg-gray-100 text-gray-700 font-xs";
      text = "Давтан ирсэн";
      break;
    default:
      break;
  }
  return <Tag className={className}>{text}</Tag>;
};
