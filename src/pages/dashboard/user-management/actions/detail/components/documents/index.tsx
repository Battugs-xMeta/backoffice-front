import { CloudDownloadOutlined } from "@ant-design/icons";
import { ProFormRadio } from "@ant-design/pro-form";
import { Button, Modal } from "antd";
import { IfCondition } from "components/condition";
import { ITable } from "components/table";
import { useAtom } from "jotai";
import { useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  FilterDocumentButton,
  FilterDocumentline,
} from "service/care-information/types";
import file from "service/file";
import { Elderlys } from "service/requested/types";
import { atomWorkersForm } from "utils/store";
import { ClientDoc } from "./client-doc";
import { HealthDoc } from "./healt_doc";

type DocumentsType = {
  data?: Elderlys;
};

interface DocumentList {
  name?: String;
  size?: number;
  path?: String;
}

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
        condition={tab === 1}
        whenTrue={<ClientDoc data={data?.documents} />}
      />
      <IfCondition
        condition={tab === 2}
        whenTrue={<HealthDoc data={data?.laboratory_tests} />}
      />
    </>
  );
};
