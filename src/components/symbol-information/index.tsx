import { Button, Dropdown, MenuProps } from "antd";
import Add from "assets/icons/report/add.svg";
import Check from "assets/icons/report/check.svg";
import Correct from "assets/icons/report/correct.svg";
import Info from "assets/icons/report/info.svg";
import None from "assets/icons/report/none.svg";
import Repeat from "assets/icons/report/repeat.svg";
import Warning from "assets/icons/report/warning.svg";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: (
      <div className="flex gap-4">
        <img src={None} alt="none" />
        <span>Мэдээ оруулах хугацаа болоогүй</span>
      </div>
    ),
  },
  {
    key: "2",
    label: (
      <div className="flex gap-4">
        <img src={Add} alt="none" />
        <span>Мэдээ оруулах хугацаа болсон</span>
      </div>
    ),
  },
  {
    key: "3",
    label: (
      <div className="flex gap-4">
        <img src={Warning} alt="none" />
        <span>Хоцорч оруулсан</span>
      </div>
    ),
  },
  {
    key: "6",
    label: (
      <div className="flex gap-4">
        <img src={Check} alt="none" />
        <span>Мэдээлэл оруулсан</span>
      </div>
    ),
  },
  {
    key: "4",
    label: (
      <div className="flex gap-4">
        <img src={Correct} alt="none" />
        <span>Батлагдсан</span>
      </div>
    ),
  },

  {
    key: "5",
    label: (
      <div className="flex gap-4">
        <img src={Repeat} alt="none" />
        <span>Буцаагдсан</span>
      </div>
    ),
  },
];

type Props = {
  hideItems?: string[];
};
const SymbolInformation = ({ hideItems }: Props) => {
  return (
    <Dropdown
      menu={{
        items: items.filter(
          (el) => !hideItems?.includes(el?.key?.toString() || "")
        ),
      }}
      placement="bottom"
      arrow
    >
      <Button
        size="large"
        className="flex items-center bg-primary-100 border-none text-primary-500"
      >
        <div className="flex items-center gap-2 justify-center">
          <img width={25} height={25} src={Info} alt="info" />
          <span className="font-semibold">Тэмдэглэгээний нэршил</span>
        </div>
      </Button>
    </Dropdown>
  );
};

export default SymbolInformation;
