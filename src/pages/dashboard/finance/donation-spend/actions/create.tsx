import { ProFormInstance } from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { IModalForm } from "components/modal";
import moment from "moment";
import { useRef } from "react";
import finance from "service/finance";
import { DonationExpenseInterface } from "service/finance/type";
import { ActionComponentProps } from "types";
import { Info } from "./parts/info";
import dayjs from "dayjs";

export const CreateService = ({
  ...rest
}: ActionComponentProps<DonationExpenseInterface>) => {
  const formRef = useRef<ProFormInstance>();

  const CreateSpend30 = useRequest(finance.CreateDonationSpend, {
    manual: true,
  });

  return (
    <IModalForm
      open={rest.open}
      modalProps={{ maskClosable: false, onCancel: rest.onCancel }}
      formRef={formRef}
      title="Хандивын зарцуулалт бүртгэх"
      width={800}
      scrollToFirstError={true}
      onOpenChange={() => formRef.current?.resetFields()}
      cancelText={"Буцах"}
      okText={"Нэмэх"}
      className="px-1"
      onRequest={async (values) => {
        if (!!values) {
          if (
            await CreateSpend30.runAsync({
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
