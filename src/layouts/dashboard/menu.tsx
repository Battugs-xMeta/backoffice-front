import { MenuDataItem } from "@ant-design/pro-layout";
import Certifcate from "assets/icons/certificate-01.svg";
import Credentials from "assets/icons/credentials.svg";
import Currency from "assets/icons/currency-dollar.svg";
import File03 from "assets/icons/file-03.svg";
import File04 from "assets/icons/file-04.svg";
import DeveloperPlan from "assets/icons/file-06.svg";
import HomeIcon from "assets/icons/home-line.svg";
import List from "assets/icons/list.svg";
import Lock from "assets/icons/lock.svg";
import Organization from "assets/icons/organization.svg";
import Requested from "assets/icons/requests.svg";
import Settings from "assets/icons/settings.svg";
import UserRight from "assets/icons/user-right-01.svg";
import Workers from "assets/icons/users-01.svg";
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

// export const AuthMenuRender = (menus: any) => {
//   let map: any = {};
//   menus?.forEach((el: any) => {
//     if (map[`${el.parent_id}`]) {
//       map[`${el.parent_id}`] = {
//         ...map[`${el.parent_id}`],
//         childs: [...map[`${el.parent_id}`]?.childs, el],
//       };
//     } else {
//       map[`${el.parent_id}`] = {
//         parent: el.parent,
//         childs: [el],
//       };
//     }
//   });

//   return Object.keys(map)?.map((el) => {
//     return {
//       key: map[el]?.parent?.path,
//       name: map[el]?.parent?.name,
//       icon: null,
//       children: map[el]?.childs?.map((item: any) => {
//         return {
//           key: item?.path,
//           name: item?.name,
//           path: item?.path,
//           icon: PickIcon(item?.path),
//         };
//       }),
//     };
//   });
// };
export const GroupedMenu: GroupedMenuProps[] = [
  {
    icon: <img src={HomeIcon} />,
    name: "Dashboard",
    path: "/xmeta/dashboard/dashboard",
    children: [],
  },
  {
    name: "User management",
    icon: <img src={List} />,
    path: "",
    children: [
      {
        icon: <img src={File04} />,
        name: "KYC info",
        path: "/xmeta/dashboard/user-management/kyc-info",
      },
      {
        icon: <img src={File03} />,
        name: "Тайлан мэдээ",
        path: "/xmeta/dashboard/report",
      },
      {
        icon: <img src={Credentials} />,
        name: "Магадлан итгэмжлэл",
        path: "/xmeta/dashboard/credentials",
      },
      {
        icon: <img src={Currency} />,
        name: "Санхүү",
        path: "/xmeta/dashboard/finance",
      },
    ],
  },
  {
    name: "Financials",
    icon: <img src={Organization} />,
    path: "",
    children: [
      {
        icon: <img src={Workers} />,
        name: "Bank accounts",
        path: "/xmeta/dashboard/financials/bank-accounts",
      },
      {
        icon: <img src={Certifcate} />,
        name: "Bank deposits",
        path: "/xmeta/dashboard/financials/bank-deposits",
      },
      {
        icon: <img src={Certifcate} />,
        name: "Bank withdrawals",
        path: "/xmeta/dashboard/financials/bank-withdrawals",
      },
      // {
      //   icon: <img src={Trophy} />,
      //   name: "Шагнал",
      //   path: "/xmeta/dashboard/reward",
      // },
      // {
      //   icon: <img src={Currency} />,
      //   name: "Цалин хөлс",
      //   path: "/xmeta/dashboard/salary",
      // },
    ],
  },
  {
    name: "Crypto",
    icon: <img src={Currency} />,
    path: "",
    children: [
      {
        icon: <img src={Requested} />,
        name: "Deposit history",
        path: "/xmeta/dashboard/crypto/crypto-deposit-history",
      },
      {
        icon: <img src={Requested} />,
        name: "Withdrawal history",
        path: "/xmeta/dashboard/crypto/crypto-withdrawal-history",
      },
    ],
  },
  {
    name: "User Trade",
    icon: <img src={Certifcate} />,
    path: "",
    children: [
      {
        icon: <img src={Requested} />,
        name: "Хүсэлт",
        path: "/xmeta/dashboard/requested",
      },
      {
        icon: <img src={List} />,
        name: "Үйлчлүүлэгчдийн жагсаалт",
        path: "/xmeta/dashboard/care-information",
      },
      {
        icon: <img src={UserRight} />,
        name: "Шилжилт хөдөлгөөн",
        path: "/xmeta/dashboard/transictions",
      },
    ],
  },
  {
    name: "Тохиргоо",
    icon: <img src={DeveloperPlan} />,
    path: "",
    children: [
      {
        icon: <img src={DeveloperPlan} />,
        name: "Хөгжлийн төлөвлөгөө",
        path: "/xmeta/dashboard/developer-plan",
      },
      {
        icon: <img src={Organization} />,
        name: "Буяны байгууллага",
        path: "/xmeta/dashboard/charity-organization",
      },
    ],
  },
];
