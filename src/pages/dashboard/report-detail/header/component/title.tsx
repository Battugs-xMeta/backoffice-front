import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Flex } from "antd";
import { useAtom } from "jotai";
import { reportDetailForm } from "../../store";
import { useNavigate } from "react-router-dom";

export const HeaderTitle = () => {
  const [form] = useAtom(reportDetailForm);
  const navigate = useNavigate();

  return (
    <Flex
      align="center"
      gap={16}
      className=" justify-between w-full 2xl:justify-normal 2xl:w-fit"
    >
      <Button
        onClick={() => navigate("/dashboard/report")}
        size="large"
        className="flex items-center font-semibold"
        icon={<ArrowLeftOutlined rev={undefined} />}
      >
        Буцах
      </Button>
      <div className="font-semibold  text-base  text-gray-700">
        {form.plan?.report_plan?.name}
      </div>
    </Flex>
  );
};
