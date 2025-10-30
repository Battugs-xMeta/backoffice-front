import {
  ProFormDatePicker,
  ProFormInstance,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-form";
import { IModalForm } from "components/modal";
import dayjs from "dayjs";
import { useEffect, useRef } from "react";
import { ActionComponentProps } from "types";
import { WorkerList } from "service/workers/type";
import workers from "service/workers";
import { SectionContainer, UploadButton } from "components/index";
import { NoteListType } from "service/care-information/types";
import file from "service/file";
import careInformation from "service/care-information";
import { UploadFile, notification } from "antd";
import moment from "moment";
import { useRequest } from "ahooks";

export const UpdateService = ({
  onCancel,
  onFinish,
  open,
  detail,
}: ActionComponentProps<NoteListType>) => {
  const formRef = useRef<ProFormInstance>();

  useEffect(() => {
    if (open) {
      formRef.current?.setFieldsValue({
        ...detail,
        date: detail?.date ?? undefined,
        description: detail?.description ?? undefined,
        care_center_elderly_note_files:
          detail?.care_center_elderly_note_files?.map((el) => ({
            url: el?.physical_path,
            name: el?.original_name,
          })),
      });
    }
  }, [open]);

  const uploadMulti = useRequest(file.uploads, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  const noteUpdateRequest = useRequest(careInformation.updateNoteList, {
    manual: true,
    onSuccess: () => {
      notification.success({
        message: "Амжилттай",
      });
    },
    onError: (err) => {
      notification.error({
        message: err.message,
      });
    },
  });

  return (
    <IModalForm
      open={open}
      formRef={formRef}
      cancelText={"Буцах"}
      okText={"Засах"}
      modalProps={{ maskClosable: false, onCancel }}
      width={550}
      title="Эрүүл мэндийн түүх засах"
      onRequest={async (values) => {
        if (!!values) {
          if (
            values.care_center_elderly_note_files &&
            values.care_center_elderly_note_files.length > 0
          ) {
            values.care_center_elderly_note_files = await uploadMulti
              .runAsync({
                names: values.care_center_elderly_note_files?.map(
                  (el: UploadFile) => el?.name
                ),
                files: values.care_center_elderly_note_files,
              })
              .then((el: any) => el.map((el: any) => el.id));
          }
          if (
            await noteUpdateRequest.runAsync(
              {
                ...values,
                care_center_elderly_note_files:
                  values.care_center_elderly_note_files,
                date: dayjs(values.date).toDate(),
                elderly_id: detail?.elderly_id,
              },
              detail?.id as number
            )
          ) {
            return true;
          }
        }
      }}
      onSuccess={onFinish}
    >
      <SectionContainer>
        <ProFormDatePicker
          fieldProps={{
            disabledDate: (current) => {
              return current && current > moment().endOf("day");
            },
          }}
          name={"date"}
          label="Огноо"
          placeholder={"Огноо сонгох"}
        />
        <ProFormTextArea
          name="description"
          placeholder="Дэлгэрэнгүй тайлбар бичнэ үү."
          label={"Тайлбар"}
          rules={[
            {
              required: true,
              message: "Тайлбар оруулна уу",
            },
          ]}
        />
        <UploadButton
          required={false}
          name={"care_center_elderly_note_files"}
          label="Файл хавсаргах"
        />
      </SectionContainer>
    </IModalForm>
  );
};
