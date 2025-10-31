import { CloudDownloadOutlined } from "@ant-design/icons";
import { Button, Flex, Modal } from "antd";
import { ITable } from "components/table";
import { useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import None from "assets/icons/report/none.svg";
import { Link } from "react-router-dom";
import file from "service/file";
import { Documents } from "service/requested/types";
import { formatMB } from "utils/index";

type DocumentsType = {
  data?: Documents;
};

interface DocumentList {
  name?: String;
  size?: number;
  path?: String;
  isHave?: any;
}

export const ClientDoc: React.FC<DocumentsType> = ({ data }) => {
  const [isFileOpen, setFileOpen] = useState<any | undefined>(undefined);

  const documentList = [
    {
      name: "Асрамжийн газрын хөнгөлөлттэй эсэх лавлагаа",
      size: data?.care_center_discount_inquiry[0]?.file_size,
      path: data?.care_center_discount_inquiry[0]?.physical_path,
      isHave: data?.care_center_discount_inquiry?.length ?? 0 > 0,
    },
    {
      name: "Асрамжийн газарт асруулахыг хүссэн өргөдөл",
      size: data?.care_request[0]?.file_size,
      path: data?.care_request[0]?.physical_path,
      isHave: data?.care_request?.length ?? 0 > 0,
    },
    {
      name: "Асруулагчийн иргэний үнэмлэх",
      size: data?.identity_card[0]?.file_size,
      path: data?.identity_card[0]?.physical_path,
      isHave: data?.identity_card?.length ?? 0 > 0,
    },
    {
      name: "Даатгалын хөнгөлөлттэй эсэх лавлагаа",
      size: data?.insurance_discounts_inquiry[0]?.file_size,
      path: data?.insurance_discounts_inquiry[0]?.physical_path,
      isHave: data?.insurance_discounts_inquiry?.length ?? 0 > 0,
    },
    {
      name: "Эрүүл мэндийн даатгалын дэвтэр",
      size: data?.insurance_notebook[0]?.file_size,
      path: data?.insurance_notebook[0]?.physical_path,
      isHave: data?.insurance_notebook?.length ?? 0 > 0,
    },
    {
      name: "Хөгжлийн бэрхшээлтэй эсэх лавлагаа",
      size: data?.is_disability_inquiry[0]?.file_size,
      path: data?.is_disability_inquiry[0]?.physical_path,
      isHave: data?.is_disability_inquiry?.length ?? 0 > 0,
    },
    {
      name: "Гэрлэлт цуцалсан эсэх лавлагаа",
      size: data?.is_divorce_inquiry[0]?.file_size,
      path: data?.is_divorce_inquiry[0]?.physical_path,
      isHave: data?.is_divorce_inquiry?.length ?? 0 > 0,
    },
    {
      name: "Үр хүүхэдтэй эсэх лавлагаа",
      size: data?.is_have_children_inquiry[0]?.file_size,
      path: data?.is_have_children_inquiry[0]?.physical_path,
      isHave: data?.is_have_children_inquiry?.length ?? 0 > 0,
    },
    {
      name: "Ах дүүтэй эсэх лавлагаа",
      size: data?.is_have_sibling_inquiry[0]?.file_size,
      path: data?.is_have_sibling_inquiry[0]?.physical_path,
      isHave: data?.is_have_sibling_inquiry?.length ?? 0 > 0,
    },
    {
      name: "Гэрлэсэн эсэх лавлагаа",
      size: data?.is_married_inquiry[0]?.file_size,
      path: data?.is_married_inquiry[0]?.physical_path,
      isHave: data?.is_married_inquiry?.length ?? 0 > 0,
    },
    {
      name: "Тэтгэвэр авдаг эсэх лавлагаа",
      size: data?.is_pension_inquiry[0]?.file_size,
      path: data?.is_pension_inquiry[0]?.physical_path,
      isHave: data?.is_pension_inquiry?.length ?? 0 > 0,
    },
    {
      name: "Тэтгэвэрийн зээлтэй эсэх лавлагаа",
      size: data?.pension_loan[0]?.file_size,
      path: data?.pension_loan[0]?.physical_path,
      isHave: data?.pension_loan?.length ?? 0 > 0,
    },
    {
      name: "Бусад халамжийн үйлчилгээ авдаг эсэх лавлагаа",
      size: data?.other_welfare_services_inquiry[0]?.file_size,
      path: data?.other_welfare_services_inquiry[0]?.physical_path,
      isHave: data?.other_welfare_services_inquiry?.length ?? 0 > 0,
    },
    {
      name: "Эд хөрөнгийн лавлагаа",
      size: data?.property_inquiry[0]?.file_size,
      path: data?.property_inquiry[0]?.physical_path,
      isHave: data?.property_inquiry?.length ?? 0 > 0,
    },
  ];

  return (
    <div className="mt-5">
      <ITable<DocumentList>
        scroll={false}
        dataSource={documentList ?? []}
        total={documentList.length}
        actionWidth={10}
        hidePagination
        columns={[
          {
            dataIndex: ["name"],
            title: "Нэр",
            align: "left",
            render: (value, record) => (
              <div className="flex flex-col justify-center">
                <span
                  className={`text-base font-bold flex text-center ${
                    record.isHave ? "text-[#344054]" : "text-[#DD695C]"
                  }`}
                >
                  {value || "-"}
                </span>
                <span className="font-normal text-sm text-gray-600">
                  Хэмжээ :{" "}
                  <span className="font-bold">{formatMB(record?.size, 2)}</span>
                </span>
              </div>
            ),
          },
          {
            dataIndex: ["isHave"],
            title: "Байгаа эсэх",
            align: "center",
            render: (value) => (
              <Flex justify="center" align="center">
                {value ? (
                  <FaCheck size={14} color="green" className="ml-1" />
                ) : (
                  <img src={None} />
                )}
              </Flex>
            ),
          },
        ]}
        customActions={(record) => {
          return record.isHave ? (
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
          ) : null;
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
