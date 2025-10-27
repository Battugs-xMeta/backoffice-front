import { Avatar, Flex } from "antd";
import { CreatedEmployee } from "service/care-information/types";
import file from "service/file";
import { Elderly } from "service/transictions/types";
import { firstLastNames } from "utils/index";

type Props = {
  user?: CreatedEmployee | Elderly;
};

export const Profile = ({ user }: Props) => {
  return (
    <Flex align="center" gap={10}>
      <Avatar
        style={{ backgroundColor: "#87d068" }}
        src={
          user?.profile?.physical_path
            ? file.fileToUrl(user?.profile?.physical_path || "")
            : "https://api.dicebear.com/7.x/miniavs/svg?seed=3"
        }
        size={"small"}
      />
      <Flex vertical className="text-xs">
        <span>{firstLastNames(user?.last_name, user?.first_name) || "-"}</span>
        {(user as any)?.position && <span>{(user as any)?.position}</span>}
      </Flex>
    </Flex>
  );
};
