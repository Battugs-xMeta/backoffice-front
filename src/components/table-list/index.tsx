import { ButtonProps, Card, Empty, Pagination, Spin } from "antd";
import { RemoveModal } from "components/modal";
import { useState } from "react";
import { ActionComponentProps, RemoveModelConfig } from "types";
import { DeleteButton, EditButton } from "..";
import { ITableSource } from "./source";
import { EditOutlined } from "@ant-design/icons";
import { IEmpty } from "components/empty";
import { PageCard } from "components/card";

type Props<T> = {
  total?: number;
  dataSource?: T[];
  columns?: {
    dataIndex?: string;
    className?: string;
    fixed?: boolean;
    right?: boolean;
    render?: (value: any, record: T, index: number) => any;
  }[];
  gap?: number;
  itemClassName?: string;
  seperate?: boolean;
  UpdateComponent?: React.FC<ActionComponentProps<T>>;
  RemoveConfig?: RemoveModelConfig<T>;
  refresh?: (values?: any) => void;
  loading?: boolean;
  pagination?: boolean;
  updateBtnConfig?: ButtonProps;
};

const borderClass =
  "border-t border-l-0 border-r-0 border-b-0 border-solid border-gray-200";
const borderBottomClass =
  "border-b border-l-0 border-r-0 border-t-0 border-solid border-gray-200";

export const ITableList = <T,>({
  dataSource,
  total,
  columns,
  gap,
  itemClassName = "px-4 py-[23px]",
  seperate,
  refresh,
  UpdateComponent,
  RemoveConfig,
  loading,
  pagination: hidePagination,
  updateBtnConfig,
}: Props<T>) => {
  const [update, setUpdate] = useState<T>();
  const [detail, setDetail] = useState<T>();
  const [remove, setRemove] = useState<T>();

  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

  const isRightColumn = columns?.some((col) => col.right);

  return (
    <>
      <div className="relative">
        <div className={` relative ${borderClass}`}>
          {loading && (
            <Spin className="absolute flex items-center justify-center top-0 left-0 right-0 bottom-0 h-full w-full bg-gray-25/65 rounded-2xl z-10" />
          )}

          {dataSource?.length === 0 && (
            <PageCard className="py-10">
              <IEmpty />
            </PageCard>
          )}
          {dataSource?.map((el, key) => {
            return (
              <div
                key={key}
                className={` flex items-center flex-wrap 2xl:flex-nowrap  gap-4 ${
                  !seperate && borderBottomClass
                } ${seperate ? " my-2 rounded-xl bg-white" : "py-4 px-4"}`}
              >
                <div
                  className={`flex items-center flex-wrap w-full gap-${gap} ${itemClassName}`}
                >
                  <ITableSource<T> data={el} columns={columns} />
                </div>
                {(UpdateComponent || RemoveConfig) && (
                  <div
                    className={` flex items-center justify-end gap-2    ${
                      !isRightColumn && "xl:flex-1"
                    }`}
                  >
                    {UpdateComponent && (
                      <EditButton
                        type="primary"
                        title={"Засах"}
                        onClick={() => setUpdate(el)}
                        icon={<EditOutlined rev={undefined} />}
                        {...updateBtnConfig}
                      />
                    )}
                    {RemoveConfig && (
                      <DeleteButton
                        title="Устгах"
                        onClick={() => setRemove(el)}
                      />
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <Pagination
          onChange={(page, pageSize) => {
            setPagination({
              ...pagination,
              current: page ? page : 1,
              pageSize,
            });
            refresh?.({ current: page, pageSize });
          }}
          current={pagination.current}
          total={total}
          showTotal={(total, range) => (
            <div className="font-semibold text-gray-500">
              {range[0]}-{range[1]} of {total} items
            </div>
          )}
          defaultPageSize={10}
          pageSizeOptions={[10, 20, 50, 100, 200, 500]}
          responsive
          className={`flex justify-end pt-4 ${hidePagination && "hidden"}`}
          size="small"
        />
      </div>

      {UpdateComponent && (
        <UpdateComponent
          open={!!update}
          onCancel={() => setUpdate(undefined)}
          detail={update}
          onFinish={() => {
            setUpdate(undefined);
            refresh?.({ ...pagination, page: pagination.current - 1 });
          }}
        />
      )}
      {/* {DetailComponent && (
    <DetailComponent
      open={!!detail}
      detail={detail}
      onCancel={() => setDetail(undefined)}
      details={details}
    />
  )} */}

      {RemoveConfig && (
        <RemoveModal
          {...RemoveConfig.config(remove as any)}
          open={!!remove}
          onDone={() => {
            refresh?.({ ...pagination, page: pagination.current - 1 });
            setRemove(undefined);
          }}
          onCancel={() => setRemove(undefined)}
          onRequest={RemoveConfig.action}
          remove={true}
        />
      )}
    </>
  );
};
