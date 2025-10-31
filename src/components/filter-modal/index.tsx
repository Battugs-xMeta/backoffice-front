import { Modal, Radio, Button, Space, Typography } from "antd";
import { useState } from "react";

const { Text } = Typography;

interface FilterModalProps {
  filter_options: {
    label: string;
    value: string;
  }[];
  open: boolean;
  onCancel: () => void;
  onApply: (selectedType: string) => void;
  defaultValue?: string;
  title?: string;
}

const FilterModal = ({
  filter_options,
  open,
  onCancel,
  onApply,
  defaultValue,
  title = "Хайлтын тохиргоо",
}: FilterModalProps) => {
  const [selectedType, setSelectedType] = useState<string>(defaultValue || "");

  const handleApply = () => {
    onApply(selectedType);
    onCancel();
  };

  return (
    <Modal
      title={title}
      open={open}
      onCancel={onCancel}
      width={400}
      footer={
        <Space>
          <Button onClick={onCancel}>Буцах</Button>
          <Button type="primary" onClick={handleApply}>
            Хадгалах
          </Button>
        </Space>
      }
    >
      <div className="py-4">
        <Text className="text-sm text-gray-600 mb-4 block">
          Төрөл сонгоно уу:
        </Text>
        <Radio.Group
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="w-full"
        >
          <Space direction="vertical" className="w-full">
            {filter_options.map((option) => (
              <Radio
                key={option.value}
                value={option.value}
                className="text-sm"
              >
                {option.label}
              </Radio>
            ))}
          </Space>
        </Radio.Group>
      </div>
    </Modal>
  );
};

export default FilterModal;
