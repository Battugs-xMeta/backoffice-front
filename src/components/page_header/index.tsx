import { RiHome6Line } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import INotification from "./notification";
import { Button, Flex, Tooltip } from "antd";
import { FilePdfOutlined } from "@ant-design/icons";
import Handbook from "assets/doc/handbook.pdf";

export type Props = {
  title?: String;
  subTitle?: String;
};
export const PageHeader = ({ title, subTitle }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const pathName: string[] = location.pathname
    .split("/")
    .filter((el) => el.length > 0)
    ?.slice(1, 2);

  const HeaderName = (pathName: string[]) => {
    let result = "";
    switch (pathName[0]) {
      case "dashboard":
        result = "Нүүр хуудас";
        break;
      case "care-information":
        result = "Үйлчлүүлэгчдийн жагсаалт";
        break;
      case "report":
        result = "Тайлан";
        break;
      case "credentials":
        result = "Магадлан итгэмжлэл";
        break;
      case "training":
        result = "Сургалт";
        break;
      case "registration":
        result = "Байгууллагын мэдээлэл";
        break;
      case "reward":
        result = "Шагнал";
        break;
      case "salary":
        result = "Цалин хөлс";
        break;
      case "income":
        result = "Орлого";
        break;
      case "donation":
        result = "Хандив";
        break;
      case "finance":
        result = "Санхүү";
        break;
      case "workers":
        result = "Ажилчдын жагсаалт";
        break;
      case "transictions":
        result = "Шилжилт хөдөлгөөн";
        break;
      case "requested":
        result = "Ирсэн хүсэлтийн жагсаалт";
        break;
      case "developer-plan":
        result = "Хөгжлийн төлөвлөгөө";
        break;
      case "charity-organization":
        result = "Буяны байгууллага";
        break;
      case "settings":
        result = "Тохиргоо";
        break;
      default:
        break;
    }
    return result;
  };

  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex items-center gap-4">
        <RiHome6Line
          size={20}
          color="#667085"
          className="cursor-pointer"
          onClick={() => navigate("/dashboard/dashboard")}
        />

        <div className="text-lg text-gray-300">/</div>

        <div className="flex items-center gap-2 ">
          {pathName.map((index) => {
            return (
              <div className="flex items-center gap-2" key={index}>
                <p className="font-medium text-sm text-gray-700 capitalize">
                  {HeaderName(pathName)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <Flex align="center" gap={24}>
        <INotification />
      </Flex>
    </div>
  );
};
