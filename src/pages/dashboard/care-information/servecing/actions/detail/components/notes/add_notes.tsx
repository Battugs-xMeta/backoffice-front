import {
  ModalForm,
  ModalFormProps,
  ProFormDatePicker,
  ProFormInstance,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Button, notification } from "antd";
import { UploadFile } from "antd/lib";
import { SectionContainer, UploadButton } from "components/index";
import dayjs from "dayjs";
import moment from "moment";
import { useRef } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { IoAddCircleOutline } from "react-icons/io5";
import careInformation from "service/care-information";
import file from "service/file";

type PropsCancel = ModalFormProps & {
  onCancel: () => void;
  data?: number;
  onFinish?: () => void;
};

export const AddNotes = ({
  onCancel,
  data,
  onFinish,
  ...rest
}: PropsCancel) => {
  const formRef = useRef<ProFormInstance>();

  const uploadMulti = useRequest(file.uploads, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  const noteCreateRequest = useRequest(careInformation.createNote, {
    manual: true,
    onSuccess: () => {
      notification.success({
        message: "Амжилттай",
      });
      onFinish && onFinish();
    },

    onError: (err) => {
      notification.error({
        message: err.message,
      });
      onFinish && onFinish();
    },
  });

  return (
    <ModalForm
      {...rest}
      modalProps={{ maskClosable: false, onCancel, className: "rounded " }}
      labelAlign="left"
      layout="vertical"
      width={550}
      loading={uploadMulti.loading || noteCreateRequest.loading}
      onOpenChange={() => formRef.current?.resetFields()}
      formRef={formRef}
      open={!!data}
      submitter={{
        render: ({ submit: cancelRequest }) => {
          return (
            <div className="flex justify-between w-full rounded-xl">
              <Button
                size="large"
                className="w-1/2 text-sm  items-center"
                icon={<FaArrowLeft size={12} />}
                onClick={() => onCancel && onCancel()}
              >
                Буцах
              </Button>
              <Button
                size="large"
                className="w-1/2 text-sm flex items-center justify-center"
                type="primary"
                icon={<IoAddCircleOutline size={20} />}
                onClick={cancelRequest}
              >
                Нэмэх
              </Button>
            </div>
          );
        },
      }}
      onFinish={async (values) => {
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
            await noteCreateRequest.runAsync({
              ...values,
              care_center_elderly_note_files:
                values.care_center_elderly_note_files,
              date: dayjs(values.date).toDate(),
              elderly_id: data,
            })
          ) {
            return true;
          }
        }
      }}
    >
      <SectionContainer label="Тэмдэглэл нэмэх">
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
    </ModalForm>
  );
};
