import { PageLoading } from "@ant-design/pro-layout";
import { useRequest } from "ahooks";
import { PageCard } from "components/card";
import { DocumentOnlyOffice } from "components/onlyoffice";
import { useAtom } from "jotai";
import { useEffect } from "react";
import reportDetail from "service/report-detail";
import { reportDetailForm } from "../../store";

export const BAC14List = () => {
  const [store] = useAtom(reportDetailForm);

  const fetchBody = {
    ...store,
    is_first: store.isFirst,
    report_plan_id: store.plan?.report_plan_id,
    activity_code: "1.4",
  };

  const fetch = useRequest(reportDetail.getActivity, {
    manual: true,
    onSuccess: (data) => {
      if (!data.is_generated) {
        create.run(fetchBody);
      }
    },
  });

  const create = useRequest(reportDetail.generateAc14, {
    manual: true,
    onSuccess: (data) => {
      fetch.refresh();
    },
  });

  useEffect(() => {
    if (store.isFirst !== undefined) fetch.run(fetchBody);
  }, [store]);
  return (
    <PageCard className="  rounded-2xl p-6">
      {fetch.data?.is_generated && (
        <DocumentOnlyOffice
          config={fetch.data?.only_office_struct}
          token={fetch.data.file_jwt}
        />
      )}
      {!fetch.data?.is_generated && (
        <div className="m-0 flex justify-center items-center pb-10">
          <PageLoading />
        </div>
      )}
    </PageCard>
  );
};
