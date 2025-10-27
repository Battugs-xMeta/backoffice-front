import { Tooltip } from "antd";
import Add from "assets/icons/report/add.svg";
import Check from "assets/icons/report/check.svg";
import None from "assets/icons/report/none.svg";
import Repeat from "assets/icons/report/repeat.svg";
import Warning from "assets/icons/report/warning.svg";
import Correct from "assets/icons/report/correct.svg";
import { REPORT_STATUS } from "service/report/types";
type Props = {
  status: number;
  navigate?: () => void;
  month?: number;
  isHalfYear?: boolean;
  tooltip?: string;
};
const StatusRender = ({
  status,
  tooltip,
  navigate,
  month,
  isHalfYear,
}: Props) => {
  const currentMonth = new Date().getMonth() + 1;
  const isDisabled = (month || 0) < currentMonth;
  let retVal = <img src={None} alt="None" />;
  switch (status) {
    case REPORT_STATUS.CONFIRMED:
      retVal = (
        <img
          src={Correct}
          alt="Approved"
          className="cursor-pointer"
          onClick={() => navigate?.()}
        />
      );
      break;
    case REPORT_STATUS.NOTIME_SUBMIT:
      retVal = <img src={None} alt="none" />;
      break;
    case REPORT_STATUS.AVAILABLE:
      retVal = (
        <img
          src={Add}
          alt="Add"
          className={`${!isDisabled && "cursor-pointer"} ${
            isHalfYear && "cursor-pointer"
          }`}
          onClick={() => (!isDisabled || isHalfYear) && navigate?.()}
        />
      );
      break;
    case REPORT_STATUS.LATE_SENT:
      retVal = <img src={Warning} alt="Warning" />;
      break;
    case REPORT_STATUS.SENT:
      retVal = (
        <img
          src={Check}
          className="cursor-pointer"
          alt="Check"
          onClick={() => navigate?.()}
        />
      );
      break;
    case REPORT_STATUS.RETURNED:
      retVal = (
        <Tooltip title={tooltip}>
          <img
            src={Repeat}
            alt="Repeat"
            className="cursor-pointer"
            onClick={() => navigate?.()}
          />
        </Tooltip>
      );
      break;
    case REPORT_STATUS.SAVED:
      retVal = (
        <Tooltip title="Хадгалсан. Илгээгээгүй байна">
          <span
            className="cursor-pointer"
            onClick={() => (!isDisabled || isHalfYear) && navigate?.()}
          >
            Түр хадгалсан
          </span>
        </Tooltip>
      );
      break;
  }

  return <div className="flex justify-end">{retVal}</div>;
};

export default StatusRender;
