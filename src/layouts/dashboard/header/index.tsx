import { LogoutOutlined } from "@ant-design/icons";
import { Avatar, Button, Popover, Tooltip } from "antd";
import { useAuthContext } from "context/auth";
import { Action } from "context/type";
import { FC } from "react";
import { RxExit } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import auth from "service/auth";
import file from "service/file";
type Props = {
  collapsed: boolean;
};
const Header: FC<Props> = ({ collapsed }) => {
  const [user, setAuth] = useAuthContext();
  const navigate = useNavigate();
  const { email } = user.user || {};
  const avatar = email?.substring(0, 2) || "AA";
  const color = "#146135";

  return (
    <>
      <div
        className={`p-4 justify-between items-start w-full text-black lg:text-white flex ${
          collapsed && "hidden"
        }`}
      >
        <div className="flex flex-row justify-center items-center gap-3">
          <Avatar
            shape="circle"
            style={{ backgroundColor: color }}
            className="text-xs"
            size={32}
            src={file.fileToUrl(user?.user?.profile?.physical_path || "")}
          >
            {avatar.toUpperCase()}
          </Avatar>
          <div className="flex flex-col justify-start ">
            <p className="m-0 text-sm">
              {user.user?.care_center?.contact?.first_name}
            </p>
            <p className="m-0 text-[#A0B6BA] text-[10px]">
              {user.user?.care_center?.contact?.position}
            </p>
          </div>
        </div>

        <Tooltip title="Гарах">
          <Button
            type="link"
            onClick={() => {
              auth.removeToken();
              setAuth([Action.SIGN_OUT]);
              navigate("/auth/login");
            }}
            icon={
              <LogoutOutlined
                rev={undefined}
                className="text-xl text-primary-3"
              />
            }
          />
        </Tooltip>
      </div>
      <Popover
        className={`${!collapsed && "hidden"}`}
        trigger={["click"]}
        content={
          <div
            className="p-2 rounded-md text-black  cursor-pointer "
            onClick={() => {
              auth.removeToken();
              setAuth([Action.SIGN_OUT]);
              navigate("/auth/login");
            }}
          >
            <RxExit size={16} />
          </div>
        }
      >
        <Avatar
          shape="circle"
          style={{ backgroundColor: color }}
          size={32}
          className="text-xs"
          src={file.fileToUrl(user?.user?.profile?.physical_path || "")}
        >
          {avatar.toUpperCase()}
        </Avatar>
      </Popover>
    </>
  );
};

export default Header;
