import { DocumentEditor } from "@onlyoffice/document-editor-react";
import { OnlyOfficeInterface } from "service/report-detail/type";

type Props = {
  config?: OnlyOfficeInterface;
  token?: string;
};

export const DocumentOnlyOffice = ({ config, token }: Props) => {
  const onDocumentReady = function () {
    console.log("Document is loaded");
  };

  const onLoadComponentError = function (
    errorCode: unknown,
    errorDescription: unknown
  ) {
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
  return (
    <div className="h-screen">
      <DocumentEditor
        id="docxEditor"
        documentServerUrl="https://new.onlyoffice.fibo.mn"
        events_onDocumentStateChange={(data: any) => {
          console.log(data, "SDFSDF");
        }}
        events_onRequestSaveAs={(data: any) => {
          console.log(data, "SDF");
        }}
        events_onInfo={(data: any) => {
          console.log(data, "INFO");
        }}
        config={{
          ...config,
          token,
        }}
        events_onDocumentReady={onDocumentReady}
        onLoadComponentError={onLoadComponentError}
        events_onError={(err: any) => console.log(err)}
      />
    </div>
  );
};
