import { DocumentEditor } from "@onlyoffice/document-editor-react";
import { Modal } from "antd";
import file from "service/file";
import { FileInterface } from "service/file/types";
import { ActionComponentProps } from "types";
type Props = ActionComponentProps<FileInterface> & {
  target?: FileInterface;
};

export const FileDetail = ({ detail, open, onCancel }: Props) => {
  const onDocumentReady = function () {
    console.log("Document is loaded");
  };

  const onLoadComponentError = function (
    errorCode: unknown,
    errorDescription: unknown
  ) {
    console.log(errorDescription);

    switch (errorCode) {
      case -1: // Unknown error loading component
        console.log(errorDescription);
        break;

      case -2: // Error load DocsAPI from http://documentserver/
        console.log(errorDescription);
        break;

      case -3: // DocsAPI is not defined
        console.log(errorDescription);
        break;
    }
  };

  const config = {
    document: {
      fileType: "xlsx",
      key: detail?.file_name || "",
      permissions: {
        edit: true,
      },
      title: detail?.file_name,
      url: file.fileToUrl(detail?.physical_path || ""),
    },
    token: "detail?.only_office_token",
  };

  return (
    <Modal open={open} onCancel={onCancel} width={"100%"} footer={false}>
      <div className="h-screen">
        <DocumentEditor
          id="docxEditor"
          documentServerUrl="https://new.onlyoffice.fibo.mn"
          config={config as any}
          events_onDocumentReady={onDocumentReady}
          onLoadComponentError={onLoadComponentError}
          events_onError={(err: any) => console.log(err)}
        />
      </div>
    </Modal>
  );
};
