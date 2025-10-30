import { useRequest } from "ahooks";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import finance from "service/finance";
import { Header } from "./header";
import { NormativeTypeList } from "./normative-type";
import NormativeExpenseDetail from "./normative_detail";
import { storeNorExpense } from "./store";
import { notification } from "antd";

// Норматив зарцуулалт хуудас
const NormativeExpense = () => {
  const [store] = useAtom(storeNorExpense);

  const info = useRequest(finance.normative_info, {
    onError(err) {
      notification.error({
        message: err.message,
      });
    },
    manual: true,
  });

  const run = () => {
    info.run({ ...store });
  };

  useEffect(() => {
    run();
  }, [store]);

  return (
    <div className="flex flex-col gap-4">
      <>
        <Header data={info.data} />
        <NormativeTypeList />
        <NormativeExpenseDetail />
      </>
    </div>
  );
};

export default NormativeExpense;
