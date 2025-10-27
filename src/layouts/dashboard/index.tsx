import ProLayout from "@ant-design/pro-layout";
import { PageHeader } from "components/page_header";
import { Settings } from "components/settings";
import { useAuthContext } from "context/auth";
import { FC, useState } from "react";
import {
  Link,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import file from "service/file";
import Header from "./header";
import { AuthMenuRender } from "./menu";

type Props = {
  children?: any;
  props?: any;
};
const DashboardLayout: FC<Props> = ({}) => {
  const [{ authorized, user }] = useAuthContext();
  const [collapsed, setCollapsed] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  if (!authorized) return <Navigate to={"/auth/login"} />;

  const Logo = ({ user }: { user: any }) => {
    const imgSrc = user?.care_center
      ? file.fileToUrl(user?.care_center?.logo?.physical_path)
      : "/images/logo.jpg";

    return (
      <div className="w-full">
        <div className="flex justify-center">
          <img
            src={imgSrc}
            alt="logo"
            className="md:flex rounded-lg shrink-0 w-8 h-8 min-[1000px]:w-10 min-[1000px]:h-10"
            onClick={() => navigate("/dashboard/dashboard")}
          />
          {!collapsed && (
            <div className={`text-base text-[#FFF] font-medium ml-2 `}>
              {user?.care_center?.organization_name || ""}
            </div>
          )}
        </div>
      </div>
    );
  };

  const checkActiveMenu = (path: string) => {
    if (location.pathname.includes(path)) {
      return "active-menu";
    }
    return "";
  };

  return (
    <div id="pro-layout">
      <ProLayout
        siderWidth={280}
        menuDataRender={() =>
          AuthMenuRender(user?.role?.menus?.map((el: any) => el?.menu))
        }
        menuItemRender={(item: any, dom) => {
          return (
            <Link
              className={checkActiveMenu(item.path)}
              to={item.path.replace("/asramj", "")}
            >
              {dom}
            </Link>
          );
        }}
        menuHeaderRender={(logo, title) => (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "10px 20px",
            }}
          >
            {logo}
            {title}
          </div>
        )}
        disableMobile={false}
        onMenuHeaderClick={() => navigate("/dashboard/dashboard")}
        menu={{
          defaultOpenAll: true,
          autoClose: false,
          type: "group",
        }}
        onCollapse={(collapsed) => setCollapsed(collapsed)}
        rightContentRender={() => <Header collapsed={collapsed} />}
        contentStyle={{
          margin: 0,
          overflowY: "auto",
          height: "calc(100vh - 1px)",
          fontFamily: "'Inter', sans-serif",
          background: "#E7EDEE",
          scrollbarWidth: "none",
        }}
        layout="side"
        colorWeak={false}
        logo={<Logo user={user} />}
        // logo={
        //   <div className={`flex items-center gap-2`}>
        //     <img
        //       src={Logo}
        //       alt="logo"
        //       onClick={() => navigate("/dashboard/government/requests")}
        //     />
        //     {!collapsed && (
        //       <div className="text-white text-sm">
        //         Хөдөлмөр, халамжийн үйлчилгээний ерөнхий газар
        //       </div>
        //     )}
        //   </div>
        // }
        logoStyle={{
          marginTop: "3vh",
          display: "flex",
          justifyContent: "center",
        }}
        title={false}
        fixedHeader={true}
        fixSiderbar={true}
        contentWidth={"Fluid"}
      >
        <PageHeader />
        <Outlet />
      </ProLayout>
      <Settings />
    </div>
  );
};

export default DashboardLayout;
