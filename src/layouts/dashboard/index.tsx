import ProLayout from "@ant-design/pro-layout";
import { useAuthContext } from "context/auth";
import { useState } from "react";
import logo from "public/svg/x-meta.svg";
import {
  Link,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Header from "./header";
import { GroupedMenu } from "./menu";

const DashboardLayout = () => {
  const [{ authorized, user }] = useAuthContext();
  const [collapsed, setCollapsed] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  if (!authorized) return <Navigate to={"/auth/login"} />;

  const Logo = ({ user }: { user: any }) => {
    return (
      <div className="w-full">
        <div className="flex justify-center">
          <img
            src={logo}
            alt="logo"
            className="md:flex rounded-lg shrink-0 w-8 h-8 min-[1000px]:w-24 min-[1000px]:h-10"
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
        siderWidth={300}
        menuDataRender={() => GroupedMenu}
        menuItemRender={(item: any, dom) => {
          return (
            <Link
              className={checkActiveMenu(item.path)}
              to={item.path.replace("/xmeta", "")}
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
          defaultOpenAll: false,
          autoClose: false,
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
        {/* <PageHeader /> */}
        <Outlet />
      </ProLayout>
    </div>
  );
};

export default DashboardLayout;
