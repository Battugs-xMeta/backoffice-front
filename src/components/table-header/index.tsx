import { FilterOutlined, ReloadOutlined } from "@ant-design/icons";
import { ProFormInstance, ProFormText } from "@ant-design/pro-form";
import { useDebounceFn } from "ahooks";
import { Button } from "antd";
import { atom, useAtom } from "jotai";
import React, { useRef, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { ActionComponentProps } from "types";
import { exportFromTable } from "utils/export";
import FilterPopover from "../filter-popover";
import { CreateButton, ExportButton } from "..";

interface FilterOption<T = string> {
  label: string;
  value: T;
}

interface TableHeaderProps<T = string> {
  customHeaderTitle: string;
  addButtonName?: string;
  searchPlaceHolder?: string;
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
  onFilterApply?: (filterType: T) => void;
  filterOptions?: FilterOption<T>[];
  filterTitle?: string;
  defaultFilterValue?: T;
}

const init = atom<any>({});

const InitTableHeader = <T extends string = string>({
  customHeaderTitle,
  addButtonName,
  searchPlaceHolder,
  hideSearch,
  hideFormFilter = false,
  hideCreate = false,
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
  onFilterApply,
  filterOptions,
  filterTitle = "Filter",
  defaultFilterValue,
}: TableHeaderProps<T>) => {
  const [stre, setStore] = useAtom<any>(store || init);
  const [createShow, setCreateShow] = useState(false);
  const [filterPopoverOpen, setFilterPopoverOpen] = useState(false);

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
      <div className="flex justify-between pt-5 pb-4 flex-wrap px-4 gap-4 items-center">
        <div className="text-scale-700 text-base font-medium ">
          {customHeaderTitle}
        </div>
        <div className="flex gap-2 flex-wrap ant-form-item-margin-remove">
          {filterOptions && (
            <FilterPopover
              open={filterPopoverOpen}
              onOpenChange={setFilterPopoverOpen}
              options={filterOptions}
              selectedValue={defaultFilterValue}
              onSelect={(value) => {
                onFilterApply?.(value);
              }}
              title={filterTitle}
            >
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
                    />
                  ) as unknown as React.ReactNode
                }
              >
                {checkIfChanged() && (
                  <div className="absolute -top-1 -right-1 w-2 z-[10] h-2 bg-red-500 rounded-full"></div>
                )}
              </Button>
            </FilterPopover>
          )}
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
          <Button icon={<ReloadOutlined />} onClick={refresh} size="large" />

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
          {hideCreate !== true && (
            <CreateButton
              size="large"
              onClick={() =>
                setCreate ? setCreate?.(true) : setCreateShow(true)
              }
              addButtonName={addButtonName}
            />
          )}
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
