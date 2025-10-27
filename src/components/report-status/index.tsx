import { REPORT_STATUS } from "service/report/types";

type Props = {
  status?: number;
};

export const RenderReportStatus = ({ status }: Props) => {
  let color = "";
  let text = "";
  switch (status) {
    case REPORT_STATUS.AVAILABLE:
      color = "warning";
      text = "Мэдээ оруулах хугацаа болсон";
      break;
    case REPORT_STATUS.NOTIME_SUBMIT:
      color = "red";
      text = "Мэдээ оруулах хугацаа болоогүй";
      break;
    case REPORT_STATUS.LATE_SENT:
      color = "red";
      text = "Хоцорч оруулсан";
      break;
    case REPORT_STATUS.SENT:
      color = "green";
      text = "Мэдээ илгээсэн";
      break;
    case REPORT_STATUS.CONFIRMED:
      color = "green";
      text = "Батлагдсан";
      break;
    case REPORT_STATUS.RETURNED:
      color = "red";
      text = "Буцаагдсан";
      break;
    case REPORT_STATUS.NOT_SENT:
      color = "red";
      text = "Мэдээ илгээгээгүй";
      break;
    case REPORT_STATUS.SAVED:
      color = "gray";
      text = "Хадгалсан";
      break;
    default:
      break;
  }
  return (
    <div style={{ color }} className="text-sm font-semibold">
      {text}
    </div>
  );
};
