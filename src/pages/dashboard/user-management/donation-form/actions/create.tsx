import { ProFormInstance } from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { IModalForm } from "components/modal";
import moment from "moment";
import { useRef } from "react";
import finance from "service/finance";
import { CashDonationType, FilterMoneyline } from "service/finance/type";
import { ActionComponentProps } from "types";
import { Info } from "./parts/info";
import { storeDonationForm } from "../store";
import { useAtom } from "jotai";
import dayjs from "dayjs";

export const CreateService = ({
  ...rest
}: ActionComponentProps<CashDonationType>) => {
  const [store] = useAtom(storeDonationForm);
  const formRef = useRef<ProFormInstance>();

  const CreateDonationMoney = useRequest(finance.CreateDonationMoney, {
    manual: true,
  });

  return (
    <IModalForm
      open={rest.open}
      modalProps={{ maskClosable: false, onCancel: rest.onCancel }}
      formRef={formRef}
      title="Хандив бүртгэх"
      width={800}
      scrollToFirstError={true}
      onOpenChange={() => formRef.current?.resetFields()}
      cancelText={"Буцах"}
      okText={"Нэмэх"}
      className="px-1"
      initialValues={{
        donation_type:
          store.donation_type === "money"
            ? FilterMoneyline.Money
            : FilterMoneyline.Other,
      }}
      onRequest={async (values) => {
        if (!!values) {
          if (
            await CreateDonationMoney.runAsync({
              ...values,
              date: dayjs(values.date).toDate(),
            })
          ) {
            return true;
          }
        }
      }}
      onSuccess={rest.onFinish}
    >
      <div className="bg-white rounded my-3">
        <Info />
      </div>
    </IModalForm>
  );
};
