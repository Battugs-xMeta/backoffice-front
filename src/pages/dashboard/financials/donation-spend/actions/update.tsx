import { ProFormInstance } from "@ant-design/pro-form";
import { IModalForm } from "components/modal";
import { useEffect, useRef } from "react";
import finance from "service/finance";
import { DonationExpenseInterface } from "service/finance/type";
import { ActionComponentProps } from "types";
import { Info } from "./parts/info";

export const UpdateService = ({
  onCancel,
  onFinish,
  open,
  detail,
}: ActionComponentProps<DonationExpenseInterface>) => {
  const formRef = useRef<ProFormInstance>();

  useEffect(() => {
    if (open) {
      formRef.current?.setFieldsValue({
        ...detail,
        amount: detail?.amount ?? undefined,
        date: detail?.date ?? undefined,
        description: detail?.description,
        expense_type: detail?.expense_type,
        quantity: detail?.quantity ?? undefined,
        title: detail?.title ?? undefined,
        elderlies:
          detail?.elderlies?.map((el: any) => {
            return (
              el?.elderly?.last_name.substring(0, 1) +
              ". " +
              el?.elderly?.first_name
            );
          }) || [],
      });
    }
  }, [open]);

  return (
    <IModalForm
      open={open}
      title="Засах"
      formRef={formRef}
      cancelText={"Буцах"}
      width={1000}
      okText={"Засах"}
      modalProps={{ maskClosable: false, onCancel }}
      onRequest={async (values) => {
        if (!!values) {
          if (
            await finance.updateDonationSpend(
              {
                ...values,
              },
              detail?.id || 0
            )
          ) {
            return true;
          }
        }
      }}
      onSuccess={onFinish}
    >
      <Info />
    </IModalForm>
  );
};
