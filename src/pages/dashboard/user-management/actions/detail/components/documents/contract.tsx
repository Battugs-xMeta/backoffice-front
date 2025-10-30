import { CloudDownloadOutlined } from "@ant-design/icons";
import { ProFormRadio } from "@ant-design/pro-form";
import { Button, Modal } from "antd";
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

type DocumentsType = {
  data?: Elderlys;
};

interface DocumentList {
  name?: String;
  size?: number;
  path?: String;
}

export const Documents: React.FC<DocumentsType> = ({ data }) => {
  const [isFileOpen, setFileOpen] = useState<any | undefined>(undefined);

  const documentList = [
    {
      name: "Асрамжийн газрын хөнгөлөлттэй эсэх лавлагаа",
      size: data?.documents?.care_center_discount_inquiry[0]?.file_size,
      path: data?.documents?.care_center_discount_inquiry[0]?.physical_path,
    },
    {
      name: "Асрамжийн газарт асруулахыг хүссэн өргөдөл",
      size: data?.documents?.care_request[0]?.file_size,
      path: data?.documents?.care_request[0]?.physical_path,
    },
    {
      name: "Асруулагчийн иргэний үнэмлэх",
      size: data?.documents?.identity_card[0]?.file_size,
      path: data?.documents?.identity_card[0]?.physical_path,
    },
    {
      name: "Даатгалын хөнгөлөлттэй эсэх лавлагаа",
      size: data?.documents?.insurance_discounts_inquiry[0]?.file_size,
      path: data?.documents?.insurance_discounts_inquiry[0]?.physical_path,
    },
    {
      name: "Эрүүл мэндийн даатгалын дэвтэр",
      size: data?.documents?.insurance_notebook[0]?.file_size,
      path: data?.documents?.insurance_notebook[0]?.physical_path,
    },
    {
      name: "Хөгжлийн бэрхшээлтэй эсэх лавлагаа",
      size: data?.documents?.is_disability_inquiry[0]?.file_size,
      path: data?.documents?.is_disability_inquiry[0]?.physical_path,
    },
    {
      name: "Гэрлэлт цуцалсан эсэх лавлагаа",
      size: data?.documents?.is_divorce_inquiry[0]?.file_size,
      path: data?.documents?.is_divorce_inquiry[0]?.physical_path,
    },
    {
      name: "Үр хүүхэдтэй эсэх лавлагаа",
      size: data?.documents?.is_have_children_inquiry[0]?.file_size,
      path: data?.documents?.is_have_children_inquiry[0]?.physical_path,
    },
    {
      name: "Ах дүүтэй эсэх лавлагаа",
      size: data?.documents?.is_have_sibling_inquiry[0]?.file_size,
      path: data?.documents?.is_have_sibling_inquiry[0]?.physical_path,
    },
    {
      name: "Гэрлэсэн эсэх лавлагаа",
      size: data?.documents?.is_married_inquiry[0]?.file_size,
      path: data?.documents?.is_married_inquiry[0]?.physical_path,
    },
    {
      name: "Тэтгэвэр авдаг эсэх лавлагаа",
      size: data?.documents?.is_pension_inquiry[0]?.file_size,
      path: data?.documents?.is_pension_inquiry[0]?.physical_path,
    },
    {
      name: "Тэтгэвэрийн зээлтэй эсэх лавлагаа",
      size: data?.documents?.pension_loan[0]?.file_size,
      path: data?.documents?.pension_loan[0]?.physical_path,
    },
    {
      name: "Бусад халамжийн үйлчилгээ авдаг эсэх лавлагаа",
      size: data?.documents?.other_welfare_services_inquiry[0]?.file_size,
      path: data?.documents?.other_welfare_services_inquiry[0]?.physical_path,
    },
    {
      name: "Эд хөрөнгийн лавлагаа",
      size: data?.documents?.property_inquiry[0]?.file_size,
      path: data?.documents?.property_inquiry[0]?.physical_path,
    },
  ];

  const [form, setForm] = useAtom(atomWorkersForm);
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
      <ITable<DocumentList>
        scroll={false}
        dataSource={documentList ?? []}
        total={documentList.length}
        actionWidth={10}
        form={form}
        setForm={setForm}
        columns={[
          {
            dataIndex: ["name"],
            title: "Нэр",
            align: "left",
            render: (value) => (
              <span className="text-sm text-[#475467] font-normal flex text-center">
                {value || "-"}
              </span>
            ),
          },
        ]}
        customActions={(record) => {
          return (
            <div className="flex gap-2 items-center">
              <div className="p-4 cursor-pointer">
                <Link
                  to={file.fileToUrl(record?.path as string)}
                  className="p-4 cursor-pointer  text-gray-700"
                  target="blank"
                  download
                >
                  <AiOutlineEye size={20} className={" text-gray-700"} />
                </Link>
              </div>
              <Link
                to={file.fileToUrl(record?.path as string)}
                className="p-4 cursor-pointer  text-gray-700"
                target="blank"
                download
              >
                <CloudDownloadOutlined
                  style={{
                    fontSize: 20,
                  }}
                  rev={undefined}
                />
              </Link>
            </div>
          );
        }}
      />
      {isFileOpen && (
        <Modal
          title={
            <div className="p-6">
              <div className="font-semibold">{isFileOpen?.name}</div>
            </div>
          }
          open={isFileOpen}
          width={1144}
          onCancel={() => setFileOpen(undefined)}
          footer={
            <div
              className="flex items-center gap-2 p-6 justify-end"
              style={{ borderTop: "1px solid #D0D5DD" }}
            >
              <Button
                icon={
                  <FaArrowLeft
                    accentHeight={11.67}
                    color="#344054"
                    size={12}
                    className="mx-2"
                  />
                }
                title="Буцах"
                onClick={() => setFileOpen(undefined)}
              />
              <Link
                to={file.fileToUrl(isFileOpen?.path as string)}
                className="p-4 cursor-pointer  text-gray-700"
                target="blank"
                download
              >
                <Button
                  title="Татах"
                  icon={
                    <CloudDownloadOutlined
                      style={{
                        fontSize: 20,
                      }}
                      rev={undefined}
                    />
                  }
                />
              </Link>
            </div>
          }
        >
          <div className="bg-[#F0F2F5] pt-5"></div>
        </Modal>
      )}
    </div>
  );
};
