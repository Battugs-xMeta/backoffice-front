import { Flex } from "antd";
import { PageCard } from "components/card";
import { HeaderAction } from "./component/action";
import { HeaderInfo } from "./component/info";
import { HeaderSelection } from "./component/selection";
import { HeaderTab } from "./component/tab";
import { HeaderTitle } from "./component/title";
import { useAtom } from "jotai";
import { reportDetailForm } from "../store";
import { REPORT_CODE } from "service/report/types";

export const ReportDetailHeader = () => {
  const [form] = useAtom(reportDetailForm);
  return (
    <PageCard yR={form.code === REPORT_CODE.ACTIVITY} className="pt-6">
      <Flex align="center" justify="space-between" wrap="wrap" gap={12}>
        <HeaderTitle />
        <HeaderAction />
      </Flex>
      <Flex align="center" className="mt-5 gap-4 " wrap="wrap">
        <HeaderSelection />
        <HeaderInfo />

        {/* Tabs for Activity report  */}
        <HeaderTab />
      </Flex>
    </PageCard>
  );
};
