import { Tag } from "antd";
import { AccreditationStatus } from "config";

export const AccreditationStatusTag = (status: number) => {
  let text = "";
  let className = "text-[14px] px-3 py-1 rounded-2xl font-medium ";
  switch (status) {
    case AccreditationStatus.Approved:
      text = "Магадлан итгэмжлэгдсэн";
      className += "text-success-700 bg-success-50";
      break;
    case AccreditationStatus.Temprary:
      text = "Хадгалсан";
      className += "text-gray-700 bg-gray-100";
      break;
    case AccreditationStatus.SentRequest:
      text = "Хүсэлт илгээсэн";
      className += "text-warning-700 bg-warning-50";
      break;
    case AccreditationStatus.Rejected:
      text = "Татгалзсан";
      className += "text-error-700 bg-error-50";
    default:
      break;
  }

  return (
    <Tag bordered={false} className={className}>
      {text}
    </Tag>
  );
};

export const getRegisterColor = (status: number) => {
  switch (status) {
    case 1:
      return "blue";
    case 2:
      return "yellow";
    case 3:
      return "green";
    case 4:
      return "red";
    default:
      return "blue";
  }
};
