import { Avatar, Button, Tooltip } from "antd";
import { useAuthContext } from "context/auth";
import { Action } from "context/type";
import { useNavigate } from "react-router-dom";
import auth from "service/auth";
import file from "service/file";
import logout from "public/svg/logout.svg";

type Props = {
  collapsed: boolean;
};

const Header = ({ collapsed }: Props) => {
  const [user, setAuth] = useAuthContext();
  const navigate = useNavigate();
  const { email } = user.user || {};
  const avatar = email?.substring(0, 2) || "AA";
  const color = "#146135";

  return (
    <div
      className={`p-4 justify-between items-start w-full bg-black text-black lg:text-white flex ${
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
          <p className="m-0 text-sm">{email}</p>
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
          icon={<img src={logout} alt="logout" width={30} height={30} />}
        />
      </Tooltip>
    </div>
  );
};

export default Header;
