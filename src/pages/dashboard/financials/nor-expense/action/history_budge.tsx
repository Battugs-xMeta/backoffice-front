import {
  FormListActionType,
  ModalFormProps,
  ProFormInstance,
} from "@ant-design/pro-form";
import { PageLoading } from "@ant-design/pro-layout";
import { useRequest } from "ahooks";
import { Avatar, Col, Row, notification } from "antd";
import { IModalForm } from "components/modal";
import { ITable } from "components/table";
import dayjs from "dayjs";
import { useEffect, useRef } from "react";
import file from "service/file";
import finance from "service/finance";
import { NormativeHistory } from "service/finance/type";
import { moneyFormat } from "utils/index";

type PropsCancel = ModalFormProps & {
  onCancel: () => void;
  id?: any;
  data?: number;
  onFinish?: () => void;
};

export const HistoryBudget = ({
  onCancel,
  data,
  onFinish,
  id,
  ...rest
}: PropsCancel) => {
  const formRef = useRef<ProFormInstance>();

  const budgeHistory = useRequest(finance.getBudgetHistory, {
    manual: true,
    onError: (err) => {
      notification.error({
        message: err.message,
      }),
        onFinish && onFinish();
    },
  });

  useEffect(() => {
    budgeHistory?.run(data);
  }, [data]);

  return (
    <IModalForm
      {...rest}
      title="Зардлын төсвийн түүх"
      modalProps={{ onCancel: onCancel }}
      width={800}
      onOpenChange={() => formRef.current?.resetFields()}
      formRef={formRef}
      open={!!data}
      submitter={false}
    >
      {budgeHistory.loading ? (
        <PageLoading />
      ) : (
        <div className="w-full mt-6">
          <ITable<NormativeHistory>
            scroll={false}
            dataSource={budgeHistory.data ?? []}
            total={budgeHistory.data?.length || 0}
            loading={budgeHistory.loading}
            refresh={(values) => budgeHistory.run({ data, ...values })}
            actionWidth={10}
            hidePagination
            columns={[
              {
                dataIndex: "budget",
                title: "Батлагдсан төсөв",
                align: "left",
                renderText: (value) => (
                  <span className="text-sm text-[#475467] font-normal">
                    {value ? moneyFormat(value, "mnt") : "-"}
                  </span>
                ),
              },
              {
                dataIndex: "description",
                title: "Тайлбар",
                align: "start",
                render: (value) => (
                  <span className="text-sm text-[#475467] font-normal">
                    {value || "-"}
                  </span>
                ),
              },
              {
                dataIndex: "created_at",
                title: "Бүртгэсэн ажилтан",
                align: "start",
                renderText: (value, record) => (
                  <span className="text-sm text-[#475467] font-normal flex gap-2 items-center">
                    <Avatar
                      shape="circle"
                      size={30}
                      src={file.fileToUrl(
                        record?.created_employee?.profile?.physical_path || "AS"
                      )}
                      className="flex items-center"
                    />

                    <span>{`${record?.created_employee?.last_name?.substring(
                      0,
                      1
                    )}. ${record?.created_employee?.first_name}`}</span>
                  </span>
                ),
              },
              {
                dataIndex: "created_at",
                title: "Огноо",
                align: "start",
                renderText: (value) => (
                  <span className="text-sm text-[#475467] font-normal flex gap-2 items-center">
                    {dayjs(value, "mnt").format("YYYY/MM/DD HH:mm")}
                  </span>
                ),
              },
            ]}
          />
        </div>
      )}
    </IModalForm>
  );
};
