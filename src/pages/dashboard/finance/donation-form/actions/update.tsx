import { ProFormInstance } from "@ant-design/pro-form";
import { IModalForm } from "components/modal";
import { useEffect, useRef } from "react";
import finance from "service/finance";
import { CashDonationType, Spent30 } from "service/finance/type";
import { ActionComponentProps } from "types";
import { Info } from "./parts/info";

export const UpdateService = ({
  onCancel,
  onFinish,
  open,
  detail,
}: ActionComponentProps<CashDonationType>) => {
  const formRef = useRef<ProFormInstance>();

  useEffect(() => {
    if (open) {
      formRef.current?.setFieldsValue({
        ...detail,
        donation_type: detail?.donation_type,
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
      initialValues={{
        donation_type: detail?.donation_type,
      }}
      onRequest={async (values) => {
        if (!!values) {
          if (
            await finance.updateDonationMoney(
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
      <Info donation_type={detail?.donation_type || 0} goods={detail?.goods} />
    </IModalForm>
  );
};
