import {
  CloudDownloadOutlined,
  DeleteTwoTone,
  EyeOutlined,
} from "@ant-design/icons";
import {
  ProFormUploadButton,
  ProFormUploadButtonProps,
  ProFormUploadDragger,
  ProFormUploadDraggerProps,
} from "@ant-design/pro-form";
import { Button } from "antd";
import EditIcon from "assets/icons/featured-icon.svg";
import FilesImage from "assets/icons/files.svg";
import { FieldRequireMessage } from "config";
import { Link } from "react-router-dom";
import { formatKB } from "utils/index";

type PropsDragger = ProFormUploadDraggerProps & {
  validator?: (value: any) => Promise<any>;
  required?: boolean;
};
export const UploadDraggerButton = ({
  validator,
  required,
  ...rest
}: PropsDragger) => {
  return (
    <div id={`${rest.name}`}>
      <ProFormUploadDragger
        {...rest}
        title={
          <div className="w-full h-full space-x-2 text-sm text-gray-600">
            <div className="text-primary">
              <div>
                <img src={EditIcon} />
              </div>
              <span className=" font-semibold  text-[#6759CE] mr-1">
                Файл оруулах
              </span>
            </div>
            <div className="">SVG,PNG,JPG or GIF (Хэмжээ :800*400px)</div>
          </div>
        }
        icon={false}
        description={false}
        fieldProps={{
          beforeUpload: (file) => false,
          listType: "picture",
          multiple: true,
          ...{ ...(rest.fieldProps && rest.fieldProps) },
        }}
        rules={
          required
            ? validator
              ? [
                  {
                    required: true,
                    validator: (_, value) => {
                      return validator(value);
                    },
                  },
                ]
              : [
                  {
                    message: FieldRequireMessage,
                    required: true,
                  },
                ]
            : undefined
        }
      />
    </div>
  );
};

type PropsUpload = ProFormUploadButtonProps & { wrapperClassName?: string };

export const UploadButton = ({
  title = "Файл хавсаргах",
  required = true,
  label = "Файл",
  wrapperClassName,
  ...rest
}: PropsUpload) => {
  return (
    <div
      id={`${rest.name}`}
      className={`custom-btn-remove-bg  ${wrapperClassName}`}
    >
      <ProFormUploadButton
        {...rest}
        title={title}
        label={label}
        width={400}
        fieldProps={{
          beforeUpload: (_) => false,
          multiple: true,
          itemRender: (originNode, fileOne, fileList, actions) => {
            return (
              <div className="flex justify-between items-center bg-[#E7EDEE] rounded-xl p-4 my-2">
                <div className="flex gap-3 items-center justify-center">
                  <img src={FilesImage} alt="file image" />
                  <div className="flex flex-col">
                    <p className="text-sm font-medium m-0 p-0 text-wrap">
                      {fileOne?.name?.length > 15
                        ? `${fileOne?.name?.substring(0, 15)}...`
                        : fileOne?.name}
                    </p>
                    <p className="text-[#475467] font-normal text-sm p-0 m-0">
                      {formatKB(fileOne.size!, 1)}
                    </p>
                  </div>
                </div>
                <div className="flex flex-row gap-1">
                  <Link to={fileOne?.url || ""} target="_blank">
                    <Button
                      icon={<EyeOutlined rev={undefined} />}
                      type="default"
                      className="px-2 border-none"
                    ></Button>
                  </Link>
                  <Button
                    onClick={() => actions.remove()}
                    className="px-2 border-none"
                    icon={
                      <DeleteTwoTone twoToneColor="#DD695C" rev={undefined} />
                    }
                  ></Button>
                </div>
              </div>
            );
          },
        }}
        className="w-full"
        icon={<CloudDownloadOutlined rev={undefined} />}
        rules={
          required
            ? [
                {
                  message: FieldRequireMessage,
                  required: required,
                },
                {
                  required: true,
                  validator: (_, value) => {
                    if (value && value?.[0]?.size / 1024 / 1024 > 25) {
                      return Promise.reject(
                        "Файлын хэмжээ 25MB -с их байж болохгүй"
                      );
                    }
                    return Promise.resolve(value);
                  },
                },
                ...(rest.rules || []),
              ]
            : undefined
        }
      />
    </div>
  );
};

// export const newFileUploads = async (files: any[]) => {
//   const oldFileIDs: number[] = [];

//   files.map((file) => {
//     if (!file?.uid.includes("rc-upload")) {
//       oldFileIDs.push(parseInt(file.uid));
//     }
//   });
//   const ids = await uploadMulti
//     .runAsync({
//       names: files?.reduce<string[]>((acc, record) => {
//         if (record?.uid.includes("rc-upload")) {
//           acc.push(record.fileName || "");
//           return acc;
//         }
//         return acc;
//       }, []),
//       files: files?.reduce<string[]>((acc, record) => {
//         if (record?.uid.includes("rc-upload")) {
//           acc.push(record);
//           return acc;
//         }
//         return acc;
//       }, []),
//     })
//     .then((el: any) => el.map((el: any) => el.id));

//   return oldFileIDs.concat(ids);
// };
