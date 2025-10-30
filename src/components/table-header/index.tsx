import { FilterOutlined, ReloadOutlined } from "@ant-design/icons";
import { ProFormInstance, ProFormText } from "@ant-design/pro-form";
import { useDebounceFn } from "ahooks";
import { Button } from "antd"; // Import your component library
import { atom, useAtom } from "jotai";
import React, { useRef, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { ActionComponentProps } from "types";
import { exportFromTable } from "utils/export";
import { CreateButton, ExportButton } from "..";

interface TableHeaderProps {
  customHeaderTitle: string;
  hideToggle?: boolean;
  hideFilter?: boolean;
  selectedToggle?: string;
  addButtonName?: string;
  searchPlaceHolder?: string;
  handleToggle?: Function;
  hideSearch?: boolean;
  hideCreate?: boolean;
  hideFormFilter?: boolean;
  refresh?: () => void;
  toolbarItems?: React.ReactNode;
  setCreate?: (value: boolean) => void;
  search?: string;
  setSearch?: (value: string) => void;
  actions?: React.ReactNode;
  fileName?: string;
  tableID?: string;
  CreateComponent?: React.FC<ActionComponentProps<any>>;
  store?: any;
}

const init = atom<any>({});

const InitTableHeader: React.FC<TableHeaderProps> = ({
  customHeaderTitle,
  addButtonName,
  searchPlaceHolder,
  hideSearch,
  hideFormFilter: hideFormFilter = false,
  hideCreate,
  refresh,
  toolbarItems,
  setCreate,
  search,
  setSearch,
  actions,
  fileName = undefined,
  tableID = "main-table",
  CreateComponent,
  store,
}) => {
  const [stre, setStore] = useAtom<any>(store || init);
  const [createShow, setCreateShow] = useState(false);

  const form = useRef<ProFormInstance>(null);

  const checkIfChanged = () => {
    const { deadline, full_date, ...rest } =
      form.current?.getFieldsValue() || {};
    const arr = Object.values(rest || {});
    return arr.some((el: any) => (el?.length || 0) > 0 && el);
  };

  const searchDebounce = useDebounceFn(
    (value) => {
      store && setStore?.({ ...(stre || {}), query: value });
      setSearch?.(value);
    },
    { wait: 500 }
  );

  return (
    <>
      <div className="flex justify-between pt-2 pb-4 flex-wrap px-4 gap-4  items-center ">
        <div className="text-scale-700 text-base font-medium ">
          {customHeaderTitle}
        </div>
        <div className="flex gap-2 flex-wrap ant-form-item-margin-remove">
          <Button
            size="large"
            className={hideFormFilter ? "hidden" : ""}
            hidden={hideFormFilter}
            icon={
              (
                <FilterOutlined
                  rev={undefined}
                  color="#66708066"
                  className="text-sm"
                  size={20}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                />
              ) as unknown as React.ReactNode
            }
          >
            {checkIfChanged() && (
              <div className="absolute -top-1 -right-1 w-2 z-[10] h-2 bg-red-500 rounded-full"></div>
            )}
          </Button>
          <ProFormText
            name={"text"}
            placeholder={searchPlaceHolder || "Хайх"}
            hidden={hideSearch}
            fieldProps={{
              size: "large",
              prefix: <BiSearch color="#66708066" size={20} />,
              onChange: (e) => {
                searchDebounce.run(e.target.value);
              },
            }}
          />
          <Button
            icon={<ReloadOutlined rev />}
            onClick={refresh}
            size="large"
          />

          <ExportButton
            hidden={!fileName}
            onClick={() => {
              exportFromTable(
                [`${fileName}`],
                window.document.getElementById(`${tableID}`) as HTMLElement,
                window
              );
            }}
          />

          {toolbarItems}
          <CreateButton
            size="large"
            className={`${hideCreate && "hidden"}`}
            onClick={() =>
              setCreate ? setCreate?.(true) : setCreateShow(true)
            }
            addButtonName={addButtonName}
          />
          {actions}
        </div>
      </div>

      {CreateComponent && (
        <CreateComponent
          open={createShow}
          onCancel={() => {
            setCreateShow(false);
          }}
          onFinish={() => {
            setCreateShow(false);
            refresh?.();
          }}
        />
      )}
    </>
  );
};

export default InitTableHeader;
