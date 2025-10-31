import addSvg from "assets/icons/add_button.svg";
import minusSvg from "assets/icons/minus-circle.svg";
import dayjs from "dayjs"; // Import dayjs library
import { moneyFormat } from "utils/index";
interface CustomRendererProps {
  record: {
    months?: {
      name: string;
      amount: number;
    }[];
  };
  monthNumber: number;
  setAddDetail?: (record: any) => void;
}

export const CustomRenderer: React.FC<CustomRendererProps> = ({
  record,
  monthNumber,
  setAddDetail,
}): any => {
  const isNotCurrentMonth =
    record?.months &&
    parseInt(record.months[monthNumber].name) !== dayjs().month() + 1;

  const isAmountZero =
    record?.months && record?.months[monthNumber].amount === 0;

  if (isNotCurrentMonth) {
    return isAmountZero ? (
      <img
        src={minusSvg}
        alt="minus"
        className="flex items-center justify-center"
      />
    ) : (
      moneyFormat(record?.months && record.months[monthNumber].amount) + "₮"
    );
  } else {
    return isAmountZero ? (
      <img
        src={addSvg}
        alt="add"
        className="flex items-center justify-center"
        onClick={() => setAddDetail && setAddDetail(record && record)}
      />
    ) : (
      moneyFormat(record?.months && record.months[monthNumber].amount) + "₮"
    );
  }
};
