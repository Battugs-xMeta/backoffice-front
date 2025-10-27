import { IfCondition } from "components/condition";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { ReportActivityDetailTab, reportDetailForm } from "../store";
import { BAC11AList } from "./b-ac-1.1a";
import { BAC11BList } from "./b-ac-1.1b";
import { BAC12List } from "./b-ac-12";
import { BAC13List } from "./b-ac-13";
import { BAC14List } from "./b-ac-14";
import { BAC15List } from "./b-ac-15";
import { BAC16List } from "./b-ac-16";

export const ActivityList = () => {
  const [form] = useAtom(reportDetailForm);

  useEffect(() => {}, []);

  return (
    <>
      <IfCondition
        condition={form.tab === ReportActivityDetailTab["Б-АС-1.1А"]}
        whenTrue={<BAC11AList />}
      />
      <IfCondition
        condition={form.tab === ReportActivityDetailTab["Б-АС-1.1Б"]}
        whenTrue={<BAC11BList />}
      />
      <IfCondition
        condition={form.tab === ReportActivityDetailTab["Б-АС-1.2"]}
        whenTrue={<BAC12List />}
      />
      <IfCondition
        condition={form.tab === ReportActivityDetailTab["Б-АС-1.3"]}
        whenTrue={<BAC13List />}
      />
      <IfCondition
        condition={form.tab === ReportActivityDetailTab["Б-АС-1.4"]}
        whenTrue={<BAC14List />}
      />
      <IfCondition
        condition={form.tab === ReportActivityDetailTab["Б-АС-1.5"]}
        whenTrue={<BAC15List />}
      />
      <IfCondition
        condition={form.tab === ReportActivityDetailTab["Б-АС-1.6"]}
        whenTrue={<BAC16List />}
      />
    </>
  );
};
