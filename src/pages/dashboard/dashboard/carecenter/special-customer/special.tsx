import { Flex } from "antd";
import { ProgressChart } from "components/progress-chart";
import { CareCenterDisability } from "service/dashboard/types";

type Props = {
  data?: CareCenterDisability;
};
export const SpecialNeeds = ({ data }: Props) => {
  return (
    <Flex vertical justify="space-between">
      <ProgressChart
        items={[
          {
            label: "Энгийн үйлчлүүлэгч",
            value: data?.basic_count || 0,
          },
          {
            label: "Тусгай хэрэгцээтэй",
            value: data?.disability_count || 0,
          },
        ]}
      />
      <ProgressChart
        items={[
          {
            label: "Дан тусгай хэрэгцээт",
            value: data?.one_disability_count || 0,
          },
          {
            label: "Хавсарсан тусгай хэрэгцээт",
            value: data?.double_disability_count || 0,
          },
        ]}
      />
    </Flex>
  );
};
