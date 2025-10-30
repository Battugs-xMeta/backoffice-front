import { useRequest } from "ahooks";
import { notification } from "antd";
import { useAtom } from "jotai";
import { useEffect } from "react";
import finance from "service/finance";
import { FilterMoneyline } from "service/finance/type";
import { Header } from "./header";
import MoneyPage from "./money";
import OtherPage from "./others";
import { storeDonationForm } from "./store";

const DonationToForm = () => {
  const [store] = useAtom(storeDonationForm);

  const list = useRequest(finance.listDonationMoney, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  useEffect(() => {
    list.run({
      ...store,
      donation_type:
        store.donation_type === "money"
          ? FilterMoneyline.Money
          : FilterMoneyline.Other,
    });
  }, [store]);

  return (
    <div className="flex flex-col gap-4">
      <Header data={list.data} />

      {store.donation_type === "money" ? (
        <div>
          <MoneyPage
            refresh={list.refresh}
            data={list.data}
            loading={list.loading}
          />
        </div>
      ) : (
        <div>
          <OtherPage
            refresh={list.refresh}
            data={list.data}
            loading={list.loading}
          />
        </div>
      )}
    </div>
  );
};

export default DonationToForm;
