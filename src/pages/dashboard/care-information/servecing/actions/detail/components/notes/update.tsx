import {
  ProFormDatePicker,
  ProFormInstance,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { notification } from "antd";
import { SectionContainer, UploadButton } from "components/index";
import { IModalForm } from "components/modal";
import dayjs from "dayjs";
import moment from "moment";
import { useEffect, useRef } from "react";
import careInformation from "service/care-information";
import { NoteListType } from "service/care-information/types";
import file from "service/file";
import { ActionComponentProps, AntdFile } from "types";

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
          detail?.care_center_elderly_note_files?.reduce<AntdFile[]>(
            (acc, record) => {
              acc.push({
                uid: record?.id.toString(),
                name: record?.original_name,
                fileName: record?.original_name,
                status: "done",
                url: `${import.meta.env.VITE_FILE_GET_URL}${
                  record.physical_path
                }`,
                response: "done",
                size: record.file_size,
              });
              return acc;
            },
            []
          ),
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

  const newFileUploads = async (files: any[]) => {
    const oldFileIDs: number[] = [];

    files.map((file) => {
      if (!file?.uid.includes("rc-upload")) {
        oldFileIDs.push(parseInt(file.uid));
      }
    });

    const ids = await uploadMulti
      .runAsync({
        names: files?.reduce<string[]>((acc, record) => {
          if (record?.uid.includes("rc-upload")) {
            acc.push(record.fileName || "");
            return acc;
          }
          return acc;
        }, []),
        files: files?.reduce<string[]>((acc, record) => {
          if (record?.uid.includes("rc-upload")) {
            acc.push(record);
            return acc;
          }
          return acc;
        }, []),
      })
      .then((el: any) => el.map((el: any) => el.id));

    return oldFileIDs.concat(ids);
  };

  const noteUpdateRequest = useRequest(careInformation.updateNoteList, {
    manual: true,
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
          values.care_center_elderly_note_files = await newFileUploads(
            values.care_center_elderly_note_files
          );
          if (
            await noteUpdateRequest.runAsync(
              {
                ...values,
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
        <ProFormText
          name={"name"}
          label="Нэр"
          placeholder={"Нэр оруулна уу "}
          rules={[{ required: true }]}
        />
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
