import { IModalForm } from "components/modal";
import { ActionComponentProps } from "types";

export const DetailService = ({
  onCancel,
  detail,
  open,
}: ActionComponentProps<any>) => {
  return (
    <IModalForm
      title="Details"
      submitter={false}
      open={open}
      modalProps={{ maskClosable: false, onCancel }}
    >
      <div>test page</div>
    </IModalForm>
  );
};
