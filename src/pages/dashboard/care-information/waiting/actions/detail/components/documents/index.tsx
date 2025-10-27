import { ProFormRadio } from "@ant-design/pro-form";
import { IfCondition } from "components/condition";
import { ClientDoc } from "components/user-detail-documents/client_doc";
import { ContractDoc } from "components/user-detail-documents/contract";
import { HealthDoc } from "components/user-detail-documents/health_doc";
import { useState } from "react";
import {
  FilterDocumentButton,
  FilterDocumentline,
} from "service/care-information/types";
import { Elderlys } from "service/requested/types";

type DocumentsType = {
  data?: Elderlys;
};

export const Documents: React.FC<DocumentsType> = ({ data }) => {
  const [tab, setTab] = useState<any>(FilterDocumentline.contract);

  const DocumentButtons: FilterDocumentButton[] = [
    {
      value: FilterDocumentline.contract,
      label: "Тушаал, шийдвэр, гэрээ",
    },
    {
      value: FilterDocumentline.client_doc,
      label: "Үйлчлүүлэгчийн бичиг баримт",
    },
    {
      value: FilterDocumentline.health_doc,
      label: "Эрүүл мэндтэй холбоотой бичиг баримт",
    },
  ];

  return (
    <>
      <div className="mt-5">
        <ProFormRadio.Group
          name={"documentLine"}
          radioType="button"
          fieldProps={{
            size: "large",
            value: tab,
            onChange: (e) => {
              setTab(e.target.value);
            },
          }}
          options={DocumentButtons?.map((el) => ({
            ...el,
            onChange: (e) => {
              setTab(e);
            },
          }))}
          initialValue={FilterDocumentline.contract}
        />
      </div>
      <IfCondition
        condition={tab === FilterDocumentline.contract}
        whenTrue={<ContractDoc data={data} />}
      />
      <IfCondition
        condition={tab === FilterDocumentline.client_doc}
        whenTrue={<ClientDoc data={data?.documents} />}
      />
      <IfCondition
        condition={tab === FilterDocumentline.health_doc}
        whenTrue={<HealthDoc data={data?.laboratory_tests} />}
      />
    </>
  );
};
