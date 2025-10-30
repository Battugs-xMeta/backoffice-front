import { LinkOutlined } from "@ant-design/icons";
import { useRequest } from "ahooks";
import { Flex, Tag, notification } from "antd";
import { PageCard } from "components/card";
import { Profile } from "components/profile";
import { ITable } from "components/table";
import InitTableHeader from "components/table-header";
import { useAtom } from "jotai";
import moment from "moment";
import { Link } from "react-router-dom";
import file from "service/file";
import finance from "service/finance";
import {
  NormativeDetailList,
  NormativeTypeArrayOptions,
} from "service/finance/type";
import { moneyFormat } from "utils/index";
import { storeNorExpense } from "../store";
import { CreateService } from "./action/create";
import { UpdateService } from "./action/update";
import { storeNorExpenseDetail } from "./store";
import { useEffect } from "react";

const NormativeExpenseDetail = () => {
  const [parentStore, setParentStore] = useAtom(storeNorExpense);
  const [store] = useAtom(storeNorExpenseDetail);

  const list = useRequest(finance.listNorDetail, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
    onSuccess: () => {
      normativeTypes.run({ ...parentStore, ...store });
    },
  });

  const normativeTypes = useRequest(finance.listNorBudget, { manual: true });

  const findBudgePercent = (amount: number, normative_type: number) => {
    const budget =
      normativeTypes.data?.find((x) => x.normative_type === normative_type)
        ?.budget || 0;
    return ((amount * 100) / budget).toFixed(3);
  };

  useEffect(() => {
    list.run({ ...parentStore, ...store });
  }, [store, parentStore]);

  return (
    <PageCard xR>
      <InitTableHeader
        store={storeNorExpenseDetail}
        addButtonName="Зардал нэмэх"
        customHeaderTitle="Норматив зардлын дэлгэрэнгүй"
        searchPlaceHolder="Хайх"
        refresh={list.refresh}
        fileName="Норматив зардлын дэлгэрэнгүй"
        CreateComponent={CreateService}
      />
      <ITable<NormativeDetailList>
        total={list.data?.total}
        loading={list.loading}
        dataSource={list?.data?.items ?? []}
        refresh={(values) => {
          list.run({ ...parentStore, ...store, ...values });
          setParentStore({ ...parentStore });
        }}
        UpdateComponent={UpdateService}
        columns={[
          {
            dataIndex: "normative_type",
            title: "Норматив зардлын төрөл",
            align: "left",
            render: (value) => (
              <div className="flex gap-2">
                <span className="text-sm text-[#475467] font-normal">
                  {NormativeTypeArrayOptions.find((el) => el.value === value)
                    ?.label || "-"}
                </span>
              </div>
            ),
          },
          {
            dataIndex: "amount",
            title: "Нийт",
            align: "center",
            width: 150,
            render: (value) => (
              <span className="text-sm text-[#475467] font-normal flex text-center justify-center">
                {moneyFormat((value as number) || 0) + "₮"}
              </span>
            ),
          },
          {
            dataIndex: "s",
            title: "Зарцуулсан хувь",
            align: "center",
            width: 100,
            render: (value, record) => (
              <Flex align="center" justify="center">
                <Tag bordered={false}>
                  {findBudgePercent(record.amount, record.normative_type)}%
                </Tag>
              </Flex>
            ),
          },
          {
            dataIndex: "description",
            title: "Тайлбар",
            align: "left",
            width: 120,
            render: (value) => (
              <span className="text-sm text-[#475467] font-normal">
                {value || "-"}
              </span>
            ),
          },
          {
            dataIndex: "description",
            title: "Бүртгэсэн ажилтан",
            align: "left",
            width: 150,
            render: (_, record) => <Profile user={record?.created_employee} />,
          },
          {
            dataIndex: "order_files",
            title: "Тушаал",
            width: 100,
            align: "center",
            render: (_, record) => (
              <span className="text-sm text-[#475467] font-normal">
                <ul>
                  {record?.order_files.length > 0
                    ? record?.order_files?.map((noteFile, index) => {
                        return (
                          <Link
                            to={file.fileToUrl(noteFile?.physical_path)}
                            className="cursor-pointer  text-gray-700"
                            target="blank"
                            download
                          >
                            <li> {noteFile?.original_name}</li>
                          </Link>
                        );
                      })
                    : "-"}
                </ul>
              </span>
            ),
          },
          {
            dataIndex: "contract_files",
            title: "Гэрээ",
            width: 100,
            align: "center",
            render: (_, record) => (
              <span className="text-sm text-[#475467] font-normal">
                <ul>
                  {record?.contract_files.length > 0
                    ? record?.contract_files?.map((noteFile, index) => {
                        return (
                          <Link
                            to={file.fileToUrl(noteFile?.physical_path)}
                            className="cursor-pointer  text-gray-700"
                            target="blank"
                            download
                          >
                            <li>{noteFile?.original_name}</li>
                          </Link>
                        );
                      })
                    : "-"}
                </ul>
              </span>
            ),
          },
          {
            dataIndex: "meeting_note_files",
            title: "Хурлын тэмдэглэл",
            width: 100,
            align: "center",
            render: (_, record) => (
              <span className="text-sm text-[#475467] font-normal">
                <ul>
                  {record?.meeting_note_files.length > 0
                    ? record?.meeting_note_files?.map((noteFile, index) => {
                        return (
                          <Link
                            to={file.fileToUrl(noteFile?.physical_path)}
                            className="cursor-pointer  text-gray-700"
                            target="blank"
                            download
                          >
                            <li>{noteFile?.original_name}</li>
                          </Link>
                        );
                      })
                    : "-"}
                </ul>
              </span>
            ),
          },
          {
            dataIndex: "advice_files",
            title: "Зөвлөмж",
            width: 100,
            align: "center",
            render: (_, record) => (
              <span className="text-sm text-[#475467] font-normal">
                <ul>
                  {record?.advice_files.length > 0
                    ? record?.advice_files?.map((noteFile, index) => {
                        return (
                          <Link
                            to={file.fileToUrl(noteFile?.physical_path)}
                            className="cursor-pointer  text-gray-700"
                            target="blank"
                            download
                          >
                            <li>{noteFile?.original_name}</li>
                          </Link>
                        );
                      })
                    : "-"}
                </ul>
              </span>
            ),
          },
          {
            dataIndex: "created_at",
            title: "Бүртгэсэн огноо",
            width: 120,
            align: "left",
            render: (value) => (
              <span className="text-sm text-[#475467] font-normal">
                {moment(value || 0).format("YYYY-MM-DD") || "-"}
              </span>
            ),
          },
          {
            dataIndex: "tenger_gov_mn",
            title: "Tender.gov.mn",
            width: 120,
            align: "left",
            render: (value, record) =>
              record.tender_gov_mn ? (
                <Link to={record.tender_gov_mn || ""}>
                  <Flex
                    justify="left"
                    align="center"
                    gap={5}
                    className="underline"
                  >
                    <LinkOutlined rev={undefined} />
                    <span>Холбоос</span>
                  </Flex>
                </Link>
              ) : (
                "-"
              ),
          },
        ]}
        RemoveModelConfig={{
          action: finance.deleteNorDetail,
          config: (record) => ({
            uniqueKey: record?.id,
            display: record?.amount,
            title: "Remove",
          }),
        }}
      />
    </PageCard>
  );
};

export default NormativeExpenseDetail;
