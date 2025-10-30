import { Flex } from "antd";
import { CardSelect } from "components/card-select";
import { useAtom } from "jotai";
import { PaymentInterface } from "service/payment/type";
import { dateFormat, moneyFormat } from "utils/index";
import { financeStore } from "./store";
import { PageCard } from "components/card";

type Props = {
  data?: PaymentInterface;
};
export const Header = ({ data }: Props) => {
  const [store, setStore] = useAtom(financeStore);
  return (
    <PageCard>
      <Flex align="center" wrap="wrap" gap={24}>
        <CardSelect
          label={"Он"}
          options={[
            { label: "2021", value: 2021 },
            { label: "2022", value: 2022 },
            { label: "2023", value: 2023 },
            { label: "2024", value: 2024 },
          ]}
          value={store.year}
          onChange={(value) => setStore({ ...store, year: value })}
        />

        <Item label="Бүрдүүлэлт" value={data?.register} />
        <Item label="Зарцуулалт" value={data?.expense} />
        <Item label="Мэдээ оруулсан огноо" value={data?.updated_at} />
      </Flex>
    </PageCard>
  );
};

type ItemProps = {
  label?: string;
  value?: number | Date;
};
const Item = ({ label, value }: ItemProps) => {
  return (
    <Flex align="center" gap={8}>
      <div className="text-gray-500 font-medium ">{label} :</div>
      <div className="text-gray-900 font-medium">
        {typeof value === "number"
          ? moneyFormat(value, "mnt")
          : dateFormat(value)}
      </div>
    </Flex>
  );
};
