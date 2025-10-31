import { Popover, Radio, Space } from "antd";
import React from "react";

interface FilterOption<T = string> {
  label: string;
  value: T;
}

interface FilterPopoverProps<T = string> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  options: FilterOption<T>[];
  selectedValue?: T;
  onSelect: (value: T) => void;
  title?: string;
}

const FilterPopover = <T extends string>({
  open,
  onOpenChange,
  children,
  options,
  selectedValue,
  onSelect,
  title = "Filter",
}: FilterPopoverProps<T>) => {
  const handleRadioChange = (e: any) => {
    const value = e.target.value;
    onSelect(value);
    onOpenChange(false);
  };

  const content = (
    <div className="py-2" style={{ minWidth: 180 }}>
      {title && (
        <div className="text-sm text-gray-600 mb-3 font-medium">{title}</div>
      )}
      <Radio.Group value={selectedValue} onChange={handleRadioChange}>
        <Space direction="vertical" className="w-full">
          {options.map((option) => (
            <Radio
              key={option.value}
              value={option.value}
              className="text-sm hover:bg-gray-50 w-full p-1 rounded"
            >
              {option.label}
            </Radio>
          ))}
        </Space>
      </Radio.Group>
    </div>
  );

  return (
    <Popover
      content={content}
      trigger="click"
      open={open}
      onOpenChange={onOpenChange}
      placement="bottomLeft"
    >
      {children}
    </Popover>
  );
};

export default FilterPopover;
