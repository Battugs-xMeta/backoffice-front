import { MenuDataItem } from "@ant-design/pro-layout";
import Certifcate from "assets/icons/certificate-01.svg";
import Credentials from "assets/icons/credentials.svg";
import Currency from "assets/icons/currency-dollar.svg";
import File04 from "assets/icons/file-04.svg";
import File03 from "assets/icons/file-03.svg";
import DeveloperPlan from "assets/icons/file-06.svg";
import HomeIcon from "assets/icons/home-line.svg";
import List from "assets/icons/list.svg";
import Requested from "assets/icons/requests.svg";
import UserRight from "assets/icons/user-right-01.svg";
import Workers from "assets/icons/users-01.svg";
import Organization from "assets/icons/organization.svg";
import Lock from "assets/icons/lock.svg";
import Settings from "assets/icons/settings.svg";
export interface GroupedMenuProps {
  icon: any;
  path: string;
  name: string;
  children: MenuDataItem[];
}

const PickIcon = (path: string) => {
  if (path.includes("dashboard/dashboard")) return <img src={HomeIcon} />;
  if (path.includes("registration")) return <img src={File04} />;
  if (path.includes("report")) return <img src={File03} />;
  if (path.includes("credentials")) return <img src={Credentials} />;
  if (path.includes("income")) return <img src={Currency} />;
  if (path.includes("donation")) return <img src={Currency} />;
  if (path.includes("finance")) return <img src={Currency} />;
  if (path.includes("workers")) return <img src={Workers} />;
  if (path.includes("training")) return <img src={Certifcate} />;
  if (path.includes("reward")) return <img src={List} />;
  if (path.includes("salary")) return <img src={Currency} />;
  if (path.includes("requested")) return <img src={Requested} />;
  if (path.includes("care-information")) return <img src={List} />;
  if (path.includes("transictions")) return <img src={UserRight} />;
  if (path.includes("developer-plan")) return <img src={DeveloperPlan} />;
  if (path.includes("charity-organization")) return <img src={Organization} />;
  if (path.includes("role-management")) return <img src={Lock} />;
  if (path.includes("settings")) return <img src={Settings} />;
  return null;
};

export const AuthMenuRender = (menus: any) => {
  let map: any = {};
  menus?.forEach((el: any) => {
    if (map[`${el.parent_id}`]) {
      map[`${el.parent_id}`] = {
        ...map[`${el.parent_id}`],
        childs: [...map[`${el.parent_id}`]?.childs, el],
      };
    } else {
      map[`${el.parent_id}`] = {
        parent: el.parent,
        childs: [el],
      };
    }
  });

  return Object.keys(map)?.map((el) => {
    return {
      key: map[el]?.parent?.path,
      name: map[el]?.parent?.name,
      icon: null,
      children: map[el]?.childs?.map((item: any) => {
        return {
          key: item?.path,
          name: item?.name,
          path: item?.path,
          icon: PickIcon(item?.path),
        };
      }),
    };
  });
};
